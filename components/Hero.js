import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Particle effect on canvas
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2 + 0.2,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -(Math.random() * 0.4 + 0.1),
      opacity: Math.random() * 0.5 + 0.1,
    }))

    let animId
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201, 168, 76, ${p.opacity})`
        ctx.fill()
        p.x += p.speedX
        p.y += p.speedY
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w }
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-dark">

      {/* Canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Radial glow behind name */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          style={{
            width: '600px',
            height: '400px',
            background: 'radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* Top label */}
      <p
        className="reveal font-body tracking-[0.4em] text-xs uppercase text-gold/60 mb-8"
        style={{ letterSpacing: '0.4em' }}
      >
        A birthday tribute to
      </p>

      {/* Main name */}
      <h1
        className="reveal reveal-delay-1 font-display text-center leading-none select-none"
        style={{
          fontSize: 'clamp(72px, 16vw, 200px)',
          lineHeight: 0.9,
        }}
      >
        <span className="gold-shimmer">SHRADDHA</span>
      </h1>

      {/* Thin gold line */}
      <div className="reveal reveal-delay-2 line-gold w-48 my-8" />

      {/* Subtitle */}
      <p
        className="reveal reveal-delay-3 font-body font-light text-center text-white/40 tracking-widest uppercase text-xs"
        style={{ letterSpacing: '0.35em' }}
      >
        Happy Birthday &nbsp;·&nbsp; You deserve the world
      </p>

      {/* Year badge */}
      <div className="reveal reveal-delay-4 mt-10 border border-gold/20 px-6 py-2 text-gold/50 font-body text-xs tracking-widest uppercase">
        2025
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-body text-xs tracking-widest uppercase text-white/50" style={{ letterSpacing: '0.3em' }}>Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gold/50 to-transparent relative overflow-hidden">
          <div className="scroll-dot absolute top-0 left-0 right-0 h-3 bg-gold/70 rounded-full" />
        </div>
      </div>

      {/* Decorative corner marks */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-gold/20" />
      <div className="absolute top-8 right-8 w-8 h-8 border-t border-r border-gold/20" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-b border-l border-gold/20" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-gold/20" />
    </section>
  )
}
