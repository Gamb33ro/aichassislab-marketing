'use client'

import { useState } from 'react'

const SHELL_FEATURES = [
  { icon: '◈', label: 'Branded interface', desc: 'Your logo, name, and color scheme — not ours.' },
  { icon: '◧', label: 'Dashboard + notes', desc: 'Usage stats, streaks, and a personal notes board per user.' },
  { icon: '◎', label: 'Conversation history', desc: 'Every session saved and accessible from the sidebar.' },
  { icon: '◯', label: 'Credit limits', desc: 'Per-user daily credit caps so your costs stay predictable.' },
  { icon: '◐', label: 'Three color modes', desc: 'Dark, grey, and light — users pick their preference.' },
  { icon: '◻', label: 'Powered by your API key', desc: "Your users' AI costs go directly to you, not us." },
]

const SOPHEGO_FEATURES = [
  { icon: '◈', label: '6 AI modes', desc: 'EGO.AI synthesis, Jung, Steiner, Swedenborg, Scholastic, and Guided Socratic.' },
  { icon: '◎', label: 'Archetype Analyst', desc: '30-question psychological assessment — dominant archetypes, shadow, inferior function, unlived life.' },
  { icon: '◯', label: 'Ego Mapper', desc: '7 structured modules: Practice, Planetary Self, Vision Map, Shadow Journal, Reading Path, Mirror.' },
  { icon: '◧', label: 'Memory system', desc: 'The AI remembers each user across sessions — their patterns, history, and stated concerns.' },
  { icon: '◐', label: 'Theme + color modes', desc: 'Friend and formal register, three color schemes. The same AI, different presence.' },
  { icon: '◻', label: 'File attachment', desc: 'Users can upload PDFs and images directly into the conversation.' },
  { icon: '◇', label: 'Full dashboard', desc: 'Archetype result, conversation history, memory status, and usage in one view.' },
]

type Tab = 'shell' | 'sophego'

export default function ShowcaseSection() {
  const [active, setActive] = useState<Tab>('shell')

  return (
    <section id="showcase" className="showcase-section">
      <div className="showcase-inner">

        <div className="showcase-header">
          <span className="text-accent-label">Real examples</span>
          <span className="accent-line" />
          <h2 className="text-section-headline">
            The shell. And what it becomes.
          </h2>
          <p className="showcase-header-sub">
            Every client starts from the same foundation. What it turns into depends on the depth of your expertise.
            Below is the shell every client receives — and Sophego, a fully realized build we made for a real product.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="showcase-tabs reveal-fade">
          <button
            className={`showcase-tab${active === 'shell' ? ' active' : ''}`}
            onClick={() => setActive('shell')}
          >
            <span className="showcase-tab-label">The Shell</span>
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

        {/* Shell panel */}
        {active === 'shell' && (
          <div className="showcase-panel reveal-fade">
            <div className="showcase-preview">
              <div className="showcase-preview-label">testAI — the shell</div>
              <div className="showcase-frame-wrap">
                <iframe
                  src="https://aichassislab-shell.vercel.app/demo"
                  className="showcase-frame"
                  title="testAI shell demo"
                  allow="same-origin"
                />
              </div>
            </div>

            <div className="showcase-features">
              <div className="showcase-features-eyebrow">What every client gets</div>
              <h3 className="showcase-features-title">
                A complete, production-ready AI interface — ready to brand and ship.
              </h3>
              <p className="showcase-features-desc">
                This is the shell before any customization. It already has authentication, conversation history, a dashboard, and a credit system. Your content and branding turn it into your product.
              </p>
              <ul className="showcase-feature-list">
                {SHELL_FEATURES.map(f => (
                  <li key={f.label} className="showcase-feature-item">
                    <span className="showcase-feature-icon">{f.icon}</span>
                    <div>
                      <div className="showcase-feature-name">{f.label}</div>
                      <div className="showcase-feature-desc">{f.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Sophego panel */}
        {active === 'sophego' && (
          <div className="showcase-panel showcase-panel-flip reveal-fade">
            <div className="showcase-features">
              <div className="showcase-features-eyebrow">A real product, built on the same foundation</div>
              <h3 className="showcase-features-title">
                Sophego.AI — depth psychology and philosophical guidance, built for serious seekers.
              </h3>
              <p className="showcase-features-desc">
                Sophego is a Jungian and esoteric AI product trained across multiple traditions — Steiner, Swedenborg, Jung, Aquinas. It started as the same shell. The expertise made it something completely different.
              </p>
              <ul className="showcase-feature-list">
                {SOPHEGO_FEATURES.map(f => (
                  <li key={f.label} className="showcase-feature-item">
                    <span className="showcase-feature-icon">{f.icon}</span>
                    <div>
                      <div className="showcase-feature-name">{f.label}</div>
                      <div className="showcase-feature-desc">{f.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="showcase-preview">
              <div className="showcase-preview-label">Sophego.AI — live product</div>
              <div className="showcase-frame-wrap">
                <iframe
                  src="https://egoai-public-10.vercel.app/demo"
                  className="showcase-frame"
                  title="Sophego.AI demo"
                  allow="same-origin"
                />
              </div>
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
