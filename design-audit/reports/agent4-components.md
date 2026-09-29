# Agent 4 — Component Engineering Assessment (Group B, components 11-20)

Client: eComet (teamecomet.com). Target stack assumed: Next.js (App Router) + React 19 + Tailwind v4 + shadcn/ui + `motion` (framer-motion). Brand: comet-shaped "e", cyan -> blue -> violet -> magenta gradient on black, used with restraint.

Evidence tags: **CONFIRMED** = seen in a screenshot, in fetched page text, or in the component's published source/compiled bundle. **UNVERIFIED** = inferred. Screenshot paths are relative to `scratchpad/evidence/`; saved source is under `scratchpad/source/`.

## 0. How the evidence was gathered

| Step | Tool | Result |
|---|---|---|
| Page captures (desktop 1440x900 + mobile 390x844, full page, sections, network, CSS vars, keyframes) | `harness/batch.js urls-groupB.json 2` then re-runs of two slugs that failed on a network drop | all 10 pages captured, `evidence/b-*/data.json` |
| Live-demo motion frames (idle x3 at 400 ms, hover, click, keyboard, scroll, 390 px tap) | `harness/motion-b.js` (playwright-core + Edge headless) | `evidence/b-*/extra-*.png`, `extra-motion.json` |
| 21st.dev demos rendered standalone from their public preview bundles, also with `prefers-reduced-motion: reduce` emulated | `harness/motion-21st.js` | `evidence/b-*/extra-*-bundle-*.png`, `extra-bundle-motion.json` |
| Magic UI source | `https://magicui.design/r/<name>.json` (+ demo files) | `source/magicui-*.json` |
| Spectrum UI source | `https://ui.spectrumhq.in/r/<name>.json`, repo `package.json`, `app/globals.css`, `LICENSE` | `source/spectrum-*.json`, `spectrum-globals.css` |
| 21st.dev source | Registry `https://21st.dev/r/<author>/<slug>` returns HTTP 403 `authentication_required` (CONFIRMED). The page payload stores the component file at `r2://components-code-private/...` (CONFIRMED, private). The **demo** file is public on `cdn.21st.dev` and the **preview bundle** (`bundle.<ts>.html`, an inline Vite build) is public, so the component logic was read from the compiled bundle. | `source/21st-*.demo.tsx`, `source/21st-*.bundle.html` |
| Licenses | Magic UI `LICENSE.md` (repo linked from docs), Spectrum `LICENSE` (repo linked from docs), 21st.dev page payload `license` field | see per-component |
| Package sizes | bundlephobia API (some requests rate-limited), npm registry | see section 12 |

Network note: the shared machine lost connectivity twice during the captures (`ERR_INTERNET_DISCONNECTED` / `ERR_NETWORK_CHANGED` recorded in `data.json`). Affected captures were re-run; every component below has at least one clean capture, and any gap is stated.

Docs-site note (does not affect the components): the 21st.dev component browser is heavy (8.4-11.8 MB transferred, 435-459 requests, LCP 13.7-22.8 s in the capture; CONFIRMED from `data.json`), and its preview iframe sits under a loading overlay for several seconds in headless runs, which is why the standalone bundle captures were made.

---

## 11. Carousel Squeeze — 21st.dev / @yura ("Squeeze Carousel")

**1. Load status and evidence.** 21st.dev page: HTTP 200, preview modal rendered with the Controls panel (Gap 16, Height 320, Radius 6, Slat Gap 8, Autoplay off, Controls on, Duration 1000, Interval 6000, Hover Grow on, Slat Width 8) — `b-carousel-squeeze/desktop-full.png` (CONFIRMED). The in-page iframe frames mostly show 21st.dev's loading overlay; the standalone bundle rendered cleanly: `extra-desktop-bundle-idle-1.png`, `extra-desktop-bundle-hover-slat.png`, `extra-desktop-bundle-click-550ms.png`, `extra-desktop-bundle-keyboard-arrowright.png`, `extra-mobile-bundle-idle-1.png`, `extra-reducedMotion-bundle-*.png`, measurements in `extra-bundle-motion.json`. Source: component file private; demo `source/21st-carousel-squeeze.demo.tsx` (public); compiled component extracted from `source/21st-carousel-squeeze.bundle.html` (`function Uv(...)` named `"SqueezeCarousel"`).

**2. Look and behaviour (CONFIRMED unless noted).**
- One wide 16:9 hero panel (width = `height * 16/9`), up to three medium panels, then 8 px "slats"; the panel below crossfades title + description + one action button (`aria-live="polite"` tabpanel). Measured idle widths at 1440: 525 / 444 / 218 / 109 / 8 / 8 / 8 px.
- Hover ("hoverGrow"): the hovered panel grows (3rd panel 218 -> 291 px, hero shrinks 525 -> 482) using share tables `[-.06,.61,.3,.15]` (rest), `[0,.71,.4,.25]` (hovered), `[-.12,.59,.28,.13]` (others).
- Click on a panel or slat: it becomes the hero; the list is windowed and re-keyed so the track slides (`transform 1s cubic-bezier(0.16, 1, 0.3, 1)`) and widths tween (`width, margin-left 1s` same ease). Overlay wordmark fades `opacity 1s`. Timing prop `duration` (default 1000 ms) drives everything through `--sq-ms`; ease is fixed `cubic-bezier(0.16,1,0.3,1)`.
- Keyboard: `role="tablist"` + `role="tab"` buttons with roving `tabIndex`, `aria-selected`, `aria-controls`, `aria-label` = slide title; ArrowLeft/ArrowRight move selection (ArrowRight selected "Ninety-four changes..." in the test); Previous/Next buttons have `aria-label`; `focus-visible:ring-2` in the accent colour.
- Autoplay (off by default): timer `interval` ms; pauses on hover/focus (`onMouseEnter/onFocusCapture`) and is disabled when reduced motion is on.
- Reduced motion: `useReducedMotion` (matchMedia) sets `--sq-ms` to `0ms`; measured transitions became `0s`; hover-grow is also disabled (widths unchanged on hover).
- 390 px (demo settings, height 320): the hero renders 588 px wide inside a 356 px container (clipped by `overflow-hidden`, no page overflow) and the three medium panels collapse to 0 px, leaving hero + three slats + arrows (`extra-mobile-bundle-idle-1.png`). With the component's default `height = clamp(180px, 32cqi, 340px)` the hero is smaller, but the width formula (`--sq-room = 100cqi - hero - gaps`) still goes negative on a 356 px container, so the middle panels are expected to collapse there too (UNVERIFIED, inferred from the formula). No swipe/drag handling exists in the component function (CONFIRMED absence in compiled code) — mobile navigation is tap-on-slat or the arrow buttons.

