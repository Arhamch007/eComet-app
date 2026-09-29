# Agent 1 — Baseline Audit of https://teamecomet.com/ (eComet)

Date: 2026-09-29 · Auditor: Agent 1 (Baseline) · Read-only audit (no logins, no form submissions, no repo changes).

Evidence conventions
- **CONFIRMED** = backed by a screenshot path, a `data.json` path, a curl result, or a `source file:line` in `D:\ecomt\eComet-app`.
- **UNVERIFIED** = could not be run or the result was inconclusive; stated as such.
- Paths below are relative to the scratchpad `…\683364ed-…\scratchpad\` (evidence/…, harness/…). Harness captures: `evidence/teamecomet-<slug>/` (v1, both viewports) and `evidence/teamecomet-<slug>-v2/` (Lead's recapture with AOS forced visible; home/about/services/service-details/project-halyard). My own captures: `evidence/teamecomet-home/extra-*.png` + `extra-checks.json` (harness script `harness/a1-home-checks.js`). Aggregates I produced: `evidence/a1-analysis.txt`, `evidence/a1-page-summary.txt`, `evidence/a1-network-summary.txt`, `evidence/live-main.css`, `evidence/gf-opensans.css`, `evidence/gf-dosis.css`, `evidence/a1-extlinks-retry.txt`.

Caveats (important)
1. **Performance numbers are single headless runs taken while 7+ other browser captures were hitting the same site from this machine; treat them as indicative, not as lab values.** The Lead will run Lighthouse separately; I did not (per Lead instruction).
2. **AOS artefact.** `AOS.init()` runs with defaults (`once:false`, `pages/_app.js:21`). Any element with `data-aos` is re-hidden (opacity 0) whenever it leaves the viewport. The v1 harness scrolled back to the top before shooting, so v1 section shots of AOS-driven sections are blank (e.g. `evidence/teamecomet-home/sections/desktop-04.png`, `desktop-05.png`, and the right half of `desktop-07.png`). Visual scores for those sections use the v2 shots (`evidence/teamecomet-home-v2/…`, `teamecomet-about-v2`, `teamecomet-services-v2`). The behaviour itself is a CONFIRMED weakness (see W-08).
3. The two Lead facts I was asked to re-verify are both CONFIRMED from `data.json`: every inner page has `h1Count: 0` (about, services, service-details, contact, team, testimonials, projects/beautysmile, projects/halyard); only `/` has an H1 ("Crafted Automation & Growth Solutions"); the 404 page returns a real HTTP 404 (`evidence/teamecomet-404/data.json` → `viewports.desktop.status: 404`; curl `404 https://teamecomet.com/no-such-page-audit-check/`).
4. The fetch-based crawler (`harness/crawl-light.js`) completed once (24 URLs, `evidence/crawl-teamecomet.com.json`, copy at `crawl-teamecomet.com.v1.json`); two re-runs failed with `fetch failed` while the site was under capture load (`evidence/a1-crawl-rerun.log`). curl worked throughout, so link checks are curl-based.

---

## 1. Page inventory

Repo facts re-verified: Next.js 13 pages router; `package.json` `name: "jumpx"`, `description: "Jumpx - React Next.js AI & IT Startup Template"`, `author: "EnvyTheme.com"` (CONFIRMED `package.json:2-4,11`). `next.config.js:5 trailingSlash: true`. Hosting: `Server: Netlify`, Brotli, HSTS, `Cache-Control: public,max-age=0,must-revalidate` on HTML (CONFIRMED curl headers, `evidence/…/data.json → responseHeaders`).

Global head on every page (CONFIRMED live HTML via curl and `data.json`): `<html lang="zxx">`; `<title>eComet</title>`; **no** meta description, canonical, Open Graph, Twitter card, robots meta, theme-color or JSON-LD on any page (`meta.description: null`, `canonical: null`, `jsonLd: []` for all 10 captured pages). Only head links are two Google Fonts stylesheets and `/images/favicon.png` (`pages/_document.js:13-21`).

| # | Live URL (as linked) | Final URL / redirect | Status | Title | Meta desc | H1 | Words | JSON-LD | Linked from | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `/` | — | 200 | eComet | none | "Crafted Automation & Growth Solutions" (1) | 1,334 | 0 | nav, footer logo | Home. 76 headings, 48 `<img>`. |
| 2 | `/about-1/` | 301 → `/about-1` | 200 | eComet | none | none (H2 "About Us") | 282 | 0 | nav, hero "Learn More" | Template route name `about-1`. |
| 3 | `/services-4/` | 301 → `/services-4` | 200 | eComet | none | none | 162 | 0 | nav | Template route name `services-4` ("Services Style Four"). |
| 4 | `/contact/` | 301 → `/contact` | 200 | eComet | none | none | 63 | 0 | nav, hero, CTA bands | Formspree form. |
| 5 | `/service-details` | 200 direct | 200 | eComet | none | none | 219 | 0 | **not linked anywhere live** (orphan) | Pure template content ("Service Of Warehousing", lorem ipsum, hello@jumpx.com). |
| 6 | `/team` | 200 direct | 200 | eComet | none | none | 43 | 0 | **orphan** | Template placeholder people; 8 images 404. |
| 7 | `/testimonials` | 200 direct | 200 | eComet | none | none | 172 | 0 | **orphan** | 9 lorem-ipsum testimonials; 2 images 404. |
| 8–27 | `/projects/<Name>/` ×20 (Drganja, Halyard, Havoc, Lively, Fellon, PROFICIO, Beautysmile, Zentap, Merly, Workstool, Snapsmile, Greentopfarms, Drone, Ideawake, pHin, Ezyagent, MegaStores, Puppy, Timbits, Fantasy) | each 301 → lower-case slash-less (`/projects/halyard`) | 200 | eComet | none | none (H2 "Project Details") | 221 (Halyard), 248 (Beautysmile) | 0 | home case slider only | 20 pages from `components/CaseStudiesDetails/CaseStudiesDetailsContent1–20.js`; all carry `pageTitle="Project Details"`. |
| 28 | any unknown path | — | **404** | eComet | none | "4 0 4" | 18 | 0 | — | Custom `pages/404.js`; real 404 status. No nav/footer. |

Redirect behaviour (CONFIRMED `harness` curl output and `data.json → finalUrl`): every internal link is emitted with a trailing slash (`trailingSlash: true`) and Netlify 301s it to the slash-less URL: `301 https://teamecomet.com/about-1/ → /about-1` (`evidence/crawl-teamecomet.com.json`), `200 1r https://teamecomet.com/about-1` (curl, one hop). Project links are mixed-case in source (`/projects/Halyard`) and are 301'd to lower-case (`/projects/halyard`). `http://` → `https://` (1 hop) and `www` → apex (2 hops) work. `/404` itself answers 200 (static `404.html`, observed once; second probe timed out — UNVERIFIED minor).

Template routes that still resolve: `/service-details`, `/team`, `/testimonials` (all 200, unlinked). Template routes that do **not** resolve (404, good): `/services`, `/pricing`, `/about-2`, `/services-2`, `/services-3`, `/terms-conditions`, `/privacy-policy`, `/blog`, `/faq`. The unused component `components/Services/WhatWeOffer.js:138` and the commented footer still link to `/services` and `/pricing`.

API route deployed from the template: `GET /api/contact` → 308 → `/api/contact/` → **500** (CONFIRMED curl). Source `pages/api/contact.js:7` `api_key: "..."`, `:20` `to: "exampleyour@gmail.com"`. Nothing live posts to it (ContactForm uses Formspree), but it is a public, erroring endpoint.

`robots.txt` → **404**, `sitemap.xml` → **404** (CONFIRMED curl; `/favicon.png` at root also 404 — the icon link points to `/images/favicon.png`, which is 200).

Repo pages vs live: all files in `pages/` are deployed; nothing in the repo is missing from live. Unused components in the repo (dead template code, still shipped in the bundle where imported): `components/AboutOne/About.js` (lorem, "PHP 7 ready transfer"), `components/Common/CTA.js` (used only on project pages), `Common/Partner.js`, `Common/PartnerSlider.js`, `Common/PartnerSliderTwo.js` (brand1–10.png, all `href="#"`), `Common/Team.js`, `Common/TeamTwo.js` (**the real eComet team, commented out** in `pages/about-1.js:31`), `Contact/ContactFormStyleTwo.js` (posts to `utils/baseUrl.js:2` = `https://jumpx-react.envytheme.com`), `Faq/FaqContent.js` + `Faq/AskQuestionForm.js` (lorem), `HomeOne/WhyChooseUs.js`, `Services/WhatWeOffer.js` (lorem, "Heavy Industry / Transportation / Health Care / Manufacturing").

