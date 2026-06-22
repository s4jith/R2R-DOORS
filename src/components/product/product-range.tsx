"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

type Filter = "all" | "door" | "window";

function DoorGlyph() {
  return (
    <svg width="92" height="150" viewBox="0 0 92 150" fill="none" style={{ color: "#26456a" }}>
      <rect x="14" y="6" width="58" height="132" stroke="currentColor" strokeWidth="1.6" />
      <rect x="21" y="13" width="44" height="118" stroke="currentColor" strokeWidth="1.2" />
      <rect x="28" y="20" width="30" height="34" stroke="currentColor" strokeWidth="1" />
      <rect x="28" y="60" width="30" height="64" stroke="currentColor" strokeWidth="1" />
      <circle cx="50" cy="78" r="2.4" fill="#1763c4" />
      <line x1="8" y1="138" x2="78" y2="138" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function WindowGlyph() {
  return (
    <svg width="140" height="120" viewBox="0 0 140 120" fill="none" style={{ color: "#26456a" }}>
      <rect x="10" y="8" width="120" height="92" stroke="currentColor" strokeWidth="1.6" />
      <rect x="17" y="15" width="49" height="78" stroke="currentColor" strokeWidth="1" />
      <rect x="74" y="15" width="49" height="78" stroke="currentColor" strokeWidth="1" />
      <line x1="70" y1="8" x2="70" y2="100" stroke="currentColor" strokeWidth="1.6" />
      <line x1="58" y1="48" x2="58" y2="60" stroke="#1763c4" strokeWidth="2" />
      <line x1="82" y1="48" x2="82" y2="60" stroke="#1763c4" strokeWidth="2" />
      <line x1="4" y1="108" x2="136" y2="108" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export default function ProductRange({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const counts = {
    all: products.length,
    door: products.filter((p) => p.category === "door").length,
    window: products.filter((p) => p.category === "window").length,
  };
  const shown = filter === "all" ? products : products.filter((p) => p.category === filter);

  const tabs: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "door", label: "Doors" },
    { key: "window", label: "Windows" },
  ];

  return (
    <>
      {/* Header row: heading + filter tabs */}
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-4 font-plex text-[11.5px] uppercase tracking-[0.16em] text-brass">
            Catalogue
          </div>
          <h2 className="max-w-[520px] font-archivo text-[clamp(30px,4vw,42px)] font-bold leading-[1.04] tracking-[-0.02em]">
            Doors &amp; windows for every opening
          </h2>
        </div>
        <div className="flex gap-1.5 self-start rounded-[6px] bg-secondary p-1.5 sm:self-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className={cn(
                "rounded-[4px] px-[18px] py-[9px] text-[14px] font-semibold tracking-[0.01em] transition-colors",
                filter === t.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent text-ink-soft hover:text-foreground"
              )}
            >
              {t.label}
              <span className="ml-1.5 opacity-60">{counts[t.key]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.id}`}
            className="group block overflow-hidden rounded-[6px] border border-border bg-card transition-colors hover:border-foreground"
          >
            <div className="relative flex h-[210px] items-center justify-center overflow-hidden border-b border-border bg-surface-illu bg-dotgrid">
              {p.image ? (
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  unoptimized
                />
              ) : p.category === "door" ? (
                <DoorGlyph />
              ) : (
                <WindowGlyph />
              )}
              <span className="absolute left-3.5 top-3.5 rounded-[3px] border border-border bg-card px-[9px] py-1 font-plex text-[10px] uppercase tracking-[0.1em] text-ink-mono">
                {p.category}
              </span>
              {!p.inStock && (
                <span className="absolute right-3.5 top-3.5 rounded-[3px] bg-accent px-[9px] py-1 font-plex text-[10px] tracking-[0.08em] text-brass">
                  MADE TO ORDER
                </span>
              )}
            </div>
            <div className="p-[22px]">
              <h3 className="font-archivo text-[18px] font-semibold tracking-[-0.01em] text-foreground">
                {p.name}
              </h3>
              <p className="mt-1.5 text-[13.5px] text-ink-mono">{p.material}</p>
              <div className="mt-[22px] flex items-end justify-between border-t border-border pt-[18px]">
                <div>
                  <span className="font-archivo text-[22px] font-bold tracking-[-0.01em]">
                    {inr(p.pricePerSqft)}
                  </span>
                  <span className="ml-1 font-plex text-[11px] text-ink-mono">/ sq.ft</span>
                </div>
                <span className="inline-flex size-[34px] items-center justify-center rounded-full border border-border text-foreground transition-colors group-hover:border-foreground">
                  <ArrowRight className="size-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {shown.length === 0 && (
        <div className="rounded-[6px] border border-dashed border-border bg-card px-6 py-16 text-center">
          <p className="font-archivo text-[18px] font-semibold text-foreground">
            Catalogue coming online.
          </p>
          <p className="mt-1.5 text-[14px] text-ink-soft">
            Call us for the current range and made-to-order options.
          </p>
        </div>
      )}
    </>
  );
}
