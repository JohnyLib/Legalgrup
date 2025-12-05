"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Modal } from "../components/Modal";
import { ConsultationForm } from "../components/Forms";
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

const services = [
  {
    title: "Corporate Advisory",
    description:
      "Company structuring, boards, and commercial contracts that keep momentum without loose ends.",
    icon: <BuildingIcon className="h-6 w-6" />,
    bullets: [
      "Governance, board packs, and delegations",
      "Commercial contracts with fast turnaround",
      "Risk mapping for new markets",
    ],
  },
  {
    title: "Transactions & M&A",
    description:
      "Deal strategy, diligence, and negotiation playbooks to close decisively.",
    icon: <BriefcaseIcon className="h-6 w-6" />,
    bullets: [
      "Term sheets, SPA/SSA, and conditions",
      "Dataroom prep and Q&A sweeps",
      "Closing checklists and signing room",
    ],
  },
  {
    title: "Disputes & Risk",
    description:
      "Calm, courtroom-ready teams for urgent filings, arbitration, and settlement design.",
    icon: <ShieldIcon className="h-6 w-6" />,
    bullets: [
      "Emergency relief and filings",
      "Evidence, experts, and witness prep",
      "Negotiation and mediated outcomes",
    ],
  },
  {
    title: "Employment & People",
    description:
      "Policies, leadership agreements, and investigations that protect teams and reputation.",
    icon: <UsersIcon className="h-6 w-6" />,
    bullets: [
      "Hiring and leadership contracts",
      "Policies, audits, and compliance",
      "Sensitive exits and investigations",
    ],
  },
  {
    title: "Regulatory & Licensing",
    description:
      "Licensing packs, regulator dialogue, and cross-border compliance built with clarity.",
    icon: <GlobeIcon className="h-6 w-6" />,
    bullets: [
      "Regulatory mapping and authorities",
      "Licensing submissions and follow-ups",
      "Data and privacy frameworks",
    ],
  },
  {
    title: "Private Client & Wealth",
    description:
      "Succession, trusts, and protection structures for founders and families.",
    icon: <ScaleIcon className="h-6 w-6" />,
    bullets: [
      "Wealth and estate strategies",
      "Trusts, wills, and governance",
      "Family business continuity",
    ],
  },
];

