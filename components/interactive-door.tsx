"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, RotateCcw } from "lucide-react";

/* ── sub-components ────────────────────────────────────────────── */

function DoorHinge({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <>
      <div
        className={`absolute top-[13%] ${isLeft ? "-left-[2px]" : "-right-[2px]"} w-[11px] h-[24px] ${isLeft ? "rounded-r-[3px]" : "rounded-l-[3px]"}`}
        style={{ background: "linear-gradient(90deg, #8faac4, #b8cee0, #8faac4)" }}
      />
      <div
        className={`absolute bottom-[15%] ${isLeft ? "-left-[2px]" : "-right-[2px]"} w-[11px] h-[24px] ${isLeft ? "rounded-r-[3px]" : "rounded-l-[3px]"}`}
        style={{ background: "linear-gradient(90deg, #8faac4, #b8cee0, #8faac4)" }}
      />
    </>
  );
}

function DoorGlassPanel({ alignRight }: { alignRight?: boolean }) {
  return (
    <div
      className={`absolute top-[10%] ${alignRight ? "left-[10%] right-[14%]" : "left-[14%] right-[10%]"} rounded-[4px] overflow-hidden`}
      style={{
        height: "36%",
        background: "linear-gradient(140deg, rgba(22,90,158,0.07), rgba(100,165,228,0.14))",
        border: "1px solid rgba(22,90,158,0.18)",
      }}
    >
      {/* shimmer highlight */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(120deg, transparent 35%, rgba(255,255,255,0.5) 50%, transparent 65%)",
        }}
      />
      {/* dividers */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-blue-200/40" />
      <div className="absolute inset-y-0 left-1/2 w-px bg-blue-200/40" />
    </div>
  );
}

function DoorLowerPanel({ alignRight }: { alignRight?: boolean }) {
  return (
    <div
      className={`absolute bottom-[10%] ${alignRight ? "left-[10%] right-[14%]" : "left-[14%] right-[10%]"} rounded-[4px]`}
      style={{
        height: "38%",
        background:
          "linear-gradient(160deg, rgba(22,90,158,0.04), rgba(22,90,158,0.11))",
        border: "1px solid rgba(22,90,158,0.13)",
      }}
    >
      <div
        className="absolute inset-[8px] rounded-[3px]"
        style={{ border: "1px solid rgba(22,90,158,0.09)" }}
      />
    </div>
  );
}

function DoorHandle({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <div
      className={`absolute ${isLeft ? "right-[10px]" : "left-[10px]"} top-1/2 -translate-y-1/2`}
    >
      {/* rose plate */}
      <div
        className="w-[9px] h-[34px] rounded-[3px]"
        style={{
          background:
            "linear-gradient(180deg, #b4c8de 0%, #7e9cb8 50%, #b4c8de 100%)",
          boxShadow: "0 2px 5px rgba(0,0,0,0.22)",
        }}
      />
      {/* lever arm */}
      <div
        className="absolute w-[6px] h-[18px] rounded-[2px]"
        style={{
          background: "linear-gradient(90deg, #7e9cb8, #b4c8de)",
          top: "8px",
          [isLeft ? "right" : "left"]: "-4px",
          transform: `rotate(${isLeft ? -22 : 22}deg)`,
          transformOrigin: "top center",
        }}
      />
    </div>
  );
}

/* ── main component ────────────────────────────────────────────── */

