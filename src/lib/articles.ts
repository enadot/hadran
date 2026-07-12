import type { Article } from '@/payload-types'
import type { ArticleCardData } from '@/components/magazine/ArticleCard'

export function toCardData(a: Article): ArticleCardData {
  return {
    id: a.id,
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt,
    category: a.category,
    hebrewDate: a.hebrewDate,
    readingTime: a.readingTime,
    coverUrl: typeof a.coverImage === 'object' && a.coverImage !== null ? a.coverImage.url : null,
    coverAlt: typeof a.coverImage === 'object' && a.coverImage !== null ? a.coverImage.alt : null,
    coverLabel: a.coverLabel,
  }
}
