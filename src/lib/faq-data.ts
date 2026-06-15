/**
 * Frequently asked questions. Reused by the homepage FAQ section, the Contact
 * page, and the FAQPage JSON-LD structured data.
 */

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "Do you manufacture to custom sizes?",
    answer:
      "Yes — every door and window is built to your exact opening. There are no standard sizes. Share your measurements or book a free on-site measure and we cut to ±0.5mm tolerance.",
  },
  {
    question: "What materials do you work with?",
    answer:
      "Grade-A teak and engineered hardwood, galvanised steel, uPVC with double glazing, aluminium alloy, WPC, and toughened glass. We recommend the right material for your climate, budget, and security needs.",
  },
  {
    question: "How long does production and delivery take?",
    answer:
      "Most orders move from production to delivery in 7–14 working days across India, with insured freight. Large commercial projects are scheduled in phases to match your construction timeline.",
  },
  {
    question: "Do you provide installation?",
    answer:
      "Yes. Certified installation teams handle fitting, alignment, and sealing on every project. Workmanship is covered, and the product carries a 10-year structural warranty against manufacturing defects.",
  },
  {
    question: "How is pricing calculated?",
    answer:
      "Pricing is per square foot of the finished opening, with direct factory rates and no middlemen. Use the price calculator on any product page for an instant estimate, or request a detailed written quote.",
  },
  {
    question: "Are your products energy-efficient and weatherproof?",
    answer:
      "Our uPVC and aluminium systems use thermal-break technology and Low-E double glazing for insulation, UV protection, and up to 40 dB sound reduction. Coastal-grade anodised finishes resist corrosion in high-salinity environments.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We are based in Bengaluru and serve residential, commercial, and industrial clients across India. Insured freight means we can deliver and install well beyond Karnataka.",
  },
];
