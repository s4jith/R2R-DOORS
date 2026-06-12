"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/**
 * Count-up number that animates the first time it scrolls into view.
 * Non-numeric values (e.g. "10yr", "ISO") render verbatim. Reduced-motion
 * users see the final value immediately.
 */
export function Counter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  // split into [prefix?] number [suffix?] e.g. "₹10L" / "500+" / "15+"
  const match = value.match(/^(\D*)(\d[\d,.]*)(.*)$/);
  const prefix = match?.[1] ?? "";
  const numStr = match?.[2] ?? "";
  const suffix = match?.[3] ?? "";
  const target = Number(numStr.replace(/,/g, ""));
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;

  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 90, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (inView && !reduce && match) mv.set(target);
  }, [inView, reduce, match, mv, target]);

  useEffect(() => {
    if (!match) return;
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      el.textContent = `${prefix}${numStr}${suffix}`;
      return;
    }
    const unsub = spring.on("change", (v) => {
      el.textContent = `${prefix}${v.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`;
    });
    return () => unsub();
  }, [spring, prefix, suffix, numStr, decimals, reduce, match]);

  // If the value isn't numeric, just print it.
  if (!match) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {reduce ? numStr : "0"}
      {suffix}
    </span>
  );
}
