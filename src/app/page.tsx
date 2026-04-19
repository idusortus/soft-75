'use client'

import clsx from 'clsx'
import { useUser } from '@/hooks/useUser'
import { useTodayLog } from '@/hooks/useTodayLog'
import { useHistory } from '@/hooks/useHistory'
import { TASKS } from '@/lib/tasks'
import type { MindfulnessType } from '@/lib/types'
import { countCompletedTasks, formatDisplayDate, isLogComplete, todayStr } from '@/lib/utils'
import { ProgressRing } from '@/components/ProgressRing'
import { StreakBadge } from '@/components/StreakBadge'
import { TaskCard } from '@/components/TaskCard'
import { MindfulnessPicker } from '@/components/MindfulnessPicker'
import { JournalCard } from '@/components/JournalCard'

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function TodayPage() {
  const { user } = useUser()
  const { log, isLoading, toggle, setMindfulness, saveJournal } = useTodayLog(user?.id)
  const { streak } = useHistory(user?.id)

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

  const completedTasks = countCompletedTasks(log)
  const hasJournal = (log?.journal_entry ?? '').trim().length > 0
  const totalProgress = completedTasks + (hasJournal ? 1 : 0)
  const allDone = isLogComplete(log)

  return (
    <div className="py-6 space-y-5">
      {/* Header: progress ring + greeting */}
      <div
        className={clsx(
          'flex items-center gap-5 rounded-card p-5 bg-surface border border-border transition-all duration-500',
          allDone && 'glow-pulse',
        )}
      >
        <ProgressRing completed={totalProgress} total={5} size={96} glow={allDone} />
        <div className="min-w-0">
          <p className="text-text-muted text-xs font-medium uppercase tracking-wide">
            {formatDisplayDate(todayStr())}
          </p>
          <h1 className="text-xl font-bold text-text mt-1 leading-tight">
            {getGreeting()},{' '}
            <span className="gradient-text">{user.name}</span>!
          </h1>
          <p className="text-text-muted text-sm mt-1">
            {totalProgress}/5{' '}
            {allDone ? (
              <span className="text-success font-medium">All done 🎉</span>
            ) : (
              'tasks done'
            )}
          </p>
        </div>
      </div>

      {/* Streak */}
      <StreakBadge streak={streak} />

      {/* Tasks */}
      <section aria-labelledby="tasks-heading">
        <h2
          id="tasks-heading"
          className="text-xs font-semibold text-text-muted uppercase tracking-widest px-1 mb-3"
        >
          Today&apos;s Tasks
        </h2>
        <div className="space-y-3">
          {TASKS.map((task) => {
            const done = log ? log[task.key] : false
            const description =
              task.key === 'diet_done' && user.diet_description ? user.diet_description : task.description
            const isMindfulness = task.key === 'mindfulness_done'

            return (
              <TaskCard
                key={task.key}
                task={{ ...task, description }}
                done={done}
                onToggle={(val) => toggle(task.key, val)}
              >
                {isMindfulness && done && (
                  <MindfulnessPicker
                    type={log?.mindfulness_type ?? null}
                    onChange={(t: MindfulnessType) => setMindfulness(t)}
                  />
                )}
              </TaskCard>
            )
          })}
        </div>
      </section>

      {/* Journal */}
      <section aria-labelledby="journal-heading">
        <h2
          id="journal-heading"
          className="text-xs font-semibold text-text-muted uppercase tracking-widest px-1 mb-3"
        >
          Journal
        </h2>
        <JournalCard initialValue={log?.journal_entry ?? ''} onSave={saveJournal} />
      </section>

      {/* Celebration banner */}
      {allDone && (
        <div
          className="w-full py-4 text-center rounded-card text-white text-base font-bold tracking-wide"
          style={{ background: 'linear-gradient(135deg, var(--color-accent-from), var(--color-accent-to))' }}
          role="alert"
          aria-live="polite"
        >
          🎉 Day Complete! You absolutely crushed it.
        </div>
      )}
    </div>
  )
}
