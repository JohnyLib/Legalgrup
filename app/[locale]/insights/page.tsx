"use client";

import { useState, lazy, Suspense } from "react";
const Modal = lazy(() => import("../../components/Modal").then(m => ({ default: m.Modal })));
const ContactForm = lazy(() => import("../../components/Forms").then(m => ({ default: m.ContactForm })));
import {
  PageShell,
  ArrowRightIcon,
  CheckIcon,
  BriefcaseIcon,
  GlobeIcon,
  PhotoPlaceholder,
} from "../../components/SiteChrome";
import { useTranslations } from "../../../lib/i18n/context";

// Articles data - можно позже переместить в базу данных или CMS
const articles = [
  {
    title: "Closing a cross-border acquisition in 45 days",
    summary: "How disciplined checklists and negotiation playbooks shortened the path to signing.",
    tag: "Transactions",
    date: "Oct 2025",
  },
  {
    title: "Employment investigations that protect culture",
    summary: "Practical steps for sensitive exits, documentation, and stakeholder alignment.",
    tag: "Employment",
    date: "Sep 2025",
  },
  {
    title: "Regulatory paths for fintech expansion",
    summary: "Licensing maps, regulator dialogue, and data controls for new markets.",
    tag: "Regulatory",
    date: "Aug 2025",
  },
  {
    title: "Winning quietly: settlement strategy in disputes",
    summary: "Designing scenarios, costs, and deadlines to reach the right outcome sooner.",
    tag: "Disputes",
    date: "Jul 2025",
  },
  {
    title: "Board readiness for high-velocity companies",
    summary: "Board packs, delegations, and approvals that keep leadership aligned.",
    tag: "Corporate",
    date: "Jun 2025",
  },
  {
    title: "Data rooms that help you negotiate",
    summary: "Building datarooms that reduce diligence friction and increase leverage.",
    tag: "Transactions",
    date: "May 2025",
  },
];


export default function InsightsPage() {
  const { t } = useTranslations();
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <PageShell>
        <Hero />
        <Articles />
        <Library />
        <Newsletter onSubscribe={() => setIsContactOpen(true)} />
      </PageShell>

      {isContactOpen && (
        <Suspense fallback={null}>
          <Modal
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
            title={t.forms.newsletter.title}
            size="md"
          >
            <Suspense fallback={<div className="p-6">Loading...</div>}>
              <ContactForm
                onSubmit={(data) => {
                  console.log("Newsletter subscription:", data);
                  setIsContactOpen(false);
                  alert(t.forms.newsletter.success);
                }}
              />
            </Suspense>
          </Modal>
        </Suspense>
      )}
    </>
  );
}

