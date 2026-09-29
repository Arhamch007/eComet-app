// lh.js — sequential Lighthouse runs against teamecomet.com using Edge; writes evidence/lighthouse-<name>-<form>.report.{json,html} and harness/lighthouse.log
const { spawnSync } = require('child_process'); const path = require('path'); const fs = require('fs');
process.env.CHROME_PATH = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const tmp = path.join(__dirname, '..', 'lh-tmp'); fs.mkdirSync(tmp, { recursive: true }); process.env.TEMP = tmp; process.env.TMP = tmp; process.env.TMPDIR = tmp;
const only = process.argv[2] ? process.argv[2].split(",") : null;
const runsAll = [
  ['https://teamecomet.com/', 'home', 'mobile'],
  ['https://teamecomet.com/', 'home', 'desktop'],
  ['https://teamecomet.com/services-4', 'services', 'mobile'],
  ['https://teamecomet.com/contact', 'contact', 'mobile'],
  ['https://teamecomet.com/projects/halyard', 'project-halyard', 'mobile'],
];
const runs = only ? runsAll.filter(([u,n,f]) => only.includes(n+'-'+f)) : runsAll;
const lh = path.join(__dirname, 'node_modules', 'lighthouse', 'cli', 'index.js');
const log = path.join(__dirname, 'lighthouse.log');
for (const [url, name, form] of runs) {
  const out = path.join(__dirname, '..', 'evidence', `lighthouse-${name}-${form}`);
  const args = [lh, url, '--chrome-flags=--headless=new --no-sandbox --disable-gpu', '--output=json', '--output=html', `--output-path=${out}`, '--only-categories=performance,accessibility,best-practices,seo', '--quiet', '--max-wait-for-load=60000'];
  if (form === 'desktop') args.push('--preset=desktop');
  const t0 = Date.now();
  const r = spawnSync(process.execPath, args, { stdio: 'inherit', timeout: 300000, env: process.env });
  const jsonPath = out + '.report.json';
  let line = `${name} ${form} exit ${r.status} ${Math.round((Date.now() - t0) / 1000)}s`;
  if (fs.existsSync(jsonPath)) {
    try { const j = JSON.parse(fs.readFileSync(jsonPath, 'utf8')); const c = j.categories; const a = j.audits; const s = (k) => c[k] && c[k].score != null ? Math.round(c[k].score * 100) : 'n/a'; const d = (k) => a[k] ? a[k].displayValue : 'n/a'; line += ` | perf ${s('performance')} a11y ${s('accessibility')} bp ${s('best-practices')} seo ${s('seo')} | FCP ${d('first-contentful-paint')} LCP ${d('largest-contentful-paint')} TBT ${d('total-blocking-time')} CLS ${d('cumulative-layout-shift')} SI ${d('speed-index')}`; } catch (e) { line += ' parse error ' + e.message; }
  }
  console.log(line); fs.appendFileSync(log, new Date().toISOString() + ' ' + line + '\n');
}
fs.appendFileSync(log, 'DONE lighthouse\n');
