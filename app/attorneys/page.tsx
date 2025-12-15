"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Modal } from "../components/Modal";
import { ScheduleCallForm } from "../components/Forms";
import {
  PageShell,
  UsersIcon,
  ShieldIcon,
  BriefcaseIcon,
  CheckIcon,
  ArrowRightIcon,
  PhotoPlaceholder,
} from "../components/SiteChrome";

const attorneys = [
  {
    name: "Adrian Santoso",
    role: "Managing Partner",
    focus: "Corporate, M&A, board governance",
    matters: "320+ matters led",
  },
  {
    name: "Mira Lestari",
    role: "Partner",
    focus: "Disputes, arbitration, crisis response",
    matters: "200+ court appearances",
  },
  {
    name: "Davin Lee",
    role: "Partner",
    focus: "Employment, investigations, compliance",
    matters: "150+ investigations",
  },
  {
    name: "Serena Ng",
    role: "Counsel",
    focus: "Technology, data, and licensing",
    matters: "12 markets covered",
  },
  {
    name: "Rendra Wijaya",
    role: "Senior Associate",
    focus: "Transactions and commercial",
    matters: "60+ deal cycles",
  },
  {
    name: "Nadia Rahma",
    role: "Senior Associate",
    focus: "Disputes & enforcement",
    matters: "80+ hearings",
  },
];

