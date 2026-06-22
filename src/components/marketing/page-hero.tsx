import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/marketing/breadcrumbs";

/**
 * Shared inner-page hero band (Products, Projects, Contact). Paper backdrop
 * with a faint blueprint dot-grid, the brass mono eyebrow → Archivo title →
 * body rhythm, plus an optional breadcrumb and action slot.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  actions,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  breadcrumbs?: Crumb[];
  actions?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-dotgrid [background-size:18px_18px] opacity-50 [mask-image:linear-gradient(to_left,black,transparent)]"
      />
      <div className="relative mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-20">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs items={breadcrumbs} className="mb-6" />
        )}
        {eyebrow && (
          <p className="mb-4 font-plex text-[11.5px] uppercase tracking-[0.16em] text-brass">
            {eyebrow}
          </p>
        )}
        <h1 className="font-archivo text-[clamp(36px,5vw,52px)] font-extrabold leading-[1.04] tracking-[-0.025em] text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-[560px] text-[18px] leading-[1.6] text-ink-soft">
            {subtitle}
          </p>
        )}
        {actions && <div className="mt-8 flex flex-wrap gap-3.5">{actions}</div>}
      </div>
    </section>
  );
}
