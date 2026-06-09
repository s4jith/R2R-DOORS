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

function StatCard({
  label,
  value,
  icon: Icon,
  sub,
  trend,
  color,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  sub?: string;
  trend?: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 ring-1 ring-border shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className="flex items-center gap-0.5 text-xs font-semibold text-green-600">
            <ArrowUpRight className="w-3.5 h-3.5" />
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-extrabold text-foreground">{value}</p>
      <p className="text-sm font-medium text-foreground mt-0.5">{label}</p>
      {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
    </div>
  );
}

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
};

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
      color: "bg-primary/10 text-primary",
    },
    {
      label: "Total Orders",
      value: String(orders.length),
      icon: ClipboardList,
      sub: "All time",
      trend: "+3 this week",
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Revenue",
      value: `₹${(totalRevenue / 100000).toFixed(1)}L`,
      icon: TrendingUp,
      sub: "Total all-time",
      trend: "+12%",
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Pending Orders",
      value: String(pendingOrders),
      icon: Clock,
      sub: "Awaiting confirmation",
      color: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <div className="p-6 lg:p-8 flex flex-col gap-8">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-extrabold text-foreground">
          Welcome back, Admin
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Here&apos;s a snapshot of your business today.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl ring-1 ring-border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Recent Orders</h3>
          <Link
            href="/admin/orders"
            className="text-xs font-semibold text-primary hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Order ID
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Customer
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Product
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Amount
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
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
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${statusColors[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Link
          href="/admin/products"
          className="bg-white rounded-xl p-5 ring-1 ring-border shadow-sm flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
            <Package className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">
              Manage Products
            </p>
            <p className="text-xs text-muted-foreground">
              Add, edit, or remove products
            </p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-primary transition-colors" />
        </Link>
        <Link
          href="/admin/orders"
          className="bg-white rounded-xl p-5 ring-1 ring-border shadow-sm flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
            <ClipboardList className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">
              Manage Orders
            </p>
            <p className="text-xs text-muted-foreground">
              Track and update order statuses
            </p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-blue-600 transition-colors" />
        </Link>
      </div>
    </div>
  );
}
