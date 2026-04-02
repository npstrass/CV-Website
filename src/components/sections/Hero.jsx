import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './Hero.module.css'

export default function Hero({ isActive, goTo }) {
  const contentRef = useRef()
  const ran = useRef(false)

  useEffect(() => {
    if (!isActive) return
    const els = contentRef.current.children
    if (!ran.current) {
      // First time: entrance with a delay
      gsap.fromTo(els,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.75, stagger: 0.12, ease: 'power3.out', delay: 0.15 }
      )
      ran.current = true
    } else {
      gsap.fromTo(els,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.09, ease: 'power3.out', delay: 0.1 }
      )
    }
  }, [isActive])

  return (
    <section id="hero" className={styles.hero}>
      <div className="container">
        <div ref={contentRef} className={styles.content}>
          <p className={styles.label}>Waterford, WI &mdash; Open to opportunities</p>
          <h1 className={styles.name}>
            Noah<br />
            <span className={styles.ghost}>Strasser</span>
          </h1>
          <p className={styles.subtitle}>
            <strong>Sales Operations Manager</strong> who uses data to drive decisions &mdash;{' '}
            and a <strong>self-taught developer</strong> who builds the tools he wishes existed.
          </p>
          <div className={styles.cta}>
            <button className="btn-primary" onClick={() => goTo(2)}>View Experience &rarr;</button>
            <button className="btn-outline" onClick={() => goTo(6)}>Get in Touch</button>
          </div>
        </div>
      </div>
      <button className={styles.downArrow} onClick={() => goTo(1)} aria-label="Next section">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4v12M4 10l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </section>
  )
}
