// summarize-a2.js <slug> — compact text summary of evidence/<slug>/data.json for the teardown
const fs = require('fs'); const path = require('path');
const slug = process.argv[2]; const f = path.join(__dirname, '..', 'evidence', slug, 'data.json');
const d = JSON.parse(fs.readFileSync(f, 'utf8'));
const j = (o) => JSON.stringify(o);
console.log('URL', d.url, '| captured', d.capturedAt);
for (const vp of ['desktop', 'mobile']) {
  const v = d.viewports[vp]; if (!v) { console.log(`\n### ${vp}: NOT CAPTURED`); continue; }
  console.log(`\n### ${vp}: status ${v.status} final ${v.finalUrl} server ${v.server} loadMs ${v.loadMs} errors ${j(v.errors)}`);
  console.log('perf', j(v.perfAfterLoad), 'afterScroll', j(v.perfAfterScroll));
  const x = v.data; if (!x || x.error) { console.log('DATA ERROR', x && x.error); continue; }
  if (vp === 'desktop') {
    console.log('title:', x.title, '| lang', x.lang); console.log('meta:', j(x.meta)); console.log('canonical:', x.canonical);
    console.log('h1Count', x.h1Count, 'h1:', j(x.h1)); console.log('headings:', x.headings.map(h => `${h.tag}: ${h.text}`).join(' || '));
    console.log('jsonLd types:', j(x.jsonLd.map(s => s['@type'] || (s['@graph'] ? '@graph:' + s['@graph'].map(g => g['@type']).join(',') : Object.keys(s).slice(0, 3)))));
    console.log('fonts loaded:', j([...new Set(x.fonts.loaded.map(f => f.family + ' ' + f.weight))]));
    console.log('typography:', j(x.typography));
    console.log('tokens.fontFamilies:', j(x.tokens.fontFamilies)); console.log('tokens.fontSizes:', j(x.tokens.fontSizes)); console.log('tokens.textColors:', j(x.tokens.textColors)); console.log('tokens.backgrounds:', j(x.tokens.backgrounds)); console.log('tokens.radii:', j(x.tokens.radii)); console.log('tokens.shadows:', j(x.tokens.shadows)); console.log('tokens.borders:', j(x.tokens.borders)); console.log('tokens.backdropBlur:', j(x.tokens.backdropBlur)); console.log('tokens.gradients:', j(x.tokens.gradients)); console.log('tokens.transitions:', j(x.tokens.transitions));
    console.log('cssVars (' + x.cssVarCount + '):', j(x.cssVars)); console.log('keyframes:', j(x.keyframes), 'cssRules', x.cssRuleCount, 'blockedSheets', x.cssSheetsBlocked, 'reducedMotion', x.reducedMotionRule);
    console.log('buttons:', j(x.buttons));
    console.log('links:', j({ total: x.links.total, internalCount: x.links.internal.length, externalCount: x.links.external.length, emptyText: x.links.emptyText, tel: x.links.tel, mailto: x.links.mailto, hashOnly: x.links.hashOnly, ctaTexts: x.links.ctaTexts, external: x.links.external.slice(0, 30) }));
    console.log('images:', j(x.images)); console.log('media:', j(x.media));
    console.log('a11y:', j(x.a11y)); console.log('globals:', j(x.globals));
    console.log('network:', j({ requests: v.network.requests, transferKB: v.network.transferKB, byType: v.network.byType, detectedFromUrls: v.network.detectedFromUrls, detectedFromBundleContents: v.network.detectedFromBundleContents, largest: v.network.largest, failed: v.network.failed, thirdPartyHosts: v.network.thirdPartyHosts }));
    console.log('consoleErrors:', j(v.consoleErrors));
    console.log('hover:', j(v.hover));
  }
  console.log('layout:', j(x.layout)); console.log('animationMarkers:', j(x.animationMarkers));
  console.log('sections:'); for (const s of x.sections) console.log(`  [${String(s.i + 1).padStart(2, '0')}] ${s.screenshot || 'NOSHOT'} top=${s.top} h=${s.height} <${s.tag}${s.id ? '#' + s.id : ''} .${s.cls.slice(0, 50)}> H:${s.headingTag}:"${s.heading}" eyebrow:"${s.eyebrow}" ctas:${j(s.ctas)} imgs:${s.imgs} svgs:${s.svgs} vid:${s.videos} cards:${s.cards} bg:${s.bg} bgImg:${s.bgImage.slice(0, 60)} pad:${s.padding} anim:${j(s.animation)} grid:${s.grid}`);
  if (vp === 'mobile') console.log('mobileMenuScreenshot:', v.mobileMenuScreenshot);
}
console.log('\nrobots:', d['robots.txt'] && d['robots.txt'].status, (d['robots.txt'] && d['robots.txt'].preview || '').slice(0, 300).replace(/\n/g, ' | '));
console.log('sitemap:', d['sitemap.xml'] && d['sitemap.xml'].status, (d['sitemap.xml'] && d['sitemap.xml'].preview || '').slice(0, 400).replace(/\n/g, ' '));
