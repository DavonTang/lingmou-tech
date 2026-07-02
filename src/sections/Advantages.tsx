import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { number: '26', unit: '家', label: '首批全国试验点建设单位' },
  { number: '326', unit: '个', label: '对接城市空中地标资源' },
  { number: '150', unit: '场/年', label: '大宁公园常态化飞行' },
  { number: '336', unit: '万人次', label: '大宁公园年均游客' },
]

const advantages = [
  {
    title: '权威背书',
    desc: '工信部新闻宣传中心低空融媒办公室指导，首批全国26家试验点建设单位之一。',
  },
  {
    title: '全国布局',
    desc: '对接全国326个城市空中地标资源，构建"全国一张网"低空内容传播体系。',
  },
  {
    title: '技术实力',
    desc: '与北京航空航天大学深度合作，具备无人机常态化飞行的完整技术方案和安全管理体系。',
  },
  {
    title: '产业资源',
    desc: '拥有低空融媒办公室唯一技术执行方身份，具备从内容创作到飞行执行的全链条能力。',
  },
]

export default function Advantages() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.1,
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="advantages"
      ref={sectionRef}
      className="relative bg-[#0a0a0a]"
      style={{ padding: '140px 48px' }}
    >
      <div className="mx-auto" style={{ maxWidth: 1200 }}>
        <p className="text-gold text-sm tracking-widest mb-4" style={{ fontWeight: 500 }}>
          CORE STRENGTHS
        </p>
        <h2
          className="text-white mb-16"
          style={{
            fontSize: 'clamp(28px, 3.5vw, 48px)',
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}
        >
          核心优势与成果
        </h2>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          style={{ opacity: 0 }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-xl border border-white/10 bg-white/[0.02] text-center"
            >
              <p className="text-gold mb-1">
                <span style={{ fontSize: '36px', fontWeight: 700 }}>{stat.number}</span>
                <span className="ml-1 text-lg">{stat.unit}</span>
              </p>
              <p className="text-white/50 text-sm" style={{ lineHeight: 1.5 }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Advantage cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {advantages.map((adv, i) => (
            <div
              key={adv.title}
              ref={(el) => { cardsRef.current[i] = el }}
              className="p-8 rounded-xl border border-white/10 bg-white/[0.02] hover:border-gold/30 transition-all duration-500"
              style={{ opacity: 0 }}
            >
              <div className="w-2 h-2 rounded-full bg-gold mb-4" />
              <h3 className="text-white text-lg font-semibold mb-3">{adv.title}</h3>
              <p className="text-white/50" style={{ fontSize: '15px', lineHeight: 1.8 }}>
                {adv.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
