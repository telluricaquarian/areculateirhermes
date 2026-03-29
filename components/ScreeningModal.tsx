'use client'

import { useEffect, useRef, useState } from 'react'
import * as RadixDialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

const OPTIONS = [
  'I run a small business or agency',
  'I\'m a founder or operator scaling a team',
  'I\'m exploring AI tools for my workflow',
  'I represent a larger organization',
]

export default function ScreeningModal() {
  const [open, setOpen]         = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const [done, setDone]         = useState(false)
  // Prevents re-opening if user closes and the component re-renders
  const hasAutoOpened = useRef(false)

  useEffect(() => {
    if (hasAutoOpened.current) return
    const id = setTimeout(() => {
      hasAutoOpened.current = true
      setOpen(true)
    }, 2000)
    return () => clearTimeout(id)
  }, [])

  function handleContinue() {
    if (!selected) return
    setDone(true)
  }

  return (
    <RadixDialog.Root open={open} onOpenChange={setOpen}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" />

        <RadixDialog.Content
          aria-describedby={undefined}
          className="fixed top-1/2 left-1/2 z-50 w-full max-w-[min(400px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[#FF7900]/20 bg-[#0c0c0c] shadow-[0_0_60px_rgba(255,121,0,0.10),0_8px_40px_rgba(0,0,0,0.85)] focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200"
        >
          <RadixDialog.Close
            className="absolute top-4 right-4 text-[#555] hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </RadixDialog.Close>

          <div className="px-6 py-6 flex flex-col gap-5">
            {done ? (
              <div className="flex flex-col items-center text-center gap-3 py-4">
                <p className="text-white text-sm font-medium tracking-tight">You&apos;re all set.</p>
                <p className="text-[#555] text-xs leading-relaxed">
                  We&apos;ll tailor your experience accordingly.
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-2 px-6 py-2.5 rounded-full border border-[#c85a20] bg-transparent text-[#e86c2c] text-sm font-medium tracking-wide hover:bg-[#c85a20]/10 transition-colors"
                >
                  Continue
                </button>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-1.5 pr-6">
                  <h2 className="text-white text-base font-semibold tracking-tight">
                    Quick question before you join
                  </h2>
                  <p className="text-[#666] text-xs leading-relaxed">
                    Help us point you in the right direction.
                  </p>
                </div>

                <p className="text-[#999] text-sm">
                  Which best describes you?
                </p>

                <ul className="flex flex-col gap-2">
                  {OPTIONS.map(opt => (
                    <li key={opt}>
                      <button
                        onClick={() => setSelected(opt)}
                        className={[
                          'w-full text-left px-4 py-3 rounded-lg border text-sm transition-all',
                          selected === opt
                            ? 'border-[#FF7900]/60 text-white bg-[#FF7900]/8'
                            : 'border-[#1e1e1e] text-[#888] hover:border-[#333] hover:text-[#aaa]',
                        ].join(' ')}
                      >
                        {opt}
                      </button>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleContinue}
                  disabled={!selected}
                  className="px-6 py-2.5 rounded-full border border-[#c85a20] bg-transparent text-[#e86c2c] text-sm font-medium tracking-wide hover:bg-[#c85a20]/10 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                >
                  Continue
                </button>
              </>
            )}
          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
