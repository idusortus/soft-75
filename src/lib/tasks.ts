import type { TaskDefinition } from './types'

export const TASKS: TaskDefinition[] = [
  {
    key: 'exercise_done',
    label: 'Exercise',
    description: '45 minutes of physical activity',
    icon: '🏋️',
  },
  {
    key: 'mindfulness_done',
    label: 'Mind',
    description: 'Read 10 pages or meditate 10 min',
    icon: '📖',
  },
  {
    key: 'water_done',
    label: 'Water',
    description: 'Drink a gallon of water',
    icon: '💧',
  },
  {
    key: 'diet_done',
    label: 'Diet',
    description: 'Follow your diet modification',
    icon: '🥗',
  },
]
