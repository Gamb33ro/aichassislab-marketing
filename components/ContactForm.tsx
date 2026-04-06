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

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function set(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong.')
      }
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  if (status === 'success') {
    return (
      <div className="contact-form-wrap">
        <div className="contact-success">
          <div className="contact-success-icon">✓</div>
          <div className="contact-success-title">Message received</div>
          <p className="contact-success-sub">
            We&apos;ll get back to you within one business day.
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

        {status === 'error' && (
          <div className="contact-error">{errorMsg}</div>
        )}

        <div className="contact-submit">
          <button
            type="submit"
            className="btn-primary"
            disabled={status === 'loading'}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {status === 'loading' ? 'Sending…' : 'Send message'}
          </button>
        </div>
      </form>
    </div>
  )
}
