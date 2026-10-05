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

const securityHeaders = [
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
