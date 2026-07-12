/**
 * סקריפט Seed — מזין את מסד הנתונים בתוכן התחלתי:
 * טקסטים אמיתיים של הדרן + חנויות/מאמרים/עדויות לדוגמה (להחלפה באדמין).
 *
 * הרצה: pnpm seed   (דורש DATABASE_URL + PAYLOAD_SECRET ב-.env)
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

function richText(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'rtl' as const,
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        format: '' as const,
        indent: 0,
        version: 1,
        direction: 'rtl' as const,
        textFormat: 0,
        children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
      })),
    },
  }
}

async function run() {
  const payload = await getPayload({ config })

  // ---------- משתמש אדמין ראשון ----------
  const users = await payload.find({ collection: 'users', limit: 1 })
  if (!users.docs.length) {
    await payload.create({
      collection: 'users',
      data: { email: 'admin@hadran.net', password: 'hadran123!', name: 'מנהל האתר' },
    })
    payload.logger.info('נוצר משתמש אדמין: admin@hadran.net / hadran123! — החליפו סיסמה מיד!')
  }

  // ---------- הגדרות אתר ----------
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      upgradeNotice: {
        enabled: true,
        text: 'האתר בתהליך שדרוג. ייתכן שחלק מהפונקציות אינן זמינות כרגע. עמכם הסליחה.',
      },
      contact: {
        phone: '073-393-3000',
        whatsapp: '073-393-3000',
        email: 'info@hadran.net',
        hours: 'א׳–ה׳ 09:00–19:00 · ו׳ 09:00–12:00',
      },
      stats: { userCount: 140000, foundedYear: 2014 },
      kashrut: { committee: 'ועדת הרבנים לענייני תקשורת שע״י בד״צ בני ברק' },
    },
  })
  payload.logger.info('הגדרות אתר נשמרו')

  // ---------- מותגים ----------
  const brands = [
    { name: 'Samsung', logoPath: '/media/samsung.svg', height: 18, order: 1 },
    { name: 'Google Pixel', logoPath: '/media/pixel.svg', height: 22, order: 2 },
    { name: 'Xiaomi', logoPath: '/media/xiaomi.svg', height: 26, order: 3 },
    { name: 'OnePlus', logoPath: '/media/oneplus.svg', height: 22, order: 4 },
    { name: 'Infinix', logoPath: '/media/infinix.svg', height: 18, order: 5 },
  ]
  const brandIds: Record<string, number> = {}
  for (const brand of brands) {
    const existing = await payload.find({ collection: 'brands', where: { name: { equals: brand.name } }, limit: 1 })
    const doc = existing.docs[0] || (await payload.create({ collection: 'brands', data: brand }))
    brandIds[brand.name] = doc.id as number
  }
  payload.logger.info('מותגים נזרעו')

  // ---------- מכשירים (דוגמה) ----------
  const devices = [
    {
      name: 'Samsung Galaxy A55',
      slug: 'samsung-galaxy-a55',
      brand: brandIds['Samsung'],
      shortDescription: 'המצלמה הטובה בקטגוריה, סוללה ליומיים',
      featured: true,
      order: 1,
      specs: [
        { k: 'מסך', v: '6.6 אינץ׳, קצב רענון גבוה' },
        { k: 'זיכרון ואחסון', v: '8 ג׳יגה / 256 ג׳יגה' },
        { k: 'סוללה', v: '5,000 מיליאמפר — יומיים עבודה' },
        { k: 'מצלמה ראשית', v: '50 מגה־פיקסל עם ייצוב' },
        { k: 'עמידות', v: 'עמיד במים ובאבק' },
        { k: 'אחריות', v: '24 חודשים · מעבדת הדרן' },
      ],
    },
    {
      name: 'Google Pixel 8a',
      slug: 'google-pixel-8a',
      brand: brandIds['Google Pixel'],
      shortDescription: 'חוויית אנדרואיד נקייה, עדכונים ל-7 שנים',
      featured: true,
      order: 2,
      specs: [
        { k: 'מסך', v: '6.1 אינץ׳ OLED' },
        { k: 'זיכרון ואחסון', v: '8 ג׳יגה / 128 ג׳יגה' },
        { k: 'עדכוני מערכת', v: '7 שנים' },
        { k: 'אחריות', v: '24 חודשים · מעבדת הדרן' },
      ],
    },
    {
      name: 'Xiaomi Redmi Note 13',
      slug: 'xiaomi-redmi-note-13',
      brand: brandIds['Xiaomi'],
      shortDescription: 'התמורה הכי גבוהה למחיר',
      featured: true,
      order: 3,
      specs: [
        { k: 'מסך', v: '6.67 אינץ׳ AMOLED' },
        { k: 'סוללה', v: '5,000 מיליאמפר' },
        { k: 'אחריות', v: '24 חודשים · מעבדת הדרן' },
      ],
    },
    {
      name: 'OnePlus Nord 4',
      slug: 'oneplus-nord-4',
      brand: brandIds['OnePlus'],
      shortDescription: 'ביצועים חזקים, טעינה מהירה במיוחד',
      featured: true,
      order: 4,
      specs: [
        { k: 'מסך', v: '6.74 אינץ׳ 120Hz' },
        { k: 'טעינה', v: '100W SuperVOOC' },
        { k: 'אחריות', v: '24 חודשים · מעבדת הדרן' },
      ],
    },
  ]
  for (const device of devices) {
    const existing = await payload.find({ collection: 'devices', where: { slug: { equals: device.slug } }, limit: 1 })
    if (!existing.docs.length) await payload.create({ collection: 'devices', data: device })
  }
  payload.logger.info('מכשירים נזרעו')

  // ---------- חנויות (דוגמה — מתוך עיצוב Hadran Service) ----------
  const stores = [
    { name: 'ירושלים — גאולה', city: 'ירושלים', region: 'jerusalem', address: 'מלכי ישראל 42', phone: '02-538-1140', hours: '09:00–21:00', fridayHours: '09:00–12:30', hasLab: true, flagship: true, featured: true },
    { name: 'ירושלים — רמות', city: 'ירושלים', region: 'jerusalem', address: 'שירת הים 6', phone: '02-586-2277', hours: '10:00–20:00', fridayHours: '09:00–12:00', hasLab: false, flagship: false, featured: false },
    { name: 'בני ברק', city: 'בני ברק', region: 'center', address: 'רבי עקיבא 88', phone: '03-579-6633', hours: '09:00–22:00', fridayHours: '09:00–13:00', hasLab: true, flagship: true, featured: true },
    { name: 'אלעד', city: 'אלעד', region: 'center', address: 'יונתן בן עוזיאל 12', phone: '03-907-4411', hours: '10:00–20:00', fridayHours: '09:00–12:00', hasLab: false, flagship: false, featured: false },
    { name: 'מודיעין עילית', city: 'מודיעין עילית', region: 'center', address: 'שדרות יחזקאל 3', phone: '08-974-0550', hours: '10:00–21:00', fridayHours: '09:00–12:00', hasLab: false, flagship: false, featured: true },
    { name: 'ביתר עילית', city: 'ביתר עילית', region: 'jerusalem', address: 'הר"ן 8', phone: '02-580-3322', hours: '10:00–20:00', fridayHours: '09:00–12:00', hasLab: false, flagship: false, featured: false },
    { name: 'אשדוד', city: 'אשדוד', region: 'south', address: 'רבי יוסף קארו 15, רובע ז׳', phone: '08-856-7788', hours: '10:00–20:00', fridayHours: '09:00–12:30', hasLab: true, flagship: false, featured: true },
    { name: 'חיפה — הדר', city: 'חיפה', region: 'north', address: 'מיכאל 24', phone: '04-866-1199', hours: '10:00–19:00', fridayHours: '09:00–12:00', hasLab: false, flagship: false, featured: false },
    { name: 'צפת', city: 'צפת', region: 'north', address: 'ירושלים 31', phone: '04-692-4040', hours: '10:00–19:00', fridayHours: '09:00–12:00', hasLab: false, flagship: false, featured: false },
  ] as const
  for (const store of stores) {
    const existing = await payload.find({ collection: 'stores', where: { name: { equals: store.name } }, limit: 1 })
    if (!existing.docs.length) {
      await payload.create({
        collection: 'stores',
        data: {
          ...store,
          mapsUrl: `https://www.google.com/maps/search/${encodeURIComponent(`${store.address} ${store.city}`)}`,
        },
      })
    }
  }
  payload.logger.info('חנויות נזרעו')

  // ---------- עדויות ----------
  const testimonials = [
    { quote: 'אחרי שנים של אפליקציות סינון שהילדים מצאו דרך לעקוף — סוף סוף שקט אמיתי. אין מה לעקוף.', name: 'משפחת גולדשטיין', city: 'בני ברק', order: 1 },
    { quote: 'המכשיר עובד חלק, הסוללה מחזיקה, ואני יודעת בדיוק מה יש בו. זה השקט שחיפשנו.', name: 'רחל פ.', city: 'ירושלים', order: 2 },
    { quote: 'רכשנו לכל העובדים במשרד. התקנה במקום, שירות מדהים, ואפס תקלות כבר שנה.', name: 'יעקב ל.', city: 'מודיעין עילית', order: 3 },
    { quote: 'הרב שלנו המליץ, ומאז כל המשפחה עברה. ההבדל מסינון רגיל — שמיים וארץ.', name: 'משפחת ברוורמן', city: 'אשדוד', order: 4 },
    { quote: 'כטכנאי לשעבר ניסיתי הכול. זו המערכת היחידה שבאמת אי אפשר לעקוף.', name: 'שמעון ד.', city: 'חיפה', order: 5 },
  ]
  for (const t of testimonials) {
    const existing = await payload.find({ collection: 'testimonials', where: { name: { equals: t.name } }, limit: 1 })
    if (!existing.docs.length) await payload.create({ collection: 'testimonials', data: { ...t, featured: true } })
  }
  payload.logger.info('עדויות נזרעו')

  // ---------- מחבר ----------
  let author = (
    await payload.find({ collection: 'authors', where: { slug: { equals: 'hadran-team' } }, limit: 1 })
  ).docs[0]
  if (!author) {
    author = await payload.create({
      collection: 'authors',
      data: {
        name: 'צוות הדרן',
        slug: 'hadran-team',
        role: 'מומחי טכנולוגיה כשרה',
        bio: 'צוות התוכן של הדרן — אנשי מקצוע מעולם ההגנה הדיגיטלית והטכנולוגיה הכשרה, בליווי ועדת הרבנים לענייני תקשורת. כותבים מתוך ניסיון של עשור בליווי מעל 140,000 משתמשים.',
        credentials: [
          { item: 'ניסיון של עשור בפיתוח ותמיכה במערכות הגנה למכשירי אנדרואיד' },
          { item: 'עבודה שוטפת מול ועדת הרבנים לענייני תקשורת שע״י בד״צ בני ברק' },
          { item: 'ליווי של מעל 140,000 משתמשים ועשרות נקודות שירות ברחבי הארץ' },
        ],
      },
    })
  }

  // ---------- מאמרים (דוגמה — מתוך עיצוב Hadran Magazine) ----------
  const articles = [
    {
      title: 'הגנה צרובה בליבה: המדריך המלא למי ששוקל לעבור',
      slug: 'burned-in-protection-guide',
      excerpt:
        'מה באמת ההבדל בין אפליקציית סינון להגנה שנצרבת במכשיר? הגנה צרובה נטמעת בליבת מערכת ההפעלה, שורדת איפוס יצרן ואינה ניתנת להסרה — וכך היא מספקת שקט אמיתי. במדריך: איך נראה תהליך ההתאמה וכל מה שכדאי לדעת לפני שנכנסים לחנות.',
      category: 'guides' as const,
      hebrewDate: 'תמוז תשפ״ו',
      readingTime: '8 דק׳',
      isFeatured: true,
      isGuide: true,
      coverLabel: 'תמונת שער · מכשיר עם שכבת ליבה',
      paragraphs: [
        'סינון רגיל הוא תוכנה שיושבת מעל מערכת ההפעלה — וכל תוכנה אפשר להסיר. ההגנה של הדרן שונה מהיסוד: היא נצרבת בליבת המכשיר עצמו בתהליך התאמה מלא, לפני שהמכשיר מגיע אליכם.',
        'בתהליך ההתאמה בחנות המורשית, המכשיר עובר צריבה של מערכת ההגנה ברמת מערכת ההפעלה. מהרגע הזה — איפוס יצרן, החלפת סים או חיבור למחשב לא משנים דבר: ההגנה נשארת.',
        'ההתאמה נעשית במקום, מול העיניים שלכם, ואורכת כ-20 דקות. יוצאים מהחנות עם מכשיר מוכן, מוגן ומאושר על ידי ועדת הרבנים לענייני תקשורת.',
      ],
    },
    {
      title: 'כך תבדקו שהמכשיר שלכם באמת מוגן: 5 סימנים',
      slug: 'five-signs-protected-device',
      excerpt:
        'ההבדל בין הגנה צרובה לסינון חיצוני נראה גם בשימוש היומיומי. חמישה סימנים פשוטים שכל משתמש יכול לבדוק: חותמת הכשרות, חנות אפליקציות מבוקרת, עמידות באיפוס, ביצועים מלאים ופיקוח פעיל של ועדת הרבנים.',
      category: 'guides' as const,
      hebrewDate: 'סיון תשפ״ו',
      readingTime: '5 דק׳',
      isGuide: true,
      coverLabel: 'תמונה · בדיקת מכשיר',
      paragraphs: [
        'הרבה משתמשים בטוחים שהמכשיר שלהם מוגן — עד שמגלים שהסינון הוסר או נעקף מזמן. הנה חמישה סימנים שיעזרו לכם לוודא שההגנה אמיתית.',
        'סימן ראשון: חותמת הכשרות המוטבעת על המוצר. סימן שני: חנות אפליקציות מבוקרת בלבד. סימן שלישי: ההגנה שורדת איפוס יצרן. סימן רביעי: אפס פגיעה בסוללה ובביצועים. סימן חמישי: פיקוח פעיל ומתמשך של ועדת הרבנים.',
      ],
    },
    {
      title: 'מה מותר ומה נצרך: שיחה עם נציג ועדת הרבנים',
      slug: 'rabbinical-committee-interview',
      excerpt:
        'איך מחליטים אילו אפליקציות מאושרות במכשירי הדרן? נציג ועדת הרבנים לענייני תקשורת מסביר את תהליך האישור: בחינת הצורך האמיתי, בדיקת התוכן והממשק, והפיקוח המתמשך על כל עדכון. ראיון מיוחד.',
      category: 'halacha' as const,
      hebrewDate: 'אייר תשפ״ו',
      readingTime: '7 דק׳',
      coverLabel: 'תמונה · ועדת הרבנים',
      paragraphs: [
        'מאחורי כל אפליקציה מאושרת במכשירי הדרן עומד תהליך בחינה קפדני של ועדת הרבנים לענייני תקשורת שע״י בד״צ בני ברק.',
        'העיקרון המנחה, מסביר נציג הוועדה, הוא "מותר ונצרך": לא כל מה שמותר על פי ההלכה נצרך לציבור, ולא כל צורך מצדיק פתיחה. כל אפליקציה נבחנת לגופה — התוכן, הממשק, והאם היא משרתת צורך אמיתי של עבודה, ניווט, בנקאות או תקשורת.',
      ],
    },
    {
      title: 'מערכת ההגנה דור 4 יוצאת לדרך: מה חדש',
      slug: 'protection-gen4-launch',
      excerpt:
        'דור 4 של מערכת ההגנה מביא צריבה עמוקה יותר בליבת המכשיר, עדכוני מערכת מהירים יותר ותמיכה במכשירים חדשים של Samsung, Pixel ו-Xiaomi. כל המשתמשים הקיימים מקבלים את העדכון ללא עלות בחנויות המורשות.',
      category: 'news' as const,
      hebrewDate: 'ניסן תשפ״ו',
      readingTime: '4 דק׳',
      coverLabel: 'תמונה · דור 4',
      paragraphs: [
        'אחרי שנתיים של פיתוח, מערכת ההגנה דור 4 יוצאת לדרך. הצריבה החדשה עמוקה יותר, מהירה יותר — ותומכת בדגמים החדשים ביותר בשוק.',
        'משתמשים קיימים מוזמנים לגשת לכל חנות מורשית לקבלת העדכון ללא עלות, כולל בדיקת תקינות מלאה של ההגנה.',
      ],
    },
    {
      title: 'מהיסוס לשקט: המסע של משפחת גולדשטיין',
      slug: 'goldstein-family-story',
      excerpt:
        'אחרי שנים של אפליקציות סינון שנעקפו שוב ושוב, משפחת גולדשטיין מבני ברק עברה להגנה צרובה של הדרן. בסיפור: ההתלבטות, תהליך ההתאמה בחנות, ואיך נראים החיים כשאי אפשר להסיר את ההגנה.',
      category: 'stories' as const,
      hebrewDate: 'אדר תשפ״ו',
      readingTime: '6 דק׳',
      coverLabel: 'תמונה · משפחה',
      paragraphs: [
        '"ניסינו שלוש אפליקציות סינון שונות", מספר ר׳ גולדשטיין. "בכל פעם גילינו אחרי כמה חודשים שהילדים מצאו דרך לעקוף. ההרגשה הייתה של מרדף אינסופי."',
        'המעבר להדרן שינה את התמונה: "כשההגנה צרובה במכשיר עצמו, אין מה לעקוף. השקט הזה — שווה הכול."',
      ],
    },
    {
      title: 'עוברים מכשיר? כך שומרים על ההגנה בשדרוג',
      slug: 'device-upgrade-guide',
      excerpt:
        'מה קורה למערכת ההגנה כשמשדרגים מכשיר? ההגנה צרובה בכל מכשיר בנפרד, ולכן שדרוג חייב לעבור דרך חנות מורשית: שם מעבירים את הנתונים, צורבים את ההגנה במכשיר החדש ומוודאים שהכול תקין — באותו ביקור.',
      category: 'guides' as const,
      hebrewDate: 'שבט תשפ״ו',
      readingTime: '5 דק׳',
      isGuide: true,
      coverLabel: 'תמונה · שדרוג מכשיר',
      paragraphs: [
        'שדרוג מכשיר הוא הרגע שבו הכי חשוב לא להתפשר: מכשיר חדש בלי צריבה מלאה הוא מכשיר לא מוגן.',
        'בחנות המורשית התהליך פשוט: מגבים את הנתונים מהמכשיר הישן, צורבים את מערכת ההגנה במכשיר החדש, מעבירים את הנתונים ובודקים שהכול עובד. הכול באותו ביקור.',
      ],
    },
  ]
  for (const article of articles) {
    const existing = await payload.find({ collection: 'articles', where: { slug: { equals: article.slug } }, limit: 1 })
    if (!existing.docs.length) {
      const { paragraphs, ...rest } = article
      await payload.create({
        collection: 'articles',
        data: {
          ...rest,
          author: author.id,
          publishedAt: new Date().toISOString(),
          content: richText(paragraphs),
          _status: 'published',
        },
      })
    }
  }
  payload.logger.info('מאמרים נזרעו')

  // ---------- עמודים ----------
  const pages = [
    {
      title: 'אודות הדרן',
      slug: 'about',
      subtitle: 'טכנולוגיה מתקדמת. שימוש בטוח. כשרות בלי פשרות.',
      paragraphs: [
        'הדרן היא חברה ישראלית המספקת פתרונות טכנולוגיים מוגנים, כשרים ומותאמים לציבור החרדי והדתי, עם דגש על שימוש בטוח, מפוקח ואחראי במכשירי אנדרואיד ובשירותים דיגיטליים.',
        'החזון של הדרן הוא לאפשר שימוש בטכנולוגיה מתקדמת בלי לוותר על ערכי הכשרות, ההידור, הביטחון האישי וההתאמה לאורח החיים של המשתמשים.',
        'בעולם שבו כמעט כל שירות, עבודה, תקשורת או צורך יומיומי עובר דרך הסמארטפון והאינטרנט, הדרן מציעה אלטרנטיבה מאוזנת: מכשירים ושירותים שמאפשרים ליהנות מהיתרונות של העולם הדיגיטלי, תוך שמירה על סביבה מוגנת, מבוקרת וכשרה.',
        'הדרן לא מוכרת רק "סינון" או "חסימה". הערך המרכזי שלה הוא שקט נפשי: המשתמש מקבל מכשיר שמאפשר לו לבצע את מה שהוא צריך — בלי להיחשף למה שהוא לא רוצה, בלי להסתבך טכנית, ובלי לוותר על העקרונות החשובים לו.',
        'החברה משלבת בין טכנולוגיה מתקדמת, מערכות הגנה חזקות, התאמה הלכתית ושירות אנושי ומקצועי — ומשרתת משפחות, בעלי עסקים, הורים, מוסדות וארגונים בכל רחבי הארץ.',
        'הדרן נולדה כדי לתת מענה אמיתי לאתגר הדיגיטלי של הציבור החרדי והדתי: איך להשתמש בטכנולוגיה המתקדמת של היום, מבלי לוותר על הגבולות, הערכים והכשרות שמלווים את החיים.',
      ],
    },
    {
      title: 'הצהרת נגישות',
      slug: 'accessibility',
      subtitle: 'הדרן פועלת להנגשת האתר לכלל הציבור, כולל אנשים עם מוגבלות.',
      paragraphs: [
        'אנו רואים חשיבות עליונה במתן שירות שוויוני לכלל הגולשים ובשיפור נגישות האתר, בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), תשע"ג-2013, ובהתאם להנחיות הנגישות WCAG 2.1 ברמה AA.',
        'באתר יושמו: ניווט מלא במקלדת, היררכיית כותרות תקינה, טקסט חלופי לתמונות, ניגודיות צבעים תקינה, תמיכה בקוראי מסך והתאמה לתצוגה מוגדלת.',
        'נתקלתם בבעיית נגישות? נשמח שתעדכנו אותנו דרך עמוד יצירת הקשר ונטפל בהקדם.',
      ],
    },
    {
      title: 'תקנון האתר',
      slug: 'terms',
      subtitle: 'תנאי השימוש באתר הדרן',
      paragraphs: [
        'השימוש באתר זה כפוף לתנאים המפורטים להלן. גלישה באתר מהווה הסכמה לתנאים אלה.',
        'התכנים באתר נועדו למידע כללי בלבד ואינם מהווים התחייבות. המחירים, המפרטים והזמינות כפופים לשינוי ללא הודעה מוקדמת, והרכישה בפועל נעשית בחנויות המורשות בלבד.',
        'כל הזכויות בתכני האתר, בעיצובו ובסימני המסחר שמורות לחברת הדרן. אין להעתיק, לשכפל או להפיץ תכנים מהאתר ללא אישור מראש ובכתב.',
      ],
    },
    {
      title: 'מדיניות פרטיות',
      slug: 'privacy',
      subtitle: 'איך אנחנו שומרים על המידע שלכם',
      paragraphs: [
        'הדרן מכבדת את פרטיות המשתמשים באתר. מדיניות זו מפרטת איזה מידע נאסף וכיצד נעשה בו שימוש.',
        'מידע הנמסר בטפסי יצירת קשר (שם, טלפון, אימייל) ישמש את הדרן או מי מטעמה לצורך מתן השירות, שיפורו, תפעול ומחקר, וכן לשיווק (כולל מותאם אישית) — אלא אם הודעתם אחרת. המידע עשוי לעבור לגורמים נוספים כמפורט במדיניות זו.',
        'עומדת לכם הזכות לעיין במידע שנאסף עליכם ולבקש את תיקונו או מחיקתו. לפניות בנושא פרטיות — צרו קשר דרך עמוד יצירת הקשר.',
        'אין בדרך כלל חובה חוקית למסור מידע, אך בלעדיו לא נוכל לטפל בפנייתכם או לספק את השירות.',
      ],
    },
  ]
  for (const page of pages) {
    const existing = await payload.find({ collection: 'pages', where: { slug: { equals: page.slug } }, limit: 1 })
    if (!existing.docs.length) {
      const { paragraphs, ...rest } = page
      await payload.create({
        collection: 'pages',
        data: { ...rest, content: richText(paragraphs), _status: 'published' },
      })
    }
  }
  payload.logger.info('עמודים נזרעו')

  payload.logger.info('✓ Seed הושלם בהצלחה')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
