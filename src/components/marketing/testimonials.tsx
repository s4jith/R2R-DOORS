import { Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { testimonials } from "@/lib/testimonials-data";

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < rating
              ? "size-4 fill-warning text-warning"
              : "size-4 text-muted-foreground/30"
          }
          aria-hidden
        />
      ))}
    </div>
  );
}

/** Customer testimonials — responsive masonry-ish grid with star ratings. */
export function Testimonials() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="Loved by homeowners, architects & builders"
            subtitle="Five hundred projects. The same obsessive attention to detail on every one."
            className="mb-14"
          />
        </Reveal>
        <RevealGroup className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <RevealItem key={t.name}>
              <figure className="relative flex h-full flex-col rounded-3xl bg-card p-7 shadow-sm ring-1 ring-foreground/[0.07]">
                <Quote
                  className="absolute right-6 top-6 size-8 text-primary/10"
                  aria-hidden
                />
                <Stars rating={t.rating} />
                <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-foreground/85">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-sm font-bold text-primary-foreground">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-foreground">
                      {t.name}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {t.role} · {t.location}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
