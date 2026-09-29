import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Figtree } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { site } from "@/content/site";
import { Providers } from "@/components/providers";
import { OrganizationJsonLd } from "@/components/site/json-ld";
import { cn } from "@/lib/utils";

/* Cal Sans (SIL OFL 1.1, see app/fonts/CalSans-OFL.txt) for display headings
   on the inner pages, subset to Latin and pinned to weights 600-700. */
const calSans = localFont({
  src: "./fonts/CalSansVF-latin.woff2",
  variable: "--font-cal-sans",
  weight: "600 700",
  display: "swap",
});

/* Figtree (SIL OFL 1.1): rounded geometric sans that matches the logo's
   letterforms; used by the new home design. Self-hosted by next/font. */
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "eComet | AI automation, web development and e-commerce support",
    template: "%s | eComet",
  },
  description: site.description,
  applicationName: site.name,
  icons: {
    icon: [{ url: "/brand/ecomet-mark.png", type: "image/png" }],
    apple: [{ url: "/brand/ecomet-mark-512.png" }],
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    title: "eComet | AI automation, web development and e-commerce support",
    description: site.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#f6f6f7",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(GeistSans.variable, GeistMono.variable, calSans.variable, figtree.variable, "bg-bg-0")}
    >
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-text-1 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
        <OrganizationJsonLd />
      </body>
    </html>
  );
}
