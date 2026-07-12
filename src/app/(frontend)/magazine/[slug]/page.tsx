import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getPayloadClient, SERVER_URL } from '@/lib/payload'
import { breadcrumbSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { RichText } from '@/components/RichText'
import { CATEGORY_LABELS } from '@/components/magazine/ArticleCard'
import { NewsletterBand } from '@/components/sections/NewsletterBand'

export const revalidate = 300

type Props = { params: Promise<{ slug: string }> }

async function getArticle(slug: string) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'articles',
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
    limit: 1,
    depth: 2,
  })
  return res.docs[0] || null
}

export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'articles',
      where: { _status: { equals: 'published' } },
      limit: 100,
      select: { slug: true },
    })
    return res.docs.map((d) => ({ slug: d.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug).catch(() => null)
  if (!article) return {}
  return {
    title: article.seo?.metaTitle || article.title,
    description: article.seo?.metaDescription || article.excerpt,
    alternates: { canonical: `/magazine/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticle(slug).catch(() => null)
  if (!article) notFound()

  const author = typeof article.author === 'object' ? article.author : null

  return (
    <>
      <JsonLd
        data={[
          {
            '@type': 'Article',
            headline: article.title,
            description: article.excerpt,
            inLanguage: 'he',
            datePublished: article.publishedAt,
            dateModified: article.updatedAt,
            mainEntityOfPage: `${SERVER_URL}/magazine/${article.slug}`,
            publisher: { '@id': `${SERVER_URL}/#organization` },
            ...(author
              ? {
                  author: {
                    '@type': 'Person',
                    name: author.name,
                    url: `${SERVER_URL}/authors/${author.slug}`,
                    ...(author.role ? { jobTitle: author.role } : {}),
                  },
                }
              : {}),
          },
          breadcrumbSchema([
            { name: 'ראשי', path: '/' },
            { name: 'הדרן עלך — המגזין', path: '/magazine' },
            { name: article.title, path: `/magazine/${article.slug}` },
          ]),
        ]}
      />

      <article className="px-5 pb-20 pt-12 sm:px-8">
        <div className="mx-auto flex max-w-[760px] flex-col gap-6">
          <nav aria-label="פירורי לחם" className="flex flex-wrap gap-2 text-[13px] text-ash">
            <Link href="/" className="hover:text-ink">ראשי</Link>
            <span aria-hidden="true">/</span>
            <Link href="/magazine" className="hover:text-ink">הדרן עלך</Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-ink">{article.title}</span>
          </nav>

          <header className="flex flex-col gap-5">
            <span className="self-start rounded-full bg-bone px-4 py-1.5 text-xs font-bold text-charcoal">
              {CATEGORY_LABELS[article.category] || article.category}
            </span>
            <h1 className="m-0 font-display text-[36px] font-black leading-[1.06] tracking-[-0.8px] text-ink sm:text-[52px] sm:leading-[1.03] sm:tracking-[-1.2px]">
              {article.title}
            </h1>
            {/* התקציר — פסקת מענה ישיר שנשלפת ע"י מנועי AI */}
            <p className="m-0 rounded-2xl border-s-4 border-brand-orange bg-bone px-6 py-5 text-[17px] font-medium leading-7 text-ink">
              {article.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-3 border-b border-ink/10 pb-6 text-sm text-charcoal">
              {author && (
                <Link href={`/authors/${author.slug}`} className="flex items-center gap-2.5 font-semibold text-ink hover:text-accent">
                  <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-bl from-brand-orange to-accent text-sm font-bold text-white">
                    {author.name.charAt(0)}
                  </span>
                  {author.name}
                  {author.role && <span className="font-normal text-ash">· {author.role}</span>}
                </Link>
              )}
              <span className="ms-auto flex items-center gap-3 text-xs text-ash">
                {article.hebrewDate && <span className="font-mono">{article.hebrewDate}</span>}
                {article.readingTime && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{article.readingTime} קריאה</span>
                  </>
                )}
              </span>
            </div>
          </header>

          {article.content && <RichText data={article.content} />}

          {Boolean(article.references?.length) && (
            <section aria-labelledby="refs-title" className="mt-6 rounded-2xl border border-ink/10 bg-card p-6">
              <h2 id="refs-title" className="m-0 mb-4 font-display text-xl font-black text-ink">
                מקורות והפניות
              </h2>
              <ol className="m-0 flex list-decimal flex-col gap-2 ps-5 text-sm text-body">
                {article.references!.map((ref) => (
                  <li key={ref.id}>
                    {ref.url ? (
                      <a href={ref.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent hover:text-accent-deep">
                        {ref.label}
                      </a>
                    ) : (
                      ref.label
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {author && (
            <aside aria-label="על המחבר" className="mt-4 flex flex-col gap-3 rounded-2xl bg-bone p-6 sm:flex-row sm:items-start sm:gap-5">
              <span aria-hidden="true" className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-bl from-brand-orange to-accent text-xl font-bold text-white">
                {author.name.charAt(0)}
              </span>
              <div className="flex flex-col gap-1.5">
                <Link href={`/authors/${author.slug}`} className="text-lg font-bold text-ink hover:text-accent">
                  {author.name}
                </Link>
                {author.role && <span className="text-sm font-semibold text-charcoal">{author.role}</span>}
                {author.bio && <p className="m-0 text-sm leading-6 text-body">{author.bio}</p>}
              </div>
            </aside>
          )}
        </div>
      </article>

      <NewsletterBand />
    </>
  )
}
