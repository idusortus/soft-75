'use client'

import { useUser } from '@/hooks/useUser'
import { Navigation } from './Navigation'
import { UserPicker } from './UserPicker'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const { user, allUsers, loading, selectUser } = useUser()

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-bg">
        <div
          className="w-9 h-9 rounded-full animate-spin"
          style={{ border: '3px solid var(--color-accent-from)', borderTopColor: 'transparent' }}
          aria-label="Loading"
          role="status"
        />
      </div>
    )
  }

  if (!user) {
    return <UserPicker allUsers={allUsers} onSelect={selectUser} />
  }

  return (
    <div className="min-h-dvh bg-bg">
      <Navigation user={user} allUsers={allUsers} onSwitch={selectUser} />
      <main className="max-w-[480px] mx-auto px-4 pb-12">{children}</main>
    </div>
  )
}
