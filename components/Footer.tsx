const footerCols = [
  {
    label: 'Product',
    links: [
      { text: 'How it works', href: '#how-it-works' },
      { text: 'Pricing', href: '#pricing' },
      { text: 'Who it\'s for', href: '#who' },
    ],
  },
  {
    label: 'Company',
    links: [
      { text: 'About', href: '#contact' },
      { text: 'Get in touch', href: '#contact' },
      { text: 'Built by Rafael Gambero', href: '#contact' },
    ],
  },
  {
    label: 'Legal',
    links: [
      { text: 'Privacy Policy', href: '#contact' },
      { text: 'Terms of Service', href: '#contact' },
      { text: 'Acceptable Use', href: '#contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <a href="/" className="footer-brand-name">AIChassisLab</a>
            <p className="footer-brand-sub">Built by Rafael Gambero</p>
          </div>

          <nav className="footer-links-grid" aria-label="Footer navigation">
            {footerCols.map(col => (
              <div key={col.label} className="footer-links-col">
                <span className="footer-link-label">{col.label}</span>
                {col.links.map(link => (
                  <a key={link.text} href={link.href} className="footer-link">
                    {link.text}
                  </a>
                ))}
              </div>
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
