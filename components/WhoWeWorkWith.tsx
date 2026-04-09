const MARKETS = [
  {
    number: '01',
    title: 'Online course creators',
    description:
      'Turn student support into a profit center. Your AI answers questions, reinforces lessons, and keeps learners engaged — without you spending another hour in the inbox.',
  },
  {
    number: '02',
    title: 'Franchise systems',
    description:
      'Give every franchisee instant access to your operations knowledge. Consistent answers on policy, process, and brand standards — across every location, at any hour.',
  },
  {
    number: '03',
    title: 'Compliance and safety training',
    description:
      'Extend your curriculum into a 24/7 AI. Employees get immediate, accurate answers on procedures, regulations, and safety protocols — grounded entirely in your certified content.',
  },
  {
    number: '04',
    title: 'Consultants with proprietary frameworks',
    description:
      'Productize your methodology for recurring revenue. Your frameworks, decision trees, and hard-won expertise become a scalable product that works without you in the room.',
  },
]

export default function WhoWeWorkWith() {
  return (
    <section id="who-we-work-with" className="markets-section">
      <div className="markets-inner">

        <div className="markets-header">
          <span className="text-accent-label">Who we work with</span>
          <span className="accent-line" />
          <h2 className="text-section-headline" style={{ maxWidth: 640, margin: '0 auto' }}>
            Any expert. Any vertical.
          </h2>
          <p className="markets-header-sub">
            AIChassisLab is a platform, not a product category. If you have knowledge worth deploying, we build the AI that carries it.
          </p>
        </div>

        <div className="markets-grid">
          {MARKETS.map(m => (
            <div key={m.number} className="market-card reveal">
              <div className="market-card-number">{m.number}</div>
              <h3 className="market-card-title">{m.title}</h3>
              <p className="market-card-desc">{m.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
