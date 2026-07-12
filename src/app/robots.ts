import type { MetadataRoute } from 'next'
import { SERVER_URL } from '@/lib/payload'

// robots.txt פתוח במפורש לכל סורקי ה-AI המובילים (GEO) — שום תוכן ציבורי אינו חסום
export default function robots(): MetadataRoute.Robots {
  const aiBots = [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-Web',
    'anthropic-ai',
    'Google-Extended',
    'PerplexityBot',
    'Perplexity-User',
    'CCBot',
    'Bytespider',
    'Amazonbot',
    'Applebot-Extended',
    'meta-externalagent',
  ]

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
      ...aiBots.map((bot) => ({
        userAgent: bot,
        allow: '/' as const,
        disallow: ['/admin', '/api/'],
      })),
    ],
    sitemap: `${SERVER_URL}/sitemap.xml`,
  }
}