---

## 2. Section inventory

Scores are /10: **D** design, **C** clarity, **X** conversion. Rationale lines given for ≤4 or ≥8. Screenshot columns point at the file I looked at.

### 2.1 Home `/` (12 sections; desktop `evidence/teamecomet-home-v2/sections/desktop-NN.png`, mobile `evidence/teamecomet-home/sections/mobile-NN.png`)

| # | Section (component) | Purpose | Headline | Visual treatment | Animation (what · trigger · library) | CTA → target | D | C | X | Evidence |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Navbar (`components/Layouts/Navbar.js`) | Global nav | — | Transparent bar over gradient, old white angular mark (`/images/eComet1.png`, 4.7 KB, `alt="img"`), 4 uppercase white links (HOME/ABOUT/SERVICES/CONTACT), no CTA, no phone. After 150 px scroll `is-sticky`: black bar, links turn orange (`style.scss:1177-1190`). Mobile: black bar 79 px, grey 30×28 hamburger with orange bars. | Link hover/active = `text-shadow: 6px 6px 8px #000` (`style.scss:865-869`), 0.5 s; sticky toggled by a scroll listener that is re-added on every render (`Navbar.js:19-28`, `useEffect` without deps). | none | 4 | 6 | 3 | `evidence/teamecomet-home/desktop-hero.png`, `extra-header-sticky-400.png`, `extra-mobile-menu-open.png` · D4: transparent nav with white 15 px text on amber = 2.4–2.5:1; blurred-shadow hover looks dated. X3: no primary CTA or contact in the header. |
| 2 | Hero (`components/HomeOne/MainBanner.js`) | Value proposition | "Crafted Automation & Growth Solutions" | `linear-gradient(#cea11a, #ff8020)` full-bleed, black Dosis 50/60 px H1 left, 49-word abstract paragraph, two identical black pill buttons, template robot/dog illustrations (shape2–4.png) on the right, white cloud divider (`bottom-shape.png` 1920×308). `main-img1.png` is downloaded but `display:none` (`style.scss:1571`). | On load: H1/p/buttons AOS `fade-in` 1200 ms at 100/200/300 ms; 4 shape images animate.css `fadeInUp/fadeInRight` 0.8 s; **infinite** CSS animations: section `::before` `focus-one 1s infinite` and `::after` `moVebounce 5s infinite` (both full-size background image `animate4.png`), 3 `.over-shape` sprites `animationFramesOne` 25/40/25 s infinite (`style.scss:1523-1548,1604-1621`; live values in `extra-checks.json → heroAnim`). | "Learn More" → `/about-1/`; "Contact Us" → `/contact/` | 5 | 4 | 4 | `desktop-hero.png`, `extra-hero-t0.png`, `extra-hero-t2500.png`, `extra-mobile-hero-fold.png` · C4: headline and paragraph never say what eComet does for whom (no "Shopify", "GoHighLevel", "n8n", "Meta ads", markets). X4: two equal-weight CTAs, no proof point. |
| 3 | White-shape divider (`MainBanner.js:85-87`) | Decorative cloud edge | — | 1920×308 PNG rendered at 390×63 on mobile (oversized). | none | — | n/a | n/a | n/a | `evidence/teamecomet-home/sections/desktop-03.png` |
| 4 | Features (`components/HomeOne/Features.js`) | Three headline services | H3s "Web Development", "Automation Solutions", "Email Marketing" | Three white cards (`$box-shadow`), dotted amber circle icons (react-icons SVG), Dosis H3, 25-word blurbs. No links (read-more commented out `Features.js:57-59`). | Cards AOS `fade-up`; icon circle `border-transform 7s infinite alternate` blob morph (`style.scss:1668`); hover `scale(1.05)` + icon fill. | none | 5 | 6 | 3 | `evidence/teamecomet-home-v2/sections/desktop-04.png` · X3: the three core offers are dead ends. |
| 5 | About (`components/HomeOne/About.js`) | Positioning | "Pioneering Excellence, Fueling Innovation, Redefining Tomorrow" | Stock "HTML/CSS/C++" illustration (`about-img.png` 202 KB, LCP on /about-1), amber eyebrow "About Us" (1.96:1 on white), 6 check-list items, black "Learn More". | AOS fade-in ×2. | "Learn More" → `/about-1/` (on the About page this links to itself) | 4 | 3 | 3 | `home-v2/sections/desktop-05.png`, `evidence/teamecomet-about-v2/sections/desktop-03.png` · C3: 45 words of adjectives ("architects of excellence, catalysts for innovation") and zero facts (founded, size, location, clients). |
| 6 | Services (`components/HomeOne/Services.js`) | Service grid | "Elevate with Exceptional Services" | Full-bleed amber (`rgba(255,166,0,.827)`), white eyebrow "Services" (1.77:1), 6 white cards with pastel icon tiles in **off-palette** purple/blue/teal/pink (`#eeeefe/#9898f0`, `style.scss:1975-1986`), dotted amber borders, hexagon shape PNGs. | Cards AOS fade-in staggered 100–600 ms; 4 shape sprites `animationFramesOne` 10–25 s infinite; hover `translateY(-5px)`. | none (`viewDetails` unused) | 4 | 3 | 2 | `home-v2/sections/desktop-06.png`, `evidence/teamecomet-home/extra-services-after-scrollback.png` (same section blank after scrolling back up) · C3: "Mindful Productivity Coach", "Conscious Consumer Guide", "Optimized Performance" are not eComet services (`Services.js:38-66`). X2: no links, no CTA. |
| 7 | Business + counters (`components/Common/MakeYourBusiness.js`) | Credibility / stats | "Igniting Business Growth with Visionary Strategies" | Left: two items about cybersecurity and eco-friendly practices (template copy). Right: 2×2 counter tiles, alternating amber/black with hard `0 0 20px 1px #000` glow (`style.scss:2143`), staggered offsets. | Counters AOS `fade-up`; hover `rubberBand 1s` (animate.css); no count-up. | none | 3 | 2 | 3 | `home-v2/sections/desktop-07.png`, `extra-mobile-counters.png` · D3: black drop-glow tiles and staggered offsets read as 2018 template. C2: "30+ Rescue Mission" is unexplained; the two feature blurbs are unrelated to the business. |
| 8 | What-we-offer tabs (`components/HomeOne/WhatWeOffer.js`) | Differentiators | "Excellence for Your Unique Solutions." | 4 pill tabs (60 px radius) left, stock isometric illustration (`offer1.png` 275 KB) centre, text + 6 check chips right. Tab labels: Crafted Mastery / Proven Expertise / Innovative Solutions / Peak Perfection. | Tab click swaps `display` via `openTabSection` that strips "current" from **every `<li>` on the page** (`WhatWeOffer.js:13-16`); no transition. Verified click works (`extra-tabs-tab2.png`). | none (buttons commented out) | 5 | 2 | 2 | `home-v2/sections/desktop-08.png`, `evidence/teamecomet-home/sections/mobile-06.png` · C2: every tab says the same thing ("Virtual Assistant and Web Development services") in different adjectives. |
| 9 | Recent projects slider (`components/HomeThree/CaseStudies.js`) | Portfolio | "Our Recent Projects" | Swiper, 3-up laptop mockups (case*.jpg 2048² served at 415 px), 18 grey pill bullets; hover: amber overlay slides in from the left with title/blurb/plus icon. | Swiper autoplay 6.5 s (`CaseStudies.js:21-25`), `pauseOnMouseEnter`; hover overlay 0.6 s `all` transition ×40 elements. | Card → `/projects/<Name>/` (each an H2 **and** an H3 link — 40 headings) | 5 | 5 | 4 | `evidence/teamecomet-home/sections/desktop-09.png`, `sections/mobile-07.png` · Blurbs like "Navigating the realms of iOS, HTML5, CSS3, PHP, and Java" (`CaseStudies.js:78-79`) are not case-study statements. |
| 10 | Testimonials (`components/Common/Testimonials.js`) | Social proof | "What Clients Say About Us" | Grey `rgb(117,116,116)` cards, amber quote badge, amber triangle tail, stock headshots below the card, 5 amber stars each; Swiper arrows in amber; eyebrow "Testimonials" is white-on-white (invisible). | Autoplay 6.5 s. | none | 4 | 5 | 4 | `sections/desktop-10.png`, `extra-mobile-testimonials.png` · D4: mid-grey card is the only grey in the palette; name/role are absolutely positioned 170 px below the card (`style.scss:2444-2447`). |
| 11 | FAQ (`components/HomeThree/Faq.js`) | Objection handling | "Frequently Asked Questions" | 5 accordion rows (react-accessible-accordion), stock question-mark illustration. Eyebrow "FAQ,s" (typo) white-on-white. 3rd question pre-expanded (`preExpanded={["a"]}`, item "a" is third). | Panel toggle (no transition). | none | 6 | 6 | 5 | `sections/desktop-11.png`, `sections/mobile-09.png` |
| 12 | Footer (`components/Layouts/Footer.js:228-276`) | Footer | — | Amber block, "eComet Technologies" lock-up (`eComet121.svg`, **no alt**), one sentence, 3 black round icons (Facebook, LinkedIn, Gmail "M" icon for mailto), "Copyright © 2026 eComet", "Designed By ♥ eComet" linking to `#`. No nav, address, phone, legal links. | none | none | 3 | 4 | 2 | `sections/desktop-12.png`, `sections/mobile-10.png` · D3: amber footer on an amber-heavy page, third brand rendering of the logo. X2: no contact details or links. |

