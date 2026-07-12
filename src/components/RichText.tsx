import {
  RichText as LexicalRichText,
  type JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { JsonLd } from '@/components/seo/JsonLd'
import { faqSchema } from '@/lib/schema'

type BlockFields = Record<string, any>

function DirectAnswer({ fields }: { fields: BlockFields }) {
  return (
    <section className="my-8">
      <h2 className="!mt-0">{fields.question}</h2>
      {/* מענה ישיר 40–60 מילים — מסומן כתקציר עבור מנועי AI */}
      <p className="rounded-2xl border-s-4 border-brand-orange bg-bone px-6 py-5 text-[17px] font-medium leading-7 text-ink">
        {fields.answer}
      </p>
    </section>
  )
}

function FaqBlock({ fields }: { fields: BlockFields }) {
  const items: { question: string; answer: string }[] = (fields.items || []).map((i: BlockFields) => ({
    question: i.question,
    answer: i.answer,
  }))
  if (!items.length) return null
  return (
    <section className="my-10">
      <JsonLd data={faqSchema(items)} />
      <h2>{fields.title || 'שאלות נפוצות'}</h2>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <details key={item.question} className="group rounded-2xl border border-ink/10 bg-card px-6 py-1 open:pb-4">
            <summary className="cursor-pointer list-none py-3.5 text-lg font-bold text-ink marker:content-none">
              <span className="flex items-center justify-between gap-4">
                {item.question}
                <span aria-hidden="true" className="text-accent transition-transform group-open:rotate-45">＋</span>
              </span>
            </summary>
            <p className="!mb-2">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

const INSIGHT_LABELS: Record<string, string> = {
  data: 'נתון מקורי',
  caseStudy: 'מקרה בוחן',
  tip: 'טיפ מניסיון',
}

function Insight({ fields }: { fields: BlockFields }) {
  return (
    <aside className="my-8 rounded-2xl bg-dark p-7 text-on-dark">
      <span className="mb-3 inline-block rounded-full bg-glow/16 px-4 py-1 text-xs font-bold text-glow">
        {INSIGHT_LABELS[fields.kind] || 'תובנה'}
      </span>
      <h3 className="m-0 mb-2 font-display text-2xl font-black text-on-dark">{fields.title}</h3>
      <p className="m-0 text-[15px] leading-7 text-on-dark/75">{fields.body}</p>
      {fields.source && <p className="m-0 mt-3 font-mono text-xs text-on-dark/50">מקור: {fields.source}</p>}
    </aside>
  )
}

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    directAnswer: ({ node }: { node: { fields: BlockFields } }) => <DirectAnswer fields={node.fields} />,
    faq: ({ node }: { node: { fields: BlockFields } }) => <FaqBlock fields={node.fields} />,
    insight: ({ node }: { node: { fields: BlockFields } }) => <Insight fields={node.fields} />,
  },
})

export function RichText({ data, className = '' }: { data: SerializedEditorState; className?: string }) {
  if (!data) return null
  return <LexicalRichText data={data} converters={converters} className={`rich-text ${className}`} />
}
