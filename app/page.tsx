import { ArrowRight } from "lucide-react"
import Image from "next/image"
import ComplianceModal from "@/components/ComplianceModal"
import StagedLeadForm from "@/components/StagedLeadForm"
import ScreeningModal from "@/components/ScreeningModal"
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars"

export default function HeroPage() {
  return (
    <main className="relative h-[100svh] md:h-auto md:min-h-screen bg-gradient-to-b from-[#242424] to-[#111111] flex flex-col items-center overflow-hidden">

      {/* ── Atmospheric Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">

        {/* Stars — animate-ui StarsBackground */}
        <StarsBackground
          starColor="rgba(255,255,255,0.92)"
          speed={60}
          factor={0.04}
          className="absolute inset-0"
          pointerEvents={false}
        />

        {/* Orb 1 — warm orange, top-right */}
        <div
          className="orb-drift-1 absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,100,0,0.28) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        {/* Orb 2 — soft warm white, left-mid */}
        <div
          className="orb-drift-2 absolute top-[30%] -left-28 w-[380px] h-[380px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,230,200,0.15) 0%, transparent 70%)", filter: "blur(90px)" }}
        />
        {/* Orb 3 — subtle amber, bottom */}
        <div
          className="orb-drift-3 absolute -bottom-16 left-[15%] w-[560px] h-[240px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(180,65,0,0.22) 0%, transparent 70%)", filter: "blur(70px)" }}
        />
        {/* Center radial lift — brightens the middle viewing area */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[600px]"
          style={{ background: "radial-gradient(ellipse 50% 50% at 50% 30%, rgba(255,255,255,0.04) 0%, transparent 100%)" }}
        />
        {/* Grain — SVG feTurbulence noise tile, sits above gradient layers */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "280px 280px",
            opacity: 0.12,
            mixBlendMode: "soft-light",
          }}
        />
        {/* Vignette — dark radial fade toward edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.22) 100%)" }}
        />
      </div>

      {/* ── Foreground content — sits above atmospheric layer ── */}
      <div className="relative z-10 flex flex-col items-center w-full">

      {/* Logo */}
      <div className="mt-5 md:mt-12">
        <Image src="/neworange.png" alt="Areculateir logo" width={36} height={36} className="object-contain md:w-10 md:h-10" />
      </div>

      {/* Announcement Pill */}
      <div className="mt-3 md:mt-8 inline-flex items-center gap-2 px-4 py-1.5 md:py-2 rounded-full border border-[#FF7900]/60 bg-gradient-to-r from-black via-neutral-900 to-black shadow-[0_0_20px_rgba(255,121,0,0.25)]">
        <ArrowRight className="w-4 h-4 text-[#e86c2c]" />
        <span className="text-[#e86c2c] text-sm">
          {"Let's set up your first autonomous employee"}
        </span>
      </div>

      {/* Headline */}
      <h1 className="mt-3 md:mt-8 text-white text-base sm:text-xl md:text-2xl font-semibold text-center tracking-[-0.04em] px-6 sm:whitespace-nowrap">
        Your own AI agent. 92 skills. Running 24/7.
      </h1>

      {/* Staged Lead Capture */}
      <div className="mt-3 md:mt-8 w-full flex justify-center px-6">
        <StagedLeadForm />
      </div>

      {/* Disclaimer */}
      <p className="mt-2 md:mt-4 text-[#666] text-xs text-center">
        *Results may vary. Custom setup required.
      </p>

      {/* Hero Image */}
      {/* Mobile: absolute bottom-0 so it contributes no scroll height; main's overflow-hidden clips the bottom edge */}
      {/* Desktop: back in normal flow with original sizing */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[260px] h-[360px] overflow-hidden md:static md:translate-x-0 md:mt-16 md:w-full md:max-w-md lg:max-w-lg md:h-auto md:aspect-[3/4]">

        <Image src="/blackspartan.png" alt="Hero" fill className="object-cover object-top" />
      </div>

      </div>{/* end foreground content */}

      {/* Auto-opening screening modal */}
      <ScreeningModal />

      {/* Footer Attribution */}
      <footer className="fixed bottom-0 inset-x-0 flex flex-col items-center pb-5 pt-10 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
        <div className="mb-2 pointer-events-auto">
          <ComplianceModal />
        </div>
        <p className="text-[#888] text-xs tracking-wide pointer-events-auto">
          Brought to you by{" "}
          <a
            href="https://www.areculateir.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e86c2c] hover:text-[#FF7900] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF7900]/60 rounded-sm"
          >
            Areculateir.com
          </a>
        </p>
        <p className="mt-1 text-[#444] text-[10px] tracking-widest pointer-events-auto">
          ©2026
        </p>
      </footer>
    </main>
  )
}
