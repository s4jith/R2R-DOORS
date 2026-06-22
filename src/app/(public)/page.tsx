export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroElevation from "@/components/marketing/hero-elevation";
import ProductRange from "@/components/product/product-range";
import R2RFaq from "@/components/marketing/r2r-faq";
import QuoteForm from "@/components/contact/quote-form";
import { getProducts } from "@/lib/services/products";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Precision Doors. Perfect Fit.",
  description: site.description,
  alternates: { canonical: "/" },
};

const credentials = [
  "GRADE-A TEAK",
  "GALVANISED STEEL",
  "uPVC",
  "ALUMINIUM ALLOY",
  "WPC",
  "TOUGHENED GLASS",
  "ISO 9001:2015",
  "12-POINT INSPECTION",
  "INSURED FREIGHT",
];

const stats = [
  { value: "500+", label: "Projects delivered" },
  { value: "15+", label: "Years in business" },
  { value: "10-Yr", label: "Structural warranty" },
  { value: "±0.5mm", label: "Cut tolerance" },
];

const capabilities = [
  {
    num: "01",
    title: "Made to your exact spec",
    desc: "Every door and window is built to your precise opening — no standard sizes, no on-site surprises. Send measurements or book a free on-site measure; we cut to ±0.5 mm.",
  },
  {
    num: "02",
    title: "Materials that last",
    desc: "Grade-A teak, galvanised steel, uPVC, aluminium alloy, WPC and toughened glass — we recommend the right material for your climate, budget and security needs.",
  },
  {
    num: "03",
    title: "Honest factory-direct pricing",
    desc: "Priced per square foot at direct factory rates with no middlemen. Premium quality at transparent, itemised pricing you can plan around.",
  },
  {
    num: "04",
    title: "Installed & guaranteed",
    desc: "Certified teams fit, align and seal on every project, backed by a 12-point quality inspection and a 10-year structural warranty against defects.",
  },
];

const process = [
  { num: "01", title: "Measure", desc: "Share your dimensions or book a free on-site measure with our team." },
  { num: "02", title: "Craft", desc: "Built to spec on our floor and put through a 12-point quality inspection." },
  { num: "03", title: "Install", desc: "Certified teams fit, align and seal — guaranteed for 10 years." },
];

const featured = {
  title: "Meridian Office Park",
  category: "Commercial",
  meta: "OUTER RING ROAD, BENGALURU · 2023",
  summary:
    "A full-height frameless glass partition system and pivot entrance doors for a 40,000 sq.ft Grade-A office — daylight, acoustic privacy and a minimal, premium aesthetic.",
  stats: [
    { value: "40,000", label: "Sq.ft fitted" },
    { value: "120 m", label: "Glass partitions" },
    { value: "6 wks", label: "Timeline" },
  ],
};

const projects = [
  {
    title: "Lakeview Villa",
    category: "Residential",
    summary: "Bespoke Grade-A teak entrance with matching internal doors and hardwood casements.",
    meta: "SARJAPUR · 2024",
  },
  {
    title: "Skyline Residences",
    category: "Residential",
    summary: "180 uPVC casement windows and balcony sliding doors across a 12-floor tower.",
    meta: "WHITEFIELD · 2024",
  },
];

const testimonials = [
  {
    quote:
      "I specify R2R on every project now. The dimensional accuracy is genuinely ±0.5 mm, the glass partitions arrived perfect, and their site team is meticulous. Rare to find that combination.",
    name: "Priya Sharma",
    role: "ARCHITECT · STUDIO FORM",
  },
  {
    quote:
      "40,000 sq.ft of partitions and entrance doors, delivered in six weeks with zero rework. Their coordination with our fit-out schedule was the smoothest part of the whole project.",
    name: "Amit Patel",
    role: "PROJECT MANAGER · MERIDIAN",
  },
  {
    quote:
      "The teak entrance door R2R built for us is a work of art. They measured twice, delivered on the promised date, and the fit is flawless. Three years on, not a single warp.",
    name: "Rajesh Kumar",
    role: "HOMEOWNER · WHITEFIELD",
  },
];

