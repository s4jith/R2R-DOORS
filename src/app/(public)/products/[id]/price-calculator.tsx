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
    "w-full rounded-[4px] border border-input bg-field-bg px-[14px] py-[11px] text-[15px] text-foreground outline-none transition-colors focus:border-foreground";

  return (
    <div className="rounded-[6px] border border-border bg-card p-6">
      <h3 className="mb-4 flex items-center gap-2 font-plex text-[10.5px] uppercase tracking-[0.1em] text-ink-mono">
        <Calculator className="size-4 text-brass" />
        Price Calculator
      </h3>
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="calc-width"
            className="mb-1.5 block font-plex text-[10.5px] uppercase tracking-[0.1em] text-ink-mono"
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
            className="mb-1.5 block font-plex text-[10.5px] uppercase tracking-[0.1em] text-ink-mono"
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
        <div className="rounded-[4px] border border-border bg-accent p-4">
          <p className="font-plex text-[11px] text-ink-mono">
            {width} ft × {height} ft = {calcArea} sq.ft
          </p>
          <p className="mt-1 font-archivo text-[26px] font-bold tracking-[-0.01em] text-foreground">
            ₹{calcPrice.toLocaleString("en-IN")}
          </p>
          <p className="mt-1 text-[12px] text-ink-soft">
            * Estimate only. Final price may vary with finish and hardware.
          </p>
        </div>
      ) : (
        <p className="text-[13px] text-ink-soft">
          Enter width and height to calculate an estimated price.
        </p>
      )}
    </div>
  );
}
