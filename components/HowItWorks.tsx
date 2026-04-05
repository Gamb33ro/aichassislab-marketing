const steps = [
  {
    number: '01',
    title: 'Upload your content',
    description:
      'Courses, books, PDFs, video transcripts, research papers. If it\'s text, we can train on it. Your AI learns from your content specifically — not the internet.',
    delay: 0,
  },
  {
    number: '02',
    title: 'We build your AI',
    description:
      'We configure the voice, personality, and depth of your AI. Brand colors, custom domain, credit system for your users. One revision round included.',
    delay: 150,
  },
  {
    number: '03',
    title: 'Launch to your audience',
    description:
      'Your students and clients access your AI on a branded website. Your users access it however you choose to offer it — included in your course, as an add-on, or standalone. Your expertise, running 24/7.',
    delay: 300,
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="how-section">
      <div className="how-inner">

        <div className="how-header">
          <span className="text-accent-label">How it works</span>
          <span className="accent-line" />
          <h2 className="text-section-headline" style={{ maxWidth: 600, margin: '0 auto' }}>
            Three steps to your AI
          </h2>
        </div>

        <div className="how-steps">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="how-step reveal"
              style={{ animationDelay: `${step.delay}ms` } as React.CSSProperties}
            >
              {i < steps.length - 1 && (
                <div className="how-step-connector" aria-hidden="true" />
              )}

              <div className="how-step-number">{step.number}</div>
              <span className="accent-line-left" />
              <h3 className="how-step-title">{step.title}</h3>
              <p className="how-step-text">{step.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
