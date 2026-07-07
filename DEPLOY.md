# DEPLOY.md — going live on mooonman.com

This site is a static Astro build, hosted on DigitalOcean App Platform. Below is
what's actually been set up, for reference if you need to reproduce it (e.g. a new
app, a fresh clone, or handing this off to someone else).

## 1. GitHub

Repo: `github.com/Moon-Alpha32/mooonman.com`, branch `master`. Already pushed and
tracked — `git push` to `master` is all that's needed for future changes.

## 2. DigitalOcean App Platform

1. In the [DigitalOcean dashboard](https://cloud.digitalocean.com), go to **Apps** →
   **Create App** → **GitHub** → authorize/select `Moon-Alpha32/mooonman.com`, branch
   `master`.
2. **Important**: when configuring the resource, explicitly set the resource type to
   **Static Site**, not the autodetected **Web Service**. The Node.js buildpack
   detector defaults to Web Service, which provisions a paid container (~$24/mo)
   instead of the free static-site CDN path. If you land on the review screen and see
   a monthly cost with "vCPU / Memory / Containers" listed, delete that component and
   re-add it, picking Static Site explicitly.
3. Build settings:
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
   - Add env var `NODE_VERSION=22` only if it doesn't auto-detect Node 22 from
     `package.json`'s `engines` field.
4. Leave Add a database, environment variables, and VPC network alone — none apply to
   a static site.
5. Name the app something recognizable (not the auto-generated placeholder name), pick
   a datacenter region (doesn't materially matter — static content is served from DO's
   global CDN regardless of origin region), and create the app.
6. Total cost should show **$0.00/month** (DO's free tier covers up to 3 static sites,
   1 GiB outbound transfer/month each; additional apps are $3/mo).
7. First deploy will be live at `<app-name>.ondigitalocean.app`. Every push to
   `master` auto-deploys from here on.

## 3. Point mooonman.com at the app

1. In DigitalOcean, go to **Networking → Domains** → enter `mooonman.com` → choose
   **We manage your domain** (fine as long as nothing else — email, other
   subdomains — depends on the domain's current DNS; if it does, use **You manage
   your domain** instead and add records manually at your existing DNS host).
2. Copy the three nameservers DO gives you, e.g.:
   ```
   ns1.digitalocean.com
   ns2.digitalocean.com
   ns3.digitalocean.com
   ```
3. At your domain registrar, replace the existing nameservers with DO's three.
4. Wait for propagation (usually well under DO's stated 72h window). Check with:
   ```
   nslookup -type=ns mooonman.com
   ```
   until it returns DO's nameservers.
5. In the App → **Settings → Domains** → **Add Domain**, add `mooonman.com` (set as
   Primary) and `www.mooonman.com`. Once DNS has propagated, DO automatically creates
   the correct A/CNAME records and issues an HTTPS certificate — no manual record
   entry needed on this path.

## 4. Canonical domain redirect

`astro.config.mjs`'s `site` value is `https://mooonman.com` (apex is canonical), so
`www` should permanently redirect there:

1. App → **Settings → Domains** → **HTTP redirect rules** → **Add redirect rule**.
2. Redirect from: `www.mooonman.com` (no route path).
3. Redirect to: Domain or path in app → `mooonman.com` (no route path).
4. **Status code: 301 - Moved Permanently** (not the default 302 — 301 tells search
   engines the old URL is gone for good and consolidates indexing onto the apex).

## 5. Verify

- Visit `https://mooonman.com` and `https://www.mooonman.com` — both should load over
  HTTPS with a valid certificate, `www` redirecting to the apex.
- Check `https://mooonman.com/sitemap-index.xml` and `/robots.txt` resolve.

## Before you flip the switch: content still needed

Grep the repo for `PLACEHOLDER` to find every spot that needs real content before this
is truly done:

```bash
grep -rn "PLACEHOLDER" src/
```

This currently includes: the About section copy, GitHub/LinkedIn footer links, and all
three seed project entries (which should be replaced with real projects, or removed).

## Future (out of scope for v1 — do not build without a fresh scope decision)

- Blog / writing section
- Light mode or theme toggle
- Analytics (would need a consent flow — explicitly out per DESIGN.md §7)
- CMS integration for editing projects without touching markdown
- RSS feed for projects
- Project thumbnails/screenshots (cards already support them, just no assets yet)
