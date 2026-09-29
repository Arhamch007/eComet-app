# Agent 5 — Conversion, SEO and Trust Critic: eComet (teamecomet.com) vs Group A references

Date: 2026-09-29. Read-only audit. Scope: trust signals, CTA/booking strategy, case-study structure, content structure for Google/AI search, flagged issues, prioritised list. No redesign, no final copy.

Evidence tags: **CONFIRMED** = seen in a harness screenshot / data.json, fetched page text, raw HTML, or eComet source (file:line named). **UNVERIFIED** = inferred or from a search snippet not opened.

Evidence root (scratchpad): `evidence/<slug>/data.json`, `evidence/<slug>/sections/desktop-NN.png`, `evidence/crawl-teamecomet.com.json`. Source root: `D:\ecomt\eComet-app`.

Notes on coverage:
- All eComet pages loaded (home, /about-1, /services-4, /service-details, /contact, /team, /testimonials, /projects/Halyard, /projects/Ezyagent, /projects/Zentap, /projects/Lively, 404). `/about` and `/services` return 404 (the real paths are `/about-1` and `/services-4`).
- Reference homepages loaded for all ten sites. Deep pages loaded: Stackworx /case-studies and /contact; Arbisoft /case-studies, /case-studies/kayak, /contact; Appinventiv /portfolio/, /portfolio/kfc-food-delivery-app/, /contact-us/; Arhamsoft /contact-us. Arhamsoft /case-studies and Stackworx /case-studies/timbits returned 404 (Stackworx has no individual case-study pages; see C).
- Harness data.json for Stackworx and Arhamsoft appeared late; both used. Dixor, Wevetech, Mau5tech, Zeynapp, Faheem Naveed are JS-rendered and were read from harness data.json (WebFetch returned only their `<title>`).

---

## A. Trust-signal matrix

Legend: **P** = present (CONFIRMED), **p** = partial, **–** = absent (CONFIRMED absent on the page(s) loaded), **?** = could not be verified, **F** = present but fake/placeholder (worse than absent).

