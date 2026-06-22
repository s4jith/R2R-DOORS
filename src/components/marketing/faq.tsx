import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
    <section className={cn("bg-background py-[72px] sm:py-[100px]", className)}>
      <div className="mx-auto max-w-[760px] px-5 sm:px-8">
        {heading && (
          <div className="mb-12">
            <div className="mb-4 font-plex text-[11.5px] uppercase tracking-[0.16em] text-brass">
              Answers
            </div>
            <h2 className="font-archivo text-[clamp(30px,4vw,42px)] font-bold leading-[1.04] tracking-[-0.02em]">
              Questions, answered
            </h2>
          </div>
        )}
        <Accordion type="single" collapsible className="border-t border-border">
          {items.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-b border-border"
            >
              <AccordionTrigger className="py-6 font-archivo text-[18px] font-semibold tracking-[-0.01em] text-foreground hover:no-underline">
                {f.question}
              </AccordionTrigger>
              <AccordionContent className="pb-[26px] text-[15.5px] leading-[1.65] text-ink-soft">
                {f.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      {withJsonLd && <JsonLd data={jsonLd} />}
    </section>
  );
}
