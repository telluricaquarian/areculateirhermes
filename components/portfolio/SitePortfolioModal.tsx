'use client'

import Image from 'next/image'
import * as RadixDialog from '@radix-ui/react-dialog'
import { LayoutGrid, X } from 'lucide-react'

import {
  Dialog,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { GlowingEffect } from '@/components/ui/glowing-effect'

const PROJECTS = [
  {
    name: 'AvantSavant',
    description: 'Edu. Site for the Aquarian Age',
    src: '/avantsavant.png',
  },
  {
    name: 'IdeationStation',
    description: 'Creative Direction & Branding Site Aid',
    src: '/isting.png',
  },
  {
    name: 'Areculateir',
    description: 'W.a.a.S & A.I Agency',
    src: '/areculateirthumbnail.png',
  },
  {
    name: 'Negentropic AI',
    description: 'IDE Built Automations',
    src: '/naithumbnail.png',
  },
  {
    name: 'TheThinkingSpirit',
    description: 'Kangen Water Edu. / Landing Page',
    src: '/ttslaptop.png',
  },
  {
    name: 'Quote Template',
    description: 'High-End Quote Request Interface',
    src: '/quotetemplate.png',
  },
]

export default function SitePortfolioModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-1.5 text-[#555] text-[11px] md:text-xs tracking-wide hover:text-[#e86c2c] transition-colors">
          <LayoutGrid className="w-3 h-3" />
          View Site Portfolio
        </button>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay className="bg-black/75 backdrop-blur-sm" />

        <RadixDialog.Content
          aria-describedby={undefined}
          className="fixed top-1/2 left-1/2 z-50 w-full max-w-[min(560px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[#FF7900]/20 bg-[#0c0c0c] shadow-[0_0_60px_rgba(255,121,0,0.12),0_8px_40px_rgba(0,0,0,0.85)] overflow-y-auto max-h-[85dvh] focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200"
        >
          {/* Close button */}
          <RadixDialog.Close
            className="absolute top-4 right-4 text-[#555] hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </RadixDialog.Close>

          <div className="px-6 py-6 flex flex-col gap-5">
            <DialogHeader>
              <DialogTitle className="text-white text-base font-semibold tracking-tight pr-6">
                Site Portfolio
              </DialogTitle>
              <p className="text-[#555] text-xs mt-1">
                A selection of projects built by Areculateir.
              </p>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-3">
              {PROJECTS.map(({ name, description, src }) => (
                <div
                  key={name}
                  className="group relative isolate flex flex-col gap-2 rounded-lg border border-[#1f1f1f] hover:border-[#FF7900]/40 bg-[#0a0a0a] transition-all duration-300 hover:outline hover:outline-1 hover:outline-[#FF7900]/25"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    e.currentTarget.style.setProperty('--glow-x', `${e.clientX - rect.left}px`)
                    e.currentTarget.style.setProperty('--glow-y', `${e.clientY - rect.top}px`)
                  }}
                >
                  <GlowingEffect />
                  <div className="relative w-full aspect-video overflow-hidden">
                    <Image
                      src={src}
                      alt={name}
                      fill
                      className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
                      sizes="(max-width: 560px) 50vw, 260px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="px-3 pb-3 flex flex-col gap-0.5">
                    <span className="text-white text-xs font-medium tracking-tight">{name}</span>
                    <span className="text-[#555] text-[10px] leading-snug">{description}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[#444] text-xs leading-relaxed border-t border-[#1a1a1a] pt-4">
              Interested in a custom build?{' '}
              <span className="text-[#e86c2c]">Speak with an agent</span> or submit your details above.
            </p>
          </div>
        </RadixDialog.Content>
      </DialogPortal>
    </Dialog>
  )
}
