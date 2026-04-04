'use client'

import { cn } from '@/lib/utils'

/**
 * Proximity glow overlay — reads --glow-x / --glow-y CSS vars
 * set by the parent card's onMouseMove handler.
 * Parent must have: position:relative  overflow:hidden  className="group"
 */
export function GlowingEffect({
  className,
  spread = 90,
  color = 'rgba(255, 121, 0, 0.22)',
}: {
  className?: string
  /** Radial gradient radius in px */
  spread?: number
  /** CSS color at center of gradient */
  color?: string
}) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit]',
        'opacity-0 group-hover:opacity-100',
        'transition-opacity duration-300 ease-in-out',
        className
      )}
      style={{
        background: `radial-gradient(circle ${spread}px at var(--glow-x, 50%) var(--glow-y, 50%), ${color}, transparent 70%)`,
      }}
    />
  )
}
