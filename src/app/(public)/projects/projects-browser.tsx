"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import ProjectCard from "@/components/project/project-card";
import { projects, projectCategories } from "@/lib/projects-data";
import { cn } from "@/lib/utils";

/** Client-side category filter over the static project portfolio. */
export default function ProjectsBrowser() {
  const [category, setCategory] = useState<(typeof projectCategories)[number]>(
    "All"
  );

  const filtered = useMemo(
    () =>
      category === "All"
        ? projects
        : projects.filter((p) => p.category === category),
    [category]
  );

  return (
    <>
      {/* Filter bar */}
      <div className="mb-8 flex flex-wrap items-center gap-3 rounded-[6px] border border-border bg-card p-3">
        <div className="flex items-center gap-2 pl-2 font-plex text-[11px] uppercase tracking-[0.08em] text-ink-mono">
          <SlidersHorizontal className="size-4" />
          <span className="hidden sm:inline">Filter</span>
        </div>
        <div className="flex flex-wrap gap-1.5 rounded-[6px] bg-secondary p-1.5">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
              className={cn(
                "rounded-[4px] px-4 py-[7px] text-[14px] font-semibold transition-colors outline-none",
                category === cat
                  ? "bg-primary text-primary-foreground"
                  : "text-ink-soft hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <p className="ml-auto pr-2 font-plex text-[12px] tracking-[0.04em] text-ink-mono">
          <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
          project{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.id} project={p} className="h-full" />
        ))}
      </div>
    </>
  );
}
