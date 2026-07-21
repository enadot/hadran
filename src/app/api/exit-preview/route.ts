import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

/** יציאה מ-Draft Mode — חזרה לתוכן המפורסם בלבד */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const path = searchParams.get('path') || '/'

  const draft = await draftMode()
  draft.disable()
  redirect(path.startsWith('/') && !path.startsWith('//') ? path : '/')
}