| Trust element | Stackworx | Faheem N. | Arhamsoft | Arbisoft | Appinventiv | Studiova (template) | Dixor (template) | Wevetech | Mau5tech | Zeynapp | **eComet** |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Client logos | **P** 21 distinct logo alts incl. zentap, ezyagent, mega-store, timhortons (raw HTML alt list; a-stackworx/sections/desktop-02.png) | p Play Store links to 6 shipped apps act as proof (a-faheemnaveed data.json external links) | **P** Salesforce/Odoo/Zoho/HubSpot/Stripe/Microsoft/Oracle "Trusted Partners" (fetched text; a-arhamsoft sections/desktop-02.png) | **P** Careem, edX, KAYAK, World Bank, MIT, Indeed grid (fetched text; a-arbisoft sections/desktop-11.png) | **P** 25+ logos "Trusted by the Disruptors and Fortune 500s" (a-appinventiv data.json headings; sections/desktop-11.png) | F template logos "320 trusted partners" (fetched text) | F "Worked with largest brands" template (a-dixor headings) | p "Trusted by Industry Leaders" band, unverified (a-wevetech headings) | – | – | **–** No logo band anywhere (teamecomet-home data.json sections; `pages/index.js`). `components/Common/Partner.js` exists but is commented out in `pages/about-1.js:34-36` |
| Named testimonials with photo + role + company | **P** 7 quotes, name + company, "Verified Upwork" label (fetched text; raw HTML "Upwork" ×7) | – (no testimonials section; a-faheemnaveed headings) | – (no attributed quotes on home; "Reviews" carousel section exists, a-arhamsoft sections/desktop-10.png, content not verified) | **P** 4 quotes with name, title, company (Ed Zarecor/edX, Paul English/KAYAK…) (fetched text; a-arbisoft headings "In The Words of Those We Build With") | **P** 3 C-suite quotes with name/title/company (fetched text; sections/desktop-10.png) | F template (Wade Warren/Bank of America, Albert Flores/MasterCard) | F template names | p 3 names without companies (Sarah Chen, Michael Torres, Emily Watson) (a-wevetech headings) | – | – | **F/p** Home + About: 5 quotes with name + role/company but stock photos `/images/clients/client1-4.jpg` (`components/Common/Testimonials.js:7,33,58,83`); 4 of 5 are also on stackworx.co with the company name swapped (see E). /testimonials page: 9 Lorem-ipsum quotes with template names (`components/Testimonials/TestimonialsContent.js:6-9`; teamecomet-testimonials data.json headings "Alen Meair, Axon Detos…") |
| Video testimonials / reel | – | – | – | – | p "WATCH REEL" CTA in testimonials section (a-appinventiv sections/desktop-10.png ctas) | – | – | – | – | – | **–** |
| Case studies with problem → solution → result + numbers | p Cards with headline metrics ("18.5M+ transactions", "20,000+ agents"); listing page only, no individual pages (raw HTML hrefs of /case-studies contain no child routes) | p Project cards with screenshots and live Play Store/URL links; no metrics per project | p "Success stories" cards, "Read case study" CTA (a-arhamsoft buttons); /case-studies 404 when fetched | **P** Listing with metric per card ("crawl time 168→4 hours", "15% user base growth in 30 days"); KAYAK page: At a glance → Key contributions → Impact metrics → Process → Social proof → CTA + "Download Case Study" (fetched text) | **P** 12 cards with 2 metrics each; KFC page has 16 sections incl. Challenge, Solution, Results, Tech stack, Testimonials, Related case studies (fetched text) | F 6 template projects, no metrics | F | p "Our portfolio" section, no metrics | – | p "Featured work" 4 tiles, no metrics (a-zeynapp headings) | **–** 20 project pages = hero image + 2–3 paragraphs + Client/Technologies/Industry/URL list + generic CTA; no challenge, solution, result, metric or testimonial (`components/CaseStudiesDetails/CaseStudiesDetailsContent1.js:18-66`; teamecomet-project-halyard data.json headings: H2 "Project Details", H3 "Halyard", H3 "Are You Ready? Let's get to work!") |
| Verifiable stats | p "32M+ transactions, 20K+ agents, 6+ partnerships, 10+ years" tied to named clients (fetched /case-studies text) | **P** Stats tied to public proof ("6+ apps live on the Play Store, 1,500+ users" + store links) (a-faheemnaveed meta description + links) | – (no company stats on home) | **P** "Since 2007", 750+ experts, 550+ collaborations, $1B+/500M+ (a-arbisoft headings H3 "$1B+", "500M+") | **P** 10+ years, 1700+ specialists, 3000+ solutions, 150+ AI models (fetched text) | F 40K+/238+/3M+ template | F | – | – | – | **p/unverified** "50+ Project Completed, 70k+ Hours, 60+ Happy Clients, 30+ Rescue Mission" (`components/Common/MakeYourBusiness.js:47-92`) shown on home, about, services (data.json headings H2 "50+","70k+","60+","30+"). Nothing on site substantiates them; "Rescue Mission" is undefined |
| Certifications / partner badges (Shopify, Meta, Klaviyo, GHL, Make/n8n/Zapier, ISO, Clutch) | – (no badges; only client logos) | – (skills named, no badges) | **P** ISO badges, Inc., PSEB, PASHA, Payoneer, Clutch 5.0 (fetched text; a-arhamsoft sections/desktop-11.png "Our Achievements") | **P** 15 awards + 12 certifications (ISO 27701, AWS Partner, Salesforce Partner, Databricks, GoodFirms) (fetched text; a-arbisoft sections/desktop-16.png) | **P** OpenAI Select Partner, Claude Preferred Services Partner, AWS/GCP/Azure/HubSpot alliances, Deloitte/ET awards (a-appinventiv headings "Strategic Alliances", "Proven Expertise. Globally Accredited.") | – | F "Behance Awards / Design Awards" template | – | – | p Awwwards badge link (a-zeynapp external link awwwards.com/sites/zeynapp) | **–** None. No Shopify Partner, Meta Business Partner, Klaviyo, GoHighLevel, Make/n8n/Zapier badge anywhere (home/services data.json; source) |
| Team page with real people | **P** 7 named people with roles, photo alts match names (raw HTML alts "Farooq Ch", "Syed Ghani"…; a-stackworx sections/desktop-10.png) | **P** single-founder bio section "Faheem Naveed" (a-faheemnaveed sections/desktop-14.png) | – on home (no team section) | p Leadership page linked (/about/leadership) — not verified | p "Core Team" link in footer — not verified | F template names | F template names | – | – | ? /about not fetched | **F** /team lists 8 template names ("Karen Peter", "Alex Piter", "Zeet Pew — Wed Developer", "Peter Jack" twice), template portraits `/images/team/team1-8.png`, social links to facebook.com/ root (`components/Team/TeamCard.js:3-204`; teamecomet-team data.json headings). Page is live (HTTP 200) but not in nav |
| Process transparency | **P** 4 steps "Discover → Map → Build and Integrate → Support and Improve" (raw HTML alts; a-stackworx sections/desktop-09.png) | p FAQ "How do we get started?" (a-faheemnaveed FAQ ctas) | – | **P** 3-step "Discovery Call → Expert Input → Proposal" ("From Introduction to Proposal in Days") (a-arbisoft sections/desktop-13.png) | p process shown inside case study, not on home | – | – | p FAQ "What is your development process?" | **P** "Understand → Build → Test → Launch" (a-mau5tech headings; sections/desktop-05.png) | p "How we work" nav page (not fetched) | **–** No process section on any page (data.json sections for home/about/services) |
| Pricing transparency | – | p FAQ "How do payments and milestones work?" | p engagement models ("Fixed Cost Resource Hiring") | p budget-range selector in form (<$50K … >$500K) | p budget dropdown in form ("Still Evaluating, <$50K…") | **P** 3 monthly tiers $699/$1,699/$3,499 (template values) | – | p FAQ "How do you handle project pricing?" | – | – | **–** Footer "Pricing" link commented out (`components/Layouts/Footer.js:126-130`); `/pricing` returns 404 (curl) |
| Guarantees / SLA / response promise | – (none stated; /contact fetched) | – | – | p "Zero obligation" mutual NDA before discovery call (fetched /contact) | **P** "In just 2 mins you will get a response", "100% protected by our NDA" (fetched /contact-us) | – | – | – | – | – | **–** Only "…will be back to you soon" after submit (`components/Contact/ContactForm.js:34`) |
| Third-party reviews (Clutch, Google, Trustpilot, Upwork) | p "Verified Upwork" labels on quotes (no link to profile seen) | – | **P** Clutch 5.0 badge (fetched text) | **P** Clutch 4.9 + Best of Clutch 2025 + GoodFirms (fetched text) | **P** Clutch 4.7 badge on contact page (fetched text) | – | F "4.9" template rating | – | – | p Awwwards (award, not review) | **–** Upwork agency link exists but is commented out (`components/Layouts/Footer.js:248-254`) |
| Locations / time zones / market coverage | p one office, Lahore PK, phone +92 (a-stackworx links tel:+923347188223; sections/desktop-13.png "Pakistan") | p WhatsApp +92; FAQ "How do you handle communication and time zones?" | **P** NY / Lahore / Sharjah offices, US/PK/UAE phones, WhatsApp wa.me/19296340281 (fetched /contact-us; a-arhamsoft links) | **P** 7 offices (Plano, Berlin, Riyadh, Doha, Karachi, Lahore, Islamabad) with phones, in JSON-LD PostalAddress[] (a-arbisoft data.json jsonLd) | **P** offices + per-country phones (US, UK, AU, UAE, IN) each as PostalAddress JSON-LD (a-appinventiv jsonLd) | p template phone +1-212 | – | – | – | **P** Cambridge UK address + phone in JSON-LD (a-zeynapp jsonLd) | **p** Single line "Pakistan — F-Block, Street #9, Vehari" (`components/Contact/ContactInfo.js:38-39`; teamecomet-contact/sections/desktop-03.png). Nothing about USA/Canada/Europe clients, time-zone coverage or working hours |
| Security / privacy / NDA | p FAQ "How do you ensure data security and confidentiality?", Privacy Policy + Terms links (a-stackworx buttons; fetched text) | – | p NDA-style file upload + ISO badges | **P** ISO 27701, Security Policy, Cookie Policy, NDA note (fetched text) | **P** Compliance section (GDPR, HIPAA, ISO 27001, SOC 2…) + NDA (a-appinventiv headings) | p Privacy/Terms template links | – | – | – | ? | **–** No privacy policy or terms page; links commented out (`components/Layouts/Footer.js:205-210`); form posts to third-party Formspree with no consent note (`components/Contact/ContactForm.js:4`) |
| Header CTA button | **P** "Book a Free Consultation" (a-stackworx/desktop-hero.png) | **P** "Contact" pill (a-faheemnaveed buttons) | p hero CTA only | – ("See how we work" in hero) | **P** "Contact Us" with call icon (a-appinventiv buttons href /contact/) | p Sign In/Sign Up (template) | – | – | – | – | **–** Nav has Home/About/Services/Contact links only (`components/Layouts/Navbar.js:63-163`) |
| Organization schema / meta description / sitemap | p Organization + WebSite JSON-LD present but URLs point to localhost; canonical `http://localhost:3000/` (a-stackworx data.json) — flaw, do not copy | – schema; meta description yes | **P** Organization graph with foundingDate, address, contactPoint; canonical; meta description; sitemap 200 (a-arhamsoft data.json) | **P** Organization with 5 PostalAddress + awards; meta robots; OG; robots+sitemap 200 | **P** PostalAddress ×5 with telephone; meta; robots+sitemap 200 | – | – | meta description yes; sitemap 404 | meta description yes; robots/sitemap 404 | **P** Organization + WebSite (inLanguage en-GB), contactPoint, OG, robots+sitemap 200 | **–** Title "eComet" on every page (`pages/_app.js:27`; every teamecomet-* data.json title), no meta description, no canonical, no OG, no JSON-LD, robots.txt 404, sitemap.xml 404 (curl), `<html lang="zxx">` (`pages/_document.js:12`) |

