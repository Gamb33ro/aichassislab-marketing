'use client'

import { useState } from 'react'

const SHELL_FEATURES = [
  { icon: '◈', label: 'Branded interface', desc: 'Your logo, name, and colors.' },
  { icon: '◧', label: 'Dashboard + notes', desc: 'Stats, streaks, and a notes board per user.' },
  { icon: '◎', label: 'Conversation history', desc: 'Every session saved in the sidebar.' },
  { icon: '◯', label: 'Credit limits', desc: 'Daily caps so your costs stay predictable.' },
  { icon: '◐', label: 'Three color modes', desc: 'Dark, grey, and light — user choice.' },
  { icon: '◻', label: 'Revenue stays yours', desc: 'Flat license fee. No rev-share, no cuts. What you earn, you keep.' },
]

const SOPHEGO_FEATURES = [
  { icon: '◈', label: '6 AI modes', desc: 'Jung, Steiner, Swedenborg, Aquinas, Socratic, Synthesis.' },
  { icon: '◎', label: 'Archetype Analyst', desc: '30-question depth psychology assessment.' },
  { icon: '◯', label: 'Ego Mapper', desc: '7 structured modules — Practice, Shadow Journal, Mirror, and more.' },
  { icon: '◧', label: 'Memory system', desc: 'AI remembers each user across sessions.' },
  { icon: '◐', label: 'Friend / Formal modes', desc: 'Two registers, three color schemes.' },
  { icon: '◻', label: 'File attachment', desc: 'PDFs and images in the conversation.' },
]

type Tab = 'shell' | 'sophego'

export default function ShowcaseSection() {
  const [active, setActive] = useState<Tab>('shell')

  const features = active === 'shell' ? SHELL_FEATURES : SOPHEGO_FEATURES
  const iframeSrc = active === 'shell' ? '/demo/shell' : '/demo/sophego'
  const iframeTitle = active === 'shell' ? 'testAI shell demo' : 'Sophego.AI demo'

  return (
    <section id="showcase" className="showcase-section">
      <div className="showcase-inner">

        <div className="showcase-header">
          <span className="text-accent-label">Real examples</span>
          <span className="accent-line" />
          <h2 className="text-section-headline">The shell. And what it becomes.</h2>
          <p className="showcase-header-sub">
            Every client starts from the same foundation. What it turns into depends on your expertise.
            The shell is what every client receives — Sophego is a fully realized product built on it.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="showcase-tabs">
          <button
            className={`showcase-tab${active === 'shell' ? ' active' : ''}`}
            onClick={() => setActive('shell')}
          >
            <span className="showcase-tab-label">The Shell — testAI</span>
            <span className="showcase-tab-sub">Your starting point</span>
          </button>
          <button
            className={`showcase-tab${active === 'sophego' ? ' active' : ''}`}
            onClick={() => setActive('sophego')}
          >
            <span className="showcase-tab-label">Sophego.AI</span>
            <span className="showcase-tab-sub">A fully built product</span>
          </button>
        </div>

        {/* Features grid */}
        <div className="showcase-features-grid">
          {features.map(f => (
            <div key={f.label} className="showcase-feat">
              <span className="showcase-feat-icon">{f.icon}</span>
              <div>
                <div className="showcase-feat-name">{f.label}</div>
                <div className="showcase-feat-desc">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Full-width iframe */}
        <div className="showcase-frame-wrap">
          <iframe
            key={active}
            src={iframeSrc}
            className="showcase-frame"
            title={iframeTitle}
          />
        </div>

        <p className="showcase-cta-text">
          Ready to build yours?{' '}
          <a href="#contact" className="pricing-cta-link">Get in touch</a>
        </p>

      </div>
    </section>
  )
}
