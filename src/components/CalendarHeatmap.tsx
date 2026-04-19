'use client'

import clsx from 'clsx'
import { format, isToday, parseISO } from 'date-fns'
import type { DailyLog } from '@/lib/types'
import { countCompletedTasks, getLast75Days } from '@/lib/utils'

interface CalendarHeatmapProps {
  logs: DailyLog[]
}

export function CalendarHeatmap({ logs }: CalendarHeatmapProps) {
  const days = getLast75Days()
  const logMap = new Map(logs.map((l) => [l.log_date, l]))

  return (
    <div>
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: 'repeat(15, minmax(0, 1fr))' }}
        role="grid"
        aria-label="75-day habit calendar"
      >
        {days.map((day) => {
          const log = logMap.get(day) ?? null
          const completed = countCompletedTasks(log)
          const hasJournal = (log?.journal_entry ?? '').trim().length > 0
          const totalOfFive = completed + (hasJournal ? 1 : 0)
          const isComplete = log?.is_complete ?? false
          const today = isToday(parseISO(day))
          const hasEntry = !!log

          // Opacity for partial days: from 0.2 at 1/5 up to 0.85 at 4/5
          const partialOpacity = hasEntry && !isComplete ? 0.15 + (totalOfFive / 5) * 0.65 : 1

          return (
            <div
              key={day}
              role="gridcell"
              title={`${format(parseISO(day), 'MMM d')}: ${hasEntry ? `${totalOfFive}/5 done` : 'No entry'}`}
              aria-label={`${format(parseISO(day), 'MMMM d')}: ${hasEntry ? `${totalOfFive} of 5 complete` : 'no entry'}`}
              className={clsx(
                'aspect-square rounded-sm transition-all duration-150',
                !hasEntry && 'bg-surface-2',
                today && 'ring-2 ring-white ring-offset-1 ring-offset-bg',
              )}
              style={
                hasEntry
                  ? {
                      background: 'linear-gradient(135deg, var(--color-accent-from), var(--color-accent-to))',
                      opacity: isComplete ? 1 : partialOpacity,
                    }
                  : undefined
              }
            />
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-4 justify-end" aria-hidden="true">
        <span className="text-xs text-text-muted">Less</span>
        {[0, 0.25, 0.5, 0.75, 1].map((op) => (
          <div
            key={op}
            className="w-3 h-3 rounded-sm"
            style={
              op > 0
                ? {
                    background: 'linear-gradient(135deg, var(--color-accent-from), var(--color-accent-to))',
                    opacity: op,
                  }
                : { background: 'var(--color-surface-2)' }
            }
          />
        ))}
        <span className="text-xs text-text-muted">More</span>
      </div>
    </div>
  )
}
