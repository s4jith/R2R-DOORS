import { cn } from "@/lib/utils";

/**
 * R2R wordmark — the architectural door glyph + "R2R / DOORS & WINDOWS"
 * lockup. `tone="dark"` for the light header, `tone="light"` for the navy
 * footer.
 */
type Tone = "dark" | "light";

const palette: Record<
  Tone,
  { stroke: string; fill: string; dot: string; word: string; sub: string }
> = {
  dark: {
    stroke: "#0f2742",
    fill: "#0f2742",
    dot: "#ffffff",
    word: "#0f2742",
    sub: "#7088a4",
  },
  light: {
    stroke: "#bcd2ec",
    fill: "#bcd2ec",
    dot: "#0f2742",
    word: "#ffffff",
    sub: "#7088a4",
  },
};

export default function R2RMark({
  tone = "dark",
  className,
  size = 30,
}: {
  tone?: Tone;
  className?: string;
  size?: number;
}) {
  const c = palette[tone];
  const h = Math.round((size / 30) * 34);
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <svg
        width={size}
        height={h}
        viewBox="0 0 30 34"
        fill="none"
        aria-hidden="true"
      >
        <rect x="2.5" y="2" width="20" height="30" stroke={c.stroke} strokeWidth="2" />
        <path d="M6 4 L19 1 L19 33 L6 30 Z" fill={c.fill} />
        <circle cx="9" cy="17" r="1.4" fill={c.dot} />
        <line x1="26" y1="2" x2="26" y2="32" stroke={c.stroke} strokeWidth="2" />
      </svg>
      <span className="leading-none">
        <span
          className="block font-archivo text-[21px] font-extrabold tracking-[-0.01em]"
          style={{ color: c.word }}
        >
          R2R
        </span>
        <span
          className="mt-[3px] block font-plex text-[8.5px] tracking-[0.22em]"
          style={{ color: c.sub }}
        >
          DOORS &amp; WINDOWS
        </span>
      </span>
    </span>
  );
}
