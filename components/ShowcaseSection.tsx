'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

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
  const [iframeActive, setIframeActive] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const features  = active === 'shell' ? SHELL_FEATURES : SOPHEGO_FEATURES
  const iframeSrc = active === 'shell' ? '/demo/shell'  : '/demo/sophego'

  const openFullscreen  = useCallback(() => setFullscreen(true), [])
  const closeFullscreen = useCallback(() => setFullscreen(false), [])

  // Reset iframe activation when switching tabs
  const switchTab = useCallback((tab: Tab) => {
    setActive(tab)
    setIframeActive(false)
  }, [])

  // Lock body scroll — always restore to '' so mobile never gets stuck
  useEffect(() => {
    if (!fullscreen) return
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeFullscreen() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [fullscreen, closeFullscreen])

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
            onClick={() => switchTab('shell')}
          >
            <span className="showcase-tab-label">The Shell — testAI</span>
            <span className="showcase-tab-sub">Your starting point</span>
          </button>
          <button
            className={`showcase-tab${active === 'sophego' ? ' active' : ''}`}
            onClick={() => switchTab('sophego')}
          >
            <span className="showcase-tab-label">Sophego.AI</span>
            <span className="showcase-tab-sub">A fully built product</span>
          </button>
        </div>

        {/* Feature strip */}
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
            <div className="sf-chrome-dots">
              <span className="sf-dot" style={{ background: '#ff5f57' }} />
              <span className="sf-dot" style={{ background: '#febc2e' }} />
              <span
                className="sf-dot sf-dot-expand"
                style={{ background: '#28c840', cursor: 'pointer' }}
                onClick={openFullscreen}
                aria-label="Expand to fullscreen"
              />
            </div>
            <div className="sf-chrome-title">{CHROME_LABELS[active]}</div>
            <button className="sf-expand-btn" onClick={openFullscreen} aria-label="Expand demo">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M7.5 1.5H10.5V4.5M4.5 10.5H1.5V7.5M10.5 1.5L6.5 5.5M1.5 10.5L5.5 6.5"
                  stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Expand</span>
            </button>
          </div>
          <div className="sf-iframe-wrap">
            <iframe
              key={active}
              src={iframeSrc}
              className="showcase-frame"
              title={CHROME_LABELS[active]}
            />
            {/* Mobile tap-to-interact guard — prevents iframe from stealing page scroll */}
            {!iframeActive && (
              <button
                className="sf-touch-guard"
                onClick={() => setIframeActive(true)}
                aria-label="Tap to interact with demo"
              >
                <span className="sf-touch-hint">Tap to interact</span>
              </button>
            )}
          </div>
        </div>

        <p className="showcase-cta-text">
          Ready to build yours?{' '}
          <a href="#contact" className="pricing-cta-link">Get in touch</a>
        </p>

      </div>

      {/* Fullscreen portal — rendered to document.body to escape stacking contexts */}
      {mounted && fullscreen && createPortal(
        <div className="sf-fullscreen-overlay" onClick={closeFullscreen}>
          <div className="sf-fullscreen-window" onClick={e => e.stopPropagation()}>
            <div className="sf-chrome">
              <div className="sf-chrome-dots">
                <span
                  className="sf-dot"
                  style={{ background: '#ff5f57', cursor: 'pointer' }}
                  onClick={closeFullscreen}
                  aria-label="Close fullscreen"
                />
                <span className="sf-dot" style={{ background: '#febc2e' }} />
                <span className="sf-dot" style={{ background: '#28c840' }} />
              </div>
              <div className="sf-chrome-title">{CHROME_LABELS[active]}</div>
              <button className="sf-close-btn" onClick={closeFullscreen} aria-label="Close fullscreen">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M1 1L10 10M10 1L1 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span>Close</span>
              </button>
            </div>
            <iframe
              key={`fs-${active}`}
              src={iframeSrc}
              className="sf-fullscreen-frame"
              title={CHROME_LABELS[active]}
            />
          </div>
        </div>,
        document.body
      )}
    </section>
  )
}
