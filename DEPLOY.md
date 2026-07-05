# DEPLOY.md — going live on mooonman.com

This site is a static Astro build. Nothing has been deployed or registered on your
behalf — follow these steps yourself. Should take about 15 minutes.

## 1. Push to GitHub

```bash
# from the project root
git remote add origin https://github.com/<your-username>/mooonman.com.git
git branch -M main
git push -u origin main
```

If you don't have a repo yet, create an empty one first at github.com/new (no README,
no .gitignore — this project already has them), then run the commands above.

## 2. Connect Cloudflare Pages

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Authorize GitHub and select the `mooonman.com` repo.
4. Build settings:
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node version**: 22 (set `NODE_VERSION=22` in Environment Variables if Cloudflare
     doesn't auto-detect it from `package.json`'s `engines` field)
5. Click **Save and Deploy**. First deploy will be live at `<project-name>.pages.dev`.

## 3. Point mooonman.com at Cloudflare

If mooonman.com isn't already on Cloudflare DNS:

1. **Workers & Pages** isn't required for this part — go to the main Cloudflare
   dashboard → **Add a site** → enter `mooonman.com`.
2. Cloudflare scans your existing DNS and shows you the records it found. Keep them
   (or recreate any you need — mail records especially, if you use email at this
   domain).
3. Cloudflare gives you two nameservers, e.g.:
   ```
   ns1.cloudflare.com
   ns2.cloudflare.com
   ```
   (Your actual values will be shown in the dashboard — they're unique per account.)
4. Go to your domain registrar (wherever mooonman.com was purchased) and replace the
   existing nameservers with the two Cloudflare gives you.
5. Wait for Cloudflare to confirm the switch (can take a few minutes to ~24 hours,
   usually fast).

## 4. Add the custom domain to the Pages project

1. In the Pages project → **Custom domains** → **Set up a custom domain**.
2. Enter `mooonman.com` (apex). Cloudflare automatically creates the required DNS
   record for you:
   ```
   Type: CNAME
   Name: mooonman.com (@)
   Target: <project-name>.pages.dev
   Proxy status: Proxied (orange cloud)
   ```
   Cloudflare flattens this CNAME-at-apex automatically — no manual A records needed.
3. Repeat **Set up a custom domain** for `www.mooonman.com`. This creates:
   ```
   Type: CNAME
   Name: www
   Target: <project-name>.pages.dev
   Proxy status: Proxied (orange cloud)
   ```
4. Decide which is canonical (apex is the natural choice here, since that's what's in
   `astro.config.mjs`'s `site` value and used for canonical URLs / sitemap). Add a
   redirect rule so `www` doesn't serve duplicate content:
   - **Rules** → **Redirect Rules** → **Create rule**.
   - When incoming requests match: Hostname equals `www.mooonman.com`.
   - Then: Dynamic redirect → `https://mooonman.com/${request.uri.path}`, status 301.

## 5. Verify

- Visit `https://mooonman.com` and `https://www.mooonman.com` — both should load over
  HTTPS with a valid certificate (Cloudflare issues this automatically, may take a few
  minutes after the domain is added).
- Check `https://mooonman.com/sitemap-index.xml` and `/robots.txt` resolve.
- Every push to `main` on GitHub triggers a new Pages deploy automatically — no further
  setup needed.

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
