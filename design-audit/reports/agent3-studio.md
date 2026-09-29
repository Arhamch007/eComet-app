# Agent 3 - Modern Studio and Template Teardowns (Group A)

Client: eComet (teamecomet.com). Purpose: evidence-based teardowns of six reference sites (modern studios and templates) to inform a premium redesign. This is inspiration research only; nothing here proposes copying text, imagery, logos or case studies.

## How to read this report

- Every finding is tagged **CONFIRMED** (seen in a named screenshot, in `data.json`, or in the extra-capture output) or **UNVERIFIED** (inferred, not directly observed).
- Evidence lives under `evidence/<slug>/`. Capture harness: playwright-core 1.63 + headless Microsoft Edge 154, desktop 1440x900 and mobile 390x844 (iPhone UA, DPR 2). Section clips are `sections/desktop-NN.png` / `sections/mobile-NN.png`; targeted follow-ups are `extra-*.png`.
- Colours are quoted as the computed values in `data.json` (`tokens.*`, `cssVars`, `buttons[]`, `hover[]`). Typography values are computed styles (`typography.*`).
- Performance numbers are single headless runs on a shared machine during a period of network instability (three sites hit `ERR_INTERNET_DISCONNECTED` / `ERR_NETWORK_CHANGED` on their first `goto` attempt and were retried). Treat TTFB/LCP as upper bounds and compare relatively, not absolutely.
- The harness's hover probe often timed out on elements that were off-screen at probe time; where it did, hover states were re-captured with `harness/extra.js` (before/after clips + computed-style diff), or marked UNVERIFIED.

## Load status (all six sites)

| Site | Slug | Status | Notes |
|---|---|---|---|
| Studiova (Bootstrap template) | `a-studiova` | 200, 13 sections desktop + 13 mobile, mobile menu captured | Captured under degraded network (TTFB 6.9 s desktop); all shots complete. Inner page `a-studiova-inner` (`projects-detail.html`) captured. |
| Dixor React template | `a-dixor` | 200 after re-run (first run: `ERR_INTERNET_DISCONNECTED` on all 3 attempts) | 11 sections desktop, 12 mobile; sections 10 and 11 have no clip (screenshot timeout) but are visible in `desktop-full.png`. Inner page `a-dixor-inner` (`/service-details/1`) captured. Extra: 17-frame desktop scroll reel. |
| Wevetech (Lovable) | `a-wevetech` | 200 after re-run (same network drop) | 9 sections desktop/mobile. Harness could not click the mobile menu; captured with `extra.js tap` (`extra-wevetech-menu.png`). Desktop hover retries hit a second network drop; see Teardown 3 for what is CONFIRMED vs UNVERIFIED. Single-page site (only `/services`, `/projects`, `/contact` links; not captured). |
| Mau5tech | `a-mau5tech` | 200 (attempt 1 failed with `ERR_INTERNET_DISCONNECTED`, attempt 2 loaded) | 7 sections desktop, 6 mobile; mobile menu captured. Single-page site (anchor links only), so no inner page exists. |
| ZeynApp | `a-zeynapp` | 200 (attempt 1 failed, attempt 2 loaded), 1 error logged | 12 sections desktop, 15 mobile; mobile menu captured. Several sections are scroll-linked and were blank in static clips, so an 8-frame desktop scroll reel and cursor/hover extras were captured. WebGL section did not render in headless (see Teardown 5). Inner page `a-zeynapp-inner` (`/work`) captured. |
| Faheem Naveed portfolio | `a-faheemnaveed` | 200, 18 sections desktop, 16 mobile | Mobile full-page screenshot failed (`Page.captureScreenshot` protocol error) but all 16 mobile section clips exist. No hamburger exists on mobile (nav links are hidden), so there is no `mobile-menu-open.png`. Extras: marquee frames, button/tab/card hover diffs. Single-page site. |

---

## Teardown 1 - Studiova (Bootstrap agency template)

URL: https://studiova-agency-business-bootstrap-template-v2.21st.app/ (a WrapPixel Bootstrap 5 template demo; vendor badge "Get This Template" and `info@wrappixel.com` are CONFIRMED in `desktop-hero.png` and `desktop-13.png`).

### 1. Load status and evidence

CONFIRMED loaded (status 200, server: cloudflare, `data.json` -> `viewports.desktop.status`). Evidence: `desktop-hero.png`, `desktop-full.png` (11,964 px tall), `mobile-hero.png`, `mobile-full.png` (16,750 px), `mobile-menu-open.png`, `sections/desktop-01..13.png`, `sections/mobile-01..13.png`, `extra-hover-studiova-btn-before/after.png`, `extra-studiova-marquee-f1/f2.png`, `extra-hover-studiova-teamcard-before/after.png`. Inner page: `evidence/a-studiova-inner/` (`projects-detail.html`). One extra hover on a portfolio card failed ("Element is outside of the viewport") so card hover is UNVERIFIED.

### 2. Section flow (desktop, top to bottom)

Global system that applies to every section from 03 to 12 (CONFIRMED `desktop-03..12.png`): a two-column "index" layout. Left column (~1/3) carries a lime numbered dot (`01`, `02`...), a short hairline and a pill label ("Stats & facts", "Portfolio", "Services"...) that is dark on light sections and white on the dark Services section. Right column carries H2 (48 px / 700) and a 2-line intro paragraph, then the section body spans the full width below (the Why-choose-us section is the exception: its H2 sits in the left column under the label, `desktop-06.png`). Section padding is 160 px top and bottom (`sections[].padding`), backgrounds alternate white / `#F4F8FA` (`--bs-light-gray`) / `#1F2A2E` (`--bs-dark`).

1. **Hero** (`desktop-01.png`, 900 px, `banner-section`). Purpose: brand statement. A full-bleed autoplay muted loop MP4 (`banner-video.mp4`, 2,277 KB, `media.videos[0]`) behind a dark overlay; a 4 px lime top border on the page (`header.border-4.border-primary.border-top`); logo top-left, round white hamburger top-right; bottom-left a lime asterisk glyph + one-sentence value proposition with one word highlighted lime; below it the wordmark as H1 at 128 px / 700 with a lime pill arrow button. Colour: lime `#C1FF72` (`--bs-primary`), white text on video. Motion: AOS fade-up on two elements (`animation.aos: 2`), video loop. Mobile (`mobile-hero.png`): same composition, H1 62.4 px, video still served (mobile transfer 4,670 KB vs desktop 4,671 KB, CONFIRMED `network.transferKB`), which is the single biggest mobile cost.
2. **Header** (`desktop-02.png`, fixed, 114 px, transparent, no blur - `layout.headerPosition: fixed`, `headerBlur: none`). See section 3.
3. **Stats & facts** (`desktop-03.png`, 928 px). H2 trust claim, paragraph, then three stats (40K+ / 238+ / 3M+) as H2 48 px over top hairlines with 16 px captions, lime pill CTA "Who we are". A faint outlined asterisk decorates the left column. Typography Manrope throughout (`tokens.fontFamilies`: 214x Manrope). Mobile (`mobile-03.png`): stacks to one column.
4. **Featured projects** (`desktop-04.png`, 925 px, bg `#F4F8FA`). Horizontal carousel (`animationMarkers.otherSliders: 1`, prev/next controls in `ctas`) of project cards: 4:3 photo, H3 36 px title, tag pills (outline, 16 px). Cards bleed past both viewport edges to signal scrolling. Mobile (`mobile-04.png`): one card per view, full-width image.
5. **Services** (`desktop-05.png`, 1,291 px, bg `#1F2A2E`). Left: a single tablet photo; right: four service rows separated by 1 px `rgba(255,255,255,0.1)` hairlines, each row = 36 px / 700 title button (active one lime) + 16 px description. "See our Work" lime pill at bottom. The four descriptions are the same sentence repeated (CONFIRMED placeholder). Mobile (`mobile-05.png`): image on top, rows stack, CTA full width.
6. **Why choose us (bento)** (`desktop-06.png`, 782 px). Left: H2 + paragraph. Right: 3-column bento - lime testimonial tile (4 stars, quote, `98.6%` stat, avatar + name + company), a photo tile stacked over a dark stat tile (`500+` with four illustrated avatars), and a bordered white tile (`238+`, wordmark, paragraph). Mobile (`mobile-06.png`): tiles stack vertically in the same order.
7. **Stories from clients** (`desktop-07.png`, 980 px, bg `#F4F8FA`). Three testimonial cards with deliberately unequal widths (narrow lime / wide dark / narrow white), eyebrow "Hear from them", H4 quotes at 28 px / 700, avatar + name + company; the wide card also carries a 4.0 star row and a large quote glyph. Mobile (`mobile-07.png`): stacked, star row loses its icons (only "4.0" remains visible - CONFIRMED in `mobile-07.png`, cause UNVERIFIED).
8. **Meet our team** (`desktop-08.png`, 1,050 px). 4-column grid of square, strongly art-directed stock portraits (warm colour casts), H4 name 28 px + 16 px role, no social icons visible. Mobile: 1 column (2,533 px tall).
9. **Pricing** (`desktop-09.png`, 1,428 px, bg `#F4F8FA`). Three white cards; the middle one carries a dark "Most popular" pill and a struck-through price; check-list bullets in lime circles; full-width lime "Subscribe now" pills. Beneath: "More than 320 trusted partners & clients" and a logo marquee (CSS `@keyframes marquee`, `animationMarkers.marqueeLike: 22`; movement CONFIRMED by `extra-studiova-marquee-f1/f2.png`, logos shift one slot in 300 ms). Logos are Logoipsum placeholders (CONFIRMED). Mobile (`mobile-09.png`): cards stack; marquee still runs.
10. **FAQ** (`desktop-10.png`, 1,137 px). Five accordion rows, 28 px / 700 question buttons with a light circular "+" at the right, 1 px hairlines. Body text 18 px.
11. **Recent news** (`desktop-11.png`, 1,172 px, bg `#F4F8FA`). Three blog cards, first spans two columns; date 16 px + H4 title 28 px.
12. **Get in touch** (`desktop-12.png`, 816 px). Left: short invitation; right: three underline-only inputs (Name, Email, textarea) and a full-width lime "Submit message" pill (1,000+ px wide).
13. **Footer** (`desktop-13.png`, 557 px, bg `#1F2A2E`). H2 "Build something together?" with email/address rows, two link columns, copyright. Mobile: stacks.

