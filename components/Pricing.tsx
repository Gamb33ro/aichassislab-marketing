const TIERS = [
  {
    name: 'Prototype',
    setup: '$1,800',
    monthly: '$530',
    annual: '$5,300',
    featured: false,
    features: [
      'Up to 500MB content ingested',
      'Full branding and deployed website',
      'Daily credit system for your users',
      'One revision round',
      'Email support',
    ],
    footerNote: null,
  },
  {
    name: 'Build',
    setup: '$5,500',
    monthly: '$1,520',
    annual: '$15,200',
    featured: true,
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
    footerNote: null,
  },
  {
    name: 'Production',
    setup: '$7,500',
    monthly: '$3,320',
    annual: '$33,200',
    featured: false,
    features: [
      'Everything in Build',
      'Unlimited content',
      'Full white-label — no AIChassisLab branding',
      'The Depth Suite — structured assessment modules',
      'Custom module development (up to 3)',
      'Three revision rounds',
      'Launch support',
    ],
    footerNote: 'Price rises to $12,000 after first 3 clients.',
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
            All plans include a one-time implementation fee. Annual billing saves
            two months.
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

      <div className="pricing-monthly">{tier.monthly}<span style={{ fontSize: 14, fontWeight: 400, color: 'var(--text-muted)' }}>/mo</span></div>
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

      {tier.footerNote && (
        <p className="pricing-footer-note">{tier.footerNote}</p>
      )}
    </>
  )
}