export default function InteractiveDoor() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const panelFace: React.CSSProperties = {
    background: "linear-gradient(158deg, #f2f6fb 0%, #dce8f7 38%, #c2d4ec 100%)",
    backfaceVisibility: "hidden",
  };
  const panelBack: React.CSSProperties = {
    background: "linear-gradient(160deg, #b8cde2, #8aaec8)",
    transform: "rotateY(180deg)",
    backfaceVisibility: "hidden",
  };

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* ── outer ambient glow ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-none absolute -inset-12 rounded-[50px]"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(22,90,158,0.18) 0%, transparent 70%)",
              filter: "blur(18px)",
            }}
          />
        )}
      </AnimatePresence>

      {/* ── 3D scene ── */}
      <div
        className="relative pb-16"
        style={{ perspective: "1400px", perspectiveOrigin: "50% 44%" }}
      >
        {/* door container — preserve-3d so child panels get depth */}
        <div
          className="relative w-[268px] h-[390px] md:w-[308px] md:h-[452px]"
          style={{ transformStyle: "preserve-3d" }}
          onMouseEnter={() => !isOpen && setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* ── outer architrave frame ── */}
          <motion.div
            className="absolute inset-0 rounded-[5px]"
            animate={{
              boxShadow: isOpen
                ? "0 0 55px rgba(22,90,158,0.5), 0 0 100px rgba(22,90,158,0.2), 0 24px 60px rgba(0,0,0,0.35)"
                : isHovered
                  ? "0 0 30px rgba(22,90,158,0.35), 0 18px 50px rgba(0,0,0,0.25)"
                  : "0 14px 44px rgba(0,0,0,0.22)",
            }}
            transition={{ duration: 0.5 }}
            style={{
              background:
                "linear-gradient(145deg, #1e3d60 0%, #0f2744 60%, #162e4a 100%)",
            }}
          />

          {/* ── interior room (behind the panels) ── */}
          <div
            className="absolute overflow-hidden rounded-[3px]"
            style={{
              inset: "9px",
              background:
                "linear-gradient(165deg, #0c1e38 0%, #155290 55%, #1c6ec4 100%)",
            }}
          >
            {/* light rays */}
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-0 left-1/2 origin-top bg-white"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isOpen
                    ? [0, 0.13, 0.06, 0.13, 0]
                    : 0,
                }}
                transition={{
                  delay: isOpen ? 0.4 + i * 0.07 : 0,
                  duration: 3 + i * 0.3,
                  repeat: isOpen ? Infinity : 0,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                style={{
                  width: "3px",
                  height: "160%",
                  transform: `translateX(-50%) rotate(${-42 + i * 14}deg)`,
                  filter: "blur(5px)",
                }}
              />
            ))}

            {/* floating sparkle particles */}
            <AnimatePresence>
              {isOpen &&
                [...Array(9)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute rounded-full bg-white"
                    initial={{ opacity: 0, bottom: "-5%", left: `${8 + i * 10}%` }}
                    animate={{ opacity: [0, 0.75, 0], bottom: ["−5%", "108%"] }}
                    transition={{
                      delay: 0.6 + i * 0.22,
                      duration: 2.8 + (i % 4) * 0.35,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    style={{
                      width: i % 3 === 0 ? "3px" : "2px",
                      height: i % 3 === 0 ? "3px" : "2px",
                    }}
                  />
                ))}
            </AnimatePresence>

            {/* ── reveal content card ── */}
            <motion.div
              initial={false}
              animate={{
                opacity: isOpen ? 1 : 0,
                scale: isOpen ? 1 : 0.82,
                y: isOpen ? 0 : 18,
              }}
              transition={{
                delay: isOpen ? 0.52 : 0,
                duration: 0.48,
                ease: [0.34, 1.12, 0.64, 1],
              }}
              className="absolute inset-3 flex flex-col items-center justify-center gap-3 rounded-xl p-4"
              style={{
                background: "rgba(255,255,255,0.09)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.16)",
                boxShadow:
                  "0 8px 32px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              {/* limited-time badge */}
              <motion.div
                animate={isOpen ? { rotate: [0, 12, -8, 0] } : {}}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-[5px] text-[10px] font-bold tracking-widest uppercase"
                style={{
                  background: "rgba(255,195,40,0.14)",
                  border: "1px solid rgba(255,195,40,0.35)",
                  color: "#fdd87a",
                }}
              >
                <Sparkles className="w-[10px] h-[10px]" />
                Limited Time
              </motion.div>

              {/* offer number */}
              <div className="text-center">
                <p className="text-[42px] font-black text-white leading-none tracking-tight">
                  15%
                </p>
                <p className="text-[13px] font-semibold text-white/85 -mt-0.5">
                  OFF
                </p>
              </div>

              <p className="text-[11px] text-white/55 text-center leading-snug">
                All Premium Doors
                <br />
                &amp; Windows
              </p>

              <div className="w-8 h-px bg-white/18" />

              <p className="text-[10px] text-white/45 italic text-center px-2 leading-snug">
                "Step into Precision Engineering"
              </p>

              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 rounded-[10px] px-4 py-[9px] text-[11px] font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                style={{
                  background: "white",
                  color: "#165a9e",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                }}
              >
                Explore Products
                <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          </div>

          {/* ── LEFT door panel ── */}
          <motion.div
            className="absolute inset-y-[9px] left-[9px] z-10 cursor-pointer"
            style={{
              width: "calc(50% - 11px)",
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
            }}
            animate={{ rotateY: isOpen ? -118 : 0 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            onClick={open}
            whileHover={!isOpen ? { x: -2 } : {}}
          >
            {/* front */}
            <div
              className="absolute inset-0 rounded-[4px]"
              style={{
                ...panelFace,
                boxShadow:
                  "2px 0 10px rgba(0,0,0,0.16), inset -2px 0 7px rgba(22,90,158,0.09)",
              }}
            >
              <DoorHinge side="left" />
              <DoorGlassPanel />
              <DoorLowerPanel />
              <DoorHandle side="left" />

              {/* hover tint */}
              <AnimatePresence>
                {isHovered && !isOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 rounded-[4px]"
                    style={{
                      background:
                        "linear-gradient(160deg, rgba(22,90,158,0.05), rgba(22,90,158,0.13))",
                      boxShadow: "inset 0 0 22px rgba(22,90,158,0.1)",
                    }}
                  />
                )}
              </AnimatePresence>
            </div>
            {/* back */}
            <div className="absolute inset-0 rounded-[4px]" style={panelBack} />
          </motion.div>

          {/* ── RIGHT door panel ── */}
          <motion.div
            className="absolute inset-y-[9px] right-[9px] z-10 cursor-pointer"
            style={{
              width: "calc(50% - 11px)",
              transformOrigin: "right center",
              transformStyle: "preserve-3d",
            }}
            animate={{ rotateY: isOpen ? 118 : 0 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            onClick={open}
            whileHover={!isOpen ? { x: 2 } : {}}
          >
            {/* front */}
            <div
              className="absolute inset-0 rounded-[4px]"
              style={{
                ...panelFace,
                boxShadow:
                  "-2px 0 10px rgba(0,0,0,0.16), inset 2px 0 7px rgba(22,90,158,0.09)",
              }}
            >
              <DoorHinge side="right" />
              <DoorGlassPanel alignRight />
              <DoorLowerPanel alignRight />
              <DoorHandle side="right" />

              {/* hover tint */}
              <AnimatePresence>
                {isHovered && !isOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 rounded-[4px]"
                    style={{
                      background:
                        "linear-gradient(160deg, rgba(22,90,158,0.05), rgba(22,90,158,0.13))",
                      boxShadow: "inset 0 0 22px rgba(22,90,158,0.1)",
                    }}
                  />
                )}
              </AnimatePresence>
            </div>
            {/* back */}
            <div className="absolute inset-0 rounded-[4px]" style={panelBack} />
          </motion.div>

          {/* frame glow ring on hover */}
          <AnimatePresence>
            {isHovered && !isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pointer-events-none absolute -inset-1 rounded-[7px]"
                style={{
                  boxShadow:
                    "0 0 24px rgba(22,90,158,0.45), 0 0 48px rgba(22,90,158,0.22)",
                }}
              />
            )}
          </AnimatePresence>

          {/* threshold strip */}
          <div
            className="absolute bottom-0 inset-x-0 h-[9px] z-20 rounded-b-[5px]"
            style={{ background: "#0a1c30" }}
          />
        </div>

        {/* ── "Open the Door" floating badge ── */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.82, y: -8 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <motion.button
                onClick={open}
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-2 rounded-full border border-primary/20 bg-white px-5 py-[10px] text-sm font-semibold text-primary shadow-lg shadow-primary/12 transition-shadow hover:shadow-xl hover:shadow-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <span className="text-base leading-none" aria-hidden>
                  👆
                </span>
                Open the Door
              </motion.button>

              {/* pulsing up-arrow */}
              <motion.span
                animate={{ opacity: [0.25, 0.75, 0.25] }}
                transition={{ duration: 2.1, repeat: Infinity }}
                className="text-[10px] text-primary/40 font-semibold"
                aria-hidden
              >
                ▲
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── close / reset affordance ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.button
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.3 }}
            onClick={close}
            className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-medium text-primary/35 transition-colors hover:text-primary/65 focus:outline-none"
          >
            <RotateCcw className="w-[11px] h-[11px]" />
            Close door
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
