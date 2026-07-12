import type { Metadata } from 'next'
import Link from 'next/link'

import { getPayloadClient, SERVER_URL } from '@/lib/payload'
import { breadcrumbSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { StoresBrowser, type StoreCard } from '@/components/stores/StoresBrowser'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'חנויות מכירה ושירות בפריסה ארצית',
  description:
    'עשרות נקודות שירות ומכירה פרימיום של הדרן מצפון לדרום: מכירה, התאמה במקום ומעבדות אקספרס. מצאו את החנות המורשית הקרובה אליכם.',
}

// דף החנויות — לפי Hadran Service.dc.html + LocalBusiness schema לכל סניף
export default async function StoresPage() {
  let stores: StoreCard[] = []
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: 'stores', limit: 200, sort: 'city' })
    stores = res.docs.map((s) => ({
      id: s.id,
      name: s.name,
      city: s.city,
      region: s.region,
      address: s.address,
      phone: s.phone,
      hours: s.hours,
      fridayHours: s.fridayHours,
      hasLab: s.hasLab,
      flagship: s.flagship,
      mapsUrl: s.mapsUrl,
    }))
  } catch {
    stores = []
  }

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'ראשי', path: '/' }, { name: 'חנויות מכירה ושירות', path: '/stores' }]),
          ...stores.map((s) => ({
            '@type': 'LocalBusiness' as const,
            name: `הדרן — ${s.name}`,
            address: { '@type': 'PostalAddress', streetAddress: s.address, addressLocality: s.city, addressCountry: 'IL' },
            telephone: s.phone,
            parentOrganization: { '@id': `${SERVER_URL}/#organization` },
            ...(s.mapsUrl ? { hasMap: s.mapsUrl } : {}),
          })),
        ]}
      />

      <header className="px-5 pb-4 pt-16 text-center sm:px-8 sm:pt-24">
        <div className="mx-auto flex max-w-[900px] flex-col items-center gap-6">
          <span className="text-sm font-bold text-accent">
            {stores.length ? `${stores.length} חנויות מורשות ברחבי הארץ` : 'נקודות שירות ומכירה פרימיום'}
          </span>
          <h1 className="m-0 font-display text-[44px] font-black leading-none tracking-[-1px] text-ink sm:text-[88px] sm:tracking-[-2px]">
            חנויות מכירה ושירות
            <br />
            בפריסה ארצית
          </h1>
          <p className="m-0 max-w-[520px] text-lg leading-relaxed text-body">
            מכירה, התאמה ומעבדה — פנים אל פנים. מצאו את החנות המורשית הקרובה אליכם.
          </p>
        </div>
      </header>

      <div className="pt-8">
        <StoresBrowser stores={stores} />
      </div>

      <section className="bg-[radial-gradient(120%_160%_at_50%_-30%,#F19413_0%,#ea2804_62%,#c01f00_100%)] px-5 py-20 text-center sm:px-8 lg:py-24">
        <div className="mx-auto flex max-w-[800px] flex-col items-center gap-6">
          <h2 className="m-0 font-display text-[36px] font-black leading-none tracking-[-0.9px] text-white sm:text-[64px] sm:tracking-[-1.5px]">
            מגיעים. מתאימים. יוצאים עם שקט.
          </h2>
          <p className="m-0 text-[17px] leading-relaxed text-white/90">
            ההתאמה נעשית במקום, מול העיניים שלכם — כ-20 דקות ומכשיר מוכן.
          </p>
          <Link
            href="/devices"
            className="inline-block rounded-full bg-dark px-8 py-3.5 font-semibold text-on-dark transition-colors hover:bg-deep"
          >
            בדקו אילו מכשירים נתמכים ←
          </Link>
        </div>
      </section>
    </>
  )
}
