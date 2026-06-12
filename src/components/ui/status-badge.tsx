import { cn } from "@/lib/utils";

/**
 * Single source of truth for status/stock/category pill styling.
 * Uses semantic design tokens (success/warning/info) — never raw Tailwind
 * color literals — so order + product surfaces stay visually consistent and
 * dark-mode ready. Replaces the green/amber/blue maps previously duplicated
 * across the dashboard, orders, products, and product-detail screens.
 */

const base =
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ring-1 ring-inset";

export type OrderStatus = "pending" | "confirmed" | "delivered";

const orderStatusStyles: Record<OrderStatus, string> = {
  pending: "bg-warning-subtle text-warning ring-warning/25",
  confirmed: "bg-info-subtle text-info ring-info/25",
  delivered: "bg-success-subtle text-success ring-success/25",
};

const dotStyles: Record<OrderStatus, string> = {
  pending: "bg-warning",
  confirmed: "bg-info",
  delivered: "bg-success",
};

export function OrderStatusBadge({
  status,
  withDot = true,
  className,
}: {
  status: OrderStatus;
  withDot?: boolean;
  className?: string;
}) {
  return (
    <span className={cn(base, orderStatusStyles[status], className)}>
      {withDot && (
        <span className={cn("size-1.5 rounded-full", dotStyles[status])} />
      )}
      {status}
    </span>
  );
}

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
