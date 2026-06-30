import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Portfolio from '@/components/sections/Portfolio'
import Pricing from '@/components/sections/Pricing'
import WhyUs from '@/components/sections/WhyUs'
import Testimonials from '@/components/sections/Testimonials'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Pricing />
        <WhyUs />
        <Testimonials />
        <div id="contact-section" />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
