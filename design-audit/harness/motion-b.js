// motion-b.js — Group B motion-frame capture. usage: node motion-b.js <slug> [<slug> ...]
// Opens each docs/preview page at 1440x900 (and 390x844), locates the live demo, scrolls it into view,
// takes frames 400ms apart, plus hover / scroll / click frames. Saves to evidence/<slug>/extra-*.png.
// Also (for 21st.dev) records the preview iframe URL and any JS bundle text that contains the component name.
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const OUT = path.resolve(__dirname, '..', 'evidence');

const TARGETS = {
  'b-carousel-squeeze': { url: 'https://21st.dev/community/components?preview=%2F%40yura%2Fcomponents%2Fcarousel-squeeze', kind: '21st', name: 'carousel-squeeze', click: true },
  'b-stagger-testimonials': { url: 'https://21st.dev/community/components?preview=%2F%40vaib215%2Fcomponents%2Fstagger-testimonials', kind: '21st', name: 'stagger-testimonials', click: true },
  'b-floating-icons-hero': { url: 'https://21st.dev/community/components?preview=%2F%40ravikatiyar162%2Fcomponents%2Ffloating-icons-hero-section', kind: '21st', name: 'floating-icons-hero-section' },
  'b-smooth-cursor': { url: 'https://magicui.design/docs/components/smooth-cursor', kind: 'magicui', mouse: true },
  'b-interactive-grid-pattern': { url: 'https://magicui.design/docs/components/interactive-grid-pattern', kind: 'magicui', mouse: true },
  'b-dot-pattern': { url: 'https://magicui.design/docs/components/dot-pattern', kind: 'magicui', scrollToGlow: true },
  'b-scroll-based-velocity': { url: 'https://magicui.design/docs/components/scroll-based-velocity', kind: 'magicui', scroll: true },
  'b-bento-grid': { url: 'https://magicui.design/docs/components/bento-grid', kind: 'magicui', hoverCard: true },
  'b-spectrum-accordion': { url: 'https://ui.spectrumhq.in/docs/accordion', kind: 'spectrum', accordion: true },
  'b-spectrum-animatedcard': { url: 'https://ui.spectrumhq.in/docs/animatedcard', kind: 'spectrum', click: true },
};

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function gotoRetry(page, url, tries = 4) {
  let last;
  for (let i = 0; i < tries; i++) {
    try { const r = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 }); await sleep(2500); return r; }
    catch (e) { last = e; await sleep(3000 * (i + 1)); }
  }
  throw last;
}

async function findDemo(page, t) {
  // returns { locator, frame } — locator is the preview box in the main page; frame is the iframe frame for 21st.dev
  if (t.kind === '21st') {
    // wait for the preview iframe inside the modal
    let frameEl = null;
    for (let i = 0; i < 40; i++) {
      const iframes = await page.$$('iframe');
      for (const f of iframes) {
        const src = await f.getAttribute('src').catch(() => '');
        const box = await f.boundingBox().catch(() => null);
        if (box && box.width > 300 && box.height > 200) { frameEl = f; break; }
      }
      if (frameEl) break;
      await sleep(1000);
    }
    if (!frameEl) return { locator: null, frame: null, note: 'no preview iframe found' };
    const frame = await frameEl.contentFrame();
    const src = await frameEl.getAttribute('src');
    return { locator: frameEl, frame, src };
  }
  if (t.kind === 'magicui' || t.kind === 'spectrum') {
    // Mark the demo container: climb from an anchor inside the preview until a box >= 260px tall and >= 300px wide.
    const ok = await page.evaluate((kind) => {
      const climb = (el) => { let e = el; for (let i = 0; e && i < 12; i++) { const r = e.getBoundingClientRect(); if (r.height >= 260 && r.width >= 300) return e; e = e.parentElement; } return null; };
      let anchor = null;
      if (kind === 'magicui') {
        anchor = Array.from(document.querySelectorAll('button, a')).find(b => /Open in/i.test(b.textContent || ''));
      } else {
        const tab = Array.from(document.querySelectorAll('button, a, [role="tab"]')).find(b => /^\s*Preview\s*$/i.test(b.textContent || ''));
        if (tab) { const r = tab.getBoundingClientRect(); const probe = document.elementFromPoint(Math.min(innerWidth - 10, r.left + 300), Math.min(innerHeight - 10, r.bottom + 260)); anchor = probe; }
      }
      if (!anchor) return false;
      const box = climb(anchor); if (!box) return false;
      document.querySelectorAll('[data-demo-box]').forEach(x => x.removeAttribute('data-demo-box'));
      box.setAttribute('data-demo-box', '1'); return true;
    }, t.kind);
    if (ok) return { locator: page.locator('[data-demo-box]').first() };
    return { locator: null, note: `no ${t.kind} preview found` };
  }
}

