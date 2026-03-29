'use client'

import { forwardRef } from 'react'

// ---------------------------------------------------------------------------
// LiquidMetalInput
//
// A pill-shaped input with a slowly-rotating conic-gradient border that
// simulates a liquid-metal / meta-surface specular highlight.
//
// Mechanism:
//   • Outer wrapper: overflow:hidden + border-radius:9999px + padding:1.5px
//   • A 200%-sized child div spins a conic-gradient behind everything —
//     its edge shows through the 1.5px gap as an animated metallic border.
//   • Inner capsule covers the center with a dark radial-gradient background,
//     making the border the only visible part of the spinning layer.
//   • A secondary shimmer div slides a soft highlight across the field surface.
// ---------------------------------------------------------------------------

type LiquidMetalInputProps = React.InputHTMLAttributes<HTMLInputElement>

const LiquidMetalInput = forwardRef<HTMLInputElement, LiquidMetalInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="liquid-metal-capsule relative rounded-full p-[1.5px] overflow-hidden">

        {/* ── Spinning metallic border gradient ── */}
        <div
          className="liquid-metal-spin absolute pointer-events-none"
          style={{
            inset: '-50%',
            width: '200%',
            height: '200%',
            background: [
              'conic-gradient(',
              '  from 0deg,',
              '  rgba(10,6,2,1)        0deg,',
              '  rgba(232,108,44,0.45) 50deg,',
              '  rgba(232,108,44,0.9)  80deg,',
              '  rgba(255,215,165,0.95) 100deg,',
              '  rgba(255,255,255,0.65) 115deg,',
              '  rgba(255,210,155,0.8)  130deg,',
              '  rgba(200,90,30,0.6)   160deg,',
              '  rgba(10,6,2,1)        210deg,',
              '  rgba(5,3,1,1)         270deg,',
              '  rgba(60,28,5,0.35)    310deg,',
              '  rgba(232,108,44,0.25) 340deg,',
              '  rgba(10,6,2,1)        360deg',
              ')',
            ].join(''),
          }}
          aria-hidden="true"
        />

        {/* ── Inner capsule — covers spinning layer except 1.5px rim ── */}
        <div
          className="relative rounded-full overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 20%, rgba(255,255,255,0.025) 0%, transparent 70%), #080808',
          }}
        >
          {/* ── Shimmer streak — travels across surface ── */}
          <div className="liquid-metal-shimmer-track absolute inset-0 rounded-full overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="liquid-metal-shimmer" />
          </div>

          {/* ── The actual input ── */}
          <input
            ref={ref}
            {...props}
            className={[
              'relative w-full px-5 py-2.5',
              'bg-transparent',
              'text-sm text-white',
              'placeholder:text-[#383838]',
              'outline-none border-none appearance-none',
              'z-10',
              className ?? '',
            ].join(' ')}
          />
        </div>

      </div>
    )
  }
)

LiquidMetalInput.displayName = 'LiquidMetalInput'
export default LiquidMetalInput
