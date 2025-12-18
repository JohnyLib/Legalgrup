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
  ScaleIcon,
  PhotoPlaceholder,
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
  return (
    <section
      className="relative mt-8 overflow-hidden rounded-[32px] border border-[#efe5d4] bg-white shadow-[0_22px_60px_rgba(15,23,42,0.12)]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,214,153,0.16),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(87,134,255,0.12),transparent_35%)]" />
        <div className="absolute right-[-120px] top-[-60px] h-[260px] w-[260px] rotate-6 rounded-[40px] border border-dashed border-[#e8dfd4]" />
        <div className="absolute left-[10%] top-[44%] h-[140px] w-[140px] rounded-full border border-[#f2e7d9]" />
      </div>
      <div className="relative grid gap-10 px-6 py-10 md:px-12 md:py-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-center gap-8">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#efe5d4] px-4 py-2 text-sm font-semibold tracking-tight text-[#8b5e2b] shadow-sm">
            <ShieldIcon className="h-4 w-4" />
            {t.home.hero.badge}
          </div>
          <div className="space-y-4">
            <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-[#0f172a] md:text-5xl">
              {t.home.hero.title}
            </h1>
            <p className="text-lg leading-8 text-slate-600 md:max-w-2xl">
              {t.home.hero.description}
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              onClick={onBookConsultation}
              className="rounded-full bg-[#0f172a] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(15,23,42,0.25)] transition hover:-translate-y-px hover:shadow-[0_18px_40px_rgba(15,23,42,0.32)]"
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
                className="rounded-2xl border border-[#efe5d4] bg-[#fdfaf5] px-4 py-3 shadow-sm"
              >
                <div className="text-xs uppercase tracking-[0.14em] text-slate-500">{stat.label}</div>
                <div className="font-display text-2xl font-semibold text-[#0f172a]">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 translate-x-6 translate-y-6 rounded-3xl bg-[#cbd5f5] opacity-40 blur-3xl" />
          <div
            className="relative overflow-hidden rounded-[28px] bg-[#0f172a] text-white shadow-[0_20px_60px_rgba(15,23,42,0.35)]"
          >
            {/* Фоновое изображение с градиентом */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,214,153,0.12),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(130,170,255,0.16),transparent_35%)]" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
            
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

function PracticeAreas() {
  const { t } = useTranslations();
  const icons = [BuildingIcon, BriefcaseIcon, ShieldIcon, UsersIcon, GlobeIcon];
  const areas = t.home.practiceAreas.items;

  return (
    <section
      className="mt-16 space-y-8"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{t.home.practiceAreas.subtitle}</p>
          <h2 className="font-display text-3xl font-semibold text-[#0f172a]">{t.home.practiceAreas.title}</h2>
          <p className="text-base text-slate-600 md:max-w-2xl">
            {t.home.practiceAreas.description}
          </p>
        </div>
        <LocalizedLink
          href="/services"
          className="inline-flex items-center gap-2 rounded-full bg-[#f3eadc] px-4 py-2 text-sm font-semibold text-[#8b5e2b] transition hover:-translate-y-px hover:shadow-md"
        >
          {t.home.practiceAreas.viewAllServices}
          <ArrowRightIcon className="h-4 w-4" />
        </LocalizedLink>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {areas.map((area, idx) => {
          const Icon = icons[idx % icons.length];
          return (
          <div
            key={area.title}
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#efe5d4] bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
          >
            <div className="absolute right-[-12px] top-[-12px] h-24 w-24 rounded-full bg-[#f3eadc] opacity-0 transition duration-200 group-hover:opacity-100" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-[#f3eadc] text-[#8b5e2b] shadow-inner">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="relative mt-5 font-display text-xl font-semibold text-[#0f172a]">{area.title}</h3>
            <p className="relative mt-2 text-sm leading-6 text-slate-600">{area.description}</p>
            {/* <div className="relative mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#8b5e2b]">
              {t.common.readMore}
              <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
            </div> */}
          </div>
        );
        })}
      </div>
    </section>
  );
}

function ResultsAndTestimonials() {
  const { t } = useTranslations();
  const results = t.home.results.items;
  const testimonials = t.home.testimonials.items;

  return (
    <section
      className="mt-16 grid gap-8 lg:grid-cols-2"
    >
      <div
        className="rounded-[24px] border border-[#efe5d4] bg-white p-8 shadow-[0_16px_44px_rgba(15,23,42,0.12)]"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{t.home.results.subtitle}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold text-[#0f172a]">{t.home.results.title}</h3>
        <div className="mt-6 space-y-4 text-sm text-slate-700">
          {results.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </div>
      <div
        className="rounded-[24px] border border-[#efe5d4] bg-white p-8 shadow-[0_16px_44px_rgba(15,23,42,0.12)]"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{t.home.testimonials.subtitle}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold text-[#0f172a]">{t.home.testimonials.title}</h3>
        <div className="mt-6 space-y-4 text-sm text-slate-700">
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
  const cta = t.home.consultationCta;

  return (
    <section
      className="mt-16 overflow-hidden rounded-[32px] border border-[#efe5d4] bg-white shadow-[0_18px_48px_rgba(15,23,42,0.14)]"
    >
      <div className="relative grid gap-10 px-6 py-10 md:grid-cols-[1.05fr_0.95fr] md:px-12 md:py-14">
        <div className="absolute right-[-120px] top-[-80px] h-72 w-72 rounded-full bg-[#f3eadc] blur-3xl" />
        <div className="relative space-y-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{cta.eyebrow}</p>
          <h3 className="font-display text-3xl font-semibold text-[#0f172a]">{cta.title}</h3>
          <p className="text-base text-slate-600">{cta.description}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {cta.bullets.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-[#f1e6d7] bg-[#fdfaf5] px-4 py-3 text-sm font-semibold text-[#0f172a]"
              >
                <CheckIcon className="h-5 w-5 text-[#7a5326]" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 translate-x-5 translate-y-5 rounded-[28px] bg-[#e0d7c8] opacity-50 blur-3xl" />
          <div className="relative space-y-4 rounded-[28px] border border-[#f1e6d7] bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.1)]">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{cta.eyebrow}</p>
              <h4 className="font-display text-xl font-semibold text-[#0f172a]">{cta.lineTitle}</h4>
            </div>
            <button
              onClick={onBookConsultation}
              className="w-full rounded-full bg-[#0f172a] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(15,23,42,0.25)] transition hover:-translate-y-px hover:shadow-[0_18px_38px_rgba(15,23,42,0.3)]"
            >
              {cta.lineCta}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
