import clsx from 'clsx'

interface StreakBadgeProps {
  streak: number
}

export function StreakBadge({ streak }: StreakBadgeProps) {
  if (streak === 0) {
    return (
      <div className="flex items-center justify-center gap-2 py-1">
        <span aria-hidden="true" className="text-2xl">
          💪
        </span>
        <p className="text-text-muted text-sm font-medium">Start your streak today!</p>
      </div>
    )
  }

  return (
    <div
      className={clsx('flex items-center justify-center gap-3 py-1', streak >= 7 && 'streak-glow')}
      aria-label={`${streak} day streak`}
    >
      <span aria-hidden="true" className="text-4xl leading-none">
        🔥
      </span>
      <div className="flex flex-col leading-none">
        <span className="text-5xl font-black text-text tabular-nums">{streak}</span>
        <span className="text-xs text-text-muted font-semibold uppercase tracking-widest mt-1">
          day streak
        </span>
      </div>
    </div>
  )
}
