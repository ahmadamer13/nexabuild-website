import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Portfolio from '@/components/sections/Portfolio'
import Pricing from '@/components/sections/Pricing'
import WhyUs from '@/components/sections/WhyUs'
import Testimonials from '@/components/sections/Testimonials'

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'NexaBuild',
  url: 'https://nexabuild.cloud',
  logo: 'https://nexabuild.cloud/brand/logo.svg',
  image: 'https://nexabuild.cloud/brand/og.png',
  description: 'Web design and e-commerce development agency in Amman, Jordan. Professional websites from $199.',
  telephone: '+962797479825',
  email: 'info@nexabuild.cloud',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Amman',
    addressCountry: 'JO',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 31.9539,
    longitude: 35.9106,
  },
  areaServed: { '@type': 'Country', name: 'Jordan' },
  priceRange: '$199 - $399',
  sameAs: ['https://wa.me/962797479825'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Website Design', description: 'Professional 5-page website with hosting and domain' },
        price: '199',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Online Store', description: 'Full e-commerce store with payment gateway' },
        price: '399',
        priceCurrency: 'USD',
      },
    ],
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'NexaBuild',
  url: 'https://nexabuild.cloud',
  inLanguage: ['ar', 'en'],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
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
