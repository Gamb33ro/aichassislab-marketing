const TIERS = [
  {
    name: 'Basic',
    setup: '$1,800',
    monthly: '$440',
    annual: '$4,400',
    featured: false,
    features: [
      'Up to 500MB content ingested',
      'Full branding and deployed website',
      'Two revision rounds',
      'Email support',
    ],
  },
  {
    name: 'Pro',
    setup: '$5,500',
    monthly: '$1,520',
    annual: '$15,200',
    featured: true,
    features: [
      'Everything in Basic',
      'Up to 2GB content',
      'Custom domain',
      'Memory — AI remembers each user',
      'Analytics dashboard',
      'Voice tuning session',
      'Four revision rounds',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise',
    setup: '$7,500',
    monthly: '$3,320',
    annual: '$33,200',
    featured: false,
    features: [
      'Everything in Pro',
      'Unlimited content',
      'Full white-label — no AIChassisLab branding',
      'The Depth Suite — structured assessment modules',
      'Unlimited revisions',
      'Launch support',
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
          <h2 className="text-section-headline">Built for serious experts</h2>
          <p className="pricing-header-sub">
            One-time setup fee. Monthly platform fee. You bring your own
            Anthropic API key — your users&apos; AI costs go directly to you, not us.
            A heavy daily user typically costs $0.40–0.65/day. Most clients keep
            over 90% margin.
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
      <div className="pricing-setup">{tier.setup}</div>
      <div className="pricing-setup-label">one-time setup</div>

      <div className="pricing-divider" />

      <div className="pricing-monthly">
        {tier.monthly}
        <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--text-muted)' }}>/mo</span>
      </div>
      <div className="pricing-monthly-note">
        or {tier.annual} /year
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
