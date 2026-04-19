'use client'

import { useState } from 'react'
import clsx from 'clsx'
import type { TaskDefinition } from '@/lib/types'

interface TaskCardProps {
  task: TaskDefinition
  done: boolean
  onToggle: (value: boolean) => void
  disabled?: boolean
  children?: React.ReactNode
}

export function TaskCard({ task, done, onToggle, disabled = false, children }: TaskCardProps) {
  const [animating, setAnimating] = useState(false)

  const handleToggle = () => {
    if (disabled) return
    if (!done) {
      setAnimating(true)
      setTimeout(() => setAnimating(false), 220)
    }
    onToggle(!done)
  }

  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-card transition-all duration-200',
        animating && 'check-pop',
        !done && 'bg-surface border border-border',
      )}
      style={
        done
          ? { background: 'linear-gradient(135deg, var(--color-accent-from), var(--color-accent-to))' }
          : undefined
      }
    >
      <button
        onClick={handleToggle}
        disabled={disabled}
        aria-label={`${done ? 'Mark incomplete' : 'Mark complete'}: ${task.label}`}
        aria-pressed={done}
        className="w-full min-h-[80px] flex items-center gap-4 px-4 py-4 text-left cursor-pointer disabled:cursor-default"
      >
        {/* Icon */}
        <div
          className={clsx(
            'w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-all duration-200',
            done ? 'bg-white/20' : 'bg-surface-2',
          )}
          aria-hidden="true"
        >
          {done ? '✓' : task.icon}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className={clsx('font-semibold text-base leading-tight', done ? 'text-white' : 'text-text')}>
            {task.label}
          </p>
          <p className={clsx('text-sm mt-0.5 line-clamp-2', done ? 'text-white/70' : 'text-text-muted')}>
            {task.description}
          </p>
        </div>

        {/* Check indicator */}
        <div
          className={clsx(
            'w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center text-xs font-bold transition-all duration-200',
            done ? 'bg-white/25 border-white/50 text-white' : 'border-border',
          )}
          aria-hidden="true"
        >
          {done && '✓'}
        </div>
      </button>

      {/* Slot for inline extras (e.g. MindfulnessPicker) */}
      {children && <div className="px-4 pb-4">{children}</div>}
    </div>
  )
}
