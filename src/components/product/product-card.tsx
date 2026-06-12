import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

const PLACEHOLDER = "https://placehold.co/800x600/165a9e/ffffff?text=No+Image";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const safePrice = Number(product.pricePerSqft ?? 0);

  return (
    <Link
      href={`/products/${product.id}`}
      className={cn(
        "group block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <article className="relative h-full overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-foreground/[0.07] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg">
        {/* Image */}
        <div className="relative h-52 overflow-hidden bg-muted">
          <Image
            src={product.image || PLACEHOLDER}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            unoptimized
          />
          {/* gradient scrim for badge legibility */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/25 to-transparent" />
          <div className="absolute left-3 top-3 flex gap-2">
            <span className="glass rounded-full px-2.5 py-1 text-xs font-semibold capitalize text-foreground shadow-sm ring-1 ring-white/40">
              {product.category}
            </span>
            {!product.inStock && (
              <span className="rounded-full bg-destructive/90 px-2.5 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-sm">
                Out of Stock
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">{product.material}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold tracking-tight text-foreground">
                ₹{(Number.isFinite(safePrice) ? safePrice : 0).toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground">/ sq.ft</span>
            </div>
            <span className="flex size-9 items-center justify-center rounded-full bg-accent text-primary transition-colors group-hover:bg-gradient-primary group-hover:text-primary-foreground">
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
