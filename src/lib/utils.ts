import { differenceInCalendarDays, format, isToday, isYesterday, parseISO } from 'date-fns'
import type { DailyLog } from './types'

export function todayStr(): string {
  return format(new Date(), 'yyyy-MM-dd')
}

export function formatDisplayDate(dateStr: string): string {
  return format(parseISO(dateStr), 'EEEE, MMMM d')
}

export function countCompletedTasks(log: DailyLog | null): number {
  if (!log) return 0
  return [log.exercise_done, log.mindfulness_done, log.water_done, log.diet_done].filter(Boolean).length
}

export function isLogComplete(log: DailyLog | null): boolean {
  if (!log) return false
  return (
    log.exercise_done &&
    log.mindfulness_done &&
    log.water_done &&
    log.diet_done &&
    log.journal_entry.trim().length > 0
  )
}

export function calculateStreak(logs: DailyLog[]): number {
  if (logs.length === 0) return 0

  // Sort descending by date
  const sorted = [...logs].sort((a, b) => b.log_date.localeCompare(a.log_date))
  const completeLogs = sorted.filter((l) => l.is_complete)

  if (completeLogs.length === 0) return 0

  const mostRecent = parseISO(completeLogs[0].log_date)
  if (!isToday(mostRecent) && !isYesterday(mostRecent)) return 0

  let streak = 0
  let expectedDate = isToday(mostRecent) ? new Date() : mostRecent

  for (const log of completeLogs) {
    const logDate = parseISO(log.log_date)
    const diff = differenceInCalendarDays(expectedDate, logDate)
    if (diff === 0 || diff === 1) {
      streak++
      expectedDate = logDate
    } else {
      break
    }
  }

  return streak
}

export function getLast75Days(): string[] {
  const days: string[] = []
  for (let i = 74; i >= 0; i -= 1) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(format(d, 'yyyy-MM-dd'))
  }
  return days
}
