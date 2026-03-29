'use client'

import { useRef, useState } from 'react'
import LiquidMetalInput from '@/components/ui/LiquidMetalInput'
import { getEmailValidationStatus } from '@/lib/emailValidation'

// ---------------------------------------------------------------------------
// Step definitions
// ---------------------------------------------------------------------------
const STEPS = [
  { key: 'email',   placeholder: 'Work email',               type: 'email', cta: 'Continue', autocomplete: 'email' },
  { key: 'name',    placeholder: 'What should we call you?', type: 'text',  cta: 'Continue', autocomplete: 'name'  },
  { key: 'social',  placeholder: 'Best social handle',       type: 'text',  cta: 'Continue', autocomplete: 'off'   },
  { key: 'website', placeholder: 'Website or brand URL',     type: 'url',   cta: 'Finish',   autocomplete: 'url'   },
] as const

type StepKey = (typeof STEPS)[number]['key']
type FormData = Record<StepKey, string>

// ---------------------------------------------------------------------------
// Persistence helper
// Calls /api/leads with the current partial lead payload.
// Fire-and-forget — errors are silenced to avoid blocking UX.
// ---------------------------------------------------------------------------
async function saveLead(payload: Partial<FormData> & { completedStep: number }) {
  try {
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, updatedAt: new Date().toISOString() }),
    })
  } catch {
    // Intentionally silenced — lead save is best-effort
  }
}

// ---------------------------------------------------------------------------
// Google Sheets webhook — fires on final step completion.
// Uses no-cors because Google Apps Script webhooks don't return CORS headers.
// Opaque response is expected; errors are silenced to avoid blocking UX.
// ---------------------------------------------------------------------------
async function submitToSheets(data: FormData) {
  const url = process.env.NEXT_PUBLIC_HERMES_SHEET_WEBHOOK_URL
  if (!url) return
  try {
    const { status: emailStatus } = getEmailValidationStatus(data.email)
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email:           data.email,
        name:            data.name,
        socialMedia:     data.social,
        website:         data.website,
        emailValidation: emailStatus,
        submittedAt:     new Date().toISOString(),
        source:          'areculateirhermes',
      }),
    })
  } catch {
    // Intentionally silenced — webhook submission is best-effort
  }
}

const pause = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

