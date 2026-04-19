'use client'

import useSWR from 'swr'
import { getUserHistory } from '@/lib/queries'
import { calculateStreak } from '@/lib/utils'

export function useHistory(userId: string | undefined) {
  const { data: logs = [], isLoading } = useSWR(
    userId ? ['history', userId] : null,
    () => getUserHistory(userId!, 90),
    { revalidateOnFocus: false }
  )

  const streak = calculateStreak(logs)
  const totalComplete = logs.filter((l) => l.is_complete).length

  return { logs, streak, totalComplete, isLoading }
}
