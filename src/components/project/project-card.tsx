import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import type { Project } from "@/lib/projects-data";
import { cn } from "@/lib/utils";

/** Portfolio card — used by the projects grid. */
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
        "group block overflow-hidden rounded-[6px] border border-border bg-card transition-colors hover:border-foreground",
        className
      )}
    >
      <div className="relative h-56 overflow-hidden border-b border-border bg-surface-illu">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          unoptimized
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded-[3px] border border-white/20 bg-black/30 px-2.5 py-1 font-plex text-[10px] uppercase tracking-[0.1em] text-white backdrop-blur-sm">
          {project.category}
        </span>
        <div className="absolute inset-x-4 bottom-4 text-white">
          <h3 className="font-archivo text-[19px] font-bold tracking-[-0.01em]">
            {project.title}
          </h3>
          <p className="mt-1 flex items-center gap-1.5 font-plex text-[11px] tracking-[0.04em] text-white/80">
            <MapPin className="size-3.5" aria-hidden />
            {project.location} · {project.year}
          </p>
        </div>
      </div>
      <div className="p-[22px]">
        <p className="text-[14px] leading-[1.55] text-ink-soft">{project.summary}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brass">
          View project
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