async function shot(page, out, name, clip) {
  const p = path.join(out, `extra-${name}.png`);
  try {
    if (clip) await page.screenshot({ path: p, clip, timeout: 20000 });
    else await page.screenshot({ path: p, timeout: 20000 });
    return p;
  } catch (e) { return 'ERR ' + e.message.slice(0, 80); }
}

async function clipOf(locator, page) {
  const b = await locator.boundingBox().catch(() => null);
  if (!b) return null;
  const vp = page.viewportSize();
  const x = Math.max(0, b.x), y = Math.max(0, b.y);
  const w = Math.min(b.width, vp.width - x), h = Math.min(b.height, vp.height - y);
  if (w < 20 || h < 20) return null;
  return { x, y, width: w, height: h };
}

async function run(slug) {
  const t = TARGETS[slug]; if (!t) { console.log('unknown slug', slug); return; }
  const out = path.join(OUT, slug); fs.mkdirSync(out, { recursive: true });
  const log = { slug, url: t.url, at: new Date().toISOString(), desktop: {}, mobile: {}, bundles: [] };
  const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--disable-blink-features=AutomationControlled', '--no-first-run', '--disable-gpu', '--hide-scrollbars'] });
  for (const vpName of ['desktop', 'mobile']) {
    const ctx = await browser.newContext(vpName === 'desktop'
      ? { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36' }
      : { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' });
    const page = await ctx.newPage();
    const L = log[vpName];
    // capture bundle text for 21st.dev sandboxes that contains the component name
    if (t.kind === '21st' && vpName === 'desktop') {
      page.on('response', async (res) => {
        try {
          const u = res.url(); const ct = (res.headers()['content-type'] || '');
          if (!/javascript|ecmascript|text\/plain|tsx|jsx/.test(ct) && !/\.(m?js|tsx|jsx)(\?|$)/.test(u)) return;
          if (u.includes('googletagmanager') || u.includes('clerk')) return;
          const txt = await res.text();
          if (txt.length > 4_000_000) return;
          const hit = /SqueezeCarousel|StaggerTestimonials|FloatingIconsHero|carousel-squeeze|stagger-testimonials|floating-icons-hero/.test(txt);
          if (hit) { const f = path.join(out, 'bundle-' + (log.bundles.length + 1) + '.js'); fs.writeFileSync(f, txt); log.bundles.push({ url: u.slice(0, 200), bytes: txt.length, file: path.basename(f) }); }
        } catch { }
      });
    }
    try {
      await gotoRetry(page, t.url);
      // dismiss cookie banners if any
      for (const sel of ['button:has-text("Accept")', 'button:has-text("Got it")']) { try { const b = page.locator(sel).first(); if (await b.count()) await b.click({ timeout: 1000 }); } catch { } }
      await sleep(1500);
      const d = await findDemo(page, t);
      L.note = d.note || null; L.iframeSrc = d.src || null;
      if (!d.locator) { L.shots = [await shot(page, out, `${vpName}-nodemo`)]; await ctx.close(); continue; }
      try { await d.locator.scrollIntoViewIfNeeded({ timeout: 5000 }); } catch { }
      await sleep(t.kind === '21st' ? 6000 : 1500); // let the sandbox boot
      let clip = await clipOf(d.locator, page);
      L.demoBox = clip;
      L.shots = [];
      // 3 idle frames 400ms apart
      for (let i = 1; i <= 3; i++) { L.shots.push(await shot(page, out, `${vpName}-idle-${i}`, clip)); await sleep(400); }
      if (vpName === 'desktop') {
        const box = clip || { x: 300, y: 300, width: 800, height: 400 };
        const cx = box.x + box.width / 2, cy = box.y + box.height / 2;
        // hover / mouse movement inside the demo
        await page.mouse.move(cx - 150, cy - 60); await sleep(120);
        for (let i = 0; i < 12; i++) { await page.mouse.move(cx - 150 + i * 25, cy - 60 + Math.sin(i) * 40); await sleep(40); }
        await sleep(300);
        L.shots.push(await shot(page, out, `${vpName}-hover-1`, clip));
        await sleep(400);
        L.shots.push(await shot(page, out, `${vpName}-hover-2`, clip));
        if (t.hoverCard) {
          // hover over first card in bento
          const card = (d.frame || page).locator('.group').first();
          try { await card.hover({ timeout: 3000 }); await sleep(500); L.shots.push(await shot(page, out, `${vpName}-hover-card`, clip)); } catch (e) { L.hoverCardErr = e.message.slice(0, 80); }
        }
        if (t.click) {
          // click inside the demo (carousel strip / animated card stack / testimonials arrow)
          const target = d.frame ? d.frame : page;
          try {
            if (slug === 'b-stagger-testimonials') {
              const btn = target.locator('button').last(); await btn.click({ timeout: 3000 });
            } else if (slug === 'b-carousel-squeeze') {
              // click a thin strip: rightmost clickable element in the carousel
              const els = target.locator('button, [role="button"], [tabindex="0"]'); const n = await els.count();
              if (n > 1) await els.nth(Math.min(n - 1, 3)).click({ timeout: 3000 }); else await page.mouse.click(box.x + box.width - 40, cy);
            } else {
              await page.mouse.click(cx, cy);
            }
          } catch (e) { L.clickErr = e.message.slice(0, 100); await page.mouse.click(cx, cy).catch(() => { }); }
          await sleep(250); L.shots.push(await shot(page, out, `${vpName}-click-1`, clip));
          await sleep(500); L.shots.push(await shot(page, out, `${vpName}-click-2`, clip));
          await sleep(900); L.shots.push(await shot(page, out, `${vpName}-click-3`, clip));
        }
        if (t.accordion) {
          const trig = page.locator('[data-demo-box] button[data-state]').first();
          try {
            await trig.click({ timeout: 3000 }); await sleep(60); L.shots.push(await shot(page, out, `${vpName}-accordion-open-1`, clip));
            L.accordionAnimMid = await page.evaluate(() => { const c = document.querySelector('[data-demo-box] [role="region"]'); if (!c) return null; const s = getComputedStyle(c); return { animationName: s.animationName, animationDuration: s.animationDuration, timing: s.animationTimingFunction, height: s.height, dataState: c.getAttribute('data-state') }; });
            await sleep(400); L.shots.push(await shot(page, out, `${vpName}-accordion-open-2`, clip));
            // keyboard: Tab to next trigger and press Enter
            await page.keyboard.press('Tab'); await sleep(200); L.shots.push(await shot(page, out, `${vpName}-accordion-focus`, clip));
            L.focusedEl = await page.evaluate(() => { const a = document.activeElement; return a ? { tag: a.tagName, text: (a.textContent || '').trim().slice(0, 40), outline: getComputedStyle(a).outlineStyle, boxShadow: getComputedStyle(a).boxShadow.slice(0, 80) } : null; });
            await page.keyboard.press('Enter'); await sleep(500); L.shots.push(await shot(page, out, `${vpName}-accordion-keyboard-open`, clip));
            L.accordionAttrsAfter = await page.evaluate(() => Array.from(document.querySelectorAll('[data-demo-box] button')).slice(0, 4).map(b => ({ text: (b.textContent || '').trim().slice(0, 40), ariaExpanded: b.getAttribute('aria-expanded'), ariaControls: b.getAttribute('aria-controls'), dataState: b.getAttribute('data-state') })));
            L.accordionAnim = await page.evaluate(() => Array.from(document.querySelectorAll('[data-demo-box] [role="region"]')).map(c => { const s = getComputedStyle(c); return { role: c.getAttribute('role'), ariaLabelledby: c.getAttribute('aria-labelledby'), animationName: s.animationName, animationDuration: s.animationDuration, timing: s.animationTimingFunction, hidden: c.hidden, dataState: c.getAttribute('data-state') }; }));
          } catch (e) { L.accordionErr = e.message.slice(0, 120); }
        }
        if (t.scroll) {
          // scroll-driven: scroll down/up fast and shoot
          await page.mouse.wheel(0, 600); await sleep(80); L.shots.push(await shot(page, out, `${vpName}-scroll-fast-1`));
          await page.mouse.wheel(0, -600); await sleep(80); L.shots.push(await shot(page, out, `${vpName}-scroll-fast-2`));
          await sleep(1200); L.shots.push(await shot(page, out, `${vpName}-scroll-settled`));
        }
        if (t.scrollToGlow) {
          // dot pattern: scroll to the "With Glow Effect" example and take 2 frames
          try { await page.locator('h3:has-text("With Glow Effect"), h2:has-text("With Glow Effect")').first().scrollIntoViewIfNeeded({ timeout: 4000 }); await page.mouse.wheel(0, 200); await sleep(1200); L.shots.push(await shot(page, out, `${vpName}-glow-1`)); await sleep(700); L.shots.push(await shot(page, out, `${vpName}-glow-2`)); } catch (e) { L.glowErr = e.message.slice(0, 80); }
        }
        if (t.mouse && slug === 'b-smooth-cursor') {
          L.bodyCursor = await page.evaluate(() => getComputedStyle(document.body).cursor);
          L.cursorEl = await page.evaluate(() => { const els = Array.from(document.querySelectorAll('div[style*="position: fixed"]')).filter(e => e.style.pointerEvents === 'none' && e.style.zIndex === '100'); return els.map(e => ({ style: e.getAttribute('style').slice(0, 220), svg: !!e.querySelector('svg') })); });
        }
        if (t.mouse && slug === 'b-interactive-grid-pattern') {
          L.rectCount = await page.evaluate(() => document.querySelectorAll('[data-demo-box] svg rect').length);
          L.hoveredRects = await page.evaluate(() => Array.from(document.querySelectorAll('[data-demo-box] svg rect')).filter(r => !/fill-transparent/.test(r.getAttribute('class') || '')).length);
          L.rectClass = await page.evaluate(() => { const r = document.querySelector('[data-demo-box] svg rect'); return r ? r.getAttribute('class') : null; });
          L.svgClass = await page.evaluate(() => { const r = document.querySelector('[data-demo-box] svg'); return r ? r.getAttribute('class') : null; });
        }
        if (slug === 'b-dot-pattern') {
          L.circleCount = await page.evaluate(() => Array.from(document.querySelectorAll('svg')).map(s => s.querySelectorAll('circle').length).filter(n => n > 50));
          L.glowSample = await page.evaluate(() => { const c = Array.from(document.querySelectorAll('svg circle')).find(c => (c.getAttribute('fill') || '').startsWith('url(')); return c ? { fill: c.getAttribute('fill'), style: c.getAttribute('style'), r: c.getAttribute('r') } : null; });
        }
        if (slug === 'b-scroll-based-velocity') {
          const grab = () => Array.from(document.querySelectorAll('[data-demo-box] .will-change-transform, [data-demo-box] [style*="transform"]')).slice(0, 2).map(e => e.style.transform);
          L.marqueeT0 = await page.evaluate(grab); await sleep(400); L.marqueeT400 = await page.evaluate(grab);
          await page.mouse.wheel(0, 900); await sleep(60); L.marqueeAfterWheel = await page.evaluate(grab); await sleep(300); L.marqueeAfterWheel300 = await page.evaluate(grab);
          await page.mouse.wheel(0, -900); await sleep(1500);
        }
        if (slug === 'b-bento-grid') {
          L.cards = await page.evaluate(() => Array.from(document.querySelectorAll('[data-demo-box] .group')).slice(0, 4).map(c => ({ cls: (c.className || '').slice(0, 120), h: Math.round(c.getBoundingClientRect().height), w: Math.round(c.getBoundingClientRect().width) })));
        }
        if (t.accordion) {
          L.accordionAttrs = await page.evaluate(() => Array.from(document.querySelectorAll('[data-demo-box] button')).slice(0, 4).map(b => ({ text: (b.textContent || '').trim().slice(0, 40), ariaExpanded: b.getAttribute('aria-expanded'), ariaControls: b.getAttribute('aria-controls'), dataState: b.getAttribute('data-state'), id: b.id, parentTag: b.parentElement && b.parentElement.tagName })));
        }
      } else {
        // mobile: also a tap in the demo and a scrolled frame
        const box = clip || { x: 0, y: 200, width: 390, height: 400 };
        try { await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2); } catch { }
        await sleep(600); L.shots.push(await shot(page, out, `${vpName}-tap`, clip));
        await page.mouse.wheel(0, 500).catch(() => { }); await sleep(600); L.shots.push(await shot(page, out, `${vpName}-scrolled`));
        if (slug === 'b-smooth-cursor') { L.bodyCursor = await page.evaluate(() => getComputedStyle(document.body).cursor); L.cursorEls = await page.evaluate(() => document.querySelectorAll('div[style*="z-index: 100"]').length); }
        L.overflow = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, innerWidth: innerWidth }));
      }
      // 21st iframe details
      if (d.frame) {
        try {
          L.frameInfo = await d.frame.evaluate(() => ({ title: document.title, bodyClass: document.body.className.slice(0, 120), width: innerWidth, height: innerHeight, scripts: Array.from(document.scripts).map(s => s.src.slice(0, 160)).filter(Boolean).slice(0, 12), links: Array.from(document.querySelectorAll('link[rel=stylesheet]')).map(l => l.href.slice(0, 120)).slice(0, 6), text: document.body.innerText.slice(0, 300), buttons: Array.from(document.querySelectorAll('button,[role=button]')).slice(0, 12).map(b => ({ t: (b.getAttribute('aria-label') || b.textContent).trim().slice(0, 40), tab: b.tabIndex })), imgs: document.images.length, hasMotion: !!document.querySelector('[style*="transform"]'), cssAnimated: Array.from(document.querySelectorAll('*')).slice(0, 600).filter(e => getComputedStyle(e).animationName !== 'none').length, transitions: Array.from(document.querySelectorAll('*')).slice(0, 600).filter(e => getComputedStyle(e).transitionDuration !== '0s').map(e => (getComputedStyle(e).transitionProperty + ' ' + getComputedStyle(e).transitionDuration + ' ' + getComputedStyle(e).transitionTimingFunction).slice(0, 90)).filter((v, i, a) => a.indexOf(v) === i).slice(0, 10), reducedMotionRule: (() => { let r = false; for (const sh of Array.from(document.styleSheets)) { try { for (const x of Array.from(sh.cssRules)) if (x.type === 4 && /prefers-reduced-motion/.test(x.conditionText || '')) r = true; } catch { } } return r; })() }));
        } catch (e) { L.frameErr = e.message.slice(0, 100); }
      }
    } catch (e) { L.error = e.message.slice(0, 200); L.shots = [await shot(page, out, `${vpName}-error`)]; }
    await ctx.close();
  }
  await browser.close();
  fs.writeFileSync(path.join(out, 'extra-motion.json'), JSON.stringify(log, null, 2));
  console.log('DONE', slug, JSON.stringify({ d: log.desktop.note || log.desktop.error || (log.desktop.shots || []).length, m: log.mobile.note || log.mobile.error || (log.mobile.shots || []).length, bundles: log.bundles.length }));
}

(async () => {
  const slugs = process.argv.slice(2);
  for (const s of slugs) { try { await run(s); } catch (e) { console.log('FAIL', s, e.message.slice(0, 200)); } }
})();
