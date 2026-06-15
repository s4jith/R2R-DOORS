import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import type { Project } from "@/lib/projects-data";
import { cn } from "@/lib/utils";

/** Portfolio card — used by the projects grid and the homepage preview strip. */
export default function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className={cn(
        "group block rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <article className="relative h-full overflow-hidden rounded-3xl bg-card shadow-sm ring-1 ring-foreground/[0.07] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="relative h-56 overflow-hidden bg-muted">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            unoptimized
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <span className="absolute left-4 top-4 glass rounded-full px-3 py-1 text-xs font-semibold text-foreground shadow-sm ring-1 ring-white/40">
            {project.category}
          </span>
          <div className="absolute inset-x-4 bottom-4 text-white">
            <h3 className="text-lg font-bold tracking-tight">{project.title}</h3>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/80">
              <MapPin className="size-3.5" aria-hidden />
              {project.location} · {project.year}
            </p>
          </div>
        </div>
        <div className="p-5">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.summary}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            View project
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </article>
    </Link>
  );
}
