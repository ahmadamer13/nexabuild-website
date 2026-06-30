'use client'

import { useTranslations } from 'next-intl'
import { useInView } from '@/hooks/useInView'

const serviceKeys = [
  { key: 'website', price: '$199' },
  { key: 'store', price: '$399' },
  { key: 'seo', price: null },
]

const icons: Record<string, React.ReactNode> = {
  website: <WebsiteIcon />,
  store: <StoreIcon />,
  seo: <SEOIcon />,
}

export default function Services() {
  const t = useTranslations('services')
  const { ref, inView } = useInView()

  return (
    <section id="services" className="py-20 sm:py-28 bg-white">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-700 ease-out ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center mb-14">
          <span className="text-[#F97316] text-sm font-bold uppercase tracking-widest">{t('section_label')}</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#0F172A]">{t('title')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceKeys.map(({ key, price }) => (
            <div
              key={key}
              className="group relative bg-[#F8FAFC] hover:bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 border border-transparent hover:border-[#1B3F8B]/10"
            >
              <div className="w-14 h-14 bg-[#1B3F8B]/10 group-hover:bg-[#1B3F8B] rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 text-[#1B3F8B] group-hover:text-white">
                {icons[key]}
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-3">
                {t(`${key}_title` as 'website_title' | 'store_title' | 'seo_title')}
              </h3>
              <p className="text-[#64748B] leading-relaxed">
                {t(`${key}_desc` as 'website_desc' | 'store_desc' | 'seo_desc')}
              </p>
              {price && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <span className="text-2xl font-extrabold text-[#F97316]">{price}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WebsiteIcon() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
    </svg>
  )
}

function StoreIcon() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
    </svg>
  )
}

function SEOIcon() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
  )
}
