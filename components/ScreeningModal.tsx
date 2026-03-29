'use client'

import { useEffect, useRef, useState } from 'react'
import * as RadixDialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

export default function ScreeningModal() {
  const [open, setOpen] = useState(false)
  const hasAutoOpened = useRef(false)

  useEffect(() => {
    if (hasAutoOpened.current) return
    const id = setTimeout(() => {
      hasAutoOpened.current = true
      setOpen(true)
    }, 2000)
    return () => clearTimeout(id)
  }, [])

  return (
    <RadixDialog.Root open={open} onOpenChange={setOpen}>
      <RadixDialog.Portal>

        {/* Full-screen backdrop — dims and blurs the page */}
        <RadixDialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-300" />

        {/* Typographic content — no card border, near-transparent bg */}
        <RadixDialog.Content
          aria-describedby={undefined}
          className="fixed top-1/2 left-1/2 z-50 w-full max-w-[min(480px,calc(100vw-3rem))] -translate-x-1/2 -translate-y-1/2 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-300"
        >
          {/* Close icon — discreet, top-right */}
          <RadixDialog.Close
            className="absolute -top-8 right-0 text-[#444] hover:text-[#888] transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </RadixDialog.Close>

          <div className="flex flex-col gap-8 px-2 text-center">

            {/* Eyebrow */}
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#FF7900]/50">
              Quick note
            </p>

            {/* Block 1 */}
            <div className="flex flex-col gap-3">
              <RadixDialog.Title className="text-white text-xl font-semibold tracking-tight leading-snug">
                Who this service is for
              </RadixDialog.Title>
              <p className="text-[#888] text-sm leading-relaxed max-w-[340px] mx-auto">
                Built for operators, agencies, founders, and service businesses looking to systemize acquisition, follow-up, and workflow leverage.
              </p>
            </div>

            {/* Divider */}
            <div className="w-8 h-px bg-[#FF7900]/20 mx-auto" />

            {/* Block 2 */}
            <div className="flex flex-col gap-3">
              <h2 className="text-white text-xl font-semibold tracking-tight leading-snug">
                Value proposition / Use Cases
              </h2>
              <p className="text-[#888] text-sm leading-relaxed max-w-[360px] mx-auto">
                This infrastructure can capture and qualify leads, automate follow-up, support bookings, and reduce repetitive operational work — giving you a system that continues running around the clock.
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={() => setOpen(false)}
              className="self-center px-8 py-2.5 rounded-full border border-[#c85a20] bg-transparent text-[#e86c2c] text-sm font-medium tracking-wide hover:bg-[#c85a20]/10 transition-colors"
            >
              Continue
            </button>

          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
