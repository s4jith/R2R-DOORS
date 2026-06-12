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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<"All" | "Door" | "Window">("All");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    fetch("/api/products")
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
    <>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-border bg-hero-mesh">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Catalogue
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Our Products
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            {loading
              ? "Loading products…"
              : `${products.length} precision-engineered doors & windows, built to your exact spec.`}
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="bg-background py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-6">
          {/* Filter Bar */}
          <div className="mb-8 flex flex-wrap items-center gap-4 rounded-2xl bg-card p-3 shadow-sm ring-1 ring-foreground/[0.07]">
            <div className="flex items-center gap-2 pl-2 text-sm font-medium text-muted-foreground">
              <SlidersHorizontal className="size-4" />
              <span className="hidden sm:inline">Filter</span>
            </div>

            {/* Segmented category control */}
            <div className="flex gap-1 rounded-xl bg-muted p-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  aria-pressed={category === cat}
                  className={cn(
                    "rounded-lg px-4 py-1.5 text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                    category === cat
                      ? "bg-card text-primary shadow-sm ring-1 ring-foreground/[0.06]"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-2">
              <label
                htmlFor="sort"
                className="hidden text-sm text-muted-foreground sm:inline"
              >
                Sort by
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-ring/40"
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
            <p className="mb-6 text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {filtered.length}
              </span>{" "}
              product{filtered.length !== 1 ? "s" : ""}
              {category !== "All" ? ` in ${category}s` : ""}
            </p>
          )}

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/[0.07]"
                >
                  <Skeleton className="h-52 w-full rounded-none" />
                  <div className="flex flex-col gap-2 p-5">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="mt-2 h-6 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-destructive/30 bg-destructive-subtle/40 py-20 text-center">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertCircle className="size-6" />
              </div>
              <p className="text-lg font-semibold text-foreground">
                Something went wrong
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{error}</p>
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-card py-20 text-center">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-accent text-primary">
                <PackageSearch className="size-6" />
              </div>
              <p className="text-lg font-semibold text-foreground">
                No products found
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your filters to see more results.
              </p>
              {category !== "All" && (
                <button
                  onClick={() => setCategory("All")}
                  className="mt-5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
