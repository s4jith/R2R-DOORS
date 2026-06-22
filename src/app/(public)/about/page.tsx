import type { Metadata } from "next";
import { CheckCircle2, Target, Eye, Users, Award, Hammer } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "R2R Doors & Windows has engineered precision doors and windows since 2008 — 500+ projects, ISO 9001:2015 certified, backed by a 10-year structural warranty.",
  alternates: { canonical: "/about" },
};

const milestones = [
  { year: "2008", event: "Founded in Bengaluru with a single manufacturing unit." },
  { year: "2012", event: "Expanded to 3 production lines; crossed 1,000 installations." },
  { year: "2016", event: "Launched the steel security door range and custom glazing division." },
  { year: "2020", event: "ISO 9001:2015 certification received after independent audit." },
  { year: "2024", event: "Opened second facility; crossed ₹10 Cr annual revenue." },
];

const values = [
  {
    icon: Hammer,
    title: "Precision Craftsmanship",
    description:
      "Every cut, joint, and finish is measured against tolerances of ±0.5mm. We refuse to compromise on dimensional accuracy.",
  },
  {
    icon: CheckCircle2,
    title: "Quality Without Negotiation",
    description:
      "12-point QC inspection on every product before dispatch. If it doesn't pass, it doesn't ship.",
  },
  {
    icon: Users,
    title: "Customer Partnership",
    description:
      "We work alongside architects, contractors, and homeowners to understand requirements before drawing a single design.",
  },
  {
    icon: Award,
    title: "Accountability",
    description:
      "Our 10-year structural warranty isn't a marketing line — it's backed by a dedicated after-sales team and documented service records.",
  },
];

const heroStats = [
  { value: "500+", label: "Projects Completed" },
  { value: "15+", label: "Years of Experience" },
  { value: "8", label: "Product Categories" },
  { value: "10yr", label: "Structural Warranty" },
];

const eyebrow = "mb-4 font-plex text-[11.5px] uppercase tracking-[0.16em] text-brass";
const h2 = "font-archivo text-[clamp(30px,4vw,42px)] font-bold leading-[1.04] tracking-[-0.02em]";
const container = "mx-auto max-w-[1240px] px-5 sm:px-8";

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-dotgrid [background-size:18px_18px] opacity-50 [mask-image:linear-gradient(to_left,black,transparent)]"
        />
        <div className={`${container} relative grid grid-cols-1 items-center gap-12 py-20 lg:grid-cols-2`}>
          <div>
            <div className="mb-6 inline-flex items-center gap-2 font-plex text-[11.5px] uppercase tracking-[0.16em] text-brass">
              <span className="h-px w-6 bg-brass" />
              Est. 2008 · Bengaluru, India
            </div>
            <h1 className="font-archivo text-[clamp(38px,5vw,52px)] font-extrabold leading-[1.06] tracking-[-0.025em]">
              Built on precision.
              <br />
              Grown on trust.
            </h1>
            <p className="mt-6 text-[18px] leading-[1.65] text-ink-soft">
              R2R Doors began as a small workshop with a single premise: every
              door deserves to be measured twice, cut once, and finished for a
              lifetime. Sixteen years and 500+ projects later, that philosophy
              still drives every decision we make.
            </p>
            <p className="mt-4 leading-[1.65] text-ink-soft">
              From bespoke residential entrances to industrial-grade commercial
              partitions, we bring the same obsessive attention to detail —
              backed by rigorous material selection, in-house manufacturing, and
              a team that takes immense pride in what it builds.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[6px] border border-border bg-border">
            {heroStats.map(({ value, label }) => (
              <div key={label} className="bg-card p-8 text-center">
                <p className="font-archivo text-[36px] font-bold tracking-[-0.02em] text-foreground">
                  {value}
                </p>
                <p className="mt-1.5 font-plex text-[11px] uppercase tracking-[0.08em] text-ink-mono">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="border-b border-border py-[72px] sm:py-[100px]">
        <div className={`${container} grid grid-cols-1 gap-5 md:grid-cols-2`}>
          <div className="rounded-[6px] bg-paper-dark p-9 text-on-dark">
            <div className="mb-5 flex size-12 items-center justify-center rounded-[4px] bg-white/10 text-[#ffffff]">
              <Target className="size-5" />
            </div>
            <h2 className="font-archivo text-[24px] font-bold tracking-[-0.01em] text-[#ffffff]">
              Our Mission
            </h2>
            <p className="mt-3 leading-[1.65] text-on-dark">
              To deliver precision-engineered doors and windows that protect,
              beautify, and endure — at pricing that reflects the true value of
              quality workmanship, not inflated margins.
            </p>
          </div>
          <div className="rounded-[6px] border border-border bg-card p-9">
            <div className="mb-5 flex size-12 items-center justify-center rounded-[4px] bg-accent text-brass">
              <Eye className="size-5" />
            </div>
            <h2 className="font-archivo text-[24px] font-bold tracking-[-0.01em] text-foreground">
              Our Vision
            </h2>
            <p className="mt-3 leading-[1.65] text-ink-soft">
              To become India&apos;s most trusted name in custom door and window
              manufacturing — recognised for engineering integrity, sustainable
              materials, and a customer experience that turns first-time buyers
              into lifelong partners.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-border bg-surface-2 py-[72px] sm:py-[100px]">
        <div className={container}>
          <div className="mx-auto mb-14 max-w-[640px] text-center">
            <div className={eyebrow}>Our Values</div>
            <h2 className={h2}>What we stand for</h2>
            <p className="mt-3 text-ink-soft">
              Four principles that guide every product, every project, every day.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex gap-5 rounded-[6px] border border-border bg-background p-7"
              >
                <div className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-[4px] bg-primary text-primary-foreground">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-archivo text-[19px] font-semibold tracking-[-0.01em] text-foreground">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-[1.6] text-ink-soft">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-[72px] sm:py-[100px]">
        <div className="mx-auto max-w-[820px] px-5 sm:px-8">
          <div className="mb-14 text-center">
            <div className={eyebrow}>Milestones</div>
            <h2 className={h2}>Our journey</h2>
          </div>
          <div className="relative">
            <div className="absolute bottom-0 left-[28px] top-0 w-px bg-border md:left-1/2" />
            <div className="flex flex-col gap-8">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`flex items-start gap-6 md:w-1/2 ${
                    i % 2 === 0
                      ? "md:ml-auto md:pl-8"
                      : "md:mr-auto md:flex-row-reverse md:pr-8 md:text-right"
                  }`}
                >
                  <div className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-[4px] bg-primary">
                    <span className="font-plex text-[12px] font-semibold text-primary-foreground">
                      {m.year}
                    </span>
                  </div>
                  <div className="flex-1 rounded-[6px] border border-border bg-card p-4">
                    <p className="text-[14.5px] font-medium leading-[1.55] text-foreground">
                      {m.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
