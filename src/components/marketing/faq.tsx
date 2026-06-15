import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { faqs as defaultFaqs, type Faq } from "@/lib/faq-data";
import { cn } from "@/lib/utils";

/**
 * FAQ accordion (keyboard-native via radix). Emits FAQPage JSON-LD when
 * `withJsonLd` is set — render it on only ONE page per crawl to avoid
 * duplicate structured data (home owns it; contact passes withJsonLd={false}).
 */
export function Faqs({
  items = defaultFaqs,
  heading = true,
  withJsonLd = true,
  className,
}: {
  items?: Faq[];
  heading?: boolean;
  withJsonLd?: boolean;
  className?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section className={cn("bg-background py-20 sm:py-24", className)}>
      <div className="mx-auto max-w-3xl px-6">
        {heading && (
          <SectionHeading
            eyebrow="FAQ"
            title="Questions, answered"
            subtitle="Everything you need to know before you order. Still unsure? Talk to us."
            className="mb-12"
          />
        )}
        <Reveal>
          <Accordion type="single" collapsible className="gap-1">
            {items.map((f, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-2xl border border-border bg-card px-5 ring-1 ring-foreground/[0.04]"
              >
                <AccordionTrigger className="py-4 text-base font-semibold text-foreground hover:no-underline">
                  {f.question}
                </AccordionTrigger>
                <AccordionContent className="text-[0.95rem] leading-relaxed text-muted-foreground">
                  {f.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
      {withJsonLd && <JsonLd data={jsonLd} />}
    </section>
  );
}
