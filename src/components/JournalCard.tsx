'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

interface JournalCardProps {
  initialValue: string
  onSave: (text: string) => Promise<void>
}

export function JournalCard({ initialValue, onSave }: JournalCardProps) {
  const [text, setText] = useState(initialValue)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setText(initialValue)
  }, [initialValue])

  // Auto-resize
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [text])

  const isDirty = text !== initialValue

  const handleSave = async () => {
    if (!isDirty || saving) return
    setSaving(true)
    try {
      await onSave(text)
      setSaved(true)
      setTimeout(() => setSaved(false), 2200)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="rounded-card bg-surface border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="text-base">
            📝
          </span>
          <span className="font-semibold text-text text-sm">Journal</span>
        </div>
        <span className="text-xs text-text-muted tabular-nums">{text.length} chars</span>
      </div>

      {/* Textarea */}
      <div className="px-4 py-3">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="How did today go? What are you grateful for?"
          rows={3}
          className="w-full bg-transparent text-text text-sm leading-relaxed resize-none outline-none placeholder:text-text-muted/40 min-h-[72px]"
          aria-label="Journal entry"
        />
      </div>

      {/* Save */}
      <div className="px-4 pb-4">
        <button
          onClick={handleSave}
          disabled={!isDirty || saving}
          aria-label={saved ? 'Journal entry saved' : 'Save journal entry'}
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
          {saving ? 'Saving…' : saved ? 'Saved ✓' : 'Save Entry'}
        </button>
      </div>
    </div>
  )
}
