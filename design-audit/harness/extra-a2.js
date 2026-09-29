// extra-a2.js <url> <slug> [--nav=Label1|Label2] [--scrollShots=y1,y2]
// DevTools-style checks: mega menu open, header style at top vs after scroll, mobile menu open, fixed/sticky elements, img alt texts
const { chromium } = require('playwright-core'); const fs = require('fs'); const path = require('path');
const [, , url, slug, ...rest] = process.argv;
const opts = Object.fromEntries(rest.map(a => { const m = a.match(/^--(\w+)(?:=(.*))?$/); return m ? [m[1], m[2] === undefined ? true : m[2]] : [a, true]; }));
const outDir = path.resolve(__dirname, '..', 'evidence', slug); fs.mkdirSync(outDir, { recursive: true });
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const result = { url, slug, at: new Date().toISOString() };
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

async function dismissCookies(page) {
  for (const t of ['Accept', 'Accept All', 'Accept all', 'I agree', 'Got it', 'Allow all', 'OK']) {
    try { const b = page.getByRole('button', { name: t, exact: false }).first(); if (await b.count() && await b.isVisible()) { await b.click({ timeout: 1500 }); await page.waitForTimeout(500); result.cookieDismissed = t; break; } } catch (e) { }
  }
}
function headerStyle(page) {
  return page.evaluate(() => {
    const h = document.querySelector('header, nav, [class*="navbar"], [class*="header"], [class*="Header"]'); if (!h) return null;
    const s = getComputedStyle(h); const r = h.getBoundingClientRect();
    return { tag: h.tagName, cls: String(h.className).slice(0, 80), position: s.position, top: Math.round(r.top), height: Math.round(r.height), bg: s.backgroundColor, backdrop: s.backdropFilter, shadow: s.boxShadow.slice(0, 100), transition: (s.transitionProperty + ' ' + s.transitionDuration).slice(0, 120), parentPosition: h.parentElement ? getComputedStyle(h.parentElement).position : null };
  });
}
function fixedElements(page) {
  return page.evaluate(() => Array.from(document.querySelectorAll('body *')).filter(e => { const s = getComputedStyle(e); const r = e.getBoundingClientRect(); return (s.position === 'fixed' || s.position === 'sticky') && r.width > 30 && r.height > 20 && s.display !== 'none' && s.visibility !== 'hidden' && parseFloat(s.opacity) > 0; }).slice(0, 15).map(e => { const r = e.getBoundingClientRect(); return { tag: e.tagName, cls: String(e.className).slice(0, 60), id: e.id, pos: getComputedStyle(e).position, box: Math.round(r.x) + ',' + Math.round(r.y) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height), text: (e.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 50) }; }));
}
function biggestPanel(page, minH, minW) {
  return page.evaluate(([minH, minW]) => {
    const c = Array.from(document.querySelectorAll('body *')).filter(e => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.height > minH && r.width > minW && r.top >= 0 && r.top < 500 && s.display !== 'none' && s.visibility !== 'hidden' && parseFloat(s.opacity) > 0.5 && (s.position === 'fixed' || s.position === 'absolute'); });
    c.sort((a, b) => (b.getBoundingClientRect().width * b.getBoundingClientRect().height) - (a.getBoundingClientRect().width * a.getBoundingClientRect().height));
    const p = c[0]; if (!p) return null; const r = p.getBoundingClientRect(); const s = getComputedStyle(p);
    return { cls: String(p.className).slice(0, 80), box: Math.round(r.x) + ',' + Math.round(r.y) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height), links: p.querySelectorAll('a').length, lists: p.querySelectorAll('ul').length, imgs: p.querySelectorAll('img, svg').length, headings: Array.from(p.querySelectorAll('h2,h3,h4,strong,b')).map(h => (h.textContent || '').trim().slice(0, 30)).filter(Boolean).slice(0, 12), bg: s.backgroundColor, shadow: s.boxShadow.slice(0, 80), radius: s.borderRadius, transition: (s.transitionProperty + ' ' + s.transitionDuration).slice(0, 100), ctas: Array.from(p.querySelectorAll('a[class*="btn" i], a[class*="button" i], button')).map(b => (b.textContent || '').trim().slice(0, 40)).filter(Boolean).slice(0, 6) };
  }, [minH, minW]);
}

