import { getPayload } from 'payload'
import config from '@payload-config'

// Local API — גישה ישירה למסד ללא HTTP
export async function getPayloadClient() {
  return getPayload({ config })
}

export async function getSiteSettings() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings' })
}

export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
