'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import type { User } from '@/lib/types'

interface NavigationProps {
  user: User
  allUsers: User[]
  onSwitch: (name: string) => Promise<void>
}

const NAV_LINKS = [
  { href: '/', label: 'Today' },
  { href: '/history', label: 'History' },
  { href: '/settings', label: 'Settings' },
]

export function Navigation({ user, allUsers, onSwitch }: NavigationProps) {
  const pathname = usePathname()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!dropdownOpen) return
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [dropdownOpen])

  const isActive = (href: string) => {
    const p = pathname ?? ''
    if (href === '/') return p === '/' || p === ''
    return p.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-sm">
      <div className="max-w-[480px] mx-auto px-4 h-14 flex items-center justify-between gap-3">
        {/* App name */}
        <span className="gradient-text text-lg font-bold tracking-tight shrink-0">soft-75</span>

        {/* Nav links */}
        <nav aria-label="Main navigation" className="flex items-center gap-0.5">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? 'page' : undefined}
              className={clsx(
                'px-3 py-1.5 rounded-btn text-sm font-medium transition-all duration-200',
                isActive(href)
                  ? 'bg-surface-2 text-text'
                  : 'text-text-muted hover:text-text hover:bg-surface',
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* User avatar + dropdown */}
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            aria-label={`${user.name} — tap to switch user`}
            aria-expanded={dropdownOpen}
            aria-haspopup="listbox"
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white transition-transform duration-200 hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(135deg, var(--color-accent-from), var(--color-accent-to))' }}
          >
            {user.name[0].toUpperCase()}
          </button>

          {dropdownOpen && (
            <div
              role="listbox"
              aria-label="Switch user"
              className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-card shadow-2xl overflow-hidden z-50"
            >
              <p className="px-3 pt-3 pb-1.5 text-xs text-text-muted font-semibold uppercase tracking-wider">
                Switch user
              </p>
              {allUsers.map((u) => (
                <button
                  key={u.id}
                  role="option"
                  aria-selected={u.id === user.id}
                  onClick={() => {
                    onSwitch(u.name)
                    setDropdownOpen(false)
                  }}
                  className={clsx(
                    'w-full px-3 py-2.5 text-left text-sm flex items-center gap-2.5 transition-colors duration-150',
                    u.id === user.id
                      ? 'bg-surface-2 text-text'
                      : 'text-text-muted hover:bg-surface-2 hover:text-text',
                  )}
                >
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: 'linear-gradient(135deg, var(--color-accent-from), var(--color-accent-to))' }}
                    aria-hidden="true"
                  >
                    {u.name[0].toUpperCase()}
                  </span>
                  <span className="flex-1 truncate">{u.name}</span>
                  {u.id === user.id && (
                    <span className="text-success text-xs font-semibold" aria-hidden="true">
                      ✓
                    </span>
                  )}
                </button>
              ))}
              <div className="h-2" />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
