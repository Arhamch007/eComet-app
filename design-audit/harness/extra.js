// extra.js — targeted follow-up captures. usage:
//   node extra.js <url> <slug> <desktop|mobile> <action> [args...]
// actions:
//   scrollreel [stepFrac=0.9] [max=24] [waitMs=1200]   -> extra-<vp>-reel-NN.png (viewport shots while scrolling, for scroll-linked reveals)
//   shot <selector> <name> [waitMs=1200]                 -> extra-<name>.png (scroll selector into view, wait, viewport shot)
//   hover <selector> <nth> <name> [waitMs=700]           -> extra-hover-<name>-before.png / -after.png (element clip + 24px pad) + JSON diff to stdout
//   frames <selector> <name> [gapMs=300]                 -> extra-<name>-f1.png / -f2.png (two frames of element to prove motion)
//   cursor <x> <y> <name>                                -> extra-<name>.png (move mouse, wait 600ms, viewport shot)
//   click <selector> <name> [waitMs=900]                 -> extra-<name>.png (click then viewport shot)
//   tap <selector> <name> [waitMs=900]                   -> same as click but via tap (mobile)
//   eval <jsExpression> [name]                           -> prints JSON result of expression evaluated in page (after full scroll)
const { chromium } = require('playwright-core'); const fs = require('fs'); const path = require('path');
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const [, , url, slug, vpName, action, ...args] = process.argv;
const VP = { desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, isMobile: false, hasTouch: false, userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36' },
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' } }[vpName];
if (!VP || !action) { console.error('bad args'); process.exit(1); }
const outDir = path.resolve(__dirname, '..', 'evidence', slug); fs.mkdirSync(outDir, { recursive: true });
const f = (n) => path.join(outDir, n);
(async () => {
  const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--disable-blink-features=AutomationControlled', '--no-first-run', '--disable-gpu', '--hide-scrollbars'] });
  const ctx = await browser.newContext({ ...VP, locale: 'en-US', ignoreHTTPSErrors: true }); const page = await ctx.newPage(); page.setDefaultTimeout(20000);
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 }); await page.waitForLoadState('load', { timeout: 30000 }).catch(() => { }); await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => { }); await page.waitForTimeout(1500);
  const slowScroll = async () => { await page.evaluate(async () => { const step = Math.max(300, innerHeight * 0.6); let y = 0; const max = () => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight); let g = 0; while (y < max() && g < 400) { y += step; scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); g++; } scrollTo(0, max()); await new Promise(r => setTimeout(r, 800)); scrollTo(0, 0); }); await page.waitForTimeout(800); };
  if (action === 'scrollreel') {
    const frac = parseFloat(args[0] || '0.9'), max = parseInt(args[1] || '24', 10), wait = parseInt(args[2] || '1200', 10);
    const H = VP.viewport.height; let y = 0, i = 0; const total = await page.evaluate(() => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight));
    while (y < total && i < max) { await page.evaluate((yy) => scrollTo(0, yy), y); await page.waitForTimeout(wait); const n = `extra-${vpName}-reel-${String(i + 1).padStart(2, '0')}.png`; await page.screenshot({ path: f(n) }); console.log(n, 'y=' + y); y += Math.round(H * frac); i++; }
  } else if (action === 'shot') {
    await slowScroll(); const [sel, name, wait] = args; const loc = page.locator(sel).first(); await loc.scrollIntoViewIfNeeded({ timeout: 8000 }); await page.waitForTimeout(parseInt(wait || '1200', 10)); await page.screenshot({ path: f(`extra-${name}.png`) }); console.log(`extra-${name}.png`);
  } else if (action === 'hover') {
    await slowScroll(); const [sel, nth, name, wait] = args; const loc = page.locator(sel).nth(parseInt(nth || '0', 10)); await loc.scrollIntoViewIfNeeded({ timeout: 8000 }); await page.waitForTimeout(700);
    const grab = (el) => { const s = getComputedStyle(el); return { transform: s.transform, boxShadow: s.boxShadow.slice(0, 120), bg: s.backgroundColor, color: s.color, borderColor: s.borderColor, filter: s.filter, opacity: s.opacity, bgImage: s.backgroundImage.slice(0, 120), transition: `${s.transitionProperty} | ${s.transitionDuration} | ${s.transitionTimingFunction}`.slice(0, 200) }; };
    const box = await loc.boundingBox(); const pad = 24; const clip = box ? { x: Math.max(0, box.x - pad), y: Math.max(0, box.y - pad), width: Math.min(VP.viewport.width, box.width + pad * 2), height: Math.min(VP.viewport.height, box.height + pad * 2) } : undefined;
    const before = await loc.evaluate(grab); await page.screenshot({ path: f(`extra-hover-${name}-before.png`), clip });
    await loc.hover({ force: true }); await page.waitForTimeout(parseInt(wait || '700', 10)); const after = await loc.evaluate(grab); await page.screenshot({ path: f(`extra-hover-${name}-after.png`), clip });
    const changed = {}; for (const k of Object.keys(before)) if (k !== 'transition' && before[k] !== after[k]) changed[k] = { before: before[k], after: after[k] };
    console.log(JSON.stringify({ name, sel, transition: before.transition, changed }, null, 1));
  } else if (action === 'frames') {
    await slowScroll(); const [sel, name, gap] = args; const loc = page.locator(sel).first(); await loc.scrollIntoViewIfNeeded({ timeout: 8000 }); await page.waitForTimeout(800); const box = await loc.boundingBox(); const clip = box ? { x: Math.max(0, box.x), y: Math.max(0, box.y), width: Math.min(VP.viewport.width, box.width), height: Math.min(VP.viewport.height, Math.max(40, box.height)) } : undefined;
    await page.screenshot({ path: f(`extra-${name}-f1.png`), clip }); await page.waitForTimeout(parseInt(gap || '300', 10)); await page.screenshot({ path: f(`extra-${name}-f2.png`), clip }); console.log(`extra-${name}-f1/f2.png`);
  } else if (action === 'cursor') {
    const [x, y, name] = args; await page.mouse.move(parseInt(x, 10), parseInt(y, 10)); await page.waitForTimeout(300); await page.mouse.move(parseInt(x, 10) + 30, parseInt(y, 10) + 20, { steps: 8 }); await page.waitForTimeout(600); await page.screenshot({ path: f(`extra-${name}.png`) }); console.log(`extra-${name}.png`);
  } else if (action === 'click' || action === 'tap') {
    const [sel, name, wait] = args; const loc = page.locator(sel).first(); if (action === 'tap') await loc.tap({ force: true }); else await loc.click({ force: true }); await page.waitForTimeout(parseInt(wait || '900', 10)); await page.screenshot({ path: f(`extra-${name}.png`) }); console.log(`extra-${name}.png`);
  } else if (action === 'eval') {
    await slowScroll(); const r = await page.evaluate(args[0]); console.log(JSON.stringify(r, null, 1));
  }
  await browser.close();
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
