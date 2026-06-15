import { Marquee } from "@/components/motion/marquee";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { clients } from "@/lib/partners-data";

/**
 * "Trusted by" client cloud. Text chips (no third-party logos reproduced),
 * scrolled as an edge-faded marquee so it scales down to mobile cleanly.
 */
export function LogoCloud() {
  return (
    <section className="border-y border-border bg-secondary/50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Trusted by"
            title="Built for India's leading developers"
            subtitle="From landmark residential towers to Grade-A commercial parks."
            className="mb-12"
          />
        </Reveal>
      </div>
      <Marquee>
        {clients.map((c) => (
          <span
            key={c}
            className="mx-4 inline-flex items-center rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-muted-foreground shadow-sm ring-1 ring-foreground/[0.04]"
          >
            {c}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
