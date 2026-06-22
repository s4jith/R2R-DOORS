import { cn } from "@/lib/utils";

/**
 * Single source of truth for stock/category pill styling.
 * Uses semantic design tokens (success/destructive/accent) — never raw Tailwind
 * color literals — so product surfaces stay visually consistent and dark-mode
 * ready.
 */

const base =
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ring-1 ring-inset";

export function StockBadge({
  inStock,
  className,
}: {
  inStock: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        base,
        inStock
          ? "bg-success-subtle text-success ring-success/25"
          : "bg-destructive-subtle text-destructive ring-destructive/25",
        className
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          inStock ? "bg-success" : "bg-destructive"
        )}
      />
      {inStock ? "In Stock" : "Out of Stock"}
    </span>
  );
}

export function CategoryBadge({
  category,
  className,
}: {
  category: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        base,
        "bg-accent text-accent-foreground ring-primary/10",
        className
      )}
    >
      {category}
    </span>
  );
}