type SpecialPhase = 'email-confirmed' | 'complete' | null

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function StagedLeadForm() {
  const [step, setStep]         = useState(0)
  const [formData, setFormData] = useState<FormData>({ email: '', name: '', social: '', website: '' })
  const [value, setValue]       = useState('')
  const [error, setError]       = useState('')
  const [visible, setVisible]   = useState(true)
  const [phase, setPhase]       = useState<SpecialPhase>(null)
  const [busy, setBusy]         = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const current = STEPS[step]
  const isLast  = step === STEPS.length - 1

  // ── Validation ────────────────────────────────────────────────────────────
  function validate(): boolean {
    if (current.key === 'email') {
      const result = getEmailValidationStatus(value)
      if (result.status !== 'valid') {
        setError(result.message ?? 'Please enter a valid email address.')
        return false
      }
      return true
    }
    if (current.key === 'website') return true   // optional
    return value.trim().length > 0
  }

  // ── Animated transition helper ────────────────────────────────────────────
  async function transition(fn: () => void) {
    setVisible(false)
    await pause(180)
    fn()
    await pause(20)
    setVisible(true)
    setTimeout(() => inputRef.current?.focus(), 60)
  }

  // ── Advance ───────────────────────────────────────────────────────────────
  async function handleContinue() {
    if (busy || phase !== null) return
    if (!validate()) {
      // error already set inside validate() for email; set generic message for other fields
      if (current.key !== 'email') setError('This field is required.')
      return
    }

    setError('')
    setBusy(true)

    const updated: FormData = { ...formData, [current.key]: value.trim() }
    setFormData(updated)

    // Save partial lead immediately on every step
    await saveLead({ ...updated, completedStep: step + 1 })

    // Send to Google Sheets on every step — captures email immediately,
    // then updates the row with richer data as the user progresses.
    submitToSheets(updated)

    if (isLast) {
      await transition(() => setPhase('complete'))
      setBusy(false)
      return
    }

    if (step === 0) {
      // Brief email confirmation before moving to name
      await transition(() => setPhase('email-confirmed'))
      await pause(1200)
      await transition(() => {
        setPhase(null)
        setStep(1)
        setValue('')
      })
      setBusy(false)
      return
    }

    // Normal advance
    await transition(() => {
      setStep(s => s + 1)
      setValue('')
    })
    setBusy(false)
  }

  // ── Back ──────────────────────────────────────────────────────────────────
  async function handleBack() {
    if (busy || step === 0 || phase !== null) return
    setBusy(true)
    setError('')
    const prevKey = STEPS[step - 1].key
    await transition(() => {
      setStep(s => s - 1)
      setValue(formData[prevKey])
    })
    setBusy(false)
  }

  // ── Inline transition style ───────────────────────────────────────────────
  const transitionStyle: React.CSSProperties = {
    opacity:    visible ? 1 : 0,
    filter:     visible ? 'blur(0px)' : 'blur(6px)',
    transform:  visible ? 'translateY(0px)' : 'translateY(4px)',
    transition: 'opacity 0.18s ease, filter 0.18s ease, transform 0.18s ease',
  }

  return (
    <div className="w-full max-w-[280px] flex flex-col items-center">

      {/* ── Progress dots ── */}
      <div className="flex gap-1.5 mb-3 items-center" style={{ height: '5px' }}>
        {phase === null && STEPS.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              height: '5px',
              width:  i === step ? '14px' : '5px',
              background:
                i === step  ? '#e86c2c' :
                i < step    ? 'rgba(232,108,44,0.3)' :
                              'rgba(255,255,255,0.1)',
            }}
          />
        ))}
      </div>

      {/* ── Animated content area ── */}
      <div style={transitionStyle} className="w-full">

        {phase === 'complete' ? (
          <div className="text-center py-3">
            <p className="text-white text-sm font-medium tracking-tight">You&apos;re on the list.</p>
            <p className="text-[#555] text-xs mt-1.5">We&apos;ll be in touch soon.</p>
          </div>

        ) : phase === 'email-confirmed' ? (
          <div className="text-center py-3">
            <p className="text-[#e86c2c] text-sm">Nice — let&apos;s personalize this.</p>
          </div>

        ) : (
          <div className="flex flex-col gap-2.5">
            <LiquidMetalInput
              ref={inputRef}
              type={current.type}
              value={value}
              onChange={e => { setValue(e.target.value); setError('') }}
              onKeyDown={e => { if (e.key === 'Enter') handleContinue() }}
              placeholder={current.placeholder}
              aria-label={current.placeholder}
              autoComplete={current.autocomplete}
              autoFocus={step === 0}
            />
            <button
              onClick={handleContinue}
              disabled={busy}
              className="px-6 py-2.5 rounded-full border border-[#c85a20] bg-transparent text-[#e86c2c] text-sm font-medium tracking-wide hover:bg-[#c85a20]/10 transition-colors disabled:opacity-40"
            >
              {current.cta}
            </button>
            {error && (
              <p role="alert" className="text-red-400/70 text-xs text-center">
                {error}
              </p>
            )}
          </div>
        )}
      </div>

      {/* ── Back affordance ── */}
      {step > 0 && phase === null && (
        <button
          onClick={handleBack}
          disabled={busy}
          className="mt-2.5 text-[#383838] text-xs hover:text-[#555] transition-colors disabled:opacity-30"
        >
          ← back
        </button>
      )}

      {/* ── Microcopy ── */}
      {phase !== 'complete' && (
        <p className="mt-3 text-[#333] text-[10px] text-center tracking-wide">
          We save your progress as you go.
        </p>
      )}
    </div>
  )
}
