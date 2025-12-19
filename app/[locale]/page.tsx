"use client";

import { useState, lazy, Suspense } from "react";
const Modal = lazy(() => import("../components/Modal").then(m => ({ default: m.Modal })));
const ConsultationForm = lazy(() => import("../components/Forms").then(m => ({ default: m.ConsultationForm })));
import {
  PageShell,
  CheckIcon,
  ArrowRightIcon,
  BriefcaseIcon,
  BuildingIcon,
  ShieldIcon,
  UsersIcon,
  GlobeIcon,
  useTheme,
} from "../components/SiteChrome";
import { useTranslations } from "../../lib/i18n/context";
import { LocalizedLink } from "../../lib/i18n/link";

export default function HomePage() {
  const { t } = useTranslations();
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <>
      <PageShell>
        <Hero onBookConsultation={() => setIsConsultationOpen(true)} />
        <PracticeAreas />
        <ResultsAndTestimonials />
        {/* <TeamSection /> */}
        <ConsultationCTA onBookConsultation={() => setIsConsultationOpen(true)} />
      </PageShell>

      {isConsultationOpen && (
        <Suspense fallback={null}>
          <Modal
            isOpen={isConsultationOpen}
            onClose={() => setIsConsultationOpen(false)}
            title={t.forms.consultation.title}
            size="lg"
          >
            <Suspense fallback={<div className="p-6">Loading...</div>}>
              <ConsultationForm
                onSubmit={(data) => {
                  console.log("Consultation form submitted:", data);
                  setIsConsultationOpen(false);
                  alert(t.forms.consultation.success);
                }}
              />
            </Suspense>
          </Modal>
        </Suspense>
      )}
    </>
  );
}

