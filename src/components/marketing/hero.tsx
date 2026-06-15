import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, ChevronDown } from "lucide-react";
import { Counter } from "@/components/motion/counter";

const heroStats: [string, string][] = [
  ["500+", "Projects"],
  ["15+", "Years"],
  ["10yr", "Warranty"],
];

/**
 * Photographic hero. A full-bleed architectural background (premium glazing at
 * dusk) sits under a left-weighted dark scrim so the server-rendered headline
 * stays high-contrast and paints as LCP without waiting on JS. The only client
 * island is the <Counter> stat row. Entrance uses the CSS `animate-fade-up`
 * utilities (reduced-motion safe via globals.css).
 */
export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden"
    >
      {/* Background photograph */}
      <Image
        src="/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Legibility scrims — directional (left) + vertical depth */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-brand-950/92 via-brand-950/70 to-brand-950/25"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-brand-950/30"
      />
      {/* fine technical grid + grain for premium texture */}
      <div
        aria-hidden
        className="bg-techgrid pointer-events-none absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(70%_60%_at_30%_40%,black,transparent)]"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <div className="animate-fade-up glass mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/90">
            <span className="size-1.5 rounded-full bg-brand-400" />
            ISO 9001:2015 Certified · Made to Spec
          </div>

          <h1
            className="animate-fade-up text-balance text-5xl font-extrabold leading-[1.04] tracking-tight text-white lg:text-7xl"
            data-delay="1"
          >
            Precision doors.
            <br />
            <span className="text-shimmer text-shimmer-light">Perfect fit.</span>
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-white/75"
            data-delay="2"
          >
            Custom-built doors &amp; windows engineered for endurance. Premium
            materials, exact dimensions, and honest factory-direct pricing —
            from our floor to your site.
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-wrap gap-3"
            data-delay="3"
          >
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-primary-lg transition-transform active:translate-y-px"
            >
              Explore Products
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/#contact"
              className="glass inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Phone className="size-4 text-brand-300" />
              Get a Quote
            </Link>
          </div>

          <div
            className="animate-fade-up glass mt-12 inline-flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-white/15 px-5 py-3"
            data-delay="4"
          >
            {heroStats.map(([value, label], i) => (
              <div key={label} className="flex items-center gap-6">
                {i > 0 && <span className="h-8 w-px bg-white/20" />}
                <div>
                  <Counter
                    value={value}
                    className="block text-2xl font-bold tracking-tight text-white"
                  />
                  <span className="text-xs text-white/60">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <Link
        href="/#products"
        aria-label="Scroll to products"
        className="animate-float absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-white/60 transition-colors hover:text-white sm:block"
      >
        <ChevronDown className="size-6" />
      </Link>

      {/* seam-fade into the next (light) band */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-28 bg-gradient-to-b from-transparent to-background"
      />
    </section>
  );
}
