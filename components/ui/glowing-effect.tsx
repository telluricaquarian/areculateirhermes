'use client'

import { cn } from '@/lib/utils'

/**
 * Proximity spotlight overlay — sits at z-10 with mix-blend-mode:screen
 * so it renders above card content without obscuring text/images.
 * Parent must have: position:relative  className="group"
 * Parent onMouseMove must set --glow-x / --glow-y CSS vars.
 */
export function GlowingEffect({
  className,
  spread = 110,
  color = 'rgba(255, 121, 0, 0.50)',
}: {
  className?: string
  /** Radial gradient radius in px */
  spread?: number
  /** CSS color at the center of the spotlight */
  color?: string
}) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit] z-10',
        'opacity-0 group-hover:opacity-100',
        'transition-opacity duration-300 ease-in-out',
        className
      )}
      style={{
        background: `radial-gradient(circle ${spread}px at var(--glow-x, 50%) var(--glow-y, 50%), ${color}, transparent 65%)`,
      }}
    />
  )
}
