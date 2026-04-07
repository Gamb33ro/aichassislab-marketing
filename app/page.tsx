import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import HowItWorks from '@/components/HowItWorks'
import PricingRecommendation from '@/components/PricingRecommendation'
import Pricing from '@/components/Pricing'
import FeaturesTable from '@/components/FeaturesTable'
import DepthSuite from '@/components/DepthSuite'
import ShowcaseSection from '@/components/ShowcaseSection'
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
        <PricingRecommendation />
        <Pricing />
        <FeaturesTable />
        <DepthSuite />
        <ShowcaseSection />
        <WhoItsFor />
        <CTABand />
      </main>
      <Footer />
      <RevealObserver />
    </>
  )
}
