import { NextRequest, NextResponse } from 'next/server'

// ---------------------------------------------------------------------------
// In-memory store — PLACEHOLDER ONLY.
//
// This works for local dev / testing but does NOT persist across server
// restarts or across multiple serverless instances in production.
//
// Replace `store.set()` / `store.get()` below with a real DB upsert, e.g.:
//
//   Supabase:
//     await supabase.from('leads').upsert(record, { onConflict: 'email' })
//
//   Prisma + Postgres:
//     await prisma.lead.upsert({ where: { email }, update: rest, create: record })
//
//   Resend Contacts:
//     await resend.contacts.createOrUpdate({ email, firstName: name, ... })
// ---------------------------------------------------------------------------
const store = new Map<string, LeadRecord>()

type LeadRecord = {
  email: string
  name?: string
  social?: string
  website?: string
  completedStep: number
  updatedAt: string
}

export async function POST(req: NextRequest) {
  let body: Partial<LeadRecord>

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!body.email) {
    return NextResponse.json({ error: 'email is required' }, { status: 400 })
  }

  const email = body.email.trim().toLowerCase()

  // Upsert: merge incoming fields onto the existing record so partial
  // submissions from earlier steps are never overwritten with empty values.
  const existing = store.get(email) ?? {}
  const record: LeadRecord = {
    ...existing,
    // Only overwrite fields that are actually present in the new payload
    ...(body.name    !== undefined && { name:    body.name    }),
    ...(body.social  !== undefined && { social:  body.social  }),
    ...(body.website !== undefined && { website: body.website }),
    email,
    completedStep: body.completedStep ?? (existing.completedStep ?? 0),
    updatedAt: new Date().toISOString(),
  }

  // TODO: swap this line for a real DB write ↓
  store.set(email, record)

  return NextResponse.json({ ok: true })
}
