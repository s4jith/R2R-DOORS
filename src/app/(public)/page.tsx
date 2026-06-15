export const dynamic = "force-dynamic";

import type { Metadata } from "next";
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
  Hammer,
  PackageSearch,
} from "lucide-react";
import ProductCard from "@/components/product/product-card";
import { Hero } from "@/components/marketing/hero";
import { BentoTile } from "@/components/marketing/bento-tile";
import { ClosingCta } from "@/components/marketing/closing-cta";
import { SectionHeading } from "@/components/marketing/section-heading";
import { StatsBand } from "@/components/marketing/stats-band";
import { FeaturedProjects } from "@/components/marketing/featured-projects";
import { Testimonials } from "@/components/marketing/testimonials";
import { Faqs } from "@/components/marketing/faq";
import { ContactSection } from "@/components/contact/contact-section";
import { Marquee } from "@/components/motion/marquee";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getProducts } from "@/lib/services/products";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Precision Doors. Perfect Fit.",
  description: site.description,
  alternates: { canonical: "/" },
};

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
      {/* ── Hero (photographic) ───────────────────────── */}
      <Hero />

      {/* ── Materials credentials marquee ─────────────── */}
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

      {/* ── Stats band ────────────────────────────────── */}
      <StatsBand />

      {/* ── Features (bento) ──────────────────────────── */}
      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-14">
            <SectionHeading
              eyebrow="Why R2R"
              title="Built different, from the first cut"
              subtitle="Four pillars that set us apart in a competitive market."
            />
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
          <Reveal className="mb-14">
            <SectionHeading
              eyebrow="How it works"
              title="Three steps to a perfect fit"
            />
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

      {/* ── Product rail (#products) ──────────────────── */}
      <section
        id="products"
        className="scroll-mt-16 bg-background py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-10 flex items-end justify-between gap-6">
            <SectionHeading
              align="start"
              eyebrow="Catalogue"
              title="Our Product Range"
              subtitle="Doors and windows for every style and budget."
            />
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

      {/* ── Featured projects (#projects) ─────────────── */}
      <FeaturedProjects />

      {/* ── About (#about) ────────────────────────────── */}
      <section id="about" className="scroll-mt-16 bg-background py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="right">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              About R2R
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Engineered for Endurance
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              At {site.shortName}, craftsmanship isn&apos;t just a claim —
              it&apos;s a process. Since {site.founded}, every product has gone
              through a 12-point quality inspection before leaving the factory.
              We don&apos;t ship doors. We ship confidence.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-primary transition-transform active:translate-y-px"
              >
                Our Full Story
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                View Our Work
              </Link>
            </div>
          </Reveal>

          <Reveal direction="left" className="flex flex-col gap-5">
            {whyChooseUs.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl bg-card p-5 shadow-sm ring-1 ring-foreground/[0.07]"
              >
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
          </Reveal>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────── */}
      <Testimonials />

      {/* ── FAQ ───────────────────────────────────────── */}
      <Faqs />

      {/* ── Contact (#contact) ────────────────────────── */}
      <ContactSection />

      {/* ── Closing CTA (cinematic bookend) ───────────── */}
      <ClosingCta />
    </>
  );
}
