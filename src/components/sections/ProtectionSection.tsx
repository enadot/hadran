import Link from 'next/link'

const STATUS_ROWS = [
  { label: 'הגנה צרובה בליבת המכשיר', badge: 'פעילה ✓', ok: true },
  { label: 'סינון גלישה', badge: 'נעול ✓', ok: true },
  { label: 'חנות אפליקציות מבוקרת', badge: 'מאושרת ✓', ok: true },
  { label: 'אפשרות הסרה או עקיפה', badge: 'אין ✕', ok: false },
  { label: 'פיקוח ועדת הרבנים', badge: 'בתוקף ✓', ok: true },
]

const PILLARS = [
  {
    num: '01',
    title: 'צריבה בליבה',
    body: 'ההגנה נטמעת ברמת מערכת ההפעלה — לא אפליקציה שאפשר למחוק, לא הגדרה שאפשר לשנות.',
  },
  {
    num: '02',
    title: 'אטומה לעקיפות',
    body: 'איפוס היצרן, החלפת סים או חיבור למחשב — ההגנה נשארת. אין דרך לעקוף אותה, גם לא לטכנאי.',
  },
  {
    num: '03',
    title: 'בפיקוח מתמיד',
    body: 'ועדת הרבנים לענייני תקשורת מפקחת באופן ישיר על התכנים המאושרים — בכל מכשיר, בכל עדכון.',
  },
]

// מקטע מערכת ההגנה — פס כהה עם ליבה מונפשת וכרטיס סטטוס, לפי Hadran Home.dc.html
export function ProtectionSection() {
  return (
    <section id="protection" className="relative overflow-hidden bg-dark px-5 py-20 text-on-dark sm:px-8 lg:pb-28 lg:pt-[120px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[30%] left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(234,40,4,0.22)_0%,rgba(234,40,4,0.06)_45%,rgba(32,32,32,0)_70%)]"
      />
      <div className="relative mx-auto flex max-w-[1280px] flex-col gap-14 lg:gap-[72px]">
        <div className="flex flex-col items-center gap-6 text-center">
          <span className="rounded-full border border-glow/50 px-5 py-2 text-sm font-bold text-glow">
            מערכת ההגנה של הדרן · דור 4
          </span>
          <h2 className="m-0 font-display text-[40px] font-black leading-none tracking-[-1px] text-on-dark sm:text-[76px] sm:tracking-[-1.8px]">
            הגנה שצרובה בליבה.
            <br />
            <span className="text-glow">לא עוד אפליקציה.</span>
          </h2>
          <p className="m-0 max-w-[600px] text-base leading-relaxed text-on-dark/70 sm:text-lg">
            סינון רגיל הוא תוכנה שיושבת מעל המערכת — וכל תוכנה אפשר להסיר. ההגנה של הדרן נצרבת בליבת המכשיר
            עצמו בתהליך התאמה מלא, לפני שהוא מגיע אליכם.
          </p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative flex min-h-[320px] items-center justify-center lg:min-h-[420px]">
            <div className="absolute h-[300px] w-[300px] rounded-full border border-on-dark/10 [animation:hadranPulse_3.6s_ease-out_infinite] sm:h-[400px] sm:w-[400px]" />
            <div className="absolute h-[300px] w-[300px] rounded-full border border-on-dark/10 [animation:hadranPulse_3.6s_ease-out_1.2s_infinite] sm:h-[400px] sm:w-[400px]" />
            <div className="absolute h-[300px] w-[300px] rounded-full border border-on-dark/10 [animation:hadranPulse_3.6s_ease-out_2.4s_infinite] sm:h-[400px] sm:w-[400px]" />
            <div className="absolute h-[230px] w-[230px] rounded-full border border-dashed border-glow/35 [animation:hadranSpin_24s_linear_infinite] sm:h-[300px] sm:w-[300px]" />
            <div className="relative flex h-[180px] w-[180px] items-center justify-center rounded-full border border-on-dark/15 bg-[radial-gradient(circle_at_35%_30%,#2e2e2e,#000000)] shadow-[0_0_80px_rgba(234,40,4,0.35)]">
              <div
                aria-hidden="true"
                className="h-[90px] w-[86px] bg-accent [mask-image:url('/media/icon.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
              />
            </div>
            <span className="absolute bottom-2 text-[13px] font-semibold text-on-dark/50 lg:bottom-6">
              ליבת המכשיר · ההגנה פעילה
            </span>
          </div>

          <div className="flex flex-col gap-1 rounded-2xl border border-on-dark/10 bg-black/55 p-6 backdrop-blur-sm sm:p-8">
            <div className="mb-3 flex items-center justify-between border-b border-on-dark/15 pb-4">
              <span className="text-sm font-bold text-on-dark/70">מצב ההגנה במכשיר</span>
              <span className="flex items-center gap-2 text-xs font-bold text-brand-green-dark">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand-green-dark [animation:hadranBlink_2s_ease-in-out_infinite]" />
                מוגן כעת
              </span>
            </div>
            {STATUS_ROWS.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center justify-between py-3 ${i < STATUS_ROWS.length - 1 ? 'border-b border-on-dark/8' : ''}`}
              >
                <span className="text-[15px] text-on-dark">{row.label}</span>
                <span
                  className={`rounded-full px-3.5 py-1 text-xs font-bold ${
                    row.ok ? 'bg-brand-green/16 text-brand-green-dark' : 'bg-glow/16 text-glow'
                  }`}
                >
                  {row.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-on-dark/10 bg-on-dark/10 sm:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.num} className="flex flex-col gap-3 bg-dark px-8 py-9">
              <span className="font-display text-[44px] font-black leading-none text-glow">{p.num}</span>
              <h3 className="m-0 text-lg font-bold text-on-dark">{p.title}</h3>
              <p className="m-0 text-[15px] leading-relaxed text-on-dark/65">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/devices"
            className="inline-block rounded-full bg-on-dark px-8 py-3.5 font-semibold text-ink transition-colors hover:bg-white"
          >
            איך זה עובד ←
          </Link>
        </div>
      </div>
    </section>
  )
}
