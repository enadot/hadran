import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

import { seedDatabase } from '../lib/seed'

/**
 * מיגרציית Seed — מזינה תוכן התחלתי (משתמש אדמין, הגדרות אתר, חנויות,
 * מכשירים, מאמרים ועמודים). הלוגיקה אידמפוטנטית: רשומות קיימות לא נדרסות,
 * כך שהרצות חוזרות בטוחות.
 */
export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await seedDatabase(payload)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // אין צורך בהסרת תוכן — מחיקה נעשית דרך האדמין בלבד
}
