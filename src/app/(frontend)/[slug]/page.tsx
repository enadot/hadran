import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { getPayloadClient } from '@/lib/payload'
import { breadcrumbSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { RichText } from '@/components/RichText'
import { LivePreviewRefresh } from '@/components/LivePreviewRefresh'

export const revalidate = 300

type Props = { params: Promise<{ slug: string }> }

// דפים דינמיים מקולקציית Pages: אודות, נגישות, תקנון, פרטיות וכו'
const RESERVED = new Set(['kashrut', 'stores', 'devices', 'magazine', 'user-guide', 'contact', 'authors', 'admin', 'api'])

async function getPage(slug: string) {
  if (RESERVED.has(slug)) return null
  // ב-Draft Mode (Live Preview באדמין) נטענת הגרסה האחרונה כולל טיוטות
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1, draft })
  return res.docs[0] || null
}

export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: 'pages', limit: 100, select: { slug: true } })
    return res.docs.filter((d) => !RESERVED.has(d.slug)).map((d) => ({ slug: d.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug).catch(() => null)
  if (!page) return {}
  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription || page.subtitle || undefined,
    alternates: { canonical: `/${page.slug}` },
  }
}

export default async function GenericPage({ params }: Props) {
  const { slug } = await params
  const { isEnabled: draft } = await draftMode()
  const page = await getPage(slug).catch(() => null)
  if (!page) notFound()

  return (
    <>
      {draft && <LivePreviewRefresh />}
      <JsonLd data={breadcrumbSchema([{ name: 'ראשי', path: '/' }, { name: page.title, path: `/${page.slug}` }])} />
      <header className="px-5 pb-8 pt-16 sm:px-8 sm:pt-24">
        <div className="mx-auto flex max-w-[760px] flex-col gap-5">
          <h1 className="m-0 font-display text-[40px] font-black leading-[1.02] tracking-[-1px] text-ink sm:text-[64px] sm:tracking-[-1.5px]">
            {page.title}
          </h1>
          {page.subtitle && <p className="m-0 text-lg leading-relaxed text-body">{page.subtitle}</p>}
        </div>
      </header>
      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-[760px]">
          {page.content ? <RichText data={page.content} /> : <p className="text-charcoal">התוכן יעודכן בקרוב.</p>}
        </div>
      </section>
    </>
  )
}
