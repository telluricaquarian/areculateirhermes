import { ArrowRight } from "lucide-react"
import Image from "next/image"

export default function HeroPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] flex flex-col items-center">
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
      <h1 className="mt-6 md:mt-8 text-white text-xl md:text-2xl font-semibold text-center whitespace-nowrap tracking-[-0.04em]">
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
