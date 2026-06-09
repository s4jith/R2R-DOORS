import Image from "next/image";
import logoImage from "@/assets/logo.png";
import { cn } from "@/lib/utils";

type R2RLogoProps = {
  animated?: boolean;
  className?: string;
};

export default function R2RLogo({ animated = true, className = "" }: R2RLogoProps) {
  return (
    <div
      aria-label="R2R Doors and Windows logo"
      className={cn("group relative inline-flex items-center select-none overflow-hidden", className)}
    >
      <Image
        src={logoImage}
        alt="R2R Doors & Windows logo"
        className={cn(
          "h-full w-full object-contain transition-transform duration-500",
          animated ? "group-hover:scale-[1.03]" : ""
        )}
        sizes="(max-width: 768px) 120px, 180px"
        priority
      />

      {animated && (
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
      )}
    </div>
  );
}
