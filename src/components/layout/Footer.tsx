import Link from 'next/link'
import Image from 'next/image'

const FOOTER_COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'הפתרון',
    links: [
      { label: 'מערכת ההגנה', href: '/#protection' },
      { label: 'הדרן מול סינון חיצוני', href: '/#difference' },
      { label: 'מכשירים נתמכים', href: '/devices' },
      { label: 'הדרן עלך — המגזין', href: '/magazine' },
    ],
  },
  {
    title: 'חנויות ושירות',
    links: [
      { label: 'חנויות מכירה ושירות', href: '/stores' },
      { label: 'מדריך שימוש', href: '/user-guide' },
      { label: 'מוקד שירות טלפוני', href: '/contact' },
      { label: 'צור קשר', href: '/contact' },
    ],
  },
  {
    title: 'כשרות',
    links: [
      { label: 'ועדת הרבנים', href: '/kashrut' },
      { label: 'עובדות מול מיתוסים', href: '/#samsung-myth' },
      { label: 'עדויות משפחות', href: '/#testimonials' },
      { label: 'אודות הדרן', href: '/about' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-deep px-5 pt-24 text-on-dark sm:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[40%] left-1/2 h-[60%] w-[80%] -translate-x-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(234,40,4,0.22)_0%,rgba(234,40,4,0)_70%)]"
      />
      <div className="relative mx-auto flex max-w-[1280px] flex-col gap-14 lg:gap-[72px]">
        <div className="flex flex-wrap items-end justify-between gap-10">
          <h2 className="font-display text-[44px] font-black leading-[0.98] tracking-[-1.2px] text-on-dark sm:text-[72px] sm:tracking-[-1.8px]">
            שקט דיגיטלי.
            <br />
            <span className="text-glow">צרוב בליבה.</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/stores" className="btn-brand px-7 py-3.5 text-[15px]">
              איתור חנות קרובה ←
            </Link>
            <Link
              href="/devices"
              className="inline-block rounded-full border border-on-dark/30 px-7 py-3.5 text-[15px] font-semibold text-on-dark transition-colors hover:bg-on-dark/10"
            >
              מכשירים נתמכים
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 border-t border-on-dark/15 pt-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-12 lg:pt-14">
          <div className="flex flex-col gap-4">
            <Image
              src="/media/white_logo_1_1.svg"
              alt="הדרן"
              width={67}
              height={52}
              className="h-[52px] w-auto self-start invert"
            />
            <p className="m-0 max-w-[300px] text-sm leading-7 text-on-dark/60">
              טכנולוגיה בהכשר. מאז 2014.
              <br />
              הגנה צרובה בליבת המכשיר, בפיקוח ועדת הרבנים לענייני תקשורת.
            </p>
            <div className="flex items-center gap-2.5">
              <Image
                src="/media/kashrut_stamp.svg"
                alt="חותמת ועדת הרבנים לענייני תקשורת"
                width={44}
                height={45}
                className="h-auto w-11 opacity-90 invert"
              />
              <span className="max-w-[180px] text-xs leading-5 text-on-dark/50">
                באישור ועדת הרבנים לענייני תקשורת, בני ברק
              </span>
            </div>
          </div>
          {FOOTER_COLS.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col gap-3.5 text-sm">
              <span className="font-mono text-[11px] font-bold tracking-widest text-on-dark/40">{col.title}</span>
              {col.links.map((link) => (
                <Link key={link.label} href={link.href} className="text-on-dark/70 transition-colors hover:text-glow">
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-on-dark/15 pt-6 text-xs text-on-dark/50">
          <span>© הדרן {new Date().getFullYear()}. כל הזכויות שמורות.</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-on-dark">מדיניות פרטיות</Link>
            <Link href="/terms" className="transition-colors hover:text-on-dark">תנאי שימוש</Link>
            <Link href="/accessibility" className="transition-colors hover:text-on-dark">נגישות</Link>
          </div>
          <span className="font-mono">hadran.net</span>
        </div>
      </div>

      <div aria-hidden="true" className="relative mx-auto -mb-[0.34em] mt-2 max-w-[1280px] text-center">
        <span className="block select-none whitespace-nowrap bg-gradient-to-b from-on-dark/20 to-on-dark/[0.02] bg-clip-text font-display text-[clamp(180px,26vw,380px)] font-black leading-none tracking-[-6px] text-transparent">
          הדרן
        </span>
      </div>
    </footer>
  )
}
