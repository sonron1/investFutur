export const useScrollReveal = () => {
  if (!process.client) return { reveal: () => {}, revealAll: () => {} }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  )

  const reveal = (el: Element | null) => {
    if (el) observer.observe(el)
  }

  const revealAll = (selector = '[data-reveal]') => {
    document.querySelectorAll(selector).forEach((el) => {
      if (!el.classList.contains('revealed')) observer.observe(el)
    })
  }

  onUnmounted(() => observer.disconnect())

  return { reveal, revealAll }
}
