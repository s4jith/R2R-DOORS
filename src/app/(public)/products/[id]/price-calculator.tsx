"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";

interface PriceCalculatorProps {
  pricePerSqft: number;
}

export default function PriceCalculator({ pricePerSqft }: PriceCalculatorProps) {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const calcArea = Number(width) * Number(height);
  const calcPrice = calcArea > 0 ? calcArea * pricePerSqft : null;

  const inputCls =
    "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-ring/40";

  return (
    <div className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-foreground/[0.07]">
      <h3 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-foreground">
        <Calculator className="size-4 text-primary" />
        Price Calculator
      </h3>
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="calc-width"
            className="mb-1 block text-xs text-muted-foreground"
          >
            Width (ft)
          </label>
          <input
            id="calc-width"
            type="number"
            min="0"
            step="0.5"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="e.g. 3"
            className={inputCls}
          />
        </div>
        <div>
          <label
            htmlFor="calc-height"
            className="mb-1 block text-xs text-muted-foreground"
          >
            Height (ft)
          </label>
          <input
            id="calc-height"
            type="number"
            min="0"
            step="0.5"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g. 7"
            className={inputCls}
          />
        </div>
      </div>
      {calcPrice !== null ? (
        <div className="rounded-xl bg-accent p-4 ring-1 ring-primary/10">
          <p className="text-xs text-muted-foreground">
            {width} ft × {height} ft = {calcArea} sq.ft
          </p>
          <p className="mt-0.5 text-2xl font-bold tracking-tight text-primary">
            ₹{calcPrice.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            * Estimate only. Final price may vary with finish and hardware.
          </p>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">
          Enter width and height to calculate an estimated price.
        </p>
      )}
    </div>
  );
}
