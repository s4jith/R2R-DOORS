import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StageLayers } from "@/components/marketing/stage-layers";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/site";

/**
 * Dark closing-CTA bookend — reuses the hero's cinematic vocabulary (stage +
 * aurora + grid + grain) to close the scroll loop. Echoes the door's own
 * "Step into Precision Engineering" line with one shimmer word.
 */
export function ClosingCta() {
  return (
    <section className="dark bg-stage relative isolate overflow-hidden">
      <StageLayers />
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
        <Reveal>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-300">
            Ready when you are
          </p>
          <h2 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl">
            Step into{" "}
            <span className="text-shimmer text-shimmer-light">
              precision engineering
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/65">
            Tell us your dimensions. We&apos;ll handle the rest — from the first
            cut to the final fit, backed by a 10-year structural warranty.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-7 py-3.5 font-semibold text-primary-foreground shadow-primary-lg transition-transform active:translate-y-px"
            >
              Get a Free Quote
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href={site.phone.tel}
              className="border-gradient inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/5"
            >
              Talk to an Expert
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
