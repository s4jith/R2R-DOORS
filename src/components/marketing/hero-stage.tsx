import type { ReactNode } from "react";
import InteractiveDoor from "@/components/marketing/interactive-door";
import { StageLayers } from "@/components/marketing/stage-layers";

/**
 * Cinematic dark hero band. Forces dark tokens via the `.dark` scope (so it
 * reads as a deep navy "showroom at night" regardless of site theme), frames
 * the existing InteractiveDoor as a lit threshold, and dissolves into the next
 * light section via a seam-fade.
 *
 * Server component: the only client island is <InteractiveDoor/>. The left-
 * column copy is passed as `children` so it stays server-rendered (LCP text
 * paints without waiting on JS). The door-stage disc/floor-glow are STATIC —
 * the door owns its own open-reveal glow.
 */
export function HeroStage({ children }: { children: ReactNode }) {
  return (
    <section className="dark bg-stage relative isolate flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
      <StageLayers />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 py-20 lg:grid-cols-[55%_45%] lg:gap-12">
        {/* Left — server-rendered copy */}
        <div className="max-w-xl">{children}</div>

        {/* Right — spotlit door stage (responsive reservation = no CLS) */}
        <div className="relative mx-auto grid h-[390px] w-[268px] place-items-center md:h-[452px] md:w-[308px] lg:ml-auto lg:mr-0">
          {/* hue-bridge disc */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 size-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklch, var(--door-stage) 26%, transparent), transparent 68%)",
            }}
          />
          {/* contact floor-glow */}
          <div
            aria-hidden
            className="spotlight pointer-events-none absolute -bottom-4 left-1/2 h-20 w-[130%] -translate-x-1/2 opacity-80"
          />
          <div className="relative z-10">
            <InteractiveDoor />
          </div>
        </div>
      </div>

      {/* seam-fade into the next (light) band */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-b from-transparent to-background"
      />
    </section>
  );
}
