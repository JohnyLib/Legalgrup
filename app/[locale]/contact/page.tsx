"use client";

import { useState, lazy, Suspense } from "react";
const Modal = lazy(() => import("../../components/Modal").then(m => ({ default: m.Modal })));
const ContactForm = lazy(() => import("../../components/Forms").then(m => ({ default: m.ContactForm })));
import {
  PageShell,
  Field,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  CheckIcon,
  PhotoPlaceholder,
} from "../../components/SiteChrome";
import { useTranslations } from "../../../lib/i18n/context";

const offices = [
  {
    city: "Cimișlia",
    address: "or.Cimișlia, str.Sf Maria 2 of 1",
    phone: "+373 79021904 (Coada Andrei, Lawyer)",
  },
];


export default function ContactPage() {
  const { t } = useTranslations();
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <PageShell>
        <Hero />
        <ContactCards />
        <ContactFormSection onOpenForm={() => setIsContactOpen(true)} />
      </PageShell>

      {isContactOpen && (
        <Suspense fallback={null}>
          <Modal
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
            title={t.forms.contact.title}
            size="md"
          >
            <Suspense fallback={<div className="p-6">Loading...</div>}>
              <ContactForm
                onSubmit={(data) => {
                  console.log("Contact form submitted:", data);
                  setIsContactOpen(false);
                  alert(t.forms.contact.success);
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
  const badges = [
    t.contact.hero.responseUnder24h,
    t.contact.hero.confidentialHandling,
    t.contact.hero.partnerLedIntake,
  ];

  return (
    <section
      className="relative mt-8 overflow-hidden rounded-[32px] border border-[#efe5d4] bg-white shadow-[0_22px_60px_rgba(15,23,42,0.12)]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,214,153,0.16),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(87,134,255,0.12),transparent_35%)]" />
        <div className="absolute right-[-120px] top-[-60px] h-[240px] w-[240px] rotate-6 rounded-[40px] border border-dashed border-[#e8dfd4]" />
      </div>
      <div className="relative grid gap-10 px-6 py-10 md:px-12 md:py-14 lg:grid-cols-[1fr_0.95fr]">
        <div className="flex flex-col justify-center gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#efe5d4] px-4 py-2 text-sm font-semibold tracking-tight text-[#8b5e2b] shadow-sm">
            <PhoneIcon className="h-4 w-4" />
            {t.contact.hero.badge}
          </div>
          <div className="space-y-3">
            <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-[#0f172a] md:text-5xl">
              {t.contact.hero.title}
            </h1>
            <p className="text-lg leading-8 text-slate-600 md:max-w-2xl">
              {t.contact.hero.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-slate-700">
            {badges.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#f1e6d7] bg-[#fdfaf5] px-4 py-2 font-semibold text-[#0f172a]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="relative rounded-[28px] border border-[#f1e6d7] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.15)]">
          <div className="grid gap-3 text-sm text-slate-700">
            <div className="flex items-center gap-3 rounded-2xl bg-[#fdfaf5] px-4 py-3 ring-1 ring-[#f1e6d7]">
              <PhoneIcon className="h-5 w-5 text-[#7a5326]" />
              <div>
                <p className="font-semibold text-[#0f172a]">{t.contact.hero.hotline}</p>
                <p>+373 79021904 (Coada Andrei, Lawyer)</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-[#fdfaf5] px-4 py-3 ring-1 ring-[#f1e6d7]">
              <MailIcon className="h-5 w-5 text-[#7a5326]" />
              <div>
                <p className="font-semibold text-[#0f172a]">{t.contact.hero.intake}</p>
                <p>legalgrup.md@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-[#0f172a] px-4 py-3 text-white shadow-[0_14px_30px_rgba(15,23,42,0.25)]">
              <MapPinIcon className="h-5 w-5 text-[#ffd699]" />
              <div>
                <p className="text-sm font-semibold">{t.contact.hero.location}</p>
                <p className="text-xs text-white/70">{t.contact.hero.hybridAvailability}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCards() {
  const { t } = useTranslations();

  return (
    <section
      className="mt-16 space-y-6"
    >
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{t.contact.offices.subtitle}</p>
        <h2 className="font-display text-3xl font-semibold text-[#0f172a]">{t.contact.offices.title}</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {offices.map((office) => (
          <div
            key={office.city}
            className="rounded-2xl border border-[#efe5d4] bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f3eadc] text-sm font-semibold text-[#8b5e2b]">
                {office.city[0]}
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-[#0f172a]">{office.city}</h3>
                <p className="text-sm text-slate-600">{office.address}</p>
              </div>
            </div>
            <div className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#8b5e2b]">
              <PhoneIcon className="h-4 w-4" />
              {office.phone}
            </div>
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
          {t.contact.photos.subtitle}
        </p>
        <h3 className="font-display text-3xl font-semibold text-[#0f172a]">
          {t.contact.photos.title}
        </h3>
        <p className="text-base text-slate-600">
          {t.contact.photos.description}
        </p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <PhotoPlaceholder label={t.contact.photos.jakartaOffice} note="1400x900" />
        <PhotoPlaceholder label={t.contact.photos.singaporeOffice} note="1400x900" />
        <PhotoPlaceholder label={t.contact.photos.teamGreeting} note="1200x800" />
      </div>
    </section>
  );
}

function ContactFormSection({ onOpenForm }: { onOpenForm: () => void }) {
  const { t } = useTranslations();
  const benefits = [
    t.contact.formSection.benefits.partnerLed,
    t.contact.formSection.benefits.responseUnder24h,
    t.contact.formSection.benefits.scopeClarity,
    t.contact.formSection.benefits.budgetRanges,
  ];

  return (
    <section
      className="mt-16 overflow-hidden rounded-[32px] border border-[#efe5d4] bg-white shadow-[0_18px_48px_rgba(15,23,42,0.14)]"
    >
      <div className="relative grid gap-10 px-6 py-10 md:grid-cols-[1fr_0.95fr] md:px-12 md:py-14">
        <div className="absolute right-[-120px] top-[-80px] h-72 w-72 rounded-full bg-[#f3eadc] blur-3xl" />
        <div className="relative space-y-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{t.contact.formSection.subtitle}</p>
          <h3 className="font-display text-3xl font-semibold text-[#0f172a]">{t.contact.formSection.title}</h3>
          <p className="text-base text-slate-600">
            {t.contact.formSection.description}
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {benefits.map((item) => (
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
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{t.contact.formSection.formTitle}</p>
              <h4 className="font-display text-xl font-semibold text-[#0f172a]">{t.contact.formSection.formSubtitle}</h4>
            </div>
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={t.forms.contact.fullName} placeholder={t.forms.consultation.fullName} />
                <Field label={t.forms.contact.company} placeholder={t.forms.consultation.company} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={t.forms.contact.email} placeholder={t.forms.contact.email} type="email" />
                <Field label={t.forms.contact.phone} placeholder="+373 790 21904" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">{t.contact.formSection.matterSummary}</label>
                <textarea
                  className="mt-2 w-full rounded-2xl border border-[#e5d8c7] bg-[#fdfaf5] px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#d2b78f] focus:ring-2 focus:ring-[#d2b78f]/30"
                  rows={4}
                  placeholder={t.contact.formSection.matterSummaryPlaceholder}
                />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <label className="flex items-center gap-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-[#d9c7af] text-[#8b5e2b] focus:ring-[#8b5e2b]"
                  />
                  {t.contact.formSection.privacyAgreement}
                </label>
                <button
                  type="button"
                  onClick={onOpenForm}
                  className="inline-flex items-center justify-center rounded-full bg-[#0f172a] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(15,23,42,0.25)] transition hover:-translate-y-px hover:shadow-[0_18px_38px_rgba(15,23,42,0.3)]"
                >
                  {t.contact.formSection.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

