'use client'

import { useState } from 'react'

type Status = 'idle' | 'sending' | 'success' | 'error'

// טופס השארת פרטים — שולח לקולקציית contact-submissions ב-Payload
export function LeadForm({ source = 'home', dark = false }: { source?: 'home' | 'contact'; dark?: boolean }) {
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
        body: JSON.stringify({ ...data, source }),
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
      setError('אירעה שגיאה בשליחה. נסו שוב או התקשרו אלינו.')
    }
  }

  const inputCls = `h-[52px] rounded-full border-none bg-white px-5 text-[15px] text-ink outline-none placeholder:text-ash focus:ring-[3px] ${
    dark ? 'focus:ring-ink/35' : 'focus:ring-accent/30 border border-ink/15'
  }`

  if (status === 'success') {
    return (
      <div
        role="status"
        className={`rounded-2xl px-8 py-6 text-center text-lg font-bold ${
          dark ? 'bg-white/15 text-white' : 'bg-brand-green/15 text-brand-green-deeper'
        }`}
      >
        תודה! פרטיכם התקבלו — נציג כשר סייל יחזור אליכם בהקדם.
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col items-center gap-3" noValidate>
      <div className="flex w-full max-w-[760px] flex-wrap justify-center gap-2.5">
        <label className="sr-only" htmlFor={`lead-name-${source}`}>שם</label>
        <input id={`lead-name-${source}`} name="name" type="text" placeholder="שם" required className={`${inputCls} min-w-[160px] flex-1`} />
        <label className="sr-only" htmlFor={`lead-email-${source}`}>אימייל</label>
        <input id={`lead-email-${source}`} name="email" type="email" placeholder="אימייל" className={`${inputCls} min-w-[180px] flex-[1.2]`} />
        <label className="sr-only" htmlFor={`lead-phone-${source}`}>טלפון</label>
        <input id={`lead-phone-${source}`} name="phone" type="tel" placeholder="טלפון" required className={`${inputCls} min-w-[160px] flex-1`} />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="h-[52px] whitespace-nowrap rounded-full bg-dark px-8 font-semibold text-on-dark transition-colors hover:bg-deep disabled:opacity-60"
        >
          {status === 'sending' ? 'שולח…' : 'לשיחה עם נציג'}
        </button>
      </div>
      {status === 'error' && (
        <p role="alert" className={`m-0 text-sm font-semibold ${dark ? 'text-white' : 'text-accent'}`}>
          {error}
        </p>
      )}
    </form>
  )
}
