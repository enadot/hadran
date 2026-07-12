import { SERVER_URL } from './payload'

// סכמות Schema.org משותפות — Organization, WebSite, Breadcrumbs

export function organizationSchema(opts?: { phone?: string | null; email?: string | null }) {
  return {
    '@type': 'Organization',
    '@id': `${SERVER_URL}/#organization`,
    name: 'הדרן',
    alternateName: 'Hadran',
    url: SERVER_URL,
    logo: `${SERVER_URL}/media/hadran-logo-color.svg`,
    slogan: 'טכנולוגיה בהכשר. הגנה צרובה בליבת המכשיר.',
    description:
      'הדרן היא חברה מובילה בתחום פתרונות הטכנולוגיה המוגנת לציבור החרדי והדתי. החברה מספקת מערכות הגנה וסינון למכשירי אנדרואיד, בפיקוח ועדת הרבנים לענייני תקשורת שע״י בד״צ בני ברק.',
    foundingDate: '2014',
    areaServed: 'IL',
    ...(opts?.phone
      ? {
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: opts.phone,
            contactType: 'customer service',
            availableLanguage: ['he'],
            ...(opts.email ? { email: opts.email } : {}),
          },
        }
      : {}),
  }
}

export function webSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${SERVER_URL}/#website`,
    url: SERVER_URL,
    name: 'הדרן — טכנולוגיה בהכשר',
    inLanguage: 'he',
    publisher: { '@id': `${SERVER_URL}/#organization` },
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SERVER_URL}${item.path}`,
    })),
  }
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}
