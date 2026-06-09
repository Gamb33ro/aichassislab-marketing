const footerLinks = [
  { text: 'How it works',    href: '#how-it-works' },
  { text: 'Who we work with', href: '#who-we-work-with' },
  { text: 'Features',        href: '#features' },
  { text: 'Pricing',         href: '#pricing' },
  { text: 'Contact',         href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <a href="/" className="footer-brand-name">AIChassisLab</a>
            <p className="footer-brand-sub">Built by Marcio Gambero</p>
          </div>

          <nav className="footer-links-col" aria-label="Footer navigation">
            {footerLinks.map(link => (
              <a key={link.text} href={link.href} className="footer-link">
                {link.text}
              </a>
            ))}
          </nav>
        </div>

        <div className="footer-bottom">
          <span>© 2026 AIChassisLab</span>
          <span>Powered by Anthropic Claude</span>
        </div>
      </div>
    </footer>
  )
}
