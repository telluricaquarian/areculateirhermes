import { ArrowRight } from "lucide-react"
import Image from "next/image"

export default function HeroPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] flex flex-col items-center">
      {/* Logo */}
      <div className="mt-8 md:mt-12 w-12 h-12 rounded-lg border border-[#3a3a3a] bg-[#1c1c1c] flex items-center justify-center">
        <Image src="/aa.png" alt="Logo" width={32} height={32} className="object-contain" />
      </div>

      {/* Announcement Pill */}
      <div className="mt-6 md:mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c85a20] bg-transparent">
        <ArrowRight className="w-4 h-4 text-[#e86c2c]" />
        <span className="text-[#e86c2c] text-sm">
          {"Let's set up your first autonomous employee"}
        </span>
      </div>

      {/* Headline */}
      <h1 className="mt-6 md:mt-8 text-white text-xl md:text-2xl font-medium text-center px-4 text-balance">
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
    </main>
  )
}
