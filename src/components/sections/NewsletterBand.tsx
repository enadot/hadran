'use client'

import { useState } from 'react'

// פס הרשמה לעלון — לפי Hadran Magazine.dc.html; נשמר כפנייה מסוג newsletter
export function NewsletterBand() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const email = String(new FormData(e.currentTarget).get('email') || '').trim()
    if (!email) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'הרשמה לעלון', phone: '-', email, source: 'newsletter' }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="bg-bone px-5 py-20 sm:px-8">
      <div className="mx-auto flex max-w-[720px] flex-col items-center gap-4 text-center">
        <h2 className="m-0 font-display text-[32px] font-black leading-[1.02] tracking-[-0.8px] text-ink sm:text-[44px] sm:tracking-[-1px]">
          הדרן עלך — ישירות אליך
        </h2>
        <p className="m-0 text-base text-charcoal">עדכוני מערכת, מדריכים וחדשות כשרות — פעם בחודש, במייל.</p>
        {status === 'success' ? (
          <p role="status" className="m-0 mt-2 rounded-full bg-brand-green/15 px-6 py-3 font-bold text-brand-green-deeper">
            נרשמתם בהצלחה! ניפגש במייל.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-2 flex w-full max-w-[480px] gap-2.5">
            <label className="sr-only" htmlFor="newsletter-email">כתובת אימייל</label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              placeholder="כתובת אימייל"
              className="h-[52px] flex-1 rounded-full border border-ink/15 bg-card px-5 text-[15px] text-ink outline-none placeholder:text-ash focus:ring-[3px] focus:ring-accent/25"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="h-[52px] whitespace-nowrap rounded-full bg-dark px-7 text-[15px] font-semibold text-on-dark transition-colors hover:bg-deep disabled:opacity-60"
            >
              {status === 'sending' ? 'רושם…' : 'הרשמה'}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p role="alert" className="m-0 text-sm font-semibold text-accent">אירעה שגיאה, נסו שוב.</p>
        )}
      </div>
    </section>
  )
}
