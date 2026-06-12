import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Light-band showcase card. Hairline ring at rest → gradient border + lift on
 * hover (CSS only, no cursor-tilt — kept off for perf + to avoid the generic
 * "crypto landing" feel). `featured` spans wider and warrants the one
 * text-gradient accent per band.
 */
export function BentoTile({
  icon,
  title,
  description,
  featured = false,
  className,
  children,
}: {
  icon?: ReactNode;
  title: string;
  description: string;
  featured?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl bg-card p-6 ring-1 ring-foreground/[0.07] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-lg hover:[border-color:transparent] hover:[background:linear-gradient(var(--card),var(--card))_padding-box,var(--gradient-primary)_border-box] border border-transparent",
        featured && "sm:p-8",
        className
      )}
    >
      {icon && (
        <div
          className={cn(
            "mb-4 flex items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-primary transition-transform group-hover:scale-105",
            featured ? "size-14" : "size-12"
          )}
        >
          {icon}
        </div>
      )}
      <h3
        className={cn(
          "font-semibold text-foreground",
          featured ? "text-xl" : "text-base"
        )}
      >
        {featured ? <span className="text-gradient">{title}</span> : title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {children}
    </div>
  );
}
