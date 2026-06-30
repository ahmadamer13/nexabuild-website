'use client'

import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function switchLocale() {
    const next = locale === 'ar' ? 'en' : 'ar'
    const withoutLocale = pathname.replace(`/${locale}`, '') || '/'
    router.push(`/${next}${withoutLocale}`)
  }

  const links = [
    { href: '#services', label: t('services') },
    { href: '#portfolio', label: t('portfolio') },
    { href: '#pricing', label: t('pricing') },
    { href: `/${locale}/blog`, label: t('blog'), isPage: true },
    { href: '#contact-section', label: t('contact') },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex-shrink-0">
          <Image
            src="/brand/logo.svg"
            alt="NexaBuild"
            width={140}
            height={32}
            priority
            style={{ height: 'auto' }}
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) =>
            link.isPage ? (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-[#F97316] ${
                  scrolled ? 'text-[#0F172A]' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-[#F97316] ${
                  scrolled ? 'text-[#0F172A]' : 'text-white'
                }`}
              >
                {link.label}
              </a>
            )
          )}
          <button
            onClick={switchLocale}
            className="text-sm font-medium px-4 py-1.5 rounded-full border transition-all duration-200 hover:scale-105 cursor-pointer"
            style={{
              borderColor: scrolled ? '#1B3F8B' : 'rgba(255,255,255,0.6)',
              color: scrolled ? '#1B3F8B' : 'white',
            }}
          >
            {t('lang_switch')}
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className={`md:hidden p-2 transition-colors ${scrolled ? 'text-[#0F172A]' : 'text-white'}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-100 px-4 py-4">
          {links.map((link) =>
            link.isPage ? (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-[#0F172A] font-medium border-b border-gray-100 last:border-0 hover:text-[#F97316] transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-[#0F172A] font-medium border-b border-gray-100 last:border-0 hover:text-[#F97316] transition-colors"
              >
                {link.label}
              </a>
            )
          )}
          <button
            onClick={switchLocale}
            className="mt-3 w-full text-center py-2 rounded-lg border border-[#1B3F8B] text-[#1B3F8B] font-medium hover:bg-[#1B3F8B] hover:text-white transition-colors"
          >
            {t('lang_switch')}
          </button>
        </div>
      )}
    </nav>
  )
}
