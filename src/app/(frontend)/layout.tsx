import type { Metadata } from 'next'
import React from 'react'

import { almoniNeue, almoniTzar, jetbrains } from '@/lib/fonts'
import { getSiteSettings, SERVER_URL } from '@/lib/payload'
import { organizationSchema, webSiteSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { UpgradeBanner } from '@/components/layout/UpgradeBanner'

import './styles.css'

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(SERVER_URL),
    title: {
      default: 'הדרן — טכנולוגיה בהכשר | מערכת הגנה צרובה בליבת המכשיר',
      template: '%s | הדרן — טכנולוגיה בהכשר',
    },
    description:
      'הדרן — מערכת ההגנה היחידה שצרובה בליבת המכשיר, בפיקוח ועדת הרבנים לענייני תקשורת שע״י בד״צ בני ברק. 140,000 משתמשים כבר בחרו בשקט דיגיטלי אמיתי.',
    openGraph: {
      type: 'website',
      locale: 'he_IL',
      siteName: 'הדרן — טכנולוגיה בהכשר',
    },
    alternates: { canonical: './' },
  }
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  let settings: Awaited<ReturnType<typeof getSiteSettings>> | null = null
  try {
    settings = await getSiteSettings()
  } catch {
    // האתר נטען גם אם ההגדרות עדיין לא נזרעו
  }

  const upgradeNotice = settings?.upgradeNotice?.enabled ? settings?.upgradeNotice?.text : null

  return (
    <html lang="he" dir="rtl" className={`${almoniTzar.variable} ${almoniNeue.variable} ${jetbrains.variable}`}>
      <body>
        <JsonLd
          data={[
            organizationSchema({ phone: settings?.contact?.phone, email: settings?.contact?.email }),
            webSiteSchema(),
          ]}
        />
        <a href="#main-content" className="skip-link">
          דילוג לתוכן הראשי
        </a>
        <UpgradeBanner text={upgradeNotice} />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
