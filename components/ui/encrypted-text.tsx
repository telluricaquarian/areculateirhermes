'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { cn } from '@/lib/utils'

// Vendored from Aceternity UI — https://ui.aceternity.com/components/encrypted-text

type EncryptedTextProps = {
  text: string
  className?: string
  revealDelayMs?: number
  charset?: string
  flipDelayMs?: number
  encryptedClassName?: string
  revealedClassName?: string
}

const DEFAULT_CHARSET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?'

function generateRandomCharacter(charset: string): string {
  return charset.charAt(Math.floor(Math.random() * charset.length))
}

function generateGibberishPreservingSpaces(original: string, charset: string): string {
  let result = ''
  for (let i = 0; i < original.length; i++) {
    result += original[i] === ' ' ? ' ' : generateRandomCharacter(charset)
  }
  return result
}

export const EncryptedText: React.FC<EncryptedTextProps> = ({
  text,
  className,
  revealDelayMs = 50,
  charset = DEFAULT_CHARSET,
  flipDelayMs = 50,
  encryptedClassName,
  revealedClassName,
}) => {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  const [revealCount, setRevealCount] = useState(0)
  const animationFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef(0)
  const lastFlipTimeRef = useRef(0)
  const scrambleCharsRef = useRef<string[]>(
    text ? generateGibberishPreservingSpaces(text, charset).split('') : [],
  )

  useEffect(() => {
    if (!isInView) return

    const initial = text ? generateGibberishPreservingSpaces(text, charset) : ''
    scrambleCharsRef.current = initial.split('')
    startTimeRef.current = performance.now()
    lastFlipTimeRef.current = startTimeRef.current
    setRevealCount(0)

    let isCancelled = false

    const update = (now: number) => {
      if (isCancelled) return
      const elapsed = now - startTimeRef.current
      const totalLength = text.length
      const currentReveal = Math.min(totalLength, Math.floor(elapsed / Math.max(1, revealDelayMs)))

      setRevealCount(currentReveal)

      if (currentReveal >= totalLength) return

      const timeSinceFlip = now - lastFlipTimeRef.current
      if (timeSinceFlip >= Math.max(0, flipDelayMs)) {
        for (let i = currentReveal; i < totalLength; i++) {
          scrambleCharsRef.current[i] =
            text[i] === ' ' ? ' ' : generateRandomCharacter(charset)
        }
        lastFlipTimeRef.current = now
      }

      animationFrameRef.current = requestAnimationFrame(update)
    }

    animationFrameRef.current = requestAnimationFrame(update)

    return () => {
      isCancelled = true
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [isInView, text, revealDelayMs, charset, flipDelayMs])

  if (!text) return null

  return (
    <motion.span ref={ref} className={cn(className)} aria-label={text} role="text">
      {text.split('').map((char, index) => {
        const isRevealed = index < revealCount
        const displayChar = isRevealed
          ? char
          : char === ' '
          ? ' '
          : (scrambleCharsRef.current[index] ?? generateRandomCharacter(charset))

        return (
          <span key={index} className={cn(isRevealed ? revealedClassName : encryptedClassName)}>
            {displayChar}
          </span>
        )
      })}
    </motion.span>
  )
}
