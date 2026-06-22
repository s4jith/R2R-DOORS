import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, MapPin, Calendar, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { Reveal } from "@/components/motion/reveal";
import { getProjectById, projects } from "@/lib/projects-data";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      title: `${project.title} | ${site.shortName}`,
      description: project.summary,
      images: [project.image],
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  const more = projects.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <div className="bg-background text-foreground">
      {/* Hero image */}
      <section className="relative h-[42vh] min-h-[320px] w-full overflow-hidden bg-surface-illu sm:h-[52vh]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-[1240px] px-5 pb-8 sm:px-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Projects", href: "/projects" },
                { label: project.title },
              ]}
              className="mb-4 text-white/80 [&_a:hover]:text-white [&_span]:text-white"
            />
            <span className="inline-flex items-center rounded-[3px] border border-white/20 bg-black/30 px-3 py-1 font-plex text-[10px] uppercase tracking-[0.1em] text-white backdrop-blur-sm">
              {project.category}
            </span>
            <h1 className="mt-3 max-w-3xl font-archivo text-[clamp(30px,5vw,50px)] font-extrabold leading-[1.05] tracking-[-0.025em] text-white">
              {project.title}
            </h1>
            <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 font-plex text-[12px] tracking-[0.04em] text-white/85">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4" aria-hidden />
                {project.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4" aria-hidden />
                {project.year}
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_320px]">
          {/* Narrative */}
          <Reveal>
            <p className="text-[18px] font-medium leading-[1.6] text-foreground">
              {project.summary}
            </p>
            <p className="mt-5 leading-[1.65] text-ink-soft">
              {project.description}
            </p>

            <h2 className="mb-4 mt-10 font-archivo text-[20px] font-bold tracking-[-0.01em] text-foreground">
              Products used
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.products.map((pr) => (
                <Link
                  key={pr.name}
                  href={`/products?category=${pr.category}`}
                  className="group inline-flex items-center gap-2 rounded-[4px] border border-border bg-card px-4 py-2.5 text-[14px] font-medium text-foreground transition-colors hover:border-foreground"
                >
                  {pr.name}
                  <ArrowRight className="size-3.5 text-ink-mono transition-transform group-hover:translate-x-0.5 group-hover:text-brass" />
                </Link>
              ))}
            </div>

            <Link
              href="/projects"
              className="mt-10 inline-flex items-center gap-2 text-[14px] text-ink-soft transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Back to all projects
            </Link>
          </Reveal>

          {/* Sidebar: stats + CTA */}
          <aside className="lg:sticky lg:top-[92px] lg:self-start">
            <div className="rounded-[6px] border border-border bg-card p-6">
              <h2 className="font-plex text-[11px] uppercase tracking-[0.12em] text-brass">
                Project scope
              </h2>
              <dl className="mt-4 flex flex-col gap-4">
                {project.stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-baseline justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0"
                  >
                    <dt className="text-[14px] text-ink-soft">{s.label}</dt>
                    <dd className="font-archivo text-[18px] font-bold tracking-[-0.01em] text-foreground">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-4 overflow-hidden rounded-[6px] bg-paper-dark p-6 text-on-dark">
              <h3 className="font-archivo text-[18px] font-bold text-[#ffffff]">
                Have a similar project?
              </h3>
              <p className="mt-1.5 text-[14px] text-on-dark">
                Tell us your requirements — we&apos;ll quote within 24 hours.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-[4px] bg-[#ffffff] px-5 py-3 text-[14px] font-semibold text-paper-dark transition-colors hover:bg-white"
              >
                Get a quote
                <ArrowRight className="size-4" />
              </Link>
              <a
                href={site.phone.tel}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-[4px] border border-white/25 px-5 py-3 text-[14px] font-semibold text-[#ffffff] transition-colors hover:border-white/60"
              >
                <Phone className="size-4" />
                {site.phone.display}
              </a>
            </div>
          </aside>
        </div>

        {/* More projects */}
        {more.length > 0 && (
          <div className="mx-auto mt-20 max-w-[1240px] px-5 sm:px-8">
            <h2 className="mb-6 font-archivo text-[24px] font-bold tracking-[-0.01em] text-foreground">
              More projects
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}`}
                  className="group flex items-center gap-4 rounded-[6px] border border-border bg-card p-4 transition-colors hover:border-foreground"
                >
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-[4px] bg-surface-illu">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-archivo text-[15px] font-semibold text-foreground">
                      {p.title}
                    </p>
                    <p className="mt-0.5 truncate font-plex text-[11px] uppercase tracking-[0.06em] text-ink-mono">
                      {p.category} · {p.location}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
