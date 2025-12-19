"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Field } from "./SiteChrome";
import { useTranslations } from "../../lib/i18n/context";

type StatusState = { type: "success" | "error"; text: string } | null;

async function sendLead(body: {
  name?: string;
  phone?: string;
  email?: string;
  message: string;
  source?: string;
}) {
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...body,
      pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
    }),
  });

  const text = await res.text();
  let data: any = {};
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = {};
    }
  }
  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`);
  }
  return data;
}

function SuccessOverlay({ onClose, title, text }: { onClose: () => void; title: string; text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-10 flex items-center justify-center bg-black/70 backdrop-blur"
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 240, damping: 18 }}
        className="w-full max-w-sm rounded-2xl border border-[#1f2a44] bg-gradient-to-br from-[#0b1221] to-[#0f172a] p-6 text-slate-100 shadow-2xl shadow-black/40"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[var(--accent)] ring-1 ring-[var(--accent)]/40">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="mt-4 text-center">
          <div className="text-lg font-semibold text-slate-100">{title}</div>
          <div className="mt-2 text-sm text-slate-200">{text}</div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-[var(--accent)] to-[#f59e0b] px-4 py-2 text-sm font-semibold text-[#0b0f1c] shadow hover:-translate-y-[1px] hover:shadow-[0_12px_30px_rgba(244,200,108,0.45)] transition"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}

interface ConsultationFormProps {
  onSubmit?: (data: any) => void;
  source?: string;
}

export function ConsultationForm({ onSubmit, source }: ConsultationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    matter: "",
    urgency: "",
    privacy: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<StatusState>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.matter.trim()) newErrors.matter = "Matter description is required";
    if (!formData.privacy) newErrors.privacy = "You must agree to the privacy policy";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus(null);
    setIsSubmitting(true);
    const messageParts = [
      formData.matter.trim() ? `Matter: ${formData.matter.trim()}` : null,
      formData.company.trim() ? `Company: ${formData.company.trim()}` : null,
      formData.urgency.trim() ? `Matter type: ${formData.urgency.trim()}` : null,
    ].filter(Boolean);

    try {
      await sendLead({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        message: messageParts.join("\n"),
        source: source || "Consultation form",
      });
      if (onSubmit) {
        onSubmit(formData);
      }
      setStatus({ type: "success", text: "Ждите ответ от нашей компании" });
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        matter: "",
        urgency: "",
        privacy: false,
      });
    } catch (err: any) {
      setStatus({ type: "error", text: err?.message || "Failed to send. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Field
            label="Full Name"
            placeholder="Your name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
        </div>
        <div>
          <Field
            label="Company"
            placeholder="Company or organization"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Field
            label="Email"
            placeholder="you@company.com"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
        </div>
        <div>
          <Field
            label="Phone"
            placeholder="+62 812 3456 7890"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm mb-2">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">
            Matter Type
          </span>
          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            className="mt-2 w-full rounded-2xl border border-[#1f2a44] bg-[#0f172a] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-[var(--accent)]/70 focus:ring-2 focus:ring-[var(--accent)]/30"
          >
            <option value="">Select matter type</option>
            <option value="corporate">Corporate & Commercial</option>
            <option value="mna">Mergers & Acquisitions</option>
            <option value="disputes">Disputes & Litigation</option>
            <option value="employment">Employment & Compliance</option>
            <option value="regulatory">Regulatory Advisory</option>
            <option value="private">Private Clients</option>
            <option value="other">Other</option>
          </select>
        </label>
      </div>

      <div>
        <label className="block text-sm">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">
            Matter Summary
          </span>
          <textarea
            name="matter"
            value={formData.matter}
            onChange={handleChange}
            rows={5}
            placeholder="Please describe your legal matter, timeline, and desired outcome..."
            className={`mt-2 w-full rounded-2xl border ${
              errors.matter ? "border-red-400" : "border-[#1f2a44]"
            } bg-[#0f172a] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-[var(--accent)]/70 focus:ring-2 focus:ring-[var(--accent)]/30`}
          />
          {errors.matter && (
            <p className="mt-1 text-xs text-red-400">{errors.matter}</p>
          )}
        </label>
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          name="privacy"
          checked={formData.privacy}
          onChange={handleChange}
          className="mt-1 h-4 w-4 rounded border-[#1f2a44] bg-[#0f172a] text-[var(--accent)] focus:ring-[var(--accent)] focus:ring-offset-0"
        />
        <label className="text-sm text-slate-200">
          I agree to the{" "}
          <a href="#" className="text-[var(--accent)] hover:underline">
            privacy policy
          </a>{" "}
          and consent to being contacted by LegalGrup.
          {errors.privacy && (
            <span className="block mt-1 text-xs text-red-400">{errors.privacy}</span>
          )}
        </label>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 rounded-full bg-gradient-to-r from-[var(--accent)] to-[#f59e0b] px-6 py-3 text-sm font-semibold text-[#0b0f1c] shadow-[0_14px_30px_rgba(244,200,108,0.35)] transition hover:-translate-y-[1px] hover:shadow-[0_18px_38px_rgba(244,200,108,0.45)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
      </div>
      {status?.type === "error" && (
        <div className="mt-4 rounded-xl border border-red-500/40 bg-red-900/40 px-4 py-3 text-sm text-red-100">
          {status.text}
        </div>
      )}
      {status?.type === "success" && (
        <SuccessOverlay
          title="Успешно отправлено"
          text={status.text}
          onClose={() => setStatus(null)}
        />
      )}
    </form>
  );
}

