'use client'

import { useEffect, useRef, useState } from 'react'
import { EncryptedText } from '@/components/ui/encrypted-text'

const HEADLINES = [
  'Your own AI agent. 92 skills. Running 24/7.',
  'Premium Custom Website Build',
]

const REVEAL_DELAY_MS = 40
const FLIP_DELAY_MS   = 45
// How long the matrix animation runs: chars × reveal interval + small buffer
const INITIAL_ANIM_MS = HEADLINES[0].length * REVEAL_DELAY_MS + 600 // ~2360ms

const ROTATION_INTERVAL_MS = 5000
const FADE_DURATION_MS      = 400

export default function RotatingHeadline() {
  const [animDone, setAnimDone]     = useState(false)
  const [index, setIndex]           = useState(0)
  const [visible, setVisible]       = useState(true)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const fadeRef     = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Mark initial animation complete
  useEffect(() => {
    const t = setTimeout(() => setAnimDone(true), INITIAL_ANIM_MS)
    return () => clearTimeout(t)
  }, [])

  // Start rotation once animation is done
  useEffect(() => {
    if (!animDone) return

    intervalRef.current = setInterval(() => {
      // Fade out
      setVisible(false)

      // After fade-out, swap text and fade in
      fadeRef.current = setTimeout(() => {
        setIndex(i => (i + 1) % HEADLINES.length)
        setVisible(true)
      }, FADE_DURATION_MS)
    }, ROTATION_INTERVAL_MS)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (fadeRef.current)     clearTimeout(fadeRef.current)
    }
  }, [animDone])

  // ── Initial matrix phase ─────────────────────────────────────────────────
  if (!animDone) {
    return (
      <EncryptedText
        text={HEADLINES[0]}
        encryptedClassName="text-[#444]"
        revealedClassName="text-white"
        revealDelayMs={REVEAL_DELAY_MS}
        flipDelayMs={FLIP_DELAY_MS}
      />
    )
  }

  // ── Rotation phase ───────────────────────────────────────────────────────
  return (
    <span
      className="transition-opacity ease-in-out"
      style={{
        opacity: visible ? 1 : 0,
        transitionDuration: `${FADE_DURATION_MS}ms`,
      }}
    >
      {HEADLINES[index]}
    </span>
  )
}
