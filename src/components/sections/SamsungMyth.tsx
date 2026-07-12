'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

// כרטיס מתהפך "עובדות מול מיתוסים" — לפי Hadran Home.dc.html
export function SamsungMyth() {
  const [flipped, setFlipped] = useState(false)

  return (
    <section id="samsung-myth" className="bg-bone px-5 py-20 sm:px-8 lg:py-[104px]">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-[72px]">
        <div className="flex flex-col items-start gap-5">
          <span className="rounded-full border border-ink/20 bg-card px-5 py-2 text-sm font-bold text-ink">
            עובדות מול מיתוסים
          </span>
          <h2 className="m-0 font-display text-[32px] font-black leading-[1.08] tracking-[-0.7px] text-ink sm:text-[52px] sm:leading-[1.04] sm:tracking-[-1.2px]">
            האם רק פתרון אחד מאושר למכשירי סמסונג?
            <br />
            <span className="text-accent">הגיע הזמן לדעת את העובדות.</span>
          </h2>
          <p className="m-0 max-w-[560px] text-base leading-7 text-body">
            בעבר, ייתכן שחברות מסוימות טענו לבלעדיות באישור סמסונג. כיום, הטכנולוגיה של הדרן עומדת בסטנדרטים
            הגבוהים ביותר ומספקת פתרון מאושר ויציב למכשירי סמסונג — ללא פשרות על כשרות וביצועים.
          </p>
          <Link
            href="/devices"
            className="inline-block rounded-full bg-dark px-7 py-3 text-[15px] font-semibold text-on-dark transition-colors hover:bg-deep"
          >
            למד עוד על שיתופי הפעולה הטכנולוגיים ←
          </Link>
        </div>

        <div className="flex justify-center [perspective:1200px]">
          <button
            type="button"
            onClick={() => setFlipped((v) => !v)}
            aria-pressed={flipped}
            aria-label={flipped ? 'הצגת המיתוס' : 'גילוי העובדה'}
            className="relative h-[420px] w-full max-w-[380px] cursor-pointer [transform-style:preserve-3d] transition-transform duration-700 [transition-timing-function:cubic-bezier(0.3,0.8,0.3,1)]"
            style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 rounded-2xl border border-ink/12 bg-card p-9 text-center shadow-[0_16px_40px_rgba(32,32,32,0.10)] [backface-visibility:hidden]">
              <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full border-2 border-dashed border-accent/40">
                <span className="font-display text-[56px] font-black text-accent">?</span>
              </div>
              <span className="text-xl font-bold text-ink">{'"רק פתרון אחד מאושר לסמסונג"'}</span>
              <span className="text-sm text-ash">מיתוס נפוץ בשוק</span>
              <span className="text-[13px] font-bold text-accent">לחצו לגילוי האמת ←</span>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 rounded-2xl bg-dark p-9 text-center shadow-[0_16px_40px_rgba(32,32,32,0.18)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <Image
                src="/media/kashrut_stamp.svg"
                alt=""
                aria-hidden="true"
                width={96}
                height={99}
                className="h-auto w-24 invert"
              />
              <span className="text-xl font-bold text-on-dark">הדרן מאושרת ויציבה למכשירי Samsung</span>
              <span className="text-sm leading-relaxed text-on-dark/70">
                בסטנדרטים הגבוהים ביותר, בפיקוח ועדת הרבנים — ללא פשרות על כשרות וביצועים.
              </span>
              <span className="rounded-full bg-brand-green/16 px-4 py-1.5 text-xs font-bold text-brand-green-dark">
                עובדה ✓
              </span>
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}
