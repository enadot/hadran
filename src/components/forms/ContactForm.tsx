'use client'

import { useState } from 'react'

type Status = 'idle' | 'sending' | 'success' | 'error'

// טופס יצירת קשר מלא — כולל שדה הודעה; שולח ל-Payload דרך /api/contact
export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    if (!String(data.name || '').trim() || !String(data.phone || '').trim()) {
      setError('נא למלא שם וטלפון')
      setStatus('error')
      return
    }

    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'contact' }),
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
      setError('אירעה שגיאה בשליחה. נסו שוב או התקשרו אלינו.')
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-2xl bg-brand-green/15 px-8 py-6 text-center text-lg font-bold text-brand-green-deeper">
        תודה! פנייתכם התקבלה — נחזור אליכם בהקדם.
      </div>
    )
  }

  const inputCls =
    'w-full rounded-full border border-ink/15 bg-white px-5 text-[15px] text-ink outline-none placeholder:text-ash focus:ring-[3px] focus:ring-accent/25 h-[52px]'

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3.5" noValidate>
      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label className="sr-only" htmlFor="contact-name">שם מלא</label>
          <input id="contact-name" name="name" type="text" placeholder="שם מלא *" required className={inputCls} />
        </div>
        <div>
          <label className="sr-only" htmlFor="contact-phone">טלפון נייד</label>
          <input id="contact-phone" name="phone" type="tel" placeholder="טלפון נייד *" required className={inputCls} />
        </div>
      </div>
      <div>
        <label className="sr-only" htmlFor="contact-email">אימייל</label>
        <input id="contact-email" name="email" type="email" placeholder="אימייל" className={inputCls} />
      </div>
      <div>
        <label className="sr-only" htmlFor="contact-message">הודעה</label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="איך נוכל לעזור?"
          rows={4}
          className="w-full rounded-3xl border border-ink/15 bg-white px-5 py-4 text-[15px] text-ink outline-none placeholder:text-ash focus:ring-[3px] focus:ring-accent/25"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-brand h-[52px] px-8 text-base disabled:opacity-60"
      >
        {status === 'sending' ? 'שולח…' : 'שליחת פנייה'}
      </button>
      {status === 'error' && (
        <p role="alert" className="m-0 text-sm font-semibold text-accent">{error}</p>
      )}
    </form>
  )
}
