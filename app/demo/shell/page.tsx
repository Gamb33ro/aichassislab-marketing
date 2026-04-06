'use client'

import './shell.css'
import { useState, useRef, useEffect, useCallback } from 'react'

type ColorMode = 'dark' | 'grey' | 'light'
type View = 'dashboard' | 'chat'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const AI_NAME = 'YourAI'
const WELCOME = "Ask me anything about the course, the frameworks, or how to apply what you've learned."

const DEMO_CONVS = [
  { id: '1', title: 'How do I structure my pricing?', updated_at: new Date(Date.now() - 2 * 3600000).toISOString() },
  { id: '2', title: 'Best practices for student onboarding', updated_at: new Date(Date.now() - 26 * 3600000).toISOString() },
  { id: '3', title: 'Handling refund requests', updated_at: new Date(Date.now() - 3 * 24 * 3600000).toISOString() },
]

const INITIAL_MESSAGES: Message[] = [
  { role: 'user', content: 'How do I structure my pricing for my online course?' },
  {
    role: 'assistant',
    content: `Great question. For an online course, I'd recommend thinking about pricing in terms of transformation delivered — not hours of content.\n\n**A simple three-tier framework**:\n\n- **Entry** ($97–$297): Core content, community access\n- **Mid** ($497–$997): Adds coaching calls, direct feedback rounds\n- **High-ticket** ($1,500+): Done-with-you, direct access\n\nThe key principle: students should be able to calculate a clear ROI. What transformation does your course deliver, and what's that worth to them?`,
  },
  { role: 'user', content: 'My students are freelance designers trying to raise their rates.' },
  {
    role: 'assistant',
    content: `Perfect niche — motivated buyers who can do the math themselves.\n\nIf your course helps a designer go from $75/hr to $150/hr, and they bill 100 hrs/month, that's a **$7,500/month raise**. A $997 course is a no-brainer at that ROI.\n\n**My recommendation**:\n- Early cohort: $697\n- Launch price: $997\n- Add a $1,997 tier with portfolio review\n\nWant help writing the value proposition for your sales page?`,
  },
]

