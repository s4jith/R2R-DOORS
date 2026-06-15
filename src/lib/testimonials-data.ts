/** Customer testimonials for the homepage trust section. */

export interface Testimonial {
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number; // 1–5
}

export const testimonials: Testimonial[] = [
  {
    name: "Rajesh Kumar",
    role: "Homeowner",
    location: "Whitefield, Bengaluru",
    quote:
      "The teak entrance door R2R built for us is a work of art. They measured twice, delivered on the promised date, and the fit is flawless. Three years on, not a single warp.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Architect, Studio Form",
    location: "Bengaluru",
    quote:
      "I specify R2R on every project now. The dimensional accuracy is genuinely ±0.5mm, the glass partitions arrived perfect, and their site team is meticulous. Rare to find that combination.",
    rating: 5,
  },
  {
    name: "Amit Patel",
    role: "Project Manager",
    location: "Meridian Office Park",
    quote:
      "40,000 sq.ft of partitions and entrance doors, delivered in six weeks with zero rework. Their coordination with our fit-out schedule was the smoothest part of the whole project.",
    rating: 5,
  },
  {
    name: "Sunita Reddy",
    role: "Interior Designer",
    location: "Sarjapur",
    quote:
      "Honest pricing and no surprises. The uPVC windows cut our client's road noise dramatically, and the energy savings were noticeable within the first summer.",
    rating: 5,
  },
  {
    name: "Mohammed Ali",
    role: "Facility Head",
    location: "Hosur",
    quote:
      "Security was non-negotiable for our data centre. R2R's fire-rated steel doors passed every audit on the first pass. Build quality you can feel the moment you open one.",
    rating: 5,
  },
];
