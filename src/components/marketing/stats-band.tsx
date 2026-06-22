import { Counter } from "@/components/motion/counter";
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
 * Metrics strip — bordered blueprint cells. `variant="dark"` drops it on the
 * espresso band (white type); the default sits on paper.
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
        dark ? "bg-paper-dark text-on-dark" : "border-y border-border bg-background",
        className
      )}
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className={cn(
                "px-8 py-14",
                dark ? "border-l border-white/10" : "border-l border-border"
              )}
            >
              <dd
                className={cn(
                  "font-archivo text-[52px] font-bold leading-none tracking-[-0.02em]",
                  dark ? "text-[#ffffff]" : "text-foreground"
                )}
              >
                <Counter value={s.value} />
              </dd>
              <dt
                className={cn(
                  "mt-3.5 font-plex text-[11.5px] uppercase tracking-[0.1em]",
                  dark ? "text-on-dark-dim" : "text-ink-mono"
                )}
              >
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
