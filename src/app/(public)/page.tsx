export const dynamic = "force-dynamic";

import Link from "next/link";
import {
  Ruler,
  Package,
  Truck,
  BadgeCheck,
  ShieldCheck,
  Wrench,
  Star,
  ArrowRight,
  Phone,
  Hammer,
  PackageSearch,
} from "lucide-react";
import ProductCard from "@/components/product/product-card";
import { HeroStage } from "@/components/marketing/hero-stage";
import { BentoTile } from "@/components/marketing/bento-tile";
import { ClosingCta } from "@/components/marketing/closing-cta";
import { Marquee } from "@/components/motion/marquee";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { getProducts } from "@/lib/services/products";

const leadFeature = {
  icon: Ruler,
  title: "Made to your exact spec",
  description:
    "Every door and window is manufactured to your precise dimensions — no standard sizes, no compromises, no on-site surprises. Send measurements; we cut to ±0.5mm.",
};

const features = [
  {
    icon: Package,
    title: "Premium Materials",
    description:
      "Grade-A teak, galvanised steel, uPVC, and aluminium alloys, tested for longevity.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Production-to-delivery in 7–14 working days across India with insured freight.",
  },
  {
    icon: BadgeCheck,
    title: "Honest Pricing",
    description:
      "Direct factory pricing with no middlemen — premium quality at transparent rates.",
  },
];

const process = [
  {
    icon: Ruler,
    step: "01",
    title: "Measure",
    description: "Share your dimensions or book a free on-site measure.",
  },
  {
    icon: Hammer,
    step: "02",
    title: "Craft",
    description: "Built to spec and put through a 12-point quality inspection.",
  },
  {
    icon: Wrench,
    step: "03",
    title: "Install",
    description: "Certified teams fit, align, and seal — guaranteed for 10 years.",
  },
];

const whyChooseUs = [
  {
    icon: ShieldCheck,
    title: "10-Year Structural Warranty",
    description:
      "All products carry a decade-long warranty against manufacturing defects and structural failure.",
  },
  {
    icon: Wrench,
    title: "Expert Installation",
    description:
      "Certified installation teams ensure perfect fitting, alignment, and sealing on every project.",
  },
  {
    icon: Star,
    title: "500+ Completed Projects",
    description:
      "From individual homes to large commercial complexes — a track record built on precision.",
  },
];

const trustItems = [
  "Grade-A Teak",
  "Galvanised Steel",
  "uPVC",
  "Aluminium Alloy",
  "ISO 9001:2015",
  "12-Point Inspection",
  "Insured Freight",
];

const heroStats: [string, string][] = [
  ["500+", "Projects"],
  ["15+", "Years"],
  ["10yr", "Warranty"],
];

