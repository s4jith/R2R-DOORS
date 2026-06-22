/**
 * Hero "elevation drawing" plate — the dotted blueprint panel with dimension
 * lines and a teak panel-door elevation, from the R2R Home design.
 */
function CornerMark({ className }: { className: string }) {
  return (
    <svg
      className={`absolute ${className}`}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      aria-hidden
    >
      <path d="M7 1v12M1 7h12" stroke="#bcd2ec" strokeWidth="1" />
    </svg>
  );
}

export default function HeroElevation() {
  return (
    <div className="relative">
      <div
        className="relative rounded-[6px] border border-border bg-card px-12 pb-6 pt-10"
        style={{
          backgroundImage: "radial-gradient(#dde8f5 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      >
        <CornerMark className="left-3 top-3" />
        <CornerMark className="right-3 top-3" />
        <CornerMark className="bottom-3 left-3" />
        <CornerMark className="bottom-3 right-3" />

        <svg
          width="100%"
          viewBox="0 0 340 440"
          fill="none"
          className="block"
          style={{ color: "#1b3a5f", fontFamily: "var(--font-plex), monospace" }}
        >
          {/* width dimension */}
          <g stroke="#9fb8d6" strokeWidth="1">
            <line x1="78" y1="26" x2="262" y2="26" />
            <line x1="78" y1="20" x2="78" y2="32" />
            <line x1="262" y1="20" x2="262" y2="32" />
          </g>
          <rect x="150" y="18" width="40" height="16" fill="#FFFFFF" />
          <text x="170" y="30" textAnchor="middle" fontSize="11" fill="#7088a4">
            900
          </text>

          {/* height dimension */}
          <g stroke="#9fb8d6" strokeWidth="1">
            <line x1="30" y1="50" x2="30" y2="414" />
            <line x1="24" y1="50" x2="36" y2="50" />
            <line x1="24" y1="414" x2="36" y2="414" />
          </g>
          <rect x="14" y="222" width="32" height="16" fill="#FFFFFF" />
          <text x="30" y="234" textAnchor="middle" fontSize="11" fill="#7088a4">
            2100
          </text>

          {/* frame + leaf */}
          <rect x="78" y="50" width="184" height="364" stroke="#1b3a5f" strokeWidth="2" />
          <rect x="92" y="62" width="156" height="340" stroke="#1b3a5f" strokeWidth="1.5" />
          {/* panels */}
          <rect x="106" y="78" width="56" height="74" stroke="#1763c4" strokeWidth="1.3" />
          <rect x="178" y="78" width="56" height="74" stroke="#1763c4" strokeWidth="1.3" />
          <rect x="106" y="168" width="56" height="216" stroke="#1b3a5f" strokeWidth="1.3" />
          <rect x="178" y="168" width="56" height="216" stroke="#1b3a5f" strokeWidth="1.3" />
          {/* handle */}
          <circle cx="170" cy="240" r="4" fill="#1763c4" />
          <line x1="170" y1="200" x2="170" y2="284" stroke="#1b3a5f" strokeWidth="1.5" />
          {/* floor */}
          <line x1="60" y1="414" x2="280" y2="414" stroke="#1b3a5f" strokeWidth="2" />
          <line x1="60" y1="420" x2="70" y2="414" stroke="#9fb8d6" strokeWidth="1" />
          <line x1="76" y1="420" x2="86" y2="414" stroke="#9fb8d6" strokeWidth="1" />
          <line x1="92" y1="420" x2="102" y2="414" stroke="#9fb8d6" strokeWidth="1" />
        </svg>

        <div className="mt-3 flex items-center justify-between border-t border-hairline-soft pt-3.5 font-plex text-[10.5px] tracking-[0.1em] text-ink-mono">
          <span>ELEVATION · TEAK PANEL DOOR</span>
          <span>SCALE 1:20</span>
        </div>
      </div>

      <div className="absolute -top-3.5 right-7 rounded-[4px] bg-brass px-3 py-[7px] font-plex text-[11px] tracking-[0.08em] text-white">
        ±0.5 mm TOLERANCE
      </div>
    </div>
  );
}
