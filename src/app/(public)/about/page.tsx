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

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-hero-mesh">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
              Est. 2008 · Bengaluru, India
            </div>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground lg:text-5xl">
              Built on Precision.
              <br />
              <span className="text-gradient">Grown on Trust.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              R2R Doors began as a small workshop with a single premise: every door
              deserves to be measured twice, cut once, and finished for a lifetime.
              Sixteen years and 500+ projects later, that philosophy still drives
              every decision we make.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              From bespoke residential entrances to industrial-grade commercial
              partitions, we bring the same obsessive attention to detail — backed
              by rigorous material selection, in-house manufacturing, and a team
              that takes immense pride in what it builds.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {heroStats.map(({ value, label }) => (
              <div
                key={label}
                className="rounded-2xl bg-card p-6 text-center shadow-sm ring-1 ring-foreground/[0.07]"
              >
                <p className="text-3xl font-extrabold tracking-tight text-gradient">
                  {value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-background py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-brand-deep p-8 text-white shadow-md">
            <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-white/15">
              <Target className="size-5" />
            </div>
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="mt-3 leading-relaxed text-white/75">
              To deliver precision-engineered doors and windows that protect,
              beautify, and endure — at pricing that reflects the true value of
              quality workmanship, not inflated margins.
            </p>
          </div>
          <div className="rounded-3xl bg-card p-8 shadow-sm ring-1 ring-foreground/[0.07]">
            <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-accent text-primary ring-1 ring-primary/10">
              <Eye className="size-5" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              To become India&apos;s most trusted name in custom door and window
              manufacturing — recognised for engineering integrity, sustainable
              materials, and a customer experience that turns first-time buyers
              into lifelong partners.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-border bg-card py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Our Values
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              What We Stand For
            </h2>
            <p className="mt-3 text-muted-foreground">
              Four principles that guide every product, every project, every day.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl bg-background p-6 ring-1 ring-foreground/[0.07] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-primary">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Milestones
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Journey
            </h2>
            <p className="mt-3 text-muted-foreground">
              Milestones that shaped R2R Doors.
            </p>
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
                  <div className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-primary shadow-primary">
                    <span className="text-xs font-bold text-primary-foreground">
                      {m.year}
                    </span>
                  </div>
                  <div className="flex-1 rounded-2xl bg-card p-4 shadow-sm ring-1 ring-foreground/[0.07]">
                    <p className="text-sm font-medium leading-relaxed text-foreground">
                      {m.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