const faqs = [
  {
    question: "Do you manufacture to custom sizes?",
    answer:
      "Yes — every door and window is built to your exact opening. There are no standard sizes. Share your measurements or book a free on-site measure and we cut to ±0.5 mm tolerance.",
  },
  {
    question: "What materials do you work with?",
    answer:
      "Grade-A teak and engineered hardwood, galvanised steel, uPVC with double glazing, aluminium alloy, WPC, and toughened glass. We recommend the right material for your climate, budget, and security needs.",
  },
  {
    question: "How long does production and delivery take?",
    answer:
      "Most orders move from production to delivery in 7–14 working days across India, with insured freight. Large commercial projects are scheduled in phases to match your construction timeline.",
  },
  {
    question: "Do you provide installation?",
    answer:
      "Yes. Certified installation teams handle fitting, alignment, and sealing on every project. Workmanship is covered, and the product carries a 10-year structural warranty against manufacturing defects.",
  },
  {
    question: "How is pricing calculated?",
    answer:
      "Pricing is per square foot of the finished opening, with direct factory rates and no middlemen. Request a detailed written quote and we'll itemise everything before you commit.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We are based in Bengaluru and serve residential, commercial, and industrial clients across India. Insured freight means we can deliver and install well beyond Karnataka.",
  },
];

const contactRows = [
  { label: "Workshop", value: site.address.full },
  { label: "Phone", value: site.phone.display },
  { label: "Email", value: site.email },
  { label: "Hours", value: "Mon–Sat 9:00–19:00 · Sunday by appointment" },
];

const eyebrow =
  "mb-4 font-plex text-[11.5px] uppercase tracking-[0.16em] text-brass";
const h2 =
  "font-archivo text-[clamp(30px,4vw,42px)] font-bold leading-[1.04] tracking-[-0.02em]";
const container = "mx-auto max-w-[1240px] px-5 sm:px-8";

