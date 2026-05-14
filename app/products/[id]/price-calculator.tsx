"use client";

import { useState } from "react";

interface PriceCalculatorProps {
  pricePerSqft: number;
}

export default function PriceCalculator({ pricePerSqft }: PriceCalculatorProps) {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const calcArea = Number(width) * Number(height);
  const calcPrice = calcArea > 0 ? calcArea * pricePerSqft : null;

  return (
    <div className="bg-white rounded-xl p-5 ring-1 ring-border shadow-sm">
      <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">
        Price Calculator
      </h3>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">
            Width (ft)
          </label>
          <input
            type="number"
            min="0"
            step="0.5"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="e.g. 3"
            className="w-full px-3 py-2.5 rounded-lg border border-border text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">
            Height (ft)
          </label>
          <input
            type="number"
            min="0"
            step="0.5"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g. 7"
            className="w-full px-3 py-2.5 rounded-lg border border-border text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>
      {calcPrice !== null ? (
        <div className="p-3 bg-primary/5 rounded-lg">
          <p className="text-xs text-muted-foreground">
            {width} ft × {height} ft = {calcArea} sq.ft
          </p>
          <p className="text-xl font-bold text-primary mt-0.5">
            Estimated: ₹{calcPrice.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            * Final price may vary based on finish and hardware.
          </p>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">
          Enter width and height to calculate estimated price.
        </p>
      )}
    </div>
  );
}
