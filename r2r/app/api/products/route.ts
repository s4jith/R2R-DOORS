import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import Product from "@/lib/db/models/product";
import { getCached, setCached, deleteCached } from "@/lib/db/redis";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function serialize(doc: Record<string, any>) {
  const { _id, __v, ...rest } = doc;
  const normalizedPrice = Number(rest.pricePerSqft ?? rest.price ?? 0);
  return {
    id: _id.toString(),
    ...rest,
    pricePerSqft: Number.isFinite(normalizedPrice) ? normalizedPrice : 0,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeCached(doc: Record<string, any>) {
  const normalizedPrice = Number(doc.pricePerSqft ?? doc.price ?? 0);
  return {
    ...doc,
    pricePerSqft: Number.isFinite(normalizedPrice) ? normalizedPrice : 0,
  };
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") ?? undefined;
    const cacheKey = category ? `products:${category}` : "products:all";

    const cached = await getCached(cacheKey);
    if (cached) {
      return NextResponse.json(
        Array.isArray(cached) ? cached.map((p) => normalizeCached(p)) : cached
      );
    }

    await connectDB();
    const query = category
      ? { category: category as "door" | "window" }
      : {};
    const docs = await Product.find(query).sort({ createdAt: -1 }).lean();
    const result = docs.map(serialize);

    await setCached(cacheKey, result, 300);
    return NextResponse.json(result);
  } catch (err) {
    console.error("[GET /api/products]", err);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectDB();
    const doc = await Product.create(body);
    await deleteCached("products:all", `products:${doc.category}`);
    return NextResponse.json(serialize(doc.toObject()), { status: 201 });
  } catch (err) {
    console.error("[POST /api/products]", err);
    const message = err instanceof Error ? err.message : "Failed to create product";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
