import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { he } from '@payloadcms/translations/languages/he'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Articles } from './collections/Articles'
import { Authors } from './collections/Authors'
import { Stores } from './collections/Stores'
import { Devices } from './collections/Devices'
import { Brands } from './collections/Brands'
import { Testimonials } from './collections/Testimonials'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— הדרן',
    },
    components: {
      graphics: {
        Logo: '/components/admin/Logo#Logo',
        Icon: '/components/admin/Icon#Icon',
      },
    },
    // עורך ויזואלי — תצוגה חיה של העמוד בתוך האדמין תוך כדי עריכה
    livePreview: {
      url: ({ data, collectionConfig }) => {
        const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        const slug = typeof data?.slug === 'string' ? data.slug : ''
        const path = collectionConfig?.slug === 'articles' ? `/magazine/${slug}` : `/${slug}`
        return `${base}/api/preview?path=${encodeURIComponent(path)}`
      },
      collections: ['pages', 'articles'],
      breakpoints: [
        { label: 'מובייל', name: 'mobile', width: 390, height: 844 },
        { label: 'טאבלט', name: 'tablet', width: 834, height: 1194 },
        { label: 'דסקטופ', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  collections: [
    Pages,
    Articles,
    Authors,
    Stores,
    Devices,
    Brands,
    Testimonials,
    ContactSubmissions,
    Media,
    Users,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  // אחסון מדיה ב-Vercel Blob בפרודקשן (הדיסק ב-Vercel אינו קבוע).
  // מופעל אוטומטית כשקיים BLOB_READ_WRITE_TOKEN — בפיתוח מקומי נשמר לדיסק כרגיל.
  plugins: [
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            collections: { media: true },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
  sharp,
  // עברית כברירת מחדל + תשתית להרחבה לשפות נוספות (i18n)
  localization: {
    locales: [{ label: 'עברית', code: 'he', rtl: true }],
    defaultLocale: 'he',
    fallback: true,
  },
  // עברית בלבד בממשק האדמין — Payload עובר אוטומטית ל-RTL בשפות ימין-לשמאל
  i18n: {
    supportedLanguages: { he },
    fallbackLanguage: 'he',
  },
})
