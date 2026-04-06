'use client'

import { useState } from 'react'

type FeatureValue = boolean | string

interface Feature {
  name: string
  tooltip: string
  prototype: FeatureValue
  build: FeatureValue
  production: FeatureValue
}

const FEATURES: Feature[] = [
  {
    name: 'Content ingestion',
    tooltip: 'How much of your material — courses, PDFs, transcripts — the AI is trained on.',
    prototype: '500 MB',
    build: '2 GB',
    production: 'Unlimited',
  },
  {
    name: 'Branded website',
    tooltip: 'Your AI is deployed on a fully branded website with your logo, colors, and domain.',
    prototype: true,
    build: true,
    production: true,
  },
  {
    name: 'Custom domain',
    tooltip: 'Host on your own domain (e.g. ai.yoursite.com) instead of a chassislab subdomain.',
    prototype: false,
    build: true,
    production: true,
  },
  {
    name: 'White-label',
    tooltip: 'Remove all AIChassisLab branding entirely. The AI appears 100% yours.',
    prototype: false,
    build: false,
    production: true,
  },
  {
    name: 'User memory',
    tooltip: 'The AI remembers each individual user across sessions — their goals, history, and preferences.',
    prototype: false,
    build: true,
    production: true,
  },
  {
    name: 'Analytics dashboard',
    tooltip: 'See usage stats: active users, messages per day, top questions, and engagement trends.',
    prototype: false,
    build: true,
    production: true,
  },
  {
    name: 'Voice tuning session',
    tooltip: "A live session with our team to dial in your AI's tone, depth, and communication style.",
    prototype: false,
    build: true,
    production: true,
  },
  {
    name: 'The Depth Suite',
    tooltip: 'Structured assessment and progress-tracking modules built specifically for your curriculum. Includes custom module development tailored to your teaching approach.',
    prototype: false,
    build: false,
    production: true,
  },
  {
    name: 'Revision rounds',
    tooltip: 'Rounds of refinement after delivery where we adjust the AI based on your feedback.',
    prototype: '2 rounds',
    build: '4 rounds',
    production: 'Unlimited',
  },
  {
    name: 'Support',
    tooltip: 'How we support you after launch.',
    prototype: 'Email',
    build: 'Priority email',
    production: 'Priority + launch',
  },
]

function Check() {
  return (
    <svg className="ft-check" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-label="Included">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Dash() {
  return <span className="ft-dash" aria-label="Not included">—</span>
}

function CellValue({ value }: { value: FeatureValue }) {
  if (value === true) return <Check />
  if (value === false) return <Dash />
  return <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{value}</span>
}

function FeatureCell({ feature }: { feature: Feature }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="ft-tooltip-wrap">
      <button
        className="ft-feature-btn"
        onClick={() => setOpen(v => !v)}
        onBlur={() => setOpen(false)}
        type="button"
      >
        {feature.name}
        <em className="ft-info-icon">ⓘ</em>
      </button>
      {open && (
        <div className="ft-tooltip" role="tooltip">
          {feature.tooltip}
        </div>
      )}
    </div>
  )
}

export default function FeaturesTable() {
  return (
    <section id="features" className="features-section">
      <div className="features-inner">
        <div className="features-header reveal">
          <span className="text-accent-label">Compare plans</span>
          <span className="accent-line" />
          <h2 className="text-section-headline">Everything, side by side</h2>
        </div>

        <div className="features-table-wrap reveal-fade">
          <table className="features-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Basic</th>
                <th className="featured-col">Pro</th>
                <th>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {FEATURES.map(feature => (
                <tr key={feature.name}>
                  <td><FeatureCell feature={feature} /></td>
                  <td><CellValue value={feature.prototype} /></td>
                  <td className="featured-col"><CellValue value={feature.build} /></td>
                  <td><CellValue value={feature.production} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
