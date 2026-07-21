import type { CollectionConfig } from 'payload'
import {
  BlocksFeature,
  HeadingFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { revalidatePath } from 'next/cache'

import { DirectAnswerBlock, FAQBlock, InsightBlock } from '../blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'עמוד', plural: 'עמודים' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status'],
    description: 'עמודי תוכן: אודות, כשרות, נגישות, תקנון, מדיניות פרטיות ועוד',
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: {
      autosave: { interval: 375 },
    },
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        try {
          revalidatePath(`/${doc.slug}`)
          revalidatePath('/kashrut')
          revalidatePath('/sitemap.xml')
        } catch {
          // מחוץ להקשר Next (למשל seed) — אין מה לרענן
        }
        return doc
      },
    ],
  },
  fields: [
    { name: 'title', label: 'כותרת', type: 'text', required: true },
    {
      name: 'slug',
      label: 'מזהה בכתובת (slug)',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'לדוגמה: about / kashrut / accessibility / terms / privacy' },
    },
    { name: 'subtitle', label: 'תת-כותרת', type: 'textarea' },
    {
      name: 'content',
      label: 'תוכן',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          BlocksFeature({ blocks: [DirectAnswerBlock, FAQBlock, InsightBlock] }),
        ],
      }),
    },
    {
      name: 'seo',
      label: 'SEO',
      type: 'group',
      fields: [
        { name: 'metaTitle', label: 'כותרת Meta (אופציונלי)', type: 'text' },
        { name: 'metaDescription', label: 'תיאור Meta (אופציונלי)', type: 'textarea' },
      ],
    },
  ],
}
