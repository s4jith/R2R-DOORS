export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Phone, Tag, ChevronRight } from "lucide-react";
import PriceCalculator from "./price-calculator";
import { CategoryBadge, StockBadge } from "@/components/ui/status-badge";
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
    <section className="bg-background py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-6">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground"
        >
          <Link href="/products" className="transition-colors hover:text-foreground">
            Products
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="font-medium capitalize text-foreground">
            {product.category}s
          </span>
          <ChevronRight className="size-3.5" />
          <span className="truncate text-foreground/80">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Image */}
          <div className="relative h-96 overflow-hidden rounded-3xl bg-card shadow-sm ring-1 ring-foreground/[0.07] lg:sticky lg:top-24 lg:h-[540px]">
            <Image
              src={product.image || PLACEHOLDER}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              unoptimized
            />
            {!product.inStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/40 backdrop-blur-[2px]">
                <span className="rounded-xl bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-lg">
                  Currently Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <CategoryBadge category={product.category} />
                <StockBadge inStock={product.inStock} />
              </div>
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                <Tag className="size-3.5" />
                {product.material}
              </p>
            </div>

            {/* Price */}
            <div className="overflow-hidden rounded-2xl bg-gradient-brand-deep p-6 text-white shadow-md">
              <p className="text-sm text-white/65">Base Price</p>
              <p className="mt-1 text-4xl font-extrabold tracking-tight">
                ₹{product.pricePerSqft.toLocaleString()}
                <span className="ml-1.5 text-base font-medium text-white/60">
                  / sq.ft
                </span>
              </p>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {/* Features */}
            {product.features.length > 0 && (
              <div>
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-foreground">
                  Key Features
                </h2>
                <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {product.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Price Calculator */}
            <PriceCalculator pricePerSqft={product.pricePerSqft} />

            {/* CTA */}
            <a
              href="tel:+919876543210"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-primary transition-[transform,box-shadow] hover:shadow-primary-lg active:translate-y-px"
            >
              <Phone className="size-4" />
              Enquire Now
            </a>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Back to all products
            </Link>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="group flex items-center gap-4 rounded-2xl bg-card p-4 shadow-sm ring-1 ring-foreground/[0.07] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                    <Image
                      src={p.image || PLACEHOLDER}
                      alt={p.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                      {p.name}
                    </p>
                    <p className="mt-0.5 text-xs font-bold text-primary">
                      ₹{p.pricePerSqft.toLocaleString()} / sq.ft
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
