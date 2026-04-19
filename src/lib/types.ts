export interface User {
  id: string
  name: string
  diet_description: string
  created_at: string
}

export interface DailyLog {
  id: string
  user_id: string
  log_date: string
  exercise_done: boolean
  mindfulness_type: 'reading' | 'meditation' | null
  mindfulness_done: boolean
  water_done: boolean
  diet_done: boolean
  journal_entry: string
  is_complete: boolean
  created_at: string
  updated_at: string
}

export type TaskKey = 'exercise_done' | 'mindfulness_done' | 'water_done' | 'diet_done'

export interface TaskDefinition {
  key: TaskKey
  label: string
  description: string
  icon: string
}

export type MindfulnessType = 'reading' | 'meditation'
