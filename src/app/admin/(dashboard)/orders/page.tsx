"use client";

import { useEffect, useState } from "react";
import { Search, ArrowRight, Inbox } from "lucide-react";
import { OrderStatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";
import type { Order } from "@/lib/types";

const STATUS_OPTIONS = ["All", "Pending", "Confirmed", "Delivered"] as const;

const nextStatus: Record<Order["status"], Order["status"] | null> = {
  pending: "confirmed",
  confirmed: "delivered",
  delivered: null,
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] =
    useState<(typeof STATUS_OPTIONS)[number]>("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((data: Order[]) => setOrders(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = orders.filter((o) => {
    const matchStatus =
      statusFilter === "All" || o.status === statusFilter.toLowerCase();
    const q = search.toLowerCase();
    const matchSearch =
      o.customerName.toLowerCase().includes(q) ||
      o.id.toLowerCase().includes(q) ||
      o.product.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  async function advanceStatus(id: string) {
    const order = orders.find((o) => o.id === id);
    if (!order) return;
    const next = nextStatus[order.status];
    if (!next) return;
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: next } : o))
    );
    await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    }).catch(() => {
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: order.status } : o))
      );
    });
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
          Orders
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {orders.length} total orders
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-4 rounded-2xl bg-card p-3 shadow-sm ring-1 ring-foreground/[0.07]">
        <div className="relative min-w-48 flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, ID or product…"
            className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-4 text-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-ring/40"
          />
        </div>

        <div className="flex flex-wrap gap-1 rounded-xl bg-muted p-1">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              aria-pressed={statusFilter === s}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-semibold transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                statusFilter === s
                  ? "bg-card text-primary shadow-sm ring-1 ring-foreground/[0.06]"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {s}
              {s !== "All" && (
                <span className="ml-1.5 opacity-60">
                  {orders.filter((o) => o.status === s.toLowerCase()).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-foreground/[0.07]">
        {loading ? (
          <div className="space-y-px">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4">
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-accent text-primary">
              <Inbox className="size-6" />
            </div>
            <p className="font-semibold text-foreground">No orders found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Adjust your search or filter to see results.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  {[
                    "Order ID",
                    "Customer",
                    "Product",
                    "Dimensions",
                    "Amount",
                    "Status",
                    "Date",
                    "Action",
                  ].map((h) => (
                    <th
                      key={h}
                      className="whitespace-nowrap px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-border transition-colors last:border-0 hover:bg-muted/40"
                  >
                    <td className="whitespace-nowrap px-5 py-4 font-medium text-foreground">
                      {order.id}
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-foreground">
                        {order.customerName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.phone}
                      </p>
                    </td>
                    <td className="max-w-[180px] px-5 py-4 text-muted-foreground">
                      <p className="truncate">{order.product}</p>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                      {order.width} × {order.height} ft
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 font-semibold text-foreground">
                      ₹{order.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-5 py-4">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-4">
                      {nextStatus[order.status] ? (
                        <button
                          onClick={() => advanceStatus(order.id)}
                          className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                        >
                          Mark {nextStatus[order.status]}
                          <ArrowRight className="size-3" />
                        </button>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          Completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary footer */}
      <div className="mt-4 flex flex-wrap items-center gap-4">
        {(["pending", "confirmed", "delivered"] as Order["status"][]).map((s) => {
          const count = orders.filter((o) => o.status === s).length;
          return (
            <div key={s} className="flex items-center gap-2">
              <OrderStatusBadge status={s} withDot={false} />
              <span className="text-xs font-medium text-muted-foreground">
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
