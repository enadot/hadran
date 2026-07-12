'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const NAV_ITEMS = [
  { label: 'מערכת ההגנה', href: '/#protection' },
  { label: 'מכשירים נתמכים', href: '/devices' },
  { label: 'חנויות מכירה ושירות', href: '/stores' },
  { label: 'כשרות', href: '/kashrut' },
  { label: 'הדרן עלך', href: '/magazine' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="sticky top-3 z-50 px-3 sm:px-5">
      <nav
        aria-label="ניווט ראשי"
        className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between rounded-[18px] border border-ink/8 bg-card ps-5 pe-3.5 shadow-[0_10px_30px_rgba(32,32,32,0.08)]"
      >
        <div className="flex items-center gap-4 lg:gap-9">
          <Link href="/" className="flex items-center px-2" aria-label="הדרן — לדף הבית">
            <Image src="/media/hadran-logo-color.svg" alt="הדרן" width={94} height={28} className="h-[30px] w-auto" priority />
          </Link>
          <div className="hidden items-center gap-1 text-sm font-semibold lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className="link-pill px-3.5 py-2.5 text-charcoal">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/stores" className="btn-brand hidden px-6 py-3 text-sm sm:inline-block">
            איתור חנות
          </Link>
          <button
            type="button"
            className="link-pill flex h-11 w-11 items-center justify-center text-ink lg:hidden"
            aria-expanded={open}
            aria-label={open ? 'סגירת תפריט' : 'פתיחת תפריט'}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>
      {open && (
        <div className="mx-auto mt-2 max-w-[1280px] rounded-[18px] border border-ink/8 bg-card p-4 shadow-[0_24px_60px_rgba(32,32,32,0.14)] lg:hidden">
          <div className="flex flex-col gap-1 text-base font-semibold">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="link-pill px-4 py-3 text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="link-pill px-4 py-3 text-ink" onClick={() => setOpen(false)}>
              יצירת קשר
            </Link>
            <Link href="/stores" className="btn-brand mt-2 px-6 py-3 text-center text-sm" onClick={() => setOpen(false)}>
              איתור חנות
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
