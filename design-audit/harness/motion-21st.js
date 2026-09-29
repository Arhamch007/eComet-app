// motion-21st.js — opens the public cdn.21st.dev preview bundles directly (no loader overlay) and captures motion frames.
// usage: node motion-21st.js <slug> [<slug> ...]
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const OUT = path.resolve(__dirname, '..', 'evidence');
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const T = {
  'b-carousel-squeeze': { url: 'https://cdn.21st.dev/yura/carousel-squeeze/default/bundle.1787420809042-efcce442-3d43-4cd1-afe0-2f4cabfc9dd9.html?theme=dark', kind: 'carousel' },
  'b-stagger-testimonials': { url: 'https://cdn.21st.dev/vaib215/stagger-testimonials/default/bundle.1748367465509.html?theme=dark', kind: 'testimonials' },
  'b-floating-icons-hero': { url: 'https://cdn.21st.dev/ravikatiyar162/floating-icons-hero-section/default/bundle.1753603294934.html?theme=dark', kind: 'floating' },
};

async function gotoRetry(page, url, tries = 4) { let last; for (let i = 0; i < tries; i++) { try { await page.goto(url, { waitUntil: 'load', timeout: 60000 }); await sleep(2500); return; } catch (e) { last = e; await sleep(3000 * (i + 1)); } } throw last; }
const shot = async (page, out, name) => { const p = path.join(out, `extra-${name}.png`); try { await page.screenshot({ path: p, timeout: 20000 }); return path.basename(p); } catch (e) { return 'ERR ' + e.message.slice(0, 60); } };
const transforms = () => Array.from(document.querySelectorAll('[style*="transform"]')).slice(0, 6).map(e => (e.style.transform || '').slice(0, 90));

