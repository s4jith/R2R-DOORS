import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import Product from "@/lib/db/models/product";
import { getProducts, serializeProduct } from "@/lib/services/products";
import { productInput } from "@/lib/validation/product";
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

// Catalogue is admin-managed and must always reflect the latest data — never
// serve a statically cached response.
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const raw = new URL(req.url).searchParams.get("category");
  const category = raw === "door" || raw === "window" ? raw : undefined;
  const products = await getProducts(category);
  return ok(products);
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return unauthorized();

  const body = await readJson(req);
  if (body === null) return badRequest("Invalid JSON body");

  const parsed = productInput.safeParse(body);
  if (!parsed.success) return fromZodError(parsed.error);

  try {
    await connectDB();
    const doc = await Product.create(parsed.data);
    return created(serializeProduct(doc.toObject()));
  } catch (err) {
    console.error("[POST /api/products]", err);
    return serverError("Failed to create product");
  }
}
