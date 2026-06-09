import { CheckCircle2, Target, Eye, Users, Award, Hammer } from "lucide-react";

const milestones = [
  { year: "2008", event: "Founded in Bengaluru with a single manufacturing unit." },
  { year: "2012", event: "Expanded to 3 production lines; crossed 1,000 installations." },
  { year: "2016", event: "Launched the steel security door range and custom glazing division." },
  { year: "2020", event: "ISO 9001:2015 certification received after independent audit." },
  { year: "2024", event: "Opened second facility; crossed ₹10 Cr annual revenue." },
];

const values = [
  {
    icon: Hammer,
    title: "Precision Craftsmanship",
    description:
      "Every cut, joint, and finish is measured against tolerances of ±0.5mm. We refuse to compromise on dimensional accuracy.",
  },
  {
    icon: CheckCircle2,
    title: "Quality Without Negotiation",
    description:
      "12-point QC inspection on every product before dispatch. If it doesn't pass, it doesn't ship.",
  },
  {
    icon: Users,
    title: "Customer Partnership",
    description:
      "We work alongside architects, contractors, and homeowners to understand requirements before drawing a single design.",
  },
  {
    icon: Award,
    title: "Accountability",
    description:
      "Our 10-year structural warranty isn't a marketing line — it's backed by a dedicated after-sales team and documented service records.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
              Est. 2008 · Bengaluru, India
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-foreground leading-tight mb-6">
              Built on Precision.<br />
              <span className="text-primary">Grown on Trust.</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed text-lg mb-4">
              R2R Doors began as a small workshop with a single premise: every door
              deserves to be measured twice, cut once, and finished for a lifetime.
              Sixteen years and 500+ projects later, that philosophy still drives
              every decision we make.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From bespoke residential entrances to industrial-grade commercial
              partitions, we bring the same obsessive attention to detail — backed
              by rigorous material selection, in-house manufacturing, and a team that
              takes immense pride in what it builds.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "500+", label: "Projects Completed" },
              { value: "15+", label: "Years of Experience" },
              { value: "8", label: "Product Categories" },
              { value: "10yr", label: "Structural Warranty" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="bg-background rounded-2xl p-6 ring-1 ring-border text-center"
              >
                <p className="text-3xl font-extrabold text-primary">{value}</p>
                <p className="text-sm text-muted-foreground mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-background py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-primary rounded-2xl p-8 text-white">
            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center mb-5">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
            <p className="text-blue-100 leading-relaxed">
              To deliver precision-engineered doors and windows that protect,
              beautify, and endure — at pricing that reflects the true value of
              quality workmanship, not inflated margins.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 ring-1 ring-border shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <Eye className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              To become India&apos;s most trusted name in custom door and window
              manufacturing — recognised for engineering integrity, sustainable
              materials, and a customer experience that turns first-time buyers
              into lifelong partners.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              What We Stand For
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Four principles that guide every product, every project, every day.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex gap-4 p-6 rounded-xl ring-1 ring-border bg-background hover:bg-white hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-background py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Our Journey
            </h2>
            <p className="text-muted-foreground">
              Milestones that shaped R2R Doors.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-[72px] top-0 bottom-0 w-0.5 bg-border md:left-1/2" />
            <div className="flex flex-col gap-8">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`flex gap-6 items-start md:w-1/2 ${
                    i % 2 === 0 ? "md:ml-auto md:pl-8 md:pr-0" : "md:mr-auto md:pr-8 md:flex-row-reverse md:text-right"
                  }`}
                >
                  <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-sm">
                    <span className="text-white text-xs font-bold">{m.year}</span>
                  </div>
                  <div className="bg-white rounded-xl p-4 ring-1 ring-border shadow-sm flex-1">
                    <p className="text-sm text-foreground font-medium leading-relaxed">
                      {m.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