**3. Stack.** React (hooks incl. `useId`, `useLayoutEffect`), no animation library — CSS transitions + CSS custom properties + container queries (`100cqi`, `@lg:` / `@xl:` variants), `cn()` (clsx + tailwind-merge). npm dependencies in the payload: `{}`; registry deps: `[]` (CONFIRMED). The bundle injects Geist `@font-face` from `cdn.21st.dev` via an inline `<style>` (CONFIRMED) — strip this. Install (page): `npx shadcn@latest add "https://21st.dev/r/yura/carousel-squeeze?api_key=$API_KEY_21ST"` — a 21st.dev API key is required (free tier has daily install limits per the page). Tailwind: container-query variants are built into v4; on v3 they need `@tailwindcss/container-queries` (UNVERIFIED for v3).

**4. Customisation surface (from compiled defaults, CONFIRMED).** `slides: SqueezeSlide[]` (`id, title, description, action, href, target, onAction, overlay, image, imageAlt, background`), `defaultIndex=0`, `onIndexChange`, `height="clamp(180px, 32cqi, 340px)"`, `slatWidth=8`, `slatGap=8`, `gap=16`, `radius=6`, `duration=1000`, `hoverGrow=true`, `autoplay=false`, `interval=6000`, `controls=true`, `accent="var(--sq-accent, var(--primary, currentColor))"`, `accentForeground="var(--sq-accent-foreground, var(--primary-foreground, white))"`, `label="Featured"`, `panelClassName`, `className`, `style`.
*Theme it for eComet:* keep panels black-on-black with `radius 8`; set `accent` to a single brand hue (`var(--color-violet-500)` or the cyan) so only the two arrow buttons and the action button carry colour; put the gradient on the overlay wordmark span (`bg-clip-text` on a 3-word label) at most. Do NOT gradient-fill the arrow buttons, do not use `background` gradient slides instead of photos (the point is imagery), do not enable autoplay on the home page.

**5. Performance and accessibility cost.** Component ~10 KB source (UNVERIFIED), zero deps. Width/margin transitions are layout-affecting (not compositor-only) on 7 elements for 1 s per move — acceptable, but **`<img>` is plain, not `next/image`; supply pre-sized WebP/AVIF** (7 images = demo LCP 13.7 s on the docs host). No rAF loops, no `will-change`. SSR: `window` only inside effects; `useLayoutEffect` will warn in SSR only if rendered on the server without `"use client"` — the demo file has `"use client"`. ARIA is the strongest of the ten (tabs pattern, live region, roving focus). Reduced motion respected.

**6. License.** Page payload `"license":"mit"` and the component page shows "License: MIT" (CONFIRMED). Author: Yura Oak.

**7. Best fit.** "Selected work" strip on the home page (5-7 case studies with one action each) and the Portfolio/Case-study index. Not for the hero (image-heavy LCP, and the mobile collapse), not for services (no icon/text-first mode).

**8. Risk.** Source is behind a 21st.dev API key (updates require the key; after install the code is yours). Inline Geist font from a third-party CDN. Container-query dependence. Mobile collapses to hero+slats — plan a stacked fallback under 640 px. Hard-coded ease.

---

## 12. Stagger Testimonials — 21st.dev / @vaib215

**1. Load status and evidence.** Page HTTP 200 (`b-stagger-testimonials/desktop-full.png` shows the modal; the iframe frames are mostly the loading overlay, one frame `extra-desktop-click-2.png` shows the live demo). Standalone bundle: `extra-desktop-bundle-idle-1.png`, `extra-desktop-bundle-hover-next.png`, `extra-desktop-bundle-click-120ms.png`, `extra-desktop-bundle-click-settled.png`, `extra-mobile-bundle-idle-1.png`, `extra-reducedMotion-bundle-*.png`, `extra-bundle-motion.json`. Source: demo `source/21st-stagger-testimonials.demo.tsx` (just `<StaggerTestimonials />`); compiled component from `source/21st-stagger-testimonials.bundle.html` (`"StaggerTestimonials"`, `"TestimonialCard"`).

**2. Look and behaviour (CONFIRMED).**
- 19 hard-coded testimonials ("COMPANY" placeholder copy, 19 avatar JPGs from `cdn.21st.dev`) rendered as absolutely positioned square cards (365 px at >= 640 px, 290 px below, via `matchMedia("(min-width: 640px)")` + resize listener) in a fixed 600 px tall `overflow-hidden bg-muted/30` container.
- Layout: `translateX(cardSize/1.5 * position)`, alternating `translateY(±15px)` and `rotate(±2.5deg)`; centre card `translateY(-65px)`, `z-10`, `bg-primary text-primary-foreground`, hard offset shadow `0px 8px 0px 4px hsl(var(--border))`, all cards cut-corner `clip-path: polygon(50px 0% ...)`.
- Motion: CSS `transition-all duration-500 ease-in-out` (measured `all 0.5s cubic-bezier(0.4,0,0.2,1)`). `handleMove` rotates the array and assigns `tempId: Math.random()` to moved items, so React **remounts** them: the 120 ms frame shows a greyed card ghosting between old and new slots (`extra-desktop-bundle-click-120ms.png`). Clicking any card moves it to the centre; the two 56 px arrow buttons (`aria-label="Previous testimonial"/"Next testimonial"`, `focus-visible:ring-2`) step by one.
- Keyboard: only the two buttons are focusable; cards are `div`s with `onClick` and no `tabIndex`.
- Reduced motion: no handling; transitions stay 0.5 s under `prefers-reduced-motion: reduce` (measured).
- 390 px: 290 px cards, one centred, neighbours clipped (`extra-mobile-bundle-idle-1.png`); no horizontal page overflow.