interface ContactFormProps {
  onSubmit?: (data: any) => void;
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    privacy: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (!formData.privacy) newErrors.privacy = "You must agree to the privacy policy";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    if (onSubmit) {
      onSubmit(formData);
    }
    
    setIsSubmitting(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      privacy: false,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Field
            label="Full Name"
            placeholder="Your name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
        </div>
        <div>
          <Field
            label="Email"
            placeholder="you@company.com"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
        </div>
      </div>

      <div>
        <Field
          label="Phone (Optional)"
          placeholder="+62 812 3456 7890"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">
            Message
          </span>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            placeholder="How can we help you?"
            className={`mt-2 w-full rounded-2xl border ${
              errors.message ? "border-red-400" : "border-[#1f2a44]"
            } bg-[#0f172a] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-[var(--accent)]/70 focus:ring-2 focus:ring-[var(--accent)]/30`}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-400">{errors.message}</p>
          )}
        </label>
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          name="privacy"
          checked={formData.privacy}
          onChange={handleChange}
          className="mt-1 h-4 w-4 rounded border-[#1f2a44] bg-[#0f172a] text-[var(--accent)] focus:ring-[var(--accent)] focus:ring-offset-0"
        />
        <label className="text-sm text-slate-200">
          I agree to the{" "}
          <a href="#" className="text-[var(--accent)] hover:underline">
            privacy policy
          </a>
          .
          {errors.privacy && (
            <span className="block mt-1 text-xs text-red-400">{errors.privacy}</span>
          )}
        </label>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 rounded-full bg-gradient-to-r from-[var(--accent)] to-[#f59e0b] px-6 py-3 text-sm font-semibold text-[#0b0f1c] shadow-[0_14px_30px_rgba(244,200,108,0.35)] transition hover:-translate-y-[1px] hover:shadow-[0_18px_38px_rgba(244,200,108,0.45)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}

interface ScheduleCallFormProps {
  onSubmit?: (data: any) => void;
  source?: string;
}

export function ScheduleCallForm({ onSubmit, source }: ScheduleCallFormProps) {
  const { t } = useTranslations();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    problemDescription: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<StatusState>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.problemDescription.trim()) newErrors.problemDescription = "Problem description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus(null);
    setIsSubmitting(true);
    try {
      await sendLead({
        name: formData.fullName.trim(),
        phone: formData.phone.trim(),
        message: formData.problemDescription.trim(),
        source: source || t.forms.scheduleCall.title,
      });
      if (onSubmit) {
        onSubmit(formData);
      }
      setStatus({ type: "success", text: "Ждите ответ от нашей компании" });
      setFormData({
        fullName: "",
        phone: "",
        problemDescription: "",
      });
    } catch (err: any) {
      setStatus({ type: "error", text: err?.message || "Failed to send. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative space-y-6">
      <div>
        <Field
          label={t.forms.scheduleCall.fullName}
          placeholder={t.forms.scheduleCall.fullName}
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />
      </div>

      <div>
        <Field
          label={t.forms.scheduleCall.phone}
          placeholder="+62 812 3456 7890"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />
      </div>

      <div>
        <label className="block text-sm">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">
            {t.forms.scheduleCall.problemDescription}
          </span>
          <textarea
            name="problemDescription"
            value={formData.problemDescription}
            onChange={handleChange}
            rows={5}
            placeholder={t.forms.scheduleCall.problemDescriptionPlaceholder}
            className={`mt-2 w-full rounded-2xl border ${
              errors.problemDescription ? "border-red-400" : "border-[#1f2a44]"
            } bg-[#0f172a] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-[var(--accent)]/70 focus:ring-2 focus:ring-[var(--accent)]/30`}
          />
          {errors.problemDescription && (
            <p className="mt-1 text-xs text-red-400">{errors.problemDescription}</p>
          )}
        </label>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 rounded-full bg-gradient-to-r from-[var(--accent)] to-[#f59e0b] px-6 py-3 text-sm font-semibold text-[#0b0f1c] shadow-[0_14px_30px_rgba(244,200,108,0.35)] transition hover:-translate-y-[1px] hover:shadow-[0_18px_38px_rgba(244,200,108,0.45)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : t.forms.scheduleCall.submit}
        </button>
      </div>
      {status?.type === "error" && (
        <div className="mt-4 rounded-xl border border-red-500/40 bg-red-900/40 px-4 py-3 text-sm text-red-100">
          {status.text}
        </div>
      )}
      {status?.type === "success" && (
        <SuccessOverlay
          title="Успешно отправлено"
          text={status.text}
          onClose={() => setStatus(null)}
        />
      )}
    </form>
  );
}
