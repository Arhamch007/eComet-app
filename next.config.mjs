/** @type {import('next').NextConfig} */

// The site is one page now; the old multi-page routes 301 to the matching
// section so crawlers and old backlinks land on the live design.
const oldRoutes = [
  ["/services", "/#services"],
  ["/services/:slug", "/#services"],
  ["/work", "/#process"],
  ["/work/:slug", "/#process"],
  ["/about", "/#why"],
  ["/team", "/#why"],
  ["/contact", "/#contact"],
];

// Next's App Router streams its payload in inline <script> tags, and the
// pages are statically prerendered, so scripts need 'unsafe-inline' (nonces
// would force every page to render per request). The policy still pins every
// other source: the only outside origin the page talks to is Formspree.
// 'unsafe-eval' is for `next dev` only.
const isDev = process.env.NODE_ENV !== "production";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self' https://formspree.io${isDev ? " ws:" : ""}`,
  "form-action 'self' https://formspree.io",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // The `preload` directive alone does nothing until the production domain
  // is submitted at hstspreload.org and accepted onto the browser list —
  // safe to ship now so it's already correct once that happens.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

// STATIC_EXPORT=1 builds a plain static folder (out/) for Netlify drag-and-drop.
// Redirects and headers then come from out/_redirects and out/_headers, written
// by scripts/build-netlify-drop.mjs, because a static host never runs Next.
const isExport = process.env.STATIC_EXPORT === "1";

const nextConfig = {
  ...(isExport ? { output: "export" } : {}),
  reactStrictMode: true,
  trailingSlash: false,
  poweredByHeader: false,
  eslint: { ignoreDuringBuilds: true },
  images: isExport ? { unoptimized: true } : { formats: ["image/avif", "image/webp"] },
  ...(isExport ? {} : { redirects, headers }),
};

async function redirects() {
  return oldRoutes.map(([source, destination]) => ({ source, destination, permanent: true }));
}

async function headers() {
  return [{ source: "/:path*", headers: securityHeaders }];
}

export { oldRoutes, securityHeaders };
export default nextConfig;
