export function UpgradeBanner({ text }: { text?: string | null }) {
  if (!text) return null
  return (
    <div role="status" className="bg-dark px-4 py-2.5 text-center text-[13px] font-medium text-on-dark/85">
      {text}
    </div>
  )
}
