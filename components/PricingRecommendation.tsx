export default function PricingRecommendation() {
  return (
    <section className="pricing-rec-section">
      <div className="pricing-rec-inner">

        <div className="pricing-rec-header reveal">
          <span className="text-accent-label">The economics</span>
          <span className="accent-line" />
          <h2 className="text-section-headline">What it actually costs to run</h2>
          <p className="text-body-large" style={{ maxWidth: 540, margin: '20px auto 0' }}>
            AI infrastructure sounds expensive. The reality is the opposite.
          </p>
        </div>

        <div className="pricing-rec-grid">
          <div className="pricing-rec-stats reveal">
            <div className="pricing-rec-stat-row">
              <div className="pricing-rec-stat-value">$0.75</div>
              <div>
                <div className="pricing-rec-stat-label">Per heavy user, per day</div>
                <div className="pricing-rec-stat-sub">
                  Based on observed usage from active daily users on the platform.
                  Light users cost significantly less. Your API key, your bill — no markup.
                </div>
              </div>
            </div>
            <div className="pricing-rec-stat-row">
              <div className="pricing-rec-stat-value">&lt;7%</div>
              <div>
                <div className="pricing-rec-stat-label">Typical API cost as % of revenue</div>
                <div className="pricing-rec-stat-sub">
                  Most clients price at $25–30/month per user. Even at heavy usage,
                  AI costs rarely exceed 7% of what you collect.
                </div>
              </div>
            </div>
            <div className="pricing-rec-stat-row">
              <div className="pricing-rec-stat-value">$7–10</div>
              <div>
                <div className="pricing-rec-stat-label">Realistic monthly cost per active user</div>
                <div className="pricing-rec-stat-sub">
                  A user on the platform every day. Most users cost far less.
                  Occasional users cost cents.
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card-featured pricing-rec-calc reveal">
            <div className="pricing-rec-calc-title">Margin calculator</div>
            <div className="pricing-calc-row">
              <span className="pricing-calc-label">What you charge per user</span>
              <span className="pricing-calc-value">$25/mo</span>
            </div>
            <div className="pricing-calc-row">
              <span className="pricing-calc-label">Typical API cost (heavy user)</span>
              <span className="pricing-calc-value">~$8/mo</span>
            </div>
            <div className="pricing-calc-row">
              <span className="pricing-calc-label">Platform fee (Build, 200 users)</span>
              <span className="pricing-calc-value">$1,520/mo</span>
            </div>
            <div style={{ height: 1, background: 'rgba(201,168,76,0.2)', margin: '8px 0 4px' }} />
            <div className="pricing-calc-row">
              <span className="pricing-calc-label">Monthly margin at 200 users</span>
              <span className="pricing-calc-value accent">~$1,880/mo</span>
            </div>
            <div className="pricing-calc-row">
              <span className="pricing-calc-label">Annual</span>
              <span className="pricing-calc-value accent">~$22,500/yr</span>
            </div>
            <p className="pricing-rec-footnote">
              * Based on observed usage patterns from active daily users.
              Light users will cost significantly less. Assumes $25/user/mo
              charge and Build plan at 200 users.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
