import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getPayloadClient, SERVER_URL } from '@/lib/payload'
import { breadcrumbSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { ArticleCard } from '@/components/magazine/ArticleCard'
import { toCardData } from '@/lib/articles'

export const revalidate = 300

type Props = { params: Promise<{ slug: string }> }

async function getAuthor(slug: string) {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'authors', where: { slug: { equals: slug } }, limit: 1 })
  return res.docs[0] || null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthor(slug).catch(() => null)
  if (!author) return {}
  return {
    title: `${author.name} — פרופיל מחבר`,
    description: author.bio || `מאמרים מאת ${author.name} במגזין הדרן עלך`,
    alternates: { canonical: `/authors/${author.slug}` },
  }
}

// עמוד פרופיל מחבר — תשתית E-E-A-T: ניסיון, הסמכות והמאמרים של הכותב
export default async function AuthorPage({ params }: Props) {
  const { slug } = await params
  const author = await getAuthor(slug).catch(() => null)
  if (!author) notFound()

  const payload = await getPayloadClient()
  const articles = await payload.find({
    collection: 'articles',
    where: { and: [{ author: { equals: author.id } }, { _status: { equals: 'published' } }] },
    sort: '-publishedAt',
    limit: 24,
  })

  return (
    <>
      <JsonLd
        data={[
          {
            '@type': 'Person',
            name: author.name,
            url: `${SERVER_URL}/authors/${author.slug}`,
            ...(author.role ? { jobTitle: author.role } : {}),
            ...(author.bio ? { description: author.bio } : {}),
            worksFor: { '@id': `${SERVER_URL}/#organization` },
          },
          breadcrumbSchema([
            { name: 'ראשי', path: '/' },
            { name: 'הדרן עלך — המגזין', path: '/magazine' },
            { name: author.name, path: `/authors/${author.slug}` },
          ]),
        ]}
      />

      <header className="px-5 pb-12 pt-16 sm:px-8">
        <div className="mx-auto flex max-w-[860px] flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
          <span aria-hidden="true" className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-bl from-brand-orange to-accent text-4xl font-bold text-white">
            {author.name.charAt(0)}
          </span>
          <div className="flex flex-col gap-2">
            <h1 className="m-0 font-display text-[40px] font-black leading-none tracking-[-1px] text-ink sm:text-[56px]">
              {author.name}
            </h1>
            {author.role && <p className="m-0 text-lg font-semibold text-charcoal">{author.role}</p>}
            {author.bio && <p className="m-0 max-w-[560px] text-base leading-7 text-body">{author.bio}</p>}
          </div>
        </div>
      </header>

      {Boolean(author.credentials?.length) && (
        <section aria-labelledby="creds-title" className="px-5 pb-12 sm:px-8">
          <div className="mx-auto max-w-[860px] rounded-2xl border border-ink/10 bg-card p-6">
            <h2 id="creds-title" className="m-0 mb-4 font-display text-xl font-black text-ink">ניסיון והסמכות</h2>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[15px] text-body">
              {author.credentials!.map((c) => (
                <li key={c.id} className="flex items-baseline gap-3">
                  <span aria-hidden="true" className="font-bold text-brand-green-dark">✓</span>
                  {c.item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-label="מאמרים מאת המחבר" className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="mb-8 mt-0 font-display text-[28px] font-black tracking-[-0.5px] text-ink">
            מאמרים מאת {author.name}
          </h2>
          {articles.docs.length ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {articles.docs.map((a) => (
                <ArticleCard key={a.id} article={toCardData(a)} />
              ))}
            </div>
          ) : (
            <p className="text-charcoal">עדיין אין מאמרים.</p>
          )}
        </div>
      </section>
    </>
  )
}
