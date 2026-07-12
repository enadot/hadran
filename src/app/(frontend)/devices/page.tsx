import type { Metadata } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { breadcrumbSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { DevicesSection, type DeviceCard } from '@/components/sections/DevicesSection'
import { BrandStrip } from '@/components/sections/BrandStrip'
import { LeadSection } from '@/components/sections/LeadSection'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'מכשירים נתמכים — סמארטפונים כשרים עם הגנה צרובה בליבה',
  description:
    'כל המכשירים הנתמכים במערכת ההגנה של הדרן: Samsung Galaxy, Google Pixel, Xiaomi, OnePlus ו-Infinix. מאושרים על ידי ועדת הרבנים, לרכישה בחנויות המורשות בלבד.',
}

export default async function DevicesPage() {
  let devices: DeviceCard[] = []
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: 'devices', limit: 100, sort: 'order' })
    devices = res.docs.map((d) => ({
      id: d.id,
      name: d.name,
      slug: d.slug,
      shortDescription: d.shortDescription,
      imageUrl: typeof d.image === 'object' && d.image !== null ? d.image.url : null,
      imageAlt: typeof d.image === 'object' && d.image !== null ? d.image.alt : null,
    }))
  } catch {
    devices = []
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'ראשי', path: '/' }, { name: 'מכשירים נתמכים', path: '/devices' }])} />
      <header className="px-5 pb-4 pt-16 text-center sm:px-8 sm:pt-24">
        <div className="mx-auto flex max-w-[900px] flex-col items-center gap-6">
          <span className="text-sm font-bold text-accent">הכי הרבה מותגים, הכי הרבה הגנה</span>
          <h1 className="m-0 font-display text-[44px] font-black leading-none tracking-[-1px] text-ink sm:text-[80px] sm:tracking-[-1.8px]">
            מכשירים נתמכים
          </h1>
          <p className="m-0 max-w-[560px] text-lg leading-relaxed text-body">
            מערכת ההגנה של הדרן נצרבת במגוון הרחב ביותר של מכשירים בשוק הכשר. הרכישה וההתאמה — בחנויות המורשות
            בלבד, כולל התקנה במקום.
          </p>
        </div>
      </header>
      <BrandStrip />
      {devices.length ? (
        <DevicesSection devices={devices} title="כל המכשירים" />
      ) : (
        <p className="px-5 py-16 text-center text-charcoal">קטלוג המכשירים יעודכן בקרוב.</p>
      )}
      <LeadSection />
    </>
  )
}
