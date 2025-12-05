"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Field } from "./SiteChrome";
import { useTranslations } from "../../lib/i18n/context";

interface ConsultationFormProps {
  onSubmit?: (data: any) => void;
}

export function ConsultationForm({ onSubmit }: ConsultationFormProps) {
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

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    if (onSubmit) {
      onSubmit(formData);
    }
    
    setIsSubmitting(false);
    // Reset form
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      matter: "",
      urgency: "",
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
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
            Matter Type
          </span>
          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            className="mt-2 w-full rounded-2xl border border-[#e5d8c7] bg-[#fdfaf5] px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#d2b78f] focus:ring-2 focus:ring-[#d2b78f]/30"
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
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
            Matter Summary
          </span>
          <textarea
            name="matter"
            value={formData.matter}
            onChange={handleChange}
            rows={5}
            placeholder="Please describe your legal matter, timeline, and desired outcome..."
            className={`mt-2 w-full rounded-2xl border ${
              errors.matter ? "border-red-300" : "border-[#e5d8c7]"
            } bg-[#fdfaf5] px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#d2b78f] focus:ring-2 focus:ring-[#d2b78f]/30`}
          />
          {errors.matter && (
            <p className="mt-1 text-xs text-red-600">{errors.matter}</p>
          )}
        </label>
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          name="privacy"
          checked={formData.privacy}
          onChange={handleChange}
          className="mt-1 h-4 w-4 rounded border-[#d9c7af] text-[#8b5e2b] focus:ring-[#8b5e2b]"
        />
        <label className="text-sm text-slate-700">
          I agree to the{" "}
          <a href="#" className="text-[#8b5e2b] hover:underline">
            privacy policy
          </a>{" "}
          and consent to being contacted by LegalGrup.
          {errors.privacy && (
            <span className="block mt-1 text-xs text-red-600">{errors.privacy}</span>
          )}
        </label>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 rounded-full bg-[#0f172a] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(15,23,42,0.25)] transition hover:-translate-y-[1px] hover:shadow-[0_18px_38px_rgba(15,23,42,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
      </div>
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
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
            Message
          </span>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            placeholder="How can we help you?"
            className={`mt-2 w-full rounded-2xl border ${
              errors.message ? "border-red-300" : "border-[#e5d8c7]"
            } bg-[#fdfaf5] px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#d2b78f] focus:ring-2 focus:ring-[#d2b78f]/30`}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-600">{errors.message}</p>
          )}
        </label>
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          name="privacy"
          checked={formData.privacy}
          onChange={handleChange}
          className="mt-1 h-4 w-4 rounded border-[#d9c7af] text-[#8b5e2b] focus:ring-[#8b5e2b]"
        />
        <label className="text-sm text-slate-700">
          I agree to the{" "}
          <a href="#" className="text-[#8b5e2b] hover:underline">
            privacy policy
          </a>
          .
          {errors.privacy && (
            <span className="block mt-1 text-xs text-red-600">{errors.privacy}</span>
          )}
        </label>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 rounded-full bg-[#0f172a] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(15,23,42,0.25)] transition hover:-translate-y-[1px] hover:shadow-[0_18px_38px_rgba(15,23,42,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}

interface ScheduleCallFormProps {
  onSubmit?: (data: any) => void;
}

export function ScheduleCallForm({ onSubmit }: ScheduleCallFormProps) {
  const { t } = useTranslations();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    problemDescription: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    if (onSubmit) {
      onSubmit(formData);
    }
    
    setIsSubmitting(false);
    // Reset form
    setFormData({
      fullName: "",
      phone: "",
      problemDescription: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
            {t.forms.scheduleCall.problemDescription}
          </span>
          <textarea
            name="problemDescription"
            value={formData.problemDescription}
            onChange={handleChange}
            rows={5}
            placeholder={t.forms.scheduleCall.problemDescriptionPlaceholder}
            className={`mt-2 w-full rounded-2xl border ${
              errors.problemDescription ? "border-red-300" : "border-[#e5d8c7]"
            } bg-[#fdfaf5] px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#d2b78f] focus:ring-2 focus:ring-[#d2b78f]/30`}
          />
          {errors.problemDescription && (
            <p className="mt-1 text-xs text-red-600">{errors.problemDescription}</p>
          )}
        </label>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 rounded-full bg-[#0f172a] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(15,23,42,0.25)] transition hover:-translate-y-[1px] hover:shadow-[0_18px_38px_rgba(15,23,42,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : t.forms.scheduleCall.submit}
        </button>
      </div>
    </form>
  );
}
