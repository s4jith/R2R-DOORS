/**
 * Central source of truth for company NAP (name, address, phone), contact
 * channels, and social links. Imported by the navbar, footer, contact page,
 * WhatsApp float, and JSON-LD structured data so the business details live in
 * exactly one place. Update here, propagates everywhere.
 */

const phoneDisplay = "+91 98765 43210";
const phoneE164 = "+919876543210"; // tel: / wa.me form (no spaces, leading +)

export const site = {
  name: "R2R Doors & Windows",
  shortName: "R2R Doors",
  tagline: "Precision doors. Perfect fit.",
  description:
    "Custom-built doors & windows engineered for endurance. Premium materials, exact dimensions, and honest factory-direct pricing across India.",
  /** Used for metadataBase, canonical URLs, OG and JSON-LD. */
  url: "https://r2rdoors.com",
  email: "info@r2rdoors.com",
  phone: {
    display: phoneDisplay,
    e164: phoneE164,
    tel: `tel:${phoneE164}`,
    whatsapp: `https://wa.me/${phoneE164.replace("+", "")}`,
  },
  address: {
    line1: "42, Industrial Estate, Phase II",
    city: "Bengaluru",
    region: "Karnataka",
    postalCode: "560058",
    country: "IN",
    /** Single-line form for compact display. */
    full: "42, Industrial Estate, Phase II, Bengaluru — 560 058",
    /** Google Maps embed query (place search). */
    mapQuery: "Industrial Estate Phase II, Peenya, Bengaluru",
  },
  hours: [
    { days: "Mon – Sat", time: "9:00 AM – 7:00 PM" },
    { days: "Sunday", time: "By appointment" },
  ],
  founded: 2008,
  socials: [
    { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
    { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  ],
} as const;

export type Site = typeof site;
