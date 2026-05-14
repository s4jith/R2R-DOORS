"use client";

import { useEffect, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import type { Order } from "@/lib/types";

const STATUS_OPTIONS = ["All", "Pending", "Confirmed", "Delivered"] as const;

const statusStyles: Record<Order["status"], string> = {
  pending: "bg-amber-100 text-amber-700 border border-amber-200",
  confirmed: "bg-blue-100 text-blue-700 border border-blue-200",
  delivered: "bg-green-100 text-green-700 border border-green-200",
};

const nextStatus: Record<Order["status"], Order["status"] | null> = {
  pending: "confirmed",
  confirmed: "delivered",
  delivered: null,
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_OPTIONS)[number]>("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((data: Order[]) => setOrders(data))
      .catch(() => {});
  }, []);

  const filtered = orders.filter((o) => {
    const matchStatus =
      statusFilter === "All" || o.status === statusFilter.toLowerCase();
    const matchSearch =
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  async function advanceStatus(id: string) {
    const order = orders.find((o) => o.id === id);
    if (!order) return;
    const next = nextStatus[order.status];
    if (!next) return;
    // optimistic update
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: next } : o))
    );
    await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    }).catch(() => {
      // revert on failure
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: order.status } : o))
      );
    });
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-foreground">Orders</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {orders.length} total orders
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-white rounded-xl ring-1 ring-border shadow-sm">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, ID or product…"
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        {/* Status filter tabs */}
        <div className="flex gap-2 flex-wrap">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                statusFilter === s
                  ? "bg-primary text-white shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-secondary"
              }`}
            >
              {s}
              {s !== "All" && (
                <span className="ml-1.5 opacity-70">
                  ({orders.filter((o) => o.status === s.toLowerCase()).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl ring-1 ring-border shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">
            <p className="font-medium">No orders found.</p>
            <p className="text-sm mt-1">Adjust your search or filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
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
                      className="text-left px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap"
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
                    className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-5 py-4 font-medium text-foreground whitespace-nowrap">
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
                    <td className="px-5 py-4 text-muted-foreground max-w-[180px]">
                      <p className="truncate">{order.product}</p>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground whitespace-nowrap">
                      {order.width} × {order.height} ft
                    </td>
                    <td className="px-5 py-4 font-semibold text-foreground whitespace-nowrap">
                      ₹{order.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${statusStyles[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground whitespace-nowrap">
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
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary hover:text-white transition-colors whitespace-nowrap"
                        >
                          Mark {nextStatus[order.status]}
                          <ChevronDown className="w-3 h-3 -rotate-90" />
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
      <div className="mt-4 flex items-center gap-6">
        {(["pending", "confirmed", "delivered"] as Order["status"][]).map((s) => {
          const count = orders.filter((o) => o.status === s).length;
          return (
            <div key={s} className="flex items-center gap-2">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${statusStyles[s]}`}
              >
                {s}
              </span>
              <span className="text-xs text-muted-foreground font-medium">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
