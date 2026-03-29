'use client'

// TODO: wire VAPI connection here when ready.
// Replace the console.log stub with:
//   import Vapi from '@vapi-ai/web'
//   const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!)
//   vapi.start(assistantId)

export default function SpeakWithAgentButton() {
  function handleClick() {
    // VAPI trigger placeholder — replace with real call
    console.log('[VAPI] Speak with an Agent clicked — awaiting integration')
  }

  return (
    <button
      onClick={handleClick}
      className="
        inline-flex items-center gap-2.5
        px-5 py-2 rounded-full
        bg-white/90 hover:bg-white
        text-[#111] text-xs font-medium tracking-wide
        shadow-[0_2px_14px_rgba(0,0,0,0.35)]
        hover:shadow-[0_3px_18px_rgba(0,0,0,0.45)]
        active:scale-[0.97]
        transition-all duration-150
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60
        select-none
      "
      aria-label="Speak with an AI agent"
    >
      {/* Orange live-indicator dot */}
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7900] opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#e86c2c]" />
      </span>
      Speak with an Agent
    </button>
  )
}
