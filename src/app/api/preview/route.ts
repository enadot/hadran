import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

import { getPayloadClient } from '@/lib/payload'

/**
 * מסלול כניסה ל-Draft Mode עבור ה-Live Preview באדמין.
 * מאובטח: רק משתמש מחובר לאדמין (עוגיית payload-token) יכול לצפות בטיוטות.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const path = searchParams.get('path') || '/'

  // הגנה מפני open redirect — מסלולים פנימיים בלבד
  if (!path.startsWith('/') || path.startsWith('//')) {
    redirect('/')
  }

  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: req.headers })
  if (!user) {
    return new Response('נדרשת התחברות לאדמין כדי לצפות בטיוטות', { status: 403 })
  }

  const draft = await draftMode()
  draft.enable()
  redirect(path)
}
