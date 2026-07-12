// מרנדר JSON-LD (Schema.org) — ליבת אסטרטגיית ה-GEO של האתר
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const payload = Array.isArray(data)
    ? data.map((d) => ({ '@context': 'https://schema.org', ...d }))
    : { '@context': 'https://schema.org', ...data }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload).replace(/</g, '\\u003c') }}
    />
  )
}
