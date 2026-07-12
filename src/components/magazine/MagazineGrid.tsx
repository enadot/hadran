'use client'

import { useState } from 'react'
import { ArticleCard, CATEGORY_LABELS, type ArticleCardData } from './ArticleCard'

// רשת כתבות עם סינון קטגוריות — לפי Hadran Magazine.dc.html
export function MagazineGrid({ articles }: { articles: ArticleCardData[] }) {
  const [cat, setCat] = useState<string>('all')

  const cats = ['all', ...Object.keys(CATEGORY_LABELS).filter((c) => articles.some((a) => a.category === c))]
  const filtered = cat === 'all' ? articles : articles.filter((a) => a.category === cat)

  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-wrap gap-2" role="group" aria-label="סינון לפי קטגוריה">
        {cats.map((c) => {
          const active = c === cat
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              aria-pressed={active}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                active ? 'border border-dark bg-dark text-on-dark' : 'border border-ink/15 bg-card text-ink hover:bg-bone'
              }`}
            >
              {c === 'all' ? 'הכל' : CATEGORY_LABELS[c]}
            </button>
          )
        })}
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>
      {!filtered.length && <p className="text-center text-charcoal">אין כתבות בקטגוריה זו עדיין.</p>}
    </div>
  )
}
