## LegalGrup Website (v1.1 — Without Telegram and Bitrix API)

Marketing site for LegalGrup: a multilingual law-firm website that highlights services, attorneys, and contact options for clients in Moldova and abroad. Built with Next.js App Router.

### Who it is for
- Prospective clients looking to understand LegalGrup services and attorneys.
- Existing clients who need quick access to contact details and office info.
- Editors who want to localize content (EN/RO/RU) without code changes.

### What it does
- Hero and services pages with practice areas, team highlights, and engagement programs.
- Contact flow with modal forms and hotline/email/office details (no Telegram or Bitrix API integrations in this version).
- Language switcher with locale-aware routing.
- Responsive layout tuned for desktop and mobile.

### Tech stack
- Next.js (App Router), TypeScript, TailwindCSS, Framer Motion for animations.
- Custom i18n setup in `lib/i18n` with locale-aware routing via `app/[locale]/`.

### Running locally
```bash
npm install
npm run dev
# open http://localhost:3000
```

### Content quick links
- Translations: `lib/i18n/translations/{en,ro,ru}.ts`
- Shared layout & nav: `app/components/SiteChrome.tsx`
- Pages: `app/[locale]/*`

### Versioning
- Current release: **1.1** — Without Telegram and Bitrix API integrations.
