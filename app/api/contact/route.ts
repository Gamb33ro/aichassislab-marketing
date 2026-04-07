import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory rate limiter: max 5 requests per IP per 10 minutes
const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5
const ipMap = new Map<string, { count: number; resetAt: number }>()

function getIP(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = ipMap.get(ip)
  if (!entry || now > entry.resetAt) {
    ipMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }
  if (entry.count >= MAX_REQUESTS) return false
  entry.count++
  return true
}

const ALLOWED_PLANS = new Set(['build', 'production', 'unsure', ''])

const FIELD_LIMITS = {
  name:    { max: 120, label: 'Name' },
  email:   { max: 254, label: 'Email' },
  company: { max: 120, label: 'Company' },
  plan:    { max: 20,  label: 'Plan' },
  message: { max: 4000, label: 'Message' },
}

export async function POST(req: NextRequest) {
  const ip = getIP(req)

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a few minutes before trying again.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const raw = body as Record<string, unknown>

  // Extract only the fields we expect — nothing else
  const name    = typeof raw.name    === 'string' ? raw.name.trim()    : ''
  const email   = typeof raw.email   === 'string' ? raw.email.trim()   : ''
  const company = typeof raw.company === 'string' ? raw.company.trim() : ''
  const plan    = typeof raw.plan    === 'string' ? raw.plan.trim()    : ''
  const message = typeof raw.message === 'string' ? raw.message.trim() : ''

  // Required fields
  if (!name)    return NextResponse.json({ error: 'Name is required.'    }, { status: 400 })
  if (!email)   return NextResponse.json({ error: 'Email is required.'   }, { status: 400 })
  if (!message) return NextResponse.json({ error: 'Message is required.' }, { status: 400 })

  // Length limits
  for (const [field, { max, label }] of Object.entries(FIELD_LIMITS)) {
    const value = { name, email, company, plan, message }[field] ?? ''
    if (value.length > max) {
      return NextResponse.json(
        { error: `${label} must be ${max} characters or fewer.` },
        { status: 400 }
      )
    }
  }

  // Email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  // Plan allowlist
  if (!ALLOWED_PLANS.has(plan)) {
    return NextResponse.json({ error: 'Invalid plan selection.' }, { status: 400 })
  }

  // Safe log — only known fields, no spread
  console.log('[contact]', { name, email, company, plan, message: message.slice(0, 100) + (message.length > 100 ? '…' : '') })

  // TODO: send email via Resend / SendGrid

  return NextResponse.json({ ok: true }, { status: 200 })
}
