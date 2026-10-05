// Builds the site as plain static files.
//
// On Netlify (Git-connected site — see README-NETLIFY.md), this IS the build
// command: Netlify sets NETLIFY=true, so this script skips the zip step and
// just leaves out/ for Netlify to deploy directly. It also reads Netlify's
// own DEPLOY_PRIME_URL/URL so the canonical, sitemap and share image point
// at whatever URL Netlify actually serves, with no config needed.
//
// Run locally for the old drag-and-drop flow (not recommended — see the
// note in README-NETLIFY.md about why Windows zips broke it):
//   node scripts/build-netlify-drop.mjs                      preview: noindex, ecomet-preview.netlify.app
//   node scripts/build-netlify-drop.mjs --url https://x.netlify.app
//   node scripts/build-netlify-drop.mjs --production         launch: https://teamecomet.com, indexable
//
// Either way: a static host never runs Next, so the redirects and security
// headers from next.config.mjs are written into out/_redirects and
// out/_headers, which Netlify reads.

import { execSync } from "node:child_process";
import { createWriteStream, existsSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const onNetlify = process.env.NETLIFY === "true";
const args = process.argv.slice(2);
const production = args.includes("--production");
const urlArg = args.indexOf("--url") >= 0 ? args[args.indexOf("--url") + 1] : undefined;
const siteUrl = (
  urlArg ??
  (production ? "https://teamecomet.com" : undefined) ??
  process.env.DEPLOY_PRIME_URL ??
  process.env.URL ??
  "https://ecomet-preview.netlify.app"
).replace(/\/$/, "");

const root = resolve(import.meta.dirname, "..");
const out = join(root, "out");
const zip = onNetlify ? null : resolve(root, "..", production ? "eComet-netlify-production.zip" : "eComet-netlify-preview.zip");

const env = {
  ...process.env,
  STATIC_EXPORT: "1",
  NEXT_PUBLIC_SITE_URL: siteUrl,
  NEXT_PUBLIC_NOINDEX: production ? "0" : "1",
  NEXT_TELEMETRY_DISABLED: "1",
};

console.log(`Building ${production ? "PRODUCTION" : "PREVIEW (noindex)"} for ${siteUrl} ...`);
if (existsSync(out)) rmSync(out, { recursive: true, force: true });
execSync("npx next build", { cwd: root, env, stdio: "inherit" });

// Same redirects and headers as next.config.mjs. NODE_ENV must read as
// production here too, or the CSP keeps its dev-only allowances
// ('unsafe-eval', ws:) that the Next build subprocess above already dropped.
process.env.NODE_ENV = "production";
const { oldRoutes, securityHeaders } = await import("../next.config.mjs");

const redirects = oldRoutes
  .map(([from, to]) => `${from.replace(/:slug$/, "*")}  ${to}  301!`)
  .join("\n");
writeFileSync(join(out, "_redirects"), redirects + "\n");

const headerLines = securityHeaders.map(({ key, value }) => `  ${key}: ${value}`);
if (!production) headerLines.push("  X-Robots-Tag: noindex, nofollow");
writeFileSync(join(out, "_headers"), `/*\n${headerLines.join("\n")}\n`);

if (onNetlify) {
  // Netlify deploys the out/ folder itself; no zip, no local-drag step.
  console.log(`\nDone. Publish directory: out`);
} else {
  // Not PowerShell's Compress-Archive or .NET's ZipFile: both write entry
  // names with backslashes on Windows (e.g. "_next\static\css\x.css")
  // instead of the forward slashes the ZIP spec requires. Netlify's Linux
  // unzip then takes that whole string as one literal filename, so every
  // nested asset 404s. archiver (dynamically imported — only installed for
  // this local fallback path) always writes forward slashes.
  const { ZipArchive } = await import("archiver");
  if (existsSync(zip)) rmSync(zip);
  await new Promise((done, fail) => {
    const stream = createWriteStream(zip);
    const archive = new ZipArchive({ zlib: { level: 9 } });
    archive.on("error", fail);
    stream.on("close", done);
    archive.pipe(stream);
    archive.directory(out, false);
    archive.finalize();
  });
  console.log(`\nDone.\n  Folder: ${out}\n  Zip:    ${zip}`);
}
