# Deploying to Netlify

## Why not drag-and-drop a zip

That was the first approach, and it kept serving stale content even after
Netlify's dashboard said "Published". The root cause we actually found and
fixed (Windows' zip tools write folder separators as `\`, which a Linux
unzip reads as part of the filename instead of a path, so every nested
asset silently 404s) is fixed in `scripts/build-netlify-drop.mjs` — but a
manual zip-and-drag is still an extra step that is easy to get out of sync
with the latest commit. Connecting the GitHub repo removes the step
entirely: Netlify builds straight from the branch, every push.

## One-time setup

1. [app.netlify.com](https://app.netlify.com) → **Add new site → Import an
   existing project**.
2. Pick **GitHub**, authorize, then select `Arhamch007/eComet-app`.
3. Branch to deploy: `redesign/v2` (or `main`, once this is merged).
4. Build settings — `netlify.toml` in this repo already sets these, so the
   form should show them automatically:
   - Build command: `node scripts/build-netlify-drop.mjs`
   - Publish directory: `out`
5. Click **Deploy**. Netlify builds on its own servers (no zip, no local
   step) and gives you a `*.netlify.app` URL.

## After that

Every `git push` to the connected branch triggers a new build automatically.
Nothing to drag, nothing to remember to rebuild locally.

- The deployed site is `noindex` (search engines are told to skip it) until
  the real launch, so it's safe to leave connected and sharable without
  worrying about it getting indexed instead of the real domain.
- The site's canonical URL, sitemap and share image automatically point at
  whatever `*.netlify.app` address Netlify assigns — no manual URL to set.
- Old multi-page routes (`/services`, `/work`, `/about`, `/team`,
  `/contact`) redirect to the matching section, and the security headers
  (CSP, HSTS, etc.) are applied — same as the real domain will get.

## Going live on teamecomet.com

When ready to launch for real:

1. In the Netlify site's **Build & deploy** settings, change the build
   command to: `node scripts/build-netlify-drop.mjs --production`
2. **Domain settings** → add `teamecomet.com` as a custom domain and follow
   Netlify's DNS instructions.
3. Push once (or trigger a redeploy) so the new build command runs with
   `NEXT_PUBLIC_NOINDEX=0`, making the production build indexable.
