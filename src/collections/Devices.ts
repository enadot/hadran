import type { CollectionConfig } from 'payload'

export const Devices: CollectionConfig = {
  slug: 'devices',
  labels: { singular: 'מכשיר', plural: 'מכשירים נתמכים' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'brand', 'featured'],
    description: 'מכשירים הנתמכים במערכת ההגנה של הדרן — הרכישה בחנויות המורשות בלבד',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', label: 'שם המכשיר', type: 'text', required: true },
    {
      name: 'slug',
      label: 'מזהה בכתובת (slug)',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    { name: 'brand', label: 'מותג', type: 'relationship', relationTo: 'brands' },
    { name: 'shortDescription', label: 'תיאור קצר', type: 'text', required: true },
    { name: 'image', label: 'תמונת מוצר', type: 'upload', relationTo: 'media' },
    {
      name: 'specs',
      label: 'מפרט',
      type: 'array',
      fields: [
        { name: 'k', label: 'שדה', type: 'text', required: true },
        { name: 'v', label: 'ערך', type: 'text', required: true },
      ],
    },
    { name: 'featured', label: 'מוצג בדף הבית', type: 'checkbox', defaultValue: false },
    { name: 'order', label: 'סדר הצגה', type: 'number', defaultValue: 0 },
  ],
}
