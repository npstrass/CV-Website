import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './Skills.module.css'

const SKILLS = [
  { icon: '📊', name: 'Data Analytics & BI',   pct: 90, desc: 'Power BI, Tableau, Power Query, Python/R — raw data into board-ready insights.' },
  { icon: '⚙️', name: 'Sales Operations',       pct: 93, desc: 'Process optimization, pricing strategy, CRM, and cross-functional team leadership.' },
  { icon: '⚛️', name: 'Frontend Dev',           pct: 70, desc: 'React, JavaScript, HTML/CSS. 15+ Frontend Mentor challenges shipped.' },
  { icon: '🐍', name: 'Python & Automation',    pct: 65, desc: 'Bots, API integrations, budget tools, automation scripts.' },
  { icon: '🔗', name: 'APIs & Integrations',    pct: 68, desc: 'REST APIs, Firebase, inventory integrations, data pipelines.' },
  { icon: '🧠', name: 'Leadership',             pct: 88, desc: 'Psychology-backed communication, team coordination, CI initiatives.' },
]

export default function Skills({ isActive }) {
  const sectionRef = useRef()

  useEffect(() => {
    if (!isActive || !sectionRef.current) return
    const els = sectionRef.current.querySelectorAll('[data-animate]')
    gsap.fromTo(els,
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.06, ease: 'power3.out', delay: 0.1 }
    )
    // Animate bars
    sectionRef.current.querySelectorAll('[data-bar]').forEach(el => {
      gsap.to(el, { width: el.dataset.bar + '%', duration: 1.2, ease: 'power2.out', delay: 0.4 })
    })
  }, [isActive])

  return (
    <section id="skills" ref={sectionRef} className={styles.section}>
      <div className="container">
        <div data-animate className="section-label">Skills</div>
        <h2 data-animate className="section-title">What I bring</h2>
        <div className={styles.grid}>
          {SKILLS.map((s, i) => (
            <div key={i} data-animate className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.icon}>{s.icon}</span>
                <span className={styles.name}>{s.name}</span>
              </div>
              <p className={styles.desc}>{s.desc}</p>
              <div className={styles.barTrack}>
                <div className={styles.barFill} data-bar={s.pct} style={{ width: 0 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
