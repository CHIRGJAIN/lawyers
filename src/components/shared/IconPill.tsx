import { cn } from '@/utils/cn'

type IconPillProps = {
  active?: boolean
  children: React.ReactNode
  className?: string
}

export const IconPill = ({ active = false, className, children }: IconPillProps) => (
  <span
    className={cn(
      'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium transition',
      active
        ? 'bg-[var(--brand-blue)]/10 text-[var(--brand-blue)]'
        : 'bg-[var(--brand-sand)] text-[var(--brand-muted)] hover:text-[var(--brand-ink)]',
      className,
    )}
  >
    {children}
  </span>
)
