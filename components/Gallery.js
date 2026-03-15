import Image from 'next/image'
import { useEffect, useRef } from 'react'

// ─── EDIT CAPTIONS HERE ──────────────────────────────────────────────────────
const photos = [
  { src: '/images/photo1.jpeg', caption: 'Remember this day', number: '01' },
  { src: '/images/photo2.jpeg', caption: 'Always laughing', number: '02' },
  { src: '/images/photo3.jpeg', caption: 'The best memories', number: '03' },
  { src: '/images/photo4.jpeg', caption: 'Forever grateful', number: '04' },
  { src: '/images/photo5.jpeg', caption: 'You & me', number: '05' },
  { src: '/images/photo6.jpeg', caption: 'Unforgettable', number: '06' },
]

export default function Gallery() {
  const refs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.reveal, .reveal-scale').forEach(el => {
            el.classList.add('visible')
          })
        }
      })
    }, { threshold: 0.3 })

    refs.current.forEach(ref => { if (ref) observer.observe(ref) })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {photos.map((photo, i) => {
        const isEven = i % 2 === 0
        return (
          <section
            key={i}
            ref={el => refs.current[i] = el}
            className="w-full min-h-screen flex flex-col md:flex-row items-stretch overflow-hidden"
            style={{ background: i % 3 === 0 ? '#ffffff' : i % 3 === 1 ? '#f5f5f7' : '#ffffff' }}
          >
            {/* Image side */}
            <div
              className={`reveal-scale w-full md:w-1/2 relative overflow-hidden`}
              style={{ minHeight: '60vh' }}
            >
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Text side */}
            <div
              className={`w-full md:w-1/2 flex flex-col justify-center px-8 md:px-20 py-12 md:py-20 ${isEven ? 'md:order-first' : ''}`}
            >
              <p className="reveal caption mb-4 md:mb-6" style={{ letterSpacing: '0.2em' }}>
                Memory {photo.number}
              </p>
              <h2
                className="reveal reveal-delay-1 text-[#1d1d1f]"
                style={{
                  fontSize: 'clamp(32px, 8vw, 72px)',
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                {photo.caption}
              </h2>
              <div className="reveal reveal-delay-2 divider w-12 my-6 md:my-8" />
              <p className="reveal reveal-delay-3 text-[#6e6e73] font-light" style={{ fontSize: '15px', lineHeight: 1.7 }}>
                Every moment with you is one worth remembering forever.
              </p>
            </div>
          </section>
        )
      })}
    </>
  )
}
