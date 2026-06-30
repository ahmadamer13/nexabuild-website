'use client'

import { useTranslations } from 'next-intl'
import { useInView } from '@/hooks/useInView'

const reviews = [
  { key: 'review1' },
  { key: 'review2' },
  { key: 'review3' },
]

export default function Testimonials() {
  const t = useTranslations('testimonials')
  const { ref, inView } = useInView()

  return (
    <section className="py-20 sm:py-28 bg-[#F8FAFC]">
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
          {reviews.map(({ key }) => (
            <div
              key={key}
              className="bg-white rounded-2xl p-7 shadow-[0_4px_24px_rgba(0,0,0,0.06)] flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-4 h-4 text-[#F97316]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#0F172A] leading-relaxed flex-1">
                &ldquo;{t(`${key}_text` as 'review1_text' | 'review2_text' | 'review3_text')}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#1B3F8B]/10 flex items-center justify-center text-[#1B3F8B] font-bold text-sm flex-shrink-0">
                  {t(`${key}_name` as 'review1_name' | 'review2_name' | 'review3_name').charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-[#0F172A] text-sm">
                    {t(`${key}_name` as 'review1_name' | 'review2_name' | 'review3_name')}
                  </div>
                  <div className="text-[#64748B] text-xs">
                    {t(`${key}_role` as 'review1_role' | 'review2_role' | 'review3_role')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
