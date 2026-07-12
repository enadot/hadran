import type { Block } from 'payload'

/**
 * בלוקים לתוכן עשיר (Lexical) — בנויים סביב עקרונות GEO:
 * מענה ישיר, שאלות-תשובות, וערך מוסף (Information Gain).
 */

// פסקת מענה ישיר של 40–60 מילים מיד אחרי כותרת-שאלה — גוגל "גוזרת" פסקאות כאלה לסקירות AI
export const DirectAnswerBlock: Block = {
  slug: 'directAnswer',
  labels: { singular: 'תקציר AI (מענה ישיר)', plural: 'תקצירי AI (מענה ישיר)' },
  fields: [
    {
      name: 'question',
      label: 'השאלה (תוצג ככותרת H2/H3)',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      label: 'מענה ישיר (40–60 מילים)',
      type: 'textarea',
      required: true,
      admin: {
        description: 'פסקה חדה ועצמאית שעונה על השאלה במלואה — זו הפסקה שמנועי AI מצטטים',
      },
    },
  ],
}

// בלוק שאלות ותשובות — מרונדר עם FAQPage schema
export const FAQBlock: Block = {
  slug: 'faq',
  labels: { singular: 'שאלות ותשובות (FAQ)', plural: 'שאלות ותשובות (FAQ)' },
  fields: [
    { name: 'title', label: 'כותרת המקטע', type: 'text', defaultValue: 'שאלות נפוצות' },
    {
      name: 'items',
      label: 'שאלות',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'question', label: 'שאלה', type: 'text', required: true },
        { name: 'answer', label: 'תשובה', type: 'textarea', required: true },
      ],
    },
  ],
}

// ערך מוסף — נתון מקורי / מקרה בוחן / טיפ מניסיון (Information Gain)
export const InsightBlock: Block = {
  slug: 'insight',
  labels: { singular: 'ערך מוסף (נתון/מקרה בוחן)', plural: 'ערך מוסף (נתונים/מקרי בוחן)' },
  fields: [
    {
      name: 'kind',
      label: 'סוג',
      type: 'select',
      required: true,
      defaultValue: 'data',
      options: [
        { label: 'נתון מקורי', value: 'data' },
        { label: 'מקרה בוחן', value: 'caseStudy' },
        { label: 'טיפ מניסיון', value: 'tip' },
      ],
    },
    { name: 'title', label: 'כותרת', type: 'text', required: true },
    { name: 'body', label: 'תוכן', type: 'textarea', required: true },
    { name: 'source', label: 'מקור הנתון (אופציונלי)', type: 'text' },
  ],
}
