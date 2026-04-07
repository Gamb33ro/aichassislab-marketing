const PATHS = [
  {
    tag: 'Cost Reduction Play',
    headline: 'Stop paying\nfor repetitive questions.',
    body: "Give every student AI access as part of the course experience. No new revenue line — but you stop paying a VA, stop spending hours on support, and stop being the bottleneck. An AI trained on your content answers exactly as you would, at 2am on a Sunday, without touching your calendar.",
    proof: "The math is operational: one VA costs $2,500–4,000 a month. The platform fee is a fraction of that — and the AI never calls in sick.",
    works: ['Online courses', 'Cohort programs', 'Membership communities', 'Training programs'],
    delay: 0,
  },
  {
    tag: 'Revenue Generation Play',
    headline: 'Add a revenue line\nwithout adding headcount.',
    body: "Gate your AI behind a premium tier, sell access as a paid add-on, or bundle it into a higher-priced membership. Your expertise becomes a profit center. Students in a one-time course can subscribe for continued access after it ends. Cohort buyers can upgrade to the AI tier. Community members can unlock it at the next level.",
    proof: "The math: 200 users at $25/month is $5,000 in gross revenue. Subtract the $1,520 platform fee and you net ~$3,480 every month — from content you already created.",
    works: ['Premium tier upgrades', 'Paid add-ons to existing courses', 'Post-course subscriptions', 'Membership tier expansions'],
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