const DEMO_RESPONSE = `This is a live preview — in the full version, I'm trained on your specific course content, frameworks, and methodology. Your students would get answers in your voice, grounded in your curriculum.\n\nHead to **aichassislab.com** to get started.`

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function formatContent(text: string): string {
  const codeBlocks: string[] = []
  let html = text.replace(/```[\w]*\n?([\s\S]*?)```/g, (_: string, code: string) => {
    codeBlocks.push(escapeHtml(code))
    return `\x00CODE${codeBlocks.length - 1}\x00`
  })
  html = html.split('\x00').map((part, i) => {
    if (i % 2 === 1 && part.match(/^CODE\d+$/)) {
      const idx = parseInt(part.replace('CODE', ''))
      return `<pre><code>${codeBlocks[idx]}</code></pre>`
    }
    let p = escapeHtml(part)
    p = p.replace(/`([^`]+)`/g, '<code>$1</code>')
    p = p.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>')
    p = p.replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
    p = p.replace(/\n/g, '<br>')
    return p
  }).join('')
  return html
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export default function ShellDemoPage() {
  const [color, setColor] = useState<ColorMode>('dark')
  const [view, setView] = useState<View>('chat')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [activeConvId, setActiveConvId] = useState<string | null>('1')
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-color', color)
  }, [color])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 160) + 'px'
  }, [input])

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || isLoading) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: text }])
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setMessages(prev => [...prev, { role: 'assistant', content: DEMO_RESPONSE }])
    setIsLoading(false)
    textareaRef.current?.focus()
  }, [input, isLoading])

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  function loadConversation(id: string) {
    setActiveConvId(id)
    setMessages(id === '1' ? INITIAL_MESSAGES : [])
    setView('chat')
  }

  function startNew() {
    setActiveConvId(null); setMessages([]); setInput(''); setView('chat')
  }

  const circumference = 2 * Math.PI * 34
  const creditsUsed = 18
  const dailyLimit = 50
  const ringOffset = circumference * (1 - creditsUsed / dailyLimit)

  return (
    <div className="app-shell">
      <aside className={`sidebar${sidebarOpen ? '' : ' collapsed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="sidebar-logo-name">{AI_NAME}</span>
          </div>
          <button className="collapse-btn" onClick={() => setSidebarOpen(v => !v)}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              {sidebarOpen
                ? <path d="M8 2.5L4.5 6.5L8 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                : <path d="M5 2.5L8.5 6.5L5 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              }
            </svg>
          </button>
        </div>

        <nav className="sidebar-nav">
          <button className="new-chat-btn" onClick={startNew}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            <span className="btn-label">New conversation</span>
          </button>
          <div className="nav-items">
            <button className={`nav-item${view === 'dashboard' ? ' active' : ''}`} onClick={() => setView('dashboard')}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1" y="1" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><rect x="8.5" y="1" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><rect x="1" y="8.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/></svg>
              <span className="nav-label">Dashboard</span>
            </button>
            <button className={`nav-item${view === 'chat' ? ' active' : ''}`} onClick={() => setView('chat')}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 3.5C2 2.67 2.67 2 3.5 2h8C12.33 2 13 2.67 13 3.5v6c0 .83-.67 1.5-1.5 1.5H5L2 13V3.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>
              <span className="nav-label">Chat</span>
            </button>
          </div>
        </nav>

        <div className="chat-history">
          <div className="history-section-label">Recent</div>
          {DEMO_CONVS.map(conv => (
            <button key={conv.id} className={`history-item${activeConvId === conv.id ? ' active' : ''}`} onClick={() => loadConversation(conv.id)}>
              {conv.title}
            </button>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-footer-top">
            <div className="color-toggle">
              {(['dark', 'grey', 'light'] as ColorMode[]).map(c => (
                <button key={c} className={`color-opt color-opt-${c}${color === c ? ' active' : ''}`} onClick={() => setColor(c)} title={c} />
              ))}
            </div>
          </div>
          <div className="profile-row-wrap">
            <div className="profile-row">
              <div className="profile-avatar">DM</div>
              <span className="profile-name">Demo User</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        {view === 'dashboard' && (
          <div className="dashboard-wrap">
            <div className="dashboard-inner">
              <div className="dash-top">
                <div className="dash-hero">
                  <div>
                    <div className="dash-greeting">Hello, Demo User</div>
                    <div className="dash-subgreeting">What are you exploring today?</div>
                  </div>
                  <div className="dash-input-wrap" onClick={() => setView('chat')} style={{ cursor: 'pointer' }}>
                    <input className="dash-input" placeholder="Ask me anything…" readOnly />
                    <div style={{ flexShrink: 0, width: 30, height: 30, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M6.5 1L2 5.5M6.5 1L11 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                </div>

                <div className="stat-grid">
                  <div className="stat-card">
                    <div className="stat-label">Sessions Today</div>
                    <div className="stat-value">3</div>
                    <div className="stat-sub">conversations</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Last Active</div>
                    <div className="stat-value" style={{ fontSize: 16, paddingTop: 4 }}>2h ago</div>
                  </div>
                  <div className="stat-card credits-card">
                    <div className="stat-label" style={{ alignSelf: 'flex-start' }}>Credits Today</div>
                    <div className="credits-ring-wrap">
                      <svg width="72" height="72">
                        <circle cx="36" cy="36" r="34" fill="none" stroke="var(--border)" strokeWidth="5"/>
                        <circle cx="36" cy="36" r="34" fill="none" stroke="var(--primary)" strokeWidth="5"
                          strokeDasharray={circumference} strokeDashoffset={ringOffset} strokeLinecap="round"
                          style={{ transform: 'rotate(-90deg)', transformOrigin: '36px 36px' }}
                        />
                      </svg>
                      <div className="credits-ring-text">
                        <span className="credits-ring-val">{dailyLimit - creditsUsed}</span>
                        <span className="credits-ring-sub">left</span>
                      </div>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Streak</div>
                    <div className="stat-value">4</div>
                    <div className="stat-sub">days</div>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 28 }}>
                <div className="section-header"><span className="section-title">Recent Activity</span></div>
                <div className="activity-list">
                  {DEMO_CONVS.map(conv => (
                    <button key={conv.id} className="activity-item" onClick={() => loadConversation(conv.id)}>
                      <span className="activity-title">{conv.title}</span>
                      <span className="activity-time">{timeAgo(conv.updated_at)}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="section-header"><span className="section-title">My Notes</span></div>
                <div className="notes-scroll">
                  {['Goals', 'Questions', 'Insights', 'Bookmarks'].map(title => (
                    <div key={title} className="note-card">
                      <div className="note-card-title">{title}</div>
                      <div className="note-items">
                        <span className="note-empty-text">Empty</span>
                        <button className="note-add-btn"><span style={{ fontSize: 14, lineHeight: 1 }}>+</span>Add</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'chat' && (
          <div className="chat-wrap">
            <div className="messages-wrap">
              <div className="messages-inner">
                {messages.length === 0 && (
                  <div className="chat-welcome">
                    <p className="chat-welcome-text">{WELCOME}</p>
                  </div>
                )}
                {messages.map((msg, i) => (
                  <div key={i} className={msg.role === 'user' ? 'msg-user' : 'msg-assistant'}>
                    <div
                      className={`msg-bubble ${msg.role === 'user' ? 'msg-bubble-user' : 'msg-bubble-ai'}`}
                      {...(msg.role === 'assistant'
                        ? { dangerouslySetInnerHTML: { __html: formatContent(msg.content) } }
                        : { children: msg.content }
                      )}
                    />
                  </div>
                ))}
                {isLoading && (
                  <div className="typing-indicator">
                    <div className="typing-dots">
                      <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            </div>
            <div className="input-area">
              <div className="input-row">
                <textarea ref={textareaRef} className="chat-textarea" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Message…" rows={1} disabled={isLoading} />
                <button className="send-btn" onClick={() => sendMessage()} disabled={!input.trim() || isLoading} aria-label="Send">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1L7 13M7 1L2 6M7 1L12 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
              <p className="powered-by">Powered by AIChassisLab</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