const principles = [
  "Partner in the room for every critical decision.",
  "Written strategy memos with options and budgets upfront.",
  "Calm, direct communication with leadership cadence.",
  "Tight collaboration with finance, HR, and product teams.",
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export default function AttorneysPage() {
  const [isScheduleCallOpen, setIsScheduleCallOpen] = useState(false);

  return (
    <>
      <PageShell>
        <Hero />
        <TeamGrid />
        <Approach />
        <AttorneyCTA onScheduleCall={() => setIsScheduleCallOpen(true)} />
      </PageShell>

      <Modal
        isOpen={isScheduleCallOpen}
        onClose={() => setIsScheduleCallOpen(false)}
        title="Schedule a Call"
        size="lg"
      >
        <ScheduleCallForm
          source="Schedule a Call"
          onSubmit={(data) => {
            console.log("Schedule call form submitted:", data);
            // Success handled inside the form with overlay
          }}
        />
      </Modal>
    </>
  );
}

function Hero() {
  return (
    <motion.section
      className="relative mt-8 overflow-hidden rounded-[32px] border border-[#efe5d4] bg-white shadow-[0_22px_60px_rgba(15,23,42,0.12)]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,214,153,0.16),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(87,134,255,0.12),transparent_35%)]" />
        <div className="absolute right-[-120px] top-[-60px] h-[240px] w-[240px] rotate-6 rounded-[40px] border border-dashed border-[#e8dfd4]" />
      </div>
      <div className="relative grid gap-10 px-6 py-10 md:px-12 md:py-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-center gap-8">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#efe5d4] px-4 py-2 text-sm font-semibold tracking-tight text-[#8b5e2b] shadow-sm">
            <UsersIcon className="h-4 w-4" />
            Attorneys & partners
          </div>
          <div className="space-y-4">
            <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-[#0f172a] md:text-5xl">
              Partner-led teams, ready for decisive moments.
            </h1>
            <p className="text-lg leading-8 text-slate-600 md:max-w-2xl">
              Corporate, disputes, and regulatory specialists working together from intake to resolution.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[{ label: "Matters yearly", value: "320+" }, { label: "Court appearances", value: "600+" }, { label: "Avg. response", value: "< 24h" }].map((stat) => (
              <motion.div
                key={stat.label}
                className="rounded-2xl border border-[#efe5d4] bg-[#fdfaf5] px-4 py-3 shadow-sm"
                variants={fadeUp}
              >
                <div className="text-xs uppercase tracking-[0.14em] text-slate-500">{stat.label}</div>
                <div className="font-display text-2xl font-semibold text-[#0f172a]">{stat.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="relative rounded-[28px] border border-[#f1e6d7] bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.15)]">
          <div className="grid gap-4 text-sm text-slate-700">
            {principles.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl bg-[#fdfaf5] px-4 py-3 ring-1 ring-[#f1e6d7]">
                <CheckIcon className="mt-1 h-5 w-5 text-[#7a5326]" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function TeamGrid() {
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
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Team</p>
          <h2 className="font-display text-3xl font-semibold text-[#0f172a]">A multidisciplinary bench.</h2>
          <p className="text-base text-slate-600 md:max-w-2xl">
            Partner attention with pods that mirror your business squads.
          </p>
        </div>
        <div className="rounded-full bg-[#f3eadc] px-4 py-2 text-sm font-semibold text-[#8b5e2b]">Direct partner access</div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {attorneys.map((attorney) => (
          <motion.div
            key={attorney.name}
            className="flex h-full flex-col rounded-2xl border border-[#efe5d4] bg-white p-6 shadow-sm"
            variants={fadeUp}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0f172a] text-lg font-semibold text-white">
                {attorney.name[0]}
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-[#0f172a]">{attorney.name}</h3>
                <p className="text-sm text-slate-600">{attorney.role}</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-700">{attorney.focus}</p>
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#8b5e2b]">
              <ShieldIcon className="h-4 w-4" />
              {attorney.matters}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function Approach() {
  return (
    <motion.section
      className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.05fr]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <motion.div
        className="rounded-[24px] border border-[#efe5d4] bg-white p-7 shadow-[0_16px_44px_rgba(15,23,42,0.12)]"
        variants={fadeUp}
      >
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Approach</p>
        <h3 className="mt-2 font-display text-2xl font-semibold text-[#0f172a]">How we work with you</h3>
        <div className="mt-5 grid gap-3 text-sm text-slate-700">
          {["Partner attends key calls and negotiations.", "Weekly status with next decisions and blockers.", "Clear budgets with variance alerts.", "Playbooks for repeatable processes."].map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-xl bg-[#fdfaf5] px-4 py-3 ring-1 ring-[#f1e6d7]">
              <CheckIcon className="mt-1 h-4 w-4 text-[#7a5326]" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="overflow-hidden rounded-[24px] border border-[#efe5d4] bg-gradient-to-r from-[#0f172a] via-[#15213a] to-[#0f172a] p-6 text-white shadow-[0_16px_44px_rgba(15,23,42,0.22)]"
        variants={fadeUp}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/60">Experience</p>
            <h4 className="mt-1 font-display text-xl font-semibold">Quiet victories, decisive outcomes</h4>
            <p className="mt-2 text-sm text-white/80">
              Deals closed in 45 days, 0 post-close claims, and courtroom teams ready for emergency filings.
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10">
            <BriefcaseIcon className="h-6 w-6 text-[#ffd699]" />
          </div>
        </div>
        <div className="mt-4 grid gap-3 text-sm text-white/80 sm:grid-cols-2">
          <span className="rounded-xl bg-white/5 px-4 py-3">M&A, PE, and growth deals</span>
          <span className="rounded-xl bg-white/5 px-4 py-3">Arbitration & complex disputes</span>
          <span className="rounded-xl bg-white/5 px-4 py-3">Employment & investigations</span>
          <span className="rounded-xl bg-white/5 px-4 py-3">Regulatory & licensing</span>
        </div>
      </motion.div>
    </motion.section>
  );
}

function PhotoSlots() {
  return (
    <motion.section
      className="mt-16 rounded-[28px] border border-[#efe5d4] bg-white p-8 shadow-[0_18px_48px_rgba(15,23,42,0.14)]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Media
        </p>
        <h3 className="font-display text-3xl font-semibold text-[#0f172a]">
          Add attorney and office photos.
        </h3>
        <p className="text-base text-slate-600">
          Drop portraits, team shots, or courtroom imagery here.
        </p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <PhotoPlaceholder label="Partner portrait" note="800x1000" />
        <PhotoPlaceholder label="Team photo" note="1400x900" />
        <PhotoPlaceholder label="Office / client meeting" note="1200x800" />
      </div>
    </motion.section>
  );
}

function AttorneyCTA({ onScheduleCall }: { onScheduleCall: () => void }) {
  return (
    <motion.section
      className="mt-16 rounded-[32px] border border-[#efe5d4] bg-white p-8 shadow-[0_18px_48px_rgba(15,23,42,0.14)]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <div className="grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-center">
        <motion.div className="space-y-4" variants={fadeUp}>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Connect</p>
          <h3 className="font-display text-3xl font-semibold text-[#0f172a]">Talk directly with a partner this week.</h3>
          <p className="text-base text-slate-600">
            Share your matter and we will assign the right pod with clear timelines.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-700">
            {["Partner-led intake", "Response in < 24h", "Clear scope & budget"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#f1e6d7] bg-[#fdfaf5] px-4 py-2 font-semibold text-[#0f172a]"
              >
                {item}
              </span>
            ))}
          </div>
          <button 
            onClick={onScheduleCall}
            className="inline-flex items-center gap-2 rounded-full bg-[#0f172a] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(15,23,42,0.25)] transition hover:-translate-y-[1px] hover:shadow-[0_18px_38px_rgba(15,23,42,0.3)]"
          >
            Schedule a call
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </motion.div>

        <motion.div
          className="rounded-[24px] border border-[#efe5d4] bg-[#fdfaf5] p-6 shadow-sm"
          variants={fadeUp}
        >
          <div className="flex items-center gap-3">
            <ShieldIcon className="h-6 w-6 text-[#8b5e2b]" />
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Hotline</p>
              <p className="text-lg font-semibold text-[#0f172a]">+373 79021904 (Coada Andrei, Lawyer)</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-700">legalgrup.md@gmail.com</p>
          <div className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
            <span className="rounded-xl bg-white px-3 py-2 ring-1 ring-[#f1e6d7]">Tuesday - 09:00</span>
            <span className="rounded-xl bg-white px-3 py-2 ring-1 ring-[#f1e6d7]">Wednesday - 16:00</span>
            <span className="rounded-xl bg-white px-3 py-2 ring-1 ring-[#f1e6d7]">Thursday - 11:30</span>
            <span className="rounded-xl bg-white px-3 py-2 ring-1 ring-[#f1e6d7]">Friday - 14:00</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
