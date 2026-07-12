# אתר הדרן — Hadran.net

אתר תדמית מלא לחברת **הדרן** ("טכנולוגיה בהכשר") — בנוי על Next.js 15 (App Router) עם **Payload CMS 3** משולב באותה אפליקציה, Postgres, Tailwind CSS v4, עברית RTL מלאה, ואופטימיזציה מקיפה ל-SEO ול-**GEO** (מנועי חיפוש מבוססי AI).

## סטאק

| שכבה | טכנולוגיה |
|---|---|
| Frontend | Next.js 15 (App Router, RSC, TypeScript) |
| CMS | Payload 3 (משולב — אדמין ב-`/admin`, Local API ללא HTTP) |
| DB | PostgreSQL (`@payloadcms/db-postgres`) — Neon/Supabase בפרודקשן |
| עיצוב | Tailwind CSS v4, טוקנים לפי מערכת העיצוב של הדרן |
| גופנים | Almoni Tzar (כותרות) + Almoni Neue (טקסט) — self-hosted, `next/font/local` |
| תוכן עשיר | Lexical + בלוקים מותאמים (FAQ, מענה ישיר, ערך מוסף) |

## התקנה והרצה מקומית

דרישות: Node 20+, pnpm, PostgreSQL (מקומי או מרוחק).

```bash
# 1. תלויות
pnpm install

# 2. סביבה
cp .env.example .env
# ערכו את DATABASE_URL ו-PAYLOAD_SECRET

# 3. יצירת מסד (אם מקומי)
createdb hadran

# 4. זריעת סכמה + תוכן התחלתי
pnpm seed
# יוצר גם משתמש אדמין: admin@hadran.net / hadran123! — החליפו סיסמה מיד

# 5. הרצה
pnpm dev          # http://localhost:3000  |  אדמין: http://localhost:3000/admin
```

בסביבת פיתוח Payload מסנכרן את סכמת ה-DB אוטומטית (push mode). לפרודקשן ראו "פריסה" למטה.

## משתני סביבה

| משתנה | תיאור |
|---|---|
| `DATABASE_URL` | חיבור Postgres, למשל `postgresql://user:pass@host:5432/hadran` |
| `PAYLOAD_SECRET` | מחרוזת אקראית ארוכה (הצפנת סשנים) |
| `NEXT_PUBLIC_SERVER_URL` | כתובת האתר המלאה — משמשת ל-sitemap, canonical ו-JSON-LD |

## מבנה הפרויקט

```
src/
├── app/
│   ├── (frontend)/          # האתר הציבורי
│   │   ├── page.tsx         # דף הבית
│   │   ├── kashrut/         # כשרות
│   │   ├── stores/          # חנויות מכירה ושירות (חיפוש + סינון אזורים)
│   │   ├── devices/         # מכשירים נתמכים + דף מכשיר
│   │   ├── magazine/        # "הדרן עלך" + דף מאמר
│   │   ├── user-guide/      # מדריך שימוש
│   │   ├── authors/[slug]/  # פרופיל מחבר (E-E-A-T)
│   │   ├── contact/         # יצירת קשר
│   │   ├── [slug]/          # עמודי CMS: about/accessibility/terms/privacy
│   │   └── sitemap.ts       # מפת אתר דינמית מה-CMS
│   ├── robots.ts            # פתוח מפורשות ל-GPTBot, ClaudeBot, PerplexityBot ועוד
│   ├── (payload)/           # אדמין + REST API של Payload
│   └── api/contact/         # קליטת טפסים → contact-submissions
├── collections/             # Pages, Articles, Authors, Stores, Devices, Brands,
│                            # Testimonials, ContactSubmissions, Media, Users
├── globals/SiteSettings.ts  # הודעת שדרוג, פרטי קשר, נתונים, כשרות
├── blocks/                  # בלוקי Lexical: directAnswer / faq / insight
├── components/              # sections, layout, forms, magazine, stores, seo
├── lib/                     # payload client, schema.org builders, fonts
└── fonts/                   # קבצי Almoni (woff)
```

## ניהול תוכן (Payload Admin)

כניסה: `/admin`. כל התוכן באתר מנוהל מה-CMS:

