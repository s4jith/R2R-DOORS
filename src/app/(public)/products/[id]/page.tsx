export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Phone, Tag } from "lucide-react";
import PriceCalculator from "./price-calculator";
import { CategoryBadge, StockBadge } from "@/components/ui/status-badge";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { getProductById, getProducts } from "@/lib/services/products";
import { site } from "@/lib/site";

const PLACEHOLDER = "https://placehold.co/800x600/0f2742/ffffff?text=R2R";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id).catch(() => null);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description.slice(0, 160),
    alternates: { canonical: `/products/${product.id}` },
    openGraph: {
      title: `${product.name} | ${site.shortName}`,
      description: product.description.slice(0, 200),
      images: [product.image || PLACEHOLDER],
      type: "website",
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id).catch(() => null);
  if (!product) notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image || PLACEHOLDER,
    material: product.material,
    brand: { "@type": "Brand", name: site.name },
    category: product.category,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.pricePerSqft,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${site.url}/products/${product.id}`,
    },
  };

  const related = await getProducts(product.category)
    .then((all) => all.filter((p) => p.id !== product.id).slice(0, 3))
    .catch(() => []);

  return (
    <section className="bg-background py-12 text-foreground sm:py-14">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <JsonLd data={productJsonLd} />
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            {
              label: `${product.category[0].toUpperCase()}${product.category.slice(1)}s`,
              href: `/products?category=${product.category}`,
            },
            { label: product.name },
          ]}
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Image */}
          <div className="relative h-96 overflow-hidden rounded-[6px] border border-border bg-surface-illu lg:sticky lg:top-[92px] lg:h-[540px]">
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
                <span className="rounded-[4px] bg-card px-4 py-2 text-[14px] font-semibold text-foreground shadow-lg">
                  Currently Made to Order
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
              <h1 className="font-archivo text-[clamp(28px,4vw,40px)] font-extrabold leading-[1.05] tracking-[-0.02em] text-foreground">
                {product.name}
              </h1>
              <p className="mt-2 flex items-center gap-1.5 font-plex text-[12px] tracking-[0.03em] text-ink-mono">
                <Tag className="size-3.5" />
                {product.material}
              </p>
            </div>

            {/* Price */}
            <div className="overflow-hidden rounded-[6px] bg-paper-dark p-6 text-on-dark">
              <p className="font-plex text-[11px] uppercase tracking-[0.1em] text-on-dark-dim">
                Base price
              </p>
              <p className="mt-1 font-archivo text-[40px] font-extrabold tracking-[-0.02em] text-[#ffffff]">
                ₹{product.pricePerSqft.toLocaleString("en-IN")}
                <span className="ml-1.5 font-plex text-[15px] font-medium text-on-dark-dim">
                  / sq.ft
                </span>
              </p>
            </div>

            {/* Description */}
            <p className="text-[15px] leading-[1.65] text-ink-soft">
              {product.description}
            </p>

            {/* Features */}
            {product.features.length > 0 && (
              <div>
                <h2 className="mb-3 font-plex text-[11px] uppercase tracking-[0.1em] text-ink-mono">
                  Key features
                </h2>
                <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {product.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2 text-[14.5px] text-ink-soft"
                    >
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brass" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Price Calculator */}
            <PriceCalculator pricePerSqft={product.pricePerSqft} />

            {/* CTA */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-[4px] bg-primary px-6 py-4 text-[15.5px] font-semibold text-primary-foreground transition-colors hover:bg-paper-dark-2"
              >
                Get a quote
                <Phone className="size-4" />
              </Link>
              <a
                href={site.phone.tel}
                className="inline-flex items-center justify-center gap-2 rounded-[4px] border border-input px-6 py-4 text-[15.5px] font-semibold text-foreground transition-colors hover:border-foreground"
              >
                <Phone className="size-4 text-brass" />
                {site.phone.display}
              </a>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-[14px] text-ink-soft transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Back to all products
            </Link>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="mb-6 font-archivo text-[24px] font-bold tracking-[-0.01em] text-foreground">
              You may also like
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="group flex items-center gap-4 rounded-[6px] border border-border bg-card p-4 transition-colors hover:border-foreground"
                >
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-[4px] bg-surface-illu">
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
                    <p className="truncate font-archivo text-[15px] font-semibold text-foreground">
                      {p.name}
                    </p>
                    <p className="mt-0.5 font-plex text-[12px] font-medium text-brass">
                      ₹{p.pricePerSqft.toLocaleString("en-IN")} / sq.ft
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
