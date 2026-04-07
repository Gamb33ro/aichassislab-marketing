'use client'

import { useState, useEffect, useCallback } from 'react'

const SHELL_FEATURES = [
  { label: 'Branded interface',    desc: 'Your logo, name, and colors.' },
  { label: 'Dashboard + notes',    desc: 'Stats, streaks, and a notes board per user.' },
  { label: 'Conversation history', desc: 'Every session saved in the sidebar.' },
  { label: 'Credit limits',        desc: 'Daily caps so your costs stay predictable.' },
  { label: 'Three color modes',    desc: 'Dark, grey, and light — user choice.' },
  { label: 'Revenue stays yours',  desc: 'Flat license fee. No rev-share, no cuts.' },
]

const SOPHEGO_FEATURES = [
  { label: '6 AI modes',         desc: 'Jung, Steiner, Swedenborg, Aquinas, Socratic, Synthesis.' },
  { label: 'Archetype Analyst',  desc: '30-question depth psychology assessment.' },
  { label: 'Ego Mapper',         desc: '7 structured modules — Practice, Shadow Journal, Mirror, and more.' },
  { label: 'Memory system',      desc: 'AI remembers each user across sessions.' },
  { label: 'Friend / Formal',    desc: 'Two registers, three color schemes.' },
  { label: 'File attachment',    desc: 'PDFs and images in the conversation.' },
]

const CHROME_LABELS: Record<string, string> = {
  shell:   'testAI — The Shell',
  sophego: 'Sophego.AI — A Fully Realized Product',
}

type Tab = 'shell' | 'sophego'

export default function ShowcaseSection() {
  const [active, setActive] = useState<Tab>('shell')
  const [fullscreen, setFullscreen] = useState(false)

  const features  = active === 'shell' ? SHELL_FEATURES : SOPHEGO_FEATURES
  const iframeSrc = active === 'shell' ? '/demo/shell'  : '/demo/sophego'

  const exitFullscreen = useCallback(() => setFullscreen(false), [])

  useEffect(() => {
    if (!fullscreen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') exitFullscreen() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [fullscreen, exitFullscreen])

  const chromeDots = (fsMode: boolean) => (
    <div className="sf-chrome-dots">
      <span
        className="sf-dot"
        style={{ background: '#ff5f57', cursor: fsMode ? 'pointer' : 'default' }}
        onClick={fsMode ? exitFullscreen : undefined}
        title={fsMode ? 'Exit fullscreen' : undefined}
      />
      <span className="sf-dot" style={{ background: '#febc2e' }} />
      <span
        className="sf-dot"
        style={{ background: '#28c840', cursor: !fsMode ? 'pointer' : 'default' }}
        onClick={!fsMode ? () => setFullscreen(true) : undefined}
        title={!fsMode ? 'Fullscreen' : undefined}
      />
    </div>
  )

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

        {/* Feature strip — 2-col editorial list, no generic icon grid */}
        <div className="showcase-features-grid">
          {features.map(f => (
            <div key={f.label} className="showcase-feat">
              <div className="showcase-feat-bar" aria-hidden="true" />
              <div>
                <div className="showcase-feat-name">{f.label}</div>
                <div className="showcase-feat-desc">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Framed product demo */}
        <div className="showcase-frame-wrap">
          <div className="sf-chrome">
            {chromeDots(false)}
            <div className="sf-chrome-title">{CHROME_LABELS[active]}</div>
            <div className="sf-chrome-spacer" />
          </div>
          <iframe
            key={active}
            src={iframeSrc}
            className="showcase-frame"
            title={CHROME_LABELS[active]}
          />
        </div>

        {/* Fullscreen overlay */}
        {fullscreen && (
          <div className="sf-fullscreen-overlay" onClick={exitFullscreen}>
            <div className="sf-fullscreen-window" onClick={e => e.stopPropagation()}>
              <div className="sf-chrome">
                {chromeDots(true)}
                <div className="sf-chrome-title">{CHROME_LABELS[active]}</div>
                <div className="sf-chrome-spacer" />
              </div>
              <iframe
                key={`fs-${active}`}
                src={iframeSrc}
                className="sf-fullscreen-frame"
                title={CHROME_LABELS[active]}
              />
            </div>
          </div>
        )}

        <p className="showcase-cta-text">
          Ready to build yours?{' '}
          <a href="#contact" className="pricing-cta-link">Get in touch</a>
        </p>

      </div>
    </section>
  )
}
