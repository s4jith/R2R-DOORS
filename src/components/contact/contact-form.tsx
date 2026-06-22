"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

const INTEREST_OPTIONS = [
  "General enquiry",
  "Doors",
  "Windows",
  "uPVC systems",
  "Aluminium systems",
  "Commercial / bulk order",
  "After-sales / warranty",
];

type Fields = {
  name: string;
  phone: string;
  email: string;
  productInterest: string;
  subject: string;
  message: string;
  company: string; // honeypot
};

const initial: Fields = {
  name: "",
  phone: "",
  email: "",
  productInterest: INTEREST_OPTIONS[0],
  subject: "",
  message: "",
  company: "",
};

const inputClass =
  "w-full rounded-[4px] border border-input bg-field-bg px-[14px] py-[13px] text-[15px] text-foreground outline-none transition-colors placeholder:text-ink-mono/70 focus:border-foreground aria-[invalid=true]:border-destructive";

const labelClass =
  "mb-2 block font-plex text-[10.5px] uppercase tracking-[0.1em] text-ink-mono";

export default function ContactForm() {
  const [values, setValues] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>(
    {}
  );
  const [submitting, setSubmitting] = useState(false);

  function set<K extends keyof Fields>(key: K, value: Fields[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (values.name.trim().length < 2) next.name = "Please enter your name";
    if (values.phone.trim().length < 6)
      next.phone = "Please enter a valid phone number";
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = "Please enter a valid email";
    if (values.message.trim().length < 10)
      next.message = "Please tell us a little more (10+ characters)";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      toast.success("Message sent — we'll get back to you within 24 hours.");
      setValues(initial);
    } catch {
      toast.error(
        `Couldn't send your message. Please call us instead.`
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      {/* honeypot — visually hidden, off the tab order */}
      <div aria-hidden className="hidden">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => set("company", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className={labelClass}
          >
            Name <span className="text-destructive">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            className={inputClass}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-xs text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className={labelClass}
          >
            Phone <span className="text-destructive">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 ..."
            className={inputClass}
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1 text-xs text-destructive">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="email"
            className={labelClass}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-xs text-destructive">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="productInterest"
            className={labelClass}
          >
            I&apos;m interested in
          </label>
          <select
            id="productInterest"
            className={inputClass}
            value={values.productInterest}
            onChange={(e) => set("productInterest", e.target.value)}
          >
            {INTEREST_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Subject
        </label>
        <input
          id="subject"
          type="text"
          placeholder="How can we help?"
          className={inputClass}
          value={values.subject}
          onChange={(e) => set("subject", e.target.value)}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Message <span className="text-destructive">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us about your project, dimensions, and timeline…"
          className={`${inputClass} resize-none`}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs text-destructive">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="group inline-flex items-center justify-center gap-2 rounded-[4px] bg-primary px-6 py-4 text-[15.5px] font-semibold text-primary-foreground transition-colors hover:bg-paper-dark-2 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send Message
            <Send className="size-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>
      <p className="font-plex text-[10.5px] tracking-[0.04em] text-ink-mono">
        We typically reply within 24 hours. Your details are never shared.
      </p>
    </form>
  );
}
