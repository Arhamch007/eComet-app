// crawl-light.js <origin> [max] — BFS over internal links using plain fetch; SEO inventory per page
const fs = require('fs'); const path = require('path');
const origin = process.argv[2] || 'https://teamecomet.com'; const MAX = +process.argv[3] || 80;
const seen = new Set(); const queue = [origin + '/']; const rows = [];
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&amp;|&#x27;|&quot;/g, ' ').replace(/\s+/g, ' ').trim();
const m1 = (h, re) => { const m = h.match(re); return m ? m[1].replace(/\s+/g, ' ').trim() : null; };
(async () => {
  while (queue.length && rows.length < MAX) {
    const u = queue.shift(); if (seen.has(u)) continue; seen.add(u);
    const t0 = Date.now(); let r, html = '';
    let chain = [];
    try { r = await fetch(u, { redirect: 'manual', headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36' } }); html = await r.text(); let hops = 0; while (r.status >= 300 && r.status < 400 && r.headers.get('location') && hops < 5) { const nextU = new URL(r.headers.get('location'), u).href; chain.push(r.status + ' -> ' + nextU); if (seen.has(nextU)) break; seen.add(nextU); r = await fetch(nextU, { redirect: 'manual', headers: { 'user-agent': 'Mozilla/5.0' } }); html = await r.text(); hops++; } } catch (e) { rows.push({ url: u, status: 'ERR ' + e.message }); continue; }
    const row = {
      url: u, status: r.status, ms: Date.now() - t0, redirectChain: chain, finalUrl: chain.length ? chain[chain.length - 1].split(' -> ')[1] : u, bytesHtml: html.length,
      title: m1(html, /<title[^>]*>([\s\S]*?)<\/title>/i),
      description: m1(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) || m1(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i),
      canonical: m1(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i),
      robots: m1(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i),
      ogImage: m1(html, /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)["']/i),
      h1: (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || []).map(x => strip(x)).slice(0, 3),
      h2Count: (html.match(/<h2[\s>]/gi) || []).length,
      jsonLd: (html.match(/application\/ld\+json/g) || []).length,
      imgs: (html.match(/<img[\s>]/gi) || []).length,
      imgsNoAlt: (html.match(/<img(?![^>]*\balt=)[^>]*>/gi) || []).length,
      words: strip(html).split(' ').length,
      lang: m1(html, /<html[^>]+lang=["']([^"']+)["']/i),
      stackworxMentions: (html.match(/stackworx/gi) || []).length,
      phoneNumbers: [...new Set((html.match(/\+?\d[\d\s().-]{8,}\d/g) || []).filter(x => x.replace(/\D/g, '').length >= 10).map(x => x.trim()))].slice(0, 6),
      emails: [...new Set((html.match(/[\w.+-]+@[\w-]+\.[\w.]+/g) || []))].slice(0, 5),
    };
    rows.push(row);
    if (r.status === 200) { const links = [...html.matchAll(/href=["']([^"'#?]+)[^"']*["']/gi)].map(m => m[1]); for (const l of links) { try { const abs = new URL(l, u).href; if (abs.startsWith(origin) && !/\.(png|jpe?g|svg|webp|pdf|css|js|ico|xml|txt|woff2?)$/i.test(abs) && !seen.has(abs) && !queue.includes(abs)) queue.push(abs); } catch { } } }
  }
  const out = path.join(__dirname, '..', 'evidence', 'crawl-' + new URL(origin).host + '.json');
  fs.writeFileSync(out, JSON.stringify({ origin, crawledAt: new Date().toISOString(), pages: rows, unvisited: queue.slice(0, 50) }, null, 2));
  console.log('pages', rows.length, 'remaining', queue.length);
  for (const p of rows) console.log(p.status, p.ms + 'ms', p.url, '|', p.title, '| h1:', (p.h1 || []).join(' / ').slice(0, 60), '| desc:', p.description ? 'yes' : 'NO', '| canon:', p.canonical ? 'yes' : 'NO', '| jsonld:', p.jsonLd, '| imgsNoAlt:', p.imgsNoAlt + '/' + p.imgs, '| stackworx:', p.stackworxMentions, '| tel:', (p.phoneNumbers || []).join(', '));
})();
