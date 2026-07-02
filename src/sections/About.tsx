import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-[#0a0a0a]"
      style={{ padding: '140px 48px' }}
    >
      <div className="mx-auto" style={{ maxWidth: 1200 }}>
        <div ref={contentRef} style={{ opacity: 0 }}>
          <p className="text-gold text-sm tracking-widest mb-4" style={{ fontWeight: 500 }}>
            ABOUT LM TECH
          </p>
          <h2
            className="text-white mb-12"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            关于领眸科技
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p
                className="text-white/70 leading-relaxed mb-6"
                style={{ fontSize: '16px', lineHeight: 1.9 }}
              >
                上海领眸科技有限公司是<strong className="text-white">工信部新闻宣传中心低空融媒办公室</strong>指导、上海市静安区支持的低空融媒上海试验点建设主体。
              </p>
              <p
                className="text-white/70 leading-relaxed mb-6"
                style={{ fontSize: '16px', lineHeight: 1.9 }}
              >
                公司以<strong className="text-white">低空体验场</strong>为核心业务，致力于打造中国领先的城市低空运营商，推动低空经济从试点到规模化商用的产业化发展。
              </p>
              <p
                className="text-white/70 leading-relaxed"
                style={{ fontSize: '16px', lineHeight: 1.9 }}
              >
                公司是低空融媒办公室<strong className="text-white">指定技术执行方</strong>，与工业和信息化部新闻宣传中心、北京航空航天大学深度合作，共同推进低空融媒全国试点落地和内容创作服务。
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                <p className="text-gold text-3xl font-bold mb-2">2年+</p>
                <p className="text-white/50 text-sm">无人机常态化飞行技术与管理经验</p>
              </div>
              <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                <p className="text-gold text-3xl font-bold mb-2">10年+</p>
                <p className="text-white/50 text-sm">核心技术团队软件开发经验</p>
              </div>
              <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                <p className="text-gold text-3xl font-bold mb-2">No.1</p>
                <p className="text-white/50 text-sm">低空融媒办公室指定技术执行方</p>
              </div>
              <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                <p className="text-gold text-3xl font-bold mb-2">创始</p>
                <p className="text-white/50 text-sm">低空融媒联合创始团队</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