Home averages (11 scored sections): **D 4.4 · C 4.2 · X 3.2 → 3.9/10**.

### 2.2 About `/about-1` (`pages/about-1.js`; shots `evidence/teamecomet-about-v2/sections/desktop-NN.png`, v1 mobile `evidence/teamecomet-about/sections/mobile-NN.png`)

| # | Section | Headline | Treatment / animation | CTA | D | C | X | Evidence |
|---|---|---|---|---|---|---|---|---|
| 1 | Page title (`Common/PageBanner.js`) | "About Us" (H2) | Same amber gradient as hero, 200/150 px padding desktop (445 px tall banner with 2 words), breadcrumb "Home • About" (white link on amber 2.4:1). | — | 3 | 5 | 2 | `about-v2/sections/desktop-01.png`, `about/sections/mobile-01.png` · D3: 445 px of gradient for a 2-word title. |
| 2 | About (`HomeOne/About.js` reused) | "Pioneering Excellence…" | Identical to home §5. "Learn More" links to the page it is on. | `/about-1` | 4 | 3 | 3 | `about-v2/sections/desktop-03.png` |
| 3 | Business + counters (reused) | "Igniting Business Growth…" | Identical to home §7. | — | 3 | 2 | 3 | `about-v2/sections/desktop-04.png` |
| 4 | Testimonials (reused) | "What Clients Say About Us" | Identical to home §10. | — | 4 | 5 | 4 | `about/sections/desktop-05.png` (v1; no AOS) |
| 5 | Empty spacer `<div class="pt-100">` (`about-1.js:30-32`, TeamTwo commented out) | — | 100 px of nothing where the real team used to be. | — | 1 | 1 | 1 | `about/sections/desktop-06.png` (100 px blank) · The genuine team component `Common/TeamTwo.js` (Usama Iqbal, Farooq Ashraf, Arham Mahmood, Abouzar Ijaz, Bilal Raza, Ali Abdullah, Zain Fayyaz, Hammad Ahmad, Abdullah Haroon) is the only page content that names real people and it is disabled. |
| 6 | Footer | — | as home | — | 3 | 4 | 2 | `about/sections/desktop-07.png` |

About averages: **D 3.0 · C 3.3 · X 2.5 → 2.9/10**. No H1, 282 words, no founding story, no location/markets, no team.

### 2.3 Services `/services-4` (`pages/services-4.js`; `evidence/teamecomet-services-v2/sections/`, v1 mobile `evidence/teamecomet-services/sections/`)

| # | Section | Headline | Treatment / animation | CTA | D | C | X | Evidence |
|---|---|---|---|---|---|---|---|---|
| 1 | Page title | "Our Services" | as About §1 | — | 3 | 5 | 2 | `services/sections/desktop-01.png` |
| 2 | Industries-serve grid (`Services/ServicesStyleFour.js`) | "Unleashing Seamless Web, Automation & Marketing Solutions" | 4+4 white pills (60 px one-sided radius) around the same `offer1.png` illustration used on home; Flaticon icons mismatched to labels (hospital icon for "Intelligent Workflows", robot-arm for "Strategic Email Marketing", `ServicesStyleFour.js:38,46`); sub-labels are slogans ("Coding Frontiers", "Empower Commerce, Elevate Solutions"). Hover: amber sweep + icon `rotate(360deg)`. | none | 5 | 4 | 2 | `services/sections/desktop-03.png`, `services/sections/mobile-02.png` · X2: eight services, zero links, zero pricing/process/CTA. |
| 3 | Business + counters (reused) | — | as home §7 | — | 3 | 2 | 3 | `services-v2/sections/desktop-04.png`, `services/sections/mobile-03.png` (v1: counters blanked, 1,400 px of white on mobile) |
| 4 | Footer | — | — | — | 3 | 4 | 2 | `services/sections/desktop-05.png` |

Services averages: **D 3.5 · C 3.8 · X 2.3 → 3.2/10**. 162 words for the whole services offer; Shopify pre/post-sales, GoHighLevel, Meta ads, Zapier/Make/n8n and VA services are not named anywhere.

### 2.4 Service details `/service-details` (`pages/service-details.js`, orphan)

| # | Section | Headline | Treatment | CTA | D | C | X | Evidence |
|---|---|---|---|---|---|---|---|---|
| 1 | Page title | "Service Details" | as above | — | 3 | 5 | 2 | `evidence/teamecomet-service-details/sections/desktop-01.png` |
| 2 | Content + sidebar (`ServiceDetails/ServiceDetailsContent.js`, `ServiceSidebar.js`, `AskQuestionForm.js`) | "Service Of Warehousing" | Stock photo, **three paragraphs of lorem ipsum** (`ServiceDetailsContent.js:20-45`), car-detailing checklist ("Engine bay cleaned and dressed", `:61-80`), sidebar "Facilities: Technology/Tips/AI & IT/Solution", "Contact Info: +800 603 6035, hello@jumpx.com, 123, Western Road, Australia, 9:00 AM – 8:00 PM" (`ServiceSidebar.js:42-55`), "Download Brochures PDF File (1–4)" all `href="#"` (`:64-86`), "Ask Questions" form with **no submit handler** (`AskQuestionForm.js:8`, submits GET to itself). | "Send Message" (dead) | 2 | 1 | 1 | `service-details/sections/desktop-03.png` · Pure template page live on the domain with a foreign phone number and email. |
| 3 | Footer | — | — | — | 3 | 4 | 2 | `service-details/sections/desktop-04.png` |

Service-details averages: **D 2.7 · C 3.3 · X 1.7 → 2.6/10**.

### 2.5 Contact `/contact` (`pages/contact.js`; `evidence/teamecomet-contact/sections/`)

| # | Section | Headline | Treatment | CTA | D | C | X | Evidence |
|---|---|---|---|---|---|---|---|---|
| 1 | Page title | "Contact Us" | as above | — | 3 | 5 | 2 | `contact/sections/desktop-01.png` |
| 2 | Contact info (`Contact/ContactInfo.js`) | H3s "Email Us:", "Call Us:", "Pakistan" | Three white cards, dotted amber icons. Email `hr@teamecomet.com` (an HR mailbox as the sales contact), phone displayed "(92)-302-692003-4" but `href="tel:03026820034"` (digits differ: 692 vs 682, `ContactInfo.js:27`), address "F-Block, Street #9, Vehari" under heading "Pakistan"; no hours, no map, no USA/Canada/EU presence. Hover: whole card turns amber with white text. | mailto / tel | 5 | 5 | 5 | `contact/sections/desktop-03.png`, `contact/sections/mobile-02.png` |
| 3 | Form (`Contact/ContactForm.js`) | "Inquisitive Minds, Swift Replies – Message Now!" | Formspree `useForm("mbjvedvw")` (`ContactForm.js:4`), 5 required fields with placeholder-only labels (no `<label>`), grey inputs radius 4, black "Send Message"; stock megaphone illustration (`contact-img.png` 335 KB, 2000² rendered 636 px). Success state is inline-styled Arial 44 px with text-shadow and "color: orange" (`ContactForm.js:11-35`). No privacy note, no response-time promise, no alternative (calendar/WhatsApp). | "Send Message" (Formspree) | 5 | 5 | 5 | `contact/sections/desktop-04.png`, `contact/sections/mobile-03.png` |
| 4 | Footer | — | — | — | 3 | 4 | 2 | `contact/sections/desktop-05.png` |

Contact averages: **D 4.0 · C 4.8 · X 3.5 → 4.1/10**. 63 words.

