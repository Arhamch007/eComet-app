// a1-analyse.js — summarise every teamecomet-* data.json for the baseline report
const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..','evidence');
const slugs=fs.readdirSync(root).filter(s=>s.startsWith('teamecomet-')&&fs.existsSync(path.join(root,s,'data.json'))).sort();
const short=(s,n=90)=>String(s??'').replace(/\s+/g,' ').slice(0,n);
for(const slug of slugs){
  const j=JSON.parse(fs.readFileSync(path.join(root,slug,'data.json'),'utf8'));
  console.log('\n################', slug, j.url, 'captured', j.capturedAt);
  for(const vp of ['desktop','mobile']){
    const v=j.viewports[vp]; if(!v){console.log(vp,'MISSING');continue;}
    const d=v.data||{};
    console.log(`\n== ${vp} status ${v.status} final ${v.finalUrl} errors ${JSON.stringify(v.errors)} console ${JSON.stringify(v.consoleErrors)}`);
    console.log('perfAfterLoad', JSON.stringify(v.perfAfterLoad), '| perfAfterScroll', JSON.stringify(v.perfAfterScroll));
    if(v.network) console.log('network', JSON.stringify({requests:v.network.requests,transferKB:v.network.transferKB,byType:v.network.byType,libs:v.network.detectedFromBundleContents,failed:v.network.failed,largest:(v.network.largest||v.network.largestFiles||[]).slice(0,8)}));
    console.log('title', d.title, '| lang', d.lang, '| meta', JSON.stringify(d.meta), '| canonical', d.canonical, '| jsonLd', (d.jsonLd||[]).length, '| words', d.wordCount, '| h1Count', d.h1Count, '| h1', JSON.stringify(d.h1));
    console.log('headings', (d.headings||[]).map(h=>h.tag+':'+short(h.text,40)).join(' | '));
    console.log('fonts', JSON.stringify(d.fonts));
    console.log('typography', JSON.stringify(d.typography));
    console.log('tokens', JSON.stringify(d.tokens));
    console.log('cssVarCount', d.cssVarCount, 'keyframes', (d.keyframes||[]).length, 'cssRules', d.cssRuleCount, 'sheetsBlocked', d.cssSheetsBlocked, 'reducedMotion', d.reducedMotionRule, 'preloads', JSON.stringify(d.preloads));
    console.log('buttons', JSON.stringify(d.buttons));
    console.log('links', JSON.stringify(d.links));
    console.log('images', JSON.stringify(d.images));
    console.log('media', JSON.stringify(d.media));
    console.log('layout', JSON.stringify(d.layout));
    console.log('a11y', JSON.stringify(d.a11y));
    console.log('animationMarkers', JSON.stringify(d.animationMarkers));
    console.log('globals', JSON.stringify(d.globals));
    console.log('sections:');
    for(const s of d.sections||[]) console.log('  ', s.i+1, s.tag+'#'+(s.id||'')+'.'+short(s.cls,40), 'top',s.top,'h',s.height,'|',s.headingTag,short(s.heading,60),'| eyebrow',short(s.eyebrow,30),'| ctas',JSON.stringify(s.ctas),'| imgs',s.imgs,'cards',s.cards,'| bg',s.bg,'bgImg',short(s.bgImage,40),'| pad',s.padding,'| anim',JSON.stringify(s.animation),'| grid',JSON.stringify(s.grid),'|',s.screenshot||s.screenshotError);
    if(v.hover) console.log('hover', JSON.stringify(v.hover.map(h=>({t:h.tag,c:short(h.cls,30),x:short(h.text,20),diff:h.diff||h.changes||h.changed,err:h.error?short(h.error,50):undefined}))));
    if(d.robots!==undefined||d.sitemap!==undefined) console.log('robots',JSON.stringify(d.robots),'sitemap',JSON.stringify(d.sitemap));
    for(const k of Object.keys(d)) if(!['title','lang','meta','canonical','favicon','preloads','headings','h1Count','h1','wordCount','jsonLd','fonts','typography','tokens','cssVars','cssVarCount','keyframes','cssRuleCount','cssSheetsBlocked','reducedMotionRule','buttons','links','images','media','layout','a11y','animationMarkers','globals','sections'].includes(k)) console.log('EXTRA', k, short(JSON.stringify(d[k]),600));
    for(const k of Object.keys(v)) if(!['errors','status','finalUrl','server','responseHeaders','loadMs','perfAfterLoad','perfAfterScroll','data','hover','network','consoleErrors'].includes(k)) console.log('EXTRA-VP', k, short(JSON.stringify(v[k]),600));
  }
}
