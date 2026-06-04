import localFont from 'next/font/local'
import Image from 'next/image'
import StagedLeadForm from '@/components/StagedLeadForm'

const neueMontreal = localFont({
  src: [
    { path: '../fonts/NeueMontreal-Light.otf',        weight: '300', style: 'normal'  },
    { path: '../fonts/NeueMontreal-LightItalic.otf',  weight: '300', style: 'italic'  },
    { path: '../fonts/NeueMontreal-Regular.otf',      weight: '400', style: 'normal'  },
    { path: '../fonts/NeueMontreal-Italic.otf',       weight: '400', style: 'italic'  },
    { path: '../fonts/NeueMontreal-Medium.otf',       weight: '500', style: 'normal'  },
    { path: '../fonts/NeueMontreal-MediumItalic.otf', weight: '500', style: 'italic'  },
    { path: '../fonts/NeueMontreal-Bold.otf',         weight: '700', style: 'normal'  },
    { path: '../fonts/NeueMontreal-BoldItalic.otf',   weight: '700', style: 'italic'  },
  ],
  variable: '--font-neue-montreal',
})

export default function StudioPage() {
  return (
    <main
      className={`
        ${neueMontreal.className}
        relative min-h-screen
        bg-gradient-to-b from-[#d6d7db] via-[#86878c] to-[#050505]
        flex flex-col items-center overflow-hidden
      `}
    >

      {/* ── Atmospheric background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">

        {/* Orb 1 — cool silver, top-right */}
        <div
          className="orb-drift-1 absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(200,202,208,0.35) 0%, transparent 70%)', filter: 'blur(100px)' }}
        />
        {/* Orb 2 — pale cool white, mid-left */}
        <div
          className="orb-drift-2 absolute top-[20%] -left-32 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(230,230,228,0.12) 0%, transparent 70%)', filter: 'blur(90px)' }}
        />
        {/* Orb 3 — deep shadow, bottom-center to anchor the dark zone */}
        <div
          className="orb-drift-3 absolute bottom-0 left-[10%] w-[600px] h-[320px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.25) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        {/* Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundRepeat: 'repeat',
            backgroundSize: '280px 280px',
            opacity: 0.09,
            mixBlendMode: 'overlay',
          }}
        />
      </div>

      {/* ── Spartan hero — z-10, below content ── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none w-[260px] h-[380px] md:w-[400px] md:h-[540px] lg:w-[480px] lg:h-[640px]">
        <Image
          src="/whitearecspartan.png"
          alt="Studio hero"
          fill
          draggable={false}
          className="object-cover object-top [user-select:none] [-webkit-user-drag:none]"
        />
      </div>

      {/* ── Foreground content — z-20 ── */}
      <div className="relative z-20 flex flex-col items-center w-full px-6">

        {/* Eyebrow label */}
        <p className="mt-14 md:mt-20 text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-neutral-500 font-medium select-none">
          Available Now&nbsp;—&nbsp;Select Engagements
        </p>

        {/* CTA pill */}
        <div className="mt-4">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-neutral-300/80 bg-white/50 backdrop-blur-sm shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
            <span className="text-neutral-700 text-[11px] md:text-xs tracking-[0.06em] font-medium">
              → Commission your custom build
            </span>
          </div>
        </div>

        {/* Display heading */}
        <h1 className="mt-10 md:mt-14 text-center leading-[0.96] tracking-[-0.035em] select-none">
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-neutral-900">
            W.a.a.S
          </span>
          <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-neutral-600 mt-2">
            Editorial&#8209;Grade
          </span>
          <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-neutral-600">
            Web Systems
          </span>
        </h1>

        {/* Subhead */}
        <p className="mt-7 md:mt-8 text-center text-neutral-500 text-sm md:text-[15px] leading-relaxed font-light max-w-[300px] md:max-w-[400px]">
          Hand-built, performance-obsessed websites.
          <br />
          No templates, no compromises.
        </p>

        {/* Multi-step lead form — same webhook + steps as the main page */}
        <div className="mt-10 md:mt-12 w-full flex justify-center">
          <StagedLeadForm
            variant="light"
            source="studio"
            emailPlaceholder="*Enter your email to begin"
          />
        </div>

        {/* Footnote */}
        <p className="mt-4 text-neutral-400/70 text-[10px] text-center">
          *Bespoke builds. Custom scope required.
        </p>

      </div>{/* end foreground content */}

      {/* ── Footer ── */}
      <footer className="fixed bottom-0 inset-x-0 z-30 flex flex-col items-center pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-10 bg-gradient-to-t from-black/75 to-transparent pointer-events-none">

        {/* Speak with an Agent */}
        <div className="mb-3 pointer-events-auto">
          {/* TODO: wire to AgentCallModal (same as SpeakWithAgentButton on main page) */}
          <button
            className="
              inline-flex items-center gap-2.5
              px-5 py-2 rounded-full
              border border-white/20 bg-white/10 backdrop-blur-sm
              text-white text-xs tracking-[0.05em] font-medium
              hover:bg-white/18
              active:scale-[0.97]
              transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40
              select-none
            "
            aria-label="Speak with an agent"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white/80" />
            </span>
            Speak with an Agent
          </button>
        </div>

        {/* Attribution */}
        <p className="text-white/35 text-[11px] tracking-wide pointer-events-auto">
          Brought to you by{' '}
          <a
            href="https://areculateir.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-white/60 transition-colors"
          >
            Areculateir.com
          </a>
        </p>

      </footer>
    </main>
  )
}
