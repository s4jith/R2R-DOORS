import Link from "next/link";
import { DoorOpen, Phone, Mail, MapPin } from "lucide-react";

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
    <footer className="bg-[#0f2744] text-white">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <DoorOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                R2R <span className="text-blue-300">DOORS</span>
              </span>
            </div>
            <p className="text-sm text-blue-200 leading-relaxed max-w-sm mb-6">
              Engineering precision doors and windows since 2008. We combine
              traditional craftsmanship with modern materials to deliver
              products that last a lifetime.
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                +91 98765 43210
              </a>
              <a
                href="mailto:info@r2rdoors.com"
                className="flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                info@r2rdoors.com
              </a>
              <div className="flex items-start gap-2 text-sm text-blue-200">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                42, Industrial Estate, Phase II, Bengaluru — 560 058
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                {section}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-blue-200 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-blue-300">
            &copy; {new Date().getFullYear()} R2R Doors. All rights reserved.
          </p>
          <p className="text-xs text-blue-400">
            Precision crafted in India.
          </p>
        </div>
      </div>
    </footer>
  );
}
