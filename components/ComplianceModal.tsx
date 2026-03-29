'use client'

import * as RadixDialog from '@radix-ui/react-dialog'
import { ExternalLink, Shield, X } from 'lucide-react'

import {
  Dialog,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const PROVIDERS = [
  { label: 'Vercel Security',      href: 'https://vercel.com/security' },
  { label: 'Vercel Compliance',    href: 'https://vercel.com/trust' },
  { label: 'GitHub Trust Center',  href: 'https://trust.github.com' },
  { label: 'GitHub Security',      href: 'https://github.com/security' },
]

export default function ComplianceModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="mt-3 inline-flex items-center gap-1.5 text-[#555] text-xs tracking-wide hover:text-[#e86c2c] transition-colors">
          <Shield className="w-3 h-3" />
          View Compliance Infrastructure
        </button>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay className="bg-black/75 backdrop-blur-sm" />

        <RadixDialog.Content
          aria-describedby={undefined}
          className="fixed top-1/2 left-1/2 z-50 w-full max-w-[min(520px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[#FF7900]/20 bg-[#0c0c0c] shadow-[0_0_60px_rgba(255,121,0,0.12),0_8px_40px_rgba(0,0,0,0.85)] overflow-y-auto max-h-[85dvh] focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200"
        >
          {/* Close button */}
          <RadixDialog.Close
            className="absolute top-4 right-4 text-[#555] hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </RadixDialog.Close>

          <div className="px-6 py-6 flex flex-col gap-5">
            <DialogHeader>
              <DialogTitle className="text-white text-base font-semibold tracking-tight pr-6">
                Security &amp; Infrastructure Overview
              </DialogTitle>
            </DialogHeader>

            <p className="text-[#999] text-sm leading-relaxed -mt-2">
              Areculateir projects are deployed using trusted third-party platforms including{' '}
              <strong className="text-[#bbb] font-medium">Vercel</strong> for hosting and{' '}
              <strong className="text-[#bbb] font-medium">GitHub</strong> for version control
              and deployment workflows.
            </p>

            <Section heading="Infrastructure Providers">
              Our deployment workflow relies on platforms that publicly describe security and
              compliance measures including SOC 2 Type II reporting, ISO 27001 certification,
              and GDPR-supporting controls. Exact scope, applicability, and current status
              depend on each provider&apos;s official documentation and service configuration.
            </Section>

            <Section heading="What This Means">
              Projects benefit from modern hosting, encrypted transport over HTTPS/TLS,
              version-controlled deployments, and infrastructure operated by widely used
              software platforms.
            </Section>

            <Section heading="Important Clarification">
              Areculateir does not represent that it is itself SOC 2 certified, ISO 27001
              certified, or independently audited solely by virtue of using third-party
              providers. Any referenced certifications or compliance measures belong to the
              relevant platform providers and do not automatically extend to custom business
              processes, application logic, data handling practices, or client-specific
              regulatory obligations.
            </Section>

            <div>
              <SectionHeading>Provider References</SectionHeading>
              <ul className="mt-2 space-y-2">
                {PROVIDERS.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-[#e86c2c] hover:text-[#FF7900] transition-colors"
                    >
                      <ExternalLink className="w-3 h-3 shrink-0" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <Section heading="Shared Responsibility">
              Security and compliance are shared responsibilities. Final regulatory suitability
              depends on the specific implementation, integrations, data collected, user
              permissions, storage design, and operational processes configured for each project.
            </Section>

            <p className="text-[#444] text-xs leading-relaxed border-t border-[#1a1a1a] pt-4">
              Questions about security requirements, regulated workflows, or implementation
              scope can be addressed during project scoping.
            </p>
          </div>
        </RadixDialog.Content>
      </DialogPortal>
    </Dialog>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#FF7900]/60 mb-1.5">
      {children}
    </h3>
  )
}

function Section({
  heading,
  children,
}: {
  heading: string
  children: React.ReactNode
}) {
  return (
    <div>
      <SectionHeading>{heading}</SectionHeading>
      <p className="text-[#999] text-sm leading-relaxed">{children}</p>
    </div>
  )
}
