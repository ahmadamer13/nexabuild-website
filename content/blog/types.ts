export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'highlight'; text: string }
  | { type: 'cta' }

export interface Article {
  slug: string
  title: string
  description: string
  publishedAt: string
  readTime: number
  blocks: Block[]
}
