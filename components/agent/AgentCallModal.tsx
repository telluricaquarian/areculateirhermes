'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import * as RadixDialog from '@radix-ui/react-dialog'
import { X, Mic, MicOff, PhoneOff } from 'lucide-react'
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

  // ── Vapi event listeners ─────────────────────────────────────────────────
  useEffect(() => {
    vapi.on('call-start', () => {
      setIsConnecting(false)
      setIsConnected(true)
      setAgentState('listening')
      setStatusText('Listening')
    })

    vapi.on('call-end', () => {
      setIsConnected(false)
      setIsConnecting(false)
      setAgentState(null)
      setStatusText('Call ended')
      inputRef.current  = 0
      outputRef.current = 0
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
      // Vapi emits a single 0–1 number representing microphone input
      inputRef.current = isMuted ? 0 : (vol as number)
    })

    // Drive output volume from agentState transitions instead of an
    // audio-output event (not a valid VapiEventNames entry).

    return () => {
      vapi.removeAllListeners()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    setIsConnecting(true)
    setAgentState('thinking')
    setStatusText('Connecting…')
    await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!)
  }, [])

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

        {/* Panel */}
        <RadixDialog.Content
          aria-describedby={undefined}
          className="fixed top-1/2 left-1/2 z-50 w-full max-w-[min(400px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#FF7900]/15 bg-[#080808] shadow-[0_0_80px_rgba(255,121,0,0.08),0_16px_48px_rgba(0,0,0,0.9)] focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-250"
        >
          {/* Close — hidden while call is live */}
          {!isActive && !isConnecting && (
            <RadixDialog.Close
              className="absolute top-4 right-4 text-[#444] hover:text-[#888] transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </RadixDialog.Close>
          )}

          <div className="flex flex-col items-center px-8 pt-8 pb-8 gap-6">

            {/* Header */}
            <div className="flex flex-col items-center gap-1.5 text-center">
              <RadixDialog.Title className="text-white text-base font-semibold tracking-tight">
                Talk with an Agent
              </RadixDialog.Title>
              <p className="text-[#555] text-xs leading-relaxed max-w-[260px]">
                You'll be speaking with Lara
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

              {/* Mute — only during active call */}
              {isActive && (
                <button
                  onClick={() => setIsMuted(m => !m)}
                  className="w-10 h-10 rounded-full border border-[#222] flex items-center justify-center text-[#555] hover:text-white hover:border-[#444] transition-all"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted
                    ? <MicOff className="w-4 h-4" />
                    : <Mic className="w-4 h-4" />
                  }
                </button>
              )}

              {/* Connect */}
              {canStart && (
                <button
                  onClick={handleStartCall}
                  className="px-7 py-2.5 rounded-full border border-[#c85a20] bg-transparent text-[#e86c2c] text-sm font-medium tracking-wide hover:bg-[#c85a20]/10 transition-colors"
                >
                  Connect
                </button>
              )}

              {/* Connecting — disabled pill */}
              {isConnecting && (
                <button disabled className="px-7 py-2.5 rounded-full border border-[#c85a20]/40 text-[#e86c2c]/40 text-sm font-medium tracking-wide cursor-not-allowed">
                  Connecting…
                </button>
              )}

              {/* End call */}
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

          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
