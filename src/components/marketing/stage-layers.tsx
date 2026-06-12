/**
 * Decorative backdrop for the dark cinematic bands (hero + closing CTA).
 * Pure CSS animation (aurora drifts via .bg-aurora::before) — server-rendered,
 * zero JS. All layers are aria-hidden + pointer-events-none so they never enter
 * the a11y tree or intercept clicks. The prefers-reduced-motion guard in
 * globals.css freezes the aurora automatically.
 */
export function StageLayers() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* drifting aurora blobs */}
      <div className="bg-aurora h-full w-full opacity-90" />

      {/* perspective "command-center" grid floor */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 [perspective:900px]">
        <div className="bg-techgrid absolute inset-0 origin-bottom opacity-40 [mask-image:radial-gradient(ellipse_at_bottom,black,transparent_72%)] [transform:rotateX(64deg)_scale(2)]" />
      </div>

      {/* top edge light line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/60 to-transparent" />

      {/* film grain */}
      <div className="bg-noise absolute inset-0 opacity-[0.06] mix-blend-overlay" />
    </div>
  );
}
