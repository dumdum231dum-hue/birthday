import { useEffect, useRef, useState } from 'react'

// ─── EDIT YOUR LETTER HERE ────────────────────────────────────────────────────
const LETTER_LINES = [
  "Dear Shraddha,",
  "",
  "Where do I even begin? You've been one of those rare people",
  "who makes every moment feel a little more alive. Whether it's",
  "the ridiculous things we laugh about, or just existing in the",
  "same space — everything is better with you around.",
  "",
  "You carry so much grace, so much fire, and somehow still",
  "manage to make everyone feel seen. That's a gift not everyone",
  "has — but you do, effortlessly.",
  "",
  "On this birthday, I just want you to know: the world is",
  "genuinely better because you're in it. Keep being exactly",
  "who you are — because that person is extraordinary.",
  "",
  "Happy Birthday. Here's to you. 🥂",
  "",
  "— Your best friend",
]
// ──────────────────────────────────────────────────────────────────────────────

export default function Message() {
  const sectionRef = useRef(null)
  const [started, setStarted] = useState(false)
  const [displayedLines, setDisplayedLines] = useState([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started) {
        setStarted(true)
        setDisplayedLines(LETTER_LINES.map(() => ''))
      }
    }, { threshold: 0.3 })

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started || done) return
    if (currentLine >= LETTER_LINES.length) { setDone(true); return }

    const line = LETTER_LINES[currentLine]

    if (currentChar <= line.length) {
      const delay = line === '' ? 180 : 28
      const timer = setTimeout(() => {
        setDisplayedLines(prev => {
          const next = [...prev]
          next[currentLine] = line.slice(0, currentChar)
          return next
        })
        setCurrentChar(c => c + 1)
      }, delay)
      return () => clearTimeout(timer)
    } else {
      const pause = LETTER_LINES[currentLine] === '' ? 80 : 120
      const timer = setTimeout(() => {
        setCurrentLine(l => l + 1)
        setCurrentChar(0)
      }, pause)
      return () => clearTimeout(timer)
    }
  }, [started, currentLine, currentChar, done])

  return (
    <section
      ref={sectionRef}
      className="py-32 px-6 md:px-16 bg-dark relative overflow-hidden"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div style={{
          width: '800px',
          height: '600px',
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)',
        }} />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">

        {/* Section header */}
        <p className="reveal font-body text-xs uppercase tracking-[0.4em] text-gold/50 mb-4">Chapter 03</p>
        <h2 className="reveal reveal-delay-1 font-display text-6xl md:text-8xl text-white/90 leading-none mb-16">
          A LETTER
        </h2>
        <div className="reveal reveal-delay-2 line-gold w-32 mb-16" />

        {/* Letter card */}
        <div
          className="relative border border-white/[0.06] bg-dark-2/50 p-10 md:p-16"
          style={{ backdropFilter: 'blur(10px)' }}
        >
          {/* Corner ornaments */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold/30" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-gold/30" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-gold/30" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold/30" />

          {/* Letter text */}
          <div className="font-serif italic text-white/75 leading-relaxed" style={{ fontSize: '1.1rem' }}>
            {displayedLines.map((line, i) => (
              <p
                key={i}
                className={`min-h-[1.8em] ${i === 0 ? 'text-gold font-body not-italic font-medium text-sm tracking-widest uppercase mb-6' : ''}`}
                style={{ letterSpacing: i === 0 ? '0.2em' : undefined }}
              >
                {line}
                {/* Show cursor on current typing line */}
                {i === currentLine && !done && (
                  <span className="typewriter-cursor" />
                )}
              </p>
            ))}
          </div>
        </div>

        {/* Birthday sign off */}
        {done && (
          <div className="mt-16 text-center animate-fade-up">
            <div className="line-gold w-32 mx-auto mb-8" />
            <p className="font-display text-4xl md:text-6xl text-white/20 tracking-widest">HAPPY BIRTHDAY</p>
            <p className="font-display text-6xl md:text-9xl gold-shimmer leading-none mt-2">SHRADDHA</p>
            <p className="mt-6 font-body text-gold/50 text-xs tracking-widest uppercase" style={{ letterSpacing: '0.4em' }}>
              with love <span className="heartbeat inline-block text-red-400">♥</span>
            </p>
          </div>
        )}
      </div>

      {/* Decorative number */}
      <div
        className="absolute top-16 right-10 font-display text-white/[0.03] select-none pointer-events-none"
        style={{ fontSize: '18vw', lineHeight: 1 }}
      >
        03
      </div>
    </section>
  )
}