### 2.6 Team `/team` (`pages/team.js` → `components/Team/TeamCard.js`, orphan)

| # | Section | Treatment | D | C | X | Evidence |
|---|---|---|---|---|---|---|
| 1 | Page title "Team" | as above | 3 | 5 | 2 | `evidence/teamecomet-team/sections/desktop-01.png` |
| 2 | Team grid | **Template placeholders**: Karen Peter (CEO & Founder), Alex Piter, Alisa Maria, Peter Jack ×2, Anna Dew, Zeck Keath, Zeet Pew ("Wed Developer") (`TeamCard.js:5-204`); images `team1–8.png` **all 404** (8 console errors, `team/data.json → network.failed`), broken-image icons inside a cyan/violet ring PNG; social links to `facebook.com/`, `twitter.com/`, `linkedin.com/`, `pinterest.com/`; fake pagination 1-2-3 (`<a class="page-link">` without href, `TeamCard.js:252-276`). Cards AOS fade-in. Mobile v1 shows only 2 cards then 2,000 px of white (AOS). | 1 | 1 | 1 | `team/sections/desktop-03.png`, `team/sections/mobile-02.png` · D1/C1/X1: a live page on the company domain showing invented staff with broken photos. |
| 3 | Footer | — | 3 | 4 | 2 | `team/sections/desktop-04.png` |

Team averages: **D 2.3 · C 3.3 · X 1.7 → 2.4/10**.

### 2.7 Testimonials `/testimonials` (`components/Testimonials/TestimonialsContent.js`, orphan)

| # | Section | Treatment | D | C | X | Evidence |
|---|---|---|---|---|---|---|
| 1 | Page title "Testimonials" | as above | 3 | 5 | 2 | `evidence/teamecomet-testimonials/sections/desktop-01.png` |
| 2 | 3×3 grid | Nine grey cards, every quote is "Lorem ipsum dolor sit amet, consectetur adipiscing elit,do eiusmod tempor incididunt ut labore et dolore." (`TestimonialsContent.js:8-9` … `:208-209`), names Alen Meair, Axon Detos, John Dona, Jon Smith, Dew Smith, Jeath Smith, Kilkaz Dew, Ana Deth, Zeck Smith; `client7.jpg` and `client9.jpg` **404** (broken-image icons); fake pagination; light-grey section `#f5f5f5`. Same stock headshots (client1–3) are reused on the home slider as "Lexi Ehrman", "Oscar Adams", "Logan Smith". | 1 | 1 | 1 | `testimonials/sections/desktop-03.png`, `testimonials/sections/mobile-02.png` |
| 3 | Footer | — | 3 | 4 | 2 | `testimonials/sections/desktop-04.png` |

Testimonials averages: **D 2.3 · C 3.3 · X 1.7 → 2.4/10**.

### 2.8 Project — Beauty Smile `/projects/beautysmile` (`CaseStudiesDetailsContent18.js`)

| # | Section | Treatment | D | C | X | Evidence |
|---|---|---|---|---|---|---|
| 1 | Page title "Project Details" | Generic title for every one of 20 projects. | 3 | 4 | 2 | `evidence/teamecomet-project-beautysmile/sections/desktop-01.png` |
| 2 | Case body | Full-width store screenshot (`/images/services-details/Luke/Luke2.png` 339 KB — folder named after a different client), H3 "Beauty Smile", 3 paragraphs of narrative without a single number, second screenshot + facts list "Client: Beauty Smile · Technologies: Shopify · **Industry: IT** (it is a dental-cosmetics store) · URL: www.beautesourire.fr". No problem/solution/result structure, no testimonial, no service link. Bootstrap-blue link colour `#0d6efd` for the URL (off-palette). | 4 | 4 | 3 | `beautysmile/sections/desktop-03.png` |
| 3 | CTA band (`Common/CTA.js`) | `cta-bg.jpg` 296 KB with `background-attachment: fixed` and a black→brown gradient overlay (`style.scss:5625-5637`), "SO WHAT IS NEXT? / Are You Ready? Let's get to work!", black button. | "Contact Us" → `/contact` | 5 | 6 | 5 | `beautysmile/sections/desktop-04.png` |
| 4 | Footer | — | 3 | 4 | 2 | `beautysmile/sections/desktop-05.png` |

Averages: **D 3.8 · C 4.5 · X 3.0 → 3.8/10**.

### 2.9 Project — Halyard `/projects/halyard` (`CaseStudiesDetailsContent1.js`; v2 shots `evidence/teamecomet-project-halyard-v2/sections/`)

| # | Section | Treatment | D | C | X | Evidence |
|---|---|---|---|---|---|---|
| 1 | Page title "Project Details" | — | 3 | 4 | 2 | `evidence/teamecomet-project-halyard/sections/desktop-01.png` |
| 2 | Case body | `Halyard/one.png` **1,454 KB** (1895×873 rendered 471 px on desktop, 366 px on mobile) → LCP 5.8 s and CLS 0.055 on desktop (`halyard/data.json → perfAfterLoad`). Copy is Halyard's own corporate boilerplate in the first person ("Our $1.2 billion portfolio… sold in more than 90 countries", `Content1.js:20`) — it reads as if eComet is Halyard; "Technologies: iOS, HTML5, CSS3, PHP, Java"; "Industry: IT" for a medical-supplies company; no description of what eComet actually did. | 4 | 2 | 2 | `halyard/sections/desktop-03.png`, `halyard/sections/mobile-02.png` · C2: no eComet contribution stated. |
| 3 | CTA band | as above | 5 | 6 | 5 | `halyard/sections/desktop-04.png` |
| 4 | Footer | — | 3 | 4 | 2 | `halyard/sections/desktop-05.png` |

Averages: **D 3.8 · C 4.0 · X 2.8 → 3.5/10**.

### 2.10 404 (`pages/404.js`)

| Section | Treatment | D | C | X | Evidence |
|---|---|---|---|---|---|
| Error area | Real 404 status. Giant "4 0 4" (300 px Dosis, red gradient zero), red H3 "Oops! Page Not Found" (`#ff0000` 4.0:1), black "Return To Home Page". **No navbar, no footer, no search**, title still "eComet", `lang="zxx"`, H1→H3 skip. | 5 | 6 | 4 | `evidence/teamecomet-404/sections/desktop-01.png`, `sections/mobile-01.png` |

Average: **5.0/10**.

### Per-page average table

| Page | D | C | X | Overall |
|---|---|---|---|---|
| Home | 4.4 | 4.2 | 3.2 | **3.9** |
| About | 3.0 | 3.3 | 2.5 | **2.9** |
| Services | 3.5 | 3.8 | 2.3 | **3.2** |
| Service details | 2.7 | 3.3 | 1.7 | **2.6** |
| Contact | 4.0 | 4.8 | 3.5 | **4.1** |
| Team | 2.3 | 3.3 | 1.7 | **2.4** |
| Testimonials | 2.3 | 3.3 | 1.7 | **2.4** |
| Project Beauty Smile | 3.8 | 4.5 | 3.0 | **3.8** |
| Project Halyard | 3.8 | 4.0 | 2.8 | **3.5** |
| 404 | 5 | 6 | 4 | **5.0** |

---

## 3. Design tokens actually in use

Source of truth: `styles/style.scss:83-93` (`$body-font-family: "Open Sans"`, `$heading-font-family: "Dosis"`, `$main-color: rgba(255,166,0,0.829)`, `$body-color: #4d4d4d`, `$heading-color: #212121`, `$box-shadow: 0 0 20px 3px rgba(0,0,0,.05)`, `$transition: all 0.6s ease`, `$border-radius: 4px`), cross-checked with computed values in `evidence/teamecomet-home/data.json → viewports.*.data.typography|tokens` and `extra-checks.json`.

