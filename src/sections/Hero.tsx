import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitle1Ref = useRef<HTMLParagraphElement>(null)
  const subtitle2Ref = useRef<HTMLParagraphElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40, filter: 'blur(12px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, ease: 'power3.out', delay: 0.3 }
      )
      gsap.fromTo(
        subtitle1Ref.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.9 }
      )
      gsap.fromTo(
        subtitle2Ref.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 1.2 }
      )
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 1.8 }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.5)' }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end" style={{ padding: '0 48px', paddingBottom: '15vh' }}>
        <div style={{ maxWidth: 800 }}>
          <h1
            ref={titleRef}
            className="text-glow font-bold text-white leading-tight"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            中国领先的城市低空运营商
          </h1>

          <p
            ref={subtitle1Ref}
            className="mt-6 text-white/70 leading-relaxed"
            style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', fontWeight: 400, maxWidth: 560, lineHeight: 1.8 }}
          >
            以低空体验场为核心业务，推动低空经济从试点到规模化商用的产业化发展
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-breathe"
      >
        <span className="text-white/40 text-xs tracking-widest">SCROLL</span>
        <svg width="20" height="30" viewBox="0 0 20 30" fill="none" className="opacity-40">
          <rect x="1" y="1" width="18" height="28" rx="9" stroke="white" strokeWidth="1.5" />
          <circle cx="10" cy="10" r="3" fill="white" />
        </svg>
      </div>
    </section>
  )
}
