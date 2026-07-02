import { useState, useEffect } from 'react'

const navItems = [
  { label: '首页', href: '#hero' },
  { label: '关于我们', href: '#about' },
  { label: '产品服务', href: '#products' },
  { label: '核心优势', href: '#advantages' },
  { label: '体验场', href: '#experience' },
  { label: '联系我们', href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/70 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
      style={{ height: 80 }}
    >
      <div className="mx-auto h-full flex items-center justify-between" style={{ maxWidth: 1400, padding: '0 48px' }}>
        <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-3">
          <img
            src="/images/logo-nav.png"
            alt="领眸科技 LM Tech"
            className="h-9 w-auto"
            draggable={false}
            style={{ objectFit: 'contain' }}
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="relative text-[14px] text-white/70 hover:text-white transition-colors duration-300 group"
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, '#contact')}
          className="hidden md:inline-flex items-center px-5 py-2 border border-gold/60 text-gold text-sm rounded-full hover:bg-gold hover:text-black transition-all duration-300"
        >
          商务合作
        </a>
      </div>
    </nav>
  )
}
