'use client'

import useSWR from 'swr'
import { getTodayLog, saveJournalEntry, setMindfulnessType, toggleTask, upsertLog } from '@/lib/queries'
import type { DailyLog, MindfulnessType, TaskKey } from '@/lib/types'
import { isLogComplete, todayStr } from '@/lib/utils'

export function useTodayLog(userId: string | undefined) {
  const date = todayStr()

  const {
    data: log,
    mutate,
    isLoading,
  } = useSWR(userId ? ['today-log', userId, date] : null, () => getTodayLog(userId!, date), {
    revalidateOnFocus: false,
  })

  const toggle = async (task: TaskKey, value: boolean) => {
    if (!userId) return

    await mutate(
      async () => {
        const updated = await toggleTask(userId, date, task, value)
        const newIsComplete = isLogComplete(updated)
        if (newIsComplete !== updated.is_complete) {
          const final = await upsertLog(userId, date, { is_complete: newIsComplete })
          return final
        }
        return updated
      },
      {
        optimisticData: log ? { ...log, [task]: value } : undefined,
        rollbackOnError: true,
      }
    )
  }

  const setMindfulness = async (type: MindfulnessType) => {
    if (!userId) return
    await mutate(() => setMindfulnessType(userId, date, type), { revalidate: true })
  }

  const saveJournal = async (text: string) => {
    if (!userId) return
    const updated = await saveJournalEntry(userId, date, text)
    const newIsComplete = isLogComplete(updated)
    if (newIsComplete !== updated.is_complete) {
      await upsertLog(userId, date, { is_complete: newIsComplete })
    }
    await mutate()
  }

  return { log: (log as DailyLog | null) ?? null, isLoading, toggle, setMindfulness, saveJournal, mutate }
}
