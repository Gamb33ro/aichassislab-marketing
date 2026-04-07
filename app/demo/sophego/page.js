'use client'

import './sophego.css'
import { useState, useRef, useEffect, useCallback } from 'react'

const MODES = [
  { key: 'EGO.AI',   label: 'Sophego.AI',          desc: 'Synthesis — all traditions' },
  { key: 'RUDOLF',   label: 'RUDOLF',               desc: 'Steiner — Anthroposophy' },
  { key: 'CARL',     label: 'CARL',                 desc: 'Jung — Depth Psychology' },
  { key: 'EMANUEL',  label: 'EMANUEL',              desc: 'Swedenborg — Correspondences' },
  { key: 'THOMAS',   label: 'AQUINAS & ARISTOTLE',  desc: 'Scholastic & Classical Philosophy' },
  { key: 'GUIDED',   label: 'Guided Thinking',      desc: 'Socratic — questions only' },
]

const THINKING_PHRASES = [
  'Sitting with that...', 'Drawing from the canon...', 'Reaching into the depths...', 'Finding the thread...',
]

const EGO_MAPPER_ITEMS = [
  { key: 'practice',      icon: '◉', label: 'The Practice' },
  { key: 'archetype',     icon: '◎', label: 'Archetype Analyst' },
  { key: 'planetary',     icon: '◯', label: 'Planetary Self' },
  { key: 'correspondence',icon: '◇', label: 'The Vision Map' },
  { key: 'shadow',        icon: '◐', label: 'Shadow Journal' },
  { key: 'reading',       icon: '◻', label: 'Reading Path' },
  { key: 'mirror',        icon: '◑', label: 'Mirror' },
]

const INITIAL_MESSAGES = [
  { role: 'user', content: "I feel like I'm living on the surface of myself. Like there's something deeper I can't reach." },
  { role: 'assistant', content: `What you're describing has a name in depth psychology — Jung called it the provisional life. The sense that the life you are actually living is not quite the life that belongs to you.\n\nThis feeling — of being near yourself but not fully inside yourself — is one of the most honest perceptions a person can have. Most people learn to suppress it. You haven't.\n\nA few questions worth sitting with:\n\nWhat would the non-surface version of your life look like? Not idealized — just more real. And what specifically is standing between you and it — is it fear of failure, fear of being seen, or something harder to name?\n\nThe fact that you can feel the distance suggests the deeper thing is there. The question is what you're protecting yourself from by staying at the surface.` },
  { role: 'user', content: "Fear of being seen, I think. And maybe fear that the deeper version wouldn't be what I imagine." },
  { role: 'assistant', content: `Both fears are real, and they tend to work together.\n\nThe fear of being seen is usually a fear of being seen *and found wanting*. Not just exposed — exposed as insufficient. That's worth distinguishing, because it changes what you do with it.\n\nThe second fear — that the deeper version wouldn't be what you imagine — is actually a sign of psychological maturity. Immature longing fantasizes. What you're expressing is something more honest: the awareness that the self you haven't yet become might disappoint the idea you've built around it.\n\nBut here's what Jung noticed: the unlived life doesn't go away because we don't live it. It tends to appear as symptoms — restlessness, depression, a persistent sense of unreality. The surface life is never neutral.\n\nWhat would it mean for you to be seen? Seen by whom, specifically?` },
]

const DEMO_RESPONSE = `This is a live preview of Sophego.AI — in the full version, the AI draws from Jung, Steiner, Swedenborg, Aquinas, and Aristotle to guide genuine depth work.\n\nExplore the sidebar to see the Archetype Analyst, Ego Mapper modules, and more.\n\nVisit **aichassislab.com** to build your own version.`

const DEMO_QUOTE = { text: "The privilege of a lifetime is to become who you truly are.", author: "Carl Jung" }

const DEMO_GREETING = (() => {
  const day = new Date().getDay()
  const greetings = {
    0: "Sunday. The Contemplative Observation exercise is worth doing today.",
    1: "Monday. The week begins. What are you carrying into it?",
    2: "Tuesday. The work is underway. What is asking for your attention?",
    3: "Wednesday. The balance point. What has surprised you so far this week?",
    4: "Thursday. Something is becoming clear that wasn't Monday.",
    5: "Friday. What did this week ask of you that you weren't expecting?",
    6: "Saturday. No schedule. What does that bring up?",
  }
  return greetings[day]
})()

