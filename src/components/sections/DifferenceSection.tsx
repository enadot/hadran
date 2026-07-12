import Link from 'next/link'

const HADRAN_POINTS = [
  'יציבות ללא תחרות — ההגנה היא חלק מהמערכת עצמה',
  'ביצועים אופטימליים — אפס פגיעה בסוללה ובמהירות',
  'בלתי ניתנת להסרה או עקיפה — גם לא לטכנאי',
  'שורדת איפוס יצרן, החלפת סים ועדכוני מערכת',
]

const SOFTWARE_POINTS = [
  'פגיעה בביצועים ובסוללה',
  'פוטנציאל לפרצות ודרכי עקיפה',
  'תלות בעדכוני מערכת של צד שלישי',
  'שכבת תוכנה חיצונית — שניתן להסיר',
]

// השוואת הדרן מול פתרונות תוכנה — לפי Hadran Home.dc.html
export function DifferenceSection() {
  return (
    <section id="difference" className="bg-canvas px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 lg:gap-14">
        <div className="flex flex-col items-center gap-5 text-center">
          <span className="rounded-full border border-accent/35 px-5 py-2 text-sm font-bold text-accent">
            ההבדל של הדרן
          </span>
          <h2 className="m-0 font-display text-[34px] font-black leading-[1.05] tracking-[-0.8px] text-ink sm:text-[60px] sm:leading-[1.02] sm:tracking-[-1.4px]">
            הגנה אמיתית מתחילה בבסיס.
            <br />
            לא רק סינון — הגנה.
          </h2>
          <p className="m-0 max-w-[620px] text-base leading-relaxed text-charcoal sm:text-[17px]">
            כאשר הביטחון הדיגיטלי של משפחתך עומד על הפרק, אל תתפשר על פחות מהטוב ביותר. השווה בעצמך:
          </p>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          <div className="relative flex flex-col gap-6 rounded-2xl border border-accent/25 bg-card p-8 shadow-[0_16px_40px_rgba(234,40,4,0.08)] sm:p-10">
            <span className="btn-brand absolute -top-3.5 right-8 px-4 py-1.5 text-xs">
              הבחירה של 140,000+ משתמשים
            </span>
            <div className="flex items-center gap-4">
              <div className="flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-dark">
                <div
                  aria-hidden="true"
                  className="h-[28px] w-[26px] bg-accent [mask-image:url('/media/icon.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <h3 className="m-0 text-xl font-bold text-ink">הדרן — הגנה צרובה בליבה</h3>
                <span className="text-[13px] text-charcoal">ברמת החומרה ומערכת ההפעלה</span>
              </div>
            </div>
            <ul className="m-0 flex list-none flex-col p-0">
              {HADRAN_POINTS.map((point, i) => (
                <li
                  key={point}
                  className={`flex items-baseline gap-3 py-3 ${i < HADRAN_POINTS.length - 1 ? 'border-b border-ink/8' : ''}`}
                >
                  <span aria-hidden="true" className="text-[15px] font-bold text-brand-green-dark">✓</span>
                  <span className="text-[15px] leading-normal text-ink">{point}</span>
                </li>
              ))}
            </ul>
            <span className="mt-auto self-start rounded-full bg-brand-green/14 px-4 py-2 text-[13px] font-bold text-brand-green-deeper">
              שקט נפשי אמיתי
            </span>
          </div>

          <div className="flex flex-col gap-6 rounded-2xl border border-dashed border-ink/25 bg-bone p-8 sm:p-10">
            <div className="flex items-center gap-4">
              <div className="flex h-[52px] w-[52px] items-center justify-center rounded-xl border-2 border-dashed border-ink/30">
                <div aria-hidden="true" className="h-5 w-5 rounded-md border-2 border-ink/35" />
              </div>
              <div className="flex flex-col gap-0.5">
                <h3 className="m-0 text-xl font-bold text-charcoal">פתרונות מבוססי תוכנה</h3>
                <span className="text-[13px] text-ash">אפליקציה, VPN או סינון חיצוני</span>
              </div>
            </div>
            <ul className="m-0 flex list-none flex-col p-0">
              {SOFTWARE_POINTS.map((point, i) => (
                <li
                  key={point}
                  className={`flex items-baseline gap-3 py-3 ${i < SOFTWARE_POINTS.length - 1 ? 'border-b border-ink/8' : ''}`}
                >
                  <span aria-hidden="true" className="text-[15px] font-bold text-accent">✕</span>
                  <span className="text-[15px] leading-normal text-charcoal">{point}</span>
                </li>
              ))}
            </ul>
            <span className="mt-auto self-start text-[13px] font-semibold text-ash">סינון חיצוני בלבד</span>
          </div>
        </div>

        <p className="m-0 text-center text-[15px] text-charcoal">
          הדרן מספקת פתרון שורשי, עמוק ואמין יותר —{' '}
          <Link href="#protection" className="font-bold text-accent hover:text-accent-deep">
            כך זה עובד ←
          </Link>
        </p>
      </div>
    </section>
  )
}
