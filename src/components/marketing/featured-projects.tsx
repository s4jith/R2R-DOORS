import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectCard from "@/components/project/project-card";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { projects } from "@/lib/projects-data";

/** Homepage preview of recent work → links through to the full /projects page. */
export function FeaturedProjects() {
  const featured = projects.slice(0, 6);

  return (
    <section
      id="projects"
      className="scroll-mt-16 border-y border-border bg-secondary/40 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="start"
            eyebrow="Our Work"
            title="Recently completed projects"
            subtitle="Residential, commercial, and industrial installations across India."
          />
          <Link
            href="/projects"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            View all projects
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>

        <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <RevealItem key={p.id}>
              <ProjectCard project={p} className="h-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
