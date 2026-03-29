import { ArrowRight } from "lucide-react"
import Image from "next/image"
import ComplianceModal from "@/components/ComplianceModal"

export default function HeroPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#242424] to-[#111111] flex flex-col items-center overflow-hidden">

      {/* ── Atmospheric Background ── */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">

        {/* Stars — SVG, responsive via viewBox */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          {/* very faint */}
          <circle cx="5"  cy="8"  r="0.18" fill="white" opacity="0.2" />
          <circle cx="11" cy="24" r="0.15" fill="white" opacity="0.2" />
          <circle cx="7"  cy="45" r="0.18" fill="white" opacity="0.2" />
          <circle cx="13" cy="70" r="0.15" fill="white" opacity="0.2" />
          <circle cx="6"  cy="84" r="0.18" fill="white" opacity="0.2" />
          <circle cx="17" cy="93" r="0.15" fill="white" opacity="0.2" />
          <circle cx="88" cy="7"  r="0.18" fill="white" opacity="0.2" />
          <circle cx="94" cy="26" r="0.15" fill="white" opacity="0.2" />
          <circle cx="87" cy="50" r="0.18" fill="white" opacity="0.2" />
          <circle cx="93" cy="75" r="0.15" fill="white" opacity="0.2" />
          <circle cx="83" cy="90" r="0.18" fill="white" opacity="0.2" />
          <circle cx="47" cy="3"  r="0.15" fill="white" opacity="0.2" />
          <circle cx="53" cy="97" r="0.18" fill="white" opacity="0.2" />
          {/* moderate */}
          <circle cx="22" cy="11" r="0.2"  fill="white" opacity="0.3" />
          <circle cx="38" cy="6"  r="0.2"  fill="white" opacity="0.3" />
          <circle cx="29" cy="30" r="0.22" fill="white" opacity="0.3" />
          <circle cx="42" cy="20" r="0.2"  fill="white" opacity="0.3" />
          <circle cx="33" cy="47" r="0.22" fill="white" opacity="0.3" />
          <circle cx="19" cy="58" r="0.2"  fill="white" opacity="0.3" />
          <circle cx="64" cy="9"  r="0.2"  fill="white" opacity="0.3" />
          <circle cx="73" cy="28" r="0.22" fill="white" opacity="0.3" />
          <circle cx="59" cy="38" r="0.2"  fill="white" opacity="0.3" />
          <circle cx="79" cy="16" r="0.22" fill="white" opacity="0.35" />
          <circle cx="69" cy="55" r="0.2"  fill="white" opacity="0.3" />
          <circle cx="81" cy="44" r="0.2"  fill="white" opacity="0.3" />
          <circle cx="26" cy="75" r="0.22" fill="white" opacity="0.3" />
          <circle cx="44" cy="85" r="0.2"  fill="white" opacity="0.3" />
          <circle cx="71" cy="80" r="0.22" fill="white" opacity="0.3" />
          <circle cx="86" cy="68" r="0.2"  fill="white" opacity="0.3" />
          {/* slightly brighter */}
          <circle cx="15" cy="36" r="0.25" fill="white" opacity="0.4" />
          <circle cx="37" cy="14" r="0.25" fill="white" opacity="0.4" />
          <circle cx="56" cy="7"  r="0.25" fill="white" opacity="0.4" />
          <circle cx="82" cy="33" r="0.25" fill="white" opacity="0.4" />
          <circle cx="93" cy="60" r="0.25" fill="white" opacity="0.4" />
          <circle cx="10" cy="62" r="0.25" fill="white" opacity="0.4" />
          <circle cx="31" cy="90" r="0.25" fill="white" opacity="0.4" />
          <circle cx="59" cy="94" r="0.25" fill="white" opacity="0.4" />
          <circle cx="76" cy="87" r="0.25" fill="white" opacity="0.4" />
          <circle cx="89" cy="83" r="0.25" fill="white" opacity="0.4" />
          <circle cx="46" cy="23" r="0.25" fill="white" opacity="0.4" />
          <circle cx="21" cy="80" r="0.25" fill="white" opacity="0.4" />
          {/* accent */}
          <circle cx="43" cy="4"  r="0.3"  fill="white" opacity="0.55" />
          <circle cx="68" cy="5"  r="0.28" fill="white" opacity="0.5" />
          <circle cx="24" cy="42" r="0.3"  fill="white" opacity="0.55" />
          <circle cx="79" cy="57" r="0.28" fill="white" opacity="0.5" />
          <circle cx="11" cy="81" r="0.3"  fill="white" opacity="0.55" />
          <circle cx="57" cy="19" r="0.28" fill="white" opacity="0.5" />
          <circle cx="91" cy="39" r="0.3"  fill="white" opacity="0.55" />
          <circle cx="34" cy="97" r="0.28" fill="white" opacity="0.5" />
          {/* twinkle stars */}
          <circle cx="30" cy="13" r="0.3"  fill="white" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.18;0.6" dur="4s"   repeatCount="indefinite" />
          </circle>
          <circle cx="63" cy="17" r="0.28" fill="white" opacity="0.55">
            <animate attributeName="opacity" values="0.55;0.15;0.55" dur="5.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="17" cy="50" r="0.3"  fill="white" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.18;0.6" dur="6s"   repeatCount="indefinite" />
          </circle>
          <circle cx="83" cy="73" r="0.28" fill="white" opacity="0.55">
            <animate attributeName="opacity" values="0.55;0.12;0.55" dur="4.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="50" cy="30" r="0.25" fill="white" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.1;0.5" dur="7s" repeatCount="indefinite" />
          </circle>
        </svg>

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
            backgroundSize: "256px 256px",
            opacity: 0.08,
            mixBlendMode: "soft-light",
          }}
        />
        {/* Vignette — dark radial fade toward edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.42) 100%)" }}
        />
      </div>

      {/* Logo */}
      <div className="mt-8 md:mt-12">
        <Image src="/aa.png" alt="Logo" width={36} height={36} className="object-contain" />
      </div>

      {/* Announcement Pill */}
      <div className="mt-6 md:mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FF7900]/60 bg-gradient-to-r from-black via-neutral-900 to-black shadow-[0_0_20px_rgba(255,121,0,0.25)]">
        <ArrowRight className="w-4 h-4 text-[#e86c2c]" />
        <span className="text-[#e86c2c] text-sm">
          {"Let's set up your first autonomous employee"}
        </span>
      </div>

      {/* Headline */}
      <h1 className="mt-6 md:mt-8 text-white text-base sm:text-xl md:text-2xl font-semibold text-center tracking-[-0.04em] px-6 sm:whitespace-nowrap">
        Your own AI agent. 92 skills. Running 24/7.
      </h1>

      {/* CTA Button */}
      <button className="mt-6 md:mt-8 px-6 py-2.5 rounded-full border border-[#c85a20] bg-transparent text-[#e86c2c] text-sm font-medium tracking-wide hover:bg-[#c85a20]/10 transition-colors">
        JOIN WAITLIST
      </button>

      {/* Disclaimer */}
      <p className="mt-4 text-[#666] text-xs text-center">
        *Results may vary. Custom setup required.
      </p>

      {/* Hero Image */}
      <div className="mt-12 md:mt-16 w-full max-w-sm md:max-w-md lg:max-w-lg aspect-[3/4] relative overflow-hidden">
        <Image src="/blackspartan.png" alt="Hero" fill className="object-cover object-top" />
      </div>

      {/* Footer Attribution */}
      <footer className="fixed bottom-0 inset-x-0 flex flex-col items-center pb-5 pt-10 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
        <div className="mb-2 pointer-events-auto">
          <ComplianceModal />
        </div>
        <p className="text-[#888] text-xs tracking-wide pointer-events-auto">
          Brought to you by{" "}
          <a
            href="https://areculateir.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e86c2c] hover:text-[#FF7900] transition-colors"
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
