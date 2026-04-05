const entries = [
  {
    type: 'Course Creators',
    description:
      "You've built a curriculum your students need to apply in real time. Stop answering the same questions in DMs at midnight.",
    delay: 0,
  },
  {
    type: 'Coaches and Consultants',
    description:
      "Your framework is proprietary. Your AI should know it. Give clients access to your thinking between sessions.",
    delay: 80,
  },
  {
    type: 'Educators and Professors',
    description:
      "Your expertise belongs to you, not a generic chatbot. An AI trained on your research and teaching materials is a different product entirely.",
    delay: 160,
  },
  {
    type: 'Businesses with Training Programs',
    description:
      "Internal knowledge transfer is broken. An AI trained on your documentation, SOPs, and institutional knowledge is always available to your team.",
    delay: 240,
  },
]

export default function WhoItsFor() {
  return (
    <section id="who" className="who-section">
      <div className="who-inner">

        <div className="who-header">
          <span className="text-accent-label">Who it&apos;s for</span>
          <span className="accent-line-left" />
          <h2 className="text-section-headline" style={{ maxWidth: 520 }}>
            Built for experts with depth to teach
          </h2>
        </div>

        <div className="who-entries">
          {entries.map(entry => (
            <div
              key={entry.type}
              className="who-entry reveal"
              style={{ animationDelay: `${entry.delay}ms` } as React.CSSProperties}
            >
              <div className="who-accent-bar" aria-hidden="true" />
              <div>
                <div className="who-type">{entry.type}</div>
                <p className="who-desc">{entry.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
