/**
 * Static portfolio of completed installations. Mirrors the mock-product style
 * (placehold.co imagery) so the Projects pages render without a CMS/DB.
 * Consumed by /projects, /projects/[id], the homepage featured-projects strip,
 * and the sitemap.
 */

export type ProjectCategory = "Residential" | "Commercial" | "Industrial";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  location: string;
  year: number;
  summary: string;
  /** Longer narrative shown on the detail page. */
  description: string;
  image: string;
  /** Highlighted scope figures for the detail page. */
  stats: { label: string; value: string }[];
  /** Product types used — link back into the catalogue by category. */
  products: { name: string; category: "door" | "window" }[];
}

function img(label: string, hue = "165a9e") {
  return `https://placehold.co/1200x800/${hue}/ffffff?text=${encodeURIComponent(
    label
  )}`;
}

export const projects: Project[] = [
  {
    id: "skyline-residences",
    title: "Skyline Residences",
    category: "Residential",
    location: "Whitefield, Bengaluru",
    year: 2024,
    summary:
      "180 uPVC casement windows and balcony sliding doors across a 12-floor luxury apartment tower.",
    description:
      "A full-tower glazing package for a premium residential development. We supplied and installed energy-efficient uPVC casement windows with Low-E double glazing throughout, plus aluminium sliding doors for every balcony. Each unit was measured on site and manufactured to its exact opening to guarantee a flush, weather-tight fit on a tight handover schedule.",
    image: img("Skyline Residences"),
    stats: [
      { label: "Units glazed", value: "144" },
      { label: "Windows installed", value: "180+" },
      { label: "Timeline", value: "9 weeks" },
    ],
    products: [
      { name: "uPVC French Window", category: "window" },
      { name: "Aluminium Sliding Door", category: "door" },
    ],
  },
  {
    id: "lakeview-villa",
    title: "Lakeview Villa",
    category: "Residential",
    location: "Sarjapur, Bengaluru",
    year: 2024,
    summary:
      "Bespoke Grade-A teak main entrance with matching internal doors for a 5-bedroom lakeside villa.",
    description:
      "A craftsmanship-led residential commission. The owners wanted a statement teak entrance with deep-relief carved panels, complemented by hardwood casement windows that frame the lake view. Every door and window was hand-finished and fitted with concealed multi-point locking for security without compromising the clean lines.",
    image: img("Lakeview Villa", "0f3d6e"),
    stats: [
      { label: "Doors crafted", value: "18" },
      { label: "Material", value: "Grade-A Teak" },
      { label: "Warranty", value: "10 years" },
    ],
    products: [
      { name: "Classic Teak Panel Door", category: "door" },
      { name: "Hardwood Casement Window", category: "window" },
    ],
  },
  {
    id: "meridian-office-park",
    title: "Meridian Office Park",
    category: "Commercial",
    location: "Outer Ring Road, Bengaluru",
    year: 2023,
    summary:
      "Full-height glass partition system and entrance doors for a 40,000 sq.ft Grade-A office.",
    description:
      "An interiors fit-out for a corporate headquarters. We delivered frameless 12mm toughened glass partitions to divide collaborative and focus zones, paired with pivot glass entrance doors and acoustic-rated meeting-room glazing. The brief prioritised daylight, acoustic privacy, and a minimal, premium aesthetic.",
    image: img("Meridian Office Park", "1a6cb8"),
    stats: [
      { label: "Area fitted", value: "40,000 sq.ft" },
      { label: "Glass partitions", value: "120 m" },
      { label: "Timeline", value: "6 weeks" },
    ],
    products: [{ name: "Glass Partition Door", category: "door" }],
  },
  {
    id: "harbour-retail-mall",
    title: "Harbour Retail Mall",
    category: "Commercial",
    location: "Mangaluru",
    year: 2023,
    summary:
      "Coastal-grade anodised aluminium storefronts and louvred ventilation for a seafront mall.",
    description:
      "A retail development in a high-salinity coastal environment. We specified anodised aluminium throughout for corrosion resistance — large-span storefront glazing, automatic sliding entrances, and louvred ventilation windows for the service cores. Every section was engineered to withstand coastal wind loads and driving rain.",
    image: img("Harbour Retail Mall", "0f3d6e"),
    stats: [
      { label: "Storefronts", value: "32" },
      { label: "Finish", value: "Anodised Alu." },
      { label: "Climate", value: "Coastal-grade" },
    ],
    products: [
      { name: "Aluminium Sliding Door", category: "door" },
      { name: "Louvred Ventilation Window", category: "window" },
    ],
  },
  {
    id: "fortress-data-centre",
    title: "Fortress Data Centre",
    category: "Industrial",
    location: "Hosur",
    year: 2022,
    summary:
      "Fire-rated galvanised steel security doors and reinforced access points for a Tier-III data centre.",
    description:
      "A security-critical industrial project. We supplied fire-rated galvanised steel security doors with multi-point locking and anti-drill cylinders for every server hall and plant room, engineered to meet the facility's access-control and fire-compartmentation requirements without slowing operations.",
    image: img("Fortress Data Centre", "165a9e"),
    stats: [
      { label: "Security doors", value: "64" },
      { label: "Fire rating", value: "120 min" },
      { label: "Spec", value: "Tier-III" },
    ],
    products: [{ name: "Steel Security Door", category: "door" }],
  },
  {
    id: "greenfield-factory",
    title: "Greenfield Manufacturing Unit",
    category: "Industrial",
    location: "Tumakuru",
    year: 2022,
    summary:
      "WPC flush doors and ventilation glazing for a 100,000 sq.ft humidity-controlled production facility.",
    description:
      "A greenfield factory build with demanding environmental conditions. Wet-process areas required 100% waterproof, termite-proof WPC flush doors, while the production floor needed high-volume louvred ventilation. We delivered a complete door-and-window package on a phased construction schedule.",
    image: img("Greenfield Factory", "1a6cb8"),
    stats: [
      { label: "Area", value: "100,000 sq.ft" },
      { label: "Doors", value: "210" },
      { label: "Phases", value: "3" },
    ],
    products: [
      { name: "WPC Flush Door", category: "door" },
      { name: "Louvred Ventilation Window", category: "window" },
    ],
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export const projectCategories: ("All" | ProjectCategory)[] = [
  "All",
  "Residential",
  "Commercial",
  "Industrial",
];
