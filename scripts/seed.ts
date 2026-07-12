/**
 * סקריפט Seed — מזין את מסד הנתונים בתוכן התחלתי:
 * טקסטים אמיתיים של הדרן + חנויות/מאמרים/עדויות לדוגמה (להחלפה באדמין).
 *
 * הרצה: pnpm seed   (דורש DATABASE_URL + PAYLOAD_SECRET ב-.env)
 *
 * הלוגיקה עצמה נמצאת ב-src/lib/seed.ts ומשותפת גם למיגרציית ה-seed
 * שרצה אוטומטית בפריסה ל-Vercel.
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import { seedDatabase } from '../src/lib/seed'

async function run() {
  const payload = await getPayload({ config })
  await seedDatabase(payload)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
