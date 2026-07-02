import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const highlights = [
  { value: '58万', unit: '平方米', label: '场地规模', detail: '国家AAA级旅游景区' },
  { value: '336万', unit: '人次', label: '年均游客量', detail: '覆盖广泛人群' },
  { value: '150', unit: '场/年', label: '常态化飞行', detail: '年均飞行场次' },
  { value: '静安', unit: '核心', label: '区位优势', detail: '交通便利辐射广' },
]

export default function ExperiencePark() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        }
      )
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
            delay: i * 0.1,
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative bg-[#0a0a0a]"
      style={{ padding: '140px 48px' }}
    >
      <div className="mx-auto" style={{ maxWidth: 1200 }}>
        <div ref={contentRef} style={{ opacity: 0 }}>
          <p className="text-gold text-sm tracking-widest mb-4" style={{ fontWeight: 500 }}>
            DEMONSTRATION PROJECT
          </p>
          <h2
            className="text-white mb-6"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            大宁公园低空体验场
          </h2>
          <p className="text-white/50 mb-16" style={{ fontSize: '16px', maxWidth: 700, lineHeight: 1.7 }}>
            大宁公园是领眸科技在上海打造的首个低空体验场示范项目，集无人机编队表演、飞天屏展示、低空文化体验于一体的城市低空经济标杆案例。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => (
            <div
              key={item.label}
              ref={(el) => { cardsRef.current[i] = el }}
              className="relative p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent hover:border-gold/30 transition-all duration-500"
              style={{ opacity: 0 }}
            >
              <p className="text-gold mb-1">
                <span style={{ fontSize: '32px', fontWeight: 700 }}>{item.value}</span>
                <span className="ml-1 text-sm">{item.unit}</span>
              </p>
              <p className="text-white font-medium mb-1">{item.label}</p>
              <p className="text-white/40 text-sm">{item.detail}</p>
            </div>
          ))}
        </div>

        {/* Park operations list */}
        <div className="mt-16 p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
          <h3 className="text-white text-lg font-semibold mb-6">运营内容</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: '无人机编队表演', desc: '千机编队常态化飞行，打造城市夜空地标' },
              { title: '飞天屏展示', desc: '透明LED空中显示屏，空中数字广告新载体' },
              { title: '低空文化体验', desc: '低空文旅融合，打造沉浸式文化体验场景' },
            ].map((op) => (
              <div key={op.title} className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-gold mt-2 shrink-0" />
                <div>
                  <p className="text-white font-medium mb-1">{op.title}</p>
                  <p className="text-white/40 text-sm" style={{ lineHeight: 1.6 }}>{op.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
