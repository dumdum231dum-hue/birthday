export default function Footer() {
  return (
    <footer className="py-16 px-6 bg-dark-2 border-t border-white/[0.04] text-center">
      <div className="line-gold w-24 mx-auto mb-10" />
      <p className="font-body text-white/25 text-xs tracking-widest uppercase" style={{ letterSpacing: '0.35em' }}>
        Made with <span className="heartbeat inline-block text-red-400/60">♥</span> for Shraddha
      </p>
      <p className="font-body text-white/10 text-xs mt-3">
        Because some people deserve their own website.
      </p>
    </footer>
  )
}