async function run(slug) {
  const t = T[slug]; const out = path.join(OUT, slug); fs.mkdirSync(out, { recursive: true });
  const log = { slug, url: t.url, at: new Date().toISOString(), desktop: {}, mobile: {}, reducedMotion: {} };
  const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-first-run', '--disable-gpu', '--hide-scrollbars'] });
  for (const vp of ['desktop', 'mobile', 'reducedMotion']) {
    const mobile = vp === 'mobile';
    const ctx = await browser.newContext(mobile
      ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' }
      : { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36', reducedMotion: vp === 'reducedMotion' ? 'reduce' : 'no-preference' });
    const page = await ctx.newPage(); const L = log[vp]; L.shots = [];
    try {
      await gotoRetry(page, t.url);
      await page.waitForFunction(() => Array.from(document.images).every(i => i.complete), null, { timeout: 15000 }).catch(() => { });
      await sleep(1500);
      L.matchMedia = await page.evaluate(() => ({ prm: matchMedia('(prefers-reduced-motion: reduce)').matches, hover: matchMedia('(hover: hover)').matches, pointerFine: matchMedia('(pointer: fine)').matches, w: innerWidth, h: innerHeight, dark: document.documentElement.classList.contains('dark') }));
      L.overflow = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, innerWidth }));
      L.t0 = await page.evaluate(transforms);
      for (let i = 1; i <= 3; i++) { L.shots.push(await shot(page, out, `${vp}-bundle-idle-${i}`)); await sleep(400); }
      L.t1200 = await page.evaluate(transforms);
      if (t.kind === 'carousel') {
        L.cssVars = await page.evaluate(() => { const el = document.querySelector('[role="tablist"]'); const root = el && el.closest('[style]'); const s = root ? root.getAttribute('style') : ''; return (s || '').slice(0, 400); });
        L.tabs = await page.evaluate(() => Array.from(document.querySelectorAll('[role="tab"]')).map(b => ({ label: (b.getAttribute('aria-label') || '').slice(0, 30), selected: b.getAttribute('aria-selected'), tabIndex: b.tabIndex, w: Math.round(b.getBoundingClientRect().width), radius: getComputedStyle(b).borderRadius, transition: getComputedStyle(b).transitionDuration + ' ' + getComputedStyle(b).transitionTimingFunction })));
        L.panel = await page.evaluate(() => { const p = document.querySelector('[role="tabpanel"]'); return p ? { ariaLive: p.getAttribute('aria-live'), id: p.id } : null; });
        if (!mobile) {
          // hover a slat (3rd tab), then click it, then keyboard ArrowRight
          const tabs = page.locator('[role="tab"]');
          const n = await tabs.count();
          if (n > 3) {
            await tabs.nth(2).hover(); await sleep(500); L.shots.push(await shot(page, out, `${vp}-bundle-hover-slat`));
            L.tabsHover = await page.evaluate(() => Array.from(document.querySelectorAll('[role="tab"]')).map(b => Math.round(b.getBoundingClientRect().width)));
            await tabs.nth(2).click(); await sleep(150); L.shots.push(await shot(page, out, `${vp}-bundle-click-150ms`));
            await sleep(400); L.shots.push(await shot(page, out, `${vp}-bundle-click-550ms`));
            await sleep(700); L.shots.push(await shot(page, out, `${vp}-bundle-click-settled`));
            L.tabsAfterClick = await page.evaluate(() => Array.from(document.querySelectorAll('[role="tab"]')).map(b => ({ label: (b.getAttribute('aria-label') || '').slice(0, 24), selected: b.getAttribute('aria-selected'), w: Math.round(b.getBoundingClientRect().width) })));
            await page.locator('[role="tab"][aria-selected="true"]').focus(); await page.keyboard.press('ArrowRight'); await sleep(1200); L.shots.push(await shot(page, out, `${vp}-bundle-keyboard-arrowright`));
            L.tabsAfterKey = await page.evaluate(() => Array.from(document.querySelectorAll('[role="tab"]')).filter(b => b.getAttribute('aria-selected') === 'true').map(b => (b.getAttribute('aria-label') || '').slice(0, 40)));
            L.focusRing = await page.evaluate(() => { const a = document.activeElement; const s = a ? getComputedStyle(a) : null; return s ? { tag: a.tagName, role: a.getAttribute('role'), boxShadow: s.boxShadow.slice(0, 100), outline: s.outlineStyle } : null; });
          }
        } else {
          // mobile: tap a slat
          const tabs = page.locator('[role="tab"]'); if (await tabs.count() > 2) { await tabs.nth(2).tap().catch(() => { }); await sleep(1200); L.shots.push(await shot(page, out, `${vp}-bundle-tap-slat`)); }
          L.tabsMobile = await page.evaluate(() => Array.from(document.querySelectorAll('[role="tab"]')).map(b => Math.round(b.getBoundingClientRect().width)));
          L.carouselHeight = await page.evaluate(() => { const el = document.querySelector('[role="tablist"]'); return el ? Math.round(el.getBoundingClientRect().height) : null; });
        }
      }
      if (t.kind === 'testimonials') {
        L.cards = await page.evaluate(() => Array.from(document.querySelectorAll('[style*="clip-path"]')).slice(0, 5).map(c => ({ w: c.style.width, transform: c.style.transform.replace(/\s+/g, ' ').trim().slice(0, 120), transition: getComputedStyle(c).transitionProperty + ' ' + getComputedStyle(c).transitionDuration + ' ' + getComputedStyle(c).transitionTimingFunction, z: getComputedStyle(c).zIndex })));
        L.cardCount = await page.evaluate(() => document.querySelectorAll('[style*="clip-path"]').length);
        const next = page.locator('button[aria-label="Next testimonial"]');
        if (await next.count()) {
          if (mobile) { await next.tap().catch(() => next.click()); } else { await next.hover(); await sleep(300); L.shots.push(await shot(page, out, `${vp}-bundle-hover-next`)); await next.click(); }
          await sleep(120); L.shots.push(await shot(page, out, `${vp}-bundle-click-120ms`));
          await sleep(300); L.shots.push(await shot(page, out, `${vp}-bundle-click-420ms`));
          await sleep(600); L.shots.push(await shot(page, out, `${vp}-bundle-click-settled`));
        }
        if (!mobile) {
          // click a side card directly
          const side = page.locator('[style*="clip-path"]').nth(2); await side.click({ force: true }).catch(() => { }); await sleep(700); L.shots.push(await shot(page, out, `${vp}-bundle-click-card`));
          await page.keyboard.press('Tab'); await page.keyboard.press('Tab'); L.focusable = await page.evaluate(() => Array.from(document.querySelectorAll('button, a, [tabindex]')).map(b => ({ t: (b.getAttribute('aria-label') || b.textContent || '').trim().slice(0, 30), tab: b.tabIndex })).slice(0, 8));
        }
      }
      if (t.kind === 'floating') {
        L.iconBoxes = await page.evaluate(() => Array.from(document.querySelectorAll('section > div > div')).slice(0, 4).map(d => ({ cls: (d.className || '').slice(0, 80), style: (d.getAttribute('style') || '').slice(0, 120), inner: d.firstElementChild ? (d.firstElementChild.getAttribute('style') || '').slice(0, 120) : null })));
        L.iconCount = await page.evaluate(() => document.querySelectorAll('section > div > div').length);
        L.h1 = await page.evaluate(() => { const h = document.querySelector('h1'); const s = h ? getComputedStyle(h) : null; return s ? { fontSize: s.fontSize, bgImage: s.backgroundImage.slice(0, 120), clip: s.webkitBackgroundClip || s.backgroundClip } : null; });
        L.sectionH = await page.evaluate(() => { const s = document.querySelector('section'); return s ? Math.round(s.getBoundingClientRect().height) : null; });
        L.iconT0 = await page.evaluate(() => Array.from(document.querySelectorAll('section > div > div > div')).slice(0, 4).map(d => (d.style.transform || '').slice(0, 80)));
        await sleep(600);
        L.iconT600 = await page.evaluate(() => Array.from(document.querySelectorAll('section > div > div > div')).slice(0, 4).map(d => (d.style.transform || '').slice(0, 80)));
        if (!mobile) {
          // move mouse near an icon to trigger the repulsion spring
          const box = await page.locator('section > div > div').first().boundingBox().catch(() => null);
          if (box) { await page.mouse.move(box.x + box.width / 2 + 60, box.y + box.height / 2 + 40); await sleep(250); L.shots.push(await shot(page, out, `${vp}-bundle-mouse-near-icon`)); L.iconAfterMouse = await page.evaluate(() => Array.from(document.querySelectorAll('section > div > div')).slice(0, 2).map(d => (d.style.transform || '').slice(0, 80))); await page.mouse.move(10, 10); await sleep(600); L.shots.push(await shot(page, out, `${vp}-bundle-mouse-away`)); }
          await page.keyboard.press('Tab'); L.focused = await page.evaluate(() => { const a = document.activeElement; return a ? { tag: a.tagName, text: (a.textContent || '').trim().slice(0, 30), href: a.getAttribute('href') } : null; });
        } else {
          L.iconsOverText = await page.evaluate(() => { const h = document.querySelector('h1'); if (!h) return null; const hr = h.getBoundingClientRect(); return Array.from(document.querySelectorAll('section > div > div')).filter(d => { const r = d.getBoundingClientRect(); return r.left < hr.right && r.right > hr.left && r.top < hr.bottom && r.bottom > hr.top; }).length; });
          L.shots.push(await shot(page, out, `${vp}-bundle-after-1s`));
        }
      }
      L.transitionsSeen = await page.evaluate(() => [...new Set(Array.from(document.querySelectorAll('*')).slice(0, 800).filter(e => getComputedStyle(e).transitionDuration !== '0s').map(e => (getComputedStyle(e).transitionProperty + ' | ' + getComputedStyle(e).transitionDuration + ' | ' + getComputedStyle(e).transitionTimingFunction).slice(0, 110)))].slice(0, 8));
      L.cssAnimated = await page.evaluate(() => Array.from(document.querySelectorAll('*')).slice(0, 800).filter(e => getComputedStyle(e).animationName !== 'none').length);
    } catch (e) { L.error = e.message.slice(0, 200); L.shots.push(await shot(page, out, `${vp}-bundle-error`)); }
    await ctx.close();
  }
  await browser.close();
  fs.writeFileSync(path.join(out, 'extra-bundle-motion.json'), JSON.stringify(log, null, 2));
  console.log('DONE', slug, JSON.stringify({ d: log.desktop.error || log.desktop.shots.length, m: log.mobile.error || log.mobile.shots.length, rm: log.reducedMotion.error || log.reducedMotion.shots.length }));
}
(async () => { for (const s of process.argv.slice(2)) { try { await run(s); } catch (e) { console.log('FAIL', s, e.message.slice(0, 200)); } } })();
