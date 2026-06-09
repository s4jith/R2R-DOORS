import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import Order from "@/lib/db/models/order";
import { getOrders, serializeOrder } from "@/lib/services/orders";
import { orderInput } from "@/lib/validation/order";
import { isAdmin } from "@/lib/auth/guard";
import {
  badRequest,
  created,
  fromZodError,
  ok,
  readJson,
  serverError,
  unauthorized,
} from "@/lib/api/http";

export async function GET() {
  if (!(await isAdmin())) return unauthorized();

  try {
    const orders = await getOrders();
    return ok(orders);
  } catch (err) {
    console.error("[GET /api/orders]", err);
    return serverError("Failed to fetch orders");
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return unauthorized();

  const body = await readJson(req);
  if (body === null) return badRequest("Invalid JSON body");

  const parsed = orderInput.safeParse(body);
  if (!parsed.success) return fromZodError(parsed.error);

  try {
    await connectDB();
    const doc = await Order.create(parsed.data);
    return created(serializeOrder(doc.toObject()));
  } catch (err) {
    console.error("[POST /api/orders]", err);
    return serverError("Failed to create order");
  }
}