**Typography (CONFIRMED)**
- Families: Dosis (all headings; 110 elements on home), Open Sans (body, nav, buttons; 83 elements). Loaded faces actually used on home: Open Sans 400, 400 italic, 600; Dosis 500, 600, 700 (`extra-checks.json → fonts.loaded`), plus icon fonts boxicons, Flaticon, swiper-icons. Requested from Google: Open Sans 300/300i/400/400i/600/600i/700/700i and Dosis 200–800 (`pages/_document.js:14,18`) → 9 of 15 requested weights never used.
- Font-size scale, desktop home (element counts): 15 px ×91 (body), 22 px ×35 (H3), 32 px ×20 (swiper arrows), 20 px ×9, 18 px ×9, 16 px ×7, 40 px ×7 (H2), 50 px ×5 (H1, counters), 14 px ×5 (eyebrows/footer), 13 px ×5 (testimonial role). Mobile: 14 px ×69, 20 px ×44, 15 px ×34, 24.7 px ×20, 18 px ×9, 25 px ×7 (H2), 13 px ×5, 40 px ×4 (counters), 30 px ×1 (H1).
- Roles: H1 50/60 px 700 black `#000`; H2 40/48 px 700 `#212121`; H3 22/26.4 px 700; body 15/27 px 400 `#4d4d4d`; hero p 16/28.8 px black; nav 15 px 500 uppercase white; button 15 px 600; footer 14 px; eyebrow 14 px. Mobile: H1 30/36, H2 25/32.5, H3 20/26, p 14/25.2 (`styles/responsive.scss:133-153`).
- Fallback: in the harness run where Google Fonts CSS failed (`home/data.json → network.failed`), the whole page rendered in Arial (`evidence/teamecomet-home/desktop-hero.png`) — the site has no self-hosted or preconnected fonts.

**Colour (computed, counts on home desktop)**
| Token | Value | Role | Count |
|---|---|---|---|
| Heading | `#212121` | H2/H3/text | 95 |
| Body | `#4d4d4d` | paragraphs | 42 |
| Black | `#000000` | H1, buttons, sticky nav bg, 2 counters, social circles | 34 text / 8 bg |
| White | `#ffffff` | nav links, eyebrows, card bg | 20 text / 47 bg |
| Primary amber | `rgba(255,166,0,0.827)` (≈ `#ffb52c` on white) | section bg, footer bg, icons, counters, hover fills | 21 bg |
| Bullet grey | `#d6d6d6` | swiper bullets | 17 |
| Card grey | `rgb(117,116,116)` | testimonial cards | 5 |
| Hero/page-title gradient | `linear-gradient(#cea11a → #ff8020)` | hero, every page banner | 1/page |
| Icon tiles | `#eeeefe/#9898f0`, `#e8f3fd/#76b8f5`, `#e6fdfc/#1ccdca`, `#fcf3dc/#f9ca54`, `#fde2db/#ff896b`, `#e7fdf1/#50d890` | services cards (template pastel set) | 6 |
| CTA band | black → `#3d3a3c` → `rgb(114,53,5)` gradient over photo | project pages | 1 |
| 404 zero | `#ff416c → #fa4612` | 404 | 1 |
| Link default | `#0d6efd` Bootstrap blue | project URL links | 1 |
| Designed-by link | `rgb(255,69,0)` | footer | 1 |
| Form | bg `#f7f7f7`, border `#e8e8e8`, placeholder `#495057` | inputs | 5 |

**Mismatch with the new brand:** the new logo is a comet-shaped "e" with a cyan→blue→violet→magenta gradient on black. Nothing on the live site uses cyan, blue, violet or magenta as a brand colour; the palette is amber/orange + black + white, and the only cool-gradient element is the template `team-shape.png` ring on the placeholder team page. The live logo files (`eComet1.png` white angular mark in the nav, `eComet121.svg` "eComet Technologies" lock-up in the footer) are a different mark from the new one (CONFIRMED `desktop-hero.png`, `sections/desktop-12.png`).

**Spacing rhythm (CONFIRMED `style.scss:197-215`, `responsive.scss:109-129`, section `padding` in `data.json → sections`)**: section padding `pt-100/pb-100/pb-70` desktop → `50/50/20` px under 767 px; hero 200/300 px desktop → 130/100 mobile; page-title 200/150 → 150/100; container max-width 1320 px (Bootstrap 5 `.container`), gutter 24 px; `.section-title` max-width 625 px, margin-bottom 60 px (40 mobile); card padding 30 px; contact form padding 50 px. Home is 6,966 px tall on desktop and 10,869 px on mobile.

**Radii**: 30 px ×38 (case images, bullets), 50 % ×34 (icons), 4 px ×21 (`$border-radius`: cards, inputs), 10 px ×8 (buttons, client photos), 5 px ×5 (accordion), `60px 0 0 60px` ×4 / `0 60px 60px 0` ×4 (service pills), `0 30px 30px 30px` ×2 (business icons), organic blob keyframes `border-transform` ×3 (feature icons), 0 (hamburger, GoTop).

**Shadows**: `0 0 20px 3px rgba(0,0,0,.05)` ×39 (cards), `2px 8px 20px rgba(25,42,70,.13)` ×6 (accordion, `!important`), `0 0 20px 1px #000` ×2 and `0 0 20px 1px amber` ×2 (counters), `0 0 5px .1px amber` ×8 (team cards).

**Buttons** (`style.scss:495-553`, computed `data.json → buttons`): one style only, `.default-btn`/`.btn-two`: bg `#000`, text `#fff` 15 px/600, padding 18 px 35 px, radius 10 px, no border, no shadow, ~151×51 px; mobile 14 px, 14 px 20 px, ~118×42. Hover: text stays white, background unchanged; two white 45° "shine" bars (`::before/::after`, opacity .5) slide from −40 px to 200 px over 0.6 s. Focus: browser default ring retained for `<a>` buttons (`extra-checks.json → focus.outline "auto 3px"`), removed for `<button>` (`style.scss:115-123`). No secondary/ghost style exists; both hero CTAs are identical. Harness hover diffs errored (scroll-into-view timeouts under load, `home/data.json → hover[].error`), so hover behaviour is CONFIRMED from CSS, not from live diffs.

**Transitions**: `all 0.6s ease` on 118 elements, `opacity, transform 1.2s` (AOS) on 18, `all .3s` on 6, `text-shadow .5s` on nav.

**Icon systems (four in parallel)**: Boxicons (`styles/boxicons.min.css`, `fonts/boxicons.woff2` 115 KB), Flaticon (custom font), swiper-icons, and react-icons inline SVG (10 inline SVGs on home).

**Images**: 30 PNG + 17 JPG + 1 SVG on home; no WebP/AVIF; `next/image` used 0 times; `loading="lazy"` 0 times; `width/height` attributes on 0 of 48 (`home/data.json → images`).

---

## 4. Weaknesses (all CONFIRMED unless marked)

**Brand and visual consistency**
- W-01 Template look: the site is EnvyTheme "Jumpx" Home-One with its stock assets (robot/dog hero, `offer1–4.png` isometric people, hexagon shapes, megaphone contact art, question-mark FAQ art). `package.json:2-4,11`; `styles/style.scss:2 "@File: Jumpx Template Styles"`; `evidence/teamecomet-home/desktop-hero.png`.
- W-02 Three different logos: nav `eComet1.png` (white angular mark), footer `eComet121.svg` ("eComet Technologies" lock-up), and the new comet "e" is absent. `desktop-hero.png`, `sections/desktop-12.png`.
- W-03 Palette conflicts with the new gradient identity (§3) and includes off-palette template pastels on the service cards and Bootstrap blue links. `home-v2/sections/desktop-06.png`, `beautysmile/sections/desktop-03.png`.
- W-04 Weak hierarchy: hero CTAs identical; eyebrow labels invisible (white on white: "What We Offer", "Testimonials", "FAQ,s", "Contact Us"; 1.0:1 in `data.json → a11y.contrastIssues`); `style.scss:598-603` sets `.section-title span {color: #fff}` regardless of background.
- W-05 Dated patterns named: gradient-banner + cloud divider, text-shadow nav hover, "shine bar" button hover, animate.css `rubberBand` counters, blob-morphing icon circles, 45° triangle speech-tail testimonial cards, fake pagination, "Designed by ♥" credit, hexagon background sprites.

**Animation and motion**
- W-06 Infinite CSS animations on the LCP element: hero `::before focus-one 1s infinite` and `::after moVebounce 5s infinite`, each a full-section background image, plus 3 floating sprites (25/40/25 s infinite) and 4 more in the services section (10–25 s infinite) and blob-morph icons (7 s infinite). `extra-checks.json → heroAnim`, `style.scss:1523-1548,1918-1950,1668`. Continuous repaint on desktop and mobile; nothing is gated on `prefers-reduced-motion` except animate.css's own block (`data.json → reducedMotionRule: true` refers to that block only; AOS and custom keyframes ignore it).
- W-07 Autoplay carousels: projects (20 slides) and testimonials (5) autoplay every 6.5 s with no pause button (`CaseStudies.js:21-25`, `Common/Testimonials.js:148-152`; live `extra-checks.json → swipers.autoplayRunning: true`).
- W-08 AOS `once:false`: 18 elements on home fade out again when scrolled out of view. Measured: before scroll 15/18 at `opacity:0`; after full scroll 18/18 visible; after scrolling back to top 15/18 hidden again (`extra-checks.json → aosBeforeScroll/aosAfterScrollBackTop`; `extra-services-after-scrollback.png` shows the Services section with heading only). Effects: content flashes on every up-scroll, sections look empty to any tool that captures after scrolling (v1 harness shots), and to users on slow devices until the JS runs (`aos-init` elements are `opacity:0` until `AOS.init()` executes).
- W-09 Load-time reveal delays text: H1/p/buttons are AOS `fade-in` 1.2 s at 100–300 ms delay (`MainBanner.js:12-33`) — the value proposition is invisible for ~1.3–1.5 s after first paint.
- W-10 Navbar scroll listener leak: `React.useEffect(() => { document.addEventListener("scroll", …) })` without a dependency array or cleanup (`Navbar.js:19-28`) adds a listener on every render.
- W-11 Tab switcher side effect: `openTabSection` strips "current" from every `<li>` in the document (`HomeOne/WhatWeOffer.js:13-16`).

