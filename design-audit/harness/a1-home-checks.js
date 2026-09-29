// a1-home-checks.js - single-browser DevTools-style checks on the live home page (read-only)
const { chromium } = require('playwright-core'); const fs = require('fs'); const path = require('path');
const out = path.join(__dirname, '..', 'evidence', 'teamecomet-home'); fs.mkdirSync(out, { recursive: true });
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
  const res = {};
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36' });
  const page = await ctx.newPage();
  const fontReqs = []; const failed = []; const reqs = [];
  page.on('request', r => { reqs.push(r.url()); if (/fonts\.gstatic|\.woff|\.ttf|\.eot/i.test(r.url())) fontReqs.push(r.url()); });
  page.on('requestfailed', r => failed.push(r.url() + ' :: ' + ((r.failure() || {}).errorText || '')));
  const t0 = Date.now();
  await page.goto('https://teamecomet.com/', { waitUntil: 'load', timeout: 150000 });
  res.loadMs = Date.now() - t0;
  await page.screenshot({ path: path.join(out, 'extra-hero-t0.png') });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: path.join(out, 'extra-hero-t2500.png') });
  res.fonts = await page.evaluate(async () => {
    await document.fonts.ready;
    const all = [...document.fonts].map(f => ({ family: f.family, weight: f.weight, style: f.style, status: f.status }));
    const loaded = all.filter(f => f.status === 'loaded');
    return { faceCount: all.length, loadedCount: loaded.length, loaded: loaded.map(f => f.family + ' ' + f.weight + f.style).slice(0, 40), checkDosis700: document.fonts.check('700 40px Dosis'), checkOpenSans400: document.fonts.check('400 15px "Open Sans"'), checkOpenSans600: document.fonts.check('600 15px "Open Sans"'), families: [...new Set(all.map(f => f.family))] };
  });
  res.fontRequests = fontReqs; res.failedRequests = failed;
  res.aosBeforeScroll = await page.evaluate(() => {
    const els = [...document.querySelectorAll('[data-aos]')];
    const vis = els.filter(e => e.classList.contains('aos-animate'));
    const hidden = els.filter(e => getComputedStyle(e).opacity === '0');
    return { total: els.length, animated: vis.length, opacity0: hidden.length, opacity0Samples: hidden.slice(0, 6).map(e => e.className + ' :: ' + (e.textContent || '').trim().slice(0, 40)) };
  });
  res.heroAnim = await page.evaluate(() => {
    const s = document.querySelector('.main-banner-area'); const b = getComputedStyle(s, '::before'); const a = getComputedStyle(s, '::after');
    const over = [...document.querySelectorAll('.over-shape img')].map(i => ({ src: i.getAttribute('src'), anim: getComputedStyle(i).animationName, dur: getComputedStyle(i).animationDuration, iter: getComputedStyle(i).animationIterationCount, w: i.naturalWidth, h: i.naturalHeight }));
    const shapes = [...document.querySelectorAll('.banner-img img')].map(i => ({ src: i.getAttribute('src'), cls: i.className, anim: getComputedStyle(i).animationName, dur: getComputedStyle(i).animationDuration, w: i.naturalWidth, h: i.naturalHeight, visible: i.getBoundingClientRect().width > 0 }));
    const main = document.querySelector('.banner-main-img img');
    return { sectionBg: getComputedStyle(s).backgroundImage, beforeAnim: b.animationName + ' ' + b.animationDuration + ' ' + b.animationIterationCount, beforeBg: b.backgroundImage, afterAnim: a.animationName + ' ' + a.animationDuration + ' ' + a.animationIterationCount, overShapes: over, bannerShapes: shapes, mainImg: { src: main && main.getAttribute('src'), display: main && getComputedStyle(main.parentElement).display, natural: main && (main.naturalWidth + 'x' + main.naturalHeight), complete: main && main.complete }, h1: getComputedStyle(document.querySelector('h1')).fontFamily, h1Rendered: document.querySelector('h1').getBoundingClientRect().height, featureIconAnim: [...document.querySelectorAll('.single-features i')].slice(0, 3).map(e => getComputedStyle(e).animationName + ' ' + getComputedStyle(e).animationDuration) };
  });
  await page.evaluate(() => window.scrollTo(0, 400)); await page.waitForTimeout(500);
  res.headerAt400 = await page.evaluate(() => { const n = document.getElementById('navbar'); const cs = getComputedStyle(n); return { cls: n.className, bg: cs.backgroundColor, position: cs.position, height: n.getBoundingClientRect().height, navLinkColor: getComputedStyle(document.querySelector('.nav-link')).color, textShadow: getComputedStyle(document.querySelector('.nav-link.active')).textShadow }; });
  await page.screenshot({ path: path.join(out, 'extra-header-sticky-400.png') });
  const H = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < H; y += 600) { await page.evaluate(v => window.scrollTo(0, v), y); await page.waitForTimeout(120); } await page.waitForTimeout(800);
  res.aosAfterFullScroll = await page.evaluate(() => { const els = [...document.querySelectorAll('[data-aos]')]; return { animated: els.filter(e => e.classList.contains('aos-animate')).length, opacity0: els.filter(e => getComputedStyle(e).opacity === '0').length }; });
  await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(900);
  res.aosAfterScrollBackTop = await page.evaluate(() => { const els = [...document.querySelectorAll('[data-aos]')]; const hid = els.filter(e => getComputedStyle(e).opacity === '0'); return { animated: els.filter(e => e.classList.contains('aos-animate')).length, opacity0: hid.length, samples: hid.slice(0, 5).map(e => (e.textContent || '').trim().slice(0, 40)) }; });
  const svc = await page.$('.offer-area'); if (svc) { const bb = await svc.boundingBox(); await page.screenshot({ path: path.join(out, 'extra-services-after-scrollback.png'), fullPage: true, clip: { x: 0, y: bb.y, width: 1440, height: Math.min(bb.height, 1400) } }); }
  await page.evaluate(() => window.scrollTo(0, 1200)); await page.waitForTimeout(600);
  res.goTop = await page.evaluate(() => { const t = document.querySelector('.scroll-to-top .top'); if (!t) return null; const cs = getComputedStyle(t); const r = t.getBoundingClientRect(); return { w: r.width, h: r.height, bg: cs.backgroundColor, radius: cs.borderRadius, tag: t.tagName, role: t.getAttribute('role'), tabindex: t.getAttribute('tabindex'), ariaLabel: t.getAttribute('aria-label') }; });
  const tabs = await page.$$('.industries-list-tab .tabs li');
  if (tabs.length > 1) {
    await tabs[1].scrollIntoViewIfNeeded(); await page.waitForTimeout(600); await tabs[1].click(); await page.waitForTimeout(500);
    res.tabs = await page.evaluate(() => ({ items: [...document.querySelectorAll('.tabs_item')].map(t => ({ id: t.id, display: getComputedStyle(t).display })), tabLiClasses: [...document.querySelectorAll('.tabs li')].map(l => l.className) }));
    const tb = await page.$('.industries-list-tab'); const bb = await tb.boundingBox(); await page.screenshot({ path: path.join(out, 'extra-tabs-tab2.png'), clip: { x: 0, y: Math.max(0, bb.y), width: 1440, height: Math.min(bb.height, 880) } });
  }
  res.faq = await page.evaluate(() => [...document.querySelectorAll('.accordion__button')].map(b => ({ q: (b.textContent || '').trim().slice(0, 50), expanded: b.getAttribute('aria-expanded') })));
  res.swipers = await page.evaluate(() => [...document.querySelectorAll('.swiper')].map(s => ({ cls: s.className.slice(0, 60), slides: s.querySelectorAll('.swiper-slide').length, autoplayRunning: !!(s.swiper && s.swiper.autoplay && s.swiper.autoplay.running), delay: s.swiper && s.swiper.params.autoplay && s.swiper.params.autoplay.delay, navBtns: s.querySelectorAll('.swiper-button-next,.swiper-button-prev').length, bullets: s.querySelectorAll('.swiper-pagination-bullet').length })));
  res.focus = await page.evaluate(() => { const a = document.querySelector('.default-btn'); a.focus(); const cs = getComputedStyle(a); return { outline: cs.outlineStyle + ' ' + cs.outlineWidth, boxShadow: cs.boxShadow, activeIsBtn: document.activeElement === a }; });
  res.testimonialCard = await page.evaluate(() => { const c = document.querySelector('.single-client'); const n = document.querySelector('.client-img h3'); const s = document.querySelector('.client-img span'); const p = document.querySelector('.single-client p'); return { cardBg: getComputedStyle(c).backgroundColor, pColor: getComputedStyle(p).color, nameColor: getComputedStyle(n).color, roleColor: getComputedStyle(s).color, roleSize: getComputedStyle(s).fontSize, clientImgBottom: getComputedStyle(document.querySelector('.client-img')).bottom, sectionBg: getComputedStyle(document.querySelector('.client-area')).backgroundColor }; });
  res.counters = await page.evaluate(() => [...document.querySelectorAll('.single-counter')].map(c => ({ num: c.querySelector('h2').textContent.trim(), label: c.querySelector('p').textContent.trim(), bg: getComputedStyle(c).backgroundColor, shadow: getComputedStyle(c).boxShadow })));
  res.sectionTitleSpan = await page.evaluate(() => [...document.querySelectorAll('.section-title span, .about-content span')].map(s => ({ t: s.textContent.trim(), color: getComputedStyle(s).color, sectionBg: getComputedStyle(s.closest('section') || s.parentElement).backgroundColor })));
  res.footer = await page.evaluate(() => { const f = document.getElementById('footer'); const cs = getComputedStyle(f); const logo = f.querySelector('img'); return { bg: cs.backgroundColor, color: cs.color, pColor: getComputedStyle(f.querySelector('p')).color, logo: { src: logo && logo.getAttribute('src'), alt: logo && logo.getAttribute('alt'), w: logo && logo.getBoundingClientRect().width, h: logo && logo.getBoundingClientRect().height }, links: [...f.querySelectorAll('a')].map(a => ({ href: a.getAttribute('href'), text: (a.textContent || '').trim(), ariaLabel: a.getAttribute('aria-label'), target: a.getAttribute('target') })), designedBy: (f.querySelector('.designed') || {}).textContent }; });
  res.totalRequests = reqs.length; res.imageRequests = reqs.filter(u => /\.(png|jpe?g|svg|webp|gif)(\?|$)/i.test(u)).length;
  await page.close(); await ctx.close();
  const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' });
  const mp = await mctx.newPage(); await mp.goto('https://teamecomet.com/', { waitUntil: 'load', timeout: 150000 }); await mp.waitForTimeout(1500);
  res.mobile = {};
  res.mobile.hero = await mp.evaluate(() => { const h1 = document.querySelector('h1'); const p = document.querySelector('.banner-text p'); const s = document.querySelector('.main-banner-area'); const btns = [...document.querySelectorAll('.banner-btn a')].map(b => { const r = b.getBoundingClientRect(); return { t: b.textContent.trim(), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; }); const r = h1.getBoundingClientRect(); return { h1Size: getComputedStyle(h1).fontSize, h1Top: Math.round(r.y), h1Lines: Math.round(r.height / parseFloat(getComputedStyle(h1).lineHeight)), pSize: getComputedStyle(p).fontSize, pLen: p.textContent.length, sectionH: Math.round(s.getBoundingClientRect().height), padTop: getComputedStyle(s).paddingTop, padBottom: getComputedStyle(s).paddingBottom, btns, docW: document.documentElement.scrollWidth, vw: innerWidth, navH: document.getElementById('navbar').getBoundingClientRect().height, logoW: document.querySelector('.navbar-brand img').getBoundingClientRect().width }; });
  await mp.screenshot({ path: path.join(out, 'extra-mobile-hero-fold.png') });
  const ham = await mp.$('.navbar-toggler');
  if (ham) { await ham.click(); await mp.waitForTimeout(600); res.mobile.menu = await mp.evaluate(() => { const c = document.getElementById('navbarSupportedContent'); const cs = getComputedStyle(c); const links = [...c.querySelectorAll('a')].map(a => { const r = a.getBoundingClientRect(); return { t: a.textContent.trim(), h: Math.round(r.height), color: getComputedStyle(a).color, bg: getComputedStyle(a).backgroundColor }; }); const tg = document.querySelector('.navbar-toggler').getBoundingClientRect(); return { display: cs.display, bg: cs.backgroundColor, height: Math.round(c.getBoundingClientRect().height), links, ariaExpanded: document.querySelector('.navbar-toggler').getAttribute('aria-expanded'), togglerSize: Math.round(tg.width) + 'x' + Math.round(tg.height) }; }); await mp.screenshot({ path: path.join(out, 'extra-mobile-menu-open.png') }); await ham.click(); await mp.waitForTimeout(300); }
  const MH = await mp.evaluate(() => document.body.scrollHeight); for (let y = 0; y < MH; y += 700) { await mp.evaluate(v => window.scrollTo(0, v), y); await mp.waitForTimeout(100); }
  res.mobile.afterScroll = await mp.evaluate(() => ({ scrollW: document.documentElement.scrollWidth, vw: innerWidth, overflowEls: [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); return r.right > innerWidth + 2 && r.width > 0; }).slice(0, 8).map(e => e.tagName + '.' + String(e.className).slice(0, 40) + ' right=' + Math.round(e.getBoundingClientRect().right)), pageH: document.body.scrollHeight, smallTap: [...document.querySelectorAll('a,button')].filter(a => { const r = a.getBoundingClientRect(); return r.width > 0 && (r.width < 44 || r.height < 44); }).length, tapTotal: document.querySelectorAll('a,button').length }));
  const tm = await mp.$('.client-area'); if (tm) { await tm.scrollIntoViewIfNeeded(); await mp.waitForTimeout(700); await mp.screenshot({ path: path.join(out, 'extra-mobile-testimonials.png') }); }
  const cn = await mp.$('.business-area'); if (cn) { await cn.scrollIntoViewIfNeeded(); await mp.waitForTimeout(700); await mp.screenshot({ path: path.join(out, 'extra-mobile-counters.png') }); }
  await mctx.close(); await browser.close();
  fs.writeFileSync(path.join(out, 'extra-checks.json'), JSON.stringify(res, null, 2));
  console.log(JSON.stringify(res, null, 1));
})().catch(e => { console.error('ERR', e); process.exit(1); });
