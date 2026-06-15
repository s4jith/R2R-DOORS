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
      <div className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl bg-card p-3 shadow-sm ring-1 ring-foreground/[0.07]">
        <div className="flex items-center gap-2 pl-2 text-sm font-medium text-muted-foreground">
          <SlidersHorizontal className="size-4" />
          <span className="hidden sm:inline">Filter</span>
        </div>
        <div className="flex flex-wrap gap-1 rounded-xl bg-muted p-1">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
              className={cn(
                "rounded-lg px-4 py-1.5 text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                category === cat
                  ? "bg-card text-primary shadow-sm ring-1 ring-foreground/[0.06]"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <p className="ml-auto pr-2 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            {filtered.length}
          </span>{" "}
          project{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.id} project={p} className="h-full" />
        ))}
      </div>
    </>
  );
}
