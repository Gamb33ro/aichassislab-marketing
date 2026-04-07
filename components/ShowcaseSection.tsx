'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

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
  const [active, setActive]       = useState<Tab>('shell')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  const features  = active === 'shell' ? SHELL_FEATURES : SOPHEGO_FEATURES
  const iframeSrc = active === 'shell' ? '/demo/shell'  : '/demo/sophego'

  // Sync state with native fullscreen changes (Esc key, browser button, etc.)
  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onChange)
    document.addEventListener('webkitfullscreenchange', onChange)
    return () => {
      document.removeEventListener('fullscreenchange', onChange)
      document.removeEventListener('webkitfullscreenchange', onChange)
    }
  }, [])

  const openFullscreen = useCallback(() => {
    const el = wrapRef.current
    if (!el) return
    if (el.requestFullscreen)             el.requestFullscreen()
    else if ((el as any).webkitRequestFullscreen) (el as any).webkitRequestFullscreen()
  }, [])

  const closeFullscreen = useCallback(() => {
    if (document.exitFullscreen)             document.exitFullscreen()
    else if ((document as any).webkitExitFullscreen) (document as any).webkitExitFullscreen()
  }, [])

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

        {/* Framed product demo — this element is the fullscreen target */}
        <div className="showcase-frame-wrap" ref={wrapRef}>
          <div className="sf-chrome">
            {/* macOS dots */}
            <div className="sf-chrome-dots">
              {isFullscreen
                ? <>
                    <span
                      className="sf-dot"
                      style={{ background: '#ff5f57', cursor: 'pointer' }}
                      onClick={closeFullscreen}
                      title="Exit fullscreen"
                    />
                    <span className="sf-dot" style={{ background: '#febc2e' }} />
                    <span className="sf-dot" style={{ background: '#28c840' }} />
                  </>
                : <>
                    <span className="sf-dot" style={{ background: '#ff5f57' }} />
                    <span className="sf-dot" style={{ background: '#febc2e' }} />
                    <span
                      className="sf-dot sf-dot-expand"
                      style={{ background: '#28c840', cursor: 'pointer' }}
                      onClick={openFullscreen}
                      title="Fullscreen"
                    />
                  </>
              }
            </div>

            <div className="sf-chrome-title">{CHROME_LABELS[active]}</div>

            {/* Action button — right side */}
            {isFullscreen
              ? <button className="sf-close-btn" onClick={closeFullscreen}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Close
                </button>
              : <button className="sf-expand-btn" onClick={openFullscreen}>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M7 1h3v3M4 10H1V7M10 1L6 5M1 10l4-4"
                      stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Expand
                </button>
            }
          </div>

          <iframe
            key={active}
            src={iframeSrc}
            className="showcase-frame"
            title={CHROME_LABELS[active]}
            allowFullScreen
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
