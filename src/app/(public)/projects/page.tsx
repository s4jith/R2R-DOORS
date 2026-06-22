import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { StatsBand } from "@/components/marketing/stats-band";
import { ClosingCta } from "@/components/marketing/closing-cta";
import ProjectsBrowser from "./projects-browser";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore completed door & window installations by R2R — residential, commercial, and industrial projects across India, built to exact spec.",
  alternates: { canonical: "/projects" },
};

const projectStats = [
  { value: "500+", label: "Projects Delivered" },
  { value: "6", label: "States Served" },
  { value: "1M+", label: "Sq.ft Glazed" },
  { value: "98%", label: "On-Time Handover" },
];

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        eyebrow="Portfolio"
        title="Our Work"
        subtitle="From bespoke residential entrances to large-scale commercial and industrial glazing — a track record built on precision."
        actions={
          <>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-[4px] bg-primary px-6 py-[13px] text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-paper-dark-2"
            >
              Start your project
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href={site.phone.tel}
              className="inline-flex items-center gap-2 rounded-[4px] border border-input px-6 py-[13px] text-[15px] font-semibold text-foreground transition-colors hover:border-foreground"
            >
              <Phone className="size-4 text-brass" />
              {site.phone.display}
            </a>
          </>
        }
      />

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <ProjectsBrowser />
        </div>
      </section>

      <StatsBand stats={projectStats} />
      <ClosingCta />
    </>
  );
}
