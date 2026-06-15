/**
 * Renders a JSON-LD structured-data block. Server-safe. `data` is any
 * schema.org object (LocalBusiness, Product, FAQPage, BreadcrumbList, …).
 *
 * dangerouslySetInnerHTML is required for ld+json; we serialize trusted,
 * server-built objects only (never raw user input).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
