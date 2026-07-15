'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

// כותרת הירו עם מונה משתמשים חי, חותמת גרדיאנט על "מערכת הגנה" — לפי Hadran Home.dc.html
export function Hero({ userCount = 140000 }: { userCount?: number }) {
  const [count, setCount] = useState(0)
  const done = useRef(false)

  useEffect(() => {
    if (done.current) return
    done.current = true
    const dur = 1600
    const steps = 40
    let i = 0
    const timer = setInterval(() => {
      i++
      const p = Math.min(1, i / steps)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(userCount * eased))
      if (p >= 1) clearInterval(timer)
    }, dur / steps)
    const final = setTimeout(() => setCount(userCount), dur + 400)
    return () => {
      clearInterval(timer)
      clearTimeout(final)
    }
  }, [userCount])

  return (
    <header className="overflow-hidden bg-[radial-gradient(70%_110%_at_78%_-20%,rgba(244,168,160,0.55)_0%,rgba(255,106,61,0.18)_45%,rgba(249,247,243,0)_75%)] px-5 pb-16 pt-14 sm:px-8 sm:pb-[72px] sm:pt-[88px]">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
        <div className="flex flex-col items-start gap-7">
          <h1 className="m-0 font-display text-[44px] font-black leading-[1.05] tracking-[-1px] text-ink sm:text-[64px] sm:tracking-[-1.5px] xl:text-[84px] xl:leading-[1.02] xl:tracking-[-1.8px]">
            <span className="whitespace-nowrap">
              <span className="font-mono text-[0.9em] font-bold tracking-[-3px]" dir="ltr">
                {count.toLocaleString('en-US')}
              </span>{' '}
              משתמשים
            </span>
            <br />
            <span className="whitespace-nowrap">
              בחרו{' '}
              <span className="relative inline-block px-3">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-[-4px] bottom-[2px] top-[6px] z-0 origin-right rounded-md bg-gradient-to-bl from-brand-orange to-accent [animation:hadranStampIn_0.7s_cubic-bezier(0.2,0.8,0.2,1)_0.4s_both]"
                />
                <span className="relative z-10 bg-[linear-gradient(105deg,#ffffff_40%,#ffd9cc_50%,#ffffff_60%)] bg-[length:200%_100%] bg-clip-text text-transparent [animation:hadranShieldSweep_3.2s_linear_1.2s_infinite]">
                  מערכת הגנה
                </span>
              </span>
            </span>
          </h1>
          <p className="m-0 max-w-[540px] text-[17px] leading-relaxed text-body sm:text-[19px]">
            היחידה עם מערכת הגנה צרובה בליבת המכשיר — לביטחון אמיתי ושקט דיגיטלי.
          </p>
          <Link
            href="/devices"
            className="group flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-glow/25 bg-white/80 py-3.5 pe-5 ps-3.5 shadow-[0_10px_30px_rgba(234,40,4,0.10)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-glow/50 hover:shadow-[0_14px_36px_rgba(234,40,4,0.18)]"
          >
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-bl from-brand-orange to-accent px-3 py-1 text-[13px] font-black text-white">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-white [animation:hadranBlink_1.6s_ease-in-out_infinite]" />
              חדש!
            </span>
            <span className="text-[15px] font-semibold leading-snug text-ink sm:text-[16px]">
              סדרות שיאומי האהובות עכשיו במכשירים מוכנים צרובי הדרן!
            </span>
            <span className="text-[15px] font-bold text-accent transition group-hover:text-accent-deep sm:text-[16px]">
              למשלוח עד הבית ‹
            </span>
          </Link>
          <Link href="/devices" className="btn-brand px-9 py-4 text-[17px]">
            קחו אותי להדרן שלי ←
          </Link>
        </div>
        <div className="relative hidden items-center justify-center lg:flex">
          <div
            aria-hidden="true"
            className="absolute aspect-square w-[80%] rounded-full bg-[radial-gradient(circle,rgba(255,106,61,0.35)_0%,rgba(244,168,160,0.2)_45%,rgba(249,247,243,0)_70%)]"
          />
          <Image
            src="/media/kashrut_stamp.svg"
            alt="חותמת הכשרות של ועדת הרבנים לענייני תקשורת"
            width={170}
            height={176}
            className="absolute left-[-24px] top-[8%] z-0 w-[170px] opacity-90 [animation:hadranFloat_5s_ease-in-out_infinite]"
          />
          {/* ליבת ההגנה — ויזואל CSS במקום תמונת המכשיר (התמונה תעלה דרך ה-CMS) */}
          <div className="relative z-10 flex aspect-[3/4] w-full max-w-[380px] items-center justify-center">
            <div className="absolute h-[340px] w-[340px] rounded-full border border-ink/10 [animation:hadranPulse_3.6s_ease-out_infinite]" />
            <div className="absolute h-[340px] w-[340px] rounded-full border border-ink/10 [animation:hadranPulse_3.6s_ease-out_1.8s_infinite]" />
            <div className="absolute h-[250px] w-[250px] rounded-full border border-dashed border-glow/40 [animation:hadranSpin_24s_linear_infinite]" />
            <div className="relative flex h-[170px] w-[170px] items-center justify-center rounded-full border border-ink/10 bg-[radial-gradient(circle_at_35%_30%,#2e2e2e,#000000)] shadow-[0_0_80px_rgba(234,40,4,0.35)]">
              <div
                aria-hidden="true"
                className="h-[86px] w-[82px] bg-accent [mask-image:url('/media/icon.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
