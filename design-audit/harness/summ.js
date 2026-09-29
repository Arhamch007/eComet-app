// summ.js <slug> [part] — compact summary of evidence/<slug>/data.json. part: all|head|tokens|sections|hover|network|perf|a11y|links
const fs = require('fs');
const path = require('path');
const slug = process.argv[2];
const part = process.argv[3] || 'all';
const d = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'evidence', slug, 'data.json'), 'utf8'));
const D = d.viewports.desktop || {};
const M = d.viewports.mobile || {};
const dd = D.data || {};
const md = M.data || {};
const p = (o) => console.log(JSON.stringify(o));
const want = (k) => part === 'all' || part === k;
const sl = (s, n) => String(s == null ? '' : s).slice(0, n);
console.log(`== ${slug} ${d.url} captured ${d.capturedAt}`);

if (want('head')) {
  p({ status: D.status, finalUrl: D.finalUrl, server: D.server, headers: D.responseHeaders, loadMs: D.loadMs, errors: D.errors, mobileErrors: M.errors, mobileMenuShot: M.mobileMenuScreenshot, consoleErrors: (D.consoleErrors || []).slice(0, 5) });
  p({ title: dd.title, lang: dd.lang, meta: dd.meta, canonical: dd.canonical, h1Count: dd.h1Count, h1: dd.h1, wordCount: dd.wordCount, jsonLd: dd.jsonLd });
  console.log('HEADINGS:');
  (dd.headings || []).forEach(h => console.log(`  ${h.tag} | ${h.text}`));
  p({ fontsLoaded: [...new Set(((dd.fonts && dd.fonts.loaded) || []).map(f => `${f.family} ${f.weight}`))] });
  console.log('TYPOGRAPHY:');
  for (const [k, v] of Object.entries(dd.typography || {})) console.log(`  ${k} | ${sl(v.fontFamily, 50)} | ${v.fontSize} | w${v.fontWeight} | lh ${v.lineHeight} | ls ${v.letterSpacing} | ${v.color} | bg ${v.bg} | ${v.textTransform}`);
  console.log('MOBILE TYPO:');
  for (const k of ['h1', 'h2', 'p', 'body', 'button']) if (md.typography && md.typography[k]) console.log(`  ${k} | ${md.typography[k].fontSize} | w${md.typography[k].fontWeight} | lh ${md.typography[k].lineHeight}`);
  p({ layout: dd.layout });
  p({ mobileLayout: md.layout });
  p({ globals: dd.globals });
  p({ animationMarkers: dd.animationMarkers });
  p({ mobileAnimationMarkers: md.animationMarkers });
  p({ keyframes: dd.keyframes, reducedMotionRule: dd.reducedMotionRule, cssRuleCount: dd.cssRuleCount, cssSheetsBlocked: dd.cssSheetsBlocked, cssVarCount: dd.cssVarCount });
  p({ media: dd.media });
  p({ images: dd.images });
}

if (want('tokens')) {
  const t = dd.tokens || {};
  for (const k of Object.keys(t)) {
    console.log(`TOKENS.${k}:`);
    const v = t[k];
    if (Array.isArray(v)) v.forEach(x => console.log('  ' + (typeof x === 'string' ? x : `${x.count}x ${x.value}`)));
  }
  console.log('CSSVARS:');
  for (const [k, v] of Object.entries(dd.cssVars || {})) console.log(`  ${k}: ${v}`);
}

if (want('sections')) {
  console.log('BUTTONS:');
  (dd.buttons || []).forEach(b => console.log(`  [${b.tag}] "${b.text}" href=${b.href} bg=${b.bg} bgImg=${sl(b.bgImage, 80)} color=${b.color} r=${b.radius} pad=${b.padding} fs=${b.fontSize} w${b.fontWeight} border=${b.border} shadow=${sl(b.shadow, 60)} tr=${b.transition} size=${b.w}x${b.h}`));
  console.log('SECTIONS desktop:');
  (dd.sections || []).forEach(s => {
    console.log(`  #${s.i + 1} <${s.tag}${s.id ? '#' + s.id : ''}> cls=${sl(s.cls, 50)} top=${s.top} h=${s.height} | ${s.headingTag || ''}: ${s.heading || '-'} | eyebrow=${s.eyebrow || '-'} | ctas=${JSON.stringify(s.ctas)} | imgs=${s.imgs} svgs=${s.svgs} vid=${s.videos} cards=${s.cards} | bg=${s.bg} bgImg=${sl(s.bgImage, 60)} | pad=${s.padding} | anim=${JSON.stringify(s.animation)} | grid=${s.grid} | ${s.screenshot}`);
    console.log(`      text: ${sl(s.text, 200)}`);
  });
  console.log('SECTIONS mobile:');
  (md.sections || []).forEach(s => console.log(`  #${s.i + 1} <${s.tag}${s.id ? '#' + s.id : ''}> top=${s.top} h=${s.height} | ${sl(s.heading || '-', 60)} | grid=${s.grid} | anim=${JSON.stringify(s.animation)} | ${s.screenshot}`));
}

if (want('hover')) {
  console.log('HOVER:');
  (D.hover || []).forEach(h => console.log(`  [${h.tag}] cls=${sl(h.cls, 50)} "${sl(h.text, 30)}" tr=${h.transition || ''} changed=${JSON.stringify(h.changed || h.error)}`));
}

if (want('links')) {
  const l = dd.links || {};
  p({ total: l.total, internalCount: (l.internal || []).length, externalCount: (l.external || []).length, emptyText: l.emptyText, hashOnly: l.hashOnly, tel: l.tel, mailto: l.mailto, ctaTexts: l.ctaTexts });
  console.log('INTERNAL:');
  (l.internal || []).slice(0, 60).forEach(x => console.log('  ' + x));
  console.log('EXTERNAL:');
  (l.external || []).slice(0, 30).forEach(x => console.log('  ' + x));
}

if (want('a11y')) p({ a11y: dd.a11y });

if (want('network')) {
  const n = D.network || {};
  p({ requests: n.requests, transferKB: n.transferKB, byType: n.byType, detectedFromUrls: n.detectedFromUrls, detectedFromBundleContents: n.detectedFromBundleContents });
  console.log('LARGEST:');
  (n.largest || []).forEach(x => console.log(`  ${x.kb}KB ${x.type} ${x.url}`));
  p({ failed: n.failed, thirdPartyHosts: n.thirdPartyHosts });
  const mn = M.network || {};
  p({ mobileTransferKB: mn.transferKB, mobileRequests: mn.requests });
}

if (want('perf')) {
  p({ desktopPerf: D.perfAfterLoad, desktopCLSafterScroll: D.perfAfterScroll });
  p({ mobilePerf: M.perfAfterLoad, mobileCLSafterScroll: M.perfAfterScroll });
  const r = d['robots.txt'], s = d['sitemap.xml'];
  p({ robots: r && { status: r.status, preview: sl(r.preview, 300) }, sitemap: s && { status: s.status, preview: sl(s.preview, 300) } });
}
