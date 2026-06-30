# NexaBuild Website

Bilingual (AR/EN) agency website for NexaBuild — built with Next.js 16, Tailwind CSS v4, and next-intl.

**Live site:** https://nexabuild.cloud

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Create local env file
echo "NEXT_PUBLIC_FORMSPREE_ID=your_id_here" > .env.local

# 3. Start dev server
npm run dev
```

Open http://localhost:3000 — redirects to `/ar` by default.

| URL | Page |
|-----|------|
| http://localhost:3000/ar | Arabic homepage |
| http://localhost:3000/en | English homepage |
| http://localhost:3000/ar/contact | Arabic contact page |
| http://localhost:3000/en/contact | English contact page |

---

## Build

```bash
# Production build (also generates sitemap.xml)
npm run build

# Run the production build locally
npm start
```

---

## Deploy to VPS

### First time only
```bash
bash setup-server.sh
```
Then SSH in and set your real Formspree ID:
```bash
ssh root@172.245.138.214 "nano /var/www/nexabuild/.env.local"
```

### Every deploy
```bash
bash deploy.sh
```

Rsyncs code → installs deps → builds → restarts PM2. Same pattern as Jordan Automation.

### SSL (after DNS is pointed to the server)
```bash
ssh root@172.245.138.214 "certbot --nginx -d nexabuild.cloud -d www.nexabuild.cloud"
```

### Check logs
```bash
ssh root@172.245.138.214 "pm2 logs nexabuild"
```

---

## Project Structure

```
nexabuild/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx        # sets lang + dir (RTL/LTR) + Google Fonts
│   │   ├── page.tsx          # homepage (all sections)
│   │   └── contact/page.tsx  # contact form
│   └── globals.css           # Tailwind v4 design tokens
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── WhatsAppButton.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── Services.tsx
│       ├── Portfolio.tsx
│       ├── Pricing.tsx
│       ├── WhyUs.tsx
│       └── Testimonials.tsx
├── hooks/
│   └── useInView.ts          # scroll-triggered fade-in animations
├── messages/
│   ├── ar.json               # all Arabic strings
│   └── en.json               # all English strings
├── public/
│   ├── brand/                # logo.svg, logo-dark.svg, favicon.svg
│   └── portfolio/            # project screenshots (add manually)
├── i18n/
│   ├── routing.ts            # locale config (ar default, en)
│   └── request.ts            # next-intl server config
├── proxy.ts                  # next-intl routing middleware (Next.js 16)
├── deploy.sh                 # VPS deploy script
└── setup-server.sh           # one-time server setup
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_FORMSPREE_ID` | Formspree form ID — get from formspree.io |
| `PORT` | Server port (VPS uses 3002, local defaults to 3000) |

---

## Adding Content

**Translations** — all text is in `messages/ar.json` and `messages/en.json`. No hardcoded strings in components.

**Portfolio images** — add 800×500px screenshots to `/public/portfolio/`:
- `jordan3dprint.png`
- `jordan-automation.png`

**Logo** — replace `/public/brand/logo.svg` with your final export from Canva/Looka.

**OG image** — add a 1200×630px image at `/public/brand/og.png` for WhatsApp/social previews.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 |
| Styling | Tailwind CSS v4 |
| i18n | next-intl 4 |
| Forms | Formspree |
| Fonts | Inter (EN) + Tajawal (AR) |
| Deploy | Ubuntu VPS · PM2 · Nginx · port 3002 |
