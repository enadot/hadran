import type { Metadata } from 'next'

import { getPayloadClient, getSiteSettings } from '@/lib/payload'
import { Hero } from '@/components/sections/Hero'
import { BrandStrip, type BrandItem } from '@/components/sections/BrandStrip'
import { KashrutSection } from '@/components/sections/KashrutSection'
import { ProtectionSection } from '@/components/sections/ProtectionSection'
import { DifferenceSection } from '@/components/sections/DifferenceSection'
import { SamsungMyth } from '@/components/sections/SamsungMyth'
import { ServiceTeaser } from '@/components/sections/ServiceTeaser'
import { DevicesSection, type DeviceCard } from '@/components/sections/DevicesSection'
import { ValuesSection } from '@/components/sections/ValuesSection'
import { Testimonials, type TestimonialItem } from '@/components/sections/Testimonials'
import { HomeFaq } from '@/components/sections/HomeFaq'
import { LeadSection } from '@/components/sections/LeadSection'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'הדרן — טכנולוגיה בהכשר | מערכת הגנה צרובה בליבת המכשיר',
  description:
    '140,000 משתמשים בחרו במערכת ההגנה של הדרן — היחידה שצרובה בליבת המכשיר לביטחון אמיתי ושקט דיגיטלי. בפיקוח ועדת הרבנים לענייני תקשורת שע״י בד״צ בני ברק.',
}

async function getHomeData() {
  try {
    const payload = await getPayloadClient()
    const [settings, brands, devices, testimonials] = await Promise.all([
      getSiteSettings(),
      payload.find({ collection: 'brands', limit: 20, sort: 'order' }),
      payload.find({ collection: 'devices', where: { featured: { equals: true } }, limit: 4, sort: 'order' }),
      payload.find({ collection: 'testimonials', where: { featured: { equals: true } }, limit: 8, sort: 'order' }),
    ])
    return { settings, brands: brands.docs, devices: devices.docs, testimonials: testimonials.docs }
  } catch {
    // עמוד הבית עולה גם לפני seed / כשה-DB לא זמין
    return { settings: null, brands: [], devices: [], testimonials: [] }
  }
}

const FALLBACK_TESTIMONIALS: TestimonialItem[] = [
  { quote: 'אחרי שנים של אפליקציות סינון שהילדים מצאו דרך לעקוף — סוף סוף שקט אמיתי. אין מה לעקוף.', name: 'משפחת גולדשטיין', city: 'בני ברק' },
  { quote: 'המכשיר עובד חלק, הסוללה מחזיקה, ואני יודעת בדיוק מה יש בו. זה השקט שחיפשנו.', name: 'רחל פ.', city: 'ירושלים' },
  { quote: 'רכשנו לכל העובדים במשרד. התקנה במקום, שירות מדהים, ואפס תקלות כבר שנה.', name: 'יעקב ל.', city: 'מודיעין עילית' },
  { quote: 'הרב שלנו המליץ, ומאז כל המשפחה עברה. ההבדל מסינון רגיל — שמיים וארץ.', name: 'משפחת ברוורמן', city: 'אשדוד' },
  { quote: 'כטכנאי לשעבר ניסיתי הכול. זו המערכת היחידה שבאמת אי אפשר לעקוף.', name: 'שמעון ד.', city: 'חיפה' },
]

export default async function HomePage() {
  const { settings, brands, devices, testimonials } = await getHomeData()

  const brandItems: BrandItem[] = brands.map((b) => ({
    name: b.name,
    logoPath:
      b.logoPath ||
      (typeof b.logo === 'object' && b.logo !== null && 'url' in b.logo ? (b.logo.url as string) : null),
    height: b.height,
  }))

  const deviceCards: DeviceCard[] = devices.map((d) => ({
    id: d.id,
    name: d.name,
    slug: d.slug,
    shortDescription: d.shortDescription,
    imageUrl: typeof d.image === 'object' && d.image !== null && 'url' in d.image ? (d.image.url as string) : null,
    imageAlt: typeof d.image === 'object' && d.image !== null && 'alt' in d.image ? (d.image.alt as string) : null,
  }))

  const testimonialItems: TestimonialItem[] = testimonials.length
    ? testimonials.map((t) => ({ quote: t.quote, name: t.name, city: t.city }))
    : FALLBACK_TESTIMONIALS

  return (
    <>
      <Hero userCount={settings?.stats?.userCount ?? 140000} />
      <BrandStrip brands={brandItems.length ? brandItems : undefined} />
      <KashrutSection />
      <ProtectionSection />
      <DifferenceSection />
      <SamsungMyth />
      <ServiceTeaser />
      <DevicesSection devices={deviceCards} />
      <ValuesSection />
      <Testimonials items={testimonialItems} />
      <HomeFaq />
      <LeadSection />
    </>
  )
}
