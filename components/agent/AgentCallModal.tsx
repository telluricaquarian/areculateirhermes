'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import * as RadixDialog from '@radix-ui/react-dialog'
import { X, Mic, MicOff, PhoneOff } from 'lucide-react'
import { Orb, type AgentState } from '@/components/ui/orb'

// ---------------------------------------------------------------------------
// Call lifecycle types
// ---------------------------------------------------------------------------
type CallStatus = 'idle' | 'connecting' | 'active' | 'ended'

const STATUS_LABELS: Record<CallStatus, string> = {
  idle:       'Ready',
  connecting: 'Connecting…',
  active:     'Connected',
  ended:      'Call ended',
}

// ---------------------------------------------------------------------------
// Simulated volume pulses while real Vapi audio analysis is not yet wired.
// Replace these with real analyser values once Vapi is connected.
// ---------------------------------------------------------------------------
function useSimulatedVolumes(agentState: AgentState) {
  const inputRef  = useRef(0)
  const outputRef = useRef(0)

  useEffect(() => {
    if (agentState === 'listening') {
      inputRef.current  = 0.6 + Math.random() * 0.35
      outputRef.current = 0
    } else if (agentState === 'talking') {
      inputRef.current  = 0
      outputRef.current = 0.55 + Math.random() * 0.4
    } else {
      inputRef.current  = 0
      outputRef.current = 0
    }
  }, [agentState])

  return { inputRef, outputRef }
}

// ---------------------------------------------------------------------------
// AgentCallModal
// ---------------------------------------------------------------------------
type Props = {
  open: boolean
  onClose: () => void
}

export default function AgentCallModal({ open, onClose }: Props) {
  const [callStatus, setCallStatus]   = useState<CallStatus>('idle')
  const [agentState, setAgentState]   = useState<AgentState>(null)
  const [isMuted, setIsMuted]         = useState(false)
  const demoTimerRef                  = useRef<ReturnType<typeof setInterval> | null>(null)
  const connectTimerRef               = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { inputRef, outputRef } = useSimulatedVolumes(agentState)

  // ── Reset when modal closes ────────────────────────────────────────────
  useEffect(() => {
    if (!open) {
      clearTimers()
      setCallStatus('idle')
      setAgentState(null)
      setIsMuted(false)
    }
  }, [open])

  function clearTimers() {
    if (demoTimerRef.current)   clearInterval(demoTimerRef.current)
    if (connectTimerRef.current) clearTimeout(connectTimerRef.current)
  }

  // ── Start call ────────────────────────────────────────────────────────
  // TODO [VAPI]: replace body with vapi.start(assistantId) call.
  // Hook into vapi events:
  //   vapi.on('call-start', onCallStart)
  //   vapi.on('speech-start', onSpeechStart)        → setAgentState('listening')
  //   vapi.on('speech-end', onSpeechEnd)             → setAgentState('talking')
  //   vapi.on('assistant-started-speaking', ...)     → setAgentState('talking')
  //   vapi.on('assistant-stopped-speaking', ...)     → setAgentState('listening')
  //   vapi.on('call-end', onCallEnd)                 → handleEndCall()
  const handleStartCall = useCallback(() => {
    setCallStatus('connecting')
    setAgentState('thinking')

    connectTimerRef.current = setTimeout(() => {
      setCallStatus('active')
      setAgentState('listening')

      // Demo alternation — remove once real Vapi events are wired
      let toggle = false
      demoTimerRef.current = setInterval(() => {
        toggle = !toggle
        setAgentState(toggle ? 'talking' : 'listening')
      }, 2800)
    }, 1800)
  }, [])

  // ── End call ──────────────────────────────────────────────────────────
  // TODO [VAPI]: call vapi.stop() here, then rely on 'call-end' event.
  const handleEndCall = useCallback(() => {
    clearTimers()
    setCallStatus('ended')
    setAgentState(null)

    setTimeout(() => {
      onClose()
    }, 1200)
  }, [onClose])

  const isActive    = callStatus === 'active'
  const isConnecting = callStatus === 'connecting'
  const canStart    = callStatus === 'idle' || callStatus === 'ended'

  // Prevent backdrop-close while call is active
  function handleOpenChange(next: boolean) {
    if (!next && isActive) return   // block close mid-call
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
          {/* Close — only shown when not mid-call */}
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
                Live voice connection to your autonomous employee
              </p>
            </div>

            {/* Orb */}
            <div className="w-48 h-48 shrink-0">
              <Orb
                colors={['#1a0d00', '#3d1a00']}
                agentState={agentState}
                volumeMode="manual"
                manualInput={isMuted ? 0 : inputRef.current}
                manualOutput={outputRef.current}
                className="w-full h-full"
              />
            </div>

            {/* Status */}
            <p className="text-[#555] text-xs tracking-widest uppercase">
              {STATUS_LABELS[callStatus]}
            </p>

            {/* Controls */}
            <div className="flex items-center gap-3">

              {/* Mute toggle — only during active call */}
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

              {/* Start / End */}
              {canStart ? (
                <button
                  onClick={handleStartCall}
                  className="px-7 py-2.5 rounded-full border border-[#c85a20] bg-transparent text-[#e86c2c] text-sm font-medium tracking-wide hover:bg-[#c85a20]/10 transition-colors"
                >
                  Connect
                </button>
              ) : isConnecting ? (
                <button disabled className="px-7 py-2.5 rounded-full border border-[#c85a20]/40 text-[#e86c2c]/40 text-sm font-medium tracking-wide cursor-not-allowed">
                  Connecting…
                </button>
              ) : isActive ? (
                <button
                  onClick={handleEndCall}
                  className="w-10 h-10 rounded-full bg-red-900/40 border border-red-800/60 flex items-center justify-center text-red-400 hover:bg-red-900/60 transition-all"
                  aria-label="End call"
                >
                  <PhoneOff className="w-4 h-4" />
                </button>
              ) : null}
            </div>

          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