### What eComet lacks that 3 or more references have (CONFIRMED)

1. **Client logo band** — Stackworx, Arhamsoft, Arbisoft, Appinventiv (+ Wevetech partial).
2. **Testimonials with role + company + a verification hook** (Upwork/Clutch label or link) — Stackworx, Arbisoft, Appinventiv.
3. **Case studies with an outcome metric on the card and a challenge/solution/result body** — Arbisoft, Appinventiv, Stackworx (cards), Faheem (live product links).
4. **Third-party review/award badges** (Clutch, GoodFirms, Upwork, Awwwards) — Arhamsoft, Arbisoft, Appinventiv, Stackworx, Zeynapp.
5. **Certification / platform-partner badges** — Arhamsoft, Arbisoft, Appinventiv.
6. **Named process steps** — Stackworx, Arbisoft, Mau5tech.
7. **Real named team with roles** — Stackworx, Faheem (+ Arbisoft/Appinventiv via leadership pages).
8. **Per-market contact (phone per country, offices, time zones) and Organization/PostalAddress schema** — Arhamsoft, Arbisoft, Appinventiv, Zeynapp.
9. **Security/NDA/privacy statement near the form or in FAQ** — Stackworx, Arhamsoft, Arbisoft, Appinventiv.
10. **Persistent header CTA** — Stackworx, Faheem, Appinventiv.
11. **Meta description, canonical, robots.txt + sitemap.xml** — Arhamsoft, Arbisoft, Appinventiv, Zeynapp (+ meta description on Wevetech, Mau5tech, Faheem).
12. **A budget/scope qualifier in the lead form** — Arbisoft, Appinventiv, Arhamsoft (inquiry-type dropdown).

---

## B. CTA strategy comparison

### B1. Per site (CONFIRMED unless marked)

| Site | Header CTA (wording, style) | Hero CTA pair (primary / secondary) | CTA count on homepage | Mid-page CTA bands | Sticky / floating | Booking flow (fields, calendar, promise) | Footer CTA |
|---|---|---|---|---|---|---|---|
| **eComet** | None — plain nav links (`Navbar.js:63-163`) | "Learn More" → /about-1 and "Contact Us" → /contact; **both identical black buttons**, no visual hierarchy (`MainBanner.js:34-40`; teamecomet-home data.json buttons: both bg rgb(0,0,0)) | **3** (2 × "Learn More" to About, 1 × "Contact Us") — teamecomet-home data.json sections ctas; "Discover More"/"Know Details" buttons are commented out (`WhatWeOffer.js:139-143`, `MakeYourBusiness.js:31-35`) | None on home. The "So What is Next? / Are You Ready? Let's get to work!" band (`components/Common/CTA.js`) is used only on project pages | None (only a scroll-to-top button, `components/Shared/GoTop.js`); no chat, WhatsApp or call | Contact page only: 5 fields, **all required** incl. phone and subject (`ContactForm.js:65-148`), Formspree endpoint, submit "Send Message", success copy "Congratulations!!" with no next step (`ContactForm.js:22-35`). No calendar, no response-time promise, no hours. Home FAQ has no CTA (`Faq.js`) | None — footer is logo + tagline + 3 social icons + copyright (`Footer.js:228-276`) |
| **Stackworx** | "Book a Free Consultation", dark pill with green icon, right-aligned (a-stackworx/desktop-hero.png; buttons bg rgb(58,58,58)) | Primary "Book a Free Consultation" (dark) / secondary "View our work" (white, links to /services) | **5** — the same wording repeated in header, hero, after process, final band (data.json ctaTexts; fetched text "CTA Buttons – Total Count: 5") | Yes: after Process ("From Idea to Launch") and a final band headed "Give visitors one clear final action" (sections/desktop-09.png, desktop-12.png) | None | Contact: 3 fields (name, email, "more about the project") + optional attachment, submit "Submit Message" (fetched /contact). No calendar, no promise. Testimonials placed beside the form | Contact form + phone/email/address block sits above footer (sections/desktop-13.png) |
| **Faheem Naveed** | "Contact" pill → #contact (a-faheemnaveed buttons) | "Let's Work Together →" (black) / "See My Work" | 4 distinct texts: Contact, Let's Work Together, See My Work, Chat on WhatsApp (data.json ctaTexts) | FAQ ("Your Questions, Answered") then "Let's Connect" | WhatsApp deep link with pre-filled message (`wa.me/923187371655?text=Hi%20Faheem…`) — inline, not floating | No form; WhatsApp + mailto + LinkedIn/GitHub | "Have a project? Let's ship it together." block |
| **Arhamsoft** | No dedicated header button (hero carries CTA) | Three hero slides, each one CTA: "Create Your AI-Driven Product", "Create Your AI Agent", "Unlock AI Insights" + "Read case study" secondary (a-arhamsoft buttons) | **16+** (fetched text count; many "View details") | "Book AI Consultation", "Explore AI Services", newsletter | **WhatsApp link wa.me/19296340281**, phone and email links (fetched text; data.json external links) | Contact: inquiry-type dropdown (Hire team / Consultation / Proposal / Other), project details + file upload (10 MB), submit "Submit"; no calendar, no promise | Newsletter + office/phones by country |
| **Arbisoft** | No button; nav "Contact Us" | "See how we work" single hero CTA (fetched text) | **16** (fetched count) | "View case studies", "Read more" ×3, 3-step process band leading into form | None | Home + /contact form: website, country code, service dropdown (20+), **budget range**, NDA checkbox with "Zero obligation"; submit "Book a Free Call" / "Book a Free Discovery Call"; process "From Introduction to Proposal in Days" acts as the promise (a-arbisoft sections/desktop-13.png) | Offices ×7 + contact@ + legal links |
| **Appinventiv** | "Contact Us" with call icon, blue pill (a-appinventiv buttons href /contact/) | "Consult Our Strategy Team" single hero CTA | **14+** (fetched count) | "Schedule Free Consultations", "Book Your AI Advisory Session", "Discuss Your Technology Strategy" band before footer | Call button in header (fetched text) | Contact: name, work email, **budget dropdown**, phone, description (optional), file, NDA checkbox; **"In just 2 mins you will get a response"**; Clutch 4.7 + client logos beside form (fetched /contact-us) | Phones per country, links |
| **Studiova (template)** | Sign In / Sign Up + phone in header (template) | None in hero | 12 (fetched) | "Who we are", "See our Work", pricing "Subscribe now" ×3 | Header phone | Contact form "Submit message" + email + map link | "Get This Template" (template) |
| **Dixor (template)** | – | "Know More" | many template links | "Read More", "See Details" | – | – | – |
| **Wevetech** | – | "explore" (a-wevetech sections) | ~4 ("explore", "Learn more", "Get In Touch", "Subscribe") | FAQ → "Don't Think. Let's Talk." → "Get In Touch" | – | No tel/mailto found (data.json links) | Newsletter "Subscribe", "Let's Talk..." |
| **Mau5tech** | – | none captured (sections ctas empty) | ≤1 | Final band "Need something built fast and properly?" | – | mailto hello@mau5tech.com only | – |
| **Zeynapp** | "Menu" button (a-zeynapp buttons) | none | 1 ("MAKE IT REAL" final band) | Final band | – | tel + mailto in footer (data.json links) | Contact block |

