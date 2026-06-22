"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const FIELD =
  "w-full rounded-[4px] border bg-field-bg px-[14px] py-[13px] text-[15px] text-foreground outline-none transition-colors focus:border-foreground";
const LABEL =
  "mb-2 block font-plex text-[10.5px] uppercase tracking-[0.1em] text-ink-mono";

type Props = {
  /** Product names to populate the "Product of interest" select. */
  productNames: string[];
};

export default function QuoteForm({ productNames }: Props) {
  const NOT_SURE = "Not sure yet — recommend one";
  const [form, setForm] = useState({
    name: "",
    phone: "",
    product: NOT_SURE,
    message: "",
    company: "", // honeypot
  });
  const [errors, setErrors] = useState({ name: false, phone: false });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );
  const [submittedName, setSubmittedName] = useState("");

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function submit() {
    const digits = form.phone.replace(/\D/g, "");
    const nextErrors = { name: !form.name.trim(), phone: digits.length < 10 };
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.phone) return;

    setStatus("sending");
    const details = form.message.trim();
    const message =
      details.length >= 10
        ? details
        : `Quote request via website. Product of interest: ${form.product}.`;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          productInterest: form.product,
          subject: "Quote request",
          message,
          company: form.company,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmittedName(form.name.trim().split(" ")[0]);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setForm({ name: "", phone: "", product: NOT_SURE, message: "", company: "" });
    setErrors({ name: false, phone: false });
    setStatus("idle");
    setSubmittedName("");
  }

  if (status === "done") {
    return (
      <div className="rounded-[6px] border border-border bg-card p-10">
        <div className="flex min-h-[420px] flex-col items-start justify-center">
          <div className="mb-6 flex size-[52px] items-center justify-center rounded-full bg-primary">
            <Check className="size-[22px] text-primary-foreground" strokeWidth={2.4} />
          </div>
          <h3 className="font-archivo text-[26px] font-bold tracking-[-0.01em]">
            Thank you, {submittedName}.
          </h3>
          <p className="mt-3 text-[16px] leading-[1.6] text-ink-soft">
            Your request is in. A member of our team will reach out within one
            business day with your itemised quote.
          </p>
          <button
            onClick={reset}
            className="mt-7 rounded-[4px] border border-input px-[22px] py-3 text-[14.5px] font-semibold transition-colors hover:border-foreground"
          >
            Send another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[6px] border border-border bg-card p-10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={LABEL}>Name</label>
          <input
            value={form.name}
            onChange={(e) => set("name")(e.target.value)}
            placeholder="Your name"
            className={errors.name ? `${FIELD} border-destructive` : `${FIELD} border-input`}
          />
          {errors.name && (
            <div className="mt-1.5 text-[12px] text-destructive">
              Please enter your name.
            </div>
          )}
        </div>
        <div>
          <label className={LABEL}>Phone</label>
          <input
            value={form.phone}
            onChange={(e) => set("phone")(e.target.value)}
            placeholder="10-digit number"
            inputMode="tel"
            className={errors.phone ? `${FIELD} border-destructive` : `${FIELD} border-input`}
          />
          {errors.phone && (
            <div className="mt-1.5 text-[12px] text-destructive">
              Enter a valid 10-digit phone.
            </div>
          )}
        </div>
      </div>

      <div className="mt-[18px]">
        <label className={LABEL}>Product of interest</label>
        <select
          value={form.product}
          onChange={(e) => set("product")(e.target.value)}
          className={`${FIELD} border-input`}
        >
          <option value={NOT_SURE}>{NOT_SURE}</option>
          {productNames.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-[18px]">
        <label className={LABEL}>Project details</label>
        <textarea
          value={form.message}
          onChange={(e) => set("message")(e.target.value)}
          placeholder="Dimensions, quantity, timeline, location…"
          rows={4}
          className={`${FIELD} resize-y border-input leading-[1.5]`}
        />
      </div>

      {/* honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        value={form.company}
        onChange={(e) => set("company")(e.target.value)}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {status === "error" && (
        <div className="mt-4 text-[13px] text-destructive">
          Something went wrong. Please call us at the number above.
        </div>
      )}

      <button
        onClick={submit}
        disabled={status === "sending"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[4px] bg-primary px-4 py-4 text-[15.5px] font-semibold text-primary-foreground transition-colors hover:bg-paper-dark-2 disabled:opacity-70"
      >
        {status === "sending" ? "Sending…" : "Send request"}
        {status !== "sending" && <ArrowRight className="size-3.5" />}
      </button>
      <p className="mt-4 text-center font-plex text-[10.5px] tracking-[0.04em] text-ink-mono">
        NO OBLIGATION · REPLY WITHIN 1 BUSINESS DAY
      </p>
    </div>
  );
}
