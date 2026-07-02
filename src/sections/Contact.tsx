import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [showQR, setShowQR] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const qrImageRef = useRef<HTMLDivElement>(null)

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
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!modalRef.current || !qrImageRef.current) return
    if (showQR) {
      gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.fromTo(qrImageRef.current, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.4)', delay: 0.1 })
    }
  }, [showQR])

  const handleClose = () => {
    if (!modalRef.current || !qrImageRef.current) return
    gsap.to(qrImageRef.current, { scale: 0.8, opacity: 0, duration: 0.25, ease: 'power2.in' })
    gsap.to(modalRef.current, { opacity: 0, duration: 0.25, delay: 0.1, onComplete: () => setShowQR(false) })
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-[#0a0a0a]"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-12 lg:px-[48px] pt-20 md:pt-[140px] pb-12 md:pb-20">
        <div ref={contentRef} style={{ opacity: 0 }}>
          {/* Section Header */}
          <p className="text-gold text-sm tracking-widest mb-4 font-medium">
            CONTACT US
          </p>
          <h2 className="text-white text-[28px] md:text-[36px] lg:text-[48px] font-semibold leading-tight mb-4 md:mb-6 tracking-tight">
            联系我们
          </h2>
          <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8 md:mb-10 max-w-[600px]">
            如果您有低空体验场合作、无人机编队表演、飞天屏广告投放等商务需求，欢迎与我们联系。
          </p>

          {/* Contact Items - Stack vertically on mobile */}
          <div className="space-y-5 md:space-y-6 max-w-[600px]">
            {/* Email */}
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg border border-gold/30 flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8a45e" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-white/40 text-xs md:text-sm mb-0.5 md:mb-1">商务合作</p>
                <p className="text-white text-sm md:text-base truncate">davon.tang@hotmail.com</p>
              </div>
            </div>

            {/* WeChat QR */}
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg border border-gold/30 flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8a45e" strokeWidth="1.5">
                  <path d="M17 10.5c.8-.6 1.3-1.5 1.3-2.5 0-2.2-2.2-4-5-4s-5 1.8-5 4c0 .4.1.8.2 1.2l-.5 1.5 1.8-.8c.8.4 1.7.6 2.5.6.2 0 .4 0 .5-.1" />
                  <circle cx="7.5" cy="17.5" r=".5" fill="#c8a45e" />
                  <circle cx="11.5" cy="17.5" r=".5" fill="#c8a45e" />
                  <path d="M14.5 13c-2.5 0-4.5 1.8-4.5 4s2 4 4.5 4c.6 0 1.2-.1 1.7-.3l1.3.6-.4-1.2c.6-.7 1-1.6 1-2.6 0-2.2-2-4-4.5-4z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/40 text-xs md:text-sm mb-2 md:mb-3">微信咨询</p>
                <button
                  onClick={() => setShowQR(true)}
                  className="group relative w-full max-w-[320px] overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:border-gold/50 transition-all duration-500 text-left"
                  style={{ boxShadow: '0 0 20px rgba(200,164,94,0.06)' }}
                >
                  <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4">
                    <div
                      className="w-12 h-12 rounded-xl overflow-hidden shrink-0"
                      style={{ boxShadow: '0 0 12px rgba(200,164,94,0.2)' }}
                    >
                      <img
                        src="/images/wechat-qr-final.png"
                        alt="微信二维码"
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/80 text-sm font-medium truncate">扫码添加微信</p>
                      <p className="text-gold/50 text-xs mt-0.5">点击放大查看</p>
                    </div>
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold/40 group-hover:bg-gold/10 transition-all duration-300 shrink-0">
                      <svg className="text-white/30 group-hover:text-gold/70 transition-colors" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 3 21 3 21 9" />
                        <path d="M21 3L14 10" />
                        <path d="M7 21L3 21 3 17" />
                        <path d="M3 21L10 14" />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 md:mt-24 pt-6 md:pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 md:gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo-nav.png"
                alt="领眸科技"
                className="h-5 w-auto"
                draggable={false}
              />
            </div>
            <p className="text-white/20 text-xs text-center sm:text-right">
              &copy; 2025 上海领眸科技有限公司 版权所有
            </p>
          </div>
        </div>
      </div>

      {/* QR Modal */}
      {showQR && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[100] flex items-center justify-center px-6"
          style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)' }}
          onClick={handleClose}
        >
          <div className="relative flex flex-col items-center w-full max-w-[320px]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handleClose}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div
              ref={qrImageRef}
              className="rounded-2xl border overflow-hidden w-full"
              style={{
                borderColor: 'rgba(200,164,94,0.25)',
                background: 'linear-gradient(135deg, rgba(200,164,94,0.06) 0%, rgba(20,20,20,0.9) 50%)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(200,164,94,0.08)',
              }}
            >
              <div className="p-5 md:p-6 pb-3 md:pb-4">
                <img
                  src="/images/wechat-qr-final.png"
                  alt="微信二维码"
                  className="w-full aspect-square rounded-xl object-cover"
                  draggable={false}
                />
              </div>
              <div className="px-5 md:px-6 pb-5 md:pb-6 text-center">
                <p className="text-white text-sm md:text-base font-medium mb-1">扫码添加微信</p>
                <p className="text-white/30 text-xs md:text-sm">联系我们咨询商务合作</p>
              </div>
            </div>

            <p className="text-white/15 text-xs mt-5 md:mt-6">点击任意位置关闭</p>
          </div>
        </div>
      )}
    </section>
  )
}