function FeaturedArt() {
  return (
    <svg width="260" height="200" viewBox="0 0 260 200" fill="none" style={{ color: "#26456a" }} className="max-w-full">
      <rect x="10" y="14" width="240" height="158" stroke="currentColor" strokeWidth="1.6" />
      <line x1="70" y1="14" x2="70" y2="172" stroke="currentColor" strokeWidth="1" />
      <line x1="130" y1="14" x2="130" y2="172" stroke="currentColor" strokeWidth="1" />
      <line x1="190" y1="14" x2="190" y2="172" stroke="currentColor" strokeWidth="1" />
      <line x1="130" y1="14" x2="130" y2="172" stroke="#1763c4" strokeWidth="1.6" />
      <circle cx="124" cy="96" r="3" fill="#1763c4" />
      <circle cx="136" cy="96" r="3" fill="#1763c4" />
      <line x1="4" y1="180" x2="256" y2="180" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function ProjectArt() {
  return (
    <svg width="64" height="92" viewBox="0 0 64 92" fill="none" style={{ color: "#26456a" }}>
      <rect x="8" y="6" width="48" height="78" stroke="currentColor" strokeWidth="1.4" />
      <rect x="14" y="12" width="36" height="66" stroke="currentColor" strokeWidth="1" />
      <line x1="32" y1="12" x2="32" y2="78" stroke="#1763c4" strokeWidth="1.2" />
    </svg>
  );
}

export default async function HomePage() {
  let products: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    products = await getProducts();
  } catch {
    // DB unavailable — ProductRange renders its own empty state.
  }
  const productNames = products.map((p) => p.name);

  return (
    <div className="bg-background text-foreground">
      {/* ══ Hero ══ */}
      <section id="hero" className="border-b border-border">
        <div className={container}>
          <div className="grid items-center gap-12 py-[72px] sm:py-[76px] lg:min-h-[560px] lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
            <div>
              <div className={`inline-flex items-center gap-2.5 ${eyebrow} mb-[26px]`}>
                <span className="h-px w-6 bg-brass" />
                Made-to-measure since 2008
              </div>
              <h1 className="font-archivo text-[clamp(46px,4.6vw,62px)] font-extrabold leading-[1.0] tracking-[-0.025em] text-foreground [text-wrap:balance]">
                Precision doors.
                <br />
                Perfect fit.
              </h1>
              <p className="mt-[26px] max-w-[480px] text-[18.5px] leading-[1.6] text-ink-soft">
                Custom-built doors &amp; windows, manufactured to your exact
                opening and cut to ±0.5&nbsp;mm. Premium materials, honest
                factory-direct pricing — from our floor to your site.
              </p>
              <div className="mt-9 flex flex-wrap gap-3.5">
                <Link
                  href="#products"
                  className="inline-flex items-center gap-2.5 rounded-[4px] bg-primary px-[26px] py-[15px] text-[15.5px] font-semibold text-primary-foreground transition-colors hover:bg-paper-dark-2"
                >
                  Explore the range
                  <ArrowRight className="size-[15px]" />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2.5 rounded-[4px] border border-input px-[26px] py-[15px] text-[15.5px] font-semibold text-foreground transition-colors hover:border-foreground"
                >
                  Get a quote
                </Link>
              </div>
              <div className="mt-12 flex flex-wrap gap-x-7 gap-y-2 border-t border-border pt-7 font-plex text-[12px] tracking-[0.04em] text-ink-mono">
                <span>GRADE-A TEAK</span>
                <span>STEEL</span>
                <span>uPVC</span>
                <span>ALUMINIUM</span>
              </div>
            </div>

            <HeroElevation />
          </div>
        </div>
      </section>

      {/* ══ Credentials strip ══ */}
      <section className="bg-paper-dark text-on-dark">
        <div className={`${container} flex flex-wrap items-center justify-center gap-y-3.5 py-[18px] font-plex text-[11.5px] tracking-[0.08em]`}>
          {credentials.map((c, i) => (
            <span key={c} className="inline-flex items-center">
              {i > 0 && <span className="mx-[22px] size-1 rounded-full bg-brass-light" />}
              <span className="whitespace-nowrap">{c}</span>
            </span>
          ))}
        </div>
      </section>

      {/* ══ Stats ══ */}
      <section className="border-b border-border">
        <div className={container}>
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="border-l border-border px-8 py-14">
                <div className="font-archivo text-[52px] font-bold leading-none tracking-[-0.02em] text-foreground">
                  {s.value}
                </div>
                <div className="mt-3.5 font-plex text-[11.5px] uppercase tracking-[0.1em] text-ink-mono">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Product range ══ */}
      <section id="products" className="scroll-mt-[92px] border-b border-border py-[72px] sm:py-[100px]">
        <div className={container}>
          <ProductRange products={products} />
        </div>
      </section>

      {/* ══ Why R2R / capabilities ══ */}
      <section id="about" className="scroll-mt-[92px] border-b border-border py-[72px] sm:py-[100px]">
        <div className={container}>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <div className={eyebrow}>Why R2R</div>
              <h2 className={h2}>Built to a higher standard</h2>
              <p className="mt-6 text-[17px] leading-[1.65] text-ink-soft">
                Since 2008, every door and window leaves our floor only after a
                12-point quality inspection. We don&apos;t ship doors — we ship
                confidence.
              </p>
              <Link
                href="#contact"
                className="mt-7 inline-flex items-center gap-2.5 border-b border-brass pb-[3px] text-[15px] font-semibold text-brass"
              >
                Talk to our team
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
            <div className="border-t border-border">
              {capabilities.map((cap) => (
                <div
                  key={cap.num}
                  className="grid grid-cols-[56px_1fr] gap-6 border-b border-border py-7"
                >
                  <div className="pt-1 font-plex text-[13px] text-brass">{cap.num}</div>
                  <div>
                    <h3 className="font-archivo text-[21px] font-semibold tracking-[-0.01em] text-foreground">
                      {cap.title}
                    </h3>
                    <p className="mt-2 max-w-[540px] text-[15.5px] leading-[1.6] text-ink-soft">
                      {cap.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ Process ══ */}
      <section className="border-b border-border bg-surface-2 py-[72px] sm:py-[100px]">
        <div className={container}>
          <div className="mb-14 text-center">
            <div className={eyebrow}>How it works</div>
            <h2 className={h2}>Three steps to a perfect fit</h2>
          </div>
          <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
            {process.map((step) => (
              <div key={step.num} className="rounded-[6px] border border-border bg-background p-[34px]">
                <div className="mb-7 flex items-center justify-between">
                  <span className="font-archivo text-[17px] font-extrabold text-foreground">
                    {step.num}
                  </span>
                  <span className="font-plex text-[10.5px] tracking-[0.12em] text-ink-mono">
                    STEP
                  </span>
                </div>
                <h3 className="font-archivo text-[22px] font-semibold tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[15.5px] leading-[1.6] text-ink-soft">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Selected work ══ */}
      <section id="work" className="scroll-mt-[92px] border-b border-border py-[72px] sm:py-[100px]">
        <div className={container}>
          <div className="mb-10">
            <div className={eyebrow}>Selected work</div>
            <h2 className={h2}>500+ projects, delivered</h2>
          </div>

          {/* Featured */}
          <div className="mb-5 grid overflow-hidden rounded-[6px] border border-border bg-card lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative flex min-h-[300px] items-center justify-center border-b border-border bg-surface-illu bg-dotgrid [background-size:18px_18px] lg:min-h-[380px] lg:border-b-0 lg:border-r">
              <FeaturedArt />
              <span className="absolute left-[18px] top-[18px] rounded-[3px] border border-border bg-card px-[11px] py-[5px] font-plex text-[10.5px] uppercase tracking-[0.1em] text-ink-mono">
                {featured.category}
              </span>
            </div>
            <div className="p-9 sm:p-11">
              <h3 className="font-archivo text-[28px] font-bold tracking-[-0.02em]">
                {featured.title}
              </h3>
              <div className="mt-2 font-plex text-[12px] tracking-[0.04em] text-ink-mono">
                {featured.meta}
              </div>
              <p className="mt-5 text-[16px] leading-[1.65] text-ink-soft">
                {featured.summary}
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-7">
                {featured.stats.map((fs) => (
                  <div key={fs.label}>
                    <div className="font-archivo text-[22px] font-bold tracking-[-0.01em]">
                      {fs.value}
                    </div>
                    <div className="mt-1.5 font-plex text-[10px] uppercase tracking-[0.08em] text-ink-mono">
                      {fs.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Secondary */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {projects.map((proj) => (
              <div
                key={proj.title}
                className="grid grid-cols-[120px_1fr] overflow-hidden rounded-[6px] border border-border bg-card sm:grid-cols-[160px_1fr]"
              >
                <div className="flex items-center justify-center border-r border-border bg-surface-illu bg-dotgrid [background-size:14px_14px]">
                  <ProjectArt />
                </div>
                <div className="p-6">
                  <div className="font-plex text-[10px] uppercase tracking-[0.1em] text-brass">
                    {proj.category}
                  </div>
                  <h3 className="mt-2 font-archivo text-[19px] font-semibold tracking-[-0.01em]">
                    {proj.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.55] text-ink-soft">
                    {proj.summary}
                  </p>
                  <div className="mt-3.5 font-plex text-[11px] text-ink-mono">
                    {proj.meta}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Testimonials ══ */}
      <section className="border-b border-border py-[72px] sm:py-[100px]">
        <div className={container}>
          <div className="mb-12">
            <div className={eyebrow}>Trusted by</div>
            <h2 className={h2}>Homeowners, architects &amp; builders</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="m-0 flex flex-col rounded-[6px] border border-border bg-card p-8"
              >
                <div className="font-archivo text-[30px] font-bold leading-none text-brass">
                  &ldquo;
                </div>
                <blockquote className="mt-2 flex-1 text-[16px] leading-[1.65] text-[#1b3a5f]">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-7 border-t border-border pt-5">
                  <div className="text-[15px] font-semibold text-foreground">{t.name}</div>
                  <div className="mt-1 font-plex text-[11px] tracking-[0.03em] text-ink-mono">
                    {t.role}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section id="faq" className="scroll-mt-[92px] border-b border-border py-[72px] sm:py-[100px]">
        <div className={container}>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <div className={eyebrow}>Answers</div>
              <h2 className={h2}>Questions, answered</h2>
              <p className="mt-5 text-[16px] leading-[1.65] text-ink-soft">
                Can&apos;t find what you need? Our team replies within one
                business day.
              </p>
              <Link
                href="#contact"
                className="mt-6 inline-flex items-center gap-2.5 border-b border-brass pb-[3px] text-[15px] font-semibold text-brass"
              >
                Ask a question
              </Link>
            </div>
            <R2RFaq faqs={faqs} />
          </div>
        </div>
      </section>

      {/* ══ Contact / quote ══ */}
      <section id="contact" className="scroll-mt-[92px] border-b border-border py-[72px] sm:py-[100px]">
        <div className={container}>
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-[72px]">
            <div>
              <div className={eyebrow}>Get in touch</div>
              <h2 className={h2}>Request a quote</h2>
              <p className="mt-5 max-w-[420px] text-[17px] leading-[1.65] text-ink-soft">
                Send your measurements or just your requirements. We&apos;ll
                reply with a detailed, itemised quote — no obligation.
              </p>
              <div className="mt-10 border-t border-border">
                {contactRows.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[110px_1fr] gap-5 border-b border-border py-[18px]"
                  >
                    <div className="pt-0.5 font-plex text-[11px] uppercase tracking-[0.08em] text-ink-mono">
                      {row.label}
                    </div>
                    <div className="text-[15.5px] leading-[1.5] text-[#1b3a5f]">
                      {row.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <QuoteForm productNames={productNames} />
          </div>
        </div>
      </section>
    </div>
  );
}
