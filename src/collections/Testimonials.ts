import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: 'עדות לקוח', plural: 'עדויות לקוחות' },
  admin: {
    useAsTitle: 'name',
    description: 'חוות דעת אותנטיות של משפחות ולקוחות — מוצגות בדף הבית',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', label: 'שם', type: 'text', required: true },
    { name: 'city', label: 'עיר', type: 'text' },
    { name: 'quote', label: 'ציטוט', type: 'textarea', required: true },
    {
      name: 'featured',
      label: 'מוצג בדף הבית',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'order',
      label: 'סדר הצגה',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
