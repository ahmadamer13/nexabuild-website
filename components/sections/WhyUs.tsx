'use client'

import { useTranslations } from 'next-intl'
import { useInView } from '@/hooks/useInView'

const reasons = [
  { key: 'fast', icon: <FastIcon /> },
  { key: 'hosting', icon: <HostingIcon /> },
  { key: 'arabic', icon: <ArabicIcon /> },
  { key: 'affordable', icon: <AffordableIcon /> },
]

export default function WhyUs() {
  const t = useTranslations('whyus')
  const { ref, inView } = useInView()

  return (
    <section className="py-20 sm:py-28 bg-[#0F172A]">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-700 ease-out ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center mb-14">
          <span className="text-[#F97316] text-sm font-bold uppercase tracking-widest">{t('section_label')}</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">{t('title')}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map(({ key, icon }) => (
            <div
              key={key}
              className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#F97316]/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-[#F97316]/10 group-hover:bg-[#F97316] rounded-xl flex items-center justify-center mb-5 text-[#F97316] group-hover:text-white transition-all duration-300">
                {icon}
              </div>
              <h3 className="text-white font-bold mb-2">
                {t(`${key}_title` as 'fast_title' | 'hosting_title' | 'arabic_title' | 'affordable_title')}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {t(`${key}_desc` as 'fast_desc' | 'hosting_desc' | 'arabic_desc' | 'affordable_desc')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FastIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  )
}

function HostingIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
    </svg>
  )
}

function ArabicIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  )
}

function AffordableIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}
