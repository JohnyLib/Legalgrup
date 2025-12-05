"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Modal } from "../components/Modal";
import { ContactForm } from "../components/Forms";
import {
  PageShell,
  Field,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  CheckIcon,
  PhotoPlaceholder,
} from "../components/SiteChrome";

const offices = [
  {
    city: "Cimișlia",
    address: "or.Cimișlia, str.Sf Maria 2 of 1",
    phone: "+373 79021904 (Coada Andrei, Lawyer)",
  },
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

export default function ContactPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <PageShell>
        <Hero />
        <ContactCards />
        <PhotoSlots />
        <ContactFormSection onOpenForm={() => setIsContactOpen(true)} />
      </PageShell>

      <Modal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        title="Contact Us"
        size="md"
      >
        <ContactForm
          onSubmit={(data) => {
            console.log("Contact form submitted:", data);
            setIsContactOpen(false);
            alert("Thank you for your message! We'll get back to you soon.");
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
      <div className="relative grid gap-10 px-6 py-10 md:px-12 md:py-14 lg:grid-cols-[1fr_0.95fr]">
        <div className="flex flex-col justify-center gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#efe5d4] px-4 py-2 text-sm font-semibold tracking-tight text-[#8b5e2b] shadow-sm">
            <PhoneIcon className="h-4 w-4" />
            Immediate response
          </div>
          <div className="space-y-3">
            <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-[#0f172a] md:text-5xl">
              Talk to a partner this week.
            </h1>
            <p className="text-lg leading-8 text-slate-600 md:max-w-2xl">
              Share the essentials of your matter. We respond with a plan, budget range, and availability.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-slate-700">
            {["Response in < 24h", "Confidential handling", "Partner-led intake"].map((item) => (
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
                <p className="font-semibold text-[#0f172a]">Hotline</p>
                <p>+373 79021904 (Coada Andrei, Lawyer)</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-[#fdfaf5] px-4 py-3 ring-1 ring-[#f1e6d7]">
              <MailIcon className="h-5 w-5 text-[#7a5326]" />
              <div>
                <p className="font-semibold text-[#0f172a]">Intake</p>
                <p>legalgrup.md@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-[#0f172a] px-4 py-3 text-white shadow-[0_14px_30px_rgba(15,23,42,0.25)]">
              <MapPinIcon className="h-5 w-5 text-[#ffd699]" />
              <div>
                <p className="text-sm font-semibold">or.Cimișlia str.Sf Maria 2 of 1</p>
                <p className="text-xs text-white/70">Hybrid and on-site availability</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function ContactCards() {
  return (
    <motion.section
      className="mt-16 space-y-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Offices</p>
        <h2 className="font-display text-3xl font-semibold text-[#0f172a]">Where to find us.</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {offices.map((office) => (
          <motion.div
            key={office.city}
            className="rounded-2xl border border-[#efe5d4] bg-white p-6 shadow-sm"
            variants={fadeUp}
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
          </motion.div>
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
          Add contact visuals.
        </h3>
        <p className="text-base text-slate-600">
          Office exterior, reception, or team photos for the contact page.
        </p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <PhotoPlaceholder label="Cimișlia office" note="1400x900" />
        <PhotoPlaceholder label="Reception" note="1400x900" />
        <PhotoPlaceholder label="Team greeting" note="1200x800" />
      </div>
    </motion.section>
  );
}

function ContactFormSection({ onOpenForm }: { onOpenForm: () => void }) {
  return (
    <motion.section
      className="mt-16 overflow-hidden rounded-[32px] border border-[#efe5d4] bg-white shadow-[0_18px_48px_rgba(15,23,42,0.14)]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <div className="relative grid gap-10 px-6 py-10 md:grid-cols-[1fr_0.95fr] md:px-12 md:py-14">
        <div className="absolute right-[-120px] top-[-80px] h-72 w-72 rounded-full bg-[#f3eadc] blur-3xl" />
        <motion.div className="relative space-y-5" variants={fadeUp}>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Contact</p>
          <h3 className="font-display text-3xl font-semibold text-[#0f172a]">Share your matter.</h3>
          <p className="text-base text-slate-600">
            We keep your note confidential and respond with clear next steps.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Partner-led", "Response in < 24h", "Scope clarity", "Budget ranges"].map((item) => (
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
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Tell us about it</p>
              <h4 className="font-display text-xl font-semibold text-[#0f172a]">We prepare before we meet.</h4>
            </div>
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" placeholder="Your name" />
                <Field label="Company" placeholder="Company or team" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email" placeholder="you@company.com" type="email" />
                <Field label="Phone" placeholder="+373 790 21904" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">Matter summary</label>
                <textarea
                  className="mt-2 w-full rounded-2xl border border-[#e5d8c7] bg-[#fdfaf5] px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#d2b78f] focus:ring-2 focus:ring-[#d2b78f]/30"
                  rows={4}
                  placeholder="Share context, timelines, and the outcome you need."
                />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <label className="flex items-center gap-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-[#d9c7af] text-[#8b5e2b] focus:ring-[#8b5e2b]"
                  />
                  I agree to the privacy policy.
                </label>
                <button
                  type="button"
                  onClick={onOpenForm}
                  className="inline-flex items-center justify-center rounded-full bg-[#0f172a] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(15,23,42,0.25)] transition hover:-translate-y-[1px] hover:shadow-[0_18px_38px_rgba(15,23,42,0.3)]"
                >
                  Send my request
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
