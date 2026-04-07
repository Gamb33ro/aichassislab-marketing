const revenueStat = (
  <div className="who-path-stat">
    <span className="who-stat-num">90</span>
    <span className="who-stat-label">users to<br />break even</span>
  </div>
)

const costStat = (
  <div className="who-stat-compare">
    <div className="who-stat-compare-item">
      <span className="who-stat-compare-num who-stat-compare-num--crossed">~$3k</span>
      <span className="who-stat-compare-label">VA / month</span>
    </div>
    <span className="who-stat-vs">vs</span>
    <div className="who-stat-compare-item">
      <span className="who-stat-compare-num who-stat-compare-num--accent">$1,520</span>
      <span className="who-stat-compare-label">platform / month</span>
    </div>
  </div>
)

const PATHS = [
  {
    tag: 'Revenue Generation Play',
    headline: '90 users covers\nthe platform fee.',
    stat: revenueStat,
    body: "You are not asking for a large user base — you are asking for a small slice of the audience you already have. A creator with 500 students needs 18% adoption at $25/month to break even. A creator with 1,000 students needs 9%. Gate your AI behind a premium tier, sell it as a paid add-on, or bundle it into a higher membership level. Every subscriber above 90 is pure margin, running without you touching it.",
    proof: <>90 users at $25/month covers the platform fee entirely — after API costs. At 200 subscribers, that&apos;s over $22,000 net annually. Everything above 90 is ~$17 per user, per month, straight to you. Model your numbers with the <a href="#calculator" className="who-proof-link">calculator</a>.</>,
    works: ['Premium tier upgrades', 'Paid add-ons to existing courses', 'Post-course subscriptions', 'Membership tier expansions'],
    delay: 0,
  },
  {
    tag: 'Cost Reduction Play',
    headline: 'Stop paying\nfor repetitive questions.',
    stat: costStat,
    body: "Give every student AI access as part of the course experience. No new revenue line — but you stop paying a VA, stop spending hours on support, and stop being the bottleneck. An AI trained on your content answers exactly as you would, at 2am on a Sunday, without touching your calendar.",
    proof: "The math is operational: one VA costs $2,500–4,000 a month. The platform fee is a fraction of that — and the AI never calls in sick.",
    works: ['Online courses', 'Cohort programs', 'Membership communities', 'Training programs'],
    delay: 80,
  },
]

export default function WhoItsFor() {
  return (
    <section id="who" className="who-section">
      <div className="who-inner">

        <div className="who-header">
          <span className="text-accent-label">Who it&apos;s for</span>
          <span className="accent-line-left" />
          <h2 className="text-section-headline" style={{ maxWidth: 560 }}>
            Two reasons experts build an AI
          </h2>
          <p className="who-header-sub">
            Every creator using AIChassisLab is doing one of two things — or both.
          </p>
        </div>

        <div className="who-paths">
          {PATHS.map(path => (
            <div
              key={path.tag}
              className="who-path reveal"
              style={{ animationDelay: `${path.delay}ms` } as React.CSSProperties}
            >
              <div className="who-path-tag">{path.tag}</div>
              <h3 className="who-path-headline">
                {path.headline.split('\n').map((line, i) => (
                  <span key={i} style={{ display: 'block' }}>{line}</span>
                ))}
              </h3>
              {path.stat}
              <p className="who-path-body">{path.body}</p>
              <p className="who-path-proof">{path.proof}</p>
              <div className="who-path-works-label">Works for</div>
              <ul className="who-path-works" role="list">
                {path.works.map(w => (
                  <li key={w} className="who-path-works-item">{w}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
