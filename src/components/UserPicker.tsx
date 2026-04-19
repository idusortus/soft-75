'use client'

import type { User } from '@/lib/types'

interface UserPickerProps {
  allUsers: User[]
  onSelect: (name: string) => Promise<void>
}

export function UserPicker({ allUsers, onSelect }: UserPickerProps) {
  return (
    <div className="relative min-h-dvh flex items-center justify-center bg-bg px-4 overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(124,58,237,0.15) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-picker-title"
        className="relative w-full max-w-sm rounded-card p-8 border border-border shadow-2xl"
        style={{
          background: 'linear-gradient(145deg, rgba(26,26,26,0.95), rgba(36,36,36,0.9))',
          backdropFilter: 'blur(16px)',
        }}
      >
        <p className="text-4xl text-center mb-3" aria-hidden="true">
          👋
        </p>
        <h1 id="user-picker-title" className="text-xl font-bold text-center text-text mb-1">
          Who&apos;s checking in?
        </h1>
        <p className="text-sm text-text-muted text-center mb-8">Pick your profile to get started</p>

        <div className="flex flex-col gap-3">
          {allUsers.length === 0 ? (
            <div className="flex items-center justify-center py-8 gap-2 text-text-muted text-sm">
              <div
                className="w-4 h-4 rounded-full animate-spin"
                style={{ border: '2px solid var(--color-accent-from)', borderTopColor: 'transparent' }}
                aria-hidden="true"
              />
              Loading users…
            </div>
          ) : (
            allUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => onSelect(user.name)}
                aria-label={`Sign in as ${user.name}`}
                className="flex items-center gap-4 w-full p-4 rounded-card bg-surface-2 border border-border hover:border-accent-from transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group text-left"
              >
                <span
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-black text-white shrink-0 transition-transform duration-200 group-hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-accent-from), var(--color-accent-to))',
                  }}
                  aria-hidden="true"
                >
                  {user.name[0].toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="font-bold text-text text-lg leading-tight">{user.name}</p>
                  <p className="text-text-muted text-sm mt-0.5 truncate">
                    {user.diet_description || 'No diet goal set yet'}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
