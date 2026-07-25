# Donair Choices Cafe — Website

A fast, elegant, mobile-friendly one-page website for **Donair Choices Cafe**
(8120 Beddington Blvd NW, Calgary, AB). Built as plain HTML/CSS/JS — no build step,
no framework, hosts anywhere.

Live domain (once deployed): **https://donairchoicescafe.ca**

---

## 1. Folder structure

```
website/
├─ index.html              ← the whole page (all sections)
├─ css/styles.css          ← all styling + the brand colors
├─ js/main.js              ← menu filter, mobile nav, gallery lightbox, hours
├─ assets/
│  ├─ logo/                ← recreated logo (SVG) + favicon + social image
│  │  ├─ donair-choices-logo.svg        (main — chrome text, for dark backgrounds)
│  │  ├─ donair-choices-logo-dark.svg   (dark text — for light backgrounds/print)
│  │  ├─ favicon.svg                     (browser tab icon)
│  │  ├─ apple-touch-icon.png            (iOS home-screen icon)
│  │  └─ og-image.png                    (preview image when the link is shared)
│  └─ images/              ← food photos (.webp) + gallery/
├─ robots.txt · sitemap.xml · site.webmanifest
└─ README.md               ← this file
```

## 2. Preview it on your computer

Just double-click `index.html` — it opens in your browser. That's it.
(The Google Map only loads when the files are on the internet or served locally; everything else works offline.)

---

## 3. ⚠️ Placeholder content to replace before/after launch

Everything below is **sample data** so the site looks complete. Replace with the real info:

| What | Where | Current placeholder |
|------|-------|---------------------|
| **Phone number** | search `+15875550000` and `(587) 555-0000` in `index.html` | fake 555 number |
| **Opening hours** | `index.html` → the `<ul class="hours">` list, and the `openingHoursSpecification` block near the top | sample hours |
| **Menu items & prices** | `index.html` → `<section class="menu">` | realistic sample menu |
| **Food photos** | `assets/images/*.webp` | free stock photos (see §6) |
| **Delivery links** | search `ubereats.com` / `doordash.com` / `skipthedishes.com` | platform home pages |
| **Social links** | search `facebook.com` / `instagram.com` / `twitter.com` | platform home pages |

When ready, remove the yellow **"Sample menu"** note: delete the `<p class="menu-note">…</p>` line in `index.html`.

### Editing the menu
Each dish is one line like this — copy, edit, or delete:
```html
<div class="item"><div class="item-main">
  <div class="item-name">Beef Donair Wrap <span class="tag tag--pop">Popular</span></div>
  <p class="item-desc">Spiced beef, sweet donair sauce, tomato & onion in warm pita.</p>
</div><span class="item-dots"></span><span class="item-price">$12.99</span></div>
```
Tags available: `tag--halal`, `tag--spicy`, `tag--veg`, `tag--pop` (popular).

### Swapping a photo
Replace the file in `assets/images/` keeping the **same filename** (e.g. `poutine.webp`) and it updates everywhere. Keep images ~900px wide and saved as `.webp` for speed.

---

## 4. Publish it (free) + connect your domain

You bought `donairchoicescafe.ca` at Namecheap. Pick one free host:

### Option A — Netlify (easiest, drag-and-drop)
1. Go to **app.netlify.com** → sign up (free).
2. Drag the **`website`** folder onto the "deploy" area. It goes live on a `*.netlify.app` URL.
3. **Domain settings → Add custom domain →** `donairchoicescafe.ca`.
4. Netlify shows DNS records. In **Namecheap → Domain List → Manage → Advanced DNS**, add them:
   - Either point the **nameservers** to Netlify (simplest), **or** add the records Netlify lists
     (an `A`/`ALIAS` for the apex and a `CNAME` `www` → your Netlify subdomain).
5. Netlify issues a free HTTPS certificate automatically. Enable "www → apex" redirect in Netlify.

### Option B — Cloudflare Pages
1. **pages.cloudflare.com** → create a project → upload the `website` folder (or connect a Git repo).
2. Add custom domain `donairchoicescafe.ca`; Cloudflare walks you through the DNS.

> Namecheap shared hosting also works: upload the contents of `website/` to `public_html/` via cPanel/FTP.

---

## 5. After launch — get found on Google
- Create / claim the **Google Business Profile** for the cafe (address, hours, phone, photos, this website URL).
- In **Google Search Console**, add the domain and submit `https://donairchoicescafe.ca/sitemap.xml`.
- The page already includes `Restaurant` structured data (address, hours, rating, menu) for rich results —
  test it at **search.google.com/test/rich-results**.

## 6. Image & font credits
- Photos are free-to-use stock from **Pexels** (Pexels License — free for commercial use, no attribution required),
  used as **placeholders**. Replacing them with real photos of your food is recommended.
- Fonts: **Poppins**, **DM Sans**, **Kaushan Script** (Google Fonts, open source).
- Logo: recreated as vector SVG from the storefront sign.

## 7. The logo
`assets/logo/donair-choices-logo.svg` is a clean, scalable recreation of the sign (red lens swooshes +
chrome "DONAIR / Choices / CAFE"). It stays crisp at any size — use it for the site, print, menus, or signage.
Use `-dark.svg` on white/light backgrounds. Tweaks to the logo (exact brush shape, thickness) can be made on request.
