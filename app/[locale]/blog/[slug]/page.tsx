import { notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import { getArticle, getArticles } from '@/content/blog'
import type { Block } from '@/content/blog/types'

const WA_LINK = 'https://wa.me/962797479825?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20NexaBuild'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const arSlugs = getArticles('ar').map((a) => ({ locale: 'ar', slug: a.slug }))
  const enSlugs = getArticles('en').map((a) => ({ locale: 'en', slug: a.slug }))
  return [...arSlugs, ...enSlugs]
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  const article = getArticle(locale, slug)
  if (!article) return {}
  const baseUrl = 'https://nexabuild.cloud'
  const url = `${baseUrl}/${locale}/blog/${slug}`

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    author: { '@type': 'Organization', name: 'NexaBuild', url: baseUrl },
    publisher: {
      '@type': 'Organization',
      name: 'NexaBuild',
      logo: { '@type': 'ImageObject', url: `${baseUrl}/brand/logo.svg` },
    },
    inLanguage: locale,
    url,
  }

  return {
    title: `${article.title} — NexaBuild`,
    description: article.description,
    alternates: { canonical: url },
    other: { 'application/ld+json': JSON.stringify(articleSchema) },
  }
}

function renderBlock(block: Block, locale: string, index: number) {
  const isAr = locale === 'ar'
  switch (block.type) {
    case 'h2':
      return (
        <h2 key={index} className="text-2xl font-bold text-[#0F172A] mt-10 mb-4">
          {block.text}
        </h2>
      )
    case 'h3':
      return (
        <h3 key={index} className="text-xl font-semibold text-[#0F172A] mt-6 mb-3">
          {block.text}
        </h3>
      )
    case 'p':
      return (
        <p key={index} className="text-[#374151] leading-relaxed mb-4">
          {block.text}
        </p>
      )
    case 'ul':
      return (
        <ul key={index} className="list-disc list-inside space-y-2 mb-4 text-[#374151]">
          {block.items.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol key={index} className="list-decimal list-inside space-y-2 mb-4 text-[#374151]">
          {block.items.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ol>
      )
    case 'highlight':
      return (
        <div
          key={index}
          className="bg-[#1B3F8B]/5 border-s-4 border-[#1B3F8B] rounded-lg px-5 py-4 my-6 text-[#1B3F8B] font-semibold"
        >
          {block.text}
        </div>
      )
    case 'cta':
      return (
        <div key={index} className="bg-[#0F172A] rounded-2xl p-8 my-10 text-center">
          <h3 className="text-white text-xl font-bold mb-2">
            {isAr ? 'هل أنت مستعد لبناء موقعك؟' : 'Ready to build your website?'}
          </h3>
          <p className="text-[#94A3B8] mb-6 text-sm">
            {isAr
              ? 'تواصل معنا الآن عبر WhatsApp واحصل على استشارة مجانية'
              : 'Contact us now on WhatsApp for a free consultation'}
          </p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-3 rounded-xl font-bold transition-all hover:scale-105"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L.057 23.81a.5.5 0 00.632.633l6.094-1.47A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.076-1.392l-.364-.217-3.768.908.924-3.678-.236-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            {isAr ? 'تواصل عبر WhatsApp' : 'Chat on WhatsApp'}
          </a>
        </div>
      )
    default:
      return null
  }
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params
  const article = getArticle(locale, slug)
  if (!article) notFound()

  const isAr = locale === 'ar'
  const allArticles = getArticles(locale)
  const related = allArticles.filter((a) => a.slug !== slug).slice(0, 3)

  return (
    <>
      <Navbar />
      <main className="bg-[#F8FAFC] min-h-screen">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm text-[#64748B] mb-8 flex items-center gap-2">
            <Link href="/" locale={locale} className="hover:text-[#1B3F8B]">
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <span>/</span>
            <Link href="/blog" locale={locale} className="hover:text-[#1B3F8B]">
              {isAr ? 'المدونة' : 'Blog'}
            </Link>
            <span>/</span>
            <span className="text-[#0F172A] truncate max-w-[200px]">{article.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-[#64748B] text-lg mb-4">{article.description}</p>
            <div className="flex items-center gap-3 text-sm text-[#64748B]">
              <span>
                {new Date(article.publishedAt).toLocaleDateString(
                  locale === 'ar' ? 'ar-JO' : 'en-JO',
                  { year: 'numeric', month: 'long', day: 'numeric' }
                )}
              </span>
              <span>·</span>
              <span>
                {isAr ? `${article.readTime} دقائق قراءة` : `${article.readTime} min read`}
              </span>
              <span>·</span>
              <span className="text-[#1B3F8B] font-medium">NexaBuild</span>
            </div>
          </header>

          {/* Content */}
          <div className="prose-custom">
            {article.blocks.map((block, i) => renderBlock(block, locale, i))}
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <section className="mt-16 pt-10 border-t border-gray-200">
              <h2 className="text-xl font-bold text-[#0F172A] mb-6">
                {isAr ? 'مقالات ذات صلة' : 'Related Articles'}
              </h2>
              <div className="grid gap-4">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    locale={locale}
                    className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-[#1B3F8B]/20 hover:shadow-sm transition-all"
                  >
                    <span className="text-[#F97316] font-bold text-lg mt-0.5">→</span>
                    <div>
                      <p className="font-semibold text-[#0F172A] text-sm leading-snug">
                        {rel.title}
                      </p>
                      <p className="text-[#64748B] text-xs mt-1">
                        {isAr ? `${rel.readTime} دقائق قراءة` : `${rel.readTime} min read`}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
