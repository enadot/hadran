import type { GlobalConfig } from 'payload'
import { revalidatePath } from 'next/cache'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'הגדרות אתר',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        try {
          revalidatePath('/', 'layout')
        } catch {
          // מחוץ להקשר Next (למשל seed) — אין מה לרענן
        }
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'upgradeNotice',
      label: 'הודעת שדרוג',
      type: 'group',
      fields: [
        { name: 'enabled', label: 'הצג הודעה', type: 'checkbox', defaultValue: true },
        {
          name: 'text',
          label: 'טקסט ההודעה',
          type: 'text',
          defaultValue: 'האתר בתהליך שדרוג. ייתכן שחלק מהפונקציות אינן זמינות כרגע. עמכם הסליחה.',
        },
      ],
    },
    {
      name: 'contact',
      label: 'פרטי התקשרות',
      type: 'group',
      fields: [
        { name: 'phone', label: 'טלפון ראשי', type: 'text', defaultValue: '073-393-3000' },
        { name: 'whatsapp', label: 'וואטסאפ', type: 'text' },
        { name: 'email', label: 'אימייל', type: 'text', defaultValue: 'info@hadran.net' },
        { name: 'hours', label: 'שעות פעילות', type: 'text', defaultValue: 'א׳–ה׳ 09:00–19:00 · ו׳ 09:00–12:00' },
      ],
    },
    {
      name: 'stats',
      label: 'נתונים',
      type: 'group',
      fields: [
        { name: 'userCount', label: 'מספר משתמשים', type: 'number', defaultValue: 140000 },
        { name: 'foundedYear', label: 'שנת הקמה', type: 'number', defaultValue: 2014 },
      ],
    },
    {
      name: 'kashrut',
      label: 'כשרות',
      type: 'group',
      fields: [
        {
          name: 'committee',
          label: 'שם הגוף המכשיר',
          type: 'text',
          defaultValue: 'ועדת הרבנים לענייני תקשורת שע״י בד״צ בני ברק',
        },
        {
          name: 'certificate',
          label: 'תעודת כשרות (תמונה)',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