const PRACTICE_INFO = [
  { glyph: '◉', label: 'Active Imagination', desc: 'Dialogue with an inner figure' },
  { glyph: '◎', label: 'Contemplative Observation', desc: 'Sustained attention on a single object' },
  { glyph: '◐', label: 'The Reversal Exercise', desc: 'Review your day in reverse' },
  { glyph: '◈', label: 'Inferior Function Development', desc: 'Develop your weakest psychological function' },
  { glyph: '◇', label: 'The Pondering Exercise', desc: 'Sit with a sentence from the canon over days' },
  { glyph: '◑', label: 'Shadow Confrontation', desc: 'Ongoing sessions working with a named shadow' },
  { glyph: '◻', label: 'Journaling', desc: 'Write into a penetrating question' },
  { glyph: '◯', label: 'Body-based Grounding', desc: 'Physical attention sequence restoring presence' },
]

const ARCHETYPES = ['Innocent','Orphan','Hero','Caregiver','Explorer','Rebel','Lover','Creator','Jester','Sage','Magician','Ruler']
const TRADITIONS = [
  { label: 'Rudolf Steiner / Anthroposophy', count: 12 },
  { label: 'Carl Jung / Depth Psychology', count: 15 },
  { label: 'Emanuel Swedenborg', count: 8 },
  { label: 'Aquinas & Aristotle / Scholastic & Classical Philosophy', count: 10 },
  { label: 'The Hermetic Tradition', count: 7 },
]

function formatContent(text) {
  const html = '<span>' + text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</span><br/><br/><span>')
    .replace(/\n/g, '<br/>') + '</span>'
  return html
}

