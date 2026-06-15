import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/marketing/breadcrumbs";

/**
 * Shared inner-page hero band (Products, Projects, About, Contact). Uses the
 * site's ambient mesh backdrop and the same eyebrow→title→subtitle rhythm as
 * the marketing sections, with an optional breadcrumb and action slot.
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
    <section className="relative overflow-hidden border-b border-border bg-hero-mesh">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs items={breadcrumbs} className="mb-6" />
        )}
        {eyebrow && (
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            {subtitle}
          </p>
        )}
        {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
      </div>
    </section>
  );
}
