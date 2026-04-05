'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="nav-root">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">AIChassisLab</Link>

          <div className="nav-links">
            <a href="#how-it-works" className="nav-link">How it works</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#who" className="nav-link">Who it&apos;s for</a>
          </div>

          <a href="#contact" className="btn-ghost-sm nav-cta">Get in touch</a>

          <button
            className="nav-hamburger"
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </nav>

      <div className={`nav-mobile-menu ${open ? 'open' : 'closed'}`} aria-hidden={!open}>
        <a href="#how-it-works" className="nav-mobile-link" onClick={() => setOpen(false)}>How it works</a>
        <a href="#pricing" className="nav-mobile-link" onClick={() => setOpen(false)}>Pricing</a>
        <a href="#who" className="nav-mobile-link" onClick={() => setOpen(false)}>Who it&apos;s for</a>
        <a href="#contact" className="btn-ghost nav-mobile-cta" onClick={() => setOpen(false)}>Get in touch</a>
      </div>
    </>
  )
}
