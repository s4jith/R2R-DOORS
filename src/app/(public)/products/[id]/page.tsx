export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Phone, Tag } from "lucide-react";
import PriceCalculator from "./price-calculator";
import { getProductById, getProducts } from "@/lib/services/products";

const PLACEHOLDER = "https://placehold.co/800x600/165a9e/ffffff?text=No+Image";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id).catch(() => null);
  if (!product) notFound();

  const related = await getProducts(product.category)
    .then((all) => all.filter((p) => p.id !== product.id).slice(0, 3))
    .catch(() => []);

  return (
    <>
      <section className="bg-background py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Back */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="relative h-96 lg:h-[520px] rounded-2xl overflow-hidden bg-white ring-1 ring-border shadow-sm">
              <Image
                src={product.image || PLACEHOLDER}
                alt={product.name}
                fill
                className="object-cover"
                unoptimized
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="px-4 py-2 bg-white rounded-xl font-semibold text-foreground text-sm">
                    Currently Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold capitalize">
                    {product.category}
                  </span>
                  {product.inStock ? (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                      In Stock
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
                      Out of Stock
                    </span>
                  )}
                </div>
                <h1 className="text-3xl font-extrabold text-foreground leading-tight mb-2">
                  {product.name}
                </h1>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  {product.material}
                </p>
              </div>

              {/* Price */}
              <div className="bg-white rounded-xl p-5 ring-1 ring-border shadow-sm">
                <p className="text-sm text-muted-foreground mb-1">Base Price</p>
                <p className="text-3xl font-extrabold text-primary">
                  ₹{product.pricePerSqft.toLocaleString()}
                  <span className="text-base font-medium text-muted-foreground ml-1">
                    / sq.ft
                  </span>
                </p>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed text-sm">
                {product.description}
              </p>

              {/* Features */}
              <div>
                <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
                  Key Features
                </h3>
                <ul className="flex flex-col gap-2">
                  {product.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Calculator */}
              <PriceCalculator pricePerSqft={product.pricePerSqft} />

              {/* CTA */}
              <a
                href="tel:+919876543210"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white font-semibold rounded-xl shadow-md hover:bg-primary/90 hover:shadow-lg transition-all"
              >
                <Phone className="w-4 h-4" />
                Enquire Now
              </a>
            </div>
          </div>

          <div className="mt-20">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.id}`}
                    className="group bg-white rounded-xl p-4 ring-1 ring-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex gap-4 items-center"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                      <Image src={p.image || PLACEHOLDER} alt={p.name} fill className="object-cover" unoptimized />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                        {p.name}
                      </p>
                      <p className="text-xs text-primary font-bold mt-0.5">
                        ₹{p.pricePerSqft.toLocaleString()} / sq.ft
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
