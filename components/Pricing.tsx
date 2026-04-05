const TIERS = [
  {
    name: 'Prototype',
    setup: '$1,800',
    monthly: '$530',
    annual: '$5,300',
    featured: false,
    users: 'Up to 50 active users',
    features: [
      'Up to 500MB content ingested',
      'Full branding and deployed website',
      'One revision round',
      'Email support',
    ],
  },
  {
    name: 'Build',
    setup: '$5,500',
    monthly: '$1,520',
    annual: '$15,200',
    featured: true,
    users: 'Up to 200 active users',
    features: [
      'Everything in Prototype',
      'Up to 2GB content',
      'Custom domain',
      'Memory — AI remembers each user',
      'Analytics dashboard',
      'Voice tuning session',
      'Two revision rounds',
      'Priority support',
    ],
  },
  {
    name: 'Production',
    setup: '$7,500',
    monthly: '$3,320',
    annual: '$33,200',
    featured: false,
    users: 'Up to 500 active users',
    features: [
      'Everything in Build',
      'Unlimited content',
      'Full white-label — no AIChassisLab branding',
      'The Depth Suite — structured assessment modules',
      'Custom module development (up to 3)',
      'Three revision rounds',
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
          </p>
        </div>

        <div className="pricing-explainer">
          <div className="pricing-explainer-icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <div className="pricing-explainer-text">
            <div className="pricing-explainer-headline">How AI costs work</div>
            <div className="pricing-explainer-body">
              Your platform runs on your own Anthropic API key. There&apos;s no markup
              from us — you pay Anthropic directly at cost. A heavy daily user
              typically costs{' '}
              <span className="pricing-explainer-stat">~$0.75/day</span>, meaning
              even an active user base is a small line item. Most clients charge
              $25–30/month per user and keep{' '}
              <span className="pricing-explainer-stat">&gt;90% margin</span> after API costs.
            </div>
          </div>
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
          Need more users or a custom setup?{' '}
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
        or {tier.annual} /year &nbsp;&middot;&nbsp; {tier.users}
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