function Hero() {
  const { t } = useTranslations();
  const tags = [
    t.insights.hero.tags.corporateDeals,
    t.insights.hero.tags.disputes,
    t.insights.hero.tags.employment,
    t.insights.hero.tags.regulatory,
  ];

  return (
    <section
      className="relative mt-8 overflow-hidden rounded-[32px] border border-[#efe5d4] bg-white shadow-[0_22px_60px_rgba(15,23,42,0.12)]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,214,153,0.16),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(87,134,255,0.12),transparent_35%)]" />
        <div className="absolute right-[-120px] top-[-60px] h-[240px] w-[240px] rotate-6 rounded-[40px] border border-dashed border-[#e8dfd4]" />
      </div>
      <div className="relative grid gap-10 px-6 py-10 md:px-12 md:py-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-center gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#efe5d4] px-4 py-2 text-sm font-semibold tracking-tight text-[#8b5e2b] shadow-sm">
            <BriefcaseIcon className="h-4 w-4" />
            {t.insights.hero.badge}
          </div>
          <div className="space-y-3">
            <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-[#0f172a] md:text-5xl">
              {t.insights.hero.title}
            </h1>
            <p className="text-lg leading-8 text-slate-600 md:max-w-2xl">
              {t.insights.hero.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-slate-700">
            {tags.map((item) => (
              <span key={item} className="rounded-full border border-[#f1e6d7] bg-[#fdfaf5] px-4 py-2 font-semibold text-[#0f172a]">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="relative rounded-[28px] border border-[#f1e6d7] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.15)]">
          <div className="flex items-start gap-3 rounded-2xl bg-[#fdfaf5] px-4 py-3 ring-1 ring-[#f1e6d7]">
            <CheckIcon className="mt-1 h-5 w-5 text-[#7a5326]" />
            <div>
              <p className="text-sm font-semibold text-[#0f172a]">{t.insights.hero.newsItems.dealRoomKit.label}</p>
              <p className="text-sm text-slate-700">{t.insights.hero.newsItems.dealRoomKit.description}</p>
            </div>
          </div>
          <div className="mt-3 flex items-start gap-3 rounded-2xl bg-[#0f172a] px-4 py-3 text-white shadow-[0_14px_30px_rgba(15,23,42,0.25)]">
            <GlobeIcon className="mt-1 h-6 w-6 text-[#ffd699]" />
            <div>
              <p className="text-sm font-semibold">{t.insights.hero.newsItems.crossBorderBrief.title}</p>
              <p className="text-sm text-white/80">{t.insights.hero.newsItems.crossBorderBrief.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Articles() {
  const { t } = useTranslations();

  return (
    <section
      className="mt-16 space-y-8"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{t.insights.articles.subtitle}</p>
          <h2 className="font-display text-3xl font-semibold text-[#0f172a]">{t.insights.articles.title}</h2>
          <p className="text-base text-slate-600 md:max-w-2xl">{t.insights.articles.description}</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full border border-[#e5d8c7] px-5 py-3 text-sm font-semibold text-[#8b5e2b] transition hover:-translate-y-[1px] hover:border-[#d2b78f] hover:shadow-md">
          {t.insights.articles.viewAllInsights}
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <article
            key={article.title}
            className="flex h-full flex-col rounded-2xl border border-[#efe5d4] bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
          >
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              <span>{article.tag}</span>
              <span>{article.date}</span>
            </div>
            <h3 className="mt-3 font-display text-xl font-semibold text-[#0f172a]">{article.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">{article.summary}</p>
            <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#8b5e2b]">
              {t.insights.articles.readMemo}
              <ArrowRightIcon className="h-4 w-4" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Library() {
  const { t } = useTranslations();

  return (
    <section
      className="mt-16 rounded-[28px] border border-[#efe5d4] bg-white p-8 shadow-[0_18px_48px_rgba(15,23,42,0.14)]"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{t.insights.library.subtitle}</p>
          <h2 className="font-display text-3xl font-semibold text-[#0f172a]">{t.insights.library.title}</h2>
        </div>
        <div className="rounded-full bg-[#f3eadc] px-4 py-2 text-sm font-semibold text-[#8b5e2b]">{t.insights.library.downloadReady}</div>
      </div>
      <div className="mt-6 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
        {t.insights.library.highlights.map((item) => (
          <div key={item} className="flex items-start gap-3 rounded-2xl bg-[#fdfaf5] px-4 py-3 ring-1 ring-[#f1e6d7]">
            <CheckIcon className="mt-1 h-4 w-4 text-[#7a5326]" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function PhotoSlots() {
  const { t } = useTranslations();

  return (
    <section
      className="mt-16 rounded-[28px] border border-[#efe5d4] bg-white p-8 shadow-[0_18px_48px_rgba(15,23,42,0.14)]"
    >
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          {t.insights.photos.subtitle}
        </p>
        <h3 className="font-display text-3xl font-semibold text-[#0f172a]">
          {t.insights.photos.title}
        </h3>
        <p className="text-base text-slate-600">
          {t.insights.photos.description}
        </p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <PhotoPlaceholder label={t.insights.photos.articleCover} note="1200x800" />
        <PhotoPlaceholder label={t.insights.photos.teamSpeaking} note="1400x900" />
        <PhotoPlaceholder label={t.insights.photos.eventWorkshop} note="1400x900" />
      </div>
    </section>
  );
}

function Newsletter({ onSubscribe }: { onSubscribe: () => void }) {
  const { t } = useTranslations();
  const tags = [
    t.insights.newsletter.tags.deals,
    t.insights.newsletter.tags.disputes,
    t.insights.newsletter.tags.employment,
    t.insights.newsletter.tags.regulatory,
  ];

  return (
    <section
      className="mt-16 overflow-hidden rounded-[32px] border border-[#efe5d4] bg-gradient-to-r from-[#0f172a] via-[#15213a] to-[#0f172a] p-8 text-white shadow-[0_18px_48px_rgba(15,23,42,0.2)]"
    >
      <div className="grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-center">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">{t.insights.newsletter.subtitle}</p>
          <h3 className="font-display text-3xl font-semibold">{t.insights.newsletter.title}</h3>
          <p className="text-sm text-white/80">{t.insights.newsletter.description}</p>
          <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.12em] text-white/70">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/10 px-3 py-1">{tag}</span>
            ))}
          </div>
        </div>
        <div
          className="grid gap-3 rounded-[24px] border border-white/10 bg-white/10 p-4 text-sm"
        >
          <input
            className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-3 text-white placeholder:text-white/60 outline-none transition focus:border-[#ffd699]"
            placeholder={t.forms.newsletter.name}
          />
          <input
            className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-3 text-white placeholder:text-white/60 outline-none transition focus:border-[#ffd699]"
            placeholder={t.forms.newsletter.email}
            type="email"
          />
          <button 
            type="button"
            onClick={onSubscribe}
            className="inline-flex items-center justify-center rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#0f172a] transition hover:-translate-y-[1px] hover:shadow-lg"
          >
            {t.forms.newsletter.subscribe}
          </button>
          <p className="text-xs text-white/70">{t.forms.newsletter.noSpam}</p>
        </div>
      </div>
    </section>
  );
}

