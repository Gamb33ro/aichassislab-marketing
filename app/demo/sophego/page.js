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
  {
    role: 'user',
    content: "I feel like I'm living on the surface of myself. Like there's something deeper I can't reach.",
  },
  {
    role: 'assistant',
    content: `What you're describing has a name in depth psychology — Jung called it the provisional life. The sense that the life you are actually living is not quite the life that belongs to you.\n\nThis feeling — of being near yourself but not fully inside yourself — is one of the most honest perceptions a person can have. Most people learn to suppress it. You haven't.\n\nA few questions worth sitting with:\n\nWhat would the non-surface version of your life look like? Not idealized — just more real. And what specifically is standing between you and it — is it fear of failure, fear of being seen, or something harder to name?\n\nThe fact that you can feel the distance suggests the deeper thing is there. The question is what you're protecting yourself from by staying at the surface.`,
  },
  {
    role: 'user',
    content: "Fear of being seen, I think. And maybe fear that the deeper version wouldn't be what I imagine.",
  },
  {
    role: 'assistant',
    content: `Both fears are real, and they tend to work together.\n\nThe fear of being seen is usually a fear of being seen *and found wanting*. Not just exposed — exposed as insufficient. That's worth distinguishing, because it changes what you do with it.\n\nThe second fear — that the deeper version wouldn't be what you imagine — is actually a sign of psychological maturity. Immature longing fantasizes. What you're expressing is something more honest: the awareness that the self you haven't yet become might disappoint the idea you've built around it.\n\nBut here's what Jung noticed: the unlived life doesn't go away because we don't live it. It tends to appear as symptoms — restlessness, depression, a persistent sense of unreality. The surface life is never neutral.\n\nWhat would it mean for you to be seen? Seen by whom, specifically?`,
  },
]

const DEMO_RESPONSE = `This is a live preview of Sophego.AI — in the full version, the AI draws from Jung, Steiner, Swedenborg, Aquinas, and Aristotle to guide genuine depth work.\n\nExplore the sidebar to see the Archetype Analyst, Ego Mapper modules, and more.\n\nVisit **aichassislab.com** to build your own version.`

function formatContent(text) {
  const html = '<span>' + text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</span><br/><br/><span>')
    .replace(/\n/g, '<br/>') + '</span>'
  return html
}

function ArchetypeDemo() {
  return (
    <div className="module-wrap">
      <div className="module-eyebrow">EGO MAPPER · DEPTH PSYCHOLOGY</div>
      <h1 className="module-title">Archetype Analyst</h1>
      <p className="module-subtitle">A 30-question assessment identifying your dominant psychological pattern.</p>
      <div className="module-description">
        <p>Identifies your dominant Jungian archetypes, inferior function, shadow patterns, and unlived life — drawn from a clinical framework developed across depth psychology and analytical traditions.</p>
        <p>The assessment adapts mid-sequence based on your answers, injecting additional questions to trace the inferior function with clinical precision.</p>
      </div>
      <div className="module-card">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 24px' }}>
          {['Dominant archetype', 'Inferior function', 'Shadow patterns', 'Unlived life themes', 'Developmental phase', 'Anima / Animus dynamics'].map(item => (
            <div key={item} style={{ fontSize: 13, color: 'var(--text-mid)', paddingLeft: 12, borderLeft: '1px solid var(--border)', lineHeight: 1.5 }}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <button className="module-primary-btn" disabled>Begin Assessment — Demo Only</button>
      <div style={{ fontSize: 11, color: 'var(--text-dimmer)', marginTop: 6 }}>Available in the full product</div>
    </div>
  )
}

function ModuleDemo({ label, description, outputs }) {
  return (
    <div className="module-wrap">
      <div className="module-eyebrow">EGO MAPPER</div>
      <h1 className="module-title">{label}</h1>
      <div className="module-description">
        <p>{description}</p>
      </div>
      <div className="module-card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {outputs.map(o => (
            <div key={o} style={{ fontSize: 13, color: 'var(--text-mid)', paddingLeft: 12, borderLeft: '1px solid var(--border)', lineHeight: 1.5 }}>{o}</div>
          ))}
        </div>
      </div>
      <button className="module-primary-btn" disabled>Begin — Demo Only</button>
      <div style={{ fontSize: 11, color: 'var(--text-dimmer)', marginTop: 6 }}>Available in the full product</div>
    </div>
  )
}

