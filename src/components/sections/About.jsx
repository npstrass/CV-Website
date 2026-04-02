import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './About.module.css'

const TECH = [
  'Power BI','Power Query','Salesforce','Infor M3','Smartsheet','Excel',
  'Tableau','MySQL','Python','JavaScript','React','HTML/CSS',
  'Firebase','REST APIs','R','Adobe Suite',
]

const STATS = [
  { target: 5,  suffix: '+', label: 'Yrs Exp' },
  { target: 55, suffix: '+', label: 'Repos'   },
  { target: 2,  suffix: '',  label: 'Google Certs' },
]

export default function About({ isActive }) {
  const sectionRef = useRef()

  useEffect(() => {
    if (!isActive || !sectionRef.current) return
    const els = sectionRef.current.querySelectorAll('[data-animate]')
    gsap.fromTo(els,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
    )
    // Counter animation
    sectionRef.current.querySelectorAll('[data-counter]').forEach(el => {
      const target = parseInt(el.dataset.counter, 10)
      const suffix = el.dataset.suffix || ''
      gsap.to({ v: 0 }, {
        v: target, duration: 1.4, ease: 'power2.out', delay: 0.3,
        onUpdate() { el.textContent = Math.round(this.targets()[0].v) + suffix },
      })
    })
  }, [isActive])

  return (
    <section id="about" ref={sectionRef} className={styles.section}>
      <div className="container">
        <div data-animate className="section-label">About</div>
        <h2 data-animate className="section-title">The whole picture</h2>

        <div className={styles.grid}>
          <div className={styles.left}>
            <p data-animate className={styles.body}>
              At the intersection of <span className={styles.accent}>business operations</span> and{' '}
              <span className={styles.accent}>technology</span>. Leading sales ops and pricing
              at Custom Truck One Source — optimizing processes, building Power BI dashboards,
              and managing cross-functional initiatives.
            </p>
            <p data-animate className={styles.body}>
              Taught myself to code from scratch in 2021. Now 55+ public GitHub repos spanning
              React, Python, REST APIs, and Firebase. The curiosity never stops.
            </p>
            <div data-animate className={styles.stats}>
              {STATS.map(s => (
                <div key={s.label} className={styles.statCard}>
                  <div className={styles.statNum}
                    data-counter={s.target} data-suffix={s.suffix}>0</div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div data-animate className={styles.right}>
            <div className={styles.stackCard}>
              <div className={styles.stackLabel}>// tech stack</div>
              <div className={styles.tags}>
                {TECH.map(t => <span key={t} className={styles.tag}>{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
