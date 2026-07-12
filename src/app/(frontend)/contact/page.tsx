import type { Metadata } from 'next'

import { getSiteSettings } from '@/lib/payload'
import { breadcrumbSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { ContactForm } from '@/components/forms/ContactForm'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'יצירת קשר — מוקד השירות של הדרן',
  description:
    'צרו קשר עם הדרן: מוקד שירות טלפוני, וואטסאפ, מייל וטופס פנייה מקוון. ייעוץ אישי להתאמת מערכת ההגנה למכשיר שלכם, למשפחה או לעסק.',
}

export default async function ContactPage() {
  let settings = null
  try {
    settings = await getSiteSettings()
  } catch {
    settings = null
  }

  const contact = settings?.contact

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'ראשי', path: '/' }, { name: 'יצירת קשר', path: '/contact' }])} />

      <header className="px-5 pb-10 pt-16 text-center sm:px-8 sm:pt-24">
        <div className="mx-auto flex max-w-[860px] flex-col items-center gap-6">
          <span className="rounded-full border border-accent/35 px-5 py-2 text-sm font-bold text-accent">
            אנחנו כאן בשבילכם
          </span>
          <h1 className="m-0 font-display text-[44px] font-black leading-none tracking-[-1px] text-ink sm:text-[80px] sm:tracking-[-1.8px]">
            יצירת קשר
          </h1>
          <p className="m-0 max-w-[560px] text-lg leading-relaxed text-body">
            התאמה מדויקת של מערכת ההגנה למכשיר שלכם, סקירה של הפתרון המשפחתי והעסקי, וייעוץ אישי לשמירה מיטבית
            על הפרטיות והערכים.
          </p>
        </div>
      </header>

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto grid max-w-[1100px] items-start gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col gap-4">
            {contact?.phone && (
              <a href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`} className="flex flex-col gap-1 rounded-2xl border border-ink/10 bg-card p-6 transition-shadow hover:shadow-[0_8px_24px_rgba(32,32,32,0.08)]">
                <span className="font-mono text-[11px] font-bold tracking-widest text-ash">טלפון</span>
                <span className="text-xl font-bold text-ink" dir="ltr">{contact.phone}</span>
              </a>
            )}
            {contact?.whatsapp && (
              <a
                href={`https://wa.me/${contact.whatsapp.replace(/[^\d]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-1 rounded-2xl border border-ink/10 bg-card p-6 transition-shadow hover:shadow-[0_8px_24px_rgba(32,32,32,0.08)]"
              >
                <span className="font-mono text-[11px] font-bold tracking-widest text-ash">וואטסאפ</span>
                <span className="text-xl font-bold text-ink" dir="ltr">{contact.whatsapp}</span>
              </a>
            )}
            {contact?.email && (
              <a href={`mailto:${contact.email}`} className="flex flex-col gap-1 rounded-2xl border border-ink/10 bg-card p-6 transition-shadow hover:shadow-[0_8px_24px_rgba(32,32,32,0.08)]">
                <span className="font-mono text-[11px] font-bold tracking-widest text-ash">אימייל</span>
                <span className="text-xl font-bold text-ink" dir="ltr">{contact.email}</span>
              </a>
            )}
            {contact?.hours && (
              <div className="flex flex-col gap-1 rounded-2xl bg-bone p-6">
                <span className="font-mono text-[11px] font-bold tracking-widest text-ash">שעות פעילות</span>
                <span className="text-base font-semibold text-ink">{contact.hours}</span>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-ink/10 bg-card p-7 sm:p-10">
            <h2 className="m-0 mb-2 font-display text-[26px] font-black tracking-[-0.5px] text-ink">
              השאירו פרטים ונחזור אליכם
            </h2>
            <p className="m-0 mb-6 text-sm text-charcoal">
              רוצים להנות מחיים דיגיטליים בטוחים? השאירו עכשיו פרטים וסוכן כשר סייל יחזור אליכם בהקדם.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
