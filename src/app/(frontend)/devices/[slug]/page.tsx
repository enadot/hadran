import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getPayloadClient, SERVER_URL } from '@/lib/payload'
import { breadcrumbSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { DevicesSection, type DeviceCard } from '@/components/sections/DevicesSection'

export const revalidate = 300

type Props = { params: Promise<{ slug: string }> }

async function getDevice(slug: string) {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'devices', where: { slug: { equals: slug } }, limit: 1, depth: 1 })
  return res.docs[0] || null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const device = await getDevice(slug).catch(() => null)
  if (!device) return {}
  return {
    title: `${device.name} כשר — עם הגנה צרובה בליבה`,
    description: `${device.shortDescription} — עם מערכת ההגנה של הדרן צרובה בליבת המכשיר, באישור ועדת הרבנים. לרכישה בחנויות המורשות.`,
    alternates: { canonical: `/devices/${device.slug}` },
  }
}

const OPEN_LIST = [
  'שיחות, הודעות ואנשי קשר',
  'וייז, מוביט ותחבורה ציבורית',
  'בנקים, ביטוח ותשלומים',
  'מאות אפליקציות מאושרות בחנות המבוקרת',
]
const BLOCKED_LIST = [
  'גלישה חופשית ורשתות חברתיות',
  'תוכן וידאו ומדיה פתוחה',
  'התקנת אפליקציות מחוץ לחנות',
  'הסרה או עקיפה של מערכת ההגנה',
]

// דף מכשיר — לפי Hadran Product.dc.html + Product schema
export default async function DevicePage({ params }: Props) {
  const { slug } = await params
  const device = await getDevice(slug).catch(() => null)
  if (!device) notFound()

  let related: DeviceCard[] = []
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'devices',
      where: { slug: { not_equals: slug } },
      limit: 3,
      sort: 'order',
    })
    related = res.docs.map((d) => ({
      id: d.id,
      name: d.name,
      slug: d.slug,
      shortDescription: d.shortDescription,
      imageUrl: typeof d.image === 'object' && d.image !== null ? d.image.url : null,
      imageAlt: typeof d.image === 'object' && d.image !== null ? d.image.alt : null,
    }))
  } catch {
    related = []
  }

  const imageUrl = typeof device.image === 'object' && device.image !== null ? device.image.url : null

  return (
    <>
      <JsonLd
        data={[
          {
            '@type': 'Product',
            name: `${device.name} — מכשיר כשר של הדרן`,
            description: device.shortDescription,
            ...(imageUrl ? { image: `${SERVER_URL}${imageUrl}` } : {}),
            brand: {
              '@type': 'Brand',
              name: typeof device.brand === 'object' && device.brand !== null ? device.brand.name : 'הדרן',
            },
          },
          breadcrumbSchema([
            { name: 'ראשי', path: '/' },
            { name: 'מכשירים נתמכים', path: '/devices' },
            { name: device.name, path: `/devices/${device.slug}` },
          ]),
        ]}
      />

      <nav aria-label="פירורי לחם" className="mx-auto flex max-w-[1280px] flex-wrap gap-2 px-5 pt-6 text-[13px] text-ash sm:px-8">
        <Link href="/" className="hover:text-ink">ראשי</Link>
        <span aria-hidden="true">/</span>
        <Link href="/devices" className="hover:text-ink">מכשירים נתמכים</Link>
        <span aria-hidden="true">/</span>
        <span className="font-semibold text-ink">{device.name}</span>
      </nav>

      <section className="mx-auto grid max-w-[1280px] items-start gap-10 px-5 pb-20 pt-10 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pb-24">
        <div className="flex flex-col gap-3">
          <div className="flex aspect-square items-center justify-center rounded-2xl border border-ink/12 bg-card">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageUrl} alt={device.name} className="h-full w-full rounded-2xl object-contain p-8" />
            ) : (
              <div className="flex aspect-square w-[70%] items-center justify-center rounded-xl bg-[repeating-linear-gradient(45deg,#f3f0e8_0_14px,#eee9dd_14px_28px)]">
                <span className="font-mono text-xs text-ash">תמונת מוצר · {device.name}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2.5">
            <span className="rounded-full border border-ink/12 bg-canvas px-3 py-1.5 text-xs font-semibold">מאושר ועדת הרבנים</span>
            <span className="rounded-full bg-brand-green-dark px-3 py-1.5 text-xs font-semibold text-on-dark">נתמך במלואו</span>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="m-0 font-display text-[40px] font-black leading-none tracking-[-1px] text-ink sm:text-[64px] sm:tracking-[-1.5px]">
              {device.name}
            </h1>
            <p className="m-0 mt-2 text-[17px] leading-relaxed text-body">
              {device.shortDescription} — עם מערכת ההגנה של הדרן צרובה בליבת המכשיר.
            </p>
          </div>

          <div className="rounded-xl bg-bone px-5 py-4 text-sm leading-relaxed text-body">
            הדרן אינה מוכרת מכשירים. הרכישה וההתאמה נעשות בחנויות המכירה והשירות המורשות — כולל צריבת מערכת
            ההגנה, נעילה ואחריות מעבדה.
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/stores" className="btn-brand flex-1 px-8 py-4 text-center">
              איתור חנות מורשית ←
            </Link>
            <Link
              href="/#protection"
              className="rounded-full border border-ink bg-card px-7 py-4 text-center font-semibold text-ink transition-colors hover:bg-bone"
            >
              על מערכת ההגנה
            </Link>
          </div>

          {Boolean(device.specs?.length) && (
            <dl className="m-0 flex flex-col border-t border-ink/12 pt-6">
              {device.specs!.map((s, i) => (
                <div
                  key={s.id || i}
                  className={`flex justify-between py-2.5 text-sm ${i < device.specs!.length - 1 ? 'border-b border-ink/8' : ''}`}
                >
                  <dt className="text-charcoal">{s.k}</dt>
                  <dd className="m-0 font-semibold">{s.v}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      <section className="bg-dark px-5 py-20 text-on-dark sm:px-8 lg:py-24">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-12">
          <h2 className="m-0 font-display text-[34px] font-black leading-none tracking-[-0.8px] text-on-dark sm:text-[56px] sm:tracking-[-1.2px]">
            מה פתוח. מה חסום.
            <br />
            שחור על גבי לבן.
          </h2>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="flex flex-col gap-4 rounded-xl bg-black p-8">
              <span className="text-sm font-bold text-brand-green-dark">פתוח ✓</span>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[15px] text-on-dark/85">
                {OPEN_LIST.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="flex flex-col gap-4 rounded-xl bg-black p-8">
              <span className="text-sm font-bold text-glow">חסום ✕</span>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[15px] text-on-dark/85">
                {BLOCKED_LIST.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {Boolean(related.length) && (
        <div className="bg-bone">
          <DevicesSection devices={related} title="אולי יתאים לכם יותר" />
        </div>
      )}
    </>
  )
}
