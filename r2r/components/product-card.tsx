import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
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
    <Link href={`/products/${product.id}`} className={cn("group block", className)}>
      <div className="bg-white rounded-xl overflow-hidden ring-1 ring-border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-52 bg-muted overflow-hidden">
          <Image
            src={product.image || PLACEHOLDER}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge
              variant="secondary"
              className="capitalize text-xs bg-white/90 text-foreground shadow-sm backdrop-blur-sm"
            >
              {product.category}
            </Badge>
            {!product.inStock && (
              <Badge variant="outline" className="text-xs bg-white/90 backdrop-blur-sm">
                Out of Stock
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-semibold text-foreground text-base leading-snug group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 mb-3">{product.material}</p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-primary">
                ₹{(Number.isFinite(safePrice) ? safePrice : 0).toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground ml-1">/ sq.ft</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
              <ArrowRight className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
