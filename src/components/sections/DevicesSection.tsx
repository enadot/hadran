import Link from 'next/link'

export type DeviceCard = {
  id: string | number
  name: string
  slug: string
  shortDescription?: string | null
  imageUrl?: string | null
  imageAlt?: string | null
}

// רשת מכשירים נתמכים — לפי Hadran Home.dc.html
export function DevicesSection({ devices, title = 'מכשירים נתמכים' }: { devices: DeviceCard[]; title?: string }) {
  if (!devices.length) return null
  return (
    <section className="bg-canvas px-5 py-20 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <h2 className="m-0 font-display text-[38px] font-black leading-none tracking-[-0.9px] text-ink sm:text-[64px] sm:tracking-[-1.5px]">
              {title}
            </h2>
            <p className="m-0 max-w-[520px] text-base text-charcoal">
              מערכת ההגנה של הדרן מותקנת על מגוון רחב של מכשירים. הרכישה — בחנויות המורשות בלבד.
            </p>
          </div>
          <Link
            href="/devices"
            className="whitespace-nowrap rounded-full border border-ink bg-card px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-bone"
          >
            כל המכשירים הנתמכים ←
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {devices.map((d) => (
            <Link
              key={d.id}
              href={`/devices/${d.slug}`}
              className="flex flex-col gap-3 rounded-xl bg-card p-4 text-ink transition-shadow hover:shadow-[0_8px_24px_rgba(32,32,32,0.08)]"
            >
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-[10px] bg-[repeating-linear-gradient(45deg,#f3f0e8_0_12px,#eee9dd_12px_24px)]">
                {d.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={d.imageUrl} alt={d.imageAlt || d.name} className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <span className="font-mono text-[11px] text-ash">תמונת מכשיר · {d.name}</span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold">{d.name}</span>
                {d.shortDescription && <span className="text-[13px] text-charcoal">{d.shortDescription}</span>}
              </div>
              <div className="mt-auto flex items-center">
                <span className="rounded-full border border-ink/12 bg-canvas px-2.5 py-1 text-[11px] text-ink">
                  מאושר ועדת הרבנים
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
