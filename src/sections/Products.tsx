import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const products = [
  {
    tag: 'B2B / B2G',
    title: '低空内容发布',
    desc: '提供IP内容授权、品牌冠名、轻量植入、数据洞察等商业化服务，打造低空经济新商业模式。',
    features: ['IP内容授权', '品牌冠名合作', '轻量广告植入', '数据洞察分析'],
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#c8a45e" strokeWidth="1.5">
        <rect x="4" y="8" width="32" height="24" rx="2" />
        <path d="M4 16h32M12 28l4-4 4 4M28 24l-2 4" />
        <circle cx="32" cy="12" r="1.5" fill="#c8a45e" />
      </svg>
    ),
  },
  {
    tag: '核心场景',
    title: '低空体验场运营',
    desc: '以无人机编队表演、飞天屏（透明LED空中显示屏）等为核心，打造城市低空文化体验新场景。',
    features: ['无人机编队表演', '飞天屏展示', '低空文化体验', '空中品牌发布'],
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#c8a45e" strokeWidth="1.5">
        <path d="M20 4L4 14v12l16 10 16-10V14L20 4z" />
        <path d="M20 20l-8-5M20 20l8-5M20 20v10" />
        <circle cx="20" cy="12" r="2" fill="#c8a45e" />
      </svg>
    ),
  },
  {
    tag: '常态化',
    title: '常态化低空飞行',
    desc: '在授权空域内进行日常化、规模化的无人机编队飞行运营，构建低空经济常态化商业模式。',
    features: ['日常化飞行运营', '规模化编队部署', '授权空域管理', '安全飞行保障'],
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#c8a45e" strokeWidth="1.5">
        <circle cx="20" cy="20" r="14" />
        <path d="M20 6v4M20 30v4M6 20h4M30 20h4" />
        <path d="M20 14l-4 6h8l-4-6z" fill="#c8a45e" opacity="0.3" />
        <circle cx="20" cy="20" r="3" fill="#c8a45e" />
      </svg>
    ),
  },
]

export default function Products() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.15,
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative bg-white"
      style={{ padding: '140px 48px' }}
    >
      <div className="mx-auto" style={{ maxWidth: 1200 }}>
        <p className="text-gold text-sm tracking-widest mb-4" style={{ fontWeight: 500 }}>
          PRODUCTS & SERVICES
        </p>
        <h2
          className="text-black mb-4"
          style={{
            fontSize: 'clamp(28px, 3.5vw, 48px)',
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}
        >
          核心产品与服务
        </h2>
        <p className="text-gray-500 mb-16" style={{ fontSize: '16px', maxWidth: 600, lineHeight: 1.7 }}>
          覆盖低空经济全产业链，从内容创作到飞行执行，提供一站式低空体验解决方案
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <div
              key={product.title}
              ref={(el) => { cardsRef.current[i] = el }}
              className="group relative p-8 rounded-2xl border border-gray-100 bg-white hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 transition-all duration-500 cursor-pointer"
              style={{ opacity: 0 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="mb-6">{product.icon}</div>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs mb-4"
                style={{
                  backgroundColor: hoveredIndex === i ? '#c8a45e' : '#f5f5f5',
                  color: hoveredIndex === i ? '#fff' : '#666',
                  transition: 'all 0.3s',
                }}
              >
                {product.tag}
              </span>
              <h3 className="text-black text-xl font-semibold mb-4">{product.title}</h3>
              <p className="text-gray-500 mb-6" style={{ fontSize: '15px', lineHeight: 1.7 }}>
                {product.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.features.map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1.5 rounded-lg text-xs text-gray-600 border border-gray-200"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
