import { connectDB } from "@/lib/db/mongodb";
import Order from "@/lib/db/models/order";
import type { Order as OrderType } from "@/lib/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OrderDoc = Record<string, any>;

export function serializeOrder(doc: OrderDoc): OrderType {
  return {
    id: String(doc._id ?? doc.id ?? ""),
    customerName: String(doc.customerName ?? ""),
    phone: String(doc.phone ?? ""),
    email: String(doc.email ?? ""),
    product: String(doc.product ?? ""),
    productId: String(doc.productId ?? ""),
    width: Number(doc.width ?? 0),
    height: Number(doc.height ?? 0),
    totalAmount: Number(doc.totalAmount ?? 0),
    status: (doc.status as OrderType["status"]) ?? "pending",
    createdAt: doc.createdAt
      ? new Date(doc.createdAt).toISOString().split("T")[0]
      : "",
  };
}

/** Orders are admin-only and always read fresh from the database. */
export async function getOrders(): Promise<OrderType[]> {
  await connectDB();
  const docs = await Order.find().sort({ createdAt: -1 }).lean();
  return docs.map(serializeOrder);
}
