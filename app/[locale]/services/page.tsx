"use client";

import { useState, lazy, Suspense } from "react";
const Modal = lazy(() => import("../../components/Modal").then(m => ({ default: m.Modal })));
const ConsultationForm = lazy(() => import("../../components/Forms").then(m => ({ default: m.ConsultationForm })));
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
  useTheme,
} from "../../components/SiteChrome";
import { useTranslations } from "../../../lib/i18n/context";

type ServiceItem = {
  title: string;
  description: string;
  bullets: string[];
};

type ServiceFeature = ServiceItem & {
  image: string;
  kicker: string;
};

export default function ServicesPage() {
  const { t } = useTranslations();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [activeService, setActiveService] = useState<ServiceFeature | null>(null);

  return (
    <>
      <PageShell>
        <ServicesHero onBookConsultation={() => setIsConsultationOpen(true)} />
        <ServiceGrid onOpen={(service) => setActiveService(service)} />
        <Programs />
        {/* <PhotoSlots /> */}
        <CTA onBookConsultation={() => setIsConsultationOpen(true)} />
      </PageShell>

      {activeService && (
        <Suspense fallback={null}>
          <Modal
            isOpen={!!activeService}
            onClose={() => setActiveService(null)}
            title={activeService.title}
            size="lg"
          >
            <ServiceFeatureContent service={activeService} />
          </Modal>
        </Suspense>
      )}

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
                source={t.forms.consultation.title}
                onSubmit={(data) => {
                  console.log("Consultation form submitted:", data);
                  // Success handled inside the form with overlay
                }}
              />
            </Suspense>
          </Modal>
        </Suspense>
      )}
    </>
  );
}

