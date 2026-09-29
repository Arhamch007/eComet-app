// batch.js <urls.json> [concurrency] [--force] — runs audit.js per entry, skips slugs that already have data.json
const { spawn } = require('child_process'); const fs = require('fs'); const path = require('path');
const listFile = process.argv[2] || 'urls.json';
const list = JSON.parse(fs.readFileSync(path.join(__dirname, listFile), 'utf8')); const conc = +process.argv[3] || 3; const force = process.argv.includes('--force');
let i = 0, active = 0; const log = path.join(__dirname, 'batch.log');
function finish() { console.log('DONE'); fs.appendFileSync(log, new Date().toISOString() + ' DONE ' + listFile + '\n'); }
function next() {
  while (active < conc && i < list.length) {
    const item = list[i++];
    if (!force && fs.existsSync(path.join(__dirname, '..', 'evidence', item.slug, 'data.json'))) { console.log('SKIP', item.slug); continue; }
    active++; const t0 = Date.now();
    const p = spawn(process.execPath, ['audit.js', item.url, item.slug, ...(item.args || [])], { cwd: __dirname });
    let out = ''; p.stdout.on('data', d => out += d); p.stderr.on('data', d => out += d);
    const timer = setTimeout(() => { p.kill(); out += '\nTIMEOUT'; }, 540000);
    p.on('close', code => { clearTimeout(timer); active--; const line = `${code === 0 ? 'OK' : 'FAIL'} ${item.slug} ${Math.round((Date.now() - t0) / 1000)}s :: ${out.trim().split('\n').pop().slice(0, 160)}`; console.log(line); fs.appendFileSync(log, new Date().toISOString() + ' ' + line + '\n'); if (i >= list.length && active === 0) finish(); else next(); });
  }
  if (i >= list.length && active === 0) finish();
}
next();
