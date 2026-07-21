import type { CollectionConfig } from 'payload'
import {
  BlocksFeature,
  HeadingFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { revalidatePath } from 'next/cache'

import { DirectAnswerBlock, FAQBlock, InsightBlock } from '../blocks'

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: { singular: 'מאמר', plural: 'מאמרים ומדריכים' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', 'publishedAt', '_status'],
    description: 'מאמרי המגזין "הדרן עלך" ומדריכי שימוש',
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
          revalidatePath('/magazine')
          revalidatePath('/user-guide')
          revalidatePath(`/magazine/${doc.slug}`)
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
    },
    {
      name: 'excerpt',
      label: 'תקציר (40–60 מילים)',
      type: 'textarea',
      required: true,
      admin: {
        description:
          'תקציר חד שעונה על שאלת המאמר — משמש בתצוגת הרשימה, ב-meta description ובציטוטי AI',
      },
    },
    {
      name: 'category',
      label: 'קטגוריה',
      type: 'select',
      required: true,
      options: [
        { label: 'מדריכים', value: 'guides' },
        { label: 'הלכה וטכנולוגיה', value: 'halacha' },
        { label: 'חדשות המערכת', value: 'news' },
        { label: 'סיפורי לקוחות', value: 'stories' },
      ],
    },
    { name: 'coverImage', label: 'תמונה ראשית', type: 'upload', relationTo: 'media' },
    { name: 'coverLabel', label: 'תיאור תמונה חלופי (placeholder)', type: 'text', admin: { description: 'מוצג כשאין תמונה ראשית' } },
    {
      name: 'author',
      label: 'מחבר',
      type: 'relationship',
      relationTo: 'authors',
    },
    { name: 'publishedAt', label: 'תאריך פרסום', type: 'date', required: true },
    { name: 'hebrewDate', label: 'תאריך עברי לתצוגה', type: 'text', admin: { description: 'לדוגמה: תמוז תשפ״ו' } },
    { name: 'readingTime', label: 'זמן קריאה', type: 'text', admin: { description: 'לדוגמה: 5 דק׳' } },
    { name: 'isFeatured', label: 'כתבת השער במגזין', type: 'checkbox', defaultValue: false },
    { name: 'isGuide', label: 'מוצג גם במדריך השימוש', type: 'checkbox', defaultValue: false },
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
      name: 'references',
      label: 'מקורות והפניות',
      type: 'array',
      admin: { description: 'מקורות חיצוניים מחזקים אמינות (E-E-A-T)' },
      fields: [
        { name: 'label', label: 'שם המקור', type: 'text', required: true },
        { name: 'url', label: 'קישור', type: 'text' },
      ],
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
