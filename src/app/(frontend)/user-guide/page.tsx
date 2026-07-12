import type { Metadata } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { breadcrumbSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { ArticleCard } from '@/components/magazine/ArticleCard'
import { toCardData } from '@/lib/articles'
import { LeadSection } from '@/components/sections/LeadSection'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'מדריך שימוש — מדריכים ותמיכה למשתמשי הדרן',
  description:
    'מדריכים מעשיים למשתמשי הדרן: גיבוי וואטסאפ, שחזור תמונות, שדרוג מכשיר ושמירה על ההגנה. תמיכה מלאה בעברית, צעד אחר צעד.',
}

export default async function UserGuidePage() {
  let guides: Awaited<ReturnType<typeof fetchGuides>> = []
  try {
    guides = await fetchGuides()
  } catch {
    guides = []
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'ראשי', path: '/' }, { name: 'מדריך שימוש', path: '/user-guide' }])} />
      <header className="px-5 pb-10 pt-16 text-center sm:px-8 sm:pt-24">
        <div className="mx-auto flex max-w-[860px] flex-col items-center gap-6">
          <span className="rounded-full border border-accent/35 px-5 py-2 text-sm font-bold text-accent">
            תמיכה ומדריכים
          </span>
          <h1 className="m-0 font-display text-[44px] font-black leading-none tracking-[-1px] text-ink sm:text-[80px] sm:tracking-[-1.8px]">
            מדריך שימוש
          </h1>
          <p className="m-0 max-w-[560px] text-lg leading-relaxed text-body">
            כל מה שצריך לדעת על המכשיר המוגן שלכם — צעד אחר צעד, בגובה העיניים: גיבוי, שחזור, שדרוג ושמירה על
            ההגנה.
          </p>
        </div>
      </header>

      <section aria-label="מדריכים" className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-[1280px]">
          {guides.length ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {guides.map((g) => (
                <ArticleCard key={g.id} article={toCardData(g)} />
              ))}
            </div>
          ) : (
            <p className="text-center text-charcoal">המדריכים הראשונים בדרך — בינתיים מוזמנים לפנות למוקד השירות.</p>
          )}
        </div>
      </section>

      <LeadSection />
    </>
  )
}

async function fetchGuides() {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'articles',
    where: {
      and: [
        { _status: { equals: 'published' } },
        { or: [{ category: { equals: 'guides' } }, { isGuide: { equals: true } }] },
      ],
    },
    sort: '-publishedAt',
    limit: 50,
  })
  return res.docs
}
