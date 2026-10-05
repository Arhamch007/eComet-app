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
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  poweredByHeader: false,
  eslint: { ignoreDuringBuilds: true },
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return oldRoutes.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};
export default nextConfig;
