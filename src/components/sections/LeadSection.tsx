import { LeadForm } from '@/components/forms/LeadForm'

// פס קריאה לפעולה עם טופס לידים על גרדיאנט המותג — לפי Hadran Home.dc.html
export function LeadSection() {
  return (
    <section
      id="contact-cta"
      className="bg-[radial-gradient(120%_160%_at_50%_-30%,#F19413_0%,#ea2804_62%,#c01f00_100%)] px-5 py-20 sm:px-8 lg:py-[104px]"
    >
      <div className="mx-auto flex max-w-[860px] flex-col items-center gap-5 text-center">
        <span className="text-sm font-bold text-white/85">כמה קל לעבור למערכת ההגנה שלנו</span>
        <h2 className="m-0 font-display text-[36px] font-black leading-none tracking-[-0.9px] text-white sm:text-[64px] sm:tracking-[-1.5px]">
          רוצים להנות מחיים דיגיטליים בטוחים?
        </h2>
        <p className="m-0 text-base leading-relaxed text-white/90 sm:text-lg">
          השאירו עכשיו פרטים וסוכן כשר סייל יחזור אליכם בהקדם
        </p>
        <div className="mt-3 w-full">
          <LeadForm source="home" dark />
        </div>
        <p className="m-0 mt-4 max-w-[760px] text-start text-[11px] leading-relaxed text-white/70">
          * השארת פרטייך מהווה את הסכמתך לכך שנציג הדרן ייצור עמך קשר באמצעות שיחה טלפונית/SMS, המידע ישמש את
          הדרן או מי מטעמה, לספק את השירות ולשפרו, לתפעול ומחקר וגם לשיווק (כולל מותאם אישית) אלא אם הודעת
          אחרת. הדרן רשאית לעשות שימוש במידע, והוא עשוי לעבור לגורמים נוספים כמפורט במדיניות הפרטיות, שם ניתן
          למצוא פירוט גם לגבי זכותך לעיון או לתיקון מידע. אין בדרך כלל חובה חוקית למסור את המידע אך בלעדיו לא
          נוכל לטפל בפנייתך או לספק לך השירות.
        </p>
      </div>
    </section>
  )
}
