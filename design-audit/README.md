# eComet website design audit (2026-09-29)

Evidence pack for the redesign audit of https://teamecomet.com/. The synthesised report (executive summary, master mapping matrix, homepage blueprint, design system, remove list, flagged issues register, open questions and appendices) is the Claude Doc:

https://claude.ai/code/artifact/adb9d01f-d81e-4418-a40e-8a75df935b6b

This folder is untracked and weighs about 330 MB (1,065 screenshots). Add `design-audit/evidence/` to `.gitignore` if it should not be committed.

## Contents

- `reports/` – the five agent working notes with every finding tagged CONFIRMED or UNVERIFIED:
  - `agent1-baseline.md` – teamecomet.com section inventory, scores, tokens, 33 weaknesses, SEO check, FLAG register, screenshot index
  - `agent2-enterprise.md` – Stackworx, ArhamSoft, Arbisoft, Appinventiv teardowns
  - `agent3-studio.md` – Studiova, Dixor, Wevetech, Mau5tech, ZeynApp, Faheem Naveed teardowns
  - `agent4-components.md` – the ten Group B components: behaviour, stack, theming, cost, licence, fit
  - `agent5-conversion-seo.md` – trust matrix, CTA comparison, case-study structure, search content structure
- `evidence/<slug>/` – per site or page: `desktop-hero.png`, `desktop-full.png`, `mobile-hero.png`, `mobile-full.png`, `mobile-menu-open.png`, `sections/desktop-NN.png`, `sections/mobile-NN.png`, `extra-*.png` follow-ups and `data.json` (computed typography, colour tables, CSS variables, keyframes, buttons, links, images, layout, accessibility checks, animation markers, per-section metadata, hover diffs, network and library detection, performance timings). `teamecomet-*-v2` are recaptures with AOS forced visible.
- `evidence/lighthouse-*.report.{json,html}` – Lighthouse runs on headless Edge.
- `evidence/crawl-teamecomet.com.json` – fetch-based crawl with redirect chains and head data per page.
- `source/` – component source read for the engineering notes (Magic UI and Spectrum registries, 21st.dev demo files and compiled bundles).
- `harness/` – the capture scripts. `audit.js <url> <slug>` captures one page with playwright-core and Microsoft Edge (`npm i playwright-core` first); `batch.js <list.json> <concurrency>` runs a list; `crawl-light.js <origin>` crawls; `lh.js` runs Lighthouse.

Evidence standard: CONFIRMED means seen in a screenshot, `data.json`, DevTools-style extraction or page source, with the file named; UNVERIFIED means inferred. Nothing on teamecomet.com was changed; no site was logged into and no form was submitted.
