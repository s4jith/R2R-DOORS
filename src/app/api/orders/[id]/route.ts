import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import Order from "@/lib/db/models/order";
import { serializeOrder } from "@/lib/services/orders";
import { orderStatusUpdate } from "@/lib/validation/order";
import { isAdmin } from "@/lib/auth/guard";
import {
  badRequest,
  fromZodError,
  notFound,
  ok,
  readJson,
  serverError,
  unauthorized,
} from "@/lib/api/http";

type Context = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Context) {
  if (!(await isAdmin())) return unauthorized();

  const { id } = await params;

  const body = await readJson(req);
  if (body === null) return badRequest("Invalid JSON body");

  const parsed = orderStatusUpdate.safeParse(body);
  if (!parsed.success) return fromZodError(parsed.error);

  try {
    await connectDB();
    const doc = await Order.findByIdAndUpdate(
      id,
      { $set: parsed.data },
      { new: true, runValidators: true }
    ).lean();
    if (!doc) return notFound();
    return ok(serializeOrder(doc));
  } catch (err) {
    console.error("[PUT /api/orders/[id]]", err);
    return serverError("Failed to update order");
  }
}
