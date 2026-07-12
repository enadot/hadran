import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 px-5 py-24 text-center">
      <span className="font-mono text-sm font-bold text-accent">404</span>
      <h1 className="m-0 font-display text-[44px] font-black leading-none tracking-[-1px] text-ink sm:text-[64px]">
        הדף לא נמצא
      </h1>
      <p className="m-0 max-w-[420px] text-base text-charcoal">
        ייתכן שהדף הועבר או שהכתובת שגויה. האתר בתהליך שדרוג — עמכם הסליחה.
      </p>
      <Link href="/" className="btn-brand px-8 py-3.5">
        חזרה לדף הבית ←
      </Link>
    </div>
  )
}
