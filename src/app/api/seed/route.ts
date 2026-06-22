import { connectDB } from "@/lib/db/mongodb";
import Product from "@/lib/db/models/product";
import { products as mockProducts } from "@/lib/mock-data";
import { isAdmin } from "@/lib/auth/guard";
import { ok, serverError, unauthorized } from "@/lib/api/http";

export async function POST() {
  if (!(await isAdmin())) return unauthorized();

  try {
    await connectDB();

    const existingProducts = await Product.countDocuments();

    let seededProducts = 0;
    if (existingProducts === 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const docs = mockProducts.map(({ id, ...rest }) => rest);
      await Product.insertMany(docs);
      seededProducts = docs.length;
    }

    return ok({
      message: "Seed complete",
      seededProducts,
      skipped: { products: existingProducts > 0 },
    });
  } catch (err) {
    console.error("[POST /api/seed]", err);
    return serverError("Seed failed");
  }
}
