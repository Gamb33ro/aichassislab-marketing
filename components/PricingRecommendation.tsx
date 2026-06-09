import ClientCalculator from './ClientCalculator'

export default function PricingRecommendation() {
  return (
    <section id="calculator" className="pricing-rec-section">
      <div className="pricing-rec-inner">

        <div className="pricing-rec-header reveal">
          <span className="text-accent-label">The economics</span>
          <span className="accent-line" />
          <h2 className="text-section-headline">Why BYOK is a financial and security win</h2>
          <p className="text-body-large" style={{ maxWidth: 540, margin: '20px auto 0' }}>
            You pay the provider directly. We take a flat license fee. Nothing else.
          </p>
        </div>

        <div className="pricing-rec-grid">
          <div className="pricing-rec-stats reveal">
            <div className="pricing-rec-stat-row">
              <div className="pricing-rec-stat-value">0%</div>
              <div>
                <div className="pricing-rec-stat-label">Middleman markup</div>
                <div className="pricing-rec-stat-sub">
                  We do not route usage through our servers or charge a premium
                  on tokens. By inputting your own OpenAI or Anthropic API key,
                  you pay raw cloud infrastructure costs directly to the
                  provider. No margins, no hidden fees.
                </div>
              </div>
            </div>
            <div className="pricing-rec-stat-row">
              <div className="pricing-rec-stat-value">100%</div>
              <div>
                <div className="pricing-rec-stat-label">Sovereign data security</div>
                <div className="pricing-rec-stat-sub">
                  Because you use your own API key, your company&apos;s or
                  academy&apos;s data stays locked within your corporate
                  boundary. Your proprietary frameworks are safe, isolated, and
                  are never used to train public models.
                </div>
              </div>
            </div>
            <div className="pricing-rec-stat-row">
              <div className="pricing-rec-stat-value">~$10</div>
              <div>
                <div className="pricing-rec-stat-label">Typical monthly cost per active user</div>
                <div className="pricing-rec-stat-sub">
                  Raw B2B API costs are incredibly cheap. A student or manager
                  using your AI heavily every single day typically costs between
                  $5–$15 for the entire month — a complete rounding error
                  compared to hiring more human staff.
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
