import type { CollectionConfig } from 'payload'

export const Brands: CollectionConfig = {
  slug: 'brands',
  labels: { singular: 'מותג', plural: 'מותגים נתמכים' },
  admin: {
    useAsTitle: 'name',
    description: 'יצרני המכשירים הנתמכים — מוצגים ברצועת המותגים בדף הבית',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', label: 'שם המותג', type: 'text', required: true },
    { name: 'logo', label: 'לוגו (Media)', type: 'upload', relationTo: 'media' },
    {
      name: 'logoPath',
      label: 'נתיב לוגו סטטי',
      type: 'text',
      admin: { description: 'חלופה ללוגו מ-Media: נתיב קובץ תחת /media, לדוגמה /media/samsung.svg' },
    },
    { name: 'height', label: 'גובה תצוגה (px)', type: 'number', defaultValue: 22 },
    { name: 'order', label: 'סדר הצגה', type: 'number', defaultValue: 0 },
  ],
}
