import { JsonLd } from '@/components/seo/JsonLd'
import { faqSchema } from '@/lib/schema'

export type FaqItem = { question: string; answer: string }

// שאלות נפוצות בשפה טבעית + FAQPage schema — עמוד השדרה של אסטרטגיית ה-GEO בדף הבית
export const HOME_FAQ: FaqItem[] = [
  {
    question: 'מה זה מכשיר כשר של הדרן?',
    answer:
      'מכשיר כשר של הדרן הוא סמארטפון אנדרואיד שמערכת ההגנה של הדרן נצרבה בליבת מערכת ההפעלה שלו לפני המסירה. המכשיר מאפשר שיחות, ניווט, בנקאות ואפליקציות מאושרות בלבד, בפיקוח ועדת הרבנים לענייני תקשורת שע״י בד״צ בני ברק — ולא ניתן להסיר או לעקוף את ההגנה.',
  },
  {
    question: 'במה שונה הגנה צרובה בליבה מאפליקציית סינון רגילה?',
    answer:
      'אפליקציית סינון היא תוכנה שיושבת מעל מערכת ההפעלה, ולכן אפשר להסיר, לעקוף או לשבש אותה. ההגנה של הדרן נצרבת בליבת המכשיר עצמו: היא שורדת איפוס יצרן, החלפת סים וחיבור למחשב, לא פוגעת בסוללה ובביצועים — ואי אפשר להסיר אותה, גם לא לטכנאי.',
  },
  {
    question: 'איך עוברים למכשיר מוגן של הדרן?',
    answer:
      'מגיעים לאחת מעשרות חנויות המכירה והשירות המורשות של הדרן ברחבי הארץ. בחנות בוחרים מכשיר מתאים, וההתאמה וצריבת ההגנה נעשות במקום מול העיניים שלכם — כ-20 דקות ויוצאים עם מכשיר מוכן, כולל ליווי אישי והתקנה מלאה.',
  },
  {
    question: 'אילו מכשירים נתמכים במערכת ההגנה של הדרן?',
    answer:
      'הדרן תומכת במגוון הרחב ביותר של מותגים בשוק הכשר: Samsung Galaxy, Google Pixel, Xiaomi, OnePlus ו-Infinix. כל המכשירים מאושרים על ידי ועדת הרבנים לענייני תקשורת, והרכישה נעשית בחנויות המורשות בלבד.',
  },
  {
    question: 'מי נותן את הכשרות למכשירי הדרן?',
    answer:
      'חברת הדרן זוכה לחותמת הכשרות של ועדת הרבנים לענייני תקשורת שע״י בד״צ בני ברק — הגוף המוסמך ביותר בציבור החרדי לפתרונות תקשורת. בראשות הוועדה עומדים הגאון רבי שריאל רוזנברג והגאון רבי מרדכי סילמן שליט״א, והפיקוח על התכנים המאושרים מתבצע באופן ישיר ומתמיד.',
  },
]

export function HomeFaq({ items = HOME_FAQ }: { items?: FaqItem[] }) {
  return (
    <section aria-labelledby="faq-title" className="bg-canvas px-5 pb-24 pt-4 sm:px-8">
      <JsonLd data={faqSchema(items)} />
      <div className="mx-auto flex max-w-[860px] flex-col gap-10">
        <h2 id="faq-title" className="m-0 text-center font-display text-[32px] font-black leading-none tracking-[-0.8px] text-ink sm:text-[48px] sm:tracking-[-1px]">
          שאלות נפוצות
        </h2>
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-ink/10 bg-card px-6 py-1 open:pb-5 sm:px-8"
            >
              <summary className="cursor-pointer list-none py-4 text-lg font-bold text-ink marker:content-none sm:text-xl">
                <span className="flex items-center justify-between gap-4">
                  {item.question}
                  <span aria-hidden="true" className="text-accent transition-transform group-open:rotate-45">＋</span>
                </span>
              </summary>
              {/* מענה ישיר של 40–60 מילים — הפורמט שמנועי AI מצטטים */}
              <p className="m-0 text-base leading-7 text-body">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
