import { postgresAdapter } from '@payloadcms/db-postgres'
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
  }),
  sharp,
  // עברית כברירת מחדל + תשתית להרחבה לשפות נוספות (i18n)
  localization: {
    locales: [{ label: 'עברית', code: 'he', rtl: true }],
    defaultLocale: 'he',
    fallback: true,
  },
  i18n: {
    fallbackLanguage: 'he',
  },
})
