# Design reference notes (extracted from Claude Design project baf647e9-d2ba-4ecb-92bf-8edf7be75dec)

Files: home.html (saved from "Hadran Home.dc.html"), magazine tokens below.
Product/Service designs exist in the project as additional reference.

## Shared tokens observed (both pages)
- Canvas: #f9f7f3, bone: #f3f0e8, card: #ffffff, dark: #202020, deep/footer: #000000
- Ink #202020, body #3a3a3a, charcoal #575757, ash #8d8d8d, on-dark #fcfcfc, on-dark-mute rgba(252,252,252,0.72)
- Accent red-orange: #ea2804 (links, dot after H1, selection), hover #c01f00, glow #ff6a3d, pink #f4a8a0
- Brand CTA gradient: linear-gradient(135deg, #F19413 0%, #ea2804 90%); hover: (135deg,#e0820a 0%,#c01f00 90%)
- Fonts: 'Almoni Tzar' (headings, weight 800-900, tight lh 0.98-1.15, letter-spacing -0.3px..-2px, fallback 'Noto Sans Hebrew'), 'Almoni Neue' (body, fallback 'Heebo'), JetBrains Mono (dates/labels/meta)
- Radii: nav card 18px, cards 14-16px, pills/buttons 9999px
- Nav: sticky top:12px, white rounded card, height 68px, max-width 1280, shadow 0 10px 30px rgba(32,32,32,0.08); links are pill hovers (#f3f0e8); active pill bg #f3f0e8; CTA "איתור חנות" gradient pill
- Footer: black, radial red glow bottom, display-72px headline "שקט דיגיטלי. / צרוב בליבה." (second line #ff6a3d), 4-col link grid, kashrut stamp + text, bottom bar, giant watermark "הדרן" gradient text clipped at bottom
- Site name/tagline: "הדרן — טכנולוגיה בהכשר", magazine brand: "הדרן עלך"
- "מאז 2014", "בפיקוח ועדת הרבנים לענייני תקשורת, בני ברק"

## Magazine page structure
1. Sticky nav (shared)
2. Header: badge pill "המגזין של הדרן" (red outline), H1 96px Almoni Tzar 900 "הדרן עלך." (red dot), subtitle: "כמו בסיום מסכת — חוזרים אליך שוב ושוב. מאמרים, מדריכים וחדשות מעולם הטכנולוגיה הכשרה." Radial pink/orange mesh bg top-right.
3. Featured article: dark #202020 rounded-16 grid 1.15fr/1fr card; badge "כתבת השער" (bg rgba(255,106,61,.16) color #ff6a3d); H2 48px; excerpt on-dark-mute; meta JetBrains (hebrew date · read time); link "לקריאת הכתבה ←" #ff6a3d; image side placeholder diagonal stripes.
4. Category filter pills: הכל / מדריכים / הלכה וטכנולוגיה / חדשות המערכת / סיפורי לקוחות — active: dark bg white text.
5. Articles grid 3 cols gap 20: white cards border rgba(32,32,32,.08) r14; 16/9 image; cat pill bone; title Almoni Tzar 800 24px lh1.15; excerpt 14px #575757; meta date mono · read time.
6. Newsletter band: bone #f3f0e8, centered, H2 44px "הדרן עלך — ישירות אליך", email input pill + dark button "הרשמה".
7. Footer (shared).

Nav items: מערכת ההגנה (#protection) / מכשירים נתמכים (Product) / חנויות מכירה ושירות (Service) / כשרות (#kashrut) / הדרן עלך (Magazine, active) + CTA איתור חנות.

Footer columns: הפתרון (מערכת ההגנה, הדרן מול סינון חיצוני, מכשירים נתמכים, הדרן עלך — המגזין) / חנויות ושירות (חנויות מכירה ושירות, מעבדות אקספרס, מוקד שירות טלפוני, צור קשר) / כשרות (ועדת הרבנים, עובדות מול מיתוסים #samsung-myth, עדויות משפחות #testimonials). Bottom: מדיניות פרטיות, תנאי שימוש, נגישות + hadran.net mono.

Sample magazine articles (use in seed): see original design script — 6 articles with cats מדריכים/הלכה וטכנולוגיה/חדשות המערכת/סיפורי לקוחות, Hebrew-calendar dates (e.g. "סיון תשפ״ו"), read times "5 דק׳".
