# LegalGrup Website

**Version 1.4.1 — Google Seach Console**

Official website of **LegalGrup**, a legal services platform focused on business and corporate law.
The project is built with **Next.js** and integrates **Bitrix24 CRM** and **Telegram** for lead management and notifications.

---

## 🚀 Tech Stack

* **Framework:** Next.js (App Router)
* **Runtime:** Node.js
* **Deployment:** Vercel (recommended)
* **Process Manager (VPS option):** PM2
* **CRM Integration:** Bitrix24 REST API
* **Notifications:** Telegram Bot API
* **Reverse Proxy (VPS option):** Nginx
* **SEO & Analytics:** Google Search Console, Google Analytics

---

## ✨ Features

* 🌐 Multilingual website (EN default, scalable)
* 📩 Lead form with server-side API
* 🤖 Automatic lead notifications to Telegram
* 📊 Automatic deal & contact creation in Bitrix24
* 🔐 Secure environment-based configuration
* ⚡ Optimized for SEO and fast loading
* ☁️ Serverless-ready (Vercel compatible)

---

## 📁 Project Structure (simplified)

```
/app
  /api
    /lead        → Lead submission API (Telegram + Bitrix24)
  /en            → English pages
  layout.tsx     → Global layout & metadata
  page.tsx       → Homepage

/public          → Static assets
/styles          → Global styles
```

---

## 🔧 Environment Variables

Create environment variables **(never commit them to GitHub)**.

### Required variables:

```env
B24_WEBHOOK_BASE=https://yourcompany.bitrix24.ru/rest/USER_ID/WEBHOOK_KEY/
TG_BOT_TOKEN=your_telegram_bot_token
TG_CHAT_ID=-100XXXXXXXXXX
```

### Notes:

* `B24_WEBHOOK_BASE` **must NOT include method name**
* Telegram bot must be added to the group/channel
* Use **Vercel → Project → Settings → Environment Variables**

---

## ▶️ Local Development

```bash
npm install
npm run dev
```

App will be available at:

```
http://localhost:3000
```

---

## 🏗️ Production Build

```bash
npm run build
npm run start
```

---

## ☁️ Deployment (Recommended: Vercel)

1. Import repository into **Vercel**
2. Framework: **Next.js**
3. Add Environment Variables
4. Deploy 🚀

Vercel automatically provides:

* HTTPS (SSL)
* CDN
* Serverless API for `/api/lead`

---

## 🌍 Custom Domain Setup (legalgrup.md)

### DNS Records (example for nic.md):

**A Record**

```
@ → 76.76.21.21
```

**CNAME**

```
www → cname.vercel-dns.com
```

⚠️ Remove conflicting AAAA (IPv6) records if present.

---

## 📊 CRM & Telegram Flow

```
Client submits form
        ↓
/api/lead (Next.js API)
        ↓
Create Contact + Deal (Bitrix24)
        ↓
Send notification (Telegram)
```

---

## 🛡️ Security Notes

* Do NOT expose `.env` values
* Protect API from spam (reCAPTCHA / Cloudflare Turnstile recommended)
* Block suspicious paths (`/.env`, `/phpinfo`, etc.) at CDN or proxy level

---

## 📈 SEO & Indexing

* Google Search Console ready
* Metadata handled via `layout.tsx`
* Clean URLs and fast TTFB via Vercel CDN
* Sitemap & robots.txt can be added easily

---

## 🧩 Version History

### v1.3

* ✅ Telegram Bot integration
* ✅ Bitrix24 CRM (Contact + Deal)
* ✅ Stable production deployment
* ✅ VPS issues resolved / Vercel-ready

---

## 📬 Support & Development

Project maintained by **LegalGrup**.
For development or integration inquiries, contact the project owner.

---
