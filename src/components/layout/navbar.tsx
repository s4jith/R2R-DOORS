"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import R2RMark from "@/components/brand/r2r-mark";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Section-mapped navigation. On the home page, items resolve to in-page
 * sections (#products, #work, …) driven by a scroll-spy. On the standalone
 * routes the matching item is active via the pathname so deep links still
 * highlight correctly.
 */
const NAV = [
  { label: "Products", section: "products", page: "/products" },
  { label: "Work", section: "work", page: "/projects" },
  { label: "Why R2R", section: "about", page: "/about" },
  { label: "FAQ", section: "faq", page: "/#faq" },
];

const SPY_IDS = ["products", "work", "about", "faq", "contact"];

export default function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Scroll-spy — only on the one-page home view.
  useEffect(() => {
    if (!onHome) return;
    const els = SPY_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));

    const onScroll = () => {
      if (window.scrollY < 280) setActiveSection("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [onHome]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function hrefFor(item: (typeof NAV)[number]) {
    if (item.section === "faq") return onHome ? "#faq" : "/#faq";
    return onHome ? `#${item.section}` : item.page;
  }

  function isActive(item: (typeof NAV)[number]) {
    if (onHome) return activeSection === item.section;
    return pathname === item.page || pathname.startsWith(`${item.page}/`);
  }

  return (
    <>
      {/* ── Utility bar ── */}
      <div className="bg-paper-dark text-on-dark">
        <div className="mx-auto flex h-[38px] max-w-[1240px] items-center justify-between px-5 font-plex text-[11px] tracking-[0.06em] sm:px-8">
          <div className="flex items-center gap-[22px]">
            <span>BENGALURU · INDIA</span>
            <span className="hidden opacity-50 sm:inline">MON–SAT&nbsp; 9:00–19:00</span>
          </div>
          <div className="flex items-center gap-[22px]">
            <span className="hidden text-brass-light sm:inline">
              ISO 9001:2015 CERTIFIED
            </span>
            <span className="hidden opacity-40 sm:inline">|</span>
            <a href={site.phone.tel} className="text-on-dark hover:text-white">
              {site.phone.display}
            </a>
          </div>
        </div>
      </div>

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-hairline bg-[rgba(255,255,255,0.85)] backdrop-blur-[8px]">
        <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-5 sm:px-8">
          <Link
            href={onHome ? "#top" : "/"}
            className="flex items-center rounded-[4px] outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            aria-label="R2R Doors & Windows — home"
          >
            <R2RMark tone="dark" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={hrefFor(item)}
                className={cn(
                  "px-3.5 py-2 text-[14.5px] font-medium transition-colors",
                  isActive(item)
                    ? "text-foreground"
                    : "text-ink-soft hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-[18px] md:flex">
            <a
              href={site.phone.tel}
              className="font-plex text-[13px] font-medium tracking-[0.02em] text-foreground"
            >
              {site.phone.display}
            </a>
            <Link
              href={onHome ? "#contact" : "/contact"}
              className="inline-flex items-center gap-2 rounded-[4px] bg-primary px-5 py-[11px] text-[14px] font-semibold text-primary-foreground transition-colors hover:bg-paper-dark-2"
            >
              Request a quote
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="-mr-1 rounded-[4px] p-2 text-foreground transition-colors hover:bg-secondary md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-hairline bg-background md:hidden"
            >
              <nav className="flex flex-col gap-1 px-5 py-4">
                {NAV.map((item) => (
                  <Link
                    key={item.label}
                    href={hrefFor(item)}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "rounded-[4px] px-4 py-2.5 text-[15px] font-medium transition-colors",
                      isActive(item)
                        ? "bg-secondary text-foreground"
                        : "text-ink-soft hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href={onHome ? "#contact" : "/contact"}
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-[4px] bg-primary px-4 py-3 text-[14.5px] font-semibold text-primary-foreground"
                >
                  Request a quote
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href={site.phone.tel}
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-[4px] border border-input px-4 py-3 font-plex text-[13px] font-medium text-foreground"
                >
                  {site.phone.display}
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div id="top" />
    </>
  );
}
