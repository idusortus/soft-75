'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useUser } from '@/hooks/useUser'
import { updateDietDescription } from '@/lib/queries'
import type { User } from '@/lib/types'

export default function SettingsPage() {
  const { user, allUsers, selectUser, refreshUser } = useUser()
  const [diet, setDiet] = useState(user?.diet_description ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  // Sync diet input when user changes
  useEffect(() => {
    setDiet(user?.diet_description ?? '')
  }, [user])

  if (!user) return null

  const isDirty = diet !== user.diet_description

  const handleSaveDiet = async () => {
    if (!isDirty || saving) return
    setSaving(true)
    try {
      await updateDietDescription(user.id, diet)
      await refreshUser()
      setSaved(true)
      setTimeout(() => setSaved(false), 2200)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="py-6 space-y-5">
      <h1 className="text-2xl font-black text-text">Settings</h1>

      {/* Diet goal */}
      <section aria-labelledby="diet-heading" className="bg-surface rounded-card p-5 border border-border space-y-4">
        <div>
          <h2 id="diet-heading" className="font-semibold text-text">
            Your Diet Goal
          </h2>
          <p className="text-xs text-text-muted mt-0.5">Shows on your daily Diet task card</p>
        </div>
        <input
          type="text"
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSaveDiet()}
          placeholder="e.g., No sugar, no processed foods"
          className="w-full bg-surface-2 border border-border rounded-btn px-3 py-2.5 text-sm text-text placeholder:text-text-muted/40 outline-none focus:border-accent-from transition-colors duration-200"
          aria-label="Diet goal description"
        />
        <button
          onClick={handleSaveDiet}
          disabled={!isDirty || saving}
          className={clsx(
            'w-full py-2.5 rounded-btn text-sm font-semibold transition-all duration-200',
            saved
              ? 'bg-success/15 text-success border border-success/30'
              : isDirty
                ? 'text-white hover:opacity-90 active:scale-[0.98]'
                : 'bg-surface-2 text-text-muted cursor-not-allowed',
          )}
          style={
            isDirty && !saved
              ? { background: 'linear-gradient(135deg, var(--color-accent-from), var(--color-accent-to))' }
              : undefined
          }
        >
          {saving ? 'Saving…' : saved ? 'Saved ✓' : 'Save'}
        </button>
      </section>

      {/* Switch user */}
      <section aria-labelledby="switch-heading" className="bg-surface rounded-card p-5 border border-border space-y-3">
        <h2 id="switch-heading" className="font-semibold text-text">
          Switch User
        </h2>
        <div className="flex flex-col gap-2">
          {allUsers.map((u: User) => (
            <button
              key={u.id}
              onClick={() => selectUser(u.name)}
              aria-pressed={u.id === user.id}
              className={clsx(
                'flex items-center gap-3 w-full p-3 rounded-card border transition-all duration-200 text-left',
                u.id === user.id
                  ? 'border-accent-from bg-surface-2'
                  : 'border-border hover:bg-surface-2 hover:border-border',
              )}
            >
              <span
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white shrink-0"
                style={{ background: 'linear-gradient(135deg, var(--color-accent-from), var(--color-accent-to))' }}
                aria-hidden="true"
              >
                {u.name[0].toUpperCase()}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-text text-sm leading-tight">{u.name}</p>
                {u.diet_description && (
                  <p className="text-xs text-text-muted mt-0.5 truncate">{u.diet_description}</p>
                )}
              </div>
              {u.id === user.id && (
                <span className="text-success text-xs font-bold shrink-0" aria-hidden="true">
                  Active
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* About */}
      <section aria-labelledby="about-heading" className="bg-surface rounded-card p-5 border border-border space-y-1">
        <h2 id="about-heading" className="font-semibold text-text">
          About
        </h2>
        <p className="text-sm text-text-muted">soft-75 — a family fitness tracker</p>
        <p className="text-xs text-text-muted">Version 0.1.0</p>
      </section>
    </div>
  )
}
