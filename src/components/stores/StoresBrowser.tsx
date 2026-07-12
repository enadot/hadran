'use client'

import { useState } from 'react'

export type StoreCard = {
  id: string | number
  name: string
  city: string
  region: string
  address: string
  phone: string
  hours: string
  fridayHours?: string | null
  hasLab?: boolean | null
  flagship?: boolean | null
  mapsUrl?: string | null
}

const REGIONS: { value: string; label: string }[] = [
  { value: 'all', label: 'הכל' },
  { value: 'jerusalem', label: 'ירושלים והסביבה' },
  { value: 'center', label: 'מרכז' },
  { value: 'south', label: 'דרום' },
  { value: 'north', label: 'צפון' },
]

// חיפוש + סינון אזורים + רשת סניפים — לפי Hadran Service.dc.html
export function StoresBrowser({ stores }: { stores: StoreCard[] }) {
  const [region, setRegion] = useState('all')
  const [query, setQuery] = useState('')

  const q = query.trim()
  const filtered = stores
    .filter((s) => region === 'all' || s.region === region)
    .filter((s) => !q || s.city.includes(q) || s.address.includes(q) || s.name.includes(q))

  return (
    <>
      <div className="mx-auto flex w-full max-w-[900px] flex-col items-center gap-7 px-5">
        <label className="sr-only" htmlFor="store-search">חיפוש לפי עיר או שכונה</label>
        <input
          id="store-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="חיפוש לפי עיר או שכונה…"
          className="h-[52px] w-full max-w-[480px] rounded-full border border-ink/25 bg-card px-6 text-base text-ink outline-none placeholder:text-ash focus:border-ink focus:ring-[3px] focus:ring-blue-500/50"
        />
        <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="סינון לפי אזור">
          {REGIONS.map((r) => {
            const active = r.value === region
            return (
              <button
                key={r.value}
                type="button"
                onClick={() => setRegion(r.value)}
                aria-pressed={active}
                className={`rounded-full px-5 py-2 text-[13px] font-semibold transition-colors ${
                  active ? 'border border-dark bg-dark text-on-dark' : 'border border-ink/25 bg-card text-ink hover:bg-bone'
                }`}
              >
                {r.label}
              </button>
            )
          })}
        </div>
      </div>

      <section aria-label="רשימת סניפים" className="mt-10 bg-bone px-5 py-16 sm:px-8 lg:pb-24">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((store) => (
            <div key={store.id} className="flex flex-col gap-3.5 rounded-xl bg-card p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <h2 className="m-0 font-display text-[26px] font-black leading-tight tracking-[-0.5px] text-ink">
                    {store.name}
                  </h2>
                  <span className="text-sm text-charcoal">{store.address}</span>
                </div>
                {store.flagship ? (
                  <span className="btn-brand whitespace-nowrap px-3 py-1 text-[11px]">סניף דגל</span>
                ) : (
                  <span className="whitespace-nowrap rounded-full border border-ink/12 bg-canvas px-3 py-1 text-[11px] font-semibold text-charcoal">
                    חנות מורשית
                  </span>
                )}
              </div>
              <dl className="m-0 flex flex-col gap-1.5 border-t border-ink/8 pt-3 font-mono text-xs text-mute">
                <div className="flex justify-between">
                  <dt>א׳–ה׳</dt>
                  <dd className="m-0" dir="ltr">{store.hours}</dd>
                </div>
                {store.fridayHours && (
                  <div className="flex justify-between">
                    <dt>ו׳ וערב חג</dt>
                    <dd className="m-0" dir="ltr">{store.fridayHours}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt>טלפון</dt>
                  <dd className="m-0">
                    <a href={`tel:${store.phone.replace(/[^\d+]/g, '')}`} dir="ltr" className="hover:text-accent">
                      {store.phone}
                    </a>
                  </dd>
                </div>
              </dl>
              <div className="mt-auto flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-ink/12 bg-canvas px-3 py-1 text-[11px]">מכירה</span>
                {store.hasLab && (
                  <span className="rounded-full bg-dark px-3 py-1 text-[11px] text-on-dark">מעבדה</span>
                )}
                {store.mapsUrl && (
                  <a
                    href={store.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ms-auto text-[12px] font-bold text-accent hover:text-accent-deep"
                  >
                    ניווט בגוגל מפות ←
                  </a>
                )}
              </div>
            </div>
          ))}
          {!filtered.length && (
            <p className="col-span-full text-center text-charcoal">לא נמצאו סניפים תואמים — נסו חיפוש אחר.</p>
          )}
        </div>
      </section>
    </>
  )
}
