import type { MetadataRoute } from 'next'
import { getPayloadClient, SERVER_URL } from '@/lib/payload'

// מפת אתר דינמית — נבנית מה-CMS ומתעדכנת אוטומטית בכל שינוי תוכן (revalidate hooks)
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient()

  const [pages, articles, authors] = await Promise.all([
    payload.find({ collection: 'pages', limit: 100, select: { slug: true, updatedAt: true } }),
    payload.find({
      collection: 'articles',
      limit: 500,
      where: { _status: { equals: 'published' } },
      select: { slug: true, updatedAt: true },
    }),
    payload.find({ collection: 'authors', limit: 100, select: { slug: true, updatedAt: true } }),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SERVER_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SERVER_URL}/kashrut`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SERVER_URL}/stores`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SERVER_URL}/devices`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SERVER_URL}/magazine`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${SERVER_URL}/user-guide`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SERVER_URL}/contact`, changeFrequency: 'monthly', priority: 0.7 },
  ]

  return [
    ...staticRoutes,
    ...pages.docs.map((p) => ({
      url: `${SERVER_URL}/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...articles.docs.map((a) => ({
      url: `${SERVER_URL}/magazine/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...authors.docs.map((a) => ({
      url: `${SERVER_URL}/authors/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    })),
  ]
}
