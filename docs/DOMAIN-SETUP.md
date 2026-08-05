# Domain Setup — donairchoicescafe.ca

Everything you need to configure on the domain so the website works, plus what to add later
when we introduce a backend. Domain registrar: **Namecheap**.

---

## PART A — What the CURRENT (static) website needs

The site is static files (HTML/CSS/JS/images). To put it online you need **two things**:
a **host** to serve the files, and **DNS records** pointing the domain at that host.

### 1. Pick a host (free options recommended)
| Host | Cost | How you deploy | SSL |
|------|------|----------------|-----|
| **Netlify** (recommended) | Free | Drag-drop the `website/` folder, or connect Git | Auto |
| **Cloudflare Pages** | Free | Upload folder or connect Git | Auto |
| Namecheap shared hosting | Paid | Upload `website/` contents to `public_html/` via cPanel/FTP | Included |

### 2. DNS records (in Namecheap → Domain List → Manage → **Advanced DNS**)
You point the domain at the host in one of two ways — the host tells you which:

**Option 1 — Change nameservers (simplest).** Namecheap → Domain → **Nameservers → Custom DNS**,
paste the host's nameservers (Netlify/Cloudflare give you these). Done.

**Option 2 — Keep Namecheap DNS, add records:**
| Type | Host | Value | Purpose |
|------|------|-------|---------|
| `A` or `ALIAS`/`ANAME` | `@` | (IP / target the host gives you) | apex `donairchoicescafe.ca` |
| `CNAME` | `www` | your-site.netlify.app (host target) | `www.donairchoicescafe.ca` |

> Turn OFF Namecheap's default "Parking page" / URL-redirect records or they conflict.

### 3. HTTPS + www redirect
- The host issues a **free SSL certificate** automatically (Let's Encrypt). Wait for it to say "active".
- In the host settings, enable **redirect `www` → apex** (or vice-versa) so both URLs work.

### 4. (Optional) Branded email — `info@donairchoicescafe.ca`
Email is separate from the website and needs **MX records**:
- **Namecheap Private Email**, **Zoho Mail** (free tier), or **Google Workspace** (paid).
- Add the provider's MX/TXT records in Advanced DNS. (Not required for the website to work.)

### ✅ Static-site checklist
- [ ] Site deployed to a host
- [ ] Apex (`@`) and `www` DNS records point to the host
- [ ] SSL active (site loads on `https://`)
- [ ] `www` ↔ apex redirect works
- [ ] Submit `https://donairchoicescafe.ca/sitemap.xml` in Google Search Console
- [ ] Add the URL to the Google Business Profile

---

## PART B — What we ADD later for a backend (API + database)

Only needed once we build dynamic features (online ordering, reservations, contact form, admin menu editor).

### 1. A subdomain for the API
Add one DNS record pointing a subdomain to wherever the backend runs:
| Type | Host | Value | Result |
|------|------|-------|--------|
| `CNAME` | `api` | (backend host target, e.g. `donair-api.onrender.com`) | `api.donairchoicescafe.ca` |

The website (frontend) then calls `https://api.donairchoicescafe.ca/...`.

### 2. Where the backend runs (pick one)
Node/Express API hosts with free tiers: **Render**, **Railway**, **Fly.io**, or **Vercel/Netlify Functions**.
Set environment variables there (from `backend/.env`): `MONGODB_URI`, `DB_NAME`, `ALLOWED_ORIGINS`.

### 3. Database — MongoDB Atlas
Already created (cluster `your MongoDB Atlas cluster`). See the `backend/` folder for the connection scaffold.
security, and the two required settings: **Network Access** (allow the backend's IP) and a **Database User**.

### 4. CORS
The API must allow the website origin. `ALLOWED_ORIGINS` in `.env` already lists
`https://donairchoicescafe.ca` and `www` — the API reads this so the browser can call it safely.

### ✅ Backend-ready checklist (future)
- [ ] `api.` subdomain CNAME → backend host
- [ ] Backend deployed with env vars set
- [ ] Atlas Network Access allows the backend host
- [ ] CORS allows the website origin
- [ ] Frontend points to `https://api.donairchoicescafe.ca`
