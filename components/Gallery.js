import Image from 'next/image'
import { useEffect, useRef } from 'react'

// ─── ADD YOUR PHOTOS HERE ────────────────────────────────────────────────────
// 1. Drop your image files into the /public/images/ folder
// 2. Update this array with the correct filenames and captions
// ─────────────────────────────────────────────────────────────────────────────
const photos = [
  { src: '/images/photo1.png', caption: 'Remember this day 🥂', span: 'col-span-2 row-span-2' },
  { src: '/images/photo2.png', caption: 'Always laughing', span: 'col-span-1 row-span-1' },
  { src: '/images/photo3.png', caption: 'The best memories', span: 'col-span-1 row-span-1' },
  { src: '/images/photo4.png', caption: 'Forever grateful', span: 'col-span-1 row-span-2' },
  { src: '/images/photo5.png', caption: 'You & me', span: 'col-span-1 row-span-1' },
  { src: '/images/photo6.png', caption: 'Unforgettable', span: 'col-span-2 row-span-1' },
]

export default function Gallery() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1 })

    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 px-6 md:px-16 bg-dark-2 relative">

      {/* Section header */}
      <div className="max-w-6xl mx-auto mb-16">
        <p className="reveal font-body text-xs uppercase tracking-[0.4em] text-gold/50 mb-4">Chapter 02</p>
        <h2 className="reveal reveal-delay-1 font-display text-6xl md:text-8xl text-white/90 leading-none">
          MEMORIES
        </h2>
        <div className="reveal reveal-delay-2 line-gold w-32 mt-6" />
      </div>

      {/* Bento grid */}
      <div
        className="reveal reveal-delay-2 max-w-6xl mx-auto grid gap-3"
        style={{
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridAutoRows: '220px',
        }}
      >
        {photos.map((photo, i) => (
          <div
            key={i}
            className={`gallery-item rounded-sm bg-dark-3 ${photo.span}`}
          >
            <Image
              src={photo.src}
              alt={photo.caption}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="overlay" />
            <p className="absolute bottom-4 left-4 font-body text-sm text-white/80 font-light opacity-0 group-hover:opacity-100 transition-opacity z-10 translate-y-2 gallery-caption">
              {photo.caption}
            </p>
          </div>
        ))}
      </div>

      {/* Decorative number */}
      <div
        className="absolute top-16 right-10 font-display text-white/[0.03] select-none pointer-events-none"
        style={{ fontSize: '18vw', lineHeight: 1 }}
      >
        02
      </div>
    </section>
  )
}