### B2. Recommendations for eComet (structure, not copy)

Each item: what changes → expected effect.

1. **Add a persistent header CTA that names the outcome** (pattern: `[Book/Get] a free [consultation/audit]`, one wording reused everywhere as Stackworx does). Change: `Navbar.js` gets a right-aligned button distinct from nav links; the same wording is reused in hero, mid-page band and footer. Effect: a booking path is visible on every scroll position and every page (today only /contact offers one) → more contact starts per visit; consistent wording lowers decision friction.
2. **Give the hero a primary/secondary pair with hierarchy.** Change: primary = booking CTA (filled), secondary = "see work/case studies" (outline) pointing to a case-study index, replacing "Learn More → About" (`MainBanner.js:34-40`). Effect: visitors self-select between "ready to talk" and "need proof" instead of being sent to a vague About page; expected higher CTA click share to conversion pages.
3. **Add two mid-page CTA bands on the homepage**: one after the proof block (case studies/logos), one after FAQ (Stackworx: after process and at the end; Wevetech: FAQ → "Let's Talk"). Change: reuse `components/Common/CTA.js` on `pages/index.js`, `services-4.js`, `about-1.js` with the booking wording. Effect: users who scroll past proof get an action at the moment of highest trust; today the homepage has zero CTAs after the About section (teamecomet-home data.json sections 06–12 have no ctas except FAQ toggles).
4. **Frequency target**: 4–6 booking CTAs per long page (header, hero, post-proof band, post-FAQ band, footer) — matches Stackworx (5) without the 14–16 of enterprise sites. Effect: enough exposure without CTA fatigue.
5. **Booking flow**: keep one short form (name, email, what you need — dropdown of the 8 services, budget/engagement band optional, message) and make phone and subject optional (`ContactForm.js:100-131` currently required). Add a calendar embed (Calendly/Cal.com/HubSpot; none of the references use one, so this is a differentiator for USA/Canada/EU prospects in other time zones) and a stated response window plus "what happens next" 3 steps (Arbisoft's "Discovery Call → Expert Input → Proposal" pattern). Effect: fewer abandoned forms (fewer required fields), self-serve booking across time zones, and the promise replaces the dead-end "Congratulations!!" state.
6. **Add a floating contact affordance on mobile** (WhatsApp or "book a call") as Arhamsoft and Faheem do, with a pre-filled message. Effect: one-tap contact for mobile traffic; measurable via link clicks.
7. **Footer becomes a conversion + entity block**: nav links (Services, Case studies, Team, Testimonials, Contact), address, phone (one canonical number), email, hours/time-zone coverage, privacy/terms, Upwork/LinkedIn. Effect: every page ends with a path forward and consistent NAP data for Google; today the footer offers no links at all (`Footer.js:228-276`).
8. **Surface the Team and Testimonials pages in navigation only after their content is real** (see E). Effect: prevents the current situation where a curious visitor can reach a Lorem-ipsum testimonials page.

---

## C. Case-study structure

### C1. How references structure case studies (CONFIRMED)

| Site | Index/listing | Individual page sections (in order) | Metrics | Visuals | CTA |
|---|---|---|---|---|---|
| Appinventiv (`/portfolio/kfc-food-delivery-app/`) | Filters by Industry, Service, Region; each card: logo, 1–2 line summary, 2–3 metrics, "View Case Study" | Outcome headline → About client → Business challenge → App screenshots → Results highlights → Solution → Client testimonials → Process (4 phases) → Project challenges → Feature deep-dives → Tech stack → Results detail → Related case studies → CTA | 10 numbers (e.g., "22% conversion increase", "30,000+ daily orders") | 4 screens + feature visuals | Multiple: "Consult our experts", "Get In Touch", final "Kickstart Your Dream Project With Us" |
| Arbisoft (`/case-studies/kayak`) | Carousel cards: logo, description with metric, "View Case Study" | "At a Glance" table → Key contributions → The Impact (metrics) → Process ("From Introduction to Proposal in Days") → Social proof (partner logos) → CTA form | 8 numbers (18+ years, 70+ experts, 50M+ downloads, 4.5★/200K users…) | Hero image | "Tell Us About Your Project", "Book a Free Discovery Call", **"Download Case Study"** |
| Stackworx (`/case-studies`) | Single listing page: headline metrics (32M+ transactions, 20K+ agents…), featured project, 16 cards with one-line scope + metric where available, service tags (Web Apps / SaaS / Ecommerce), testimonials, one CTA | **No individual pages** (raw HTML of /case-studies has no `/case-studies/<slug>` links; /case-studies/timbits → 404) | Card-level only | Logo/tile per card | "Book a Free Consultation" |
| Faheem Naveed | "Products I've Helped Ship" (store links) + "Selected Works" 5 tiles with screenshots and live links | Single-page tiles (no deep pages) | Site-level ("6+ apps live, 1,500+ users") | Screenshots of GHL workflows/automations (`/images/ghl-workflow.png`, `auto-booking.png`) | WhatsApp / "Let's Work Together" |
| Studiova / Dixor | Template portfolio grids, `projects-detail.html` | Template | none | stock | template |

### C2. eComet today (CONFIRMED)

- Index: homepage Swiper "Our Recent Projects" with 20 cards; each card = image (alt "Image"), name, one sentence (`components/HomeThree/CaseStudies.js`). No dedicated `/projects` or `/case-studies` index page; no filters; no metrics; no service tags.
- Individual page (`pages/projects/Halyard.js` → `components/CaseStudiesDetails/CaseStudiesDetailsContent1.js`): breadcrumb banner rendered as **H2 "Project Details"** (`components/Common/PageBanner.js:15` — no H1 on any inner page), image, H3 client name, 3 paragraphs, then a checklist "Client / Technologies / Industry / URL", then the generic CTA band, footer. The Halyard body text is the client's own corporate boilerplate written in the client's first person ("Our $1.2 billion portfolio…", `CaseStudiesDetailsContent1.js:20`) and Industry is "IT" for a healthcare supplier (`:55`). No challenge, no what-eComet-did, no result, no quote, no related work, no service link.
- Title tag is "eComet" on every project page; Google rewrites them ("lively - eComet", "Ezyagent - eComet" seen in SERP; UNVERIFIED as SERP not opened).
- 11 of the 20 content files credit "Stackworx" as the team that built the project (see E1 for the full list); live pages confirmed for /projects/ezyagent and /projects/zentap.

### C3. Recommended structure for eComet case studies (structure only)

Index page `/case-studies/` (new): H1, one-line positioning, filter chips by service (AI automation, Web dev, Shopify support, Email marketing, Meta ads, GoHighLevel, VA) and by market (USA/Canada/Europe), then cards: client name or anonymised descriptor, service tag(s), **one headline metric or concrete deliverable**, thumbnail, link. Effect: Google gets a crawlable hub for 20 pages that are currently only linked from a slider; visitors can find proof for the specific service they want.

Individual page (per project; keep 20 only if each can be filled honestly, otherwise merge into fewer, deeper pages):
1. H1 = `[Client] — [outcome] with [service]` (not "Project Details").
2. "At a glance" strip: industry, market/country, services, tools/platforms (Shopify, Klaviyo, Make, n8n, GHL…), engagement length, eComet's exact role (build / support / ongoing).
3. Challenge (client's problem before eComet, 2–4 sentences or bullets).
4. What eComet did (solution, scoped to eComet's own role; if a partner was involved, say so explicitly).
5. Results: 2–3 numbers where they exist (orders processed, hours saved, response time, revenue uplift); if no numbers, use concrete deliverable counts (SKUs uploaded, workflows automated) rather than adjectives.
6. Visual proof: screenshots of the store/automation/dashboard (Faheem's workflow screenshots are the closest pattern for automation work).
7. Client quote with name, role, company, and where it can be verified (Upwork/Clutch/LinkedIn).
8. Tools & stack list (links to the matching service pages — internal linking).
9. Related case studies (same service) and a booking CTA band.
Optional: "Download PDF" (Arbisoft) for B2B buyers who forward to decision-makers.
Effect: each page becomes an answer to "what does eComet do for [service] in [market]", eligible for rich results (BreadcrumbList, Organization) and citable by AI search; conversion path from proof → service → booking.

### C4. FLAG — Stackworx attribution (evidence only)

- Source: 23 lines across 11 files credit "Stackworx"/"StackWorx"/"stackworx" as "our … team": `components/CaseStudiesDetails/CaseStudiesDetailsContent4.js:22` (Zentap), `Content5.js:25,35,42,48` (Green Top Farms), `Content6.js:20` (Ideawake), `Content7.js:20,42` (pHin), `Content8.js:22,41` (Ezyagent), `Content9.js:22` (Mega Stores), `Content10.js:22,46` (Puppy Wash), `Content11.js:25,43` (Timbits Sports), `Content12.js:20,40` (Fantasy Middleware), `Content13.js:22,35,43,53` (Drone / "Leichtwerk AG" card), `Content14.js:22,45` (Workstool). Page mapping from `pages/projects/*.js:4`.
- Live: `https://teamecomet.com/projects/ezyagent` contains "Developed by our Stackworx team…" and "…a prime example of the Stackworx team's expertise"; `https://teamecomet.com/projects/zentap` contains "…collaborative efforts of our expert Stackworx team" (curl, 2026-09-29). CONFIRMED.
- Cross-reference: stackworx.co lists Zentap, Mega Stores, Timbits and ezyagent among its own clients/case studies (fetched /case-studies text; raw HTML logo alts "zentap", "ezyagent", "mega-store"). Which company actually delivered the work is UNVERIFIED and outside this audit; the issue is that the eComet site currently tells visitors a different company built the work.

---

## D. Content structure for Google and AI search

Each item: current state (CONFIRMED) → what changes → what happens after.

### D1. Service taxonomy and URLs
- Current: one services page `/services-4` with 8 unlinked tiles (`components/Services/ServicesStyleFour.js` has no `Link` elements; teamecomet-services data.json links = only nav/footer). One template detail page `/service-details` ("Service Of Warehousing", Lorem ipsum, car-detailing bullets, `ServiceDetailsContent.js:20-77`). Homepage service tiles link nowhere (`HomeOne/Services.js:96` link commented out). Service names are abstract ("Crafted Mastery", "Mindful Productivity Coach", "Conscious Consumer Guide", "Administrative Excellence") and do not match how buyers search.
- Change: one page per real service under `/services/<slug>/` (ai-automation, web-development, shopify-support, email-marketing, meta-ads, gohighlevel, zapier-make-n8n-automation, virtual-assistants), each with: definition (what it is, 1 paragraph), who it is for, deliverables list, process steps, tools/platforms, pricing model (hourly / retainer / project, even without figures), 3–6 FAQs, 2–3 related case studies, team members who deliver it, booking CTA. `/services-4` becomes `/services/` hub; `/service-details` removed or redirected.
- After: each service can rank for its own query cluster (e.g., "Shopify support agency", "n8n automation agency") instead of one page competing for everything; AI engines get a clean entity→service→proof chain to cite; internal links from case studies raise service-page authority.

### D2. Entity clarity and schema
- Current: zero JSON-LD on every page (crawl json `jsonLd: 0`; all teamecomet-* data.json). Brand name inconsistent: site says "eComet", LinkedIn slug is "ecomet-technologies" (`Footer.js:242`), third-party profiles say "eComet Technologies" (ZoomInfo/RocketReach snippets, UNVERIFIED).
- Change: `Organization` (name, legalName, url, logo, sameAs [LinkedIn, Facebook, Upwork agency], address, contactPoint per market with `areaServed` US/CA/EU, foundingDate, numberOfEmployees) on every page via `_app.js`/`_document.js`; `WebSite`; `Service` on each service page (`provider` → Organization, `areaServed`, `serviceType`); `FAQPage` where FAQs render; `BreadcrumbList` on service and case-study pages; `Person` on team profiles (jobTitle, worksFor, sameAs LinkedIn); `CreativeWork`/`Article` for case studies. Use `LocalBusiness`/`ProfessionalService` only if a walk-in office is genuinely relevant; for a remote agency serving US/CA/EU, Organization + areaServed is the safer model (Arbisoft and Appinventiv model multiple PostalAddress entries — only add offices that exist).
- After: consistent entity for Knowledge Graph and AI answers; FAQ/Breadcrumb eligibility; fewer "who is eComet" ambiguities in AI search.

### D3. FAQ placement
- Current: 5 FAQs on the homepage only (`components/HomeThree/Faq.js`), generic ("What technologies do you use…"), label typo "FAQ,s" (`Faq.js:16`). `components/Faq/FaqContent.js` is Lorem ipsum and unused.
- Change: move service-specific FAQs to each service page (pricing model, timelines, tools, time zones, who owns accounts, support after launch — the questions Faheem/Wevetech/Stackworx ask), keep 3–4 company-level FAQs on home/contact (response time, markets served, how to start, NDA/security), mark up with FAQPage.
- After: long-tail question queries land on the relevant service page; AI answers can quote a specific Q/A; the contact page pre-answers objections before the form.

### D4. Internal linking pattern
- Current: nav = 4 links; footer = 0 links; services tiles unlinked; project pages link only to /contact; Team, Testimonials and Service-details pages are orphaned from navigation but live (HTTP 200) and indexable. Every internal link uses a trailing slash (`Navbar.js:76,87,155`, `CaseStudies.js` hrefs) while the host 301s to non-slash (`crawl-teamecomet.com.json`: `/about-1/` → 301 → `/about-1`; harness finalUrl without slash; `next.config.js` `trailingSlash: true` conflicts with Netlify's behaviour, server header "Netlify" in teamecomet-home data.json). Google indexes the non-slash version (SERP shows `https://teamecomet.com/services-4`, UNVERIFIED).
- Change: fix the slash policy once (either `trailingSlash: false` or a Netlify redirect rule that matches the config) so internal links resolve in one hop; add a self-referencing canonical per page; hub-and-spoke links: home → services hub → service page → case studies (same service) → service page; footer with all hubs; case-study index in nav; breadcrumbs.
- After: crawl budget stops being spent on 301 hops; link equity flows to service pages; orphan pages either become reachable or are noindexed/removed.

### D5. E-E-A-T signals
- Current: no real people (template team), no bios, no author, no credentials, no client-verifiable names except "David Ko, CEO – Drganja.com" and "Alexander Nouveau, CEO – nouveaustartups.com" (`Testimonials.js:59-60,110-111`). The About page has no founding date, team size, or location statement (fetched /about-1 text; teamecomet-about data.json headings).
- Change: About page with founding year, team size (20+), markets served, leadership names with LinkedIn; Team page with real people, roles, platform certifications (Shopify Partner, Meta, Klaviyo, GHL, Make/n8n) only where they exist; case studies with named clients and permissions; testimonials linked to the verifiable source (Upwork/Clutch/LinkedIn); an "insights" section later with named authors.
- After: Google's quality signals for a YMYL-adjacent B2B service improve; AI engines can attribute claims to named people; the brand query SERP (currently ZoomInfo/RocketReach rank next to the site, UNVERIFIED) gets first-party answers.

### D6. Location / market pages
- Current: single Vehari address, no market pages, no time-zone statement.
- Change: do **not** create thin "web development in Toronto" pages now. Add one "Markets & working hours" section (on About and Contact) stating US/CA/EU coverage windows and communication tools, and `areaServed` in schema; add market filters on the case-study index. Create market pages only once there are ≥3 case studies per market to populate them.
- After: answers the "can they work in my time zone" objection (Faheem's FAQ pattern) without generating doorway pages that Google discounts.

### D7. Title / meta / H1 conventions
- Current: `<title>eComet</title>` on all pages (`pages/_app.js:27`), no per-page `<Head>`, no meta description, no OG tags; homepage H1 present ("Crafted Automation & Growth Solutions"), all inner pages have **no H1** — PageBanner renders the page title as `<h2>` (`components/Common/PageBanner.js:15`; teamecomet-about data.json first heading H2 "About Us"). Homepage has 31 H2s including the stat numbers "50+", "70k+" (crawl json h2Count 31; `MakeYourBusiness.js:47-90`). `lang="zxx"` ("no linguistic content") on `pages/_document.js:12`.
- Change: per-page `<Head>` with pattern `Primary service/outcome | eComet` (≤60 chars) and a 140–155-char description; one H1 per page carrying the page's entity; stats as `<p>`/`<span>` not H2; `lang="en"`; OG title/description/image; favicon exists.
- After: Google stops rewriting titles from anchor text; CTR from SERP improves with descriptions; heading outline reflects content for both Google and screen readers.

### D8. Sitemap / robots / canonical / indexing hygiene
- Current: `/robots.txt` 404, `/sitemap.xml` 404 (curl); no canonical; no `noindex` on template pages (`/service-details`, `/testimonials`, `/team` all 200 with placeholder content); mixed-case project URLs (`/projects/Halyard`) that the host lowercases via 301 (`crawl-teamecomet.com.json` location `/projects/halyard`).
- Change: add robots.txt with sitemap reference; generate sitemap.xml (next-sitemap or static) listing only real pages; self-referencing canonicals; lowercase slugs in code so links match final URLs; noindex or delete placeholder pages until replaced; 404 page already exists (`pages/404.js`).
- After: Search Console can be verified and monitored with a clean index; placeholder pages stop competing with real pages for the brand.

### D9. Images and accessibility signals that affect search
- Current: nearly all images use `alt="Image"` (`CaseStudies.js:46`, `Testimonials.js:183`, `TeamCard.js:223`), logo alt "img" (`Navbar.js:43`), footer logo no alt (`Footer.js:230`; data.json missingAlt 1); oversized assets (case1.jpg 2048×2048 rendered at 415px; contact-img.png 2000×2000) per teamecomet-home/contact data.json images; no `<main>`/`<header>` landmarks, focus outline removed (teamecomet-home data.json a11y).
- Change: descriptive alt text naming client/tool; next/image with sizes; landmarks. After: image search visibility, Core Web Vitals and accessibility all improve — supportive for ranking, not the main lever.

---

## E. Flagged issues (FLAG ONLY — with evidence)

### E1. Stackworx credits
- 23 occurrences in 11 files (list in C4). Live-confirmed on `/projects/ezyagent` and `/projects/zentap` (curl). Affected pages: Zentap, Green Top Farms, Ideawake, pHin, Ezyagent, Mega Stores, Puppy Wash, Timbits Sports, Fantasy Middleware, Drone ("Leichtwerk AG" card links to `/projects/Drone`, `CaseStudies.js:363-374`), Workstool.

### E2. Testimonials that look like placeholders or belong elsewhere
- `/testimonials` page: 9 identical Lorem-ipsum quotes with template names (Alen Meair, Axon Detos, John Dona, Jon Smith, Dew Smith, Jeath Smith, Kilkaz Dew, Ana Deth, Zeck Smith) — `components/Testimonials/TestimonialsContent.js:6-9` onward; live headings in teamecomet-testimonials data.json; screenshot `evidence/teamecomet-testimonials/sections/desktop-03.png`.
- Home/About testimonials: 4 of 5 (Lexi Ehrman, Oscar Adams, David Ko, Logan Smith) appear on stackworx.co with the same or near-identical quotes labelled "Verified Upwork"; the Lexi Ehrman quote reads "Stackworx stands out as a top-tier software house" there and "eComet stands out as a top-tier software house" here (`Testimonials.js:11`; raw stackworx.co HTML: each name ×4, "top-tier software house" ×2, "Went from idea to completion in just hours" ×2, "highly professional and seasoned" ×2). CONFIRMED overlap; which company received the reviews is UNVERIFIED.
- Stock portraits reused: the same `/images/clients/client1-4.jpg` files back both the "real" home testimonials (`Testimonials.js:7,33,58,83`) and the Lorem testimonials (`TestimonialsContent.js:5,30,55`).
- "Oscar Adams" quote contains "Seller was nice…" (`Testimonials.js:37`) — marketplace-review wording, no company link.

### E3. Unverified stats
- "50+ Project Completed", "70k+ Hours", "60+ Happy Clients", "30+ Rescue Mission" — `components/Common/MakeYourBusiness.js:47-92`; rendered as H2 on home, /about-1 and /services-4 (data.json headings). No source, definition or case-study count supports them (only 20 projects listed). "Rescue Mission" is undefined on the site.

### E4. Phone numbers — every number found and where
| Number as displayed | href / location | Live? |
|---|---|---|
| "Ph. + (92)-302-692003-4" | `components/Contact/ContactInfo.js:27`; screenshot `evidence/teamecomet-contact/sections/desktop-03.png` | Yes (/contact) |
| `tel:03026820034` | same line `ContactInfo.js:27` — **digits differ from the displayed number** (displayed 302-**692**003-4 vs link 302-**682**0034) and the link lacks the +92 country code, so it will not dial correctly from abroad | Yes (/contact; teamecomet-contact data.json links.tel) |
| "+800 603 6035" | `components/ServiceDetails/ServiceSidebar.js:42` (template) | Yes (/service-details) |
| "+882-569-756" | `components/Layouts/Footer.js:166` (commented-out template footer) | No |
| "(124) 1523-567-9874" / `tel:12415235679874` | `ContactInfo.js:30` (commented) | No |
| "+92-302-692003-4" | ZoomInfo snippet (UNVERIFIED) | External |
Homepage, About, Services, Team, Testimonials and project pages expose **no phone at all** (data.json `links.tel: []`).

### E5. Emails and addresses
- `hr@teamecomet.com` is the only live email (footer + contact) — an HR mailbox as the sales contact (`Footer.js:256`, `ContactInfo.js:14`).
- `hello@jumpx.com` live on /service-details (`ServiceSidebar.js:46`); `info@jumpx.com` commented (`ContactInfo.js:17`); `exampleyour@gmail.com` and placeholder SendGrid key `"..."` in unused API route `pages/api/contact.js:7,20`.
- Template address "123, Western Road, Australia" + hours "9:00 AM – 8:00 PM" live on /service-details (`ServiceSidebar.js:50-54`); "123, Western Road, Melbourne Australia" commented in `Footer.js:178`.

### E6. Leftover template services/content
- `/service-details`: "Service Of Warehousing", Lorem ipsum paragraphs, car-detailing checklist ("Engine bay cleaned and dressed…"), "Facilities: Technology / Tips / AI & IT / Solution" links to itself, "Download Brochures PDF File (1)–(4)" with `href="#"` (`ServiceDetailsContent.js:20-77`, `ServiceSidebar.js:9-88`; fetched text; teamecomet-service-details data.json headings).
- Off-positioning sections on home/about/services: "Safeguarding Your Business in the Digital Age" (cybersecurity) and "Sustainable Practices for Long-Term Growth" (eco practices) — `MakeYourBusiness.js:17-26`; screenshot `evidence/teamecomet-home/sections/desktop-07.png`.
- Homepage service tiles "Mindful Productivity Coach", "Conscious Consumer Guide", "Digital Support" (`HomeOne/Services.js:46-65`) and services-page tiles "Administrative Excellence", "Data-driven Support", "Customized Assistance" (`ServicesStyleFour.js:64-89`) — abstract names, none link anywhere.
- Team page = template roster (E2-style), "Wed Developer" typo (`TeamCard.js:157`), duplicate "Peter Jack" (`:81,181`), social links to facebook.com/, twitter.com/, linkedin.com/, pinterest.com/ roots.
- `components/AboutOne/About.js:23`, `components/Common/Team.js:115`, `components/Services/WhatWeOffer.js:29,92…`, `components/Faq/FaqContent.js:28…` contain Lorem ipsum (unused components, but shipped in the repo).
- `package.json`: name "jumpx", description "Jumpx - React Next.js AI & IT Startup Template", author EnvyTheme.com — template origin; "Designed By ♥ eComet" credit with `href="#"` (`Footer.js:267-274`).
- "FAQ,s" label typo (`Faq.js:16`); "Congratulations!!" form success heading (`ContactForm.js:22`).

### E7. Broken / dead / orphaned links and pages
- `/about-2` (commented "Know Details" button target) → 404; `/services` (commented "Discover More" target) → 404; `/pricing`, `/privacy-policy`, `/terms-conditions` (commented footer links) → 404 (curl 2026-09-29). Not live-linked today, but they will break if the comments are restored.
- Live dead links: 4 × "PDF File" `href="#"` and self-linking "Facilities" on /service-details; "Designed By eComet" `href="#"`; 32 team social links to network home pages (teamecomet-team data.json: 42 links, 35 with empty text).
- Orphaned but indexable: `/team`, `/testimonials`, `/service-details` (all 200; not in nav; footer links commented).
- Every nav/card link carries a trailing slash and 301s (D4).

### E8. Other findings
- `<html lang="zxx">` on all pages (`pages/_document.js:12`).
- Single title "eComet" site-wide, no meta description/OG/canonical/JSON-LD (D7/D8).
- Both hero buttons identical style; no header CTA; no footer links (B).
- Halyard case study body is the client's own corporate copy in first person; industry "IT" for a healthcare company (`CaseStudiesDetailsContent1.js:20,55`).
- Homepage card "Leichtwerk AG" opens `/projects/Drone` whose banner reads "Drone" (`CaseStudies.js:363`, `pages/projects/Drone.js:17`).
- Upwork agency link (a genuine trust asset) is commented out in `Footer.js:248-254`.
- Stackworx reference site itself has canonical/JSON-LD/sitemap URLs pointing to `http://localhost:3000` (a-stackworx data.json) — do not copy its head markup.

---

## F. Prioritised top 10 (impact on trust / conversion / SEO; effort S/M/L)

| # | Change | Why (evidence) | Expected effect | Effort |
|---|---|---|---|---|
| 1 | Remove or rewrite every "Stackworx" attribution and the client-first-person boilerplate in the 20 project pages; keep only projects eComet can honestly describe | E1, C2 | Removes the single most damaging trust contradiction; makes case studies usable as proof | M |
| 2 | Replace placeholder content: /testimonials (Lorem), /team (template names), /service-details (warehousing/jumpx), duplicated Stackworx-labelled quotes — either real content or noindex/remove | E2, E6, E7 | Stops visitors and Google from reaching fake pages under the brand; removes template phone/email/address | M |
| 3 | Per-page `<title>`, meta description, canonical, OG; `lang="en"`; one H1 per page (PageBanner → H1); stats not as H2 | D7 | Ends Google title rewriting, enables descriptions and correct outline on ~30 URLs | S |
| 4 | robots.txt + sitemap.xml; fix trailing-slash mismatch (config vs Netlify) and lowercase slugs; add JSON-LD Organization/WebSite site-wide | D2, D4, D8 | Clean index for Search Console; entity clarity for AI engines; one-hop internal links | S |
| 5 | Persistent header booking CTA + hero primary/secondary hierarchy + two mid-page CTA bands (home, services, about) + footer with links and NAP | B2 items 1–3, 7 | Booking path on every scroll position; today's homepage has zero CTAs after the About section | S/M |
| 6 | One page per real service (`/services/<slug>/`) with definition, who it's for, deliverables, process, tools, pricing model, FAQ (FAQPage), related case studies; `/services` hub; retire `/service-details` | D1, D3 | Each service ranks for its own cluster; buyers find the exact offer; internal links from case studies | L |
| 7 | Fix the phone: one canonical number with country code, matching `tel:` digits; show it in footer on all pages; replace hr@ with a sales mailbox; state hours/time-zone coverage for US/CA/EU | E4, E5, D6 | Removes the mis-dial risk and the "HR only" signal; answers the time-zone objection | S |
| 8 | Rebuild the lead form: fewer required fields, service dropdown, optional budget band, NDA/privacy note, calendar embed, "what happens next" 3 steps + response window; add privacy policy page | B2 item 5, D5 | Lower form abandonment; self-serve booking across time zones; trust at the moment of submission | M |
| 9 | Add a proof block on the homepage and services pages: client logo band (with permission), verifiable review badges (Upwork/Clutch/Google), platform-partner badges only where held, real team with roles | A (gaps 1, 2, 4, 5, 7) | Matches the baseline that 4 of 5 professional references show above the fold | M |
| 10 | Case-study index page with filters + the C3 page structure (challenge → what eComet did → results → visuals → quote → tools → related) applied to the strongest 6–10 projects first | C3 | Turns the slider into a crawlable hub; gives sales a shareable proof asset; supports items 6 and 9 | L |

Quick wins that fit in item 2/8 with S effort: delete the 4 dead "PDF File" links, fix "FAQ,s", "Wed Developer", "Congratulations!!", the "Leichtwerk AG → /projects/Drone" mismatch, and restore the Upwork agency link in the footer if the profile is active.
