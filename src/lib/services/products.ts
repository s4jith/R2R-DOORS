import { connectDB } from "@/lib/db/mongodb";
import Product from "@/lib/db/models/product";
import type { Product as ProductType } from "@/lib/types";
import { products as mockProducts } from "@/lib/mock-data";

// Mongoose lean/toObject results are loosely typed; a permissive shape keeps
// the serializer reusable for both `.lean()` and `.toObject()` documents.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ProductDoc = Record<string, any>;

export function serializeProduct(doc: ProductDoc): ProductType {
  const rawPrice = Number(doc.pricePerSqft ?? doc.price ?? 0);
  return {
    id: String(doc._id ?? doc.id ?? ""),
    name: String(doc.name ?? ""),
    category: doc.category === "window" ? "window" : "door",
    pricePerSqft: Number.isFinite(rawPrice) ? rawPrice : 0,
    description: String(doc.description ?? ""),
    image: String(doc.image ?? ""),
    material: String(doc.material ?? ""),
    features: Array.isArray(doc.features) ? doc.features.map(String) : [],
    inStock: Boolean(doc.inStock ?? true),
  };
}

function getMockProducts(category?: string): ProductType[] {
  return mockProducts.filter((p) => (category ? p.category === category : true));
}

/**
 * Returns products from MongoDB. Falls back to bundled mock data when the
 * database is unreachable so the public site degrades gracefully.
 */
export async function getProducts(
  category?: "door" | "window"
): Promise<ProductType[]> {
  try {
    await connectDB();
    const filter = category ? { category } : {};
    const docs = await Product.find(filter).sort({ createdAt: -1 }).lean();
    return docs.map(serializeProduct);
  } catch (err) {
    console.error("[getProducts] Falling back to mock data:", err);
    return getMockProducts(category);
  }
}

export async function getProductById(id: string): Promise<ProductType | null> {
  try {
    await connectDB();
    const doc = await Product.findById(id).lean();
    return doc ? serializeProduct(doc) : null;
  } catch (err) {
    console.error("[getProductById] Falling back to mock data:", err);
    return mockProducts.find((p) => p.id === id) ?? null;
  }
}
