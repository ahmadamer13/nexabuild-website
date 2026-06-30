'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

const WA_LINK = 'https://wa.me/962797479825?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20NexaBuild'

export default function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0F172A]">
      {/* Geometric background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-32 -start-32 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #1B3F8B 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-32 -end-32 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #F97316 0%, transparent 70%)' }}
        />
        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-32 pt-40 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse flex-shrink-0" />
            <span className="text-white/80 text-sm font-medium">{t('eyebrow')}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white mb-6">
            {t('headline')}{' '}
            <span className="text-[#F97316]">{t('headline_accent')}</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 max-w-xl mb-10 leading-relaxed">
            {t('subheadline')}
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-7 py-4 rounded-xl font-bold text-base transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <WhatsAppIcon />
              {t('cta_whatsapp')}
            </a>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-7 py-4 rounded-xl font-bold text-base transition-all duration-200 hover:scale-105 backdrop-blur-sm"
            >
              {t('cta_quote')}
              <ArrowIcon locale={locale} />
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-4 h-4 text-[#F97316]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white/60 text-sm">5.0 / 5</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <span className="text-white/60 text-sm">
              {locale === 'ar' ? '7 أيام تسليم مضمون' : '7-day guaranteed delivery'}
            </span>
            <div className="w-px h-4 bg-white/20" />
            <span className="text-white/60 text-sm">
              {locale === 'ar' ? 'استضافة مجانية سنة' : 'Free hosting included'}
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L.057 23.81a.5.5 0 00.632.633l6.094-1.47A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.076-1.392l-.364-.217-3.768.908.924-3.678-.236-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  )
}

function ArrowIcon({ locale }: { locale: string }) {
  return (
    <svg
      className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-1 ${locale === 'ar' ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  )
}
