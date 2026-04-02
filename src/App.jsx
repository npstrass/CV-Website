import { useRef, useState, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import Scene      from './components/three/Scene'
import Cursor     from './components/Cursor'
import Nav        from './components/sections/Nav'
import Hero       from './components/sections/Hero'
import About      from './components/sections/About'
import Experience from './components/sections/Experience'
import Skills     from './components/sections/Skills'
import Projects   from './components/sections/Projects'
import Education  from './components/sections/Education'
import Contact    from './components/sections/Contact'

const SECTIONS = [
  { id: 'hero',       label: 'Home',       Component: Hero },
  { id: 'about',      label: 'About',      Component: About },
  { id: 'experience', label: 'Experience', Component: Experience },
  { id: 'skills',     label: 'Skills',     Component: Skills },
  { id: 'projects',   label: 'Projects',   Component: Projects },
  { id: 'education',  label: 'Education',  Component: Education },
  { id: 'contact',    label: 'Contact',    Component: Contact },
]
const N = SECTIONS.length

/* ---- Side dot navigation ---- */
function SideDots({ current, goTo }) {
  return (
    <nav style={{
      position: 'fixed', right: '2rem', top: '50%',
      transform: 'translateY(-50%)', zIndex: 200,
      display: 'flex', flexDirection: 'column', gap: '0.75rem',
      alignItems: 'flex-end',
    }}>
      {SECTIONS.map((s, i) => (
        <button
          key={s.id}
          onClick={() => goTo(i)}
          title={s.label}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: 'none', border: 'none', cursor: 'none', padding: '2px',
          }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
            color: i === current ? 'var(--accent)' : 'var(--text-muted)',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            opacity: i === current ? 1 : 0,
            transition: 'opacity 0.3s',
            whiteSpace: 'nowrap',
          }}>
            {s.label}
          </span>
          <span style={{
            display: 'block',
            width:  i === current ? '8px'  : '5px',
            height: i === current ? '8px'  : '5px',
            borderRadius: '50%',
            background: i === current ? 'var(--accent)' : 'var(--border-strong)',
            boxShadow: i === current ? '0 0 0 3px var(--accent-glow)' : 'none',
            transition: 'all 0.3s ease',
            flexShrink: 0,
          }} />
        </button>
      ))}
    </nav>
  )
}

/* ---- Konami QB easter egg ---- */
function useKonami() {
  useEffect(() => {
    const seq = [38,38,40,40,37,39,37,39,66,65]
    let idx = 0
    const handler = e => {
      if (e.keyCode === seq[idx]) idx++; else { idx = 0; return }
      if (idx === seq.length) {
        idx = 0
        const msg = document.createElement('div')
        msg.textContent = '🏈 Quarterback Mode Activated'
        Object.assign(msg.style, {
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          fontFamily: 'var(--font-mono)', fontSize: '1rem',
          color: 'var(--accent)',
          background: 'rgba(245,241,235,.97)',
          border: '1.5px solid rgba(37,99,235,.25)',
          padding: '1.2rem 2.4rem', borderRadius: '6px',
          zIndex: '9999', pointerEvents: 'none',
          boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
        })
        document.body.appendChild(msg)
        gsap.from(msg, { opacity: 0, scale: 0.85, duration: 0.35, ease: 'back.out(2)' })
        setTimeout(() => gsap.to(msg, { opacity: 0, duration: 0.4, onComplete: () => msg.remove() }), 3000)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])
}

/* ---- Main App ---- */
export default function App() {
  useKonami()

  const [currentIdx, setCurrentIdx] = useState(0)
  const currentRef   = useRef(0)
  const animating    = useRef(false)
  const wrapperRef   = useRef(null)
  const scrollProgress = useRef(0)
  const touchStartY  = useRef(0)
  const wheelAccum   = useRef(0)       // accumulated trackpad delta
  const WHEEL_THRESH = 80              // px needed to trigger a section change
  const POST_BUFFER  = 600             // ms of extra lock after animation ends

  const goTo = useCallback((idx) => {
    if (animating.current || idx < 0 || idx >= N) return
    animating.current = true
    wheelAccum.current = 0             // flush any residual momentum
    currentRef.current = idx
    setCurrentIdx(idx)
    scrollProgress.current = idx / (N - 1)

    gsap.to(wrapperRef.current, {
      y: -idx * window.innerHeight,
      duration: 0.9,
      ease: 'power3.inOut',
      onComplete: () => {
        // Extra buffer so momentum from the previous swipe can't immediately
        // fire the next section change
        setTimeout(() => {
          animating.current = false
          wheelAccum.current = 0
        }, POST_BUFFER)
      },
    })
  }, [])

  /* Wheel — accumulate delta so a slow trackpad swipe must fully commit */
  useEffect(() => {
    const onWheel = e => {
      e.preventDefault()
      if (animating.current) return

      wheelAccum.current += e.deltaY

      if (wheelAccum.current >  WHEEL_THRESH) {
        wheelAccum.current = 0
        goTo(currentRef.current + 1)
      } else if (wheelAccum.current < -WHEEL_THRESH) {
        wheelAccum.current = 0
        goTo(currentRef.current - 1)
      }
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [goTo])

  /* Keyboard */
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); goTo(currentRef.current + 1) }
      if (e.key === 'ArrowUp'   || e.key === 'PageUp')   { e.preventDefault(); goTo(currentRef.current - 1) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goTo])

  /* Touch */
  useEffect(() => {
    const onStart = e => { touchStartY.current = e.touches[0].clientY }
    const onEnd   = e => {
      const delta = touchStartY.current - e.changedTouches[0].clientY
      if (Math.abs(delta) < 90) return
      if (delta > 0) goTo(currentRef.current + 1)
      else           goTo(currentRef.current - 1)
    }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend',   onEnd,   { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend',   onEnd)
    }
  }, [goTo])

  /* Resize — snap back to current section */
  useEffect(() => {
    const onResize = () => {
      gsap.set(wrapperRef.current, { y: -currentRef.current * window.innerHeight })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <Scene scrollProgress={scrollProgress} />
      <Cursor />
      <Nav currentIdx={currentIdx} goTo={goTo} sections={SECTIONS} />
      <SideDots current={currentIdx} goTo={goTo} />

      {/* fullpage outer clip */}
      <div className="fp-outer">
        <div ref={wrapperRef} className="fp-wrapper">
          {SECTIONS.map(({ id, Component }, i) => (
            <div key={id} className="fp-section">
              <Component isActive={currentIdx === i} goTo={goTo} sectionIdx={i} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
