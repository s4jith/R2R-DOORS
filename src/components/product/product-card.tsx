import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

const PLACEHOLDER = "https://placehold.co/800x600/0f2742/ffffff?text=R2R";

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
        "group block overflow-hidden rounded-[6px] border border-border bg-card transition-colors hover:border-foreground",
        className
      )}
    >
      {/* Image */}
      <div className="relative h-[210px] overflow-hidden border-b border-border bg-surface-illu">
        <Image
          src={product.image || PLACEHOLDER}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          unoptimized
        />
        <span className="absolute left-3.5 top-3.5 rounded-[3px] border border-border bg-card px-[9px] py-1 font-plex text-[10px] uppercase tracking-[0.1em] text-ink-mono">
          {product.category}
        </span>
        {!product.inStock && (
          <span className="absolute right-3.5 top-3.5 rounded-[3px] bg-accent px-[9px] py-1 font-plex text-[10px] tracking-[0.08em] text-brass">
            MADE TO ORDER
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-[22px]">
        <h3 className="font-archivo text-[18px] font-semibold tracking-[-0.01em] text-foreground">
          {product.name}
        </h3>
        <p className="mt-1.5 text-[13.5px] text-ink-mono">{product.material}</p>
        <div className="mt-[22px] flex items-end justify-between border-t border-border pt-[18px]">
          <div>
            <span className="font-archivo text-[22px] font-bold tracking-[-0.01em] text-foreground">
              ₹{(Number.isFinite(safePrice) ? safePrice : 0).toLocaleString("en-IN")}
            </span>
            <span className="ml-1 font-plex text-[11px] text-ink-mono">/ sq.ft</span>
          </div>
          <span className="inline-flex size-[34px] items-center justify-center rounded-full border border-border text-foreground transition-colors group-hover:border-foreground">
            <ArrowRight className="size-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
