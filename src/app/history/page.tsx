'use client'

import { format, parseISO } from 'date-fns'
import { useUser } from '@/hooks/useUser'
import { useHistory } from '@/hooks/useHistory'
import { countCompletedTasks } from '@/lib/utils'
import { CalendarHeatmap } from '@/components/CalendarHeatmap'
import { StatsBar } from '@/components/StatsBar'

export default function HistoryPage() {
  const { user } = useUser()
  const { logs, streak, totalComplete, isLoading } = useHistory(user?.id)

  if (!user || isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div
          className="w-9 h-9 rounded-full animate-spin"
          style={{ border: '3px solid var(--color-accent-from)', borderTopColor: 'transparent' }}
          role="status"
          aria-label="Loading"
        />
      </div>
    )
  }

  const recentLogs = logs.slice(0, 10)

  return (
    <div className="py-6 space-y-6">
      <h1 className="text-2xl font-black text-text">History</h1>

      <StatsBar streak={streak} totalComplete={totalComplete} logs={logs} />

      {/* Heatmap */}
      <section aria-labelledby="heatmap-heading" className="bg-surface rounded-card p-4 border border-border">
        <h2 id="heatmap-heading" className="text-sm font-semibold text-text mb-4">
          Last 75 Days
        </h2>
        <CalendarHeatmap logs={logs} />
      </section>

      {/* Recent entries */}
      {recentLogs.length > 0 ? (
        <section aria-labelledby="recent-heading">
          <h2
            id="recent-heading"
            className="text-xs font-semibold text-text-muted uppercase tracking-widest px-1 mb-3"
          >
            Recent Entries
          </h2>
          <div className="space-y-2">
            {recentLogs.map((log) => {
              const count = countCompletedTasks(log)
              const hasJournal = log.journal_entry.trim().length > 0
              const totalOfFive = count + (hasJournal ? 1 : 0)

              return (
                <div
                  key={log.id}
                  className="bg-surface rounded-card px-4 py-3 border border-border flex items-start gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text">
                      {format(parseISO(log.log_date), 'EEE, MMM d')}
                    </p>
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {log.exercise_done && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-surface-2 text-text-muted border border-border">
                          🏋️ Exercise
                        </span>
                      )}
                      {log.mindfulness_done && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-surface-2 text-text-muted border border-border">
                          {log.mindfulness_type === 'meditation' ? '🧘 Meditate' : '📖 Read'}
                        </span>
                      )}
                      {log.water_done && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-surface-2 text-text-muted border border-border">
                          💧 Water
                        </span>
                      )}
                      {log.diet_done && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-surface-2 text-text-muted border border-border">
                          🥗 Diet
                        </span>
                      )}
                      {hasJournal && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-surface-2 text-text-muted border border-border">
                          📝 Journal
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Score */}
                  <div className="shrink-0 text-right">
                    <span
                      className="text-sm font-black tabular-nums"
                      style={
                        log.is_complete
                          ? {
                              background:
                                'linear-gradient(135deg, var(--color-accent-from), var(--color-accent-to))',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                            }
                          : { color: 'var(--color-text-muted)' }
                      }
                    >
                      {totalOfFive}/5
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      ) : (
        <div className="text-center py-16">
          <p className="text-5xl mb-4" aria-hidden="true">
            📅
          </p>
          <p className="text-text-muted font-medium">No entries yet.</p>
          <p className="text-text-muted text-sm mt-1">Start tracking today!</p>
        </div>
      )}
    </div>
  )
}
