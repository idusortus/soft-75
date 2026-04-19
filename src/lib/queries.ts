import { supabase } from './supabase'
import type { DailyLog, MindfulnessType, TaskKey, User } from './types'

export async function getAllUsers(): Promise<User[]> {
  const { data, error } = await supabase.from('users').select('*').order('name')
  if (error) throw error
  return data
}

export async function getUserByName(name: string): Promise<User | null> {
  const { data, error } = await supabase.from('users').select('*').eq('name', name).single()
  if (error) return null
  return data
}

export async function getTodayLog(userId: string, date: string): Promise<DailyLog | null> {
  const { data, error } = await supabase
    .from('daily_logs')
    .select('*')
    .eq('user_id', userId)
    .eq('log_date', date)
    .single()
  if (error) return null
  return data
}

export async function upsertLog(userId: string, date: string, updates: Partial<DailyLog>): Promise<DailyLog> {
  const existing = await getTodayLog(userId, date)

  const payload = {
    user_id: userId,
    log_date: date,
    ...updates,
  }

  if (existing) {
    const { data, error } = await supabase
      .from('daily_logs')
      .update(payload)
      .eq('user_id', userId)
      .eq('log_date', date)
      .select()
      .single()
    if (error) throw error
    return data
  }

  const { data, error } = await supabase.from('daily_logs').insert(payload).select().single()
  if (error) throw error
  return data
}

export async function toggleTask(userId: string, date: string, task: TaskKey, value: boolean): Promise<DailyLog> {
  return upsertLog(userId, date, { [task]: value })
}

export async function setMindfulnessType(userId: string, date: string, type: MindfulnessType): Promise<DailyLog> {
  return upsertLog(userId, date, { mindfulness_type: type })
}

export async function saveJournalEntry(userId: string, date: string, text: string): Promise<DailyLog> {
  return upsertLog(userId, date, { journal_entry: text })
}

export async function getUserHistory(userId: string, days = 90): Promise<DailyLog[]> {
  const since = new Date()
  since.setDate(since.getDate() - days)

  const { data, error } = await supabase
    .from('daily_logs')
    .select('*')
    .eq('user_id', userId)
    .gte('log_date', since.toISOString().split('T')[0])
    .order('log_date', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function updateDietDescription(userId: string, diet: string): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .update({ diet_description: diet })
    .eq('id', userId)
    .select()
    .single()
  if (error) throw error
  return data
}
