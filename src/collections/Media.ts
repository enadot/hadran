import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'קובץ מדיה', plural: 'מדיה' },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      label: 'טקסט חלופי (Alt)',
      type: 'text',
      required: true,
      admin: {
        description: 'תיאור התמונה עבור קוראי מסך ומנועי חיפוש — חובה לנגישות ול-SEO',
      },
    },
  ],
  upload: {
    staticDir: 'public/media-uploads',
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 400, position: 'centre' },
      { name: 'card', width: 768 },
      { name: 'hero', width: 1400 },
    ],
    adminThumbnail: 'thumbnail',
  },
}