function ServicesHero({ onBookConsultation }: { onBookConsultation: () => void }) {
  const { t } = useTranslations();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const coverage = t.services.coverage;
  
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
      <div className="relative grid gap-10 px-6 py-10 md:px-12 md:py-14 lg:grid-cols-[1.12fr_0.88fr]">
        <div className="flex flex-col justify-center gap-8">
          <div
            className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold tracking-tight shadow-sm ${
              isDark
                ? "bg-white/5 text-[var(--accent)] ring-1 ring-[var(--accent)]/30"
                : "bg-[#efe5d4] text-[#8b5e2b]"
            }`}
          >
            <ShieldIcon className="h-4 w-4" />
            {t.services.hero.badge}
          </div>
          <div className="space-y-4">
            <h1
              className={`font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl ${
                isDark ? "text-slate-50" : "text-[#0f172a]"
              }`}
            >
              {t.services.hero.title}
            </h1>
            <p
              className={`text-lg leading-8 md:max-w-2xl ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {t.services.hero.description}
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <button 
              onClick={onBookConsultation}
              className="rounded-full bg-gradient-to-r from-[var(--accent)] to-[#f59e0b] px-6 py-3 text-sm font-semibold text-[#0b0f1c] shadow-[0_18px_40px_rgba(244,200,108,0.35)] transition hover:-translate-y-px hover:shadow-[0_22px_52px_rgba(244,200,108,0.45)]"
            >
              {t.services.hero.bookServicesCall}
            </button>
            <div className={`flex items-center gap-3 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              <div className="flex items-center">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={`relative -ml-2 h-8 w-8 overflow-hidden rounded-full border-2 ${
                      isDark ? "border-white bg-linear-to-tr from-[#f2e5ce] to-[#d3c2a3]" : "border-[#f3eadc] bg-linear-to-tr from-white to-[#f7f0e4]"
                    }`}
                  />
                ))}
              </div>
              <div className={`leading-tight ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                {t.services.hero.partnerLedPods}
                <span className={`block text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  {t.services.hero.responseUnder24Hours}
                </span>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: t.services.hero.mattersActive, value: "78" },
              { label: t.services.hero.averageResponse, value: "< 24h" },
              { label: t.services.hero.jurisdictions, value: "12" },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`rounded-2xl px-4 py-3 shadow-sm backdrop-blur ${
                  isDark
                    ? "border border-[#1f2a44] bg-[#0f172a]/80 shadow-black/30"
                    : "border border-[#efe5d4] bg-[#fdfaf5] shadow-sm"
                }`}
              >
                <div className={`text-xs uppercase tracking-[0.14em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
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
          <div
            className={`absolute inset-0 translate-x-6 translate-y-6 rounded-3xl blur-3xl ${
              isDark ? "bg-[#0e1a33] opacity-50" : "bg-[#cbd5f5]/80 opacity-70"
            }`}
          />
          <div
            className={`relative overflow-hidden rounded-[28px] text-white ring-1 ${
              isDark
                ? "bg-gradient-to-br from-[#0f192f] to-[#0a101f] shadow-[0_24px_80px_rgba(0,0,0,0.55)] ring-[#1f2a44]"
                : "bg-white shadow-[0_20px_60px_rgba(15,23,42,0.15)] ring-[#efe5d4]"
            }`}
          >
            <div
              className={`absolute inset-0 ${
                isDark
                  ? "bg-[radial-gradient(circle_at_20%_20%,rgba(108,231,214,0.12),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(244,200,108,0.14),transparent_35%)]"
                  : "bg-[radial-gradient(circle_at_20%_20%,rgba(255,214,153,0.16),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(87,134,255,0.12),transparent_35%)]"
              }`}
            />
            <div className="relative space-y-6 p-8 sm:p-10">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className={`text-xs uppercase tracking-[0.18em] ${isDark ? "text-white/60" : "text-slate-500"}`}>
                    {coverage.subtitle}
                  </p>
                  <h3 className={`font-display text-2xl font-semibold ${isDark ? "text-white" : "text-[#0f172a]"}`}>
                    {coverage.title}
                  </h3>
                </div>
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full ${
                    isDark ? "bg-white/10 ring-1 ring-white/10" : "bg-[#f3eadc] ring-1 ring-[#efe5d4]"
                  }`}
                >
                  <BriefcaseIcon className={`h-6 w-6 ${isDark ? "text-[#ffd699]" : "text-[#8b5e2b]"}`} />
                </div>
              </div>
              <div className={`grid gap-3 text-sm ${isDark ? "text-white/80" : "text-slate-700"}`}>
                {coverage.tags.map((item) => (
                  <div
                    key={item}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 ring-1 ${
                      isDark ? "bg-white/5 ring-white/10" : "bg-[#fdfaf5] ring-[#efe5d4]"
                    }`}
                  >
                    <span className={`font-semibold ${isDark ? "text-white" : "text-[#0f172a]"}`}>{item}</span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </div>
                ))}
              </div>
              {/* <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                <div className="flex items-center justify-between text-white">
                  <span className="text-xs uppercase tracking-[0.16em] text-white/70">{coverage.availabilityLabel}</span>
                  <span className="rounded-full bg-[#ffd699] px-3 py-1 text-xs font-semibold text-[#0f172a]">{coverage.slotCta}</span>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {coverage.slots.map((slot) => (
                    <span key={slot} className="rounded-xl bg-white/5 px-3 py-2">
                      {slot}
                    </span>
                  ))}
                </div>
                <button className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#0f172a] transition hover:-translate-y-px hover:shadow-lg">
                  {coverage.slotCta}
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceGrid({ onOpen }: { onOpen: (service: ServiceFeature) => void }) {
  const { t } = useTranslations();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const icons = [BuildingIcon, BriefcaseIcon, ShieldIcon, UsersIcon, GlobeIcon, ScaleIcon];
  const services = t.services.grid.items as ServiceItem[];
  const visuals = [
    "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  ];
  const decorated: ServiceFeature[] = services.map((service, idx) => ({
    ...service,
    image: visuals[idx % visuals.length],
    kicker: ["Case note", "Deal desk", "Disputes brief", "Policy note", "Tax + admin", "Advisory"][idx % 6],
  }));

  return (
    <section
      className="mt-16 space-y-8"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className={`text-xs uppercase tracking-[0.2em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            {t.services.grid.subtitle}
          </p>
          <h2 className={`font-display text-3xl font-semibold ${isDark ? "text-slate-100" : "text-[#0f172a]"}`}>
            {t.services.grid.title}
          </h2>
          <p className={`text-base md:max-w-2xl ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            {t.services.grid.description}
          </p>
        </div>
        <div
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            isDark
              ? "bg-white/5 text-[var(--accent)] ring-1 ring-[var(--accent)]/30"
              : "bg-[#f3eadc] text-[#8b5e2b]"
          }`}
        >
          {t.services.grid.clearSLAs}
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {decorated.map((service, idx) => {
          const Icon = icons[idx % icons.length];
          return (
          <button
            type="button"
            onClick={() => onOpen(service)}
            key={service.title}
            className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 text-left transition duration-200 hover:-translate-y-1 ${
              isDark
                ? "border-[#1f2a44] bg-gradient-to-br from-[#0e1629] to-[#0a1121] shadow-[0_18px_40px_rgba(0,0,0,0.4)] hover:ring-1 hover:ring-[var(--accent)]/50"
                : "border-[#efe5d4] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.12)] hover:shadow-[0_22px_50px_rgba(15,23,42,0.16)]"
            }`}
          >
            <div className="absolute right-[-18px] top-[-18px] h-24 w-24 rounded-full bg-[var(--accent)]/10 blur-2xl transition duration-200 group-hover:opacity-100" />
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
              {service.title}
            </h3>
            <p
              className={`relative mt-2 text-sm leading-6 ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {service.description}
            </p>
            <div className={`relative mt-4 space-y-2 text-sm ${isDark ? "text-slate-200" : "text-slate-700"}`}>
              {service.bullets.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckIcon className="mt-1 h-4 w-4 text-[var(--accent)]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </button>
          );
        })}
      </div>
    </section>
  );
}

function Programs() {
  const { t } = useTranslations();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const programs = t.services.programs.list;

  return (
    <section
      className={`mt-16 rounded-[28px] border p-8 ${
        isDark
          ? "border-[#1f2a44] bg-gradient-to-br from-[#0b1221] to-[#0f172a] shadow-[0_18px_60px_rgba(0,0,0,0.4)]"
          : "border-[#efe5d4] bg-white shadow-[0_16px_44px_rgba(15,23,42,0.12)]"
      }`}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className={`text-xs uppercase tracking-[0.2em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>{t.services.programs.subtitle}</p>
          <h2 className={`font-display text-3xl font-semibold ${isDark ? "text-slate-100" : "text-[#0f172a]"}`}>{t.services.programs.title}</h2>
          <p className={`text-base md:max-w-2xl ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            {t.services.programs.description}
          </p>
        </div>
        <div className={`rounded-full px-4 py-2 text-sm font-semibold ${isDark ? "bg-white/5 text-[var(--accent)] ring-1 ring-[var(--accent)]/30" : "bg-[#f3eadc] text-[#8b5e2b]"}`}>{t.services.programs.noHiddenFees}</div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {programs.map((program) => (
          <div
            key={program.name}
            className={`flex h-full flex-col rounded-2xl border p-6 ${isDark ? "border-[#1f2a44] bg-[#0f172a] shadow-[0_12px_32px_rgba(0,0,0,0.35)]" : "border-[#efe5d4] bg-white shadow-[0_12px_32px_rgba(15,23,42,0.12)]"}`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isDark ? "bg-white/10 text-[var(--accent)] ring-1 ring-white/10" : "bg-[#f3eadc] text-[#8b5e2b]"}`}>{program.badge}</span>
              <span className={`text-xs uppercase tracking-[0.14em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>{program.price}</span>
            </div>
            <h3 className={`mt-4 font-display text-xl font-semibold ${isDark ? "text-slate-100" : "text-[#0f172a]"}`}>{program.name}</h3>
            <div className={`mt-4 space-y-2 text-sm ${isDark ? "text-slate-200" : "text-slate-700"}`}>
              {program.notes.map((note) => (
                <div key={note} className="flex items-start gap-2">
                  <CheckIcon className="mt-1 h-4 w-4 text-[var(--accent)]" />
                  <span>{note}</span>
                </div>
              ))}
            </div>
            {/* <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#8b5e2b] transition hover:-translate-y-px hover:shadow-md">
              {t.services.programs.viewScopeTimeline}
              <ArrowRightIcon className="h-4 w-4" />
            </button> */}
          </div>
        ))}
      </div>
    </section>
  );
}

