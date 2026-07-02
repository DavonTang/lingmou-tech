import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const engineItems = [
  {
    title: '无人机编队飞行',
    subtitle: 'DRONE SWARM',
    desc: '千机级无人机编队表演系统，支持复杂三维图案实时编排。具备厘米级RTK定位、毫秒级时间同步、全天候抗风飞行能力，为品牌活动打造震撼视觉盛宴。',
    video: '/videos/drone.mp4',
    videoLabel: '无人机编队案例',
  },
  {
    title: '飞天屏系统',
    subtitle: 'FLYING LED SCREEN',
    desc: '透明LED空中显示屏技术，将无人机与LED显示面板融合，在空中形成巨型悬浮屏幕。支持高清视频播放、实时数据展示，开创空中数字广告新时代。',
    video: '/videos/feitian-new.mp4',
    videoLabel: '飞天屏案例',
  },
  {
    title: '光影艺术方案',
    subtitle: 'LIGHT ART DESIGN',
    desc: '将无人机编队飞行与灯光艺术深度融合，支持定制化图案设计、品牌Logo空中展示、3D动画效果。为品牌发布会、节庆活动、城市文旅提供独特视觉方案。',
    video: '/videos/lightart.mp4',
    videoLabel: '光影艺术案例',
  },
]

export default function EngineShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${engineItems.length * 80}%`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const newIndex = Math.min(
            engineItems.length - 1,
            Math.floor(self.progress * engineItems.length)
          )
          setActiveIndex(newIndex)
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const current = engineItems[activeIndex]

  return (
    <section
      id="engine"
      ref={sectionRef}
      className="relative w-full bg-[#0a0a0a]"
      style={{ height: '100vh' }}
    >
      <div ref={contentRef} className="h-full flex" style={{ opacity: 0 }}>
        {/* Left - Video Display */}
        <div className="w-1/2 h-full flex flex-col justify-center" style={{ padding: '0 60px' }}>
          <p className="text-gold text-sm tracking-widest mb-6" style={{ fontWeight: 500 }}>
            TECHNOLOGY
          </p>

          {/* Main video */}
          <div
            className="relative rounded-2xl overflow-hidden border border-white/10 mb-6"
            style={{
              aspectRatio: '16/10',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            <video
              key={current.video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={current.video} type="video/mp4" />
            </video>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,0.3)' }}
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 rounded-full text-xs bg-black/60 text-white/80 border border-white/10">
                {current.videoLabel}
              </span>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-3">
            {engineItems.map((item, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="relative flex-1 rounded-xl overflow-hidden border transition-all duration-500"
                style={{
                  aspectRatio: '16/9',
                  borderColor: activeIndex === i ? 'rgba(200,164,94,0.5)' : 'rgba(255,255,255,0.08)',
                  opacity: activeIndex === i ? 1 : 0.5,
                  transform: activeIndex === i ? 'scale(1.02)' : 'scale(1)',
                }}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={item.video} type="video/mp4" />
                </video>
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: activeIndex === i
                      ? 'linear-gradient(to top, rgba(200,164,94,0.15), transparent)'
                      : 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
                  }}
                />
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white/80 text-xs truncate">{item.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right - Text Content */}
        <div className="w-1/2 h-full flex flex-col justify-center" style={{ padding: '0 80px 0 40px' }}>
          <div className="relative" style={{ minHeight: 240 }}>
            {engineItems.map((item, i) => (
              <div
                key={item.title}
                className="absolute top-0 left-0 w-full transition-all duration-600"
                style={{
                  opacity: activeIndex === i ? 1 : 0,
                  transform: `translateY(${activeIndex === i ? 0 : 20}px)`,
                  pointerEvents: activeIndex === i ? 'auto' : 'none',
                  transition: 'opacity 0.6s ease, transform 0.6s ease',
                }}
              >
                <p className="text-white/40 text-xs tracking-widest mb-2">{item.subtitle}</p>
                <h3
                  className="text-white mb-6"
                  style={{
                    fontSize: 'clamp(28px, 3vw, 42px)',
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  {item.title}
                </h3>
                <div
                  className="w-12 h-px bg-gold mb-6 transition-all duration-500"
                  style={{
                    transform: activeIndex === i ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                  }}
                />
                <p
                  className="text-white/60 leading-relaxed"
                  style={{ fontSize: '16px', lineHeight: 1.8, maxWidth: 480 }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Progress dots */}
          <div className="flex gap-3 mt-12">
            {engineItems.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="transition-all duration-500 rounded-full cursor-pointer"
                style={{
                  width: activeIndex === i ? 32 : 8,
                  height: 8,
                  backgroundColor: activeIndex === i ? '#c8a45e' : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
