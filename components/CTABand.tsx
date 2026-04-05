import ContactForm from './ContactForm'

export default function CTABand() {
  return (
    <section id="contact" className="cta-section">
      <div className="reveal">
        <h2 className="cta-headline">
          Your expertise is already worth more than it&apos;s earning.
        </h2>
        <p className="cta-sub">
          An AI trained on your content runs while you sleep.
        </p>
        <div className="cta-buttons">
          <a
            href="mailto:hello@aichassislab.com"
            className="btn-primary"
          >
            Get in touch
          </a>
          <a href="#pricing" className="btn-ghost">See pricing</a>
        </div>
      </div>
      <ContactForm />
    </section>
  )
}
