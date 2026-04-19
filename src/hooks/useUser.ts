'use client'

import { useEffect, useState } from 'react'
import { getAllUsers, getUserByName } from '@/lib/queries'
import type { User } from '@/lib/types'

const STORAGE_KEY = 'soft75_user'

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllUsers().then(setAllUsers).catch(console.error)
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      getUserByName(stored).then((u) => {
        setUser(u)
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [])

  const selectUser = async (name: string) => {
    const u = await getUserByName(name)
    if (u) {
      localStorage.setItem(STORAGE_KEY, name)
      setUser(u)
    }
  }

  const clearUser = () => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  const refreshUser = async () => {
    if (user) {
      const u = await getUserByName(user.name)
      setUser(u)
    }
  }

  return { user, allUsers, loading, selectUser, clearUser, refreshUser }
}
