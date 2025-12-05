"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Modal } from "../components/Modal";
import { ContactForm } from "../components/Forms";
import {
  PageShell,
  ArrowRightIcon,
  CheckIcon,
  BriefcaseIcon,
  GlobeIcon,
  PhotoPlaceholder,
} from "../components/SiteChrome";

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

const highlights = [
  "Deal checklists and redline guides",
  "Regulatory maps by sector",
  "Employment investigations toolkit",
  "Litigation prep and courtroom readiness",
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

export default function InsightsPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <PageShell>
        <Hero />
        <Articles />
        <Library />
        <PhotoSlots />
        <Newsletter onSubscribe={() => setIsContactOpen(true)} />
      </PageShell>

      <Modal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        title="Subscribe to Newsletter"
        size="md"
      >
        <ContactForm
          onSubmit={(data) => {
            console.log("Newsletter subscription:", data);
            setIsContactOpen(false);
            alert("Thank you for subscribing! You'll receive our monthly insights.");
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
        <div className="flex flex-col justify-center gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#efe5d4] px-4 py-2 text-sm font-semibold tracking-tight text-[#8b5e2b] shadow-sm">
            <BriefcaseIcon className="h-4 w-4" />
            Insights & playbooks
          </div>
          <div className="space-y-3">
            <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-[#0f172a] md:text-5xl">
              Practical guidance built from live matters.
            </h1>
            <p className="text-lg leading-8 text-slate-600 md:max-w-2xl">
              Memos, checklists, and debriefs that help leadership teams make faster, clearer decisions.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-slate-700">
            {["Corporate & deals", "Disputes", "Employment", "Regulatory"].map((item) => (
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
              <p className="text-sm font-semibold text-[#0f172a]">New: deal room kit</p>
              <p className="text-sm text-slate-700">Timeline, trackers, and closing checklists used by our transaction squads.</p>
            </div>
          </div>
          <div className="mt-3 flex items-start gap-3 rounded-2xl bg-[#0f172a] px-4 py-3 text-white shadow-[0_14px_30px_rgba(15,23,42,0.25)]">
            <GlobeIcon className="mt-1 h-6 w-6 text-[#ffd699]" />
            <div>
              <p className="text-sm font-semibold">Cross-border expansion brief</p>
              <p className="text-sm text-white/80">Licensing, data, and people moves for new markets.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function Articles() {
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
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Latest</p>
          <h2 className="font-display text-3xl font-semibold text-[#0f172a]">Notes from active matters.</h2>
          <p className="text-base text-slate-600 md:max-w-2xl">Short reads built from deals, disputes, and compliance work across the region.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full border border-[#e5d8c7] px-5 py-3 text-sm font-semibold text-[#8b5e2b] transition hover:-translate-y-[1px] hover:border-[#d2b78f] hover:shadow-md">
          View all insights
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <motion.article
            key={article.title}
            className="flex h-full flex-col rounded-2xl border border-[#efe5d4] bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
            variants={fadeUp}
          >
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              <span>{article.tag}</span>
              <span>{article.date}</span>
            </div>
            <h3 className="mt-3 font-display text-xl font-semibold text-[#0f172a]">{article.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">{article.summary}</p>
            <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#8b5e2b]">
              Read memo
              <ArrowRightIcon className="h-4 w-4" />
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

function Library() {
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
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Toolkits</p>
          <h2 className="font-display text-3xl font-semibold text-[#0f172a]">Working documents we share with clients.</h2>
        </div>
        <div className="rounded-full bg-[#f3eadc] px-4 py-2 text-sm font-semibold text-[#8b5e2b]">Download-ready</div>
      </div>
      <div className="mt-6 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
        {highlights.map((item) => (
          <div key={item} className="flex items-start gap-3 rounded-2xl bg-[#fdfaf5] px-4 py-3 ring-1 ring-[#f1e6d7]">
            <CheckIcon className="mt-1 h-4 w-4 text-[#7a5326]" />
            <span>{item}</span>
          </div>
        ))}
      </div>
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
          Visuals for your insights.
        </h3>
        <p className="text-base text-slate-600">
          Add covers, charts, or event photos into these slots.
        </p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <PhotoPlaceholder label="Article cover" note="1200x800" />
        <PhotoPlaceholder label="Team speaking" note="1400x900" />
        <PhotoPlaceholder label="Event / workshop" note="1400x900" />
      </div>
    </motion.section>
  );
}

function Newsletter({ onSubscribe }: { onSubscribe: () => void }) {
  return (
    <motion.section
      className="mt-16 overflow-hidden rounded-[32px] border border-[#efe5d4] bg-gradient-to-r from-[#0f172a] via-[#15213a] to-[#0f172a] p-8 text-white shadow-[0_18px_48px_rgba(15,23,42,0.2)]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <div className="grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-center">
        <motion.div className="space-y-3" variants={fadeUp}>
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">Briefings</p>
          <h3 className="font-display text-3xl font-semibold">Get monthly insights first.</h3>
          <p className="text-sm text-white/80">Compact briefs with actions, timelines, and templates we are using right now.</p>
          <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.12em] text-white/70">
            <span className="rounded-full bg-white/10 px-3 py-1">Deals</span>
            <span className="rounded-full bg-white/10 px-3 py-1">Disputes</span>
            <span className="rounded-full bg-white/10 px-3 py-1">Employment</span>
            <span className="rounded-full bg-white/10 px-3 py-1">Regulatory</span>
          </div>
        </motion.div>
        <motion.div
          className="grid gap-3 rounded-[24px] border border-white/10 bg-white/10 p-4 text-sm"
          variants={fadeUp}
        >
          <input
            className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-3 text-white placeholder:text-white/60 outline-none transition focus:border-[#ffd699]"
            placeholder="Your name"
          />
          <input
            className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-3 text-white placeholder:text-white/60 outline-none transition focus:border-[#ffd699]"
            placeholder="you@company.com"
            type="email"
          />
          <button 
            type="button"
            onClick={onSubscribe}
            className="inline-flex items-center justify-center rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#0f172a] transition hover:-translate-y-[1px] hover:shadow-lg"
          >
            Subscribe
          </button>
          <p className="text-xs text-white/70">No spam. Just the briefs we send our clients.</p>
        </motion.div>
      </div>
    </motion.section>
  );
}
