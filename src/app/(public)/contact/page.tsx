import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { Faqs } from "@/components/marketing/faq";
import ContactForm from "@/components/contact/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get a free quote from ${site.name}. Call ${site.phone.display}, message us on WhatsApp, or send your project details — we reply within 24 hours.`,
  alternates: { canonical: "/contact" },
};

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  site.address.mapQuery
)}&output=embed`;

export default function ContactPage() {
  const channels = [
    {
      icon: Phone,
      label: "Call us",
      value: site.phone.display,
      href: site.phone.tel,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Chat with our team",
      href: site.phone.whatsapp,
      external: true,
    },
    {
      icon: Mail,
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
    },
  ];

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        eyebrow="Get in touch"
        title="Let's build something that lasts"
        subtitle="Share your dimensions and requirements. Our team will send a detailed, no-obligation quote within 24 hours."
      />

      <section className="bg-background py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-[1fr_1.1fr]">
          {/* Left — details + map */}
          <div className="flex flex-col gap-4">
            {channels.map(({ icon: Icon, label, value, href, external }) => (
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
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {label}
                  </span>
                  <span className="mt-0.5 block font-semibold text-foreground">
                    {value}
                  </span>
                </span>
              </a>
            ))}

            {/* Address + hours */}
            <div className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-foreground/[0.07]">
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary ring-1 ring-primary/10">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Visit us
                  </span>
                  <p className="mt-0.5 font-medium text-foreground">
                    {site.address.full}
                  </p>
                </div>
              </div>
              <div className="mt-5 flex items-start gap-4 border-t border-border pt-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary ring-1 ring-primary/10">
                  <Clock className="size-5" />
                </span>
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Hours
                  </span>
                  <ul className="mt-1 flex flex-col gap-0.5">
                    {site.hours.map((h) => (
                      <li
                        key={h.days}
                        className="flex justify-between gap-6 text-sm text-foreground"
                      >
                        <span className="text-muted-foreground">{h.days}</span>
                        <span className="font-medium">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-foreground/[0.07]">
              <iframe
                title={`Map to ${site.name}`}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full border-0"
              />
            </div>
          </div>

          {/* Right — form */}
          <div className="rounded-3xl bg-card p-6 shadow-md ring-1 ring-foreground/[0.07] sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Request a free quote
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Fields marked <span className="text-destructive">*</span> are
              required.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Faqs withJsonLd={false} className="border-t border-border" />
    </>
  );
}