**Links, structure, content**
- W-12 Every internal navigation click is a 301 (trailing-slash mismatch, §1); project links additionally change case. `crawl-teamecomet.com.json`, curl `200 1r`.
- W-13 Orphan template pages live: `/service-details` (lorem, hello@jumpx.com, +800 603 6035), `/team` (fake staff, 8 broken images), `/testimonials` (9 lorem cards, 2 broken images). Not linked from nav or footer (`Navbar.js:63-163`, `Footer.js:228-276`), but indexable.
- W-14 Dead/placeholder links: footer "Designed By eComet" `href="#"` (`Footer.js:270`); sidebar "PDF File (1–4)" `href="#"`; team social links to bare `facebook.com/` etc.; pagination anchors without `href`; home `links.hashOnly: 1`.
- W-15 Broken images on live pages: `/images/team/team1–8.png` (8×404), `/images/clients/client7.jpg`, `client9.jpg` (2×404). `team/data.json`, `testimonials/data.json → network.failed`.
- W-16 External link health (curl, `evidence/a1-extlinks-retry.txt`, background task output): `fantasy-middleware.herokuapp.com/users/sign_in` → **404** (dead); `fellon.de` → 403 redirect to `sedo.com/search/details/?domain=fellon.de` (**domain parked/for sale**); `havoc-parts.com` → redirects to `shop.havoc-motorcycles.com` (rebranded); `zentap.com` 301; `proficio.com` 403 (bot-blocked, UNVERIFIED); `ideawake.com`, `wearlively.com`, `merley.se`, `shopsnapsmile.com`, `beautesourire.fr`, `nouveaustartups.com` timed out/000 from this network (UNVERIFIED); Facebook profile 400 and LinkedIn 999 (bot walls, UNVERIFIED); `linkedin.com/in/m-farooq-ashraf-08b55311a` 404 (in unused TeamTwo); Upwork agency link 403 (commented out). `envytheme.com` 200 (only in commented code).
- W-17 Copy is generic adjective strings ("Pioneering Excellence, Fueling Innovation, Redefining Tomorrow"; "Crafted Mastery / Masterful Ingenuity"; "Elevate with Exceptional Services") and template leftovers unrelated to the business (cybersecurity, eco-friendly practices, "Conscious Consumer Guide", "Mindful Productivity Coach"). Word counts: services 162, contact 63, team 43.

