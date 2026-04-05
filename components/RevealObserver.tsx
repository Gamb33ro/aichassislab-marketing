'use client'

import { useEffect } from 'react'

// Fallback IntersectionObserver for browsers without CSS animation-timeline support.
// Only runs when @supports (animation-timeline: view()) is false.
export default function RevealObserver() {
  useEffect(() => {
    // Check if CSS scroll-driven animations are supported
    const supported = CSS.supports('animation-timeline', 'view()')
    if (supported) return

    const els = document.querySelectorAll<HTMLElement>('.reveal, .reveal-fade')
    if (!els.length) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )

    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
