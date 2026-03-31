'use client'

import { useEffect, useRef } from 'react'
import * as RadixDialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

import {
  Dialog,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog'

type Props = {
  open: boolean
  onClose: () => void
}

export default function AreculateirVideoModal({ open, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Play on open, pause + reset on close
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (open) {
      video.currentTime = 0
      video.play().catch(() => {/* autoplay blocked — controls visible as fallback */})
    } else {
      video.pause()
      video.currentTime = 0
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={next => { if (!next) onClose() }}>
      <DialogPortal>
        <DialogOverlay className="bg-black/80 backdrop-blur-md" />

        <RadixDialog.Content
          aria-describedby={undefined}
          className="fixed top-1/2 left-1/2 z-50 w-full max-w-[min(680px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#FF7900]/20 bg-[#080808] shadow-[0_0_80px_rgba(255,121,0,0.14),0_16px_60px_rgba(0,0,0,0.95)] overflow-hidden focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-250"
        >
          {/* Close button — always visible */}
          <RadixDialog.Close
            onClick={onClose}
            className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-black/60 border border-[#FF7900]/20 text-[#666] hover:text-white hover:border-[#FF7900]/40 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </RadixDialog.Close>

          {/* Video */}
          <div className="relative w-full aspect-video bg-black">
            <video
              ref={videoRef}
              src="/areculateirscreenrecord.mp4"
              className="w-full h-full object-cover"
              muted
              playsInline
              controls
            />
            {/* Subtle bottom fade into caption area */}
            <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />
          </div>

          {/* Caption */}
          <div className="flex flex-col items-center gap-1 px-6 py-5 text-center">
            <DialogTitle className="text-white text-sm font-semibold tracking-tight">
              View Areculateir
            </DialogTitle>
            <div className="flex items-center gap-2">
              <span className="block w-8 h-px bg-[#FF7900]/30" />
              <span className="text-[#555] text-[11px] tracking-wide uppercase">
                Presented by Llewellyn Fisher
              </span>
              <span className="block w-8 h-px bg-[#FF7900]/30" />
            </div>
          </div>
        </RadixDialog.Content>
      </DialogPortal>
    </Dialog>
  )
}
