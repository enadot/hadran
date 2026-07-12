import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

const VALID_SOURCES = new Set(['home', 'contact', 'newsletter'])

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }

  const name = String(body.name || '').trim()
  const phone = String(body.phone || '').trim()
  const email = String(body.email || '').trim()
  const message = String(body.message || '').trim()
  const source = VALID_SOURCES.has(String(body.source)) ? String(body.source) : 'home'

  if (!name || !phone) {
    return NextResponse.json({ error: 'נא למלא שם וטלפון' }, { status: 400 })
  }
  if (name.length > 200 || phone.length > 40 || email.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: 'קלט ארוך מדי' }, { status: 400 })
  }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'contact-submissions',
      data: {
        name,
        phone,
        ...(email ? { email } : {}),
        ...(message ? { message } : {}),
        source: source as 'home' | 'contact' | 'newsletter',
      },
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('contact submission failed', err)
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }
}
