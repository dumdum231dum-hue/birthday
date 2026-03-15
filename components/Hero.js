export default function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center bg-white overflow-hidden">
      <p className="reveal caption mb-8" style={{ letterSpacing: '0.2em' }}>
        A birthday tribute
      </p>
      <h1
        className="reveal reveal-delay-1 text-center text-[#1d1d1f] select-none"
        style={{
          fontSize: 'clamp(64px, 13vw, 170px)',
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontWeight: 400,
          lineHeight: 1.0,
          letterSpacing: '-0.03em',
        }}
      >
        Shraddha
      </h1>
      <div className="reveal reveal-delay-2 divider w-20 my-8" />
      <p
        className="reveal reveal-delay-3 text-center text-[#6e6e73] font-light"
        style={{ fontSize: 'clamp(14px, 1.8vw, 18px)', letterSpacing: '0.01em' }}
      >
        Happy Birthday &nbsp;·&nbsp; You deserve the world
      </p>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 reveal reveal-delay-4">
        <span style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#6e6e73', textTransform: 'uppercase' }}>Scroll</span>
        <div className="w-px h-10 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, rgba(29,29,31,0.3), transparent)' }}>
          <div className="scroll-dot absolute top-0 left-0 right-0 h-3 rounded-full" style={{ background: 'rgba(29,29,31,0.4)' }} />
        </div>
      </div>
    </section>
  )
}