(async () => {
  const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--disable-blink-features=AutomationControlled', '--no-first-run', '--disable-gpu', '--hide-scrollbars'] });
  // ---------- desktop ----------
  try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US', ignoreHTTPSErrors: true, userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36' });
    const page = await ctx.newPage(); page.setDefaultTimeout(20000);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 }); await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => { }); await page.waitForTimeout(1500);
    await dismissCookies(page);
    result.headerAtTop = await headerStyle(page);
    result.imgAlts = await page.evaluate(() => Array.from(new Set(Array.from(document.images).map(i => (i.alt || '').trim()).filter(Boolean))).slice(0, 220));
    result.navTop = await page.evaluate(() => Array.from(document.querySelectorAll('header a, nav a, header button, nav button')).map(a => (a.textContent || '').replace(/\s+/g, ' ').trim()).filter(t => t && t.length < 40).slice(0, 40));
    const labels = opts.nav ? String(opts.nav).split('|') : []; result.megaMenus = [];
    for (const label of labels) {
      try {
        const el = page.locator('header a, header button, nav a, nav button, header li > span, header li').filter({ hasText: new RegExp('^\\s*' + esc(label) + '\\s*$', 'i') }).first();
        if (!(await el.count())) { result.megaMenus.push({ label, error: 'not found' }); continue; }
        await el.hover({ timeout: 4000 }); await page.waitForTimeout(1100);
        const panel = await biggestPanel(page, 120, 300);
        const file = 'extra-megamenu-' + label.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.png';
        await page.screenshot({ path: path.join(outDir, file) });
        result.megaMenus.push({ label, panel, screenshot: file });
        await page.mouse.move(5, 600); await page.waitForTimeout(600);
      } catch (e) { result.megaMenus.push({ label, error: e.message.slice(0, 120) }); }
    }
    await page.evaluate(() => window.scrollTo(0, 1400)); await page.waitForTimeout(1200);
    result.headerScrolled = await headerStyle(page);
    await page.screenshot({ path: path.join(outDir, 'extra-header-scrolled.png'), clip: { x: 0, y: 0, width: 1440, height: 160 } });
    if (opts.scrollShots) { let n = 0; for (const y of String(opts.scrollShots).split(',').map(Number)) { n++; await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(1400); await page.screenshot({ path: path.join(outDir, 'extra-scroll-' + n + '-y' + y + '.png') }); } }
    result.fixedElementsDesktop = await fixedElements(page);
    await ctx.close();
  } catch (e) { result.desktopError = e.message.slice(0, 200); }
  // ---------- mobile ----------
  try {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: 'en-US', ignoreHTTPSErrors: true, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' });
    const page = await ctx.newPage(); page.setDefaultTimeout(20000);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 }); await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => { }); await page.waitForTimeout(1500);
    await dismissCookies(page);
    const ham = page.locator(opts.ham ? String(opts.ham) : '[class*="hamburger"], [class*="burger"], [class*="navbar-toggler"], [class*="menu-toggle"], button[aria-label*="menu" i], [aria-label*="Menu" i], [class*="menu-btn"], [class*="MobileMenu"] button, header button, nav button').first();
    if (await ham.count()) {
      await ham.click({ timeout: 4000, force: true }); await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(outDir, 'extra-mobile-menu.png') });
      result.mobileMenu = { clicked: true, screenshot: 'extra-mobile-menu.png', panel: await biggestPanel(page, 300, 200) };
    } else result.mobileMenu = { clicked: false };
    await page.keyboard.press('Escape').catch(() => { });
    await page.evaluate(() => window.scrollTo(0, 2000)); await page.waitForTimeout(1000);
    result.fixedElementsMobile = await fixedElements(page);
    await page.screenshot({ path: path.join(outDir, 'extra-mobile-scrolled.png') });
    await ctx.close();
  } catch (e) { result.mobileError = e.message.slice(0, 200); }
  await browser.close();
  fs.writeFileSync(path.join(outDir, 'extra-data.json'), JSON.stringify(result, null, 2));
  console.log('EXTRA OK', slug, JSON.stringify({ mega: (result.megaMenus || []).map(m => m.label + ':' + (m.panel ? m.panel.links + ' links' : m.error)), hdrTop: result.headerAtTop && result.headerAtTop.bg, hdrScrolled: result.headerScrolled && result.headerScrolled.bg, mobileMenu: result.mobileMenu && result.mobileMenu.clicked }));
})().catch(e => { console.error('EXTRA FATAL', slug, e.message); process.exit(1); });
