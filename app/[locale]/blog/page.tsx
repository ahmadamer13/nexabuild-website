import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import { getArticles } from '@/content/blog'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const baseUrl = 'https://nexabuild.cloud'
  const isAr = locale === 'ar'
  return {
    title: isAr ? 'المدونة — NexaBuild | مقالات تصميم المواقع في الأردن' : 'Blog — NexaBuild | Web Design Articles for Jordan',
    description: isAr
      ? 'مقالات ونصائح عملية حول تصميم المواقع، إنشاء المتاجر الإلكترونية، وتحسين محركات البحث في الأردن.'
      : 'Practical articles and tips on website design, e-commerce, and SEO for Jordanian businesses.',
    alternates: {
      canonical: `${baseUrl}/${locale}/blog`,
      languages: { ar: `${baseUrl}/ar/blog`, en: `${baseUrl}/en/blog` },
    },
  }
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params
  const articles = getArticles(locale)
  const isAr = locale === 'ar'

  return (
    <>
      <Navbar />
      <main className="bg-[#F8FAFC] min-h-screen">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="text-4xl font-bold text-[#0F172A] mb-4">
            {isAr ? 'المدونة' : 'Blog'}
          </h1>
          <p className="text-[#64748B] text-lg mb-12">
            {isAr
              ? 'مقالات ونصائح عملية لأصحاب الأعمال في الأردن'
              : 'Practical tips and guides for Jordanian business owners'}
          </p>

          <div className="grid gap-6">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#1B3F8B]/20 hover:shadow-md transition-all duration-200"
              >
                <Link href={`/blog/${article.slug}`} locale={locale}>
                  <h2 className="text-xl font-bold text-[#0F172A] hover:text-[#1B3F8B] transition-colors mb-2 leading-snug">
                    {article.title}
                  </h2>
                </Link>
                <p className="text-[#64748B] text-sm mb-4">{article.description}</p>
                <div className="flex items-center gap-4 text-xs text-[#64748B]">
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
                  <Link
                    href={`/blog/${article.slug}`}
                    locale={locale}
                    className="ms-auto text-[#1B3F8B] font-semibold hover:text-[#F97316] transition-colors"
                  >
                    {isAr ? 'اقرأ المقال ←' : 'Read article →'}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
