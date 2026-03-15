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
      const delay = line === '' ? 150 : 25
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
      const timer = setTimeout(() => {
        setCurrentLine(l => l + 1)
        setCurrentChar(0)
      }, line === '' ? 80 : 100)
      return () => clearTimeout(timer)
    }
  }, [started, currentLine, currentChar, done])

  return (
    <section ref={sectionRef} className="w-full min-h-screen flex flex-col items-center justify-center bg-white px-6 py-32">
      <div className="w-full max-w-2xl mx-auto">
        <p className="caption mb-8" style={{ letterSpacing: '0.2em' }}>A letter for you</p>

        <div className="divider w-full mb-16" />

        <div
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontStyle: 'italic',
            fontSize: 'clamp(16px, 2vw, 20px)',
            lineHeight: 1.9,
            color: '#1d1d1f',
          }}
        >
          {displayedLines.map((line, i) => (
            <p
              key={i}
              className="min-h-[1.9em]"
              style={{
                fontFamily: i === 0 ? "'DM Sans', sans-serif" : undefined,
                fontStyle: i === 0 ? 'normal' : undefined,
                fontWeight: i === 0 ? 500 : undefined,
                fontSize: i === 0 ? '12px' : undefined,
                letterSpacing: i === 0 ? '0.2em' : undefined,
                textTransform: i === 0 ? 'uppercase' : undefined,
                marginBottom: i === 0 ? '2rem' : undefined,
                color: i === 0 ? '#6e6e73' : undefined,
              }}
            >
              {line}
              {i === currentLine && !done && <span className="typewriter-cursor" />}
            </p>
          ))}
        </div>

        {done && (
          <div className="mt-20 animate-fade-up">
            <div className="divider w-full mb-16" />
            <h2
              className="text-center text-[#1d1d1f]"
              style={{
                fontSize: 'clamp(48px, 10vw, 120px)',
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontWeight: 400,
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
              }}
            >
              Happy Birthday,<br />Shraddha
            </h2>
            <p className="text-center mt-8 caption" style={{ letterSpacing: '0.2em' }}>
              with love <span className="heartbeat inline-block" style={{ color: '#ff3b30' }}>♥</span>
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