function Hero({ onBookConsultation }: { onBookConsultation: () => void }) {
  const { t } = useTranslations();
  const achievements = t.home.results.items;
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <section
      className={`relative mt-8 overflow-hidden rounded-[32px] border ${
        isDark
          ? "border-[#1f2a44] bg-gradient-to-br from-[#0b1221] via-[#0a0f1c] to-[#101a33] shadow-[0_32px_110px_rgba(0,0,0,0.55)]"
          : "border-[#efe5d4] bg-white shadow-[0_22px_60px_rgba(15,23,42,0.12)]"
      }`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-[radial-gradient(circle_at_20%_20%,rgba(108,231,214,0.14),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(244,200,108,0.16),transparent_35%)]"
              : "bg-[radial-gradient(circle_at_20%_20%,rgba(255,214,153,0.16),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(87,134,255,0.12),transparent_35%)]"
          }`}
        />
        <div
          className={`absolute right-[-120px] top-[-60px] h-[260px] w-[260px] rotate-6 rounded-[40px] border border-dashed ${
            isDark ? "border-[#1f2a44]" : "border-[#e8dfd4]"
          }`}
        />
        <div
          className={`absolute left-[10%] top-[44%] h-[140px] w-[140px] rounded-full ${
            isDark ? "border-[#1b2642]" : "border-[#f2e7d9]"
          }`}
        />
      </div>
      <div className="relative grid gap-10 px-6 py-10 md:px-12 md:py-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-center gap-8">
          <div
            className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold tracking-tight shadow-sm ${
              isDark
                ? "bg-white/5 text-[var(--accent)] ring-1 ring-[var(--accent)]/30"
                : "bg-[#efe5d4] text-[#8b5e2b]"
            }`}
          >
            <ShieldIcon className="h-4 w-4" />
            {t.home.hero.badge}
          </div>
          <div className="space-y-4">
            <h1
              className={`font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl ${
                isDark ? "text-slate-50" : "text-[#0f172a]"
              }`}
            >
              {t.home.hero.title}
            </h1>
            <p
              className={`text-lg leading-8 md:max-w-2xl ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {t.home.hero.description}
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              onClick={onBookConsultation}
              className="rounded-full bg-gradient-to-r from-[var(--accent)] to-[#f59e0b] px-6 py-3 text-sm font-semibold text-[#0b0f1c] shadow-[0_18px_40px_rgba(244,200,108,0.35)] transition hover:-translate-y-px hover:shadow-[0_22px_52px_rgba(244,200,108,0.45)]"
            >
              {t.home.hero.bookConsultation}
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-4">
            {[
              { label: t.home.hero.retainedClients, value: "200+" },
              { label: t.home.hero.responseUnder24Hours, value: "24h" },
              { label: t.home.hero.yearsExperience, value: "10+" },
              { label: t.home.hero.mattersResolved, value: "1200+" },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`rounded-2xl px-4 py-3 shadow-sm backdrop-blur ${
                  isDark
                    ? "border border-[#1f2a44] bg-[#0f172a]/80 shadow-black/30"
                    : "border border-[#efe5d4] bg-[#fdfaf5] shadow-sm"
                }`}
              >
                <div
                  className={`text-xs uppercase tracking-[0.14em] ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {stat.label}
                </div>
                <div
                  className={`font-display text-2xl font-semibold ${
                    isDark ? "text-slate-100" : "text-[#0f172a]"
                  }`}
                >
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 translate-x-6 translate-y-6 rounded-3xl bg-[#0e1a33] opacity-50 blur-3xl" />
          <div
            className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0f192f] to-[#0a101f] text-white shadow-[0_24px_80px_rgba(0,0,0,0.55)] ring-1 ring-[#1f2a44]"
          >
            {/* Фоновое изображение с градиентом */}
            <div
              className={`absolute inset-0 ${
                isDark
                  ? "bg-[radial-gradient(circle_at_20%_20%,rgba(108,231,214,0.12),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(244,200,108,0.14),transparent_35%)]"
                  : "bg-[radial-gradient(circle_at_20%_20%,rgba(255,214,153,0.16),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(87,134,255,0.12),transparent_35%)]"
              }`}
            />
            <div
              className={`absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop')] bg-cover bg-center opacity-20 ${
                isDark ? "mix-blend-soft-light" : "mix-blend-overlay"
              }`}
            />
            
            <div className="relative space-y-6 p-8 sm:p-10">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/60">{t.home.hero.clientRating}</p>
                  <h3 className="font-display text-2xl font-semibold">4.9/5</h3>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10">
                  <ShieldIcon className="h-6 w-6 text-[#ffd699]" />
                </div>
              </div>
              
              {/* Дополнительная информация */}
              <div className="grid gap-3 text-sm text-white/80">
                <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                  <span className="font-semibold text-white">{t.home.hero.retainedClients}</span>
                  <span className="text-[#ffd699] font-semibold">400+</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                  <span className="font-semibold text-white">{t.home.hero.mattersResolved}</span>
                  <span className="text-[#ffd699] font-semibold">1200+</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                  <span className="font-semibold text-white">{t.home.hero.yearsExperience}</span>
                  <span className="text-[#ffd699] font-semibold">15+</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                  <span className="font-semibold text-white">{t.home.hero.responseUnder24Hours}</span>
                  <CheckIcon className="h-5 w-5 text-[#ffd699]" />
                </div>
              </div>
              
              {/* Достижения */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-white/70 mb-3">{t.home.results.subtitle}</p>
                <div className="space-y-2 text-sm text-white/90">
                  {achievements.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckIcon className="h-4 w-4 text-[#ffd699] mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type FeatureStory = {
  title: string;
  description: string;
  image: string;
  kicker: string;
  dateline: string;
  body: string[];
  highlights: string[];
};

function PracticeAreas() {
  const { t } = useTranslations();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const icons = [BuildingIcon, BriefcaseIcon, ShieldIcon, UsersIcon, GlobeIcon];
  const areas = t.home.practiceAreas.items;
  const stories: FeatureStory[] = areas.map((area, idx) => ({
    title: area.title,
    description: area.description,
    image: [
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    ][idx % 5],
    kicker: ["Case note", "Deal room report", "Litigation brief", "People & policy", "Regulator watch"][idx % 5],
    dateline: ["This week", "Q4 highlight", "In chambers", "Policy desk", "Regulator watch"][idx % 5],
    body: [
      "Partners translate board-level objectives into a legal path with clear decision points. Each mandate opens with a position memo, budget ranges, and a map of risks to retire first.",
      "We run structured sprints: fact pattern, options with trade-offs, and a closing checklist. Counsel, finance, and operations stay in the same thread with timelines that actually hold.",
    ],
    highlights: [
      "Partner-led intake and next steps inside 24 hours.",
      "Working draft pack delivered within 48 hours for priority matters.",
      "Escalation lanes to litigation, regulators, or negotiations without context loss.",
    ],
  }));

  const [activeStory, setActiveStory] = useState<FeatureStory | null>(null);

  return (
    <section className="mt-16 space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className={`text-xs uppercase tracking-[0.2em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            {t.home.practiceAreas.subtitle}
          </p>
          <h2
            className={`font-display text-3xl font-semibold ${
              isDark ? "text-slate-100" : "text-[#0f172a]"
            }`}
          >
            {t.home.practiceAreas.title}
          </h2>
          <p className={`text-base md:max-w-2xl ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            {t.home.practiceAreas.description}
          </p>
        </div>
        <LocalizedLink
          href="/services"
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition hover:-translate-y-px ${
            isDark
              ? "bg-white/5 text-[var(--accent)] ring-1 ring-[var(--accent)]/30 hover:shadow-[0_10px_30px_rgba(244,200,108,0.25)]"
              : "bg-[#f3eadc] text-[#8b5e2b] shadow-sm hover:shadow-md"
          }`}
        >
          {t.home.practiceAreas.viewAllServices}
          <ArrowRightIcon className="h-4 w-4" />
        </LocalizedLink>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stories.map((story, idx) => {
          const Icon = icons[idx % icons.length];
          return (
          <button
            key={story.title}
            type="button"
            onClick={() => setActiveStory(story)}
            className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 text-left transition duration-200 hover:-translate-y-1 ${
              isDark
                ? "border-[#1f2a44] bg-gradient-to-br from-[#0e1629] to-[#0a1121] shadow-[0_18px_40px_rgba(0,0,0,0.4)] hover:ring-1 hover:ring-[var(--accent)]/50"
                : "border-[#efe5d4] bg-white shadow-[0_16px_40px_rgba(15,23,42,0.12)] hover:shadow-[0_20px_50px_rgba(15,23,42,0.16)]"
            }`}
          >
            <div className="absolute right-[-24px] top-[-24px] h-28 w-28 rounded-full bg-[var(--accent)]/10 blur-2xl transition duration-200 group-hover:opacity-100" />
            <div
              className={`relative flex h-12 w-12 items-center justify-center rounded-xl text-[var(--accent)] shadow-inner ${
                isDark ? "bg-white/5 ring-1 ring-[#1f2a44]" : "bg-[#f3eadc] ring-1 ring-[#e8dfd4]"
              }`}
            >
              <Icon className="h-6 w-6" />
            </div>
            <h3
              className={`relative mt-5 font-display text-xl font-semibold ${
                isDark ? "text-slate-100" : "text-[#0f172a]"
              }`}
            >
              {story.title}
            </h3>
            <p
              className={`relative mt-2 text-sm leading-6 ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {story.description}
            </p>
            <div
              className={`relative mt-5 inline-flex items-center gap-2 text-sm font-semibold ${
                isDark ? "text-[var(--accent)]" : "text-[#8b5e2b]"
              }`}
            >
              {t.common.readMore}
              <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </button>
        );
        })}
      </div>

      {activeStory && (
        <Suspense fallback={null}>
          <Modal
            isOpen={!!activeStory}
            onClose={() => setActiveStory(null)}
            title={activeStory.title}
            size="xl"
          >
            <ArticleFeature story={activeStory} />
          </Modal>
        </Suspense>
      )}
    </section>
  );
}

function ArticleFeature({ story }: { story: FeatureStory }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div
        className={`relative overflow-hidden rounded-3xl border shadow-[0_22px_60px_rgba(0,0,0,0.4)] ${
          isDark ? "border-[#1f2a44] bg-[#0b1221]" : "border-[#efe5d4] bg-white shadow-[0_16px_44px_rgba(15,23,42,0.12)]"
        }`}
      >
        <img src={story.image} alt={story.title} className="h-full w-full object-cover" loading="lazy" />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${
            isDark
              ? "from-[#05070f] via-[#05070f]/50 to-transparent"
              : "from-black/40 via-black/10 to-transparent"
          }`}
        />
        <div className="absolute inset-x-0 bottom-0 space-y-3 p-6 text-white">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-300">{story.kicker}</p>
          <h3 className="font-display text-2xl font-semibold">{story.title}</h3>
          <p className="text-sm text-slate-200">{story.description}</p>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/15">
            {story.dateline}
          </span>
        </div>
      </div>
      <div className={`space-y-4 ${isDark ? "text-slate-200" : "text-slate-700"}`}>
        <div
          className={`rounded-2xl border p-4 shadow-inner ${
            isDark ? "border-[#1f2a44] bg-[#0f172a] shadow-black/20" : "border-[#efe5d4] bg-white shadow-[#e8dfd4]/40"
          }`}
        >
          <div className={`text-xs uppercase tracking-[0.18em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            Внутри файла
          </div>
          <p className={`mt-2 text-lg font-semibold ${isDark ? "text-slate-100" : "text-[#0f172a]"}`}>
            Партнёры комментируют каждый шаг
          </p>
          <p className={`mt-2 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            От фактов до ходатайств: объясняем риски и следующие решения.
          </p>
        </div>
        <div className="space-y-3 text-sm leading-6">
          {story.body.map((paragraph) => (
            <p key={paragraph} className={isDark ? "text-slate-200" : "text-slate-700"}>
              {paragraph}
            </p>
          ))}
        </div>
        <div
          className={`grid gap-3 rounded-2xl border p-4 text-sm shadow-inner ${
            isDark ? "border-[#1f2a44] bg-[#0f172a] shadow-black/20" : "border-[#efe5d4] bg-white shadow-[#e8dfd4]/40"
          }`}
        >
          <div className={`text-xs uppercase tracking-[0.18em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            Основное
          </div>
          {story.highlights.map((item) => (
            <div key={item} className={`flex items-start gap-2 ${isDark ? "text-slate-200" : "text-slate-700"}`}>
              <CheckIcon className="mt-0.5 h-4 w-4 text-[var(--accent)]" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultsAndTestimonials() {
  const { t } = useTranslations();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const results = t.home.results.items;
  const testimonials = t.home.testimonials.items;

  return (
    <section
      className="mt-16 grid gap-8 lg:grid-cols-2"
    >
      <div
        className={`rounded-[24px] p-8 ${
          isDark
            ? "border border-[#1f2a44] bg-[#0f172a] shadow-[0_16px_44px_rgba(0,0,0,0.4)]"
            : "border border-[#efe5d4] bg-white shadow-[0_16px_44px_rgba(15,23,42,0.12)]"
        }`}
      >
        <p className={`text-xs uppercase tracking-[0.2em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          {t.home.results.subtitle}
        </p>
        <h3
          className={`mt-2 font-display text-2xl font-semibold ${
            isDark ? "text-slate-100" : "text-[#0f172a]"
          }`}
        >
          {t.home.results.title}
        </h3>
        <div className={`mt-6 space-y-4 text-sm ${isDark ? "text-slate-200" : "text-slate-700"}`}>
          {results.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </div>
      <div
        className={`rounded-[24px] p-8 ${
          isDark
            ? "border border-[#1f2a44] bg-[#0f172a] shadow-[0_16px_44px_rgba(0,0,0,0.4)]"
            : "border border-[#efe5d4] bg-white shadow-[0_16px_44px_rgba(15,23,42,0.12)]"
        }`}
      >
        <p className={`text-xs uppercase tracking-[0.2em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          {t.home.testimonials.subtitle}
        </p>
        <h3
          className={`mt-2 font-display text-2xl font-semibold ${
            isDark ? "text-slate-100" : "text-[#0f172a]"
          }`}
        >
          {t.home.testimonials.title}
        </h3>
        <div className={`mt-6 space-y-4 text-sm ${isDark ? "text-slate-200" : "text-slate-700"}`}>
          {testimonials.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

// function TeamSection() {
//   const { t } = useTranslations();

//   return (
//     <section
//       className="mt-16 space-y-8"
//     >
//       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//         <div className="space-y-2">
//           <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{t.home.team.subtitle}</p>
//           <h2 className="font-display text-3xl font-semibold text-[#0f172a]">{t.home.team.title}</h2>
//           <p className="text-base text-slate-600 md:max-w-2xl">
//             {t.home.team.description}
//           </p>
//         </div>
//         <LocalizedLink
//           href="/attorneys"
//           className="inline-flex items-center gap-2 rounded-full bg-[#f3eadc] px-4 py-2 text-sm font-semibold text-[#8b5e2b] transition hover:-translate-y-px hover:shadow-md"
//         >
//           {t.home.team.viewAllAttorneys}
//           <ArrowRightIcon className="h-4 w-4" />
//         </LocalizedLink>
//       </div>
//       <div className="grid gap-6 md:grid-cols-3">
//         {[
//           { name: "Adrian Santoso", role: "Managing Partner", focus: "Corporate, M&A, board governance" },
//           { name: "Mira Lestari", role: "Partner", focus: "Disputes, arbitration, crisis response" },
//           { name: "Davin Lee", role: "Partner", focus: "Employment, investigations, compliance" },
//         ].map((attorney) => (
//           <div
//             key={attorney.name}
//             className="flex h-full flex-col rounded-2xl border border-[#efe5d4] bg-white p-6 shadow-sm"
//           >
//             <div className="flex items-center gap-3">
//               <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0f172a] text-lg font-semibold text-white">
//                 {attorney.name[0]}
//               </div>
//               <div>
//                 <h3 className="font-display text-xl font-semibold text-[#0f172a]">{attorney.name}</h3>
//                 <p className="text-sm text-slate-600">{attorney.role}</p>
//               </div>
//             </div>
//             <p className="mt-3 text-sm leading-6 text-slate-700">{attorney.focus}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

function ConsultationCTA({ onBookConsultation }: { onBookConsultation: () => void }) {
  const { t } = useTranslations();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const cta = t.home.consultationCta;

  return (
    <section
      className={`mt-16 overflow-hidden rounded-[32px] border shadow-[0_24px_70px_rgba(0,0,0,0.45)] ${
        isDark
          ? "border-[#1f2a44] bg-gradient-to-br from-[#0b1221] to-[#0f172a]"
          : "border-[#efe5d4] bg-white shadow-[0_16px_44px_rgba(15,23,42,0.12)]"
      }`}
    >
      <div className="relative grid gap-10 px-6 py-10 md:grid-cols-[1.05fr_0.95fr] md:px-12 md:py-14">
        <div
          className={`absolute right-[-120px] top-[-80px] h-72 w-72 rounded-full blur-3xl ${
            isDark ? "bg-[var(--accent)]/10" : "bg-[#f3eadc]/80"
          }`}
        />
        <div className="relative space-y-5">
          <p className={`text-xs uppercase tracking-[0.2em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            {cta.eyebrow}
          </p>
          <h3
            className={`font-display text-3xl font-semibold ${
              isDark ? "text-slate-100" : "text-[#0f172a]"
            }`}
          >
            {cta.title}
          </h3>
          <p className={`text-base ${isDark ? "text-slate-300" : "text-slate-600"}`}>{cta.description}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {cta.bullets.map((item) => (
              <div
                key={item}
                className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold shadow-inner ${
                  isDark
                    ? "border-[#1f2a44] bg-[#0f172a] text-slate-100 shadow-black/20"
                    : "border-[#efe5d4] bg-[#fdfaf5] text-[#0f172a] shadow-[#e8dfd4]/40"
                }`}
              >
                <CheckIcon className="h-5 w-5 text-[var(--accent)]" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div
            className={`absolute inset-0 translate-x-5 translate-y-5 rounded-[28px] blur-3xl ${
              isDark ? "bg-[#0f192f] opacity-50" : "bg-[#f3eadc]/70 opacity-60"
            }`}
          />
          <div
            className={`relative space-y-4 rounded-[28px] border p-6 ${
              isDark
                ? "border-[#1f2a44] bg-[#0f172a] shadow-[0_18px_44px_rgba(0,0,0,0.35)]"
                : "border-[#efe5d4] bg-white shadow-[0_14px_38px_rgba(15,23,42,0.12)]"
            }`}
          >
            <div>
              <p className={`text-xs uppercase tracking-[0.16em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                {cta.eyebrow}
              </p>
              <h4
                className={`font-display text-xl font-semibold ${
                  isDark ? "text-slate-100" : "text-[#0f172a]"
                }`}
              >
                {cta.lineTitle}
              </h4>
            </div>
            <button
              onClick={onBookConsultation}
              className="w-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[#f59e0b] px-5 py-3 text-sm font-semibold text-[#0b0f1c] shadow-[0_14px_30px_rgba(244,200,108,0.35)] transition hover:-translate-y-px hover:shadow-[0_18px_38px_rgba(244,200,108,0.45)]"
            >
              {cta.lineCta}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
