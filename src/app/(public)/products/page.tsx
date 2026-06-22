"use client";

import { useEffect, useState, useMemo } from "react";
import { SlidersHorizontal, PackageSearch, AlertCircle } from "lucide-react";
import ProductCard from "@/components/product/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

const CATEGORIES = ["All", "Door", "Window"] as const;
const SORT_OPTIONS = [
  { label: "Default", value: "default" },
  { label: "Price: Low to High", value: "asc" },
  { label: "Price: High to Low", value: "desc" },
];

const container = "mx-auto max-w-[1240px] px-5 sm:px-8";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<"All" | "Door" | "Window">("All");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    fetch("/api/products", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load");
        return r.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load products. Please try again.");
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];
    if (category !== "All") {
      result = result.filter((p) => p.category === category.toLowerCase());
    }
    if (sort === "asc") result.sort((a, b) => a.pricePerSqft - b.pricePerSqft);
    if (sort === "desc") result.sort((a, b) => b.pricePerSqft - a.pricePerSqft);
    return result;
  }, [products, category, sort]);

  return (
    <div className="bg-background text-foreground">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-dotgrid [background-size:18px_18px] opacity-50 [mask-image:linear-gradient(to_left,black,transparent)]"
        />
        <div className={`${container} relative py-16 sm:py-20`}>
          <p className="mb-4 font-plex text-[11.5px] uppercase tracking-[0.16em] text-brass">
            Catalogue
          </p>
          <h1 className="font-archivo text-[clamp(36px,5vw,52px)] font-extrabold tracking-[-0.025em] text-foreground">
            Our products
          </h1>
          <p className="mt-4 max-w-[560px] text-[18px] leading-[1.6] text-ink-soft">
            {loading
              ? "Loading products…"
              : `${products.length} precision-engineered doors & windows, built to your exact spec.`}
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-12 sm:py-14">
        <div className={container}>
          {/* Filter Bar */}
          <div className="mb-8 flex flex-wrap items-center gap-4 rounded-[6px] border border-border bg-card p-3">
            <div className="flex items-center gap-2 pl-2 font-plex text-[11px] uppercase tracking-[0.08em] text-ink-mono">
              <SlidersHorizontal className="size-4" />
              <span className="hidden sm:inline">Filter</span>
            </div>

            {/* Segmented category control */}
            <div className="flex gap-1.5 rounded-[6px] bg-secondary p-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  aria-pressed={category === cat}
                  className={cn(
                    "rounded-[4px] px-4 py-[7px] text-[14px] font-semibold transition-colors outline-none",
                    category === cat
                      ? "bg-primary text-primary-foreground"
                      : "text-ink-soft hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-2">
              <label
                htmlFor="sort"
                className="hidden font-plex text-[11px] uppercase tracking-[0.08em] text-ink-mono sm:inline"
              >
                Sort by
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-[4px] border border-input bg-field-bg px-3 py-2 text-[14px] text-foreground outline-none transition-colors focus:border-foreground"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          {!loading && !error && (
            <p className="mb-6 font-plex text-[12px] tracking-[0.04em] text-ink-mono">
              Showing{" "}
              <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
              product{filtered.length !== 1 ? "s" : ""}
              {category !== "All" ? ` in ${category}s` : ""}
            </p>
          )}

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-[6px] border border-border bg-card">
                  <Skeleton className="h-[210px] w-full rounded-none" />
                  <div className="flex flex-col gap-2 p-[22px]">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="mt-2 h-6 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center rounded-[6px] border border-dashed border-destructive/40 bg-card py-20 text-center">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertCircle className="size-6" />
              </div>
              <p className="font-archivo text-[18px] font-semibold text-foreground">
                Something went wrong
              </p>
              <p className="mt-1 text-[14px] text-ink-soft">{error}</p>
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center rounded-[6px] border border-dashed border-border bg-card py-20 text-center">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-accent text-brass">
                <PackageSearch className="size-6" />
              </div>
              <p className="font-archivo text-[18px] font-semibold text-foreground">
                No products found
              </p>
              <p className="mt-1 text-[14px] text-ink-soft">
                Try adjusting your filters to see more results.
              </p>
              {category !== "All" && (
                <button
                  onClick={() => setCategory("All")}
                  className="mt-5 rounded-[4px] bg-primary px-4 py-2 text-[14px] font-semibold text-primary-foreground transition-colors hover:bg-paper-dark-2"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
