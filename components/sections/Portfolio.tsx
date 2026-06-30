'use client'

import { useTranslations } from 'next-intl'
import { useInView } from '@/hooks/useInView'

const projects = [
  {
    key: 'jordan3d',
    url: 'https://jordan3dprint.com',
    gradient: 'linear-gradient(135deg, #1B3F8B 0%, #2d5fc8 100%)',
    emoji: '🖨️',
  },
  {
    key: 'automation',
    url: 'https://app.jordan-automation.com',
    gradient: 'linear-gradient(135deg, #0F172A 0%, #1e3a5f 100%)',
    emoji: '⚙️',
  },
]

export default function Portfolio() {
  const t = useTranslations('portfolio')
  const { ref, inView } = useInView()

  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-[#F8FAFC]">
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
          {projects.map(({ key, url, gradient, emoji }) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-2"
            >
              <div
                className="relative h-48 overflow-hidden flex items-center justify-center"
                style={{ background: gradient }}
              >
                <span className="text-6xl opacity-40 group-hover:opacity-60 transition-opacity duration-300">{emoji}</span>
                <div className="absolute top-3 end-3 bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1">
                  <span className="text-white text-xs font-medium">{url.replace('https://', '')}</span>
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-[#0F172A]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold flex items-center gap-2">
                    {t('view_project')}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-[#0F172A] mb-1">
                  {t(`${key}_title` as 'jordan3d_title' | 'automation_title')}
                </h3>
                <p className="text-[#64748B] text-sm">
                  {t(`${key}_desc` as 'jordan3d_desc' | 'automation_desc')}
                </p>
              </div>
            </a>
          ))}

          {/* Placeholder card */}
          <div className="group relative bg-gradient-to-br from-[#1B3F8B] to-[#0F172A] rounded-2xl overflow-hidden p-6 flex flex-col justify-between min-h-64">
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }} />
            <div className="relative">
              <span className="inline-block bg-[#F97316] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                {t('your_turn')}
              </span>
              <h3 className="text-white font-bold text-lg mb-2">{t('placeholder_title')}</h3>
              <p className="text-white/60 text-sm">{t('placeholder_desc')}</p>
            </div>
            <div className="relative mt-6">
              <div className="inline-flex items-center gap-2 text-[#F97316] font-semibold text-sm">
                <span className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse" />
                {t('view_project')} →
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
