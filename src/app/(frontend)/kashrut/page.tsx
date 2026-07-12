import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import { getPayloadClient } from '@/lib/payload'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { RichText } from '@/components/RichText'
import { KashrutSection } from '@/components/sections/KashrutSection'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'כשרות — ועדת הרבנים לענייני תקשורת',
  description:
    'הכשרות הרשמית והמוסמכת ביותר בעולם ההגנה החרדי: חותמת ועדת הרבנים לענייני תקשורת שע״י בד״צ בני ברק על כל מוצרי הדרן. כך עובד הפיקוח, ומה מבדיל מחיקויים.',
}

const KASHRUT_FAQ = [
  {
    question: 'מי מפקח על הכשרות של הדרן?',
    answer:
      'ועדת הרבנים לענייני תקשורת שע״י בד״צ בני ברק, בראשות הגאון רבי שריאל רוזנברג והגאון רבי מרדכי סילמן שליט״א. הוועדה ונציגים מוסמכים מטעמה מפקחים באופן ישיר על התכנים המותרים והנצרכים לשימוש בכל מכשיר ובכל עדכון.',
  },
  {
    question: 'איך מזהים מוצר מקורי של הדרן?',
    answer:
      'על כל מוצרי הדרן מוטבעת חותמת הכשרות המהודרת של ועדת הרבנים. החותמת מבדילה את מוצרי הדרן מחיקויים בשוק הטכנולוגיה שאינם בפיקוח ראוי ומוסמך — לפני רכישה ודאו שהחותמת מוטבעת על המוצר ושהרכישה נעשית בחנות מורשית.',
  },
  {
    question: 'האם ההגנה של הדרן באמת לא ניתנת לפריצה?',
    answer:
      'מערך החסימה הייחודי של הדרן פותח בהכוונתו של מרן הגאון רבי ניסים קרליץ זצוק״ל, נבדק על ידי טובי אנשי המקצוע והוכר כמערכת שאיננה ניתנת לפריצה. ההגנה צרובה בליבת המכשיר ושורדת איפוס יצרן, החלפת סים וכל ניסיון עקיפה.',
  },
]

// דף הכשרות — תוכן מנוהל מ-CMS (עמוד kashrut) מעל בסיס קבוע
export default async function KashrutPage() {
  let page = null
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: 'pages', where: { slug: { equals: 'kashrut' } }, limit: 1 })
    page = res.docs[0] || null
  } catch {
    page = null
  }

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'ראשי', path: '/' }, { name: 'כשרות', path: '/kashrut' }]),
          faqSchema(KASHRUT_FAQ),
        ]}
      />

      <header className="px-5 pb-6 pt-16 text-center sm:px-8 sm:pt-24">
        <div className="mx-auto flex max-w-[900px] flex-col items-center gap-6">
          <Image
            src="/media/kashrut_stamp.svg"
            alt="חותמת ועדת הרבנים לענייני תקשורת שע״י בד״צ בני ברק"
            width={110}
            height={114}
            className="h-auto w-[110px]"
            priority
          />
          <h1 className="m-0 font-display text-[40px] font-black leading-[1.02] tracking-[-1px] text-ink sm:text-[72px] sm:tracking-[-1.8px]">
            {page?.title || 'הכשרות המוסמכת ביותר בעולם ההגנה החרדי'}
          </h1>
          <p className="m-0 max-w-[620px] text-lg leading-relaxed text-body">
            {page?.subtitle ||
              'חותמת ועדת הרבנים לענייני תקשורת שע״י בד״צ בני ברק מוטבעת על כל מוצרי הדרן — ומבדילה אותם מחיקויים שאינם בפיקוח ראוי ומוסמך.'}
          </p>
        </div>
      </header>

      {page?.content ? (
        <section className="px-5 pb-16 sm:px-8">
          <div className="mx-auto max-w-[760px]">
            <RichText data={page.content} />
          </div>
        </section>
      ) : (
        <KashrutSection />
      )}

      <section aria-labelledby="kashrut-faq" className="bg-bone px-5 py-20 sm:px-8">
        <div className="mx-auto flex max-w-[860px] flex-col gap-8">
          <h2 id="kashrut-faq" className="m-0 text-center font-display text-[30px] font-black tracking-[-0.6px] text-ink sm:text-[44px] sm:tracking-[-1px]">
            שאלות על הכשרות והפיקוח
          </h2>
          {KASHRUT_FAQ.map((item) => (
            <div key={item.question} className="rounded-2xl bg-card p-7">
              <h3 className="m-0 mb-3 text-xl font-bold text-ink">{item.question}</h3>
              {/* מענה ישיר — הפורמט שמנועי AI שולפים */}
              <p className="m-0 text-base leading-7 text-body">{item.answer}</p>
            </div>
          ))}
          <div className="text-center">
            <Link href="/stores" className="btn-brand inline-block px-8 py-3.5">
              לרכישה בחנות מורשית ←
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