- **עמודים** — אודות, כשרות, נגישות, תקנון, פרטיות (Lexical + בלוקים)
- **מאמרים ומדריכים** — המגזין "הדרן עלך"; `קטגוריה: מדריכים` או סימון "מוצג במדריך" מציג גם ב-/user-guide; "כתבת השער" קובעת את הכתבה הראשית
- **חנויות** — שם, אזור, כתובת, שעות, מעבדה/דגל, קישור Google Maps; "מוצג בדף הבית"
- **מכשירים ומותגים** — קטלוג המכשירים הנתמכים
- **עדויות** — הקרוסלה בדף הבית
- **פניות מהאתר** — כל הלידים מהטפסים (קריאה לאדמין בלבד)
- **הגדרות אתר** — הודעת השדרוג (הדלקה/כיבוי), טלפון, וואטסאפ, מייל, שעות, מונה משתמשים

שינוי תוכן מפעיל `revalidatePath` אוטומטית — האתר מתעדכן מיידית.

## GEO — אופטימיזציה למנועי AI

האתר בנוי לפי עקרונות GEO (ChatGPT Search, Perplexity, Google AI Overviews):

1. **robots.txt** מתיר מפורשות את כל בוטי ה-AI המרכזיים (GPTBot, ClaudeBot, Google-Extended, PerplexityBot ועוד) — ראו `src/app/robots.ts`.
2. **JSON-LD מלא בכל דף**: Organization, WebSite, Article+author, Person, LocalBusiness לכל חנות, Product לכל מכשיר, FAQPage, BreadcrumbList (`src/lib/schema.ts`).
3. **בלוקי "מענה ישיר"** — בעורך התוכן זמין בלוק `תקציר AI` שכופה מבנה של שאלה (H2) + תשובה עצמאית של 40–60 מילים — הפורמט שמנועי AI מצטטים.
4. **E-E-A-T** — קולקציית מחברים עם ניסיון והסמכות, עמודי פרופיל, שדה מקורות/הפניות בכל מאמר, ועדויות לקוחות.
5. **בלוקי ערך מוסף (Information Gain)** — נתון מקורי / מקרה בוחן / טיפ מניסיון, מרונדרים כ-callouts מובלטים.
6. **Sitemap דינמי** — נבנה מה-CMS עם `lastModified` אמיתי ומתעדכן בכל שינוי.
7. **כותרות בשפה טבעית** — התבניות מעודדות כותרות-שאלה ("איך עוברים להדרן?") ותשובות חדות.

## פריסה (Vercel + Neon/Supabase)

1. צרו מסד Postgres ב-[Neon](https://neon.tech) או Supabase והעתיקו את ה-connection string.
2. ייבאו את הריפו ל-Vercel והגדירו את משתני הסביבה (`DATABASE_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL=https://hadran.net`).
3. **סכמת DB בפרודקשן**: ה-build אינו יוצר טבלאות. לפני הפריסה הראשונה הריצו מקומית מול מסד הפרודקשן:
   ```bash
   DATABASE_URL=<prod-url> pnpm payload migrate:create
   DATABASE_URL=<prod-url> pnpm payload migrate
   DATABASE_URL=<prod-url> pnpm seed   # אופציונלי — תוכן התחלתי
   ```
4. פרסו. עדכוני תוכן אינם דורשים build — ISR + hooks מרעננים את הדפים.

> **אחסון מדיה בפרודקשן:** ב-Vercel מערכת הקבצים זמנית. לקבצי Media מומלץ להוסיף storage adapter (S3/Vercel Blob) — `@payloadcms/storage-vercel-blob` או `@payloadcms/storage-s3`.

## הרחבת האתר

- **קולקציה חדשה**: קובץ ב-`src/collections`, רישום ב-`payload.config.ts`, ואז `pnpm generate:types`.
- **בלוק תוכן חדש**: הוסיפו ב-`src/blocks/index.ts`, צרפו ל-`BlocksFeature` בקולקציה, והוסיפו renderer ב-`src/components/RichText.tsx`.
- **שפה נוספת**: הוסיפו locale ב-`payload.config.ts` (localization) — השדות התוכניים כבר מוכנים לכך.
- **טוקן עיצוב**: `@theme` ב-`src/app/(frontend)/styles.css`.

## סקריפטים

| פקודה | תיאור |
|---|---|
| `pnpm dev` | שרת פיתוח |
| `pnpm build` / `pnpm start` | בנייה והרצת פרודקשן |
| `pnpm seed` | זריעת תוכן התחלתי (idempotent) |
| `pnpm generate:types` | טיפוסי TS מהסכמה |
| `pnpm lint` | ESLint |

## קרדיטים ועיצוב

מערכת העיצוב, הטקסטים והנכסים (לוגו, חותמת כשרות, לוגואי מותגים) — מתוך פרויקט העיצוב של הדרן (`design-reference/`). תמונות אמת (מכשירים, תעודת כשרות, צילומי חנויות) יש להעלות דרך ה-CMS.
