'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { useInView } from '@/hooks/useInView'

const WA_LINK = 'https://wa.me/962797479825?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20NexaBuild'

export default function Pricing() {
  const t = useTranslations('pricing')
  const locale = useLocale()
  const { ref, inView } = useInView()

  const websiteFeatures = t.raw('website_features') as string[]
  const storeFeatures = t.raw('store_features') as string[]
  const careFeatures = t.raw('care_features') as string[]

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-white">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-700 ease-out ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center mb-14">
          <span className="text-[#F97316] text-sm font-bold uppercase tracking-widest">{t('section_label')}</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#0F172A]">{t('title')}</h2>
          <p className="mt-3 text-[#64748B] max-w-xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Website */}
          <PricingCard
            label={t('website_title')}
            price={t('website_price')}
            period={t('website_period')}
            features={websiteFeatures}
            cta={t('cta')}
            href={`/${locale}/contact`}
            featured={false}
          />

          {/* Online Store — featured */}
          <PricingCard
            label={t('store_title')}
            price={t('store_price')}
            period={t('store_period')}
            features={storeFeatures}
            cta={t('cta')}
            href={`/${locale}/contact`}
            featured
            badge={t('popular')}
          />

          {/* Monthly Care */}
          <PricingCard
            label={t('care_title')}
            price={t('care_price')}
            period={t('care_period')}
            features={careFeatures}
            cta={t('cta_contact')}
            href={WA_LINK}
            external
            featured={false}
          />
        </div>
      </div>
    </section>
  )
}

function PricingCard({
  label,
  price,
  period,
  features,
  cta,
  href,
  external = false,
  featured = false,
  badge,
}: {
  label: string
  price: string
  period: string
  features: string[]
  cta: string
  href: string
  external?: boolean
  featured?: boolean
  badge?: string
}) {
  const cardClass = featured
    ? 'bg-[#1B3F8B] text-white relative'
    : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-white'

  const featureColor = featured ? 'text-white/80' : 'text-[#64748B]'
  const priceColor = featured ? 'text-white' : 'text-[#1B3F8B]'
  const periodColor = featured ? 'text-white/60' : 'text-[#64748B]'
  const labelColor = featured ? 'text-white/80' : 'text-[#64748B]'
  const checkColor = featured ? 'text-[#F97316]' : 'text-[#1B3F8B]'

  const btnClass = featured
    ? 'bg-[#F97316] hover:bg-[#ea6a0a] text-white'
    : 'bg-[#1B3F8B] hover:bg-[#153272] text-white'

  const linkProps = external
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { href }

  const Wrapper = external ? 'a' : Link

  return (
    <div
      className={`rounded-2xl p-8 flex flex-col transition-all duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1 ${cardClass}`}
    >
      {badge && (
        <span className="absolute -top-3 start-1/2 -translate-x-1/2 bg-[#F97316] text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
          {badge}
        </span>
      )}

      <div className={`text-sm font-semibold uppercase tracking-wider mb-4 ${labelColor}`}>{label}</div>

      <div className="mb-6">
        <span className={`text-4xl font-extrabold ${priceColor}`}>{price}</span>
        <span className={`text-sm ms-2 ${periodColor}`}>{period}</span>
      </div>

      <ul className="space-y-3 flex-1 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${checkColor}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span className={`text-sm ${featureColor}`}>{feature}</span>
          </li>
        ))}
      </ul>

      <Wrapper
        {...linkProps}
        className={`block w-full text-center py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105 ${btnClass}`}
      >
        {cta}
      </Wrapper>
    </div>
  )
}
