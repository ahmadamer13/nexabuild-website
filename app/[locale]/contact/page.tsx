'use client'

import { useTranslations, useLocale } from 'next-intl'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'

const WA_LINK = 'https://wa.me/962797479825?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20NexaBuild'
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID

export default function ContactPage() {
  const t = useTranslations('contact')
  const locale = useLocale()
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!FORMSPREE_ID) return

    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F8FAFC] text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#1B3F8B]/30 focus:border-[#1B3F8B] transition-all duration-200 text-sm'

  const labelClass = 'block text-sm font-semibold text-[#0F172A] mb-2'

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-10">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 text-[#64748B] hover:text-[#1B3F8B] text-sm mb-6 transition-colors"
            >
              <svg className={`w-4 h-4 ${locale === 'ar' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              {locale === 'ar' ? 'الرجوع للرئيسية' : 'Back to Home'}
            </Link>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">{t('title')}</h1>
            <p className="mt-3 text-[#64748B]">{t('subtitle')}</p>
          </div>

          {status === 'success' ? (
            <div className="bg-white rounded-2xl p-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)] text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-[#0F172A] mb-2">{t('success_title')}</h2>
              <p className="text-[#64748B] mb-6">{t('success_text')}</p>
              <Link
                href={`/${locale}`}
                className="inline-block bg-[#1B3F8B] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#153272] transition-colors"
              >
                {locale === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className={labelClass}>{t('name_label')}</label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder={t('name_placeholder')}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>{t('phone_label')}</label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder={t('phone_placeholder')}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>{t('service_label')}</label>
                  <select name="service" required className={inputClass}>
                    <option value="">{t('service_placeholder')}</option>
                    <option value="website">{t('service_website')}</option>
                    <option value="store">{t('service_store')}</option>
                    <option value="care">{t('service_care')}</option>
                    <option value="other">{t('service_other')}</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>{t('message_label')}</label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder={t('message_placeholder')}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm">
                    {locale === 'ar'
                      ? 'حدث خطأ. الرجاء المحاولة مرة أخرى أو تواصل معنا عبر واتساب.'
                      : 'Something went wrong. Please try again or contact us via WhatsApp.'}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-[#1B3F8B] hover:bg-[#153272] disabled:opacity-60 text-white py-4 rounded-xl font-bold text-base transition-all duration-200 hover:scale-[1.02]"
                >
                  {status === 'sending' ? t('sending') : t('submit')}
                </button>
              </form>

              {/* WhatsApp alternative */}
              <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <p className="text-[#64748B] text-sm mb-3">{t('whatsapp_alt_label')}</p>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L.057 23.81a.5.5 0 00.632.633l6.094-1.47A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.076-1.392l-.364-.217-3.768.908.924-3.678-.236-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  {t('whatsapp_cta')}
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
