interface ProgressRingProps {
  completed: number
  total: number
  size?: number
  glow?: boolean
}

export function ProgressRing({ completed, total, size = 120, glow = false }: ProgressRingProps) {
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = total > 0 ? Math.min(completed / total, 1) : 0
  const offset = circumference * (1 - progress)

  return (
    <div
      className="relative inline-flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${completed} of ${total} tasks complete`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0"
        style={{ transform: 'rotate(-90deg)' }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent-from)" />
            <stop offset="100%" stopColor="var(--color-accent-to)" />
          </linearGradient>
          {glow && (
            <filter id="ring-glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}
        </defs>

        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-surface-2)"
          strokeWidth={strokeWidth}
        />

        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#ring-gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          filter={glow ? 'url(#ring-glow)' : undefined}
          style={{ transition: 'stroke-dashoffset 0.45s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </svg>

      {/* Center label */}
      <div className="relative flex flex-col items-center justify-center leading-none" aria-hidden="true">
        <span className="text-2xl font-black text-text">{completed}</span>
        <span className="text-xs text-text-muted font-medium mt-0.5">/{total}</span>
      </div>
    </div>
  )
}
