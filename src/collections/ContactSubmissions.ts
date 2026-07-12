import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: { singular: 'פנייה', plural: 'פניות מהאתר' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'email', 'source', 'createdAt'],
    description: 'לידים מטפסי יצירת הקשר באתר',
  },
  access: {
    // כל אחד יכול לשלוח פנייה; צפייה/עריכה — אדמין בלבד
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: 'name', label: 'שם', type: 'text', required: true },
    { name: 'email', label: 'אימייל', type: 'email' },
    { name: 'phone', label: 'טלפון נייד', type: 'text', required: true },
    { name: 'message', label: 'הודעה', type: 'textarea' },
    {
      name: 'source',
      label: 'מקור הפנייה',
      type: 'select',
      defaultValue: 'home',
      options: [
        { label: 'דף הבית', value: 'home' },
        { label: 'דף יצירת קשר', value: 'contact' },
        { label: 'עלון המגזין', value: 'newsletter' },
      ],
    },
  ],
  timestamps: true,
}
