import type { CollectionConfig } from 'payload'

export const Authors: CollectionConfig = {
  slug: 'authors',
  labels: { singular: 'מחבר', plural: 'מחברים' },
  admin: {
    useAsTitle: 'name',
    description: 'כותבי תוכן — פרופיל מחבר מלא מחזק אמינות (E-E-A-T) מול מנועי חיפוש ו-AI',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', label: 'שם מלא', type: 'text', required: true },
    {
      name: 'slug',
      label: 'מזהה בכתובת (slug)',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    { name: 'role', label: 'תפקיד', type: 'text', admin: { description: 'לדוגמה: מומחה טכנולוגיה כשרה' } },
    { name: 'bio', label: 'ביוגרפיה קצרה', type: 'textarea' },
    {
      name: 'credentials',
      label: 'ניסיון והסמכות',
      type: 'array',
      admin: { description: 'שורת ניסיון/הסמכה — מוצג בפרופיל המחבר ומוזן ל-Schema' },
      fields: [{ name: 'item', label: 'פריט', type: 'text', required: true }],
    },
    { name: 'photo', label: 'תמונה', type: 'upload', relationTo: 'media' },
  ],
}
