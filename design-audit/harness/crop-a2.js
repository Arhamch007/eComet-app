// crop-a2.js <srcPng> <dstPng> <x> <y> <w> <h> — crop a PNG region using pure-JS PNG decode/encode (no native deps)
const fs = require('fs'); const zlib = require('zlib');
const [,, src, dst, X, Y, W, H] = process.argv; const x0 = +X, y0 = +Y, w = +W, h = +H;
const buf = fs.readFileSync(src);
let pos = 8; const chunks = []; let width, height, bitDepth, colorType, idat = [];
while (pos < buf.length) { const len = buf.readUInt32BE(pos); const type = buf.toString('ascii', pos + 4, pos + 8); const data = buf.slice(pos + 8, pos + 8 + len); if (type === 'IHDR') { width = data.readUInt32BE(0); height = data.readUInt32BE(4); bitDepth = data[8]; colorType = data[9]; } else if (type === 'IDAT') idat.push(data); pos += 12 + len; }
if (bitDepth !== 8 || (colorType !== 6 && colorType !== 2)) { console.error('unsupported png', bitDepth, colorType); process.exit(1); }
const bpp = colorType === 6 ? 4 : 3; const stride = width * bpp; const raw = zlib.inflateSync(Buffer.concat(idat));
const out = Buffer.alloc(height * stride); let prev = Buffer.alloc(stride);
for (let y = 0; y < height; y++) { const f = raw[y * (stride + 1)]; const line = raw.slice(y * (stride + 1) + 1, (y + 1) * (stride + 1)); const cur = out.slice(y * stride, (y + 1) * stride); for (let i = 0; i < stride; i++) { const a = i >= bpp ? cur[i - bpp] : 0, b = prev[i], c = i >= bpp ? prev[i - bpp] : 0; let v = line[i]; if (f === 1) v += a; else if (f === 2) v += b; else if (f === 3) v += (a + b) >> 1; else if (f === 4) { const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c); v += (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c); } cur[i] = v & 255; } prev = cur; }
const cw = Math.min(w, width - x0), ch = Math.min(h, height - y0); const cs = cw * bpp; const rawOut = Buffer.alloc(ch * (cs + 1));
for (let y = 0; y < ch; y++) { rawOut[y * (cs + 1)] = 0; out.copy(rawOut, y * (cs + 1) + 1, (y0 + y) * stride + x0 * bpp, (y0 + y) * stride + x0 * bpp + cs); }
const crc = (b) => { let c = ~0; for (const v of b) { c ^= v; for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xEDB88320 & -(c & 1)); } return (~c) >>> 0; };
const chunk = (t, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(t), d]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([l, td, c]); };
const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(cw, 0); ihdr.writeUInt32BE(ch, 4); ihdr[8] = 8; ihdr[9] = colorType; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
fs.writeFileSync(dst, Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(rawOut)), chunk('IEND', Buffer.alloc(0))]));
console.log('wrote', dst, cw + 'x' + ch);
