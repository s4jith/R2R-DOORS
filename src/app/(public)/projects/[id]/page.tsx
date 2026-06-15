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
    <>
      {/* Hero image */}
      <section className="relative h-[42vh] min-h-[320px] w-full overflow-hidden bg-muted sm:h-[52vh]">
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
          <div className="mx-auto max-w-7xl px-6 pb-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Projects", href: "/projects" },
                { label: project.title },
              ]}
              className="mb-4 text-white/80 [&_a:hover]:text-white [&_span]:text-white"
            />
            <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              {project.category}
            </span>
            <h1 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-white/80">
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

      <section className="bg-background py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-[1fr_320px]">
          {/* Narrative */}
          <Reveal>
            <p className="text-lg font-medium leading-relaxed text-foreground">
              {project.summary}
            </p>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            <h2 className="mt-10 mb-4 text-xl font-bold tracking-tight text-foreground">
              Products used
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.products.map((pr) => (
                <Link
                  key={pr.name}
                  href={`/products?category=${pr.category}`}
                  className="group inline-flex items-center gap-2 rounded-xl bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm ring-1 ring-foreground/[0.07] transition-colors hover:text-primary"
                >
                  {pr.name}
                  <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </Link>
              ))}
            </div>

            <Link
              href="/projects"
              className="mt-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Back to all projects
            </Link>
          </Reveal>

          {/* Sidebar: stats + CTA */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl bg-card p-6 shadow-sm ring-1 ring-foreground/[0.07]">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">
                Project scope
              </h2>
              <dl className="mt-4 flex flex-col gap-4">
                {project.stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-baseline justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0"
                  >
                    <dt className="text-sm text-muted-foreground">{s.label}</dt>
                    <dd className="text-lg font-bold tracking-tight text-foreground">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-4 overflow-hidden rounded-3xl bg-gradient-brand-deep p-6 text-white shadow-md">
              <h3 className="text-lg font-bold">Have a similar project?</h3>
              <p className="mt-1.5 text-sm text-white/70">
                Tell us your requirements — we&apos;ll quote within 24 hours.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-primary shadow-lg transition-transform active:translate-y-px"
              >
                Get a Quote
                <ArrowRight className="size-4" />
              </Link>
              <a
                href={site.phone.tel}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Phone className="size-4" />
                {site.phone.display}
              </a>
            </div>
          </aside>
        </div>

        {/* More projects */}
        {more.length > 0 && (
          <div className="mx-auto mt-20 max-w-7xl px-6">
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
              More projects
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}`}
                  className="group flex items-center gap-4 rounded-2xl bg-card p-4 shadow-sm ring-1 ring-foreground/[0.07] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-muted">
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
                    <p className="truncate text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                      {p.title}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {p.category} · {p.location}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
