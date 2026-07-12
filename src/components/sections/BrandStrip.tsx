export type BrandItem = { name: string; logoPath?: string | null; height?: number | null }

const DEFAULT_BRANDS: BrandItem[] = [
  { name: 'Samsung', logoPath: '/media/samsung.svg', height: 18 },
  { name: 'Google Pixel', logoPath: '/media/pixel.svg', height: 22 },
  { name: 'Xiaomi', logoPath: '/media/xiaomi.svg', height: 26 },
  { name: 'OnePlus', logoPath: '/media/oneplus.svg', height: 22 },
  { name: 'Infinix', logoPath: '/media/infinix.svg', height: 18 },
]

export function BrandStrip({ brands }: { brands?: BrandItem[] }) {
  const items = brands?.length ? brands : DEFAULT_BRANDS
  return (
    <section aria-label="מותגים נתמכים" className="border-y border-ink/12 px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-7">
        <h2 className="m-0 text-[15px] font-semibold text-charcoal">הכי הרבה מותגים, הכי הרבה הגנה</h2>
        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-14">
          {items.map((b) =>
            b.logoPath ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={b.name}
                src={b.logoPath}
                alt={b.name}
                style={{ height: `${b.height || 22}px` }}
                className="w-auto opacity-65"
                loading="lazy"
              />
            ) : (
              <span key={b.name} className="text-lg font-bold text-charcoal opacity-65">
                {b.name}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
