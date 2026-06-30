import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NexaBuild',
  description: 'Professional websites and online stores in Jordan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