const programs = [
  {
    name: "General Counsel Desk",
    badge: "Monthly",
    price: "From $3,800/mo",
    notes: ["Weekly legal desk", "<48h contract turnaround", "Founder hotline"],
  },
  {
    name: "Deal Sprint",
    badge: "Project",
    price: "Scope-based",
    notes: ["Thesis, timeline, and checklists", "Redlines and negotiation room", "Closing orchestration"],
  },
  {
    name: "Disputes Response",
    badge: "Hybrid",
    price: "Monthly + success",
    notes: ["Emergency filings in 48h", "Evidence and witness prep", "Settlement scenarios"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export default function ServicesPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <>
      <PageShell>
        <ServicesHero onBookConsultation={() => setIsConsultationOpen(true)} />
        <ServiceGrid />
        <Programs />
        <PhotoSlots />
        <CTA onBookConsultation={() => setIsConsultationOpen(true)} />
      </PageShell>

      <Modal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        title="Book a Consultation"
        size="lg"
      >
        <ConsultationForm
          onSubmit={(data) => {
            console.log("Consultation form submitted:", data);
            setIsConsultationOpen(false);
            alert("Thank you! We'll contact you within 24 hours.");
          }}
        />
      </Modal>
    </>
  );
}

function ServicesHero({ onBookConsultation }: { onBookConsultation: () => void }) {
  return (
    <motion.section
      className="relative mt-8 overflow-hidden rounded-[32px] border border-[#efe5d4] bg-white shadow-[0_22px_60px_rgba(15,23,42,0.12)]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,214,153,0.16),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(87,134,255,0.12),transparent_35%)]" />
        <div className="absolute right-[-120px] top-[-60px] h-[260px] w-[260px] rotate-6 rounded-[40px] border border-dashed border-[#e8dfd4]" />
        <div className="absolute left-[10%] top-[44%] h-[140px] w-[140px] rounded-full border border-[#f2e7d9]" />
      </div>
      <div className="relative grid gap-10 px-6 py-10 md:px-12 md:py-14 lg:grid-cols-[1.12fr_0.88fr]">
        <div className="flex flex-col justify-center gap-8">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#efe5d4] px-4 py-2 text-sm font-semibold tracking-tight text-[#8b5e2b] shadow-sm">
            <ShieldIcon className="h-4 w-4" />
            Full-service practice areas
          </div>
          <div className="space-y-4">
            <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-[#0f172a] md:text-5xl">
              Services that keep your company confident and ready.
            </h1>
            <p className="text-lg leading-8 text-slate-600 md:max-w-2xl">
              Choose day-to-day counsel, a transaction squad, or litigation teams that move fast without surprises.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <button 
              onClick={onBookConsultation}
              className="rounded-full bg-[#0f172a] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(15,23,42,0.25)] transition hover:-translate-y-[1px] hover:shadow-[0_18px_40px_rgba(15,23,42,0.32)]"
            >
              Book a services call
            </button>
            <button className="rounded-full border border-[#e5d8c7] px-6 py-3 text-sm font-semibold text-[#8b5e2b] transition hover:-translate-y-[1px] hover:border-[#d2b78f] hover:shadow-md">
              Download services deck
            </button>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <div className="flex items-center">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="relative -ml-2 h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-gradient-to-tr from-[#f2e5ce] to-[#d3c2a3]"
                  />
                ))}
              </div>
              <div className="leading-tight">
                Partner-led pods
                <span className="block text-xs text-slate-500">Response in under 24 hours</span>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Matters active", value: "78" },
              { label: "Average response", value: "< 24h" },
              { label: "Jurisdictions", value: "12" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="rounded-2xl border border-[#efe5d4] bg-[#fdfaf5] px-4 py-3 shadow-sm"
                variants={fadeUp}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div className="text-xs uppercase tracking-[0.14em] text-slate-500">{stat.label}</div>
                <div className="font-display text-2xl font-semibold text-[#0f172a]">{stat.value}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 translate-x-6 translate-y-6 rounded-3xl bg-[#cbd5f5] opacity-40 blur-3xl" />
          <motion.div
            className="relative overflow-hidden rounded-[28px] bg-[#0f172a] text-white shadow-[0_20px_60px_rgba(15,23,42,0.35)]"
            variants={fadeUp}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,214,153,0.12),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(130,170,255,0.16),transparent_35%)]" />
            <div className="relative space-y-6 p-8 sm:p-10">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/60">Coverage</p>
                  <h3 className="font-display text-2xl font-semibold">What we handle this quarter</h3>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10">
                  <BriefcaseIcon className="h-6 w-6 text-[#ffd699]" />
                </div>
              </div>
              <div className="grid gap-3 text-sm text-white/80">
                {[
                  "Corporate & commercial",
                  "Transactions & fundraising",
                  "Disputes & arbitration",
                  "Employment & compliance",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10"
                  >
                    <span className="font-semibold text-white">{item}</span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </div>
                ))}
              </div>
              <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                <div className="flex items-center justify-between text-white">
                  <span className="text-xs uppercase tracking-[0.16em] text-white/70">Availability this week</span>
                  <span className="rounded-full bg-[#ffd699] px-3 py-1 text-xs font-semibold text-[#0f172a]">4 partner slots</span>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <span className="rounded-xl bg-white/5 px-3 py-2">Tuesday - 09:00</span>
                  <span className="rounded-xl bg-white/5 px-3 py-2">Wednesday - 16:00</span>
                  <span className="rounded-xl bg-white/5 px-3 py-2">Thursday - 11:30</span>
                  <span className="rounded-xl bg-white/5 px-3 py-2">Friday - 14:00</span>
                </div>
                <button className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#0f172a] transition hover:-translate-y-[1px] hover:shadow-lg">
                  Reserve a slot
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function ServiceGrid() {
  return (
    <motion.section
      className="mt-16 space-y-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Service pillars</p>
          <h2 className="font-display text-3xl font-semibold text-[#0f172a]">Specialized teams, single accountability.</h2>
          <p className="text-base text-slate-600 md:max-w-2xl">
            Partner-led pods combine corporate, disputes, and regulatory depth with fast decision cycles.
          </p>
        </div>
        <div className="rounded-full bg-[#f3eadc] px-4 py-2 text-sm font-semibold text-[#8b5e2b]">Clear SLAs & budgets</div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <motion.div
            key={service.title}
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#efe5d4] bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
            variants={fadeUp}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="absolute right-[-12px] top-[-12px] h-24 w-24 rounded-full bg-[#f3eadc] opacity-0 transition duration-200 group-hover:opacity-100" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-[#f3eadc] text-[#8b5e2b] shadow-inner">
              {service.icon}
            </div>
            <h3 className="relative mt-5 font-display text-xl font-semibold text-[#0f172a]">{service.title}</h3>
            <p className="relative mt-2 text-sm leading-6 text-slate-600">{service.description}</p>
            <div className="relative mt-4 space-y-2 text-sm text-slate-700">
              {service.bullets.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckIcon className="mt-1 h-4 w-4 text-[#7a5326]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="relative mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#8b5e2b]">
              Schedule consultation
              <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function Programs() {
  return (
    <motion.section
      className="mt-16 rounded-[28px] border border-[#efe5d4] bg-white p-8 shadow-[0_18px_48px_rgba(15,23,42,0.14)]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Engagement programs</p>
          <h2 className="font-display text-3xl font-semibold text-[#0f172a]">Choose the model that fits your momentum.</h2>
          <p className="text-base text-slate-600 md:max-w-2xl">
            Predictable cadences, clear scopes, and quick response windows.
          </p>
        </div>
        <div className="rounded-full bg-[#f3eadc] px-4 py-2 text-sm font-semibold text-[#8b5e2b]">No hidden fees</div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {programs.map((program) => (
          <motion.div
            key={program.name}
            className="flex h-full flex-col rounded-2xl border border-[#f1e6d7] bg-[#fdfaf5] p-6 shadow-sm"
            variants={fadeUp}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#8b5e2b]">{program.badge}</span>
              <span className="text-xs uppercase tracking-[0.14em] text-slate-500">{program.price}</span>
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-[#0f172a]">{program.name}</h3>
            <div className="mt-4 space-y-2 text-sm text-slate-700">
              {program.notes.map((note) => (
                <div key={note} className="flex items-start gap-2">
                  <CheckIcon className="mt-1 h-4 w-4 text-[#7a5326]" />
                  <span>{note}</span>
                </div>
              ))}
            </div>
            <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#8b5e2b] transition hover:-translate-y-[1px] hover:shadow-md">
              View scope & timeline
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function PhotoSlots() {
  return (
    <motion.section
      className="mt-16 space-y-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Our Work Environment
        </p>
        <h3 className="font-display text-3xl font-semibold text-[#0f172a]">
          Professional spaces designed for collaboration.
        </h3>
        <p className="text-base text-slate-600">
          Modern conference rooms, collaborative workspaces, and state-of-the-art facilities.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <motion.div
          className="group relative overflow-hidden rounded-2xl shadow-[0_18px_48px_rgba(15,23,42,0.14)]"
          variants={fadeUp}
        >
          <div className="relative h-[300px] bg-gradient-to-br from-slate-100 to-slate-200">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop')] bg-cover bg-center opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <h4 className="font-display text-xl font-semibold text-white mb-1">Conference Room</h4>
              <p className="text-sm text-white/90">Client meetings and strategy sessions</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="group relative overflow-hidden rounded-2xl shadow-[0_18px_48px_rgba(15,23,42,0.14)]"
          variants={fadeUp}
        >
          <div className="relative h-[300px] bg-gradient-to-br from-slate-100 to-slate-200">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop')] bg-cover bg-center opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <h4 className="font-display text-xl font-semibold text-white mb-1">Collaborative Workspace</h4>
              <p className="text-sm text-white/90">Team collaboration and case preparation</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="group relative overflow-hidden rounded-2xl shadow-[0_18px_48px_rgba(15,23,42,0.14)]"
          variants={fadeUp}
        >
          <div className="relative h-[300px] bg-gradient-to-br from-slate-100 to-slate-200">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop')] bg-cover bg-center opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <h4 className="font-display text-xl font-semibold text-white mb-1">Legal Library</h4>
              <p className="text-sm text-white/90">Research and case study resources</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function CTA({ onBookConsultation }: { onBookConsultation: () => void }) {
  return (
    <motion.section
      className="mt-16 overflow-hidden rounded-[32px] border border-[#efe5d4] bg-white shadow-[0_18px_48px_rgba(15,23,42,0.14)]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <div className="relative grid gap-10 px-6 py-10 md:grid-cols-[1.05fr_0.95fr] md:px-12 md:py-14">
        <div className="absolute right-[-120px] top-[-80px] h-72 w-72 rounded-full bg-[#f3eadc] blur-3xl" />
        <motion.div className="relative space-y-5" variants={fadeUp}>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Next step</p>
          <h3 className="font-display text-3xl font-semibold text-[#0f172a]">Tell us what you need this week.</h3>
          <p className="text-base text-slate-600">
            We respond with a short plan, budget range, and available partner times. Urgent filings get priority.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Response in < 24h", "Partner-led intake", "Confidential handling", "Clear next steps"].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-[#f1e6d7] bg-[#fdfaf5] px-4 py-3 text-sm font-semibold text-[#0f172a]"
              >
                <CheckIcon className="h-5 w-5 text-[#7a5326]" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div className="relative" variants={fadeUp}>
          <div className="absolute inset-0 translate-x-5 translate-y-5 rounded-[28px] bg-[#e0d7c8] opacity-50 blur-3xl" />
          <div className="relative space-y-4 rounded-[28px] border border-[#f1e6d7] bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.1)]">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Direct line</p>
              <h4 className="font-display text-xl font-semibold text-[#0f172a]">We prepare before we meet.</h4>
            </div>
            <div className="space-y-2 text-sm text-slate-700">
              <div className="flex items-center gap-3 rounded-2xl bg-[#f3eadc] px-4 py-3 font-semibold text-[#8b5e2b]">
                <span>Phone:</span> +373 79021904 (Coada Andrei, Lawyer)
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-[#fdfaf5] px-4 py-3 font-semibold text-[#0f172a]">
                <span>Email:</span> legalgrup.md@gmail.com
              </div>
            </div>
            <button 
              onClick={onBookConsultation}
              className="w-full rounded-full bg-[#0f172a] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(15,23,42,0.25)] transition hover:-translate-y-[1px] hover:shadow-[0_18px_38px_rgba(15,23,42,0.3)]"
            >
              Request a call
            </button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