Typography scale (computed): body 16 px / 24 px `#626a6d`; p 18 px / 27 px; H3 36 px; H2 48 px / 57.6 px; H1 128 px. Radii: 56 px (40 uses), 50% (40), 9999 px (8). Shadows: one soft shadow (`rgba(0,0,0,0.15) 0 6px 8px -6px`, 6 uses). Borders: 1 px `rgba(31,42,46,0.12)` (31 uses). Gradients: none (`tokens.gradients` empty). Transitions: 51x `opacity, transform 1s ease` (AOS reveals), 26x `all 0.2s ease`.

### 3. Navigation and header

- Header is `position: fixed`, transparent, no backdrop blur, 114 px tall (CONFIRMED `layout`). Logo left, a single round white "toggle-menu" button right; there is no visible link row on desktop - the menu is a panel for all viewports (CONFIRMED `desktop-hero.png`, the harness flagged `hasHamburger: false` because the class is `toggle-menu`).
- Mobile menu (`mobile-menu-open.png`): a white, 24 px-radius card drops over the hero with a "Menu" caption and close X, 7 links at ~30 px, two pill buttons (outline "Sign In", dark "Sign Up"), phone and email. Clear, high-contrast, large tap targets.
- Header CTA: none on the home page beyond the vendor badge. Nav-link hover: colour to lime `#C1FF72` (CONFIRMED `hover[0]`: `rgb(31,42,46)` -> `rgb(193,255,114)`).
- Custom cursor: none.

### 4. Trust building

