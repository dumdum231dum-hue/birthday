import '../styles/globals.css'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Custom cursor
    const cursor = document.querySelector('.cursor')
    const ring = document.querySelector('.cursor-ring')
    let ringX = 0, ringY = 0
    let cursorX = 0, cursorY = 0

    const moveCursor = (e) => {
      cursorX = e.clientX
      cursorY = e.clientY
      cursor.style.left = cursorX + 'px'
      cursor.style.top = cursorY + 'px'
    }

    const animateRing = () => {
      ringX += (cursorX - ringX) * 0.12
      ringY += (cursorY - ringY) * 0.12
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'
      requestAnimationFrame(animateRing)
    }

    window.addEventListener('mousemove', moveCursor)
    animateRing()

    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div className="grain" />
      <div className="cursor" />
      <div className="cursor-ring" />
      <Component {...pageProps} />
    </>
  )
}