// ── DASHBOARD ──────────────────────────────────────────────
function DashboardDemo({ onStartChat }) {
  const creditsUsed = 18
  const maxCredits = 75
  const radius = 34
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - creditsUsed / maxCredits)

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100%', fontFamily: 'var(--font-body)', overflowY: 'auto' }}>

      {/* TOP ZONE */}
      <div style={{ background: 'var(--bg-panel)', padding: 'clamp(24px,4vw,40px) clamp(20px,4vw,44px)', display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'stretch', position: 'relative', overflow: 'hidden' }}>

        {/* dot grid overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.1) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 90% at 5% 40%, rgba(201,168,76,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* LEFT COLUMN */}
        <div style={{ flex: '1.3', minWidth: '260px', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: 'var(--font-display)', lineHeight: '0.92', letterSpacing: '-2px' }}>
            <span style={{ display: 'block', fontSize: 'clamp(40px,6vw,72px)', fontWeight: 400, color: 'rgba(255,255,255,0.4)' }}>Hello,</span>
            <span style={{ display: 'block', fontSize: 'clamp(48px,7vw,80px)', fontWeight: 800, color: 'var(--text)' }}>Demo User</span>
          </div>

          <div style={{ fontSize: 13, fontStyle: 'italic', color: 'var(--text-dim)', marginTop: 14, lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>{DEMO_GREETING}</div>

          <div style={{ marginTop: 28, display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, height: 56, display: 'flex', alignItems: 'center', padding: '0 18px', cursor: 'pointer' }}
              onClick={onStartChat}>
              <span style={{ flex: 1, color: 'rgba(255,255,255,0.4)', fontSize: 14, fontFamily: 'var(--font-body)' }}>What's been on your mind...</span>
            </div>
            <button onClick={onStartChat} style={{ background: '#C9A84C', color: '#111', border: 'none', borderRadius: 12, width: 56, height: 56, cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </button>
          </div>

          <div style={{ marginTop: 22, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '18px 22px' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', fontWeight: 600, marginBottom: 12, fontFamily: 'var(--font-sidebar)' }}>Today's Passage</div>
            <div style={{ fontStyle: 'italic', fontSize: 15, color: '#C9A84C', lineHeight: 1.65, fontFamily: 'var(--font-display)' }}>"{DEMO_QUOTE.text}"</div>
            <div style={{ marginTop: 10, fontSize: 11, color: 'rgba(255,255,255,0.28)', fontFamily: 'var(--font-body)' }}>— {DEMO_QUOTE.author}</div>
          </div>
        </div>

        {/* RIGHT COLUMN — 2×2 widget grid */}
        <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: 8, position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 10, flex: 1, minHeight: 240 }}>
            {/* ARCHETYPE */}
            <div style={{ background: '#242424', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '16px 18px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontWeight: 600, marginBottom: 8 }}>Archetype</div>
              <div style={{ marginTop: 'auto', fontSize: 19, fontWeight: 600, color: '#F5F0E8', fontFamily: 'var(--font-display)', lineHeight: 1.3 }}>Hero / Explorer</div>
            </div>
            {/* LAST VISION */}
            <div style={{ background: '#242424', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '16px 18px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontWeight: 600, marginBottom: 10 }}>Last Vision</div>
              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontSize: 12, fontStyle: 'italic', color: '#C9A84C', lineHeight: 1.55, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>"Living on the surface of myself..."</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Unlived potential</div>
              </div>
            </div>
            {/* PRACTICE STREAK */}
            <div style={{ background: '#242424', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '16px 18px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontWeight: 600, marginBottom: 8 }}>Practice Streak</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 'auto' }}>
                <span style={{ fontSize: 52, fontWeight: 800, color: '#C9A84C', lineHeight: 1, fontFamily: 'var(--font-display)' }}>4</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>days</span>
              </div>
            </div>
            {/* CREDITS */}
            <div style={{ background: '#242424', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '16px 18px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontWeight: 600, marginBottom: 8 }}>Credits Today</div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <svg width="90" height="90" viewBox="0 0 88 88">
                  <circle cx="44" cy="44" r={radius} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="7"/>
                  <circle cx="44" cy="44" r={radius} fill="none" stroke="#C9A84C" strokeWidth="7" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" style={{ transform: 'rotate(-90deg)', transformOrigin: '44px 44px' }}/>
                  <text x="44" y="41" textAnchor="middle" dominantBaseline="middle" fill="#F5F0E8" fontSize="20" fontWeight="700">{creditsUsed}</text>
                  <text x="44" y="57" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="9">/ {maxCredits}</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM ZONE */}
      <div style={{ background: '#0F0F0F', borderTop: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(20px,3vw,28px) clamp(20px,4vw,44px) 64px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9A84C', fontWeight: 600 }}>Personal Development</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 16, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }}>
          {[
            { title: 'Shadows', icon: '◐', desc: 'Shadow qualities you have identified.', items: ['Need for approval', 'Perfectionism', 'Envy'] },
            { title: 'Integration Tasks', icon: '◈', desc: 'Active psychological work.', items: ['Shadow dialogues', 'Inferior function'] },
            { title: 'Incarnation Tasks', icon: '◇', desc: 'Longer-arc developmental goals.', items: ['Authentic authority', 'Creative expression'] },
            { title: 'Recent Developments', icon: '◉', desc: 'Shifts and realizations worth tracking.', items: ['Fear of being seen — named'] },
          ].map(card => (
            <div key={card.title} style={{ flexShrink: 0, width: 300, minHeight: 220, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: '20px 20px 18px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ color: '#C9A84C', fontSize: 15 }}>{card.icon}</span>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#F5F0E8', fontFamily: 'var(--font-display)' }}>{card.title}</div>
              </div>
              {card.desc && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', marginBottom: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{card.desc}</div>}
              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 7, flex: 1 }}>
                {card.items.map(item => (
                  <div key={item} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '8px 14px', fontSize: 13, color: '#D8D4CC', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: '#C9A84C', fontSize: 12 }}>{card.icon}</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── ARCHETYPE ──────────────────────────────────────────────
function ArchetypeDemo() {
  return (
    <div className="archetype-view-wrap">
      <div className="archetype-landing">
        <div className="archetype-eyebrow">Ego Mapper · Jungian Module</div>
        <div className="archetype-title">Archetype Analyst</div>
        <div className="archetype-subtitle">A map drawn from who you are, not who you think you are.</div>
        <div className="archetype-visual">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(201,168,76,0.15)" strokeWidth="1"/>
            <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(201,168,76,0.2)" strokeWidth="0.5"/>
            <circle cx="100" cy="100" r="50" fill="none" stroke="rgba(201,168,76,0.25)" strokeWidth="0.5"/>
            <circle cx="100" cy="100" r="30" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="0.5"/>
            <g stroke="rgba(201,168,76,0.18)" strokeWidth="0.5">
              <line x1="100" y1="10" x2="100" y2="190"/>
              <line x1="10" y1="100" x2="190" y2="100"/>
              <line x1="27" y1="27" x2="173" y2="173"/>
              <line x1="173" y1="27" x2="27" y2="173"/>
            </g>
            <g fill="none" stroke="rgba(201,168,76,0.35)" strokeWidth="0.8">
              <polygon points="100,10 110,100 100,190 90,100"/>
              <polygon points="10,100 100,90 190,100 100,110"/>
            </g>
            <circle cx="100" cy="100" r="6" fill="none" stroke="rgba(201,168,76,0.5)" strokeWidth="1"/>
            <circle cx="100" cy="100" r="2" fill="rgba(201,168,76,0.4)"/>
          </svg>
          <div className="archetype-visual-inner">◈</div>
        </div>
        <button className="analyze-btn" disabled>◆ &nbsp; ANALYZE MY ARCHETYPE</button>
        <p style={{ fontSize: 13, color: 'var(--text-dim)', fontStyle: 'italic', marginBottom: 32, marginTop: -28 }}>
          The more you explore with Sophego.AI, the more accurate this becomes.
        </p>
        <div className="archetype-desc-area">
          <p>The Archetype Analyst draws on Carl Jung's complete system of depth psychology to produce a genuine psychological portrait. It works across three layers: your conversation history, a structured questionnaire spanning behavioral, projective, and mythological registers, and an active imagination prompt.</p>
          <p>Jung identified twelve primary archetypes as the organizing patterns of the collective unconscious. Your result will include your dominant archetype, secondary constellation, shadow dynamic, and individuation path.</p>
          <div className="archetype-disclaimer">◆ &nbsp; This analysis is a starting point, not a verdict. Treat the result as a mirror worth looking into, not a definition worth settling for.</div>
        </div>
      </div>
    </div>
  )
}

// ── PRACTICE ──────────────────────────────────────────────
function PracticeDemo() {
  return (
    <div className="practice-wrap">
      <div className="practice-landing">
        <div className="p-eyebrow">Ego Mapper · Inner Work</div>
        <div className="p-title">The Practice</div>
        <div className="p-subtitle">Eight guided practices for psychological and spiritual development.</div>
        <div className="p-grid">
          {PRACTICE_INFO.map(p => (
            <button key={p.label} className="p-card" onClick={() => {}}>
              <div className="p-card-glyph">{p.glyph}</div>
              <div className="p-card-label">{p.label}</div>
              <div className="p-card-desc">{p.desc}</div>
            </button>
          ))}
        </div>
        <div className="p-divider" />
        <div className="p-route-section">
          <div className="p-route-hint">Not sure which practice fits? Describe what you are working with.</div>
          <textarea className="p-route-textarea" placeholder="What brings you here today..." rows={2} readOnly />
          <button className="p-primary-btn" disabled>Suggest a Practice →</button>
        </div>
        <button className="p-log-btn" style={{ marginTop: 16 }}>View Account &amp; Practice Log →</button>
      </div>
    </div>
  )
}

// ── PLANETARY SELF ──────────────────────────────────────────────
const PLANETARY_SVG = (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="module-illustration">
    <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(201,168,76,0.08)" strokeWidth="1"/>
    <circle cx="100" cy="100" r="55" fill="none" stroke="rgba(201,168,76,0.12)" strokeWidth="0.8"/>
    <circle cx="100" cy="100" r="30" fill="none" stroke="rgba(201,168,76,0.18)" strokeWidth="0.8"/>
    <circle cx="100" cy="100" r="8" fill="none" stroke="rgba(201,168,76,0.4)" strokeWidth="1.2"/>
    {[0,1,2,3,4,5,6].map(i => {
      const angle = (i * 360/7 - 90) * Math.PI / 180
      const x = 100 + 55 * Math.cos(angle)
      const y = 100 + 55 * Math.sin(angle)
      return <circle key={i} cx={x} cy={y} r="3.5" fill="rgba(201,168,76,0.35)" />
    })}
    <circle cx="100" cy="100" r="2" fill="rgba(201,168,76,0.6)"/>
  </svg>
)

function PlanetaryDemo() {
  return (
    <div className="module-wrap">
      <div className="module-eyebrow">EGO MAPPER · STEINERIAN MODULE</div>
      <h1 className="module-title">Planetary Self</h1>
      <p className="module-subtitle">Your soul biography read through the seven phases of human development.</p>
      <div className="module-illustration-wrap">{PLANETARY_SVG}</div>
      <div className="module-description">
        <p>Rudolf Steiner described human biographical development as a series of seven-year phases, each governed by a distinct planetary principle. These are not astrological metaphors — they are precise descriptions of what the soul is working on, what forces are active, and what the developmental task of each life period is.</p>
        <p>The sequence moves from Moon (birth to 7) through Saturn (56–63), with the Sun phase at the center (21–42) as the longest and most formative. Where you are in this arc is not fixed by age alone — it is shaped by what has actually happened in your life, what has been worked through, and what remains.</p>
        <p>You will be asked five questions. Answer honestly. The result is a reading of your current phase, what it is asking of you, and what the arc looks like from here.</p>
      </div>
      <button className="module-primary-btn" disabled>Begin Planetary Reading →</button>
    </div>
  )
}

// ── VISION MAP (CORRESPONDENCE) ──────────────────────────────────────────────
const CORRESPONDENCE_SVG = (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="module-illustration">
    <line x1="100" y1="30" x2="100" y2="170" stroke="rgba(201,168,76,0.3)" strokeWidth="0.8"/>
    <line x1="30" y1="100" x2="170" y2="100" stroke="rgba(201,168,76,0.3)" strokeWidth="0.8"/>
    <circle cx="100" cy="60" r="22" fill="none" stroke="rgba(201,168,76,0.35)" strokeWidth="1"/>
    <circle cx="100" cy="140" r="22" fill="none" stroke="rgba(201,168,76,0.2)" strokeWidth="0.8" strokeDasharray="3,3"/>
    <path d="M100 82 L100 118" stroke="rgba(201,168,76,0.4)" strokeWidth="1"/>
    <text x="100" y="63" textAnchor="middle" fill="rgba(201,168,76,0.5)" fontSize="9" fontFamily="serif">SPIRIT</text>
    <text x="100" y="143" textAnchor="middle" fill="rgba(201,168,76,0.3)" fontSize="9" fontFamily="serif">NATURE</text>
  </svg>
)

function CorrespondenceDemo() {
  return (
    <div className="module-wrap">
      <div className="module-eyebrow">EGO MAPPER · SWEDENBORGIAN MODULE</div>
      <h1 className="module-title">The Vision Map</h1>
      <p className="module-subtitle">Interpret any vision into a part of you that you didn't know existed.</p>
      <div className="module-illustration-wrap">{CORRESPONDENCE_SVG}</div>
      <div className="module-description">
        <p>Emanuel Swedenborg's central discovery was that every natural form, event, or recurring situation corresponds to a spiritual reality. The outer world is not merely material — it is the expression of inner causes. What happens outside is showing you what is happening inside, whether you can read it or not.</p>
        <p>Swedenborg was a scientist before he was a visionary. He described these correspondences with the precision of an engineer reporting observations. The reading produced here follows that method: spare, exact, three-layered.</p>
        <p>Bring what you carry — a recurring situation, a conflict that keeps repeating, a symbol or image that has stayed with you, a dream that will not leave.</p>
      </div>
      <div className="module-input-section">
        <textarea className="module-textarea" placeholder="Describe a dream, daydream, recurring image, or vision..." rows={4} readOnly />
        <button className="module-primary-btn" disabled>Read the Correspondence →</button>
      </div>
    </div>
  )
}

// ── SHADOW JOURNAL ──────────────────────────────────────────────
const SHADOW_JOURNAL_SVG = (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="module-illustration">
    <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(201,168,76,0.1)" strokeWidth="1"/>
    <path d="M100 30 A70 70 0 0 1 100 170 Z" fill="rgba(201,168,76,0.07)"/>
    <line x1="100" y1="30" x2="100" y2="170" stroke="rgba(201,168,76,0.25)" strokeWidth="0.8"/>
    <circle cx="82" cy="85" r="10" fill="none" stroke="rgba(201,168,76,0.45)" strokeWidth="1"/>
    <circle cx="82" cy="85" r="4" fill="rgba(201,168,76,0.3)"/>
    <circle cx="118" cy="85" r="10" fill="none" stroke="rgba(201,168,76,0.15)" strokeWidth="0.6" strokeDasharray="2,2"/>
    <circle cx="118" cy="85" r="4" fill="rgba(201,168,76,0.08)"/>
    <path d="M82 100 Q100 125 118 100" fill="none" stroke="rgba(201,168,76,0.2)" strokeWidth="0.8" strokeLinecap="round"/>
  </svg>
)

function ShadowDemo() {
  return (
    <div className="module-wrap">
      <div className="module-eyebrow">EGO MAPPER · JUNGIAN MODULE</div>
      <h1 className="module-title">Shadow Journal</h1>
      <p className="module-subtitle">Track where the shadow shows up. See the pattern.</p>
      <div className="module-illustration-wrap">{SHADOW_JOURNAL_SVG}</div>
      <div className="module-description">
        <p>Jung observed that the shadow announces itself through disproportionate reaction — the irritation that is too strong for the situation, the envy that surfaces before you can suppress it, the contempt that arrives at the sight of a specific quality in another person. These are not character flaws. They are the psyche pointing at what has been rejected and projected outward.</p>
        <p>This journal catches those moments before they dissolve. You log what happened. The AI reflects back what it sees. Over time, a pattern becomes visible — the same content asserting itself through different situations, different people, different forms.</p>
        <p>You can track multiple named shadows. Each entry belongs to a shadow you name.</p>
      </div>
      <button className="module-primary-btn" disabled>+ Log Shadow Moment</button>
    </div>
  )
}

// ── READING PATH ──────────────────────────────────────────────
function ReadingDemo() {
  return (
    <div className="module-wrap">
      <div className="module-eyebrow">EGO MAPPER · LIBRARY</div>
      <h1 className="module-title">Reading Path</h1>
      <p className="module-subtitle">Canon reading lists drawn from the traditions. A library for the examined life.</p>
      <div className="module-illustration-wrap">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="module-illustration">
          {[0,1,2,3,4,5,6,7].map(i => (
            <rect key={i} x={52 + i * 13} y={70} width={10} height={60 + (i % 3) * 10} rx="1"
              fill="none" stroke="rgba(201,168,76,0.25)" strokeWidth="0.8"/>
          ))}
          <line x1="45" y1="135" x2="160" y2="135" stroke="rgba(201,168,76,0.3)" strokeWidth="1"/>
          <line x1="45" y1="136" x2="160" y2="136" stroke="rgba(201,168,76,0.1)" strokeWidth="2"/>
        </svg>
      </div>
      <div className="module-description">
        <p>These reading lists are drawn from the canon at the heart of Sophego.AI — Steiner, Jung, Swedenborg, Aquinas, and the hermetic tradition — organized by Jungian archetype and by tradition. Each book includes a note explaining why it belongs to that path.</p>
        <p>This is not a general philosophy library. Every title has been chosen because it speaks to a specific psychological or spiritual situation.</p>
      </div>
      <div className="module-section">
        <div className="module-section-label">BY ARCHETYPE</div>
        <div className="module-archetype-grid">
          {ARCHETYPES.map(name => (
            <button key={name} className="module-archetype-chip" onClick={() => {}}>{name}</button>
          ))}
        </div>
      </div>
      <div className="module-section">
        <div className="module-section-label">BY TRADITION</div>
        <div className="module-tradition-list">
          {TRADITIONS.map(trad => (
            <button key={trad.label} className="module-tradition-card" onClick={() => {}}>
              <div className="module-tradition-name">{trad.label}</div>
              <div className="module-tradition-count">{trad.count} books →</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── MIRROR ──────────────────────────────────────────────
const MIRROR_SVG = (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="module-illustration">
    <ellipse cx="100" cy="95" rx="45" ry="60" fill="none" stroke="rgba(201,168,76,0.2)" strokeWidth="1"/>
    <ellipse cx="100" cy="95" rx="38" ry="52" fill="none" stroke="rgba(201,168,76,0.12)" strokeWidth="0.6"/>
    <rect x="88" y="155" width="24" height="8" rx="2" fill="none" stroke="rgba(201,168,76,0.25)" strokeWidth="0.8"/>
    <rect x="93" y="163" width="14" height="14" rx="1" fill="none" stroke="rgba(201,168,76,0.2)" strokeWidth="0.8"/>
    <circle cx="100" cy="90" r="16" fill="none" stroke="rgba(201,168,76,0.15)" strokeWidth="0.6" strokeDasharray="2,3"/>
    <circle cx="100" cy="90" r="3" fill="rgba(201,168,76,0.3)"/>
  </svg>
)

function MirrorDemo() {
  return (
    <div className="module-wrap">
      <div className="module-eyebrow">EGO MAPPER · SYNTHESIS MODULE</div>
      <h1 className="module-title">The Mirror</h1>
      <p className="module-subtitle">Everything Sophego.AI knows about you, reflected back.</p>
      <div className="module-illustration-wrap">{MIRROR_SVG}</div>
      <div className="module-description">
        <p>The Mirror synthesizes everything the system has built up about you — your conversation history, your memory summary, your archetype result if present — into a single direct psychological portrait. Not a summary of traits. A portrait of the person as they have revealed themselves across time.</p>
        <p>The more you have explored with Sophego.AI, the clearer the mirror becomes. If you are new, the output will be preliminary and it will say so. The mirror is most useful after sustained engagement — multiple conversations, completed practices, the Archetype Analyst.</p>
      </div>
      <div className="module-mirror-warning">
        The Mirror requires a history. If you have not yet had substantial conversations with Sophego.AI, the output will be thin. Come back when you have more to show.
      </div>
      <div className="mirror-memory-note">The Mirror reads your memory. For a richer result, make sure your memory is up to date — you can refresh it in Settings.</div>
      <button className="module-primary-btn" disabled>Hold Up the Mirror →</button>
    </div>
  )
}

// ── MAIN PAGE ──────────────────────────────────────────────
export default function SophegoDemoPage() {
  const [color, setColor] = useState('dark')
  const [theme, setTheme] = useState('friend')
  const [currentMode, setCurrentMode] = useState('EGO.AI')
  const [currentView, setCurrentView] = useState('chat')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showDropdown, setShowDropdown] = useState(false)
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [thinkingPhrase, setThinkingPhrase] = useState(THINKING_PHRASES[0])

  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)
  const thinkingIntervalRef = useRef(null)

  const isFriend = theme === 'friend'
  const currentModeObj = MODES.find(m => m.key === currentMode)

  useEffect(() => {
    document.documentElement.setAttribute('data-color', color)
    document.documentElement.setAttribute('data-theme', theme)
  }, [color, theme])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  useEffect(() => {
    if (isLoading) {
      let i = 0
      thinkingIntervalRef.current = setInterval(() => {
        i = (i + 1) % THINKING_PHRASES.length
        setThinkingPhrase(THINKING_PHRASES[i])
      }, 2500)
    } else {
      clearInterval(thinkingIntervalRef.current)
    }
    return () => clearInterval(thinkingIntervalRef.current)
  }, [isLoading])

  useEffect(() => {
    function handler(e) {
      if (!e.target.closest('.dropdown-wrapper')) setShowDropdown(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function autoResize(el) {
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 160) + 'px'
  }

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || isLoading) return
    setInput('')
    if (textareaRef.current) { textareaRef.current.style.height = 'auto' }
    setMessages(prev => [...prev, { role: 'user', content: text }])
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setMessages(prev => [...prev, { role: 'assistant', content: DEMO_RESPONSE }])
    setIsLoading(false)
    textareaRef.current?.focus()
  }, [input, isLoading])

  function navigate(view) {
    setCurrentView(view)
  }

  function goToChat() {
    setCurrentView('chat')
  }

  function getViewTitle() {
    if (currentView === 'chat') return 'THE GUIDE'
    if (currentView === 'dashboard') return 'DASHBOARD'
    if (currentView === 'archetype') return 'ARCHETYPE ANALYST'
    if (currentView === 'practice') return 'THE PRACTICE'
    const m = EGO_MAPPER_ITEMS.find(i => i.key === currentView)
    return m ? m.label.toUpperCase() : 'EGO MAPPER'
  }

  function renderMainContent() {
    if (currentView === 'dashboard') return (
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <DashboardDemo onStartChat={goToChat} />
      </div>
    )
    if (currentView === 'archetype') return (
      <div style={{ flex: 1, overflowY: 'auto', background: 'var(--bg)' }}>
        <ArchetypeDemo />
      </div>
    )
    if (currentView === 'practice') return (
      <div style={{ flex: 1, overflowY: 'auto', background: 'var(--bg)' }}>
        <PracticeDemo />
      </div>
    )
    if (currentView === 'planetary') return (
      <div style={{ flex: 1, overflowY: 'auto', background: 'var(--bg)' }}>
        <PlanetaryDemo />
      </div>
    )
    if (currentView === 'correspondence') return (
      <div style={{ flex: 1, overflowY: 'auto', background: 'var(--bg)' }}>
        <CorrespondenceDemo />
      </div>
    )
    if (currentView === 'shadow') return (
      <div style={{ flex: 1, overflowY: 'auto', background: 'var(--bg)' }}>
        <ShadowDemo />
      </div>
    )
    if (currentView === 'reading') return (
      <div style={{ flex: 1, overflowY: 'auto', background: 'var(--bg)' }}>
        <ReadingDemo />
      </div>
    )
    if (currentView === 'mirror') return (
      <div style={{ flex: 1, overflowY: 'auto', background: 'var(--bg)' }}>
        <MirrorDemo />
      </div>
    )

    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
        <div className="messages-wrap">
          <div className="messages-inner">
            {messages.length === 0 && (
              <div className="chat-welcome">
                <div className="chat-welcome-title">{isFriend ? 'Good to see you' : 'THE GUIDE IS PRESENT'}</div>
                <div className="chat-welcome-divider" />
                <div className="chat-welcome-text">
                  {isFriend ? "Whatever is on your mind today — this is a good place to start. What's going on?" : "Whatever brought you here today — it is worth exploring. What is on your mind?"}
                </div>
              </div>
            )}
            {messages.map((msg, i) => {
              const html = formatContent(msg.content)
              return (
                <div key={i} className={`message ${msg.role}`}>
                  <div className="message-role">
                    {!isFriend && msg.role === 'assistant' && <div className="message-role-line" />}
                    {msg.role === 'assistant' ? (isFriend ? 'Sophego.AI' : currentMode) : (isFriend ? 'You' : 'YOU')}
                    {!isFriend && msg.role === 'user' && <div className="message-role-line" />}
                  </div>
                  <div className="message-body">
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                  </div>
                </div>
              )
            })}
            {isLoading && (
              <div className="message assistant">
                <div className="message-role">
                  {!isFriend && <div className="message-role-line" />}
                  {isFriend ? 'Sophego.AI' : currentMode}
                </div>
                <div className="message-body">
                  <div className="thinking-text">{thinkingPhrase}</div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="input-area">
          <div className="input-box">
            <textarea
              ref={textareaRef}
              className="chat-textarea"
              placeholder={isFriend ? "What's on your mind..." : "Ask anything, or tell me what is on your mind..."}
              rows={1}
              value={input}
              onChange={e => { setInput(e.target.value); autoResize(e.target) }}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
            />
            <button className="send-btn" onClick={sendMessage} disabled={isLoading || !input.trim()}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M14 8L2 2l3 6-3 6 12-6z" fill="currentColor"/></svg>
            </button>
          </div>
          <div className="input-hint">Enter to send &nbsp;·&nbsp; Shift+Enter for new line</div>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <div className={`sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">SOPHEGO.AI</div>
          <button className="icon-btn sidebar-close-btn" onClick={() => setSidebarOpen(false)}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10 2L4 7L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        <div className="sidebar-scroll">
          <div className="sidebar-top">
            <button className="new-chat-btn" onClick={() => { setMessages([]); setCurrentView('chat') }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1v9M1 5.5h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              NEW CONVERSATION
            </button>
            <div className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`} onClick={() => navigate('dashboard')}>
              <span className="nav-icon">◧</span><span className="nav-label">Dashboard</span>
            </div>
            <div className={`nav-item ${currentView === 'chat' ? 'active' : ''}`} onClick={() => navigate('chat')}>
              <span className="nav-icon">◈</span><span className="nav-label">Sophego.AI</span>
            </div>
            <div className="sidebar-divider" />
            <div className="sidebar-section-label">Ego Mapper</div>
            {EGO_MAPPER_ITEMS.map(item => (
              <div key={item.key} className={`nav-item ${currentView === item.key ? 'active' : ''}`} onClick={() => navigate(item.key)}>
                <span className="nav-icon">{item.icon}</span><span className="nav-label">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="recent-section">
            <div className="sidebar-divider" />
            <div className="sidebar-section-label">Recent</div>
            {[
              'The provisional life and why I keep stopping',
              'Shadow work — what am I projecting?',
              'Steiner on the etheric body',
            ].map((title, i) => (
              <div key={i} className={`chat-history-item ${i === 0 && currentView === 'chat' ? 'active' : ''}`}
                onClick={() => { setMessages(i === 0 ? INITIAL_MESSAGES : []); setCurrentView('chat') }}>
                <div className="chat-history-label">{title}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="profile-row">
            <div className="profile-avatar">D</div>
            <div className="profile-name">demo@sophego.ai</div>
          </div>
        </div>
      </div>

      <div className="main">
        <div className="header">
          <button className="icon-btn sidebar-toggle-btn" onClick={() => setSidebarOpen(p => !p)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              {sidebarOpen
                ? <path d="M4 3h8M4 8h8M4 13h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                : <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              }
            </svg>
          </button>

          <div className="dropdown-wrapper">
            <button className={`dropdown-btn ${showDropdown ? 'open' : ''}`} onClick={() => setShowDropdown(p => !p)}>
              <span>{currentModeObj?.label}</span>
              <span className="dropdown-arrow">▼</span>
            </button>
            {showDropdown && (
              <div className="dropdown-menu open">
                {MODES.map(m => (
                  <div key={m.key} className={`dropdown-item ${currentMode === m.key ? 'selected' : ''}`}
                    onClick={() => { setCurrentMode(m.key); setShowDropdown(false); setMessages([]); setCurrentView('chat') }}>
                    <div className="dropdown-item-name">{m.label}</div>
                    <div className="dropdown-item-desc">{m.desc}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="tooltip-wrapper">
            <button className="theme-toggle-header" onClick={() => setTheme(t => t === 'friend' ? 'formal' : 'friend')}>
              <span>{isFriend ? 'Friend' : 'Formal'}</span>
              <div className="theme-pill" />
            </button>
          </div>

          <div className="color-slider-wrap">
            {['dark', 'grey', 'light'].map(c => (
              <div key={c} className={`color-opt color-opt-${c} ${color === c ? 'active' : ''}`}
                onClick={() => setColor(c)} title={c} />
            ))}
          </div>

          <div className="header-title">{getViewTitle()}</div>
        </div>

        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {renderMainContent()}
        </div>
      </div>
    </div>
  )
}
