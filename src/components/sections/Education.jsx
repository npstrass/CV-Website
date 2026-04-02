import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './Education.module.css'

export default function Education({ isActive }) {
  const sectionRef = useRef()

  useEffect(() => {
    if (!isActive || !sectionRef.current) return
    const els = sectionRef.current.querySelectorAll('[data-animate]')
    gsap.fromTo(els,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out', delay: 0.1 }
    )
  }, [isActive])

  return (
    <section id="education" ref={sectionRef} className={styles.section}>
      <div className="container">
        <div data-animate className="section-label">Education &amp; Certifications</div>
        <h2 data-animate className="section-title">Foundation</h2>

        <div className={styles.grid}>
          <div data-animate className={styles.card}>
            <div className={styles.year}>2013 — 2018</div>
            <h3 className={styles.title}>B.S. in Psychology</h3>
            <p className={styles.org}>Carroll University &middot; Waukesha, WI</p>
            <p className={styles.desc}>
              Minor: Business Marketing. Understanding how people think and make
              decisions — the foundation beneath every sales strategy and stakeholder
              conversation.
            </p>
            <div className={styles.badge}>🏈 QB · Carroll University · 2013–2018</div>
          </div>

          <div data-animate className={styles.card}>
            <div className={styles.year}>2021</div>
            <h3 className={styles.title}>Google Certifications</h3>
            <p className={styles.org}>Coursera</p>
            <div className={styles.certs}>
              <div className={styles.cert}>
                <div className={styles.certDot} />
                <div>
                  <div className={styles.certName}>Google Data Analytics</div>
                  <div className={styles.certDesc}>SQL, data cleaning, visualization, and storytelling</div>
                </div>
              </div>
              <div className={styles.cert}>
                <div className={styles.certDot} />
                <div>
                  <div className={styles.certName}>Google UX Design</div>
                  <div className={styles.certDesc}>User research, wireframing, usability testing</div>
                </div>
              </div>
            </div>
          </div>

          <div data-animate className={styles.card}>
            <div className={styles.year}>Since 2021</div>
            <h3 className={styles.title}>Self-Taught Developer</h3>
            <p className={styles.org}>GitHub · Scrimba · Frontend Mentor</p>
            <p className={styles.desc}>
              55+ public repos. No bootcamp — just curiosity, documentation, and
              shipping things. React, Python, REST APIs, Firebase, and more.
            </p>
            <a href="https://github.com/npstrass" target="_blank" rel="noopener noreferrer" className={styles.link}>
              View on GitHub &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
