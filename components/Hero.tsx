export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-bg-glow" aria-hidden="true" />

      <div className="hero-inner">
        {/* Left Column */}
        <div>
          <div className="hero-eyebrow-pill anim-eyebrow">
            AI Infrastructure for Experts
          </div>

          <h1 className="hero-headline">
            <span className="anim-h1-line1" style={{ display: 'block' }}>
              Your expertise,
            </span>
            <span className="anim-h1-line2" style={{ display: 'block' }}>
              always available.
            </span>
          </h1>

          <p className="hero-sub anim-sub">
            AIChassisLab turns any body of expertise into a specialized AI your
            audience pays to use. Upload your content. Configure your AI. Launch
            to your students.
          </p>

          <div className="hero-buttons anim-buttons">
            <a href="#pricing" className="btn-primary">See pricing</a>
            <a href="#how-it-works" className="btn-ghost">How it works</a>
          </div>
        </div>

        {/* Right Column — Mock Chat */}
        <div className="anim-hero-card">
          <div className="hero-chat-card">
            <div className="chat-card-header">
              <span className="chat-card-dot" style={{ background: '#ff5f57' }} />
              <span className="chat-card-dot" style={{ background: '#febc2e' }} />
              <span className="chat-card-dot" style={{ background: '#28c840' }} />
              <span className="chat-card-title" style={{ marginLeft: 8 }}>
                Dr. Chen&apos;s Study AI
              </span>
            </div>

            <div className="chat-messages">
              <div className="chat-bubble-user">
                How should I apply the spaced repetition principle to my exam prep?
              </div>
              <div className="chat-bubble-ai">
                Based on the methodology I teach in Module 3, start with 24-hour
                intervals on new material, then expand to 3 days, 1 week, and 2
                weeks as retention improves. For your exam timeline, that means
                starting today on chapters 1–4.
              </div>
            </div>

            <div className="chat-input-bar">
              <span className="chat-input-placeholder">Ask a question…</span>
              <div className="chat-send-btn" aria-hidden="true">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 1v11M6.5 1L2 5.5M6.5 1L11 5.5"
                    stroke="#0C0C0F" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          <p style={{
            textAlign: 'center',
            fontSize: 12,
            color: 'var(--text-muted)',
            marginTop: 14,
            letterSpacing: '0.03em',
          }}>
            Your brand. Your content. Your AI.
          </p>
        </div>
      </div>
    </section>
  )
}
