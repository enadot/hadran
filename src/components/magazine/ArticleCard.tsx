import Link from 'next/link'

export const CATEGORY_LABELS: Record<string, string> = {
  guides: 'מדריכים',
  halacha: 'הלכה וטכנולוגיה',
  news: 'חדשות המערכת',
  stories: 'סיפורי לקוחות',
}

export type ArticleCardData = {
  id: string | number
  title: string
  slug: string
  excerpt: string
  category: string
  hebrewDate?: string | null
  readingTime?: string | null
  coverUrl?: string | null
  coverAlt?: string | null
  coverLabel?: string | null
}

export function ArticleCard({ article }: { article: ArticleCardData }) {
  return (
    <Link
      href={`/magazine/${article.slug}`}
      className="flex flex-col overflow-hidden rounded-[14px] border border-ink/8 bg-card text-ink transition-shadow hover:shadow-[0_12px_32px_rgba(32,32,32,0.1)]"
    >
      <div className="flex aspect-video items-center justify-center bg-[repeating-linear-gradient(45deg,#f3f0e8_0_12px,#eee9dd_12px_24px)]">
        {article.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={article.coverUrl} alt={article.coverAlt || ''} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <span className="font-mono text-[11px] text-ash">{article.coverLabel || 'תמונה'}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 px-6 pb-7 pt-6">
        <span className="self-start rounded-full bg-bone px-3 py-1 text-[11px] font-bold text-charcoal">
          {CATEGORY_LABELS[article.category] || article.category}
        </span>
        <h3 className="m-0 font-display text-2xl font-extrabold leading-tight tracking-[-0.3px]">{article.title}</h3>
        <p className="m-0 text-sm leading-6 text-charcoal">{article.excerpt}</p>
        <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-ash">
          {article.hebrewDate && <span className="font-mono">{article.hebrewDate}</span>}
          {article.hebrewDate && article.readingTime && <span>·</span>}
          {article.readingTime && <span>{article.readingTime}</span>}
        </div>
      </div>
    </Link>
  )
}
