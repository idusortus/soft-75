import type { DailyLog } from '@/lib/types'

interface StatsBarProps {
  streak: number
  totalComplete: number
  logs: DailyLog[]
}

export function StatsBar({ streak, totalComplete, logs }: StatsBarProps) {
  const rate = logs.length > 0 ? Math.round((totalComplete / logs.length) * 100) : 0

  const stats = [
    { label: 'Streak', value: `${streak}d`, icon: '🔥' },
    { label: 'Complete', value: String(totalComplete), icon: '✅' },
    { label: 'Rate', value: `${rate}%`, icon: '📊' },
  ]

  return (
    <div className="grid grid-cols-3 gap-3" role="region" aria-label="Progress statistics">
      {stats.map(({ label, value, icon }) => (
        <div
          key={label}
          className="bg-surface rounded-card p-4 text-center border border-border"
          aria-label={`${label}: ${value}`}
        >
          <span aria-hidden="true" className="text-2xl block mb-1.5 leading-none">
            {icon}
          </span>
          <p className="text-2xl font-black text-text tabular-nums leading-none">{value}</p>
          <p className="text-xs text-text-muted mt-1.5 uppercase tracking-wider font-medium">{label}</p>
        </div>
      ))}
    </div>
  )
}
