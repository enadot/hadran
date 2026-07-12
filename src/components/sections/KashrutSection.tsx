import Link from 'next/link'
import Image from 'next/image'

// מקטע הכשרות — הטקסטים המחייבים מהאתר הקיים, לפי Hadran Home.dc.html
export function KashrutSection() {
  return (
    <section id="kashrut" className="px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Image
              src="/media/kashrut_stamp.svg"
              alt="חותמת ועדת הרבנים לענייני תקשורת"
              width={72}
              height={74}
              className="h-auto w-[72px]"
            />
            <span className="text-sm font-bold text-accent">הכשר ופיקוח</span>
          </div>
          <h2 className="m-0 font-display text-[34px] font-black leading-[1.05] tracking-[-0.8px] text-ink sm:text-[52px] sm:leading-[1.02] sm:tracking-[-1.2px]">
            הכשרות הרשמית והמוסמכת ביותר בעולם ההגנה החרדי
          </h2>
          <div className="flex flex-col gap-3.5 text-base leading-7 text-body">
            <p className="m-0">
              חברת הדרן זוכה לחותמת הכשרות של הגוף המוסמך ביותר בציבור החרדי לפתרונות הזמן:{' '}
              <strong className="text-ink">ועדת הרבנים לענייני תקשורת שע״י בד״צ בני ברק</strong>.
            </p>
            <p className="m-0">
              מערך החסימה הייחודי של הדרן פותח בהכוונתו של מרן הגאון רבי ניסים קרליץ זצוק״ל, נבדק על ידי טובי
              אנשי המקצוע — והוכר כמערכת שאיננה ניתנת לפריצה.
            </p>
            <p className="m-0">
              בראשות ועדת הרבנים עומדים הגאון רבי שריאל רוזנברג והגאון רבי מרדכי סילמן שליט״א, כאשר הם ונציגים
              מוסמכים מטעמם מפקחים באופן ישיר על התכנים המותרים והנצרכים לשימוש.
            </p>
            <p className="m-0">
              על כל מוצרי הדרן מוטבעת חותמת הכשרות המהודרת — המבדילה מחיקויים בשוק הטכנולוגיה שאינם בפיקוח ראוי
              ומוסמך.
            </p>
          </div>
          <Link
            href="/kashrut"
            className="inline-block self-start rounded-full bg-dark px-7 py-3 text-[15px] font-semibold text-on-dark transition-colors hover:bg-deep"
          >
            לקריאה על הכשרות והפיקוח ←
          </Link>
        </div>
        <div className="relative hidden justify-center lg:flex">
          <div className="max-w-[380px] rotate-[1.5deg] rounded-xl border border-ink/12 bg-card p-4 shadow-[0_8px_24px_rgba(32,32,32,0.08)]">
            <div className="flex aspect-[3/4] w-[320px] flex-col items-center justify-center gap-6 rounded-md bg-bone p-8 text-center">
              <Image
                src="/media/kashrut_stamp.svg"
                alt="חותמת ועדת הרבנים לענייני תקשורת שע״י בד״צ בני ברק"
                width={160}
                height={165}
                className="h-auto w-[160px]"
              />
              <span className="font-display text-2xl font-black leading-tight text-ink">
                תעודת הכשרות
                <br />
                ועדת הרבנים לענייני תקשורת
              </span>
              <span className="font-mono text-[11px] text-ash">שע״י בד״צ בני ברק</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
