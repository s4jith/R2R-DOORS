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
} from "lucide-react";
import ProductCard from "@/components/product/product-card";
import InteractiveDoor from "@/components/marketing/interactive-door";
import { getProducts } from "@/lib/services/products";

const features = [
  {
    icon: Ruler,
    title: "Custom Sizing",
    description:
      "Every door and window is manufactured to your exact specifications — no standard sizes, no compromises.",
  },
  {
    icon: Package,
    title: "Premium Materials",
    description:
      "We source only Grade-A teak, galvanised steel, uPVC, and aluminium alloys tested for longevity.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Production-to-delivery in 7–14 working days across India with insured freight handling.",
  },
  {
    icon: BadgeCheck,
    title: "Affordable Pricing",
    description:
      "Direct factory pricing with no middlemen — premium quality at honest, transparent rates.",
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



export default async function HomePage() {
  let featuredProducts: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    featuredProducts = await getProducts();
  } catch {
    // DB unavailable — show empty state
  }
  const topProducts = featuredProducts.slice(0, 6);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="bg-white min-h-[calc(100vh-4rem)] flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
              <BadgeCheck className="w-3.5 h-3.5" />
              ISO 9001:2015 Certified Manufacturer
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-foreground mb-6">
              Precision Doors.
              <br />
              <span className="text-primary">Perfect Fit.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Custom-built doors &amp; windows engineered for endurance. Premium
              materials, exact dimensions, and honest pricing — directly from our
              factory floor to your site.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl shadow-md hover:bg-primary/90 hover:shadow-lg transition-all"
              >
                Explore Products
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary/5 transition-all"
              >
                <Phone className="w-4 h-4" />
                Contact Us
              </a>
            </div>
            <div className="mt-10 flex items-center gap-8">
              {[["500+", "Projects"], ["15+", "Years"], ["10yr", "Warranty"]].map(([value, label]) => (
                <div key={label}>
                  <p className="text-2xl font-bold text-primary">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — interactive 3-D door */}
          <div className="flex justify-center lg:justify-end py-8">
            <InteractiveDoor />
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────── */}
      <section className="bg-background py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Why Builders Choose R2R
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Four pillars that set us apart in a competitive market.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white rounded-xl p-6 ring-1 ring-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Preview ───────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Our Product Range
              </h2>
              <p className="text-muted-foreground">
                Doors and windows for every style and budget.
              </p>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topProducts.length > 0 ? (
              topProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-3 py-12 text-center text-muted-foreground">
                <p className="font-medium">No products yet.</p>
                <p className="text-sm mt-1">
                  Seed the database at{" "}
                  <code className="text-primary">/api/seed</code> to populate
                  products.
                </p>
              </div>
            )}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ─────────────────────────────── */}
      <section className="bg-background py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Engineered for Endurance
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                At R2R Doors, craftsmanship isn&apos;t just a claim — it&apos;s a
                process. Every product goes through 12-point quality inspection
                before leaving the factory. We don&apos;t ship doors. We ship
                confidence.
              </p>
              <div className="flex flex-col gap-5">
                {whyChooseUs.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                      <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-primary rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Get a Free Quote</h3>
              <p className="text-blue-200 text-sm mb-6 leading-relaxed">
                Describe your project and our team will send you a detailed
                quotation within 24 hours — no obligation, no sales pressure.
              </p>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="px-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-blue-200 text-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="px-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-blue-200 text-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
                />
                <textarea
                  rows={3}
                  placeholder="Describe your requirement..."
                  className="px-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-blue-200 text-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 resize-none"
                />
                <button className="px-6 py-3 bg-white text-primary font-semibold rounded-xl hover:bg-blue-50 transition-colors">
                  Request Free Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
