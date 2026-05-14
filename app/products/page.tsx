"use client";

import { useEffect, useState, useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";
import PublicLayout from "@/components/public-layout";
import ProductCard from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
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
      result = result.filter(
        (p) => p.category === category.toLowerCase()
      );
    }
    if (sort === "asc") result.sort((a, b) => a.pricePerSqft - b.pricePerSqft);
    if (sort === "desc") result.sort((a, b) => b.pricePerSqft - a.pricePerSqft);
    return result;
  }, [products, category, sort]);

  return (
    <PublicLayout>
      {/* Header */}
      <section className="bg-white border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-extrabold text-foreground mb-2">
            Our Products
          </h1>
          <p className="text-muted-foreground">
            {loading
              ? "Loading products…"
              : `${products.length} products — precision-engineered doors & windows.`}
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="bg-background py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-4 mb-8 p-4 bg-white rounded-xl ring-1 ring-border shadow-sm">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <SlidersHorizontal className="w-4 h-4" />
              Filter:
            </div>

            {/* Category tabs */}
            <div className="flex gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    category === cat
                      ? "bg-primary text-white shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-muted-foreground">
                Sort by:
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm border border-border rounded-lg px-3 py-1.5 bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
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
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            {category !== "All" ? ` in ${category}s` : ""}
          </p>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden ring-1 ring-border">
                  <Skeleton className="h-52 w-full" />
                  <div className="p-5 flex flex-col gap-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-6 w-1/3 mt-2" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-24">
              <p className="text-lg font-medium text-destructive">{error}</p>
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 text-muted-foreground">
              <p className="text-lg font-medium">No products found.</p>
              <p className="text-sm mt-1">Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
