'use client'

import clsx from 'clsx'
import type { MindfulnessType } from '@/lib/types'

interface MindfulnessPickerProps {
  type: MindfulnessType | null
  onChange: (t: MindfulnessType) => void
}

const OPTIONS: { value: MindfulnessType; label: string; icon: string }[] = [
  { value: 'reading', label: 'Read', icon: '📖' },
  { value: 'meditation', label: 'Meditate', icon: '🧘' },
]

export function MindfulnessPicker({ type, onChange }: MindfulnessPickerProps) {
  return (
    <div className="flex gap-2 pt-1" role="group" aria-label="Choose mindfulness activity">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          aria-pressed={type === opt.value}
          className={clsx(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-btn text-sm font-medium transition-all duration-200 min-h-[36px]',
            type === opt.value
              ? 'bg-white/25 text-white border border-white/40'
              : 'bg-white/10 text-white/65 border border-white/15 hover:bg-white/20 hover:text-white',
          )}
        >
          <span aria-hidden="true">{opt.icon}</span>
          {opt.label}
        </button>
      ))}
    </div>
  )
}
