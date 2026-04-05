import ClientCalculator from './ClientCalculator'

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
                <div className="pricing-rec-stat-label">Daily cap per user</div>
                <div className="pricing-rec-stat-sub">
                  This is the maximum a user can ever cost you in a single day —
                  and it almost never happens. Heavy daily users typically run
                  $0.40–0.65/day. Occasional users cost cents.
                </div>
              </div>
            </div>
            <div className="pricing-rec-stat-row">
              <div className="pricing-rec-stat-value">&lt;7%</div>
              <div>
                <div className="pricing-rec-stat-label">Typical API cost as % of revenue</div>
                <div className="pricing-rec-stat-sub">
                  Most clients price at $25–30/month per user. Even at heavy
                  daily usage, AI costs rarely exceed 7% of what you collect
                  from users.
                </div>
              </div>
            </div>
            <div className="pricing-rec-stat-row">
              <div className="pricing-rec-stat-value">$7–10</div>
              <div>
                <div className="pricing-rec-stat-label">Realistic monthly cost per active user</div>
                <div className="pricing-rec-stat-sub">
                  A user on the platform every single day at 40–65 cents. Most
                  users cost far less — occasional users cost cents per month.
                </div>
              </div>
            </div>
          </div>

          <ClientCalculator />
        </div>

      </div>
    </section>
  )
}
