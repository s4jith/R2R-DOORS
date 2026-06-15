import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";
import ContactForm from "@/components/contact/contact-form";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/site";

/**
 * One-page contact section (anchor target for the section-mapped navbar).
 * Pairs the working lead form with the key contact channels from site config.
 */
export function ContactSection() {
  const channels = [
    { icon: Phone, label: site.phone.display, href: site.phone.tel },
    {
      icon: MessageCircle,
      label: "Chat on WhatsApp",
      href: site.phone.whatsapp,
      external: true,
    },
    { icon: Mail, label: site.email, href: `mailto:${site.email}` },
  ];

  return (
    <section
      id="contact"
      className="scroll-mt-16 border-t border-border bg-secondary/40 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Get in touch"
            title="Request a free quote"
            subtitle="Share your dimensions and requirements — we reply within 24 hours, no obligation."
            className="mb-14"
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Channels */}
          <Reveal direction="right" className="flex flex-col gap-4">
            {channels.map(({ icon: Icon, label, href, external }) => (
              <a
                key={label}
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-center gap-4 rounded-2xl bg-card p-5 shadow-sm ring-1 ring-foreground/[0.07] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary ring-1 ring-primary/10 transition-colors group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" />
                </span>
                <span className="font-semibold text-foreground">{label}</span>
              </a>
            ))}

            <div className="flex items-start gap-4 rounded-2xl bg-card p-5 shadow-sm ring-1 ring-foreground/[0.07]">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary ring-1 ring-primary/10">
                <MapPin className="size-5" />
              </span>
              <div>
                <p className="font-medium text-foreground">{site.address.full}</p>
                <Link
                  href="/contact"
                  className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  Full contact details &amp; map
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal
            direction="left"
            className="rounded-3xl bg-card p-6 shadow-md ring-1 ring-foreground/[0.07] sm:p-8"
          >
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
