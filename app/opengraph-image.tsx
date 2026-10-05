import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

/* The link-preview image (WhatsApp, LinkedIn, Facebook, X, Slack). Built once
   at build time as a 1200 x 630 PNG. Same look as the footer: navy into
   violet with soft aqua and blue glows, the real logo, and the hero's four
   keywords as the headline, set in Figtree (static TTFs in assets/fonts,
   because the image renderer reads neither woff2 nor variable fonts). */

export const alt = "eComet: Web Solutions, AI Automation, Growth Marketing and Digital Support";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function OpengraphImage() {
  const root = process.cwd();
  const [bold, medium, logo] = await Promise.all([
    readFile(join(root, "assets/fonts/Figtree-Bold.ttf")),
    readFile(join(root, "assets/fonts/Figtree-Medium.ttf")),
    readFile(join(root, "public/brand/ecomet-logo-on-dark.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          fontFamily: "Figtree",
          color: "#ffffff",
          backgroundColor: "#0a0f24",
          backgroundImage:
            "radial-gradient(circle at 92% 108%, rgba(1,226,248,0.35), rgba(1,226,248,0) 42%), radial-gradient(circle at 4% -8%, rgba(21,144,236,0.35), rgba(21,144,236,0) 40%), linear-gradient(160deg, #0a0f24 0%, #111a4a 32%, #1d1868 60%, #391780 82%, #5a1de0 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={256} height={64} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 64, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            <span>Web Solutions, AI Automation,</span>
            <span>Growth Marketing &amp; Digital Support</span>
          </div>
          <div style={{ marginTop: 24, fontSize: 28, fontWeight: 500, color: "rgba(255,255,255,0.78)" }}>
            One team for businesses in the USA, Canada and Europe
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              width: 180,
              height: 6,
              borderRadius: 999,
              backgroundImage: "linear-gradient(90deg, #01e2f8, #1590ec 35%, #0d5df5 65%, #681bf5)",
            }}
          />
          <div style={{ fontSize: 26, fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>
            {site.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Figtree", data: bold, weight: 700, style: "normal" },
        { name: "Figtree", data: medium, weight: 500, style: "normal" },
      ],
    }
  );
}
