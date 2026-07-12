import type { Metadata } from 'next'
import Link from 'next/link'

import { getPayloadClient } from '@/lib/payload'
import { toCardData } from '@/lib/articles'
import { breadcrumbSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { MagazineGrid } from '@/components/magazine/MagazineGrid'
import { NewsletterBand } from '@/components/sections/NewsletterBand'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'הדרן עלך — המגזין של הדרן',
  description:
    'מאמרים, מדריכים וחדשות מעולם הטכנולוגיה הכשרה: איך עובדת הגנה צרובה בליבה, מה מאשרת ועדת הרבנים, וסיפורי משפחות שעברו לשקט דיגיטלי.',
}

export default async function MagazinePage() {
  let docs: Awaited<ReturnType<typeof fetchArticles>> = []
  try {
    docs = await fetchArticles()
  } catch {
    docs = []
  }

  const featured = docs.find((d) => d.isFeatured) || docs[0]
  const rest = docs.filter((d) => d !== featured)

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'ראשי', path: '/' }, { name: 'הדרן עלך — המגזין', path: '/magazine' }])} />

      <header className="bg-[radial-gradient(70%_110%_at_22%_-20%,rgba(244,168,160,0.45)_0%,rgba(255,106,61,0.14)_45%,rgba(249,247,243,0)_75%)] px-5 pb-14 pt-16 sm:px-8 sm:pt-[88px]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-5">
          <span className="self-start rounded-full border border-accent/35 px-5 py-2 text-sm font-bold text-accent">
            המגזין של הדרן
          </span>
          <h1 className="m-0 font-display text-[56px] font-black leading-[0.98] tracking-[-1.2px] text-ink sm:text-[96px] sm:tracking-[-2px]">
            הדרן עלך<span className="text-accent">.</span>
          </h1>
          <p className="m-0 max-w-[620px] text-lg leading-relaxed text-body">
            כמו בסיום מסכת — חוזרים אליך שוב ושוב. מאמרים, מדריכים וחדשות מעולם הטכנולוגיה הכשרה.
          </p>
        </div>
      </header>

      {featured && (
        <section aria-label="כתבת השער" className="px-5 pb-16 sm:px-8">
          <div className="mx-auto max-w-[1280px]">
            <Link
              href={`/magazine/${featured.slug}`}
              className="grid overflow-hidden rounded-2xl bg-dark text-on-dark transition-shadow hover:shadow-[0_24px_60px_rgba(32,32,32,0.2)] lg:grid-cols-[1.15fr_1fr]"
            >
              <div className="flex flex-col items-start gap-5 p-8 sm:p-13 lg:p-[52px]">
                <span className="rounded-full bg-glow/16 px-4 py-1.5 text-xs font-bold text-glow">כתבת השער</span>
                <h2 className="m-0 font-display text-[32px] font-black leading-[1.06] tracking-[-0.7px] text-on-dark sm:text-[48px] sm:leading-[1.04] sm:tracking-[-1px]">
                  {featured.title}
                </h2>
                <p className="m-0 text-base leading-relaxed text-on-dark/70">{featured.excerpt}</p>
                <div className="mt-auto flex items-center gap-3.5 text-[13px] text-on-dark/55">
                  {featured.hebrewDate && <span className="font-mono">{featured.hebrewDate}</span>}
                  {featured.hebrewDate && featured.readingTime && <span>·</span>}
                  {featured.readingTime && <span>{featured.readingTime} קריאה</span>}
                </div>
                <span className="text-sm font-bold text-glow">לקריאת הכתבה ←</span>
              </div>
              <div className="flex min-h-[240px] items-center justify-center bg-[repeating-linear-gradient(45deg,#2b2b2b_0_12px,#242424_12px_24px)] lg:min-h-[380px]">
                {typeof featured.coverImage === 'object' && featured.coverImage?.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={featured.coverImage.url} alt={featured.coverImage.alt || ''} className="h-full w-full object-cover" />
                ) : (
                  <span className="font-mono text-xs text-on-dark/40">{featured.coverLabel || 'תמונת שער'}</span>
                )}
              </div>
            </Link>
          </div>
        </section>
      )}

      <section aria-label="כל הכתבות" className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-[1280px]">
          {rest.length || featured ? (
            <MagazineGrid articles={rest.map(toCardData)} />
          ) : (
            <p className="text-center text-charcoal">המגזין בבנייה — כתבות ראשונות בדרך.</p>
          )}
        </div>
      </section>

      <NewsletterBand />
    </>
  )
}

async function fetchArticles() {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'articles',
    where: { _status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 50,
  })
  return res.docs
}
