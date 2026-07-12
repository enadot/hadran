import Link from 'next/link'

const SERVICE_TAGS = [
  'מוקד שירות טלפוני מקצועי',
  'מעבדות אקספרס — תיקון מסך עד שעתיים',
  'אביזרים, שדרוגים ותיקונים',
]

// טיזר נקודות שירות ומכירה — לפי Hadran Home.dc.html
export function ServiceTeaser() {
  return (
    <section className="bg-bone px-5 py-20 sm:px-8 lg:py-24">
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-2 lg:gap-[72px]">
        <div className="flex flex-col items-start gap-6">
          <h2 className="m-0 font-display text-[34px] font-black leading-[1.05] tracking-[-0.8px] text-ink sm:text-[56px] sm:leading-[1.02] sm:tracking-[-1.2px]">
            הדרן איתכם בעשרות סניפים מצפון לדרום
          </h2>
          <p className="m-0 max-w-[540px] text-base leading-7 text-body sm:text-[17px]">
            בחרנו בקפידה רשת חנויות פרימיום וסוכנים מורשים ברחבי הארץ, המספקים שירות מקצועי, ליווי אישי ורכישה
            של כל מוצרי מערכת ההגנה של הדרן — כולל התקנה במקום. מצאו את הנקודה הקרובה אליכם, היכנסו — וצאו עם
            שקט נפשי דיגיטלי.
          </p>
          <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
            {SERVICE_TAGS.map((tag) => (
              <li key={tag} className="rounded-full border border-ink/12 bg-card px-4 py-2 text-[13px] font-semibold text-ink">
                {tag}
              </li>
            ))}
          </ul>
          <Link
            href="/stores"
            className="inline-block rounded-full bg-dark px-8 py-3.5 font-semibold text-on-dark transition-colors hover:bg-deep"
          >
            איתור חנות קרובה אליך ←
          </Link>
        </div>
        <div className="hidden justify-center lg:flex">
          <div
            className="aspect-[1380/1433] w-full max-w-[460px] bg-gradient-to-bl from-brand-orange via-accent to-accent-deep [mask-image:url('/media/icon.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
            role="img"
            aria-label="סמל הדרן"
          />
        </div>
      </div>
    </section>
  )
}
