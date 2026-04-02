'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import * as RadixDialog from '@radix-ui/react-dialog'
import { X, Mic, MicOff, PhoneOff } from 'lucide-react'
import Image from 'next/image'
import Vapi from '@vapi-ai/web'
import { Orb, type AgentState } from '@/components/ui/orb'

// ---------------------------------------------------------------------------
// Vapi singleton — created once per module load, not per render.
// Requires NEXT_PUBLIC_VAPI_PUBLIC_KEY in .env.local
// ---------------------------------------------------------------------------
const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!)

// ---------------------------------------------------------------------------
// AgentCallModal
// ---------------------------------------------------------------------------
type Props = {
  open: boolean
  onClose: () => void
}

export default function AgentCallModal({ open, onClose }: Props) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected]   = useState(false)
  const [agentState, setAgentState]     = useState<AgentState>(null)
  const [statusText, setStatusText]     = useState('Ready')
  const [isMuted, setIsMuted]           = useState(false)

  // Manual volume refs — updated by Vapi volume-level events
  const inputRef  = useRef(0)
  const outputRef = useRef(0)

  // ── Shared error recovery ────────────────────────────────────────────────
  const handleConnectionError = useCallback((msg: string, err?: unknown) => {
    console.error('[Vapi]', msg, err ?? '')
    setIsConnecting(false)
    setIsConnected(false)
    setAgentState(null)
    setStatusText(msg)
    inputRef.current  = 0
    outputRef.current = 0
  }, [])

  // ── Vapi event listeners ─────────────────────────────────────────────────
  useEffect(() => {
    vapi.on('call-start', () => {
      console.log('[Vapi] call-start')
      setIsConnecting(false)
      setIsConnected(true)
      setAgentState('listening')
      setStatusText('Listening')
    })

    vapi.on('call-end', () => {
      console.log('[Vapi] call-end')
      setIsConnected(false)
      setIsConnecting(false)
      setAgentState(null)
      setStatusText('Call ended')
      inputRef.current  = 0
      outputRef.current = 0
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vapi.on('error', (err: any) => {
      handleConnectionError('Unable to connect', err)
    })

    vapi.on('speech-start', () => {
      setAgentState('listening')
      setStatusText('Listening')
    })

    vapi.on('speech-end', () => {
      setAgentState('thinking')
      setStatusText('Processing…')
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vapi.on('message', (msg: any) => {
      if (msg?.type === 'assistant') {
        setAgentState('talking')
        setStatusText('Responding')
      }
    })

    // Volume level events — drive Orb manual volumes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vapi.on('volume-level', (vol: any) => {
      inputRef.current = vol as number
    })

    // Drive output volume from agentState transitions instead of an
    // audio-output event (not a valid VapiEventNames entry).

    return () => {
      vapi.removeAllListeners()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleConnectionError])

  // ── Drive Orb output volume from agentState ──────────────────────────────
  useEffect(() => {
    outputRef.current = agentState === 'talking' ? 0.7 : 0
  }, [agentState])

  // ── Mute sync ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isConnected) {
      vapi.setMuted(isMuted)
      if (isMuted) inputRef.current = 0
    }
  }, [isMuted, isConnected])

  // ── Reset when modal closes ───────────────────────────────────────────────
  useEffect(() => {
    if (!open) {
      if (isConnected || isConnecting) vapi.stop()
      setIsConnecting(false)
      setIsConnected(false)
      setAgentState(null)
      setStatusText('Ready')
      setIsMuted(false)
      inputRef.current  = 0
      outputRef.current = 0
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // ── Connect ───────────────────────────────────────────────────────────────
  const handleStartCall = useCallback(async () => {
    console.log('[Vapi] attempting start…')
    setIsConnecting(true)
    setAgentState('thinking')
    setStatusText('Connecting…')
    try {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!)
      console.log('[Vapi] start() resolved')
    } catch (err) {
      handleConnectionError('Microphone or network error', err)
    }
  }, [handleConnectionError])

  // ── End call ──────────────────────────────────────────────────────────────
  const handleEndCall = useCallback(async () => {
    await vapi.stop()
    // call-end event will handle state reset
  }, [])

  const canStart     = !isConnecting && !isConnected
  const isActive     = isConnected

  function handleOpenChange(next: boolean) {
    if (!next && isActive) return  // block backdrop-close while call is live
    if (!next) onClose()
  }

  return (
    <RadixDialog.Root open={open} onOpenChange={handleOpenChange}>
      <RadixDialog.Portal>

        {/* Backdrop */}
        <RadixDialog.Overlay className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-250" />

        {/* Outer content — transparent wrapper so card has its own visual boundary */}
        <RadixDialog.Content
          aria-describedby={undefined}
          className="fixed top-1/2 left-1/2 z-50 w-full max-w-[min(400px,calc(100vw-2rem))] md:max-w-[min(740px,calc(100vw-4rem))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto max-h-[90dvh] focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-250"
        >
          {/* ── Responsive container ──────────────────────────────────── */}
          <div className="flex flex-col md:flex-row md:items-start gap-5 md:gap-8">

            {/* ── MOBILE ONLY: italic top line (above card) ─────────────── */}
            <p className="md:hidden text-white/55 text-[11px] italic leading-relaxed text-center px-1">
              Custom Concierge / Admin voice Agent Set-up Service also available as an ancillary or ad-hoc service.
            </p>

            {/* ── Agent card — has its own rounded panel styling ────────── */}
            <div className="relative rounded-2xl border border-[#FF7900]/15 bg-[#080808] shadow-[0_0_80px_rgba(255,121,0,0.08),0_16px_48px_rgba(0,0,0,0.9)] flex flex-col items-center px-8 pt-8 pb-8 gap-6 shrink-0 w-full md:w-auto md:min-w-[320px]">

              {/* Close — anchored to card, hidden while call is live */}
              {!isActive && !isConnecting && (
                <RadixDialog.Close
                  className="absolute top-4 right-4 text-[#444] hover:text-[#888] transition-colors z-10"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </RadixDialog.Close>
              )}

              {/* Header */}
              <div className="flex flex-col items-center gap-1.5 text-center">
                <RadixDialog.Title className="text-white text-base font-semibold tracking-tight">
                  Talk with an Agent
                </RadixDialog.Title>
                <p className="text-[#555] text-xs leading-relaxed max-w-[260px]">
                  You&apos;ll be speaking with Lara
                </p>
              </div>

              {/* Orb */}
              <div className="w-48 h-48 shrink-0">
                <Orb
                  colors={['#1a0d00', '#3d1a00']}
                  agentState={agentState}
                  volumeMode="manual"
                  manualInput={inputRef.current}
                  manualOutput={outputRef.current}
                  className="w-full h-full"
                />
              </div>

              {/* Status */}
              <p className="text-[#555] text-xs tracking-widest uppercase">
                {statusText}
              </p>

              {/* Controls */}
              <div className="flex items-center gap-3">
                {isActive && (
                  <button
                    onClick={() => setIsMuted(m => !m)}
                    className="w-10 h-10 rounded-full border border-[#222] flex items-center justify-center text-[#555] hover:text-white hover:border-[#444] transition-all"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                )}
                {canStart && (
                  <button
                    onClick={handleStartCall}
                    className="px-7 py-2.5 rounded-full border border-[#c85a20] bg-transparent text-[#e86c2c] text-sm font-medium tracking-wide hover:bg-[#c85a20]/10 transition-colors"
                  >
                    Connect
                  </button>
                )}
                {isConnecting && (
                  <button disabled className="px-7 py-2.5 rounded-full border border-[#c85a20]/40 text-[#e86c2c]/40 text-sm font-medium tracking-wide cursor-not-allowed">
                    Connecting…
                  </button>
                )}
                {isActive && (
                  <button
                    onClick={handleEndCall}
                    className="w-10 h-10 rounded-full bg-red-900/40 border border-red-800/60 flex items-center justify-center text-red-400 hover:bg-red-900/60 transition-all"
                    aria-label="End call"
                  >
                    <PhoneOff className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>{/* end agent card */}

            {/* ── MOBILE ONLY: info block below card ───────────────────── */}
            <div className="md:hidden flex flex-col gap-3 px-1 pb-2">
              <h3 className="text-white text-sm font-semibold tracking-tight">
                Who is &quot;Lara&quot;?
              </h3>
              <p className="text-[#e86c2c]/90 text-xs leading-relaxed">
                Lara is a custom Areculateir Directed Agent that can help to qualify whether our premium site build and or agentic implementation is suitable for your business.
              </p>
              <p className="text-white/30 text-[10px] leading-relaxed">
                *Your call may be recorded and utilised for the training of the voice agent / model to help it better understand the clients we serve.
              </p>
            </div>

            {/* ── DESKTOP ONLY: right info column ──────────────────────── */}
            <div className="hidden md:flex flex-col gap-5 justify-center py-2 max-w-[260px]">
              {/* Italic service note */}
              <p className="text-white/55 text-[11px] italic leading-relaxed">
                Custom Concierge / Admin voice Agent Set-up Service also available as an ancillary or ad-hoc service.
              </p>
              {/* Aa logo — existing /neworange.png asset */}
              <Image
                src="/neworange.png"
                alt="Areculateir"
                width={28}
                height={28}
                draggable={false}
                className="object-contain opacity-60 pointer-events-none select-none [user-select:none] [-webkit-user-drag:none]"
              />
              {/* Who is Lara */}
              <div className="flex flex-col gap-2">
                <h3 className="text-white text-sm font-semibold tracking-tight">
                  Who is &quot;Lara&quot;?
                </h3>
                <p className="text-[#e86c2c]/90 text-xs leading-relaxed">
                  Lara is a custom Areculateir Directed Agent that can help to qualify whether our premium site build and or agentic implementation is suitable for your business.
                </p>
              </div>
              {/* Disclaimer */}
              <p className="text-white/30 text-[10px] leading-relaxed mt-auto">
                *Your call may be recorded and utilised for the training of the voice agent / model to help it better understand the clients we serve.
              </p>
            </div>

          </div>{/* end responsive container */}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
