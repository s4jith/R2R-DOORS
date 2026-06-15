import { Counter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export interface Stat {
  value: string;
  label: string;
}

const defaultStats: Stat[] = [
  { value: "500+", label: "Projects Completed" },
  { value: "15+", label: "Years of Experience" },
  { value: "8", label: "Product Categories" },
  { value: "10yr", label: "Structural Warranty" },
];

/**
 * Metrics strip. Animated count-up via the shared Counter. Used on the home,
 * projects, and (optionally) about pages. Pass `variant="dark"` to drop it on a
 * deep brand band.
 */
export function StatsBand({
  stats = defaultStats,
  variant = "light",
  className,
}: {
  stats?: Stat[];
  variant?: "light" | "dark";
  className?: string;
}) {
  const dark = variant === "dark";
  return (
    <section
      className={cn(
        dark
          ? "bg-gradient-brand-deep text-white"
          : "border-y border-border bg-secondary/60",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
        <Reveal>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <dd
                  className={cn(
                    "text-4xl font-extrabold tracking-tight sm:text-5xl",
                    dark ? "text-white" : "text-gradient"
                  )}
                >
                  <Counter value={s.value} />
                </dd>
                <dt
                  className={cn(
                    "mt-2 text-sm font-medium",
                    dark ? "text-white/65" : "text-muted-foreground"
                  )}
                >
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
