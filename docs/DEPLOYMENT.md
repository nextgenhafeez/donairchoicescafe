# Deployment — donairchoicescafe.ca (GitHub Pages)

The website is live-hosted on **GitHub Pages**, free, with automatic HTTPS.

- **Repo:** https://github.com/nextgenhafeez/donairchoicescafe  (public, branch `main`)
- **Host:** GitHub Pages (source: `main` / root)
- **Custom domain:** donairchoicescafe.ca (set via the `CNAME` file in the repo)

## Step 1 — DNS at Namecheap (one-time)
Namecheap → **Domain List → Manage → Advanced DNS**. Delete the default
"CNAME Record @ → parkingpage" and any "URL Redirect Record", then add:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | Automatic |
| A | @ | 185.199.109.153 | Automatic |
| A | @ | 185.199.110.153 | Automatic |
| A | @ | 185.199.111.153 | Automatic |
| CNAME | www | nextgenhafeez.github.io. | Automatic |

Optional (IPv6): add four `AAAA` records for host `@`:
`2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`

DNS takes ~10 min to a few hours to propagate. Then GitHub auto-issues an SSL cert and the site
is live at https://donairchoicescafe.ca (and www redirects to it). Turn on **Enforce HTTPS** in the
repo's Settings → Pages once the cert shows ready.

## Step 2 — How to update the site later
Edit files in the `website/` folder, then from that folder:
```bash
git add -A
git commit -m "Update menu / hours / photos"
git push
```
GitHub rebuilds automatically in ~1 minute. (Or edit files directly on github.com.)

## Notes
- The `CNAME` file in the repo must always contain `donairchoicescafe.ca` — don't delete it.
- First thing to update: real phone number, hours, menu/prices, delivery + Instagram/X links,
  and real food photos (see `website/README.md`).
