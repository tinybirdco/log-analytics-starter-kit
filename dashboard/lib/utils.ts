export const cx = (...args: (string | undefined | false)[]) =>
  args.filter(Boolean).join(' ')

export const formatNumber = (
  num: number | undefined,
  maximumFractionDigits: number | undefined = undefined
) => Intl.NumberFormat('en-US', { maximumFractionDigits }).format(num ?? 0)

export function kFormatter(value: number): string {
  return value > 999 ? `${(value / 1000).toFixed(1)}K` : String(value)
}

export function formatPercentage(value: number) {
  return `${value ? (value * 100).toFixed(2) : '0'}%`
}
