import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Dark closing-CTA bookend — deep navy band that closes the scroll loop with a
 * faint blueprint grid and the brand's two-button call to action.
 */
export function ClosingCta() {
  return (
    <section className="relative isolate overflow-hidden bg-paper-dark text-on-dark">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #bcd2ec 1px, transparent 1px), linear-gradient(to bottom, #bcd2ec 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="relative z-10 mx-auto max-w-[760px] px-5 py-24 text-center sm:px-8 sm:py-28">
        <p className="mb-4 font-plex text-[11.5px] uppercase tracking-[0.16em] text-brass-light">
          Ready when you are
        </p>
        <h2 className="font-archivo text-[clamp(34px,5vw,48px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#ffffff]">
          Step into precision engineering
        </h2>
        <p className="mx-auto mt-5 max-w-[520px] text-[18px] leading-[1.6] text-on-dark">
          Tell us your dimensions. We&apos;ll handle the rest — from the first
          cut to the final fit, backed by a 10-year structural warranty.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3.5">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 rounded-[4px] bg-[#ffffff] px-7 py-[15px] text-[15.5px] font-semibold text-paper-dark transition-colors hover:bg-white"
          >
            Get a free quote
            <ArrowRight className="size-3.5" />
          </Link>
          <a
            href={site.phone.tel}
            className="inline-flex items-center gap-2.5 rounded-[4px] border border-white/25 px-7 py-[15px] text-[15.5px] font-semibold text-[#ffffff] transition-colors hover:border-white/60"
          >
            Talk to an expert
          </a>
        </div>
      </div>
    </section>
  );
}