**3. Stack.** React + `lucide-react` (chevrons) — payload `"dependencies":{"lucide-react":"latest"}` (CONFIRMED); no motion library ("no frame motion used" per description). Uses shadcn tokens in the **HSL-triplet form** (`hsl(var(--border))`, `hsl(var(--background))`); in a Tailwind v4 / shadcn "new-york v4" setup where `--border` holds a full `oklch()` colour this produces invalid CSS and the hard shadow disappears (UNVERIFIED, inferred from shadcn's v4 token format). Install: `npx shadcn@latest add "https://21st.dev/r/vaib215/stagger-testimonials?api_key=$API_KEY_21ST"` (API key required).

**4. Customisation surface.** None — the component takes no props; copy, avatars, sizes (365/290), the 600 px height and the 1.5 spacing factor are constants (CONFIRMED). Colour comes from `bg-primary`, `bg-card`, `border-border`.
*Theme it for eComet:* if kept, refactor to `items: Testimonial[]`, `cardSize`, `height` props; on black use `bg-white/[0.04] border-white/10` cards, and make only the active card carry a 1 px gradient ring (`bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500` as a `p-px` wrapper) — no gradient fills, no gradient text on quotes. Drop the hard 8 px offset shadow and the cut corner; they read "brutalist", not "comet".

**5. Performance and accessibility cost.** **All 19 cards and 20 images render at once** (frameInfo `imgs: 20`), no `loading="lazy"` on the avatar (CONFIRMED `<img>` without lazy). `transition-all` (includes colours) on 19 elements. Remount-on-move defeats the transition and causes a visible jump. Quotes are only reachable by arrow buttons for keyboard users; no `aria-live` for the changing quote. SSR-safe (`matchMedia` in effect).

**6. License.** Page payload `"license":""`; component page reports "License: Unknown" — **license not confirmed**.

**7. Best fit.** Home testimonials band or `/testimonials` page — only after a rebuild (props + lazy images + keyboard access). Avoid as-is on any page.

**8. Risk.** Hard-coded data, HSL token coupling, remount artefact, no license, source behind API key. Verdict: **USE WITH CARE (rebuild the layout idea, do not ship the component as delivered)**.

---

## 13. Floating Icons Hero Section — 21st.dev / @ravikatiyar162

**1. Load status and evidence.** First batch run failed on the network drop; re-run: HTTP 200, modal rendered (`b-floating-icons-hero/desktop-hero.png`, `mobile-hero.png`). Standalone bundle (dark): `extra-desktop-bundle-idle-1..3.png`, `extra-desktop-bundle-mouse-near-icon.png`, `extra-desktop-bundle-mouse-away.png`, `extra-mobile-bundle-idle-1.png`, `extra-mobile-bundle-after-1s.png`, `extra-reducedMotion-bundle-*.png`, `extra-bundle-motion.json`. Source: demo `source/21st-floating-icons.demo.tsx` (16 inline SVG brand logos, `FloatingIconsHeroProps`); compiled component in `source/21st-floating-icons.bundle.html` (`m1.displayName="FloatingIconsHero"`, icon child `"Icon"`).

**2. Look and behaviour (CONFIRMED).**
- `<section>` `relative w-full h-screen min-h-[700px] overflow-hidden bg-background` (900 px at 1440, 844 px at 390), centred `h1` `text-5xl md:text-7xl` (48 / 72 px) with `bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text`, subtitle `max-w-xl text-lg text-muted-foreground`, one shadcn `Button size="lg" asChild` -> `<a>`.
- 16 icon tiles (`w-16 h-16 md:w-20 md:h-20 rounded-3xl shadow-xl bg-card/80 backdrop-blur-md border border-border/10`) positioned by Tailwind classes (`top-[10%] left-[10%]` ...).
- Entrance: `initial {opacity:0, scale:.5}` -> `{1,1}`, `delay index*0.08`, `duration 0.6`, ease `[.22,1,.36,1]`.
- Idle loop (inner `motion.div`): `y:[0,-8,0,8,0], x:[0,6,0,-6,0], rotate:[0,5,0,-5,0]`, `duration 5 + random*5`, `repeat: Infinity`, `repeatType: "mirror"`, `easeInOut` — transforms were still changing at every sample (desktop, mobile, and with reduced motion emulated).
- Mouse repulsion: each icon registers its own `window` `mousemove` listener, calls `getBoundingClientRect()` on every move, and if the pointer is within 150 px sets two `useSpring` values (`stiffness 300, damping 20`) to push the tile up to 50 px away; measured `translateX(-21.6px) translateY(-14.4px)` when approached.
- Reduced motion: nothing in the component; motion's default `reducedMotion` is "never", so the float loop and repulsion run regardless (measured).
- 390 px: tiles overlap the headline and paragraph (one tile intersecting the `h1`, others over the body copy — `extra-mobile-bundle-idle-1.png`); the section is a full viewport tall.
- Keyboard: Tab reaches the CTA `<a href="#">`; tiles are not focusable and are not `aria-hidden` (no `aria-hidden` in the bundle) — screen readers get nothing meaningful from them (no `<title>` in the SVGs).

**3. Stack.** `framer-motion` (payload `"dependencies":{"framer-motion":"latest"}`), registry dep `shadcn/button`, `cn`, `class-variance-authority` (bundled with the Button) (CONFIRMED). Install with API key: `npx shadcn@latest add "https://21st.dev/r/ravikatiyar162/floating-icons-hero-section?api_key=$API_KEY_21ST"`. Tailwind: plain utilities, works on v3 or v4.

**4. Customisation surface.** Props: `title`, `subtitle`, `ctaText`, `ctaHref`, `icons: {id, icon: ComponentType<SVGProps>, className}[]`, `className` (+ section props) (CONFIRMED from demo types and compiled destructuring). Everything else (tile size, blur, spring, float amplitude, entrance stagger, 150 px radius) is hard-coded.
*Theme it for eComet:* use it as an **integrations band**, not the hero: 6-8 tool logos (Shopify, Klaviyo, Meta, GoHighLevel, Zapier, Make, n8n, Slack) on black tiles `bg-white/[0.04] border-white/10`, blur removed, headline plain white, and only the CTA in a single accent. Do NOT put the brand gradient on the tiles or on the 72 px headline; do not use it above the fold where it competes with the H1; check logo usage rights (UNVERIFIED for the demo's Google/Apple/Microsoft marks).

**5. Performance and accessibility cost.** **16 infinite transform animations + 16 `mousemove` listeners each doing a layout read (`getBoundingClientRect`) on every event + 16 `backdrop-blur-md` layers** — this is the heaviest interactive piece in Group B on mobile (continuous compositor work for the whole visit; tab-hidden pausing is motion's default, off-screen pausing is not). Bundle: framer-motion (see section 12; `motion@12` core is 44 KB gzip on bundlephobia) + component. No reduced-motion path. Overlap with copy at 390 px.

**6. License.** Page payload `"license":""`; component page "License: Unknown" — **license not confirmed**.

**7. Best fit.** "Tools we automate with" section on the Automation / Shopify service pages, capped at 8 icons, wrapped in `MotionConfig reducedMotion="user"`, and with icons hidden below `md` or rendered static. Not the home hero.

**8. Risk.** Heavy on mobile; no PRM; API-key lock-in; mousemove layout thrash; icons overlap text at phone widths; brand-logo licensing. Verdict: **USE WITH CARE**.

---

## 14. Smooth Cursor — Magic UI

**1. Load status and evidence.** First batch failed (`ERR_CONNECTION_TIMED_OUT`), re-run HTTP 200: `b-smooth-cursor/desktop-hero.png` ("Move your mouse around" demo), `mobile-hero.png`, `extra-desktop-hover-2.png` (custom black arrow rotated in the demo box), `extra-mobile-idle-1.png`, `extra-motion.json`. Source: `source/magicui-smooth-cursor.json` (`registry/magicui/smooth-cursor.tsx`, `dependencies: ["motion"]`). Docs text fetched for Features / Hiding cursor / Browser support / Accessibility / Credits.

**2. Look and behaviour (CONFIRMED).** A fixed `motion.div` (`position: fixed; z-index: 100; pointer-events: none; will-change: transform; translate(-50%,-50%)`) holding a 50x54 SVG arrow scaled 0.5 follows the pointer through springs: position `{damping 45, stiffness 400, mass 1, restDelta 0.001}`, rotation `{damping 60, stiffness 300}` (angle of velocity + 90°, accumulated so it never snaps), scale `{stiffness 500, damping 35}` dipping to 0.95 while moving and back to 1 after 150 ms idle; opacity fades in 0.15 s on first move. Measured: `document.body.style.cursor = "none"` and the cursor element at `rotate(53.98deg)` on desktop; on the touch-emulated 390 px run `body cursor = auto` and **zero cursor elements** — enabled only when `(any-hover: hover) and (any-pointer: fine)` matches, and touch `pointerType` is ignored. Docs: add `* { cursor: none !important; }` globally, optionally `input, textarea, select { cursor: text !important; }`.

**3. Stack.** `motion/react` (`motion`, `useSpring`), React `"use client"`. Install: `pnpm dlx shadcn@latest add @magicui/smooth-cursor` (docs). Tailwind not used by the component. Magic UI's registry site runs Tailwind ^4.1.13, React 19.1.1, Next ^15.5 (repo `apps/www/package.json`, CONFIRMED).

**4. Customisation surface.** `cursor?: ReactNode` (default `<DefaultCursorSVG />`), `springConfig?: {damping, stiffness, mass, restDelta}` (CONFIRMED). No size/colour props — replace the SVG.
*Theme it for eComet:* if ever used, a 6 px cyan dot with `mix-blend-difference`, never a gradient blob, never the arrow. Honestly: do not theme it; skip it.

**5. Performance and accessibility cost.** Global `pointermove` listener (rAF-throttled) plus four springs animating whenever the mouse moves — cheap-ish but continuous on desktop. **Requires `cursor: none` site-wide**, which removes the native hand pointer on links/buttons and the I-beam unless overridden; keyboard users never see it (docs say so); **no `prefers-reduced-motion` handling** (docs only "consider motion sensitivity options"). SSR-safe (`matchMedia` in effects; renders `null` until enabled). z-index 100 sits above shadcn overlays (z-50) so it stays visible in dialogs.

**6. License.** MIT — Magic UI repo `LICENSE.md` ("MIT License, Copyright (c) Magic UI"), reached from the docs' "source code is available on GitHub" link (CONFIRMED). Docs credit @Code_Parth for the original concept.

**7. Best fit.** None on eComet. An agency site full of links, forms and a chat widget is exactly where a hidden native cursor costs conversions. If the Lead insists: a single case-study template only.

**8. Risk.** Conflicts with any other custom cursor and with libraries that set `cursor` styles (Swiper drag cursors, embla grab cursors); pointer feedback lost. Verdict: **SKIP**.

---

## 15. Interactive Grid Pattern — Magic UI

**1. Load status and evidence.** HTTP 200 (`b-interactive-grid-pattern/desktop-hero.png` skewed grid demo; `extra-desktop-hover-1.png` one lit cell; `extra-mobile-idle-1.png`; `extra-motion.json`: 576 `<rect>`, 1 hovered, rect class `stroke-gray-400/30 transition-all duration-100 ease-in-out not-[&:hover]:duration-1000 fill-transparent`). Source: `source/magicui-interactive-grid-pattern.json` (no dependencies) and demos `interactive-grid-pattern-demo.json`, `interactive-grid-pattern-demo-2.json` ("Colorful").

**2. Look and behaviour (CONFIRMED).** One `<svg>` sized `width*squares[0]` x `height*squares[1]`, `absolute inset-0 h-full w-full border border-gray-400/30`, containing `squares[0]*squares[1]` `<rect>`s. `onMouseEnter/Leave` on each rect stores the hovered index in state; the hovered rect gets `fill-gray-300/30`, others `fill-transparent`; fill fades in over 100 ms and out over 1000 ms (`not-[&:hover]:duration-1000`). Demo 1 masks with `[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]`, `inset-y-[-30%] h-[200%] skew-y-12`. Mouse-only: at 390 px (touch) it is a static grid (screenshot). No animation loop; nothing to reduce for PRM.

**3. Stack.** React `useState`, `cn`; zero deps. Install `pnpm dlx shadcn@latest add @magicui/interactive-grid-pattern`. **Tailwind v4 syntax**: `not-[&:hover]:` uses the v4 `not-*` variant (Tailwind v4.3 docs: "Use the not- variant to style an element when a condition is not true" — CONFIRMED); on v3 that class is ignored and the fade-out would be 100 ms (UNVERIFIED, inferred).

**4. Customisation surface.** `width=40`, `height=40`, `squares=[24,24]` (h, v), `className`, `squaresClassName`, plus any `SVGProps` (CONFIRMED). "Colorful" demo: `width={20} height={20} squares={[80,80]} squaresClassName="hover:fill-blue-500"`.
*Theme it for eComet:* hero background behind the H1: `className="[mask-image:radial-gradient(520px_circle_at_50%_30%,white,transparent)] stroke-white/5"`, `squaresClassName="stroke-white/[0.06] hover:fill-violet-500/15"`, keep `squares=[24,24]` at 48-56 px cells. Do NOT use `[80,80]` (6,400 DOM nodes), do not fill with the full gradient, do not stack it with the dot pattern.

**5. Performance and accessibility cost.** 576 SVG nodes with two React handlers each; **every hover triggers a state update that re-renders all 576 rects** (no memo) — fine at 24x24, **heavy at 80x80**. `border` on the svg draws a visible outer frame (crop with an `overflow-hidden` parent). Decorative but not `aria-hidden` (add it). SSR-safe. `transition-all` on rects is cheap (fill only changes).

**6. License.** MIT (Magic UI `LICENSE.md`, CONFIRMED). Docs: "Built by dillion".

**7. Best fit.** Home hero background (behind H1 and CTA) or Contact page background — pick this OR the dot pattern, not both.

**8. Risk.** v4-only variant; large `squares` values; `border` class default. Verdict: **USE** (24x24, masked).

---

## 16. Dot Pattern — Magic UI

**1. Load status and evidence.** HTTP 200 (`b-dot-pattern/desktop-hero.png` default demo; `extra-desktop-glow-1.png` / `extra-desktop-glow-2.png` "With Glow Effect" example at two moments; `extra-mobile-idle-1.png`). In the second motion run **four full-page screenshots timed out (20 s)** on this page, and `data.json` counts **1,408 elements with inline transforms** on the page (the glow demo's `motion.circle`s) — CONFIRMED indicators that the glow variant is expensive. Source: `source/magicui-dot-pattern.json` + three demo files.

**2. Look and behaviour (CONFIRMED).** `<svg aria-hidden="true" class="pointer-events-none absolute inset-0 h-full w-full text-neutral-400/80">`; on mount it measures the container (`getBoundingClientRect`, plus a `resize` listener) and renders one `<motion.circle r={cr}>` per grid cell (`ceil(w/width) * ceil(h/height)`; the 774x500 docs demo is roughly 49 x 32 = 1,568 circles). `glow=false`: static `currentColor` dots. `glow=true`: each circle animates `opacity [0.4,1,0.4]`, `scale [1,1.5,1]`, `duration 2-5 s` random, `delay 0-5 s` random, `repeat: Infinity, repeatType: "reverse", easeInOut`, filled with a radial gradient. Demos mask with `radial-gradient(300px_circle_at_center,...)` or a diagonal `linear-gradient`.

**3. Stack.** React + **`motion/react` is imported by the source, but the registry item lists no `dependencies`** (CONFIRMED mismatch) — the CLI will not install `motion`; add it yourself. `cn`. Install `pnpm dlx shadcn@latest add @magicui/dot-pattern`. Tailwind v3/v4 neutral.

**4. Customisation surface (docs props table, CONFIRMED).** `width=16`, `height=16`, `x=0`, `y=0`, `cx=1`, `cy=1`, `cr=1`, `className`, `glow=false`, plus SVG props. Colour via text utilities (`currentColor`).
*Theme it for eComet:* `glow={false}`, `width={24} height={24} cr={1}`, `className="text-violet-400/10 [mask-image:radial-gradient(640px_circle_at_50%_40%,white,transparent)]"` behind the hero or the final CTA band — ~8-10 % violet on black is the restraint level. Do NOT enable glow on a full-width section; do not colour dots with the gradient (a radial mask of a single hue already suggests the comet tail).

**5. Performance and accessibility cost.** Even static, this creates ~1,000-2,000 React elements for a background (**a CSS `radial-gradient` dot background costs 0 nodes and is the recommended substitute**). **Glow = thousands of concurrent SVG attribute animations; no `prefers-reduced-motion` handling; no off-screen pause** (bold). Dimensions are 0 on the server, so nothing renders until the effect runs (no hydration mismatch, but a first-paint flash). `aria-hidden` and `pointer-events-none` are set (good).

**6. License.** MIT (CONFIRMED).

**7. Best fit.** Hero or CTA-band background, static only, or replaced by a CSS gradient with the same look. Never glow on the home page.

**8. Risk.** Missing `motion` dependency declaration; glow cost; DOM count. Verdict: **USE WITH CARE (static only)**.

---

## 17. Scroll Based Velocity — Magic UI

**1. Load status and evidence.** HTTP 200 (`b-scroll-based-velocity/desktop-hero.png`; `extra-desktop-idle-1.png` vs `extra-desktop-idle-3.png` show the rows shifted; `extra-desktop-scroll-settled.png` shows the images example; `mobile-hero.png`). Measured (`extra-motion.json`): row transform `translateX(-361.66px)` -> `-322.10px` over 400 ms (about 100 px/s at `baseVelocity=20`); after a 900 px wheel scroll that pushed the rows out of view the transform froze at `-316.84px` for 300 ms (off-screen pause). Source: `source/magicui-scroll-based-velocity.json` (`dependencies: ["motion"]`) + two demos.

**2. Look and behaviour (CONFIRMED).** `ScrollVelocityContainer` computes one shared velocity factor: `useScroll().scrollY` -> `useVelocity` -> `useSpring({damping 50, stiffness 400})` -> `sign * min(5, |v|/1000*5)`. `ScrollVelocityRow` duplicates its children `max(3, ceil(containerWidth/blockWidth)+2)` times (`aria-hidden` on copies), and moves them in a `useAnimationFrame` loop: `pixelsPerSecond = blockWidth * baseVelocity/100`, multiplied by `1 + |velocityFactor|` (up to 6x while scrolling fast), direction flips with scroll direction, wrapped with `wrap()`. `ResizeObserver` recomputes copies; `IntersectionObserver` pauses off-screen; `visibilitychange` pauses hidden tabs. Reduced motion: `matchMedia("(prefers-reduced-motion: reduce)")` sets `speedMultiplier = 1` — the marquee keeps moving at base speed but ignores scroll boosts. Docs "Performance" section states the pausing and PRM behaviour. Row is `transform-gpu will-change-transform select-none`. Works on touch (rAF loop, native scroll).

**3. Stack.** `motion/react` (`useScroll, useVelocity, useSpring, useTransform, useMotionValue, useAnimationFrame`), React `"use client"`, `cn`. Install `pnpm dlx shadcn@latest add @magicui/scroll-based-velocity`. Tailwind neutral (demo uses `md:leading-20`, a v4 spacing value).

**4. Customisation surface (docs table, CONFIRMED).** Container: `className`, `children`. Row: `className`, `children`, `baseVelocity=5` ("Base scroll velocity percentage of content width"), `direction: 1 | -1` (default 1), `scrollReactivity=true`.
*Theme it for eComet:* one row only, `baseVelocity={4}`, small uppercase `text-sm tracking-[0.2em] text-white/50` service keywords separated by a single accent-coloured dot, or the client-logo strip (images demo) with `grayscale opacity-60`; edge fades `from-black`. Do NOT ship the demo's two 7xl rows, do not colour the words with the gradient, do not run two containers on one page.

**5. Performance and accessibility cost.** **Continuous `requestAnimationFrame` loop while the row is in view** (bold) — acceptable for one row, pauses off-screen and on hidden tabs. Duplicated DOM (3+ copies). Under PRM it still scrolls (WCAG 2.2.2 "pause, stop, hide" expects a control for moving content over 5 s — none provided; add a pause button or render static under PRM). `motion` weight as below.

**6. License.** MIT (CONFIRMED).

**7. Best fit.** Home: a single ticker between hero and services (services keywords) or the client-logo strip above testimonials. Not on service detail pages (distracting near copy), not in the footer.

**8. Risk.** Second animation loop if combined with dot-glow or floating icons; with Lenis it reads native `scrollY`, so it keeps working, but Lenis's smoothing changes the felt velocity (UNVERIFIED). Verdict: **USE** (one row).

---

## 18. Bento Grid — Magic UI

**1. Load status and evidence.** HTTP 200 (`b-bento-grid/desktop-hero.png`, `extra-desktop-idle-1.png` full 4-card demo, `mobile-hero.png` / `extra-mobile-idle-1.png` stacked cards with "Learn more ->" visible). A dedicated hover-card frame was not conclusive (the hover landed on the marquee inside the first card), so hover behaviour below is CONFIRMED from source, not from a frame. Source: `source/magicui-bento-grid.json` (`dependencies: ["@radix-ui/react-icons"]`, `registryDependencies: ["button"]`), demos `bento-demo.json` (uses Marquee, AnimatedList, AnimatedBeam, Calendar) and `bento-demo-vertical.json`.

**2. Look and behaviour (CONFIRMED).** `BentoGrid`: `grid w-full auto-rows-[22rem] grid-cols-3 gap-4` (measured cards 221x352 and 457x352 px). `BentoCard`: `group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl bg-background`, light shadow stack, dark mode `dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]`; `background` slot rendered first (absolute art), then icon (`h-12 w-12`), `h3` name, `p` description. Hover (>= lg): text block `lg:group-hover:-translate-y-10`, icon `group-hover:scale-75`, CTA link slides up `translate-y-10 opacity-0 -> translate-y-0 opacity-100`, overlay `group-hover:bg-black/3`; all `transition-all duration-300` (ease-in-out on the icon). Below `lg` the CTA is always visible (`lg:hidden` block) — matches the mobile screenshot. Default single column below `lg` unless the consumer passes `lg:col-span-*`. No JS, no `"use client"` (server-component safe).

**3. Stack.** React, `@radix-ui/react-icons` (ArrowRightIcon only), shadcn `Button variant="link" asChild`, `cn`. Install `pnpm dlx shadcn@latest add @magicui/bento-grid`. Tailwind: `bg-black/3` needs v4 (v3: `bg-black/[0.03]`), `transform-gpu`, arbitrary-property shadows (fine on both).

**4. Customisation surface (from the interface, CONFIRMED; the docs page has no props table).** `BentoGrid`: `children`, `className` + div props. `BentoCard` (all required): `name: string`, `className: string`, `background: ReactNode`, `Icon: React.ElementType`, `description: string`, `href: string`, `cta: string` + div props.
*Theme it for eComet:* services bento (AI automation / Web dev / Shopify pre & post-sales / Email marketing / Meta ads / GoHighLevel / VAs): `bg-white/[0.03] border-white/10`, icons `text-white/80`, one featured card only with a violet-tinted inset (`[box-shadow:0_-20px_80px_-20px_rgba(139,92,246,.25)_inset]`) and a 1 px gradient border via a `p-px bg-gradient-to-br` wrapper. Do NOT gradient every card, do not fill `background` slots with the demo's animated beams/lists on all cards (one animated card maximum).

**5. Performance and accessibility cost.** Negligible (CSS only). **Keyboard: on desktop the CTA link is `opacity-0` until hover and there is no `group-focus-within` variant, so Tab lands on an invisible link** (bold, CONFIRMED from source) — add `group-focus-within:opacity-100 group-focus-within:translate-y-0`. `Icon` has no `aria-hidden`. Card hover overlay is `pointer-events-none` (good). Weight: `@radix-ui/react-icons` full package is 98 KB gzip (bundlephobia) but only one icon is imported; swap to `lucide-react` `ArrowRight` if lucide is already in the bundle (UNVERIFIED tree-shaking outcome).

**6. License.** MIT (CONFIRMED).

**7. Best fit.** Home services bento and the Services page. Not for testimonials or team (fixed 22 rem rows).

**8. Risk.** Required props with no defaults (TypeScript will enforce); `auto-rows-[22rem]` needs overriding for text-heavy cards; focus visibility. Verdict: **USE**.

---

## 19. Accordion — Spectrum UI

**1. Load status and evidence.** HTTP 200 (`b-spectrum-accordion/desktop-hero.png`; `extra-desktop-accordion-open-2.png` first item open; `extra-desktop-accordion-keyboard-open.png` second item opened with Tab + Enter, focus box visible; `mobile-hero.png`; `extra-motion.json`). Measured DOM: triggers are `<button>` inside `<h3>` with `aria-expanded`, `aria-controls`, `data-state`; panels are `role="region"` with `aria-labelledby`; open panel computed `animation: accordion-down 0.2s ease-out`, closed `accordion-up 0.2s ease-out`. Source: `source/spectrum-accordion-dependencies.json` -> `components/ui/accordion.tsx` (11 KB, `dependencies: ["@radix-ui/react-accordion","lucide-react"]`), plus `accordion.json`, `accordion-card.json`, `accordion-filled.json`, `accordion-ghost.json`, `accordion-generative.json` demos; `spectrum-globals.css`; repo `package.json`.

**2. Look and behaviour (CONFIRMED).** Radix Accordion wrapped with a style context: `variant: "default" | "card" | "filled" | "ghost"`, `indicator: "chevron" | "plus" | "none"`. Default = hairline dividers `divide-black/[0.07] dark:divide-white/10`, trigger `py-4 text-[15px] font-medium text-neutral-700 dark:text-neutral-200`, chevron `size-4 text-neutral-400 transition-transform duration-300 ease-out group-data-[state=open]:rotate-180`; plus indicator built from two 1.5 px bars, the vertical one `scale-y-0` when open. Card = `rounded-2xl border bg-white dark:bg-white/[0.02]`, Filled = `rounded-xl bg-black/[0.03] dark:bg-white/[0.04]`, Ghost = spacing only. Content `overflow-hidden text-sm leading-relaxed data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up` — the keyframes live in the project's `globals.css` `@theme` (`--animate-accordion-down: accordion-down 0.2s ease-out`, keyframes on `--radix-accordion-content-height`; also `--animate-faq-open 0.35s cubic-bezier(0.32,0.72,0,1)` is defined but unused by this file). Focus: `outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/15 dark:focus-visible:ring-white/25`. Keyboard: Radix provides Tab, Enter/Space, Arrow Up/Down, Home/End; Tab + Enter verified. `AccordionStreamingContent` (the "generative" variant): reveals `text` in 1-3 character chunks every `speed` ms (default 14) after `startDelay` (420 ms), punctuation pauses 5x, blinking caret, "Generating"/"Generated answer" label, full text reserved invisibly for height and duplicated in `sr-only`; it uses `usePrefersReducedMotion` (`useSyncExternalStore` on `matchMedia`) to reveal everything instantly under PRM. 390 px: single column, triggers full width (`mobile-hero.png`).

**3. Stack.** `@radix-ui/react-accordion` (5 KB gzip, bundlephobia CONFIRMED for 1.2.11; Spectrum pins `^1.1.2`), `lucide-react` (ChevronDown), `cn`, React `forwardRef` + `React.ElementRef` (works on React 19 with deprecation warnings only — UNVERIFIED). Spectrum's site: Next ^16.2, React ^19.2, Tailwind ^4.3.3 with `@tailwindcss/postcss` (repo `package.json`, CONFIRMED). Install: `npx shadcn@latest add @spectrumui/accordion` (+ `-card`, `-filled`, `-ghost`, `-generative`); the `@spectrumui` namespace must be registered in `components.json` (UNVERIFIED — not shown on the page). Docs: "Does Accordion require Motion? No Motion dependency was detected."

**4. Customisation surface.** Root: all Radix `Accordion.Root` props (`type="single"|"multiple"`, `collapsible`, `defaultValue`, `value`, `onValueChange`, `disabled`, `orientation`) + `variant`, `indicator`, `className`. Item/Trigger/Content: Radix props + `className`. Streaming: `text`, `speed=14`, `startDelay=420`, `streamingLabel="Generating"`, `doneLabel="Generated answer"`, `icon`. Docs say "no shared Props type" (CONFIRMED).
*Theme it for eComet:* `variant="default"` on black with `divide-white/10`, trigger `text-white/90`, open trigger text white, chevron `text-white/40`; put a single cyan `focus-visible:ring-cyan-400/40`. Keep the gradient off the FAQ entirely; if one accent is wanted, colour the `plus` indicator of the open item only. The "generative" variant could headline the AI-automation FAQ, but treat it as decoration (one answer, `speed 10`).

**5. Performance and accessibility cost.** Light: Radix + CSS keyframes; no rAF. **The height animation is not wrapped in `prefers-reduced-motion`** — Spectrum's globals only reduce their auth/enter/reveal utilities (lines 304-343), so the 0.2 s open/close still animates for PRM users (bold, CONFIRMED from `spectrum-globals.css`); add `motion-reduce:animate-none` to Content. Streaming variant respects PRM. ARIA is Radix-correct (verified attributes). **You must copy the `@theme` keyframes into your own `globals.css`** or the panels snap open (bold).

**6. License.** Apache License 2.0 — repo `LICENSE` (CONFIRMED, fetched) and the docs FAQ: "The public Accordion source is available under the Apache License 2.0." Apache 2.0 requires keeping the license notice with redistributed source (per the license text).

**7. Best fit.** FAQ blocks on Services, Shopify support and Contact pages; process steps ("How we onboard") with the `ghost` + numbered variant. Not for navigation menus.

**8. Risk.** Keyframe/`@theme` coupling; Tailwind v4 assumed (`@theme`, `size-4`); minor React 19 `ElementRef` deprecation. Verdict: **USE** (add `motion-reduce`).

---

## 20. Animated Card — Spectrum UI

**1. Load status and evidence.** HTTP 200 (`b-spectrum-animatedcard/desktop-hero.png` stacked deck; `extra-desktop-hover-2.png` deck idle; `extra-desktop-click-2.png` fanned out after click; `mobile-hero.png` and `extra-mobile-idle-1.png` show an **empty preview box at 390 px**). Source: `source/spectrum-animated-card.json` -> `animatedcard.tsx` (the card) + `animatedcarddemo.tsx` (the animation), `dependencies: ["framer-motion"]`.

**2. Look and behaviour (CONFIRMED).** `AnimatedCard` itself is static: `md:w-80 border rounded-2xl shadow-lg bg-neutral-50 dark:bg-neutral-900 transition-transform duration-300 hover:scale-105`, a `next/image` 128x128 logo (`alt="${title} logo"`), `text-2xl font-bold` title, `text-sm text-muted-foreground` copy. The demo stacks four cards `absolute` with `rotate` `[0,6,12,17]` and `zIndex [40,30,20,10]`; clicking anywhere on the container toggles `touchComponent`, animating each `motion.div` to `x [-300,-50,240,330]`, `y [-60,-120,-140,-100]`, `rotate [-20,-10,0,20]` with `transition={{ ease: easeInOut }}` (default duration); click again returns to `x:0,y:0` (rotation stays). Container `hidden md:flex justify-center min-h-screen items-center` — **not rendered below `md` (768 px)** (screenshot + source). Hover on a card: `scale-105`. No keyboard access (click handler on a `div`, no `tabIndex`, no `role`).

**3. Stack.** `framer-motion` (imported as `framer-motion`, not `motion/react`), `next/image` (ties the card to Next.js), React `useState`, `lucide-react` listed on the docs page but not used in these two files (CONFIRMED). Install `npx shadcn@latest add @spectrumui/animated-card`. Tailwind neutral.

**4. Customisation surface.** `AnimatedCard`: `imgSrc: StaticImageData | string`, `title: string`, `aboutProduct: string` (CONFIRMED). The fan coordinates, rotations, z-order and the 320 px card width are hard-coded pixels in the demo; the docs say "no shared Props type" and "adjust Motion transitions in the source" (CONFIRMED).
*Theme it for eComet:* the idea (a "tool deck" — Shopify, Klaviyo, Meta, GHL, n8n) suits the About page or a Shopify-support page as a desktop-only flourish: cards `bg-white/[0.04] border-white/10`, logos monochrome white, active card with a 1 px cyan ring; no gradient anywhere. Do NOT use the demo's `min-h-screen` container or its px offsets; rebuild with `whileHover` and percentage offsets.

**5. Performance and accessibility cost.** Light (four `motion.div`s). **No reduced-motion path** (docs: "No reduced-motion marker was detected; add or verify a reduced-motion path before production use" — CONFIRMED text). **Hidden entirely on phones**, click-only, no keyboard/AT semantics (bold). Pulls `framer-motion` while the rest of the stack would use `motion/react` — same engine (`motion@12` depends on `framer-motion@^12`, npm CONFIRMED) but two import paths; align on one to avoid duplicate copies (UNVERIFIED whether bundlers dedupe across the alias).

**6. License.** Apache License 2.0 (repo `LICENSE`, CONFIRMED; docs: "free for commercial use").

**7. Best fit.** Optional About-page "our stack" moment (desktop only). Not for services, testimonials or anything that must exist on mobile.

**8. Risk.** Demo-grade code (hard-coded px, `hidden md:flex`, non-semantic click), Next-only `Image`. Verdict: **SKIP** as delivered (rebuild if the deck idea is wanted).

---

## 12. Dependency weights (for the budget)

| Package | Size | Source |
|---|---|---|
| `motion@12.23.12` (Magic UI's dependency) | 132 KB min / **44 KB gzip** whole package | bundlephobia (CONFIRMED); tree-shaken `motion/react` share UNVERIFIED |
| `framer-motion@12.23.24` | bundlephobia build failed; `motion` depends on `framer-motion ^12.23.12` + `motion-dom` + `motion-utils` | npm registry (CONFIRMED); size UNVERIFIED |
| `@radix-ui/react-accordion@1.2.11` | 13 KB min / **5 KB gzip** | bundlephobia (CONFIRMED) |
| `lucide-react@0.544.0` | 564 KB min / 140 KB gzip whole; per-icon imports are tree-shaken (~1 KB each UNVERIFIED) | bundlephobia (CONFIRMED total) |
| `@radix-ui/react-icons@1.3.2` | 394 KB min / 98 KB gzip whole; one icon used by Bento | bundlephobia (CONFIRMED total) |
| `clsx@2.1.1` / `tailwind-merge@3.3.1` | ~1 KB / 25 KB min (8 KB gzip) | bundlephobia (CONFIRMED) |

Tailwind version facts: Magic UI's site is Tailwind ^4.1.13 with `@import "tailwindcss"` + `@theme inline` (repo `apps/www/package.json`, `styles/globals.css`, CONFIRMED); Spectrum is Tailwind ^4.3.3 (CONFIRMED); Tailwind v4.0 targets Safari 16.4+, Chrome 111+, Firefox 128+ (upgrade guide, CONFIRMED). v4-only syntax seen: `not-[&:hover]:` (interactive grid), `bg-black/3` (bento), `@theme --animate-*` (accordion), container-query variants (carousel squeeze). v3-style token syntax seen: `hsl(var(--border))` (stagger testimonials).

---

## 13. Summary table

| # | Component | Source read from | Deps | Reduced-motion | Mobile-safe (390) | License | Best eComet section | Avoid | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| 11 | Carousel Squeeze | 21st.dev compiled bundle + demo (component file private) | none (CSS + container queries) | Yes (duration -> 0, hover-grow off, autoplay off) | Partial: hero + slats only, middle panels collapse | MIT (page) | Home "Selected work" / Portfolio | Hero, services | USE WITH CARE |
| 12 | Stagger Testimonials | 21st.dev compiled bundle + demo | lucide-react | No | Yes (290 px cards), but 20 eager images | not confirmed | Testimonials (after rebuild) | As delivered anywhere | USE WITH CARE (rebuild) |
| 13 | Floating Icons Hero | 21st.dev compiled bundle + demo | framer-motion, shadcn button | No (loop + repulsion continue) | Renders, but icons overlap copy; 16 infinite animations + blur | not confirmed | Integrations band on Automation/Shopify pages (<= 8 icons) | Home hero | USE WITH CARE |
| 14 | Smooth Cursor | Magic UI registry source | motion | No | Disabled on touch (by design) | MIT | none | Whole site (cursor:none) | SKIP |
| 15 | Interactive Grid Pattern | Magic UI registry source | none | n/a (hover only) | Static grid on touch | MIT | Hero background behind H1 / Contact bg | squares > 24x24; stacking with dots | USE |
| 16 | Dot Pattern | Magic UI registry source | motion (undeclared in registry) | No | Static ok; glow heavy | MIT | Hero/CTA band background, static | glow on large areas | USE WITH CARE (static) |
| 17 | Scroll Based Velocity | Magic UI registry source | motion | Partial (moves at base speed) | Yes | MIT | One ticker on home (services words or logos) | Service detail pages, two rows | USE |
| 18 | Bento Grid | Magic UI registry source | @radix-ui/react-icons, shadcn button | n/a (CSS hover) | Yes, CTA visible | MIT | Services bento (home + Services) | Testimonials/team | USE |
| 19 | Accordion | Spectrum registry source + repo CSS | @radix-ui/react-accordion, lucide-react | Streaming yes; height anim no | Yes | Apache-2.0 | FAQ on Services/Shopify/Contact; process steps | Nav menus | USE |
| 20 | Animated Card | Spectrum registry source | framer-motion, next/image | No | Hidden below md | Apache-2.0 | About "our stack" (desktop only, rebuilt) | Any mobile-required section | SKIP |

## 14. Recommended motion budget

Ship these four together for a premium, light page: **Bento Grid** (services, CSS only) + **Interactive Grid Pattern** *or* static **Dot Pattern** as the single hero background (never both; prefer a CSS radial-gradient dot texture if the DOM count matters) + **one Scroll Based Velocity row** (the only rAF loop on the page, pauses off-screen) + **Spectrum Accordion** for FAQ (Radix, CSS keyframes, add `motion-reduce`). Optional fifth: **Carousel Squeeze** for case studies (CSS transitions, no library), which keeps `motion` to a single import site (the ticker) and avoids `framer-motion` entirely.

Conflicting combinations: Dot Pattern glow + Floating Icons + Scroll Velocity = three continuous animation loops (and Floating Icons adds 16 mousemove layout reads); Smooth Cursor + Interactive Grid or Floating Icons = two pointer-driven effects with the native cursor hidden; Smooth Cursor + any drag carousel (Embla/Swiper cursors) = lost affordances; Floating Icons in the hero + Interactive Grid in the hero = two competing backgrounds behind the H1; `framer-motion` (Spectrum Animated Card) + `motion/react` (Magic UI) = one engine imported twice unless aliased. Gradient budget: one gradient-bordered bento card, one gradient text span in the hero, accent-only buttons; every background pattern at <= 10 % opacity of a single hue on black.
