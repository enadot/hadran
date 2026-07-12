'use client'

import { useEffect, useRef, useState } from 'react'

export type TestimonialItem = { quote: string; name: string; city?: string | null }

// קרוסלת עדויות משפחות — לפי Hadran Home.dc.html
export function Testimonials({ items }: { items: TestimonialItem[] }) {
  const [index, setIndex] = useState(0)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (items.length < 2) return
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % items.length)
    }, 5000)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [items.length])

  if (!items.length) return null

  const go = (i: number) => {
    const n = items.length
    setIndex(((i % n) + n) % n)
    if (timer.current) clearInterval(timer.current)
  }

  const t = items[index]

  return (
    <section id="testimonials" className="bg-canvas px-5 pb-24 pt-8 sm:px-8">
      <div className="mx-auto flex max-w-[920px] flex-col items-center gap-11">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="rounded-full border border-accent/35 px-5 py-2 text-sm font-bold text-accent">
            שקט נפשי דיגיטלי
          </span>
          <h2 className="m-0 font-display text-[32px] font-black leading-[1.05] tracking-[-0.8px] text-ink sm:text-[56px] sm:leading-[1.02] sm:tracking-[-1.3px]">
            מעל 140,000 משפחות כבר בחרו בשקט של הדרן
          </h2>
        </div>

        <div className="flex w-full items-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="העדות הקודמת"
            className="h-12 w-12 flex-shrink-0 rounded-full border border-ink/15 bg-card text-lg text-ink transition-colors hover:bg-bone"
          >
            ›
          </button>
          <figure
            aria-live="polite"
            className="m-0 flex min-h-[220px] flex-1 flex-col gap-7 rounded-2xl border border-ink/10 bg-card p-8 shadow-[0_12px_32px_rgba(32,32,32,0.07)] sm:p-12"
          >
            <blockquote className="m-0 font-display text-xl font-semibold leading-normal text-ink sm:text-[26px]">
              {`"${t.quote}"`}
            </blockquote>
            <figcaption className="mt-auto flex items-center gap-3.5">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-bl from-brand-orange to-accent text-lg font-bold text-white"
              >
                {t.name.charAt(0)}
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-[15px] font-bold text-ink">{t.name}</span>
                {t.city && <span className="text-[13px] text-ash">{t.city}</span>}
              </span>
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="העדות הבאה"
            className="h-12 w-12 flex-shrink-0 rounded-full border border-ink/15 bg-card text-lg text-ink transition-colors hover:bg-bone"
          >
            ‹
          </button>
        </div>

        <div className="flex gap-2.5" role="tablist" aria-label="בחירת עדות">
          {items.map((item, i) => (
            <button
              key={item.name + i}
              type="button"
              onClick={() => go(i)}
              aria-label={`עדות ${i + 1}`}
              aria-current={i === index}
              className="h-2.5 w-2.5 rounded-full transition-colors"
              style={{ background: i === index ? '#ea2804' : 'rgba(32,32,32,0.18)' }}
            />
          ))}
        </div>

        <p className="m-0 text-center text-[15px] text-charcoal">
          הצטרפו לאלפי משפחות שנהנות מחיים דיגיטליים בטוחים, מוגנים וכשרים — ללא דאגות.
        </p>
      </div>
    </section>
  )
}