// function PhotoSlots() {
//   const { t } = useTranslations();
//   const photos = t.services.photos;
//   return (
//     <section
//       className="mt-16 space-y-8"
//     >
//       <div className="flex flex-col gap-2">
//         <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
//           {photos.subtitle}
//         </p>
//         <h3 className="font-display text-3xl font-semibold text-[#0f172a]">
//           {photos.title}
//         </h3>
//         <p className="text-base text-slate-600">
//           {photos.description}
//         </p>
//       </div>
//       <div className="grid gap-6 md:grid-cols-3">
//         {photos.items.map((label) => (
//           <PhotoPlaceholder key={label} label={label} note={undefined} />
//         ))}
//       </div>
//     </section>
//   );
// }

function ServiceFeatureContent({ service }: { service: ServiceFeature }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div
        className={`relative overflow-hidden rounded-3xl border shadow-[0_20px_60px_rgba(0,0,0,0.5)] ${
          isDark ? "border-[#1f2a44] bg-[#0b1221]" : "border-[#efe5d4] bg-white shadow-[0_16px_44px_rgba(15,23,42,0.12)]"
        }`}
      >
        <img src={service.image} alt={service.title} className="h-full w-full object-cover" loading="lazy" />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${
            isDark ? "from-[#05070f] via-[#05070f]/50 to-transparent" : "from-black/40 via-black/15 to-transparent"
          }`}
        />
        <div className="absolute inset-x-0 bottom-0 space-y-2 p-6 text-white">
          <p className="text-xs uppercase tracking-[0.18em] text-white/70">{service.kicker}</p>
          <h3 className="font-display text-2xl font-semibold">{service.title}</h3>
          <p className="text-sm text-white/80">{service.description}</p>
        </div>
      </div>
      <div className={`space-y-4 ${isDark ? "text-slate-100" : "text-slate-700"}`}>
        <div
          className={`rounded-2xl border p-4 shadow-inner ${
            isDark ? "border-[#1f2a44] bg-[#0f172a] shadow-black/20" : "border-[#efe5d4] bg-white shadow-[#e8dfd4]/40"
          }`}
        >
          <div className={`text-xs uppercase tracking-[0.18em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            Основное
          </div>
          <div className={`mt-2 text-lg font-semibold ${isDark ? "text-slate-50" : "text-[#0f172a]"}`}>Что делаем</div>
        </div>
        <div
          className={`grid gap-3 rounded-2xl border p-4 text-sm shadow-inner ${
            isDark ? "border-[#1f2a44] bg-[#0f172a] shadow-black/20" : "border-[#efe5d4] bg-white shadow-[#e8dfd4]/40"
          }`}
        >
          {service.bullets.map((item) => (
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

function CTA({ onBookConsultation }: { onBookConsultation: () => void }) {
  const { t } = useTranslations();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const cta = t.services.cta;

  return (
    <section
      className={`mt-16 overflow-hidden rounded-[32px] border ${
        isDark
          ? "border-[#1f2a44] bg-gradient-to-br from-[#0b1221] to-[#0f172a] shadow-[0_24px_70px_rgba(0,0,0,0.45)]"
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
            {cta.subtitle}
          </p>
          <h3 className={`font-display text-3xl font-semibold ${isDark ? "text-slate-100" : "text-[#0f172a]"}`}>
            {cta.title}
          </h3>
          <p className={`text-base ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            {cta.description}
          </p>
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
                {cta.subtitle}
              </p>
              <h4 className={`font-display text-xl font-semibold ${isDark ? "text-slate-100" : "text-[#0f172a]"}`}>
                {t.services.hero.title}
              </h4>
            </div>
            <div className={`space-y-2 text-sm ${isDark ? "text-slate-200" : "text-slate-700"}`}>
              <div
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold ${
                  isDark ? "bg-white/5 text-[var(--accent)] ring-1 ring-white/10" : "bg-[#f3eadc] text-[#8b5e2b] ring-1 ring-[#efe5d4]"
                }`}
              >
                <span>Phone:</span> +373 79021904 (Coada Andrei, Lawyer)
              </div>
              <div
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold ${
                  isDark ? "bg-[#0b1221] text-slate-100 ring-1 ring-[#1f2a44]" : "bg-[#fdfaf5] text-[#0f172a] ring-1 ring-[#efe5d4]"
                }`}
              >
                <span>Email:</span> legalgrup.md@gmail.com
              </div>
            </div>
            <button 
              onClick={onBookConsultation}
              className="w-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[#f59e0b] px-5 py-3 text-sm font-semibold text-[#0b0f1c] shadow-[0_14px_30px_rgba(244,200,108,0.35)] transition hover:-translate-y-px hover:shadow-[0_18px_38px_rgba(244,200,108,0.45)]"
            >
              {cta.button}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