**Layout shifts and performance**
- W-18 CLS: home 0.04 (Lead's run) / 0.0031 mobile; Halyard desktop **0.0546** (1.45 MB `one.png` without dimensions); services mobile 0.024; 404 0.013. `data.json → perfAfterScroll.shifts`. Root cause: 0/48 images have width/height and all headings render in fallback font before Dosis swaps in (`display=swap`).
- W-19 4.25–4.37 MB per home load, 3.92 MB of it images (49 requests): twelve 2048×2048 JPGs served at 415 px, `case13.png` 313 KB, `offer1.png` 275 KB, `about-img.png` 202 KB, plus a hidden `main-img1.png` 88 KB (`home/data.json → images.oversized`, `network.largest`).
- W-20 Font stack: 105 `@font-face` rules (4 local + 80 Open Sans + 21 Dosis from Google CSS: `evidence/live-main.css`, `gf-opensans.css`, `gf-dosis.css`), two render-blocking third-party stylesheets (`data.json → cssSheetsBlocked: 2`), no `preconnect`, `optimizeFonts: false` (`next.config.js:9`); 126–253 KB of fonts per page including `boxicons.woff2` 115 KB for a handful of icons.
- W-21 CSS: one 474 KB (61 KB brotli) sheet with 4,398 rules, 119 `@keyframes` (all of animate.css), Bootstrap 5 (120 `--bs-*` vars), AOS, Swiper, react-accessible-accordion demo CSS, `style.css` + `responsive.css` (`pages/_app.js:3-14`; `evidence/live-main.css`).

**Mobile**
- W-22 No horizontal page scroll (`layout.horizontalOverflow: false` on all pages), but off-canvas elements exist behind `overflow:hidden` (banner shapes at right=815 px, swiper slides at 769 px, `extra-checks.json → mobile.afterScroll.overflowEls`).
- W-23 Mobile hero: 79 px black bar + 130 px top padding + 2-line H1 + 293-character centred paragraph pushes both CTAs to y≈398 px; the section is 838 px tall with a large empty amber gap under the illustration (`extra-mobile-hero-fold.png`, `sections/mobile-01.png`).
- W-24 Mobile counters: each tile ~370 px tall, four in a column (1,478 px for four numbers), heavy black glow (`extra-mobile-counters.png`).
- W-25 Mobile slider pagination: 18 bullets wrap into two rows above the testimonials (`extra-mobile-testimonials.png`, `sections/mobile-07.png`).
- W-26 Tap targets: hamburger 30×28 px, menu links 27 px tall, footer icons 40 px, swiper bullets 20×8 px, GoTop 40×42 px; harness counts 25–28 small targets on home, 38–41 on team (`data.json → layout.smallTapTargets`).
- W-27 Mobile menu: `aria-expanded` is hard-coded `"false"` and stays false when open (`Navbar.js:54`; live `extra-checks.json → mobile.menu.ariaExpanded`); the open panel has a transparent background inside the black bar and no close affordance other than the icon (`extra-mobile-menu-open.png`).

**Accessibility**
- W-28 `<html lang="zxx">` ("no linguistic content") on every page (`pages/_document.js:11`; `data.json → lang`).
- W-29 Heading structure: H1 only on home; inner page titles are H2; home has 76 headings including 20 duplicated H2/H3 pairs from the slider and H2s that are numbers ("50+"); H1→H3 skips on home and 404 (`data.json → headings, a11y.headingSkips`).
- W-30 Contrast (WCAG AA 4.5:1 for normal text, 3:1 large): nav links white on gradient **2.40–2.51**; breadcrumb link white on gradient 2.4; eyebrows white on white **1.00** and white on amber **1.77**; "About Us" eyebrow amber on white **1.96**; services icon glyphs 2.26 (non-text); 404 H3 red on white 4.0 (passes as large text). Body text passes (8.45, 16.1). Harness also lists testimonial name/role at 1.81 against the grey card, but those elements are positioned below the card on white (8.45) — a false positive worth noting. Computation in this session (`node` contrast script, values above).
- W-31 Focus: `button { outline: 0 !important }` (`style.scss:115-123`), `.accordion__button:focus { outline: 0 }` (`:3563`), `.form-control:focus { box-shadow: unset; outline: 0 }` (`:178-184`) — keyboard users lose focus indication on buttons, accordion headers and inputs (`data.json → a11y.focusOutlineRemoved: true`).
- W-32 Names: all 48 images use `alt="Image"` or `alt="img"`; footer logo has no alt; 3 footer icon links have no text or `aria-label` (`links.emptyText: 3`); GoTop is a `<div onClick>` with no role/tabindex/label (`GoTop.js:42`); no `<main>` or `<header>` landmark, no skip link (`a11y.landmarks`).
- W-33 Forms: inputs rely on placeholders only (`ContactForm.js:65-72`, `AskQuestionForm.js:12-19`); the harness's label heuristic counts placeholders, so it reports 0 unlabeled — visually and for screen readers there are no persistent labels.

---

## 5. Technical SEO check

| Check | Result | Evidence |
|---|---|---|
| Title | "eComet" on every page (global, `pages/_app.js:27`); no page overrides | all `data.json → title` |
| Meta description / OG / Twitter / robots meta / theme-color | none on any page | `data.json → meta` (all null); curl head |
| Canonical | none; with the 301 pattern, `/about-1/` and `/about-1` and `/projects/Halyard/` vs `/projects/halyard` are unstated duplicates | `data.json → canonical: null` |
| H1 | 1 on home; 0 on all inner pages; "4 0 4" on 404 | §1 |
| Structured data | none (no Organization, LocalBusiness, Service, FAQPage, BreadcrumbList) | `jsonLd: []` |
| `lang` | `zxx` | `_document.js:11` |
| robots.txt / sitemap.xml | 404 / 404 | curl |
| Indexability blockers | none technical (no noindex, no auth), but orphan pages and duplicate URL forms dilute; 20 project pages share one title and one H2 | §1 |
| Redirect chains | 1 hop on every nav link (trailing slash), 1 hop + case change on project links; http→https 1 hop; www→apex 2 hops | curl, crawl JSON |
| Images | 0 `next/image`, 0 lazy, 0 dimensions, no WebP/AVIF, 3.92 MB on home; oversized list in `home/data.json → images.oversized` (12× 2048² at 415 px; Halyard 1.45 MB) | `data.json` |
| Fonts | 2 render-blocking Google CSS requests, 105 `@font-face`, 15 weights requested / 6 used, no preconnect, `optimizeFonts:false` | §4 W-20 |
| JS | 27 script requests, ~121 KB brotli on home (framework 43 KB, main 25 KB, Swiper chunk 24 KB, index 6 KB, _app 5 KB) — modest | `evidence/a1-network-summary.txt` |
| CSS | 1 sheet, 474 KB raw / 61 KB brotli, 4,398 rules, 119 keyframes | `evidence/live-main.css` |
| Hosting | Netlify edge, Brotli, HSTS; HTML `max-age=0, must-revalidate`; static `_next` assets | headers |
| Perf (indicative, single runs under load) | Home desktop (Lead's first run): TTFB 2.25 s, FCP 3.8 s, LCP 4.6 s (LCP = `section.main-banner-area` CSS gradient), CLS 0.04, 86 req, 4.3 MB. Home mobile (batch): TTFB 1.7 s, FCP 3.46 s, LCP 4.27 s, CLS 0.003, 80 req, 4.25 MB. About desktop LCP 4.9 s (`about-img.png`); services 3.8 s; service-details 3.8 s; contact 3.4 s; team 4.2 s; testimonials 3.1 s; Beauty Smile 3.8 s (1.0 MB); Halyard **5.8 s, CLS 0.055** (2.2 MB); 404 2.5 s. A contended batch run of home logged FCP 28 s because both Google Fonts requests failed mid-capture — discard that value. | `evidence/a1-page-summary.txt` |
| Lighthouse | not run by me (Lead instruction) | — |

**AI-search / entity visibility**
- Services on their own URLs: **no**. `/services-4` lists 8 slogans; the actual offer (Shopify pre/post-sales support, GoHighLevel, Zapier/Make/n8n automation, email marketing, Meta ads, virtual assistants, web development) is never stated as a service with a definition, deliverables, or price anywhere on the site.
- FAQs: 5 on home (`Faq.js`), no FAQPage schema, none on services.
- Structured data: none.
- Business entity consistency: name appears as "eComet", "eComet Technologies" (footer SVG), "Team eComet" (unused TeamTwo), LinkedIn slug "ecomet-technologies"; address only "F-Block, Street #9, Vehari" + "Pakistan"; phone shown "(92)-302-692003-4" vs `tel:03026820034`; email `hr@`; founders/team not on any live page; markets (USA/Canada/Europe) not stated; team size not stated; no legal pages; no NAP in footer; no `Organization` schema, no sameAs.

---

## 6. FLAG-ONLY register (evidence, no fixes)

| ID | Item | Source evidence | Live evidence |
|---|---|---|---|
| F-01 | **Case studies credited to "Stackworx"** on 11 of 20 project pages: Zentap (`CaseStudiesDetailsContent4.js:22`), Green Top Farms (`…5.js:25,35,42,48` "we are proud to partner with Stackworx"), Ideawake (`6.js:20`), pHin (`7.js:20,42`), Ezyagent (`8.js:22,41`), Mega Stores (`9.js:22`), Puppy Wash (`10.js:22,46`), Timbits (`11.js:25,43`), Fantasy Middleware (`12.js:20,40`), Leichtwerk/Drone (`13.js:22,35,43,53`), Workstool (`14.js:22,45`). | grep output (this session); mapping `pages/projects/*.js` → content file | Home crawl shows 0 mentions on `/` (slider blurbs only); the project pages themselves were not all captured — Halyard (Content1) and Beauty Smile (Content18) are Stackworx-free. UNVERIFIED live for the 11 pages, CONFIRMED in deployed source. |
| F-02 | **Placeholder testimonials**: `/testimonials` = 9 lorem-ipsum quotes with invented names (`TestimonialsContent.js:6-229`); home slider names "Lexi Ehrman – Head of Technology", "Oscar Adams – InnovateTech Ventures", "Logan Smith – TechCorp Solutions", "Alexander Nouveau – nouveaustartups.com" with stock headshots `client1–4.jpg`, `1.jpg` (`Common/Testimonials.js:5-133`); quote "Seller was nice, direct, and easy to work with" reads like a marketplace review. `nouveaustartups.com` did not respond (UNVERIFIED). | source lines | `testimonials/sections/desktop-03.png`, `home/sections/desktop-10.png` |
| F-03 | **Unverified stats**: "50+ Project Completed", "70k+ Hours", "60+ Happy Clients", "30+ Rescue Mission" (`MakeYourBusiness.js:48-92`), repeated on home, about, services. No source, and "Rescue Mission" is undefined. | source | `home-v2/sections/desktop-07.png` |
| F-04 | **Phone mismatch**: displayed `(92)-302-692003-4`, link `tel:03026820034` (`ContactInfo.js:27`). Template numbers still live: `+800 603 6035` (`ServiceSidebar.js:42`, live on `/service-details`); commented: `+882-569-756` (`Footer.js:166`), `(124) 1523-567-9874` (`ContactInfo.js:30`). | source | `contact/sections/desktop-03.png`, `service-details/sections/desktop-03.png` |
| F-05 | **Emails**: live `hr@teamecomet.com` (footer + contact); live template `hello@jumpx.com` (`ServiceSidebar.js:46`); commented `info@jumpx.com` (`ContactInfo.js:17`), `hello@jumpx.com` (`Footer.js:172`); API `exampleyour@gmail.com` (`pages/api/contact.js:20`). | source | as above |
| F-06 | **Addresses**: live "F-Block, Street #9, Vehari" (`ContactInfo.js:39`); live template "123, Western Road, Australia" (`ServiceSidebar.js:50`); commented "123, Western Road, Melbourne Australia" (`Footer.js:178`). | source | as above |
| F-07 | **Lorem ipsum live**: `/service-details` (`ServiceDetailsContent.js:20-45`), `/testimonials` (×9). Lorem in unused components: `AboutOne/About.js:23`, `Common/Team.js:115`, `Faq/FaqContent.js:28-101`, `Services/WhatWeOffer.js:29-296`, `Footer.js:23` (commented). | grep | screenshots above |
| F-08 | **Template services/content left in**: "Service Of Warehousing" + car-detailing list; "Mindful Productivity Coach", "Conscious Consumer Guide", "Optimized Performance" (`Services.js:38-66`); cybersecurity/eco-friendly items (`MakeYourBusiness.js:17-27`); commented footer service list "Big Data, UI/UX Design, Desktop Application, Mobile Application, Product Engineering, Machine Learning" (`Footer.js:61-98`). | source | `home-v2/sections/desktop-06.png` |
| F-09 | **Template author references**: `package.json:11 "author": "EnvyTheme.com"`; `utils/baseUrl.js:2 'https://jumpx-react.envytheme.com'` (used by unused `ContactFormStyleTwo.js`); `Footer.js:198,219-221` "Jumpx… Designed By EnvyTheme" (commented); `style.scss:2,816,3807,3832` "Jumpx". | source | not visible live |
| F-10 | **Template image names/folders**: `public/images/offer.png, offer1–4.png, offer46666.png`, `choose-img.png/choose-imgs.png`, `about-img-three.png`, `faq-img11.png`, `main-img123.png`, `shape23.png`, `cta-bg.jpg`, `newsletter-img.png`; unused template sets `home-two/` (580 KB), `home-three/` (2.26 MB), `home-four/`, `home-five/` (724 KB), `blog/` (3.0 MB), `blog-details/`, `brands/`; client screenshots stored under person names `services-details/Luke/` (used for Beauty Smile), `Ben/`, `Jarrod/`, `Althea/`. `public/images` = 28 MB, 198 files. | `du`/`ls` this session | — |
| F-11 | **Template placeholder people live**: `/team` Karen Peter et al. with 404 images (`TeamCard.js`); real team in `TeamTwo.js` disabled (`about-1.js:31`). | source | `team/sections/desktop-03.png` |
| F-12 | **Mixed brand names**: "eComet" (title/copy), "eComet Technologies" (footer SVG), "Team eComet" (`TeamTwo.js:206`), LinkedIn `ecomet-technologies`. | source | `sections/desktop-12.png` |
| F-13 | **Dead social links**: `Footer.js:270` `href="#"`; `TeamCard.js` bare network roots; `Partner*.js` all `href="#"`; Upwork agency link commented (`Footer.js:249`). | source | — |
| F-14 | **Project facts wrong**: "Industry: IT" for Beauty Smile (dental cosmetics) and Halyard (medical supplies) (`Content18.js:64`, `Content1.js:55`); Halyard copy in the client's first person (`Content1.js:20`); Beauty Smile uses `/images/services-details/Luke/Luke2.png`. | source | `beautysmile/sections/desktop-03.png`, `halyard/sections/desktop-03.png` |
| F-15 | **Client sites dead or moved**: fantasy-middleware.herokuapp.com 404; fellon.de parked at Sedo; havoc-parts.com → havoc-motorcycles. | curl | `evidence/a1-extlinks-retry.txt` |
| F-16 | **Duplicated components**: `Services/WhatWeOffer.js` vs `HomeOne/WhatWeOffer.js`; `Common/Team.js` vs `Team/TeamCard.js` vs `Common/TeamTwo.js`; `Partner.js`/`PartnerSlider.js`/`PartnerSliderTwo.js`; `ContactForm.js` vs `ContactFormStyleTwo.js`; `Faq/AskQuestionForm.js` vs `ServiceDetails/AskQuestionForm.js`; 20 near-identical `CaseStudiesDetailsContentN.js` files; `Common/Testimonials.js` vs `Testimonials/TestimonialsContent.js`. | `ls components/**` | — |
| F-17 | **Template route naming live**: `/about-1`, `/services-4`; nav comment block still lists "Services Style One…Four" (`Navbar.js:95-150`). | source | crawl JSON |
| F-18 | **Deployed erroring API**: `/api/contact/` → 500 with placeholder SendGrid key. | `pages/api/contact.js:7` | curl 500 |
| F-19 | **Typos/format**: "FAQ,s" (`Faq.js:16`); "Wed Developer" (`TeamCard.js:157`); "Congratulations!!" success copy (`ContactForm.js:22`); phone format "(92)-302-692003-4". | source | `home/sections/desktop-11.png` |
| F-20 | **AOS once:false + harness artefact** (see W-08) — recorded here as requested by the Lead. | `pages/_app.js:21` | `extra-checks.json`, `extra-services-after-scrollback.png` |

---

## 7. Screenshot index (files I looked at)

| Path (under `evidence/`) | Page | Viewport | Shows |
|---|---|---|---|
| `teamecomet-home/desktop-hero.png` | Home | desktop 1440 | Hero, old logo, transparent nav; Arial fallback because Google Fonts failed in that run |
| `teamecomet-home/extra-hero-t0.png` | Home | desktop | Hero at load (my capture) |
| `teamecomet-home/extra-hero-t2500.png` | Home | desktop | Hero after 2.5 s, Dosis loaded, shapes settled |
| `teamecomet-home/extra-header-sticky-400.png` | Home | desktop | Sticky black nav with orange links at 400 px scroll; feature cards |
| `teamecomet-home/extra-services-after-scrollback.png` | Home | desktop | Services section with cards hidden by AOS after scrolling back up |
| `teamecomet-home/extra-tabs-tab2.png` | Home | desktop | What-we-offer tab 2 active |
| `teamecomet-home/extra-mobile-hero-fold.png` | Home | mobile 390 | First screen: black bar, hero, CTAs at y≈398 |
| `teamecomet-home/extra-mobile-menu-open.png` | Home | mobile | Open hamburger menu |
| `teamecomet-home/extra-mobile-testimonials.png` | Home | mobile | Grey testimonial card, two rows of bullets above |
| `teamecomet-home/extra-mobile-counters.png` | Home | mobile | Stacked amber counter tiles |
| `teamecomet-home/sections/desktop-04.png`, `desktop-05.png` | Home | desktop | v1 blank (AOS artefact) |
| `teamecomet-home/sections/desktop-07.png` | Home | desktop | v1: left copy visible, counters blank (AOS) |
| `teamecomet-home/sections/desktop-08.png` | Home | desktop | Tabs section |
| `teamecomet-home/sections/desktop-09.png` | Home | desktop | Projects slider, 18 bullets |
| `teamecomet-home/sections/desktop-10.png` | Home | desktop | Testimonials slider |
| `teamecomet-home/sections/desktop-11.png` | Home | desktop | FAQ |
| `teamecomet-home/sections/desktop-12.png` | Home | desktop | Footer |
| `teamecomet-home/sections/mobile-06.png` | Home | mobile | Tabs stacked |
| `teamecomet-home/sections/mobile-07.png` | Home | mobile | Projects slider |
| `teamecomet-home/sections/mobile-10.png` | Home | mobile | Footer |
| `teamecomet-home-v2/sections/desktop-04.png` | Home | desktop | Features cards (AOS forced) |
| `teamecomet-home-v2/sections/desktop-06.png` | Home | desktop | Services cards on amber |
| `teamecomet-home-v2/sections/desktop-07.png` | Home | desktop | Business copy + counters |
| `teamecomet-about-v2/sections/desktop-03.png` | About | desktop | About block |
| `teamecomet-about-v2/sections/desktop-04.png` | About | desktop | Counters |
| `teamecomet-about/sections/mobile-01.png` | About | mobile | Page-title banner |
| `teamecomet-contact/sections/desktop-01.png` | Contact | desktop | Page-title banner with nav |
| `teamecomet-contact/sections/desktop-03.png` | Contact | desktop | Info cards |
| `teamecomet-contact/sections/desktop-04.png` | Contact | desktop | Form + illustration |
| `teamecomet-contact/sections/mobile-02.png` | Contact | mobile | Info cards stacked |
| `teamecomet-contact/sections/mobile-03.png` | Contact | mobile | Form |
| `teamecomet-services/sections/desktop-03.png` | Services | desktop | 8 service pills |
| `teamecomet-services/sections/mobile-02.png` | Services | mobile | Pills stacked |
| `teamecomet-services/sections/mobile-03.png` | Services | mobile | v1 business section, counters blank |
| `teamecomet-services-v2/sections/desktop-04.png` | Services | desktop | Counters |
| `teamecomet-service-details/sections/desktop-03.png` | Service details | desktop | Lorem template page with sidebar |
| `teamecomet-testimonials/sections/desktop-03.png` | Testimonials | desktop | 9 lorem cards, 2 broken images |
| `teamecomet-testimonials/sections/mobile-02.png` | Testimonials | mobile | Same, stacked |
| `teamecomet-team/sections/desktop-03.png` | Team | desktop | Placeholder team, broken images |
| `teamecomet-team/sections/mobile-02.png` | Team | mobile | Two cards then blank (AOS) |
| `teamecomet-project-beautysmile/sections/desktop-03.png` | Beauty Smile | desktop | Case body |
| `teamecomet-project-beautysmile/sections/desktop-04.png` | Beauty Smile | desktop | CTA band |
| `teamecomet-project-halyard/sections/desktop-03.png` | Halyard | desktop | Case body |
| `teamecomet-project-halyard/sections/mobile-02.png` | Halyard | mobile | Case body |
| `teamecomet-404/sections/desktop-01.png` | 404 | desktop | Error page |
| `teamecomet-404/sections/mobile-01.png` | 404 | mobile | Error page |

Data files referenced: `evidence/teamecomet-*/data.json` (10 pages), `evidence/teamecomet-*-v2/data.json` (5), `evidence/teamecomet-home/extra-checks.json`, `evidence/crawl-teamecomet.com.json`, `evidence/a1-analysis.txt`, `evidence/a1-page-summary.txt`, `evidence/a1-network-summary.txt`, `evidence/a1-extlinks-retry.txt`, `evidence/live-main.css`, `evidence/gf-opensans.css`, `evidence/gf-dosis.css`. Scripts: `harness/a1-analyse.js`, `harness/a1-home-checks.js`.
