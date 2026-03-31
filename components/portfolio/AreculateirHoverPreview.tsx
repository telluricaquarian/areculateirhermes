'use client'

import { useEffect, useRef, useState } from 'react'

const HREF = 'https://www.areculateir.com'

/**
 * Desktop: show preview card on hover over the link.
 *          Moving into the card keeps it open.
 *          Clicking the link navigates normally.
 *
 * Mobile:  first tap opens preview, second tap navigates.
 *          Tapping outside closes preview.
 *          A "Visit site →" button inside the card also navigates.
 */
export default function AreculateirHoverPreview() {
  const [visible, setVisible]   = useState(false)
  const tapCount                = useRef(0)
  const videoRef                = useRef<HTMLVideoElement>(null)
  const containerRef            = useRef<HTMLDivElement>(null)

  // ── Play / pause video with visibility ─────────────────────────────────
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (visible) {
      video.currentTime = 0
      video.play().catch(() => {/* muted autoplay blocked */})
    } else {
      video.pause()
      video.currentTime = 0
    }
  }, [visible])

  // ── Close on outside tap (mobile) ──────────────────────────────────────
  useEffect(() => {
    if (!visible) return
    function onOutside(e: TouchEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close()
      }
    }
    document.addEventListener('touchstart', onOutside)
    return () => document.removeEventListener('touchstart', onOutside)
  }, [visible])

  // ── Escape key (desktop) ───────────────────────────────────────────────
  useEffect(() => {
    if (!visible) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [visible])

  function close() {
    setVisible(false)
    tapCount.current = 0
  }

  // ── Desktop hover ──────────────────────────────────────────────────────
  function onMouseEnter() {
    setVisible(true)
  }

  function onMouseLeave() {
    setVisible(false)
  }

  // ── Mobile tap on link ─────────────────────────────────────────────────
  function onTouchEnd(e: React.TouchEvent<HTMLAnchorElement>) {
    tapCount.current += 1
    if (tapCount.current === 1) {
      e.preventDefault()
      setVisible(true)
    }
    // second tap falls through — href navigates naturally
  }

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* The footer link */}
      <a
        href={HREF}
        target="_blank"
        rel="noopener noreferrer"
        onTouchEnd={onTouchEnd}
        className="text-[#e86c2c] hover:text-[#FF7900] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF7900]/60 rounded-sm"
      >
        Areculateir.com
      </a>

      {/* ── Preview card ───────────────────────────────────────────────── */}
      <div
        className={[
          // Positioning — above the link, centered on anchor
          'absolute bottom-[calc(100%+14px)] left-1/2 -translate-x-1/2',
          // Sizing
          'w-[min(320px,calc(100vw-2rem))]',
          // Chrome
          'rounded-2xl border border-white/10 bg-[#080808]',
          'shadow-[0_0_40px_rgba(255,121,0,0.10),0_8px_40px_rgba(0,0,0,0.90)]',
          // Visibility transition
          'transition-all duration-200 ease-in-out',
          visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-1 pointer-events-none',
          'z-50',
        ].join(' ')}
      >
        {/* Tail / pointer toward footer link */}
        <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-r border-b border-white/10 bg-[#080808]" />

        {/* Orange-framed video */}
        <div className="p-2">
          <div className="rounded-lg overflow-hidden border border-[#FF7900]/30 aspect-video bg-black">
            <video
              ref={videoRef}
              src="/areculateirscreenrecord.mp4"
              className="w-full h-full object-cover"
              muted
              playsInline
              loop
            />
          </div>
        </div>

        {/* Caption */}
        <div className="flex flex-col items-center gap-1 px-4 pb-4 text-center">
          <span className="text-white text-xs font-semibold tracking-tight">
            View Areculateir
          </span>
          <div className="flex items-center gap-2">
            <span className="block w-6 h-px bg-[#FF7900]/30" />
            <span className="text-[#555] text-[10px] tracking-wide uppercase">
              Presented by Llewellyn Fisher
            </span>
            <span className="block w-6 h-px bg-[#FF7900]/30" />
          </div>
          {/* Mobile CTA — navigates immediately */}
          <a
            href={HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 md:hidden text-[#e86c2c] text-[11px] tracking-wide hover:text-[#FF7900] transition-colors"
          >
            Visit site →
          </a>
        </div>
      </div>
    </div>
  )
}
