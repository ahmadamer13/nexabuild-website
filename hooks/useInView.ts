'use client'

import { useEffect, useRef, useState } from 'react'

export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  // SSR: true so content is indexable by Googlebot without JS scroll.
  // After hydration: elements below the fold are set to false and animate
  // in as the user scrolls. Elements already visible stay true.
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    // Only hide and animate elements that start below the fold
    if (el.getBoundingClientRect().top > window.innerHeight) {
      setInView(false)
    }

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}
