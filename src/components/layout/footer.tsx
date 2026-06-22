import Link from "next/link";
import R2RMark from "@/components/brand/r2r-mark";
import { site } from "@/lib/site";

const footProducts = [
  { label: "Entrance Doors", href: "/products?category=door" },
  { label: "Security Doors", href: "/products?category=door" },
  { label: "Windows", href: "/products?category=window" },
  { label: "Glass Partitions", href: "/products?category=door" },
  { label: "Custom Joinery", href: "/products" },
];

const footCompany = [
  { label: "Why R2R", href: "/#about" },
  { label: "Selected Work", href: "/#work" },
  { label: "Process", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

const linkCls =
  "block py-1.5 text-[14.5px] text-on-dark transition-colors hover:text-[#ffffff]";
const colLabel =
  "mb-5 font-plex text-[10.5px] uppercase tracking-[0.12em] text-on-dark-faint";

export default function Footer() {
  return (
    <footer className="bg-paper-dark text-on-dark">
      <div className="mx-auto max-w-[1240px] px-5 pt-[72px] sm:px-8">
        <div className="grid grid-cols-1 gap-12 pb-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <R2RMark tone="light" size={28} />
            <p className="mt-[22px] max-w-[280px] text-[14.5px] leading-[1.6] text-on-dark-dim">
              Custom-built doors &amp; windows engineered for endurance. Made to
              spec, delivered across India.
            </p>
          </div>

          {/* Products */}
          <div>
            <div className={colLabel}>Products</div>
            {footProducts.map((p) => (
              <Link key={p.label} href={p.href} className={linkCls}>
                {p.label}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <div className={colLabel}>Company</div>
            {footCompany.map((c) => (
              <Link key={c.label} href={c.href} className={linkCls}>
                {c.label}
              </Link>
            ))}
            <Link href="/admin" className={linkCls}>
              Admin Portal
            </Link>
          </div>

          {/* Contact */}
          <div>
            <div className={colLabel}>Contact</div>
            <a href={site.phone.tel} className={linkCls}>
              {site.phone.display}
            </a>
            <a href={`mailto:${site.email}`} className={linkCls}>
              {site.email}
            </a>
            <p className="mt-3 text-[14px] leading-[1.55] text-on-dark-dim">
              {site.address.line1}
              <br />
              {site.address.city} — 560&nbsp;058
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 font-plex text-[11px] tracking-[0.05em] text-on-dark-faint sm:flex-row">
          <span>© {new Date().getFullYear()} R2R DOORS &amp; WINDOWS</span>
          <div className="flex gap-[22px]">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-dark-dim transition-colors hover:text-[#ffffff]"
              >
                {s.label.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
