import { connectDB } from "./mongodb";
import { getCached, setCached } from "./redis";
import Product from "./models/product";
import Order from "./models/order";
import type { Product as ProductType, Order as OrderType } from "@/lib/types";
import { products as mockProducts } from "@/lib/mock-data";

// ── Serializers ──────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function serializeProduct(doc: Record<string, any>): ProductType {
  const normalizedPrice = Number(doc.pricePerSqft ?? doc.price ?? 0);
  return {
    id: doc._id.toString(),
    name: doc.name,
    category: doc.category,
    pricePerSqft: Number.isFinite(normalizedPrice) ? normalizedPrice : 0,
    description: doc.description ?? "",
    image: doc.image ?? "",
    material: doc.material ?? "",
    features: doc.features ?? [],
    inStock: doc.inStock ?? true,
  };
}

function normalizeCachedProduct(doc: Record<string, any>): ProductType {
  return {
    id: String(doc.id ?? doc._id ?? ""),
    name: String(doc.name ?? ""),
    category: doc.category === "window" ? "window" : "door",
    pricePerSqft: Number.isFinite(Number(doc.pricePerSqft ?? doc.price ?? 0))
      ? Number(doc.pricePerSqft ?? doc.price ?? 0)
      : 0,
    description: String(doc.description ?? ""),
    image: String(doc.image ?? ""),
    material: String(doc.material ?? ""),
    features: Array.isArray(doc.features)
      ? doc.features.map((f: unknown) => String(f))
      : [],
    inStock: Boolean(doc.inStock ?? true),
  };
}

function getMockProducts(category?: string): ProductType[] {
  return mockProducts.filter((product) =>
    category ? product.category === category : true
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function serializeOrder(doc: Record<string, any>): OrderType {
  return {
    id: doc._id.toString(),
    customerName: doc.customerName,
    phone: doc.phone,
    email: doc.email ?? "",
    product: doc.product,
    productId: doc.productId,
    width: doc.width,
    height: doc.height,
    totalAmount: doc.totalAmount,
    status: doc.status,
    createdAt: doc.createdAt
      ? new Date(doc.createdAt).toISOString().split("T")[0]
      : "",
  };
}

// ── Products ─────────────────────────────────────────────────────────────────

export async function getProducts(category?: string): Promise<ProductType[]> {
  const cacheKey = category ? `products:${category}` : "products:all";

  const cached = await getCached<ProductType[]>(cacheKey);
  if (cached) return cached.map((p) => normalizeCachedProduct(p));

  try {
    await connectDB();
    const query = category
      ? { category: category as "door" | "window" }
      : {};
    const docs = await Product.find(query).sort({ createdAt: -1 }).lean();
    const result = docs.map(serializeProduct);

    await setCached(cacheKey, result, 300);
    return result;
  } catch (err) {
    console.error("[getProducts] Falling back to mock data:", err);
    return getMockProducts(category);
  }
}

export async function getProductById(id: string): Promise<ProductType | null> {
  const cacheKey = `product:${id}`;

  const cached = await getCached<ProductType>(cacheKey);
  if (cached) return normalizeCachedProduct(cached);

  try {
    await connectDB();
    const doc = await Product.findById(id).lean();
    if (!doc) return null;
    const result = serializeProduct(doc);
    await setCached(cacheKey, result, 600);
    return result;
  } catch (err) {
    console.error("[getProductById] Falling back to mock data:", err);
    return mockProducts.find((product) => product.id === id) ?? null;
  }
}

// ── Orders ───────────────────────────────────────────────────────────────────

export async function getOrders(): Promise<OrderType[]> {
  await connectDB();
  const docs = await Order.find().sort({ createdAt: -1 }).lean();
  return docs.map(serializeOrder);
}