- Stats appear three times (03, 06, 09) - CONFIRMED. Testimonials carry avatars, names and company names but they are template stock (Bank of America / MasterCard / Mitsubishi / Pizza Hut - CONFIRMED placeholder). Team grid uses stock portraits. Logo bar is Logoipsum (CONFIRMED). Case studies are a carousel with no result metrics.
- Process transparency: none on the home page. The pricing section is the most concrete trust device (what's included lists).
- Inner project page (`a-studiova-inner/desktop-full.png`): hero with full-bleed image + 128 px H1, a "Back" pill, a meta strip (Scope of work / Industry / Raised / Website) with vertical dividers, a two-column "Description" block, one large image + a 2-up gallery, footer. No outcome numbers, no client quote, no next-project link. (Note: the capture rendered the fallback font for the hero; `fonts.loaded` still lists Manrope, so this is a capture-timing artefact, CONFIRMED in screenshot only.)

### 5. CTA strategy

- Primary CTA style: lime pill, dark text, 18 px / 700, padding `16px 58px 16px 30px` to leave room for a white arrow circle at the right (`buttons[]`). Hover (CONFIRMED `extra-hover-studiova-btn-before/after.png` + diff): background flips to `#1F2A2E`, text to `rgb(98,106,109)`, and the arrow circle jumps to the left end. The computed `transition` covers only `opacity, transform 1s` (AOS), so the colour swap is instant.
- Cadence: hero arrow -> "Who we are" (03) -> "See our Work" (05) -> "Subscribe now" x3 (09) -> "Submit message" (12) -> footer email. Roughly one CTA every 1.5 to 2 screens. Contact flow: on-page form only; `tel:` and `mailto:` links exist in the menu (`links.tel`, `links.mailto`).

### 6. Detected tech stack

- Bootstrap 5 - `network.detectedFromBundleContents["Bootstrap 5 (--bs- vars)"]` and 125 `--bs-*` variables in `cssVars` (theme remapped: `--bs-primary: #C1FF72`, `--bs-secondary: #1f2a2e`, `--bs-light-gray: #F4F8FA`).
- jQuery (`globals.jquery: true`), AOS (`globals.aos: true`, 51 `[data-aos]`), Bootstrap bundle JS, Iconify runtime icons (`thirdPartyHosts`: api.iconify.design).
- Font: Manrope 200-800 via Google Fonts (`fonts.loaded`, `detectedFromUrls["Google Fonts"]`).
- Hosting: Cloudflare (`server: cloudflare`, `cf-ray`, zstd encoding). A `prefers-reduced-motion` rule exists (`reducedMotionRule: true`).

### 7. Performance snapshot

- Desktop (`perfAfterLoad`): TTFB 6,909 ms, DCL 12,073 ms, load 18,609 ms, FCP 10,184 ms, LCP 12,912 ms (element: hero H1), CLS 0.000 (0.0007 after scroll). Mobile: TTFB 2,995 ms, load 32,207 ms, FCP 10,448 ms, LCP 18,100 ms, CLS 0.005. Network was degraded during this run, but the payload is real.
- Transfer 4,671 KB over 63 requests: media 2,277 KB (hero MP4, also on mobile), images 2,207 KB (41 files; team portraits 198-265 KB each, blog images 186-240 KB, all JPG, 0 lazy-loaded, 65 images without width/height), scripts 95 KB, CSS 50 KB, one font file 25 KB.
- Flags: autoplay hero video on mobile; no lazy loading; 29 images with empty alt; no meta description, no OG tags, no canonical, no JSON-LD (`meta`, `canonical`, `jsonLd: []`); `robots.txt`/`sitemap.xml` empty. A11y: 9 heading-level skips, `focusOutlineRemoved: true`, no `<main>`/`<nav>` landmarks.

### 8. Borrow / avoid

Borrow:
1. **Numbered section index (dot + hairline + pill label in a left rail)** - makes a long page scannable and gives the eye a rhythm without extra graphics. Maps to eComet's home page (Services -> Process -> Work -> Proof -> Pricing-free CTA) and to long service pages.
2. **Mixed-tile "Why choose us" bento** (testimonial tile + stat tile + image tile in one 3-column block) - compresses three trust types into one screen. Maps to a "Why eComet" block combining a client quote, a headline number (e.g. automations shipped) and a team/photo tile.
3. **Unequal-width testimonial trio with one dark, one accent, one white card** - visually asymmetric yet system-consistent; the reader lands on the wide card first. Maps to eComet's testimonials section (currently a separate page).
4. **Pricing-card anatomy** (name, price, one-line fit statement, hairline, "What's included" checklist, full-width CTA) - even if eComet does not publish prices, the anatomy works for "engagement models" (retainer / project / VA hours).
5. **Menu-as-card** on mobile with contact details inside the panel - keeps phone/email one tap away.

Avoid:
1. **Autoplay hero video served to mobile** (2.3 MB of a 4.7 MB page; LCP 18 s on the mobile run). If eComet wants motion in the hero, use a poster + `prefers-reduced-motion` and a much smaller or CSS-only effect.
2. **Stat inflation and placeholder proof** - three separate stat rows with template numbers read as noise. Use one proof block with real figures.

---

## Teardown 2 - Dixor (React agency template, dark)

URL: https://dixor-react.vercel.app/ (React port of a ThemeForest-style template; "Envato Client" testimonial captions and 26 alternative home-page links are CONFIRMED in `data.json` `headings` and `links.internal`).

### 1. Load status and evidence

First run failed on all three navigation attempts with `net::ERR_NETWORK_CHANGED` / `ERR_INTERNET_DISCONNECTED` (machine-wide outage, also hit Wevetech at the same minute). Re-run at 06:11Z: status 200, server Vercel, 0 errors (CONFIRMED). Evidence: `desktop-hero.png`, `desktop-full.png` (13,119 px), `mobile-hero.png`, `mobile-full.png`, `mobile-menu-open.png`, `sections/desktop-01..09.png` (10 and 11 timed out; both visible in `desktop-full.png`), `sections/mobile-01..12.png`, `extra-desktop-reel-01..17.png` (scroll reel every 810 px). Inner page: `evidence/a-dixor-inner/` (`/service-details/1`).

### 2. Section flow (desktop)

Base tokens: body `#0e0f11` (`--dark`), section alternate `#18191b` (`--dark-secondary`), card `#2a2d32`, accent lime `#C9F31D` (`--color-primary`) with `#add40c` secondary, body text `rgb(204,204,204)` 17 px / 28.9 px Barlow, headings white. Radii 50% (46 uses), 10 px (25), 30 px (22), 60 px (12). Transitions: 145x `all 0.35s ease-in-out`. Gradients: lime text/gradient fills (`linear-gradient(90deg, #fff 0%, #C9F31D 100%)`, `45deg #add40c -> #C9F31D`) and two dark card gradients. Lorem-style copy everywhere ("Give lady of they such they sure it...") - CONFIRMED placeholder in `desktop-03.png`, `desktop-04.png`, `desktop-07.png`.

1. **Hero** (`desktop-01.png`, 996 px). Background photo of dark swirling ribbons (`shape/3.jpg`). Two-line uppercase H2 at 150 px / 600 ("DESIGNING" / "CREATIVE") with the second line indented; a small uppercase sub-brand label + hairline + paragraph + a "KNOW MORE" text button whose thin outline circle sits behind the first letters. Right: a holographic 3D blob PNG and a hairline-bordered stat card (`31K` at ~80 px, "Completed Projects", white arrow circle). There is no H1 on the page (`h1Count: 0`, CONFIRMED). Motion: `inlineTransform: 17` + `splitText: 14` markers = GSAP split-text reveal on load (library CONFIRMED in bundle, exact timing UNVERIFIED). Mobile (`mobile-hero.png`): headline 55 px with the first word turned lime, stat card stacks below; a floating theme/settings pill bottom-right (template switcher).
2. **Nav** (`desktop-02.png`, `navbar-sticky`). See section 3.
3. **About** (`desktop-03.png`, 773 px). Left: rounded photo panel; right: uppercase H2 45 px with a large outlined arrow glyph, paragraph; three small cards overlap the photo's right edge (active card lime with arrow, others outlined with "02/03" badges).
4. **Services** (`desktop-04.png`, 985 px, bg `#18191b`). Outline pill eyebrow "SERVICES WE OFFER", H2 60 px centred, four flush cards (icon 60 px, H4 20 px, paragraph, "READ MORE" outline pill with arrow circle). Mobile (`mobile-03.png`): stacked cards; the H2's split-text characters overflow and wrap mid-word ("Insig hts" - CONFIRMED rendering fault in `mobile-03.png`).
5. **Recent work** (`desktop-05.png`, 729 px). Editorial slider: left column pill + lorem + hairline + a 28 px statement; centre a vertical "1 / 2" counter with round arrows; right a 60 px two-line project title overlapping a large image; lime radial glow bottom-left (`blurry-shape`). Mobile (`mobile-04.png`): image on top of title, lime round prev/next buttons.
6. **Team** (`desktop-06.png`, 1,011 px, bg `#18191b`). Heading reused verbatim from Services (CONFIRMED placeholder). Left: three department tabs (active lime, 10 px radius); right: two B/W portrait cards with a white "+" button.
7. **Testimonials** (`desktop-07.png`, 1,014 px). "TESTIMONIALS" at ~120 px with a white-to-lime gradient text fill, a 4.9 rating circle with stars and "145 (Review)"; two wide gradient cards (5.0 / 4.7 star rows, lorem, avatar + "Envato Client"); Swiper progress-bar pagination + square arrows.
8. **Clients** (`desktop-08.png`, 702 px, bg `#18191b`). Left: pill + H2 (second line is clipped/overlapped - CONFIRMED rendering fault in `desktop-08.png`), lorem, stacked avatars + "+"; right: a 3x3 hairline grid where cell 1 is `45+ Active Clients`, seven cells are greyscale logos of large real brands (template use, not client proof - CONFIRMED logos, claims UNVERIFIED), last cell "VIEW ALL".
9. **Pinned horizontal story** (`desktop-09.png` clip is 5,220 px on the page; `extra-desktop-reel-10/12/13.png`). One GSAP-pinned container (`gsapPin: 1` desktop, `0` mobile) scrolls three panels horizontally: "Why Dixor" (accordion + 3 award cards) -> "Our Process" (4 outline cards Research / Concept / Implement / Handover, alternately offset vertically) -> "Have you project in mind?" (phone and email in lime circles). CONFIRMED by the reel frames at y = 7,290, 8,910 and 9,720 px showing panels mid-slide. Mobile (`mobile-08.png`): the same panels stack vertically with no pinning.
10. **Blog** (`desktop-full.png`): two cards, image with an overlapping dark text card and a white date badge.
11. **Footer** (`desktop-full.png`, bg `#18191b`): two office addresses, email input, "Useful Link" 2-col list, social circles, copyright.

Typography: Barlow (572 text nodes), 17 px body, 60 px (94 uses) and 45 px section headings, 150 px hero, nav links 20 px / 600 capitalised. Fonts loaded: Barlow 100-800 plus Font Awesome 5 Pro Light/Regular/Solid/Brands and Flaticon (`fonts.loaded`).

### 3. Navigation and header

- Desktop: logo left, centred dropdown menu (Home / Pages / Services / Blog / Contact - the Home dropdown lists 26 demo variants, CONFIRMED `links.internal`), a hamburger icon far right for an offcanvas. The bar is sticky: reel frames at y >= 810 px show the dark 90 px bar fixed at the top (CONFIRMED `extra-desktop-reel-02.png`, `-10.png`). The harness measured `headerHeight: 0` because the sticky class is applied on scroll (UNVERIFIED mechanism).
- Header CTA: none on the home page; the inner page adds a lime "Get In Touch" button in the bar (CONFIRMED `a-dixor-inner/desktop-full.png`).
- Mobile (`mobile-menu-open.png`): a slate-teal offcanvas panel slides in from the left (~77% width), logo + round X, five 24 px items with chevrons and hairlines; the page stays visible behind. Mobile header: hamburger left, logo centred.
- Custom cursor: none. Floating lime "back to top" circle bottom-right (CONFIRMED all desktop clips).

### 4. Trust building

- Stat card in hero (31K), rating summary (4.9 / 145 reviews), "45+ Active Clients", award cards, testimonial cards with avatars - all present but all placeholder (Envato Client captions, lorem quotes; CONFIRMED). Logos are real large brands in a template context (no client claim can be verified).
- Process is shown twice (home pinned panel with four cards; inner page with numbered 01-04 lime circles on a hairline - CONFIRMED `a-dixor-inner/desktop-full.png`).
- Inner service page anatomy: breadcrumb hero on the dark swirl (514 px), full-width photo, H2 + two-column lorem with check bullets, 4-step process row, two photos, "Any questions" accordion + "What we do?" text, "Most popular services" 3-card row, footer. CLS on this page is 0.12 desktop (CONFIRMED `perfAfterLoad.cls`).

### 5. CTA strategy

- Styles: "KNOW MORE" text + offset outline circle (18 px / 600); "READ MORE" outline pill 30 px radius with an arrow circle; lime filled tabs (`#C9F31D` on `#04000b` text, 10 px radius). Hover on the logo turns lime (`hover[0]`); most other hover probes timed out (UNVERIFIED), transitions are `all 0.35s ease-in-out` everywhere.
- Cadence: hero -> per-card "Read More" x4 -> "See Details" per slide -> team tabs -> "View All" -> contact panel phone/email -> footer email field. There is no form on the home page (two `<form>` elements are the newsletter/email inputs), contact is a phone number and a placeholder mailbox. Wording is generic ("Know More", "Read More", "See Details").

### 6. Detected tech stack

- React (Vite build `assets/index-ZQGrVpOJ.js`, 309 KB) - `detectedFromUrls["Vite build"]`, `globals.reactRoot: true`.
- GSAP + ScrollTrigger (`detectedFromBundleContents["GSAP"]`, `["ScrollTrigger"]`, `["GSAP pin-spacer (css)"]`, `animationMarkers.gsapPin`), Swiper (`swiper: 5`), jQuery inside the bundle, Bootstrap 5 (`--bs-` vars, `bootstrapGrid: 36`), animate.css (80+ keyframes), react-toastify, PhotoView, modal-video (keyframe names in `keyframes`).
- Fonts: Barlow via Google Fonts; Font Awesome 5 Pro x4 woff2 (186 + 170 + 138 + 77 KB) + Flaticon self-hosted.
- Hosting: Vercel (`server: Vercel`, `x-vercel-cache: HIT`, brotli). `robots.txt` and `sitemap.xml` both return the SPA `index.html` (status 200, HTML) - CONFIRMED `robots.txt.preview`.

### 7. Performance snapshot

- Desktop: TTFB 720 ms, DCL 1,943 ms, load 1,949 ms, FCP 4,816 ms, LCP 4,816 ms (a `<p>`), CLS 0.002 (0.014 after scroll). Mobile: TTFB 1,548 ms, DCL 6,417 ms, FCP 13,068 ms, LCP 13,068 ms, CLS 0.02.
- Transfer 2,537 KB / 70 requests: fonts 701 KB (10 files), images 1,370 KB (55 files, 37 PNG + 28 JPG, 0 lazy), JS 309 KB, CSS 155 KB (9,924 CSS rules). 12 oversized images (logo 650x172 rendered at 151x40; hero blob 2000x1335 at 328x397; 200 px icons at 60 px).
- Flags: no H1, no meta description/OG/canonical/JSON-LD, SPA-served robots/sitemap, 10 heading skips, 3 unnamed buttons, 46 links with empty text, focus outline removed, 62 small tap targets, FCP/LCP dominated by font + split-text JS on mobile. The theme/settings switcher is demo chrome.

### 8. Borrow / avoid

Borrow:
1. **Editorial "Recent work" slide** (left column of context, centre counter, huge title overlapping the image) - a strong single-project moment for eComet's featured case study (e.g. the Shopify or automation flagship) without a grid.
2. **Rating summary block next to the testimonial heading** (score circle + stars + review count) - when eComet has a Google/Clutch rating, this is the compact way to show it.
3. **Department-tab team selector** (tabs left, cards right) - works for eComet's 20+ people grouped by discipline (Automation, Web, Shopify, Ads, VAs) without a 20-portrait wall.
4. **Sticky-on-scroll dark bar with a lime CTA on inner pages** - the inner page shows the header CTA the home page is missing; eComet should have it on every page.

Avoid:
1. **GSAP-pinned horizontal storytelling** (`desktop-09.png` reel): 5,220 px of pin-spacer for three panels; it disables on mobile anyway, hides the process and contact from static scanning, and the split-text headings already break on mobile (`mobile-03.png`) and overlap on desktop (`desktop-08.png`). Beautiful-but-fragile.
2. **Four Font Awesome Pro webfonts (571 KB) and unoptimised PNG icons** for a handful of icons; use inline SVG.


---

## Teardown 3 - Wevetech (Lovable-built agency one-pager, dark)

URL: https://wevetech.lovable.app/ ("Made with Lovable" badge bottom-right in every desktop clip; `detectedFromUrls["Lovable"]` - CONFIRMED).

### 1. Load status and evidence

First run failed (network drop, identical to Dixor). Re-run: status 200, server cloudflare, 0 desktop errors (CONFIRMED). Evidence: `desktop-hero.png`, `desktop-full.png` (7,328 px), `mobile-hero.png`, `mobile-full.png`, `sections/desktop-01..09.png`, `sections/mobile-01..09.png`, `extra-wevetech-menu.png` (mobile menu via tap; the harness's own click timed out), `extra-wevetech-cursor.png`. Two attempted desktop hover captures (service card, "explore" button) failed on locator timeouts across two runs, so card/button hover states are UNVERIFIED. Single-page site: only `/services`, `/projects`, `/contact` exist as links (`links.internal`) and were not captured.

### 2. Section flow (desktop)

Base tokens (`cssVars`, `tokens`): body `rgb(12,14,18)`, card `rgb(21,24,30)` (21 uses), border `rgba(43,48,59,0.5)` (23 uses), text `rgb(250,250,250)` / muted `rgb(143,150,163)`, accent violet `rgb(166,125,232)` used at 5-30% alpha for tints, plus one cyan-blue-purple gradient (`linear-gradient(to right bottom, #22d3ee, #3b82f6, #9333ea)`). Radii: 9999 px (44), 16 px (16), 12 px (15). Backdrop blur 24 px on 20 elements (`tokens.backdropBlur`). Transitions: `all 0.3s cubic-bezier(0.4,0,0.2,1)` (20), `opacity 0.5s` (12), `box-shadow 0.5s` (6). Section padding 128 px (services, testimonials, FAQ) / 96 px / 80 px.

1. **Hero** (`desktop-hero.png` = `desktop-01.png`, 900 px, `min-h-screen`). Centred stack: a glass pill eyebrow, H1 96 px / 600 Inter in two lines with the last word set in violet Playfair Display italic plus a sparkle glyph, a 20 px muted paragraph, one dark pill button "explore ->" with a faint violet glow under it. Background: a purple-black radial wash with a canvas of animated glowing purple wave lines and a few dots (`media.canvas: 1`; `keyframes` include `float`, `glow-pulse`, `gradient-rotate`; `cssAnim: 7` in this section). Motion CONFIRMED as CSS keyframes in the section; the canvas wave animation is UNVERIFIED in motion (single frame). Mobile (`mobile-hero.png`): H1 48 px / 60 px in four lines, waves shrink to a band behind the last line, pill CTA centred, header collapses to logo + "Connect" pill + "+" round toggle.
2. **Trusted by** (`desktop-02.png`, 352 px). H2 36 px centred + one-line sub, then five text-only "logos" (glyph + name in muted grey: OpenAI, GoDaddy, Shopify, Hostinger, Azure). CONFIRMED as text spans, not images (`imgs: 0`), so these are typed brand names with no logo files - treat as placeholder claims. Mobile (`mobile-02.png`): wraps to two rows.
3. **Stats bento** (`desktop-03.png`, 616 px, `grid: 2 cols`). Left: a large bordered card (green dot eyebrow "Our Work", H2 36 px with one phrase in violet, 210+ claim, dark pill "Learn more"). Right: 2x2 stat tiles (`210+` / `52M` / `5Year` / `3` with a pin emoji) at ~48 px with 16 px captions; each tile shows a faint violet top-edge highlight. Mobile (`mobile-03.png`): card then 2x2 tiles.
4. **Services + Portfolio** (`desktop-04.png`, 1,982 px, `grid: 3 cols`). Pill eyebrow "Our Services", H2 with italic violet last word, 3x2 cards: violet-tinted icon tile (lucide icons), H3 20 px, paragraph 16 px muted; cards have a 1 px border and a violet edge glow on one side. Below: "Our portfolio" heading and an **orbit diagram**: a glowing blue sphere in the centre, two concentric rings, five project nodes (icon circle + label) placed on the rings (`keyframes` include `spin` and `float`, `cssAnim: 3`; rotation UNVERIFIED in motion). The orbit is decorative: nodes carry names only, no links (`links.internal` has no project URLs). Mobile (`mobile-04.png`): cards stack 1-col, the orbit shrinks to ~300 px and labels overlap the rings.
5. **Testimonials** (`desktop-05.png`, 857 px, bg `rgba(166,125,232,0.05)`). Three equal cards: violet quote-mark tile, 18 px quote, 40 px avatar (Unsplash portraits - CONFIRMED `thirdPartyHosts: images.unsplash.com`), name + role/company. Mobile (`mobile-05.png`): stacked.
6. **FAQ** (`desktop-06.png`, 1,003 px). Pill eyebrow, H2, six full-width accordion rows (848 px wide, 76 px tall, 18 px / 500 question, chevron right) with `accordion-up/down` keyframes (Radix accordion - `detectedFromBundleContents["Radix UI"]`).
7. **CTA card** (`desktop-07.png`, 556 px). A single rounded card (~890 px wide) with a violet-to-dark gradient wash, H2 "Don't Think. / Let's Talk." at 48 px, muted paragraph, dark pill "Get In Touch ->".
8. **Newsletter** (`desktop-08.png`, 530 px). Same card frame, pill eyebrow, H2, inline email input + "Subscribe ->" button, "No spam" microcopy.
9. **Footer** (`desktop-09.png`, 468 px). Logo tile + name, H2 "Let's Talk..." 48 px, copyright, four links, four social icons. No address, no phone, no email (`links.tel`/`mailto` empty - CONFIRMED).

Typography: Inter (125 nodes) with Playfair Display italic for accent words (5 nodes) and one "Museo Moderno" reference whose Google Fonts request failed (`failed[0]`: `ERR_BLOCKED_BY_ORB`). A 131 KB "CameraPlainVariable" font is loaded from `cdn.gpteng.co` (Lovable's widget font) - CONFIRMED `largest[1]`. Sizes: 16/14/18/24/20 px body scale, 48 px section H2s, 96 px H1.

### 3. Navigation and header

- Fixed, transparent, 82 px, no blur (`layout.headerPosition: fixed`, `headerBlur: none`). Logo tile + wordmark left; a centred **pill nav** (dark glass capsule containing four pill buttons, active one filled `rgb(33,36,44)`); an outline pill "Connect" right (`buttons[]`). Nav items are `<button>`s rather than links (CONFIRMED `buttons[0..3]` tag BUTTON), so they are not crawlable anchors.
- Mobile menu (`extra-wevetech-menu.png`): tapping the "+" turns it into an X and drops a **vertical capsule of four icon-only circles** (home, services, folder, mail) at the right edge over the hero. Icon-only with no labels - low discoverability.
- Custom cursor: `layout.cursorCustom: true` is a class-name match; nothing cursor-like is visible in `extra-wevetech-cursor.png` after moving the mouse, so a custom cursor is UNVERIFIED / not observed.

### 4. Trust building

- Logo bar is typed names (no images); stats (210+, 52M, 5 years, 3 locations) and three testimonials with Unsplash faces and invented roles; no case studies (portfolio nodes are labels only); no process section; no team; no address. CONFIRMED demo-grade proof. FAQ is the only substantive trust content.

### 5. CTA strategy

- One CTA style only: dark pill with arrow (`explore`, `Learn more`, `Get In Touch`, `Subscribe`), plus the outline "Connect" in the header. Cadence: hero -> stats card -> CTA card -> newsletter -> footer heading. No form except newsletter; "Contact" is a button with no destination captured. Wording is casual ("Don't Think. Let's Talk.").
- Hover states UNVERIFIED (probes timed out); transitions on buttons are `all 0.3s cubic-bezier(0.4,0,0.2,1)` (CONFIRMED `buttons[].transition`).

### 6. Detected tech stack

- React + Vite (`detectedFromUrls["Vite build"]`, `globals.reactRoot`), Tailwind (`--tw-` vars, 232 Tailwind class hits) with shadcn/ui tokens (`detectedFromBundleContents["shadcn/ui tokens"]`, 272 `cssVars`), Radix UI, lucide-react, framer-motion in bundle (`["framer-motion / motion"]`), sonner toasts (keyframes `sonner-*`).
- Hosting: Cloudflare in front of Lovable (`server: cloudflare`, `~flock.js` analytics script). `robots.txt` allows all; `sitemap.xml` 404. OG image points at `lovable.dev` (`meta.ogImage`) - CONFIRMED.

### 7. Performance snapshot

- Desktop: TTFB 2,668 ms, DCL 3,699 ms, load 17,525 ms, FCP 3,596 ms, LCP 19,156 ms (H1), CLS 0. Mobile: TTFB 2,014 ms, load 8,698 ms, FCP 3,644 ms, LCP 8,936 ms, CLS 0. The very late LCP with an early FCP indicates the H1 is revealed by JS after fonts/animation settle (UNVERIFIED cause; consistent with `inlineOpacityZero: 5`).
- Transfer only 449 KB / 15 requests: JS 166 KB, fonts 216 KB (3 files; the 131 KB widget font is the largest), CSS 16 KB, images 31 KB (avatars via Unsplash query params).
- Flags: one canvas animation in the hero; 20 elements with `backdrop-filter: blur(24px)` (GPU cost on low-end phones); 5 small-text nodes on mobile; `focusOutlineRemoved: true`; heading skip 1; no `<main>`; 3 `<nav>` elements.

### 8. Borrow / avoid

Borrow:
1. **Italic-serif accent word inside a sans headline** (H1 and every H2) - a cheap, elegant way to add brand voice; eComet could use it sparingly in section titles (with the comet gradient reserved for one word rather than whole lines).
2. **Stats bento next to a statement card** (`desktop-03.png`) - the 2x2 tile grid keeps numbers legible and lets one tile carry a location fact (USA / Canada / Europe for eComet).
3. **Single rounded CTA card with a soft gradient wash** (`desktop-07.png`) - contained, not full-bleed, so it reads premium on a dark page; suits eComet's pre-footer "Book a call" block.
4. **Pill-nav capsule with an active filled state** - clear current-section signalling for a long single page; if eComet uses anchors on the home page, this pattern works (but implement as `<a>` links).

Avoid:
1. **Decorative orbit "portfolio"** - five labels on rings, no links, no images, no outcomes: it is motion in place of proof, and it degrades on mobile (`mobile-04.png`).
2. **Typed brand names as a logo bar and Unsplash testimonials** - instantly recognisable as demo content; eComet should only show verifiable client marks and named, photographed clients.

---

## Teardown 4 - Mau5tech (single-page agency site, light)

URL: https://mau5tech.com/ (Islamabad-based dev/automation agency; address CONFIRMED in `desktop-06.png`).

### 1. Load status and evidence

Attempt 1 hit `ERR_INTERNET_DISCONNECTED`, attempt 2 loaded (status 200, server cloudflare, cache HIT). Evidence: `desktop-hero.png`, `desktop-full.png` (5,215 px), `mobile-hero.png`, `mobile-full.png` (9,051 px), `mobile-menu-open.png`, `sections/desktop-01..07.png`, `sections/mobile-01..06.png`. Single-page site (only `/` in `links.internal`; nav is anchors), so no inner page exists.

### 2. Section flow (desktop)

Base tokens (Tailwind defaults, `cssVarCount: 0`): body `rgb(248,251,255)`, headings `rgb(2,6,23)` (slate-950), body text `rgb(71,85,105)` (slate-600), accent cyan `rgb(8,145,178)` for eyebrows, gradient `linear-gradient(to right, #06b6d4, #2563eb)` for buttons and icon tiles (`tokens.gradients`), light-cyan tile `rgb(236,254,255)`. Radii: 9999 px (12), 16 px (11), 32 px (6), 28 px (5). Shadows: Tailwind `shadow-sm` on 13 cards and cyan-tinted `shadow-lg`/`xl` (`rgba(6,182,212,0.2-0.25)`) on gradient buttons. Every transition is Tailwind's `transition-all 0.15s cubic-bezier(0.4,0,0.2,1)` (12 uses). No keyframes at all (`keyframes: []`), no AOS, no inline transforms (`animationMarkers` all zero) - CONFIRMED static page.

1. **Hero** (`desktop-01.png` / `desktop-hero.png`, 1,181 px, padding 208/144). Centred: a white pill eyebrow with a cyan dot and letter-spaced uppercase 14 px label; H1 96 px / 600, letter-spacing -4.3 px, three lines, with the middle phrase in a cyan-to-blue gradient text fill; 24 px slate paragraph; a gradient pill "Start a Project ->" + a white outline pill "Explore Services"; a row of three two-line mini-labels (bold word / cyan-grey descriptor). Background: `radial-gradient(circle at 50% 0%, #e7fbff, #f8fcff 42%, #fff)` plus a faint 1 px grid (`linear-gradient ... rgba(15,23,42,0.06) 1px` in `tokens.gradients`). Mobile (`mobile-hero.png` partly hidden by the menu in `mobile-menu-open.png`): H1 48 px, buttons stack full-width, grid background retained.
2. **Header** (`desktop-02.png`, fixed 97 px, `rgba(255,255,255,0.9)` + `blur(24px)`, bottom border). See section 3.
3. **Services** (`desktop-03.png`, 1,188 px, white). Cyan letter-spaced eyebrow, H2 60 px / 600 (-2.4 px tracking), one-line sub, 3x2 white cards (1 px `rgb(241,245,249)` border, 28-32 px radius, `shadow-sm`): light-cyan icon tile with a cyan lucide icon, H3 24 px, 18 px paragraph. Mobile (`mobile-02.png`): 1 column, 2,644 px tall.
4. **Why us** (`desktop-04.png`, 1,150 px, bg `rgb(244,248,251)`, `grid: 2 cols`). Left: eyebrow, H2 with the last phrase cyan, paragraph, gradient pill "Work with us"; right: five stacked white cards each with a gradient icon tile, H3 24 px and one-line reason. Hover on "Work with us" (CONFIRMED `hover[5]`): `transform` none -> `matrix(1,0,0,1,0,-4)`, i.e. a 4 px lift over 150 ms; nav link hover changes colour to cyan (`hover[1]`, `rgb(51,65,85)` -> `rgb(8,145,178)`).
5. **Process** (`desktop-05.png`, 732 px, white, `grid: 4 cols`). Eyebrow "How we work", H2, sub; four columns: gradient rounded-square icon tile (80 px, 24 px radius) with a white numbered badge at its top-right corner, connected by a 1 px cyan hairline; H3 24 px; 18 px paragraph. Mobile (`mobile-04.png`): 1 column, tiles centred, the connector line disappears.
6. **Contact CTA** (`desktop-06.png`, 844 px, bg `rgb(244,248,251)`). One 36 px-radius card (~895 px wide) with the cyan-to-blue gradient at 135 degrees, a translucent mail icon circle, H2 60 px white, 18 px sub, white pill "Contact Mau5tech ->", email + street address in white. Mobile (`mobile-05.png`): card stacks with H2 48 px and full-width pill.
7. **Footer** (`desktop-07.png`, 120 px, `rgb(2,6,23)`). Single row: logo + name, tagline, three links. Mobile: 240 px, stacked.

Typography: Inter via system stack (`fonts.loaded` empty; the CSS references Inter but no webfont request is made, so it falls back to a system UI font - CONFIRMED by `fonts.loaded: []` and the screenshot rendering). Sizes 18 px (22 uses), 24 px (16), 16 px (14), 60 px (5), 96 px (2). Total word count 317.

### 3. Navigation and header

- Fixed, 97 px, `rgba(255,255,255,0.9)` with `backdrop-filter: blur(24px)` and a hairline bottom border (CONFIRMED `layout.headerBg/headerBlur`). Logo (56 px PNG) + wordmark left; three text links; a gradient pill "Start a Project" right (CONFIRMED `desktop-hero.png`).
- Mobile (`mobile-menu-open.png`): a white sheet drops under the bar with a bordered X button top-right, three 24 px links and a full-width gradient "Start a Project" pill. Simple and legible.
- No custom cursor, no scroll effects.

### 4. Trust building

- No logos, no numbers, no testimonials, no team, no case studies, no FAQ (CONFIRMED by headings list). Trust is carried entirely by: a concrete process (4 steps with plain-language promises such as "we do not disappear after go-live"), a "Why us" list written as commitments, a real street address and email, and a fast page. This is honest but thin; it reads as a young studio.
- `robots.txt` and `sitemap.xml` both 404; no OG tags, no canonical, no JSON-LD (`meta`, `jsonLd: []`). Meta description present. `theme-color: #08AFC5`.

### 5. CTA strategy

- One primary style (gradient pill with arrow, cyan shadow) used 4 times: header, hero, Why-us, contact card (white variant). Secondary: white outline pill "Explore Services" (hero only). Contact flow is a `mailto:` link only (`links.mailto`), no form, no calendar, no phone (`a11y.forms: 0`).
- Cadence: hero (2) -> why-us (1) -> contact card (1) = a CTA every ~1,300 px. Wording is consistent and action-first ("Start a Project", "Work with us", "Contact Mau5tech").

### 6. Detected tech stack

- React + Vite single bundle (`assets/index-DMRiHbQK.js`, 67 KB - `detectedFromUrls["Vite build"]`), Tailwind CSS (`detectedFromBundleContents["Tailwind CSS (--tw- vars)"]`, 5 KB CSS), lucide-react icons (`["lucide-react"]`), 20 inline SVGs (`media.svgInline`). No animation library. Cloudflare hosting with `cdn-cgi/speculation` rules and Cloudflare Insights beacon (`detectedFromUrls["Cloudflare"]`).

### 7. Performance snapshot

- Desktop: TTFB 1,964 ms, DCL 2,729 ms, load 3,133 ms, FCP = LCP 2,840 ms (H1), CLS 0 before and after scroll. Mobile: TTFB 428 ms, DCL 2,329 ms, FCP = LCP 1,252 ms, CLS 0. The fastest site in this group by a wide margin.
- Transfer 173 KB / 8 requests: JS 67 KB, logo PNG 50 KB (365x365 rendered at 56x56 - the one oversized asset, `images.oversized[0]`), favicon 50 KB, CSS 5 KB, HTML 1 KB. No webfont request.
- Flags: 2 contrast issues on the cyan eyebrows (3.45-3.68:1 on 16 px text, `a11y.contrastIssues`); missing robots/sitemap/OG; single H1 and clean heading order (0 skips); landmarks main/nav/header/footer all present.

### 8. Borrow / avoid

Borrow:
1. **Gradient-as-ink discipline**: the cyan-to-blue gradient appears only as (a) one phrase of the H1, (b) filled buttons, (c) icon tiles, (d) one CTA card. Everything else is white/slate. This is exactly the restraint eComet's cyan-violet-magenta comet gradient needs - reserve it for the same four roles.
2. **Process row with numbered icon tiles joined by a hairline** (`desktop-05.png`) - four steps, one sentence each, no imagery; scales down to a clean vertical list. Maps directly to an eComet "How we work" section (Discover -> Build -> Test -> Launch and support).
3. **"Why us" as five plain commitments in stacked cards** beside a statement + CTA - avoids icon-grid sameness by mixing a 1:2 layout. Maps to eComet's differentiators (24/7 VA coverage, timezone overlap with USA/Canada/EU, fixed-scope automation sprints).
4. **Contained gradient contact card with address and email inside** - proof of a real office in the CTA itself; eComet can list its office and its service regions there.
5. **Zero-animation, 173 KB, LCP ~1.3-2.8 s baseline** - the performance target the redesign should be measured against before adding motion.

Avoid:
1. **No proof at all** (no logos, numbers, testimonials, work) - the page looks trustworthy but gives a buyer nothing to verify; eComet must not ship a "clean" page that is empty of evidence.
2. **Falling back to system fonts without loading the declared face** and a 50 KB logo PNG for a 56 px mark - small polish misses that read as unfinished on a premium site.

---

## Teardown 5 - ZeynApp (Cambridge UK design consultancy, Awwwards nominee)

URL: https://www.zeynapp.co.uk/ (Awwwards "Nominee" badge fixed at the right edge in every desktop and mobile clip - CONFIRMED `desktop-hero.png`, `mobile-hero.png`; `links.external` = awwwards.com/sites/zeynapp).

### 1. Load status and evidence

Attempt 1 failed (network drop), attempt 2 loaded: status 200, server cloudflare, HSTS. Evidence: `desktop-hero.png`, `desktop-full.png` (10,067 px), `mobile-hero.png`, `mobile-full.png`, `mobile-menu-open.png`, `sections/desktop-01..12.png`, `sections/mobile-01..15.png`, `extra-desktop-reel-01..08.png` (viewport shots every 810 px after a 1.3 s settle), `extra-zeynapp-cursor.png`, hover diffs for "Schedule Call" and the header "Contact Us" pill. Inner page: `evidence/a-zeynapp-inner/` (`/work`). Known gap: section 11 (`desktop-11.png`, 900 px black) shows only an "Error loading scene - Cannot read properties of undefined (reading 'gl')" toast, i.e. a three.js/WebGL scene that cannot initialise in headless Edge with `--disable-gpu` (`detectedFromBundleContents["three.js"]` = `Rotating3DShapeCanvas-*.js`, 219 KB). Its real content is UNVERIFIED. Four `.webm` project videos were `ERR_ABORTED` on desktop (`network.failed`) but their poster frames rendered (`desktop-08.png`), and mobile transferred only 847 KB vs 8,548 KB desktop, so video is desktop-only (CONFIRMED by transfer sizes; the mechanism is UNVERIFIED).

### 2. Section flow (desktop)

Base tokens: page `rgb(245,245,245)`, ink `rgb(13,13,13)`, magenta `rgb(234,26,109)` (`--magenta: 336 83% 51%`), black footer `rgb(13,13,13)`; shadcn token set with an unused neon accent (`--accent: 75 100% 50%`). Fonts: Bebas Neue (display, uppercase, 79 nodes) with a system UI stack for body (131 nodes; Poppins is requested from Google Fonts but the computed body font is the `ui-sans-serif` stack - CONFIRMED `typography.body.fontFamily`). Radii: 9999 px (75 uses, tag pills), 8 px (15). Transitions: 210x `all 0.7s cubic-bezier(0.4,0,0.2,1)` (slow, deliberate), 18x `height 0.5s cubic-bezier(0.22,1,0.36,1)` (accordion), 23x Tailwind colour 0.15 s. Motion markers: `inlineTransforms: 40`, `inlineOpacityZero: 17` (framer-motion reveals; `["framer-motion / motion"]` CONFIRMED in bundle), `cssAnim: 2`. `prefers-reduced-motion` rule present.

1. **Hero** (`desktop-hero.png` = `desktop-01.png`, 900 px, `grid: 2 cols`). A 1 px vertical hairline splits the viewport at centre. Left: four-line uppercase H1 in Bebas Neue at 129.6 px / 700, right-aligned, with the third word in magenta. Right column, top: 16 px paragraph and a magenta square-cornered button "LET'S TALK" with a diagonal arrow glyph. A **3D magenta "Z" logo mark** straddles the centre line (a Rotating3DShapeCanvas - CONFIRMED by the file name; it rendered here, unlike section 11) and a **hexagon letter grid** bottom-right where random cells glow magenta with letters of the brand name; the cursor extra (`extra-zeynapp-cursor.png`) shows the 3D Z rotated to a different pose and different hex cells lit, so both react to time/pointer (CONFIRMED change between two frames; the exact trigger is UNVERIFIED). Mobile (`mobile-hero.png`): H1 56 px right-aligned in four lines, the 3D Z sits below the headline, paragraph and full-width magenta button beneath; the floating bottom nav bar (see section 3) overlaps the lower area.
2. **We are good at** (`desktop-02.png`, 1,170 px, `min-h-screen`). A dashed magenta circle "dial" with tick marks at the centre of the page cross-hairs; four discipline labels sit at N/E/S/W (24 px Bebas, magenta dot). Two more hexagon letter clusters decorate the corners. In the reel (`extra-desktop-reel-03/04.png`) the dial is followed by the "connected thinking" block, so this section acts as a slow scroll-through intro. Mobile (`mobile-04.png`): the dial shrinks to ~510 px, labels overlap the circle edge (CONFIRMED overlap of "DESIGN"/"DELIVERY" on the ring).
3. **Connected thinking** (`desktop-03.png`, 608 px). H2 128 px in two lines with one word magenta; below, a hex cluster left and a right column with paragraph, magenta "SCHEDULE CALL" button and an underlined text link to an insights article. Hover on "Schedule Call" (CONFIRMED diff): only `opacity` 1 -> 0.9 over 150 ms.
4. **Discipline cards** (`desktop-04.png`, 1,083 px, `grid: 3 cols`, `opacity0: 15`). A pyramid of five cards: the magenta "SYSTEM THINKING" card at top-centre, then CONSULTING and STRATEGY (dark grey), then DESIGN and DELIVERY (black), joined by dashed connector lines, with a closing italic Bebas line ("Four disciplines. One connected system."). The static clip shows only the magenta card because the others are framer-motion staggered reveals; the reel (`extra-desktop-reel-04/05.png`) shows all five revealed with the pyramid geometry - CONFIRMED scroll-triggered reveal. Each card: Bebas title 24 px, italic tagline, four bullets, hairline, an italic quote. Mobile (`mobile-06.png`, 1,737 px): cards stack in one column.
5. **Magenta transition band** (`desktop-05.png`/`-06.png`; `extra-desktop-reel-06.png`). The page turns magenta for the work section via a **stepped "skyline" edge**: rectangles of different heights rise out of the light page into the magenta block (CONFIRMED `extra-desktop-reel-06.png`), then a 128 px "FEATURED WORK" title centred.
6. **Featured work** (`desktop-08.png`, 2,974 px). Four projects in a staggered 2-column masonry (left card high, right card offset ~320 px lower, alternating): each is a rounded 16 px poster (video on desktop, glitch/portrait imagery), Bebas 24 px title, outline tag pills (CONSULTING / STRATEGY / DESIGN / DELIVERY), one-line description in white 14 px. Mobile (`mobile-10.png`): posters render as blank darker-magenta placeholders with the project name centred (videos not loaded on mobile - CONFIRMED), captions sometimes overlap the next placeholder (`mobile-10.png` shows "ORSA" overlapping "OYSTER" text).
7. **CTA** (`desktop-09.png`, 847 px, magenta, `grid: 2 cols`). Left: three-line Bebas H2 at 128 px; right: 16 px paragraph and a white square button "MAKE IT REAL" in magenta text; a faint hex cluster bottom-right. Padding 128 px top / 300 px bottom (deliberate void before the WebGL section).
8. **WebGL scene** (`desktop-11.png`, 900 px black) - failed in headless (see above).
9. **Footer** (`desktop-12.png`, 505 px, `rgb(13,13,13)`, `grid: 3 cols`). Logo + tagline; "Navigation" two-column links; "Contact" block with company name, full street address, phone and email; hairline; copyright + magenta "START A CONVERSATION" button. Mobile (`mobile-15.png`): stacks.

Inner page `/work` (`a-zeynapp-inner/desktop-full.png`): 70vh hero with a three-line Bebas H1 (middle line magenta) left and a paragraph right of the centre hairline; "SELECTED WORK" with a 2x2 grid of bordered text cards (tag pills, Bebas title, one line) - no images; a magenta full-width CTA band; footer. JSON-LD `CollectionPage` with four `CreativeWork` items, canonical, unique title - CONFIRMED `jsonLd`, `canonical`. The card hover on this page is UNVERIFIED (not probed).

### 3. Navigation and header

- No top header. Instead a **floating bottom pill bar** (black, ~520 px wide, 8 px radius) fixed at the bottom centre on every viewport: "Menu" with a hamburger glyph (a `<button>`), the wordmark centred, and a magenta "Contact Us" button with the diagonal arrow (CONFIRMED in every reel frame; `layout.headerPosition: static` because the bar is not a `<header>`). Header CTA present everywhere by construction.
- Mobile menu (`mobile-menu-open.png`): full-screen black overlay, close X top-right, seven centred Bebas links at ~56 px (active "HOME" magenta), email and phone at the bottom. Excellent tap targets; the Awwwards badge remains on top.
- Custom cursor: `layout.cursorCustom: true` (class match); `extra-zeynapp-cursor.png` shows no visible cursor element - UNVERIFIED / not observed. The 3D Z and hex letters did change between frames, so the pointer (or time) drives the hero art.

### 4. Trust building

- Real company data: registered company name, street address, phone, email in the footer and in Organization JSON-LD (CONFIRMED). Awwwards nominee badge. Four named projects with tags and one-line descriptions but **no outcomes, no client quotes, no logos, no numbers, no team** anywhere (headings list CONFIRMED). The discipline cards double as a process/philosophy statement; the "How We Work" page exists in the sitemap but was not captured.
- Copy is original (no lorem), and the site is clearly a live business, not a template.

### 5. CTA strategy

- Three CTA surfaces, all magenta, square-cornered, uppercase, with a diagonal arrow: hero "LET'S TALK", mid-page "SCHEDULE CALL", footer "START A CONVERSATION", plus the always-visible "Contact Us" in the bottom bar and an inverted white "MAKE IT REAL" on the magenta section. Every CTA points to `/contact` (`links.internal`), a separate page (not captured). Hover feedback is minimal (opacity 0.9). Cadence: hero -> section 3 -> section 7 -> footer, with the bottom bar as a persistent fallback.

### 6. Detected tech stack

- React + Vite (`assets/index-NfREpo6e.js`, 155 KB), Tailwind + shadcn/ui tokens, Radix UI, lucide-react, framer-motion (`detectedFromBundleContents`), three.js chunk (219 KB, lazy), **Unicorn Studio** WebGL embed (`cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.1`, and 68 requests to `assets.unicorn.studio` - `thirdPartyHosts[0]`), sonner toasts. Fonts: Bebas Neue self-hosted woff2 (27 KB x2), Poppins via Google Fonts (and a 155 KB TTF pulled by Unicorn Studio). Hosting: Cloudflare; `~flock.js` analytics. Full SEO head: title, description, OG image, Twitter card, canonical, `theme-color`, Organization + WebSite JSON-LD, robots.txt with sitemap reference, sitemap.xml listing /about, /what-we-do, /how-we-work, /work, /insights, /contact (CONFIRMED `sitemap.xml.preview`).

### 7. Performance snapshot

- Desktop: TTFB 2,928 ms, DCL 7,907 ms, FCP 8,088 ms, LCP 8,216 ms (H1), CLS 0 at load but **0.55 after scroll** (two shifts of 0.146 at 19 s and one of 0.252 at 25.6 s - `perfAfterScroll.shifts`). Mobile: LCP 5,752 ms, CLS after scroll 0.52. The late shifts coincide with lazy video/WebGL sections mounting - UNVERIFIED cause, CONFIRMED magnitude.
- Transfer desktop 8,548 KB / 94 requests: media 7,419 KB (four webm files 1.3-2.3 MB each), fetch 470 KB (67 Unicorn Studio asset calls), JS 425 KB, fonts 209 KB. Mobile 847 KB / 49 requests.
- Flags: WebGL section that fails without GPU (and shows an error toast to the user); ~7.4 MB of autoplay video on desktop; CLS > 0.5; 2 contrast issues (magenta on white 4.31:1 at 18 px; white on magenta 3.96:1 at 14 px); one heading skip; two `<main>` landmarks; `maximum-scale=5` allows zoom (good).

### 8. Borrow / avoid

Borrow:
1. **Persistent bottom pill bar with Menu + wordmark + CTA** - keeps the primary action one tap away on every viewport without a bulky sticky header; strong candidate for eComet's mobile experience (with `<a>` links and a visible label).
2. **One-colour brand system with a single display face** (magenta + Bebas): the page feels premium because everything else is greyscale. For eComet: black + white + the comet gradient used as narrowly as ZeynApp uses magenta.
3. **Discipline/philosophy cards as a pyramid with connectors** (`extra-desktop-reel-05.png`) - explains "how we think" without stock icons; maps to an eComet "How our services connect" block (Automation -> Web -> Marketing -> Support).
4. **Stepped colour transition into the work section** (`extra-desktop-reel-06.png`) - a cheap CSS trick that makes a colour block feel designed rather than dumped.
5. **Full-screen mobile menu with giant display links and contact details at the bottom** (`mobile-menu-open.png`).

Avoid:
1. **WebGL/three.js sections and Unicorn Studio embeds** - failed in headless, cost 219 KB + 68 requests, and pushed CLS to 0.55; "beautiful but fragile" and invisible to crawlers.
2. **Video-only project posters** - 7.4 MB on desktop and blank magenta boxes on mobile (`mobile-10.png`); eComet's case-study cards need static images with a caption and a result.

---

## Teardown 6 - Faheem Naveed portfolio (single-page developer portfolio)

URL: https://faheemnaveed-portfolio.vercel.app/ (personal portfolio of a Flutter/automation developer; note the overlap with eComet's stack - GoHighLevel, Zapier, automation - which makes it a relevant service-pattern reference).

### 1. Load status and evidence

Status 200, server Vercel, 0 desktop errors; mobile full-page screenshot failed (`Page.captureScreenshot` protocol error, most likely page height 14,021 px x DPR 2) but all 16 mobile section clips exist. Evidence: `desktop-hero.png`, `desktop-full.png` (11,489 px), `mobile-hero.png`, `sections/desktop-01..18.png`, `sections/mobile-01..16.png`, `extra-faheem-band-f1/f2.png`, `extra-hover-faheem-btn-before/after.png`, `extra-hover-faheem-servicetab-before/after.png`, `extra-hover-faheem-workcard-before/after.png`. No hamburger exists (nav links are simply hidden on mobile - CONFIRMED `mobile-hero.png` shows logo + "Contact" only), so there is no mobile menu screenshot. The service-tab click capture timed out on font loading (UNVERIFIED tab-switch behaviour). Single-page site with anchors only.

### 2. Section flow (desktop)

Base tokens (`cssVars`): `--background: #e5e5e5` (warm light grey page), `--navy: #14213d` (cards), `--orange: #fca311` (accent), `--green: #61c554` (availability dot), `--font-display: "Cal Sans"`, `--font-body: Inter`, `--radius-section: 32px`, `--radius-card: 24px`, `--radius-pill: 100px`, `--section-pad-y: 112px`, `--container: 1128px`. Gradients: an orange gradient for the "chips" (`135deg #fdc84b -> #fca311 -> #f18701`) and navy overlays over two noise/contact background PNGs. Transitions: `opacity, transform 0.2s` (48 - framer-motion reveals), `color 0.2s` (18), `background 0.25s` (10). Lenis smooth scroll active (`globals.lenis: true`, `lenisRoot: true`). Keyframes: `logo-marquee`, `band-marquee`, `service-bg-marquee`, `pulse`.

1. **Header** (`desktop-01.png`, 109 px, static, black background per `sections[0].bg`, visually the top strip). A black "Available for Projects" tab with a green pulsing dot hangs from the top centre (`pulse` keyframe); logo tile "FN" with an orange corner square + name; four 16 px links; a slate pill "Contact" (`rgba(20,33,61,0.78)`). Hover on "Contact" (CONFIRMED `hover[1]`): background -> orange `#fca311`, text -> black, 250 ms.
2. **Hero** (`desktop-02.png`, 552 px, container 1,128 px). A grey pill "6+ apps live on the Play Store" + plain text "Serving 1,500+ users worldwide"; H1 92 px / 400 Cal Sans, -2.76 px tracking, three centred lines with two **inline image chips** (a ride-placed UI card and a photo capsule) embedded between words; 17 px navy paragraph naming the stack (Flutter, GoHighLevel, Zapier); black pill "Let's Work Together ->" (hover: orange background, black text - CONFIRMED `extra-hover-faheem-btn-*.png` + diff) and an underlined ghost link "See My Work". 52 inline transforms = staggered word/element reveals (framer-motion, CONFIRMED in bundle; timing UNVERIFIED). Mobile (`mobile-hero.png`): H1 40 px / 42 px in six lines, chips shrink to ~110 px, buttons stack centred.
3. **Hero banner** (`desktop-03.png`, 793 px, navy). A 32 px-radius navy panel with three real app screenshots edge to edge (two phone UIs and one dark web UI). Mobile (`mobile-03.png`): one screenshot.
4. **Crossed marquee bands** (`desktop-04.png`, 322 px). Two rotated ribbons (orange and navy) crossing like an X, each an infinite text marquee of skills separated by a spark glyph; motion CONFIRMED (`extra-faheem-band-f1/f2.png`: labels shift ~40 px in 300 ms; keyframe `band-marquee`). Mobile (`mobile-04.png`): same, 272 px.
5. **About statement** (`desktop-05.png`, 509 px). Orange bracketed eyebrow "(About)", a 48 px Cal Sans statement in light grey (`rgba(19,19,19,0.18)` - a scroll-driven word-by-word darkening effect, UNVERIFIED in motion; the static clip shows it in the pale state), then six outline tech chips.
6. **Proof strip** (`desktop-06.png`, 672 px). Eyebrow "(Proof, not promises)", H2 48 px, a navy 24 px-radius card with three stats (6+ / 1500+ / 2+ at 64 px Cal Sans, white, 16 px captions), and five white product-name chips beneath. Mobile (`mobile-06.png`): stats stack vertically inside the card.
7. **Work cards** (`desktop-07..12.png`; 5 `<article class="work-card">`, 625-791 px each, navy, 24 px radius, 40 px padding). Anatomy: top-left counter "01 / 05"; a left meta column (ROLE, STACK list, LIVE links in orange with a diagonal arrow, each to a Play Store or live URL - `links.external` CONFIRMED); a lighter inset panel with 1-3 real screenshots (phones for apps, dashboards/workflow screenshots for automation projects); bottom row: H3 64 px Cal Sans title + 16 px subtitle left, a 16 px description right with concrete claims (user counts, "zero double-bookings", integrations). No hover effect (`extra-hover-faheem-workcard` diff `{}`; transition `all 0s`). Mobile (`mobile-07.png`, 892 px): meta stacks above the screenshots, then title and copy; the phone panel is cropped at the sides.
8. **Services** (`desktop-13.png`, 1,011 px, white, 32 px radius). Eyebrow "(Services)", H2 "What we do" at ~150 px; a four-tab row (active tab orange with a dot, hairline under the row); a centre panel showing a cropped app screenshot over a huge orange **background marquee** of the service name (`service-bg-marquee` keyframe, 150-194 px letters, `cssAnim: 2`) with a 16 px description and three chips. Tab hover: colour to black (CONFIRMED `extra-hover-faheem-servicetab` diff). Mobile (`mobile-12.png`): tabs become a vertical list, screenshot and chips stack.
9. **About me** (`desktop-14.png`, 743 px, `grid: 2 cols`). Left: an orange-background portrait card with a navy caption band; right: eyebrow, H2 name, paragraph, and four numbered hairline rows (role, apps shipped, current focus, stack). Mobile (`mobile-13.png`): 1 column.
10. **FAQ** (`desktop-15.png`, 747 px, `grid: flex`). Six white 16 px-radius accordion cards in two masonry columns with black round +/- toggles; one open answer shows milestone-based payment terms. Mobile (`mobile-14.png`): single column.
11. **Contact** (`desktop-16.png`, 941 px). Navy card (background image with a dark overlay, `contact-bg.png`): left H3 "Have a project? Let's ship it together." 48 px, a 24-hour reply promise, orange pill "Chat on WhatsApp ->", phone and email; right a three-field labelled form with translucent inputs and a white pill "Send Message". Mobile (`mobile-15.png`): stacked.
12. **Footer** (`desktop-17/18.png`, black). Three columns (Navigation / Profiles / Contact), hairline, copyright, a live local time ("Vehari -> 10:54 am" - CONFIRMED text), "Back to top". A final 185 px strip shows the name in very large type (`desktop-18.png` region; `fontSizes` include 194 px).

Typography: Cal Sans display (317 nodes) + Inter body (155 nodes). Sizes: 48 px (107 uses), 14 px (70), 26 px (56), 64 px (49), 92 px (47), 129.6 px (33), 150 px (16). Colours: black `#000` (186), muted `rgba(19,19,19,0.18)` (89 - the pale statement words), white 64% (58), orange `#fca311` (48).

### 3. Navigation and header

- Static (not sticky) 109 px header; the page relies on the bottom "Back to top" link and Lenis smooth scroll. Header CTA: "Contact" pill (slate -> orange on hover). The "Available for Projects" tab is a strong micro-trust signal.
- Mobile: no menu at all; nav links are hidden and only "Contact" remains (CONFIRMED `mobile-hero.png`). Custom cursor: none.

### 4. Trust building

- The strongest proof structure in this group: stats framed as "Proof, not promises"; five work cards each with role, stack, live store links, real screenshots and outcome-style sentences (user counts, operational claims); a FAQ that answers commercial objections (payments, verifying work, timezones, existing codebases); a named person with a photo and a dated employment line; WhatsApp + email + 24-hour promise. No third-party testimonials or client logos (CONFIRMED headings list).
- Case study anatomy that works: counter -> role/stack/links meta -> screenshots -> title/subtitle -> one paragraph of results.

### 5. CTA strategy

- Primary: black pill with arrow (hero), orange pill (WhatsApp), white pill (form submit), slate pill (header). All 100 px radius, 15 px / 500. Hover: fill flips to orange with black text (`extra-hover-faheem-btn-after.png`). Cadence: header -> hero (2) -> per-card live links -> contact card (2) -> footer. Conversion flow is direct (WhatsApp deep link with a pre-filled message - `links.external` CONFIRMED `wa.me/...?text=...`) plus a labelled form (`a11y.formInputs: 3`, all labelled).

### 6. Detected tech stack

- React + Vite (`assets/index-CBFwYlkN.js`, 103 KB), **Lenis** (`globals.lenis: true`, bundle match), **framer-motion** (bundle match), plain CSS with custom properties (no Tailwind: `tailwindClasses: 0`, `cssRuleCount: 204`), Google Fonts (Cal Sans + Inter 400/500/600). Hosting: Vercel (`server: Vercel`, `x-vercel-cache: HIT`, brotli). No JSON-LD, no canonical, no OG image; title + description + OG title/description present; robots/sitemap empty.

### 7. Performance snapshot

- Desktop: TTFB 3,704 ms, DCL 5,192 ms, FCP 5,708 ms, LCP 7,928 ms (a project JPG), CLS 0.007. Mobile: TTFB 1,727 ms, DCL 3,733 ms, FCP 4,252 ms, LCP 7,324 ms (hero paragraph), CLS 0.017.
- Transfer 2,429 KB / 32 requests: images 2,253 KB (25 files; `contact-bg.png` 712 KB and `noise-bg.png` 452 KB are the two largest, both decorative), JS 103 KB, fonts 68 KB. 8 oversized images (405x900 phone shots rendered at 138-163 px wide; 1480x1010 workflow PNG at 332 px). 12 images lazy-loaded; 119 without width/height attributes (CLS risk); 82 with empty alt.
- Flags: two decorative PNG backgrounds = 1.16 MB; 4 contrast failures on orange eyebrows/tabs (1.6-2.0:1); no `prefers-reduced-motion` rule while running Lenis + three marquees; static header with no mobile menu.

### 8. Borrow / avoid

Borrow:
1. **Case-study card anatomy** (counter, role, stack, live links, screenshots, title, one results paragraph) - this is the model for eComet's project cards (e.g. a Shopify build: role, stack, live store link, screenshots, outcome).
2. **"Proof, not promises" stat card + product chips** (`desktop-06.png`) - numbers in one dark card followed by named products; eComet can list automations shipped, hours saved, stores supported, then chip the platforms (Shopify, GHL, Zapier, Make, n8n, Meta).
3. **Objection-handling FAQ in two columns with commercial answers** (payments, verification, timezones) - directly relevant to eComet's USA/Canada/Europe clients.
4. **Availability tab + local time + WhatsApp deep link with pre-filled text** - three small, concrete signals that a real team is reachable; eComet can show office hours per region.
5. **Service tabs with a live screenshot per tab** (`desktop-13.png`) - shows the deliverable, not an icon; maps to eComet's six service lines.

Avoid:
1. **1.2 MB of decorative noise/contact background PNGs and unsized images** - the page's LCP is a project image at ~8 s; use CSS noise or a 20 KB WebP.
2. **Hidden navigation on mobile** (no menu at all) and a non-sticky header - on a 14,000 px mobile page the user has no way to jump to Works or Contact except scrolling.

---

## Cross-site comparison

| Row | Studiova | Dixor | Wevetech | Mau5tech | ZeynApp | Faheem Naveed |
|---|---|---|---|---|---|---|
| Hero pattern | Full-bleed muted video, bottom-left tagline + 128 px wordmark H1, lime arrow pill | Dark photo bg, 150 px uppercase two-line H2 (no H1), 3D blob + stat card | Centred glass pill + 96 px H1 with italic serif accent word, animated wave canvas, one pill CTA | Centred pill eyebrow + 96 px H1 with gradient phrase, two pills, three micro-labels, grid bg | Split viewport: 130 px Bebas uppercase H1 (one word magenta) + paragraph/CTA, 3D logo + hex letters | Centred 92 px Cal Sans H1 with inline image chips, availability tab, black pill + ghost link |
| Trust / logo bar | Logoipsum marquee under pricing (placeholder) | 3x3 hairline grid of large-brand logos + "45+ clients" (template) | Typed brand names, no images (placeholder) | None | None (Awwwards badge only) | None (product-name chips instead) |
| Services layout | Dark section, 4 hairline rows with photo left | 4 flush dark cards with icon + "Read More" pill | 3x2 bordered cards with violet icon tiles | 3x2 white cards with light-cyan icon tiles | 4-point "dial" + 5-card pyramid of disciplines | 4 tabs with a screenshot + background marquee per tab |
| Process section | None | Pinned horizontal 4-card panel (home) / numbered row (inner) | None (FAQ only) | 4 numbered gradient tiles on a hairline | Discipline pyramid doubles as philosophy | None (FAQ answers process) |
| Work / case study format | Horizontal card carousel (image, title, tags) | Editorial 1-per-slide slider with counter | Decorative orbit diagram, no links | None | Staggered 2-col masonry of video posters + tags; inner page text cards | 5 stacked navy cards: meta column, screenshots, title, results paragraph |
| Testimonial format | 3 unequal cards (lime / dark / white), avatar + company | 2 wide gradient cards + 4.9 rating summary, Swiper | 3 equal cards, quote tile, Unsplash avatar | None | None | None |
| Stats | 3 rows of 3 (40K+/238+/3M+, 98.6%/500+/238+, 320+) | 31K hero card, 4.9/145 reviews, 45+ clients | 210+/52M/5 yr/3 locations tiles | None (3 micro-labels) | None | 6+/1500+/2+ in one navy card |
| CTA cadence | ~1 per 1.5-2 screens; on-page form | Per-card "Read More"; phone/email panel; no form | 4 dark pills; newsletter only | Every ~1,300 px; mailto only | Hero, mid, footer + persistent bottom bar; /contact page | Header, hero, per-card links, WhatsApp + form |
| Footer | Dark, H2 + email rows + 2 link cols | Dark, 2 addresses, newsletter, link grid, socials | Dark, H2 "Let's Talk", 4 links, socials, no contact data | Dark single row | Black 3-col with full address, phone, email, CTA button | Black 3-col, live local time, back-to-top, giant name |
| Motion intensity (1-5) | 2 (AOS fades, marquee, video) | 5 (GSAP split text, pinned horizontal scroll, Swiper, animate.css) | 3 (canvas waves, keyframe float/glow, framer reveals) | 1 (hover only) | 4 (framer reveals, 3D canvas, WebGL, video, hex glow) | 3 (Lenis, 3 marquees, framer reveals) |
| Gradient restraint (1-5, 5 = most restrained) | 5 (no gradients) | 3 (lime text gradients, card gradients) | 2 (10 violet gradients, glows, blur) | 4 (one gradient, four roles) | 5 (flat magenta) | 4 (one orange chip gradient + overlays) |
| Dark / light | Light with dark sections | Dark | Dark | Light | Light with magenta + black blocks | Light grey with navy cards |
| Stack | Bootstrap 5 + jQuery + AOS, Manrope, Cloudflare | React/Vite + GSAP/ScrollTrigger + Swiper + Bootstrap + FA Pro, Barlow, Vercel | React/Vite + Tailwind/shadcn + Radix + framer-motion, Inter + Playfair, Lovable/Cloudflare | React/Vite + Tailwind + lucide, system Inter, Cloudflare | React/Vite + Tailwind/shadcn + framer-motion + three.js + Unicorn Studio, Bebas Neue, Cloudflare | React/Vite + Lenis + framer-motion, plain CSS, Cal Sans + Inter, Vercel |
| Transfer KB (desktop / mobile) | 4,671 / 4,670 | 2,537 / 2,335 | 449 / 450 | 173 / 184 | 8,548 / 847 | 2,429 / 2,424 |
| LCP ms (desktop / mobile) | 12,912 / 18,100 (degraded network) | 4,816 / 13,068 | 19,156 / 8,936 | 2,840 / 1,252 | 8,216 / 5,752 | 7,928 / 7,324 |

All numbers CONFIRMED from each site's `data.json` (`viewports.*.network.transferKB`, `viewports.*.perfAfterLoad.lcpMs`); network was unstable during the run so absolute timings are upper bounds.

## Patterns that appear on 3+ of these sites

1. **Pill-shaped primary buttons with an arrow glyph** - Studiova (arrow circle), Dixor (arrow circle), Wevetech, Mau5tech, Faheem (5 of 6); ZeynApp uses square buttons with a diagonal arrow. Radius 9999/100 px dominates `tokens.radii` on five sites.
2. **Small pill or bracketed eyebrow above every section heading** - Studiova (numbered pill), Dixor (outline pill), Wevetech (glass pill), Mau5tech (letter-spaced cyan text), Faheem ("(Label)" in orange). 5 of 6.
3. **One accent colour doing all the work on a neutral base** - lime (Studiova, Dixor), violet (Wevetech), cyan-blue (Mau5tech), magenta (ZeynApp), orange (Faheem). 6 of 6. Only Mau5tech and Wevetech use gradients for the accent; the rest are flat.
4. **A highlighted word or phrase inside the H1/H2** (colour, gradient or italic serif) - Studiova (lime word), Wevetech (italic violet), Mau5tech (gradient phrase), ZeynApp (magenta word), Faheem (inline image chips as the "highlight"). 5 of 6.
5. **Stat blocks with "N+" figures** - Studiova, Dixor, Wevetech, Faheem (4 of 6); the two sites without stats (Mau5tech, ZeynApp) are also the two with the least proof.
6. **Accordion FAQ near the end of the page** - Studiova, Wevetech, Faheem, plus Dixor's "Why" accordion and inner-page FAQ (4 of 6).
7. **Rounded large-radius containers (24-36 px) for feature blocks** - Dixor cards, Wevetech CTA/newsletter cards, Mau5tech contact card, ZeynApp posters, Faheem work/contact cards (5 of 6).
8. **Marquee or ticker strips** - Studiova (logos), Faheem (skills bands, service background text), Wevetech (`marquee` keyframe present, 4 marquee-like nodes). 3 of 6.
9. **Dark contact/CTA block directly before the footer** - Studiova (dark footer heading), Dixor (contact panel), Wevetech (gradient card), Mau5tech (gradient card), ZeynApp (magenta band), Faheem (navy card). 6 of 6.
10. **React + Vite SPA on Vercel or Cloudflare with Tailwind/shadcn tokens** - Dixor, Wevetech, Mau5tech, ZeynApp, Faheem are all Vite builds (5 of 6); Wevetech and ZeynApp share the exact shadcn variable set. Only Studiova is a static Bootstrap page.
11. **Weak SEO plumbing on the SPAs** - no JSON-LD on 5 of 6 (ZeynApp is the exception), no canonical on 5 of 6, robots/sitemap missing or mis-served on 4 of 6 (`robots.txt`/`sitemap.xml` fields). eComet's redesign should treat ZeynApp's head/JSON-LD setup as the baseline, not the SPA norm.
