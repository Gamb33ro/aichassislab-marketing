import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import HowItWorks from '@/components/HowItWorks'
import Pricing from '@/components/Pricing'
import WhoItsFor from '@/components/WhoItsFor'
import CTABand from '@/components/CTABand'
import Footer from '@/components/Footer'
import RevealObserver from '@/components/RevealObserver'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Pricing />
        <WhoItsFor />
        <CTABand />
      </main>
      <Footer />
      <RevealObserver />
    </>
  )
}
