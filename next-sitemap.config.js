/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://nexabuild.cloud',
  generateRobotsTxt: false,
  changefreq: 'monthly',
  priority: 0.8,
  exclude: ['/_not-found'],
  alternateRefs: [
    {
      href: 'https://nexabuild.cloud/ar',
      hreflang: 'ar',
    },
    {
      href: 'https://nexabuild.cloud/en',
      hreflang: 'en',
    },
  ],
}
