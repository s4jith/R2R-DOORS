"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import R2RLogo from "@/components/brand/r2r-logo";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Section-mapped navigation. On the home page, items map to in-page sections
 * (#products, #projects, …) and the active item is driven by a scroll-spy. On
 * the standalone routes (/products, /projects, …) the matching item is active
 * via the pathname so deep links still highlight correctly.
 */
const navLinks = [
  { section: "home", label: "Home", href: "/#home", page: "/" },
  { section: "products", label: "Products", href: "/#products", page: "/products" },
  { section: "projects", label: "Projects", href: "/#projects", page: "/projects" },
  { section: "about", label: "About", href: "/#about", page: "/about" },
  { section: "contact", label: "Contact", href: "/#contact", page: "/contact" },
];

const SPY_IDS = ["products", "projects", "about", "contact"];

export default function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      if (window.scrollY < 280) setActiveSection("home");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [onHome]);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function isActive(link: (typeof navLinks)[number]) {
    if (onHome) return activeSection === link.section;
    if (link.page === "/") return false;
    return pathname === link.page || pathname.startsWith(`${link.page}/`);
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,border-color] duration-300",
        scrolled
          ? "glass border-b border-border/80 shadow-sm"
          : "border-b border-transparent bg-background/40 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/#home"
          className="flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <R2RLogo animated className="h-11 w-28" />
          <span className="hidden whitespace-nowrap text-[15px] font-bold tracking-tight text-foreground sm:inline">
            R2R Doors &amp; Windows
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = isActive(link);
            return (
              <Link
                key={link.section}
                href={link.href}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="hidden items-center gap-2 md:flex">
          <a
            href={site.phone.tel}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            <Phone className="size-4 text-primary" />
            <span className="hidden lg:inline">{site.phone.display}</span>
          </a>
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-1.5 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-primary transition-[transform,box-shadow] hover:shadow-primary-lg active:translate-y-px"
          >
            Get a Quote
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="-mr-1 rounded-lg p-2 text-foreground transition-colors hover:bg-muted md:hidden"
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
            className="overflow-hidden border-t border-border glass md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => {
                const active = isActive(link);
                return (
                  <Link
                    key={link.section}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                      active
                        ? "bg-accent text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-primary"
              >
                Get a Quote
                <ArrowRight className="size-4" />
              </Link>
              <a
                href={site.phone.tel}
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground"
              >
                <Phone className="size-4 text-primary" />
                {site.phone.display}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
