import Link from "next/link";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

const footerLinks = {
  Company: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About Us", href: "/about" },
    { label: "Admin Portal", href: "/admin" },
  ],
  Products: [
    { label: "Entry Doors", href: "/products?category=door" },
    { label: "Security Doors", href: "/products?category=door" },
    { label: "Windows", href: "/products?category=window" },
    { label: "Sliding Doors", href: "/products?category=door" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-brand-deep text-white">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--brand-400) 60%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <span className="text-lg font-bold tracking-tight">
              R2R Doors &amp; Windows
            </span>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
              Engineering precision doors and windows since 2008. We combine
              traditional craftsmanship with modern materials to deliver products
              that last a lifetime.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="tel:+919876543210"
                className="group flex items-center gap-2.5 text-sm text-white/70 transition-colors hover:text-white"
              >
                <span className="flex size-8 items-center justify-center rounded-lg bg-white/10 transition-colors group-hover:bg-white/20">
                  <Phone className="size-4 text-brand-200" />
                </span>
                +91 98765 43210
              </a>
              <a
                href="mailto:info@r2rdoors.com"
                className="group flex items-center gap-2.5 text-sm text-white/70 transition-colors hover:text-white"
              >
                <span className="flex size-8 items-center justify-center rounded-lg bg-white/10 transition-colors group-hover:bg-white/20">
                  <Mail className="size-4 text-brand-200" />
                </span>
                info@r2rdoors.com
              </a>
              <div className="flex items-start gap-2.5 text-sm text-white/70">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <MapPin className="size-4 text-brand-200" />
                </span>
                <span className="pt-1.5">
                  42, Industrial Estate, Phase II, Bengaluru — 560 058
                </span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">
                {section}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                      <ArrowUpRight className="size-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 sm:flex-row">
          <p className="text-xs text-white/55">
            &copy; {new Date().getFullYear()} R2R Doors &amp; Windows. All rights
            reserved.
          </p>
          <p className="text-xs text-white/45">Precision crafted in India.</p>
        </div>
      </div>
    </footer>
  );
}
