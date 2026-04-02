import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './Experience.module.css'

const JOBS = [
  {
    date: '2024 — Present',
    title: 'Sales Operations Manager',
    company: 'Custom Truck One Source',
    location: 'Union Grove, WI',
    current: true,
    desc: 'Lead pricing & quotes team. Drive continuous improvement with Power BI reporting. Oversee inventory integration and low-margin unit reviews.',
  },
  {
    date: '2023 — 2024',
    title: 'Inside Sales Support',
    company: 'Custom Truck One Source',
    location: 'Union Grove, WI',
    desc: 'Leveraged Salesforce, Power BI, and Infor M3 to improve ops and customer experience. Led CI projects, built reports, managed pricing and quotes.',
  },
  {
    date: '2021 — 2023',
    title: 'Sales Coordinator',
    company: 'Custom Truck One Source',
    location: 'Union Grove, WI',
    desc: 'Sales order processing, inventory management, cross-team coordination, and stakeholder communication throughout the build process.',
  },
  {
    date: '2020 — 2021',
    title: 'Security Contractor',
    company: 'G4S',
    location: 'Waterford, WI',
    desc: 'Site security, entry monitoring, radio communication, and emergency response coordination with law enforcement.',
  },
]

export default function Experience({ isActive }) {
  const sectionRef = useRef()

  useEffect(() => {
    if (!isActive || !sectionRef.current) return
    const els = sectionRef.current.querySelectorAll('[data-animate]')
    gsap.fromTo(els,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.07, ease: 'power3.out', delay: 0.1 }
    )
  }, [isActive])

  return (
    <section id="experience" ref={sectionRef} className={styles.section}>
      <div className="container">
        <div data-animate className="section-label">Experience</div>
        <h2 data-animate className="section-title">Where I've been</h2>
        <div className={styles.grid}>
          {JOBS.map((job, i) => (
            <div key={i} data-animate className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.date}>{job.date}</span>
                {job.current && <span className={styles.badge}>Now</span>}
              </div>
              <h3 className={styles.title}>{job.title}</h3>
              <p className={styles.company}>{job.company} &middot; {job.location}</p>
              <p className={styles.desc}>{job.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
