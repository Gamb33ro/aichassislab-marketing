'use client'

import { useState } from 'react'

interface FormState {
  name: string
  email: string
  company: string
  plan: string
  message: string
}

const INITIAL: FormState = { name: '', email: '', company: '', plan: '', message: '' }

const PLAN_LABELS: Record<string, string> = {
  build: 'Pro — $5,500 setup',
  production: 'Enterprise — $7,500 setup',
  unsure: 'Not sure yet',
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [status, setStatus] = useState<'idle' | 'sent'>('idle')

  function set(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }))
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const plan = PLAN_LABELS[form.plan] || form.plan
    const body = [
      form.message,
      '',
      '---',
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.company ? `Company: ${form.company}` : null,
      plan ? `Interested in: ${plan}` : null,
    ]
      .filter(line => line !== null)
      .join('\n')

    const subject = encodeURIComponent(`Inquiry from ${form.name}`)
    const encodedBody = encodeURIComponent(body)

    window.location.href = `mailto:hello@aichassislab.com?subject=${subject}&body=${encodedBody}`
    setStatus('sent')
  }

  if (status === 'sent') {
    return (
      <div className="contact-form-wrap">
        <div className="contact-success">
          <div className="contact-success-icon">✓</div>
          <div className="contact-success-title">Opening your email client</div>
          <p className="contact-success-sub">
            Your message is pre-filled and ready to send.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="contact-form-wrap">
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="contact-form-row">
          <div className="contact-field">
            <label htmlFor="cf-name" className="contact-label">Name</label>
            <input
              id="cf-name"
              className="contact-input"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={set('name')}
              required
            />
          </div>
          <div className="contact-field">
            <label htmlFor="cf-email" className="contact-label">Email</label>
            <input
              id="cf-email"
              className="contact-input"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={set('email')}
              required
            />
          </div>
        </div>

        <div className="contact-form-row">
          <div className="contact-field">
            <label htmlFor="cf-company" className="contact-label">Company / Brand</label>
            <input
              id="cf-company"
              className="contact-input"
              type="text"
              placeholder="Optional"
              value={form.company}
              onChange={set('company')}
            />
          </div>
          <div className="contact-field">
            <label htmlFor="cf-plan" className="contact-label">Interested in</label>
            <select id="cf-plan" className="contact-select" value={form.plan} onChange={set('plan')}>
              <option value="">Select a plan…</option>
              <option value="build">Pro — $5,500 setup</option>
              <option value="production">Enterprise — $7,500 setup</option>
              <option value="unsure">Not sure yet</option>
            </select>
          </div>
        </div>

        <div className="contact-field">
          <label htmlFor="cf-message" className="contact-label">Tell us about your project</label>
          <textarea
            id="cf-message"
            className="contact-textarea"
            placeholder="What expertise do you want to turn into an AI? Who is your audience?"
            value={form.message}
            onChange={set('message')}
            required
          />
        </div>

        <div className="contact-submit">
          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Send message
          </button>
        </div>
      </form>
    </div>
  )
}
