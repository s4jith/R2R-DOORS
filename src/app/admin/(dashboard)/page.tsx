import {
  Package,
  DoorOpen,
  PanelTop,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/services/products";
import { StockBadge, CategoryBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const PLACEHOLDER = "https://placehold.co/800x600/1763c4/ffffff?text=R2R";

function StatCard({
  label,
  value,
  icon: Icon,
  sub,
  tint,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  sub?: string;
  tint: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card p-6 shadow-sm ring-1 ring-foreground/[0.07] transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex size-11 items-center justify-center rounded-xl",
            tint
          )}
        >
          <Icon className="size-5" />
        </div>
      </div>
      <p className="mt-4 text-3xl font-extrabold tracking-tight text-foreground">
        {value}
      </p>
      <p className="mt-0.5 text-sm font-medium text-foreground">{label}</p>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

export default async function AdminDashboardPage() {
  const products = await getProducts().catch(() => []);

  const doors = products.filter((p) => p.category === "door").length;
  const windows = products.filter((p) => p.category === "window").length;
  const inStock = products.filter((p) => p.inStock).length;

  const stats = [
    {
      label: "Total Products",
      value: String(products.length),
      icon: Package,
      sub: "Across all categories",
      tint: "bg-accent text-primary",
    },
    {
      label: "In Stock",
      value: String(inStock),
      icon: CheckCircle2,
      sub: `${products.length - inStock} made to order`,
      tint: "bg-success-subtle text-success",
    },
    {
      label: "Doors",
      value: String(doors),
      icon: DoorOpen,
      sub: "Door catalogue",
      tint: "bg-info-subtle text-info",
    },
    {
      label: "Windows",
      value: String(windows),
      icon: PanelTop,
      sub: "Window catalogue",
      tint: "bg-warning-subtle text-warning",
    },
  ];

  return (
    <div className="flex flex-col gap-8 p-6 lg:p-8">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
          Welcome back, Admin
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Here&apos;s a snapshot of your catalogue today.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Recent Products */}
      <div className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-foreground/[0.07]">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h3 className="font-semibold text-foreground">Recent Products</h3>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
          >
            View all
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
        {products.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="font-medium text-foreground">No products yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Add products from the Products page to populate your catalogue.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  {["Product", "Category", "Price / sq.ft", "Stock"].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 5).map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-border transition-colors last:border-0 hover:bg-muted/40"
                  >
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative size-9 shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-foreground/[0.06]">
                          <Image
                            src={product.image || PLACEHOLDER}
                            alt={product.name}
                            fill
                            sizes="36px"
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <span className="font-medium text-foreground">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <CategoryBadge category={product.category} />
                    </td>
                    <td className="px-6 py-3.5 font-semibold text-foreground">
                      ₹{(product.pricePerSqft ?? 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-3.5">
                      <StockBadge inStock={product.inStock} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Link
          href="/admin/products"
          className="group flex items-center gap-4 rounded-2xl bg-card p-5 shadow-sm ring-1 ring-foreground/[0.07] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex size-11 items-center justify-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-gradient-primary group-hover:text-primary-foreground">
            <Package className="size-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Manage Products
            </p>
            <p className="text-xs text-muted-foreground">
              Add, edit, or remove products
            </p>
          </div>
          <ArrowUpRight className="ml-auto size-4 text-muted-foreground transition-colors group-hover:text-primary" />
        </Link>
        <Link
          href="/"
          className="group flex items-center gap-4 rounded-2xl bg-card p-5 shadow-sm ring-1 ring-foreground/[0.07] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex size-11 items-center justify-center rounded-xl bg-info-subtle text-info transition-colors group-hover:bg-info group-hover:text-info-foreground">
            <DoorOpen className="size-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              View Public Site
            </p>
            <p className="text-xs text-muted-foreground">
              See your catalogue as customers do
            </p>
          </div>
          <ArrowUpRight className="ml-auto size-4 text-muted-foreground transition-colors group-hover:text-info" />
        </Link>
      </div>
    </div>
  );
}
