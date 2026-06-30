import type { Metadata } from 'next'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import { Inter, Tajawal } from 'next/font/google'
import '../globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-tajawal',
  display: 'swap',
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  const baseUrl = 'https://nexabuild.cloud'
  const altLocale = locale === 'ar' ? 'en' : 'ar'

  return {
    metadataBase: new URL(baseUrl),
    title: t('home_title'),
    description: t('home_description'),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        ar: `${baseUrl}/ar`,
        en: `${baseUrl}/en`,
        'x-default': `${baseUrl}/ar`,
      },
    },
    openGraph: {
      title: t('home_title'),
      description: t('home_description'),
      images: [{ url: '/brand/og.png', width: 1200, height: 630 }],
      locale: locale === 'ar' ? 'ar_JO' : 'en_US',
      alternateLocale: locale === 'ar' ? 'en_US' : 'ar_JO',
      type: 'website',
      siteName: 'NexaBuild',
      url: `${baseUrl}/${locale}`,
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  const messages = (await import(`@/messages/${locale}.json`)).default

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`${inter.variable} ${tajawal.variable}`}
    >
      <head>
        <link rel="icon" href="/brand/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={locale === 'ar' ? 'font-[family-name:var(--font-tajawal)]' : 'font-[family-name:var(--font-inter)]'}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
