const VALUES = [
  ['כפיפות', 'לדעת תורה'],
  ['הובלה בעליונות', 'טכנולוגית'],
  ['שירות מהיר,', 'מקיף ומקצועי'],
  ['מחירים אטרקטיביים', 'ומשתלמים'],
  ['חוויית משתמש', 'גבוהה ועדכנית'],
]

// חמשת הערכים של הדרן — לפי Hadran Home.dc.html
export function ValuesSection() {
  return (
    <section className="border-y border-ink/12 bg-card px-5 py-16 sm:px-8 lg:py-[72px]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-11">
        <h2 className="m-0 text-center font-display text-[32px] font-black leading-none tracking-[-0.8px] text-ink sm:text-[40px]">
          הערכים של הדרן
        </h2>
        <ol className="m-0 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
          {VALUES.map(([line1, line2], i) => (
            <li
              key={line1}
              className={`flex flex-col gap-2.5 px-7 ${i < VALUES.length - 1 ? 'lg:border-s-0 lg:border-l lg:border-ink/10' : ''}`}
            >
              <span className="font-mono text-[13px] font-bold text-accent">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-[17px] font-bold leading-snug text-ink">
                {line1}
                <br />
                {line2}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
