import { arArticles } from './ar'
import { enArticles } from './en'
import type { Article } from './types'

export type { Article }
export { arArticles, enArticles }

export function getArticles(locale: string): Article[] {
  return locale === 'ar' ? arArticles : enArticles
}

export function getArticle(locale: string, slug: string): Article | undefined {
  return getArticles(locale).find((a) => a.slug === slug)
}
