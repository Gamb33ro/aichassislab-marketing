const TIERS = [
  {
    name: 'Standard Core',
    monthly: '$350',
    featured: true,
    features: [
      'Fully custom-branded interface (your logo, name, colors)',
      'Custom domain configuration',
      '100% Secure BYOK — zero infrastructure markup',
      'Up to 2GB document & video transcript content ingestion',
      'Independent session memory per user',
      'Core usage analytics dashboard',
      'Standard Email Support',
    ],
  },
  {
    name: 'Enterprise Lite',
    monthly: '$500',
    featured: false,
    features: [
      'Everything in Standard Core',
      'Multi-Instance Deployment',
      'Unlimited content database ingestion',
      'Full White-Label — zero "Powered by AIChassisLab" branding',
      'The Depth Suite — structured assessment modules',
      'Advanced behavioral analytics',
      'Priority Slack Support',
    ],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="pricing-section">
      <div className="pricing-inner">

        <div className="pricing-header">
          <span className="text-accent-label">Pricing</span>
          <span className="accent-line" />
          <h2 className="text-section-headline">Flat monthly license. Your margin scales. Ours&nbsp;doesn&apos;t.</h2>
          <p className="pricing-header-sub">
            Zero setup fee. A flat monthly platform license — fixed regardless of
            how many users you have. You set what you charge your audience and
            keep 100% of it.
          </p>
          <p className="pricing-header-sub" style={{ marginTop: 12 }}>
            <strong style={{ color: 'var(--text-primary)' }}>BYOK — Bring Your Own Key.</strong>{' '}
            You connect your own OpenAI or Anthropic API account directly to
            your platform. Your users&apos; data never passes through our
            servers, and you pay the AI provider at raw cost with zero markup
            from us.
          </p>
        </div>

        <div className="pricing-cards reveal-fade">
          {TIERS.map(tier => (
            tier.featured ? (
              <div key={tier.name} className="glass-card-featured pricing-card-featured">
                <div className="pricing-most-popular">Most Popular</div>
                <PricingCardContent tier={tier} />
              </div>
            ) : (
              <div key={tier.name} className="glass-card pricing-card">
                <PricingCardContent tier={tier} />
              </div>
            )
          ))}
        </div>

        <p className="pricing-cta-text">
          Questions about which plan fits?{' '}
          <a href="#contact" className="pricing-cta-link">Get in touch</a>
        </p>

      </div>
    </section>
  )
}

function PricingCardContent({ tier }: { tier: typeof TIERS[number] }) {
  return (
    <>
      <div className="pricing-tier-name">{tier.name}</div>
      <div className="pricing-setup">$0</div>
      <div className="pricing-setup-label">zero setup fee</div>

      <div className="pricing-divider" />

      <div className="pricing-monthly">
        {tier.monthly}
        <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--text-muted)' }}>/mo</span>
      </div>
      <div className="pricing-monthly-note">
        flat monthly license
      </div>

      <ul className="pricing-features" role="list">
        {tier.features.map(f => (
          <li key={f} className="pricing-feature">
            <span className="pricing-bullet" aria-hidden="true" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </>
  )
}