function DashboardDemo() {
  return (
    <div style={{ minHeight: '100%', background: 'var(--bg)', fontFamily: 'var(--font-body)', overflowY: 'auto' }}>
      <div style={{ padding: '40px 32px 32px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ color: 'var(--text)', fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 300, margin: '0 0 8px' }}>
              Good to see you
            </h1>
            <p style={{ color: 'var(--text-dim)', fontSize: 14, margin: 0, lineHeight: 1.6 }}>
              Wednesday. The balance point. What has surprised you so far this week?
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
            <input readOnly placeholder="Start a new conversation..." style={{ flex: 1, background: 'var(--input-bg)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', padding: '12px 16px', fontSize: 14, outline: 'none', fontFamily: 'var(--font-body)' }} />
            <button style={{ background: 'var(--bg-panel)', border: '1px solid var(--border-mid)', borderRadius: 6, color: 'var(--gold)', padding: '12px 20px', cursor: 'not-allowed', fontSize: 13, letterSpacing: '0.05em', fontFamily: 'var(--font-sidebar)' }}>Begin</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
            {[
              { label: 'ARCHETYPE', value: 'Hero / Explorer', sub: 'dominant pattern' },
              { label: 'LAST VISION', value: '"Living on the surface…"', sub: 'Unlived potential', gold: true },
              { label: 'PRACTICE', value: 'Go to Chat →', sub: '' },
              { label: 'CREDITS TODAY', value: '12 / 75', sub: 'remaining' },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: 8, padding: 16 }}>
                <div style={{ color: 'var(--text-dimmer)', fontSize: 10, letterSpacing: '0.12em', marginBottom: 8 }}>{s.label}</div>
                <div style={{ color: s.gold ? 'var(--gold)' : 'var(--text)', fontSize: s.gold ? 11 : 14 }}>{s.value}</div>
                {s.sub && <div style={{ color: 'var(--text-dimmer)', fontSize: 11, marginTop: 2 }}>{s.sub}</div>}
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24 }}>
            <div style={{ color: 'var(--text-dimmer)', fontSize: 11, letterSpacing: '0.1em', marginBottom: 10 }}>TODAY'S PASSAGE</div>
            <blockquote style={{ margin: 0, color: 'var(--text-mid)', fontFamily: 'var(--font-display)', fontSize: 18, fontStyle: 'italic', lineHeight: 1.6 }}>
              "The privilege of a lifetime is to become who you truly are."
            </blockquote>
            <div style={{ color: 'var(--text-dimmer)', fontSize: 12, marginTop: 8 }}>— C.G. Jung</div>
          </div>
        </div>
      </div>
      <div style={{ background: 'var(--bg-panel)', minHeight: '40vh', padding: '32px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ color: 'var(--text)', fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 300, marginBottom: 4 }}>Personal Development</div>
          <div style={{ color: 'var(--text-dimmer)', fontSize: 12, marginBottom: 24 }}>Your ongoing developmental work</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { title: 'Shadow Work', desc: 'What I am projecting — and what it reveals', items: ['Colleague friction', 'Need for approval', 'Perfectionism'] },
              { title: 'Recurring Patterns', desc: 'Themes that keep surfacing across conversations', items: ['Provisional life', 'Fear of being seen', 'Unfinished things'] },
            ].map(card => (
              <div key={card.title} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, padding: 20 }}>
                <div style={{ color: 'var(--text)', fontSize: 16, fontFamily: 'var(--font-display)', fontWeight: 400, marginBottom: 4 }}>{card.title}</div>
                <div style={{ color: 'var(--text-dimmer)', fontSize: 12, marginBottom: 14, lineHeight: 1.5 }}>{card.desc}</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {card.items.map(item => (
                    <span key={item} style={{ background: 'var(--bg-panel)', border: '1px solid var(--border-mid)', borderRadius: 20, color: 'var(--text-mid)', padding: '6px 14px', fontSize: 12 }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const MODULE_DATA = {
  practice: {
    label: 'The Practice',
    description: 'A structured daily practice drawn from Steiner, Jung, and contemplative traditions. Builds awareness of threshold states, dream material, and inner life.',
    outputs: ['Morning orientation exercise', 'Evening review structure', 'Dream tracking framework', 'Weekly integration prompts'],
  },
  planetary: {
    label: 'Planetary Self',
    description: "Maps the inner landscape using Steiner's planetary sequence — from the Moon sphere through Saturn. Identifies which planetary qualities are developed, underdeveloped, or distorted.",
    outputs: ['Moon: Instinct & memory body', 'Mercury: Language & pattern', 'Venus: Value & aesthetic sense', 'Sun: Core identity force', 'Mars: Will & assertion', 'Jupiter: Wisdom & expansion', 'Saturn: Discipline & fate'],
  },
  correspondence: {
    label: 'The Vision Map',
    description: "A Swedenborgian exercise in reading the correspondence between inner states and outer life. What your surroundings reveal about your soul's current condition.",
    outputs: ['Environment as mirror', 'Relational correspondences', 'Work / vocation signal', 'Body symptom as language'],
  },
  shadow: {
    label: 'Shadow Journal',
    description: 'Guided prompts for tracking shadow projection, inflation, and integration. Structured around Jungian shadow theory with clinical specificity.',
    outputs: ['Weekly projection inventory', 'What irritates you (and why)', 'The unlived role', 'Integration progress tracking'],
  },
  reading: {
    label: 'Reading Path',
    description: 'A curated reading sequence drawn from your archetype result and current developmental phase. Primary texts, not summaries.',
    outputs: ['Phase-matched primary texts', 'Progression logic explained', 'Integration questions per book', 'Reading tradition map'],
  },
  mirror: {
    label: 'Mirror',
    description: 'A direct confrontation exercise. Presents your stated values against your observable behavior and asks you to account for the gap.',
    outputs: ['Stated vs. enacted values', 'Behavioral pattern audit', 'Accountability prompts', 'Gap analysis framework'],
  },
}

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

  function getViewTitle() {
    if (currentView === 'chat') return 'THE GUIDE'
    if (currentView === 'dashboard') return 'DASHBOARD'
    if (currentView === 'archetype') return 'ARCHETYPE ANALYST'
    if (currentView === 'practice') return 'THE PRACTICE'
    const m = EGO_MAPPER_ITEMS.find(i => i.key === currentView)
    return m ? m.label.toUpperCase() : 'EGO MAPPER'
  }

  function renderMainContent() {
    if (currentView === 'dashboard') return <div style={{ flex: 1, overflowY: 'auto' }}><DashboardDemo /></div>
    if (currentView === 'archetype') return <div style={{ flex: 1, overflowY: 'auto', background: 'var(--bg)' }}><ArchetypeDemo /></div>
    if (MODULE_DATA[currentView]) {
      const d = MODULE_DATA[currentView]
      return <div style={{ flex: 1, overflowY: 'auto', background: 'var(--bg)' }}><ModuleDemo label={d.label} description={d.description} outputs={d.outputs} /></div>
    }

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