export default async function HomePage() {
  let featuredProducts: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    featuredProducts = await getProducts();
  } catch {
    // DB unavailable — show empty state
  }
  const topProducts = featuredProducts.slice(0, 8);

  return (
    <>
      {/* ── Hero (cinematic dark stage) ───────────────── */}
      <HeroStage>
        <div className="animate-fade-up glass mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/85">
          <span className="size-1.5 rounded-full bg-brand-400" />
          ISO 9001:2015 Certified · Made to Spec
        </div>
        <h1
          className="animate-fade-up text-balance text-5xl font-extrabold leading-[1.05] tracking-tight text-white lg:text-7xl"
          data-delay="1"
        >
          Precision doors.
          <br />
          <span className="text-shimmer text-shimmer-light">Perfect fit.</span>
        </h1>
        <p
          className="animate-fade-up mt-6 max-w-prose text-lg leading-relaxed text-white/65"
          data-delay="2"
        >
          Custom-built doors &amp; windows engineered for endurance. Premium
          materials, exact dimensions, and honest pricing — straight from our
          factory floor to your site.
        </p>
        <div className="animate-fade-up mt-9 flex flex-wrap gap-3" data-delay="3">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-primary-lg transition-transform active:translate-y-px"
          >
            Explore Products
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href="tel:+919876543210"
            className="border-gradient inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-white transition-transform active:translate-y-px"
          >
            <Phone className="size-4 text-brand-300" />
            Contact Us
          </a>
        </div>
        <div
          className="animate-fade-up glass mt-10 inline-flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-white/10 px-5 py-3"
          data-delay="4"
        >
          {heroStats.map(([value, label], i) => (
            <div key={label} className="flex items-center gap-6">
              {i > 0 && <span className="h-8 w-px bg-white/15" />}
              <div>
                <Counter
                  value={value}
                  className="block text-2xl font-bold tracking-tight text-white"
                />
                <span className="text-xs text-white/55">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </HeroStage>

      {/* ── Trust marquee ─────────────────────────────── */}
      <section className="border-y border-border bg-background py-6">
        <Marquee>
          {trustItems.map((item) => (
            <span
              key={item}
              className="mx-7 inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-muted-foreground"
            >
              <span className="size-1 rounded-full bg-primary/50" />
              {item}
            </span>
          ))}
        </Marquee>
      </section>

      {/* ── Features (bento) ──────────────────────────── */}
      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Why R2R
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Built different, from the first cut
            </h2>
            <p className="mt-3 text-muted-foreground">
              Four pillars that set us apart in a competitive market.
            </p>
          </Reveal>

          {/* Lead banner tile */}
          <Reveal>
            <div className="group relative mb-6 flex flex-col gap-6 overflow-hidden rounded-3xl border border-transparent bg-card p-8 ring-1 ring-foreground/[0.07] transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-lg sm:flex-row sm:items-center">
              <div
                aria-hidden
                className="spotlight pointer-events-none absolute -right-10 -top-10 size-56 opacity-50"
              />
              <div className="relative flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-primary">
                <leadFeature.icon className="size-7" />
              </div>
              <div className="relative">
                <h3 className="text-2xl font-bold tracking-tight">
                  <span className="text-gradient">{leadFeature.title}</span>
                </h3>
                <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
                  {leadFeature.description}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Supporting tiles */}
          <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <RevealItem key={title}>
                <BentoTile
                  icon={<Icon className="size-5" />}
                  title={title}
                  description={description}
                  className="h-full"
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Process strip ─────────────────────────────── */}
      <section className="border-y border-border bg-secondary/60 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              How it works
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Three steps to a perfect fit
            </h2>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {process.map(({ icon: Icon, step, title, description }) => (
              <RevealItem key={step}>
                <div className="relative h-full overflow-hidden rounded-3xl bg-card p-7 ring-1 ring-foreground/[0.07]">
                  <span className="absolute right-5 top-4 text-5xl font-black text-primary/[0.07]">
                    {step}
                  </span>
                  <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-accent text-primary ring-1 ring-primary/10">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Product rail ──────────────────────────────── */}
      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
                Catalogue
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Product Range
              </h2>
              <p className="mt-2 text-muted-foreground">
                Doors and windows for every style and budget.
              </p>
            </div>
            <Link
              href="/products"
              className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80 sm:inline-flex"
            >
              View All Products
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>

        {topProducts.length > 0 ? (
          <div className="mask-fade-x overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="mx-auto flex max-w-7xl snap-x snap-mandatory gap-6 px-6">
              {topProducts.map((product) => (
                <div
                  key={product.id}
                  className="w-[280px] shrink-0 snap-start sm:w-[300px]"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-center rounded-3xl border border-dashed border-border bg-card py-16 text-center">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-accent text-primary">
                <PackageSearch className="size-6" />
              </div>
              <p className="font-medium text-foreground">No products yet.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Seed the database at{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-primary">
                  /api/seed
                </code>{" "}
                to populate products.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ── Why Choose Us + Quote ─────────────────────── */}
      <section className="border-t border-border bg-background py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="right">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Our Promise
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Engineered for Endurance
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              At R2R Doors, craftsmanship isn&apos;t just a claim — it&apos;s a
              process. Every product goes through 12-point quality inspection
              before leaving the factory. We don&apos;t ship doors. We ship
              confidence.
            </p>
            <div className="mt-8 flex flex-col gap-5">
              {whyChooseUs.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex gap-4">
                  <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary ring-1 ring-primary/10">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{title}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Quote card */}
          <Reveal direction="left">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-brand-deep p-8 text-white shadow-xl sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full opacity-40 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in oklch, var(--brand-400) 70%, transparent), transparent 70%)",
                }}
              />
              <div className="relative">
                <h3 className="text-2xl font-bold">Get a Free Quote</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Describe your project and our team will send you a detailed
                  quotation within 24 hours — no obligation, no sales pressure.
                </p>
                <form
                  action="mailto:info@r2rdoors.com"
                  method="post"
                  encType="text/plain"
                  className="mt-6 flex flex-col gap-3"
                >
                  <label htmlFor="quote-name" className="sr-only">
                    Your name
                  </label>
                  <input
                    id="quote-name"
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none transition focus:border-white/40 focus:bg-white/15 focus:ring-2 focus:ring-white/30"
                  />
                  <label htmlFor="quote-phone" className="sr-only">
                    Phone number
                  </label>
                  <input
                    id="quote-phone"
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none transition focus:border-white/40 focus:bg-white/15 focus:ring-2 focus:ring-white/30"
                  />
                  <label htmlFor="quote-msg" className="sr-only">
                    Describe your requirement
                  </label>
                  <textarea
                    id="quote-msg"
                    name="message"
                    rows={3}
                    placeholder="Describe your requirement..."
                    className="resize-none rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none transition focus:border-white/40 focus:bg-white/15 focus:ring-2 focus:ring-white/30"
                  />
                  <button
                    type="submit"
                    className="mt-1 rounded-xl bg-white px-6 py-3 font-semibold text-primary shadow-lg transition-transform hover:scale-[1.01] active:translate-y-px"
                  >
                    Request Free Quote
                  </button>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Closing CTA (cinematic bookend) ───────────── */}
      <ClosingCta />
    </>
  );
}
