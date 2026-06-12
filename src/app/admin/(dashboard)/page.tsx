import {
  Package,
  ClipboardList,
  TrendingUp,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { getProducts } from "@/lib/services/products";
import { getOrders } from "@/lib/services/orders";
import { OrderStatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

function StatCard({
  label,
  value,
  icon: Icon,
  sub,
  trend,
  tint,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  sub?: string;
  trend?: string;
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
        {trend && (
          <span className="inline-flex items-center gap-0.5 rounded-full bg-success-subtle px-2 py-0.5 text-xs font-semibold text-success ring-1 ring-success/20">
            <ArrowUpRight className="size-3.5" />
            {trend}
          </span>
        )}
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
  const [products, orders] = await Promise.all([
    getProducts().catch(() => []),
    getOrders().catch(() => []),
  ]);
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;

  const stats = [
    {
      label: "Total Products",
      value: String(products.length),
      icon: Package,
      sub: "Across all categories",
      trend: "+2 this month",
      tint: "bg-accent text-primary",
    },
    {
      label: "Total Orders",
      value: String(orders.length),
      icon: ClipboardList,
      sub: "All time",
      trend: "+3 this week",
      tint: "bg-info-subtle text-info",
    },
    {
      label: "Revenue",
      value: `₹${(totalRevenue / 100000).toFixed(1)}L`,
      icon: TrendingUp,
      sub: "Total all-time",
      trend: "+12%",
      tint: "bg-success-subtle text-success",
    },
    {
      label: "Pending Orders",
      value: String(pendingOrders),
      icon: Clock,
      sub: "Awaiting confirmation",
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
          Here&apos;s a snapshot of your business today.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Recent Orders */}
      <div className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-foreground/[0.07]">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h3 className="font-semibold text-foreground">Recent Orders</h3>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
          >
            View all
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
        {orders.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="font-medium text-foreground">No orders yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              New orders will appear here as they come in.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  {["Order ID", "Customer", "Product", "Amount", "Status"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-border transition-colors last:border-0 hover:bg-muted/40"
                  >
                    <td className="px-6 py-3.5 font-medium text-foreground">
                      {order.id}
                    </td>
                    <td className="px-6 py-3.5 text-muted-foreground">
                      {order.customerName}
                    </td>
                    <td className="px-6 py-3.5 text-muted-foreground">
                      {order.product}
                    </td>
                    <td className="px-6 py-3.5 font-semibold text-foreground">
                      ₹{order.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-3.5">
                      <OrderStatusBadge status={order.status} />
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
          href="/admin/orders"
          className="group flex items-center gap-4 rounded-2xl bg-card p-5 shadow-sm ring-1 ring-foreground/[0.07] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex size-11 items-center justify-center rounded-xl bg-info-subtle text-info transition-colors group-hover:bg-info group-hover:text-info-foreground">
            <ClipboardList className="size-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Manage Orders</p>
            <p className="text-xs text-muted-foreground">
              Track and update order statuses
            </p>
          </div>
          <ArrowUpRight className="ml-auto size-4 text-muted-foreground transition-colors group-hover:text-info" />
        </Link>
      </div>
    </div>
  );
}
