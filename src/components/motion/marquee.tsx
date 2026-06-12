import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite horizontal marquee. Renders the track twice so the CSS
 * translateX(-50%) loop is seamless. Edge-faded; pauses on hover.
 * Server-safe (pure CSS animation).
 */
export function Marquee({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mask-fade-x overflow-hidden", className)}>
      <div className="animate-marquee flex w-max items-center">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
