import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './Projects.module.css'

const PROJECTS = [
  { icon: '🏠', lang: 'JS',  name: 'anderson-home-services', url: 'https://github.com/npstrass/anderson-home-services', desc: 'Real-world client site. Production-grade front-end.' },
  { icon: '💰', lang: 'JS',  name: 'fincal',                  url: 'https://github.com/npstrass/fincal',                  desc: 'Financial calculator. Practical number-crunching tool.' },
  { icon: '📈', lang: 'JS',  name: 'cost-margin',             url: 'https://github.com/npstrass/cost-margin',             desc: 'Cost & margin calculator built from sales ops pain points.' },
  { icon: '⚡', lang: 'JS',  name: 'pokedex',                 url: 'https://github.com/npstrass/pokedex',                 desc: 'API-driven Pokédex. REST integration + dynamic render.' },
  { icon: '🤖', lang: 'PY',  name: 'discord-bot',             url: 'https://github.com/npstrass/discord-bot',             desc: 'Python music bot for Discord voice channels.' },
  { icon: '🍺', lang: 'HTML',name: 'hop-yard',                url: 'https://github.com/npstrass/hop-yard',                desc: 'Brewery landing page. Responsive, polished design.' },
]

export default function Projects({ isActive }) {
  const sectionRef = useRef()

  useEffect(() => {
    if (!isActive || !sectionRef.current) return
    const els = sectionRef.current.querySelectorAll('[data-animate]')
    gsap.fromTo(els,
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.06, ease: 'power3.out', delay: 0.1 }
    )
  }, [isActive])

  return (
    <section id="projects" ref={sectionRef} className={styles.section}>
      <div className="container">
        <div data-animate className="section-label">Projects</div>
        <h2 data-animate className="section-title">Built from scratch</h2>
        <p data-animate className={styles.intro}>
          <a href="https://github.com/npstrass" target="_blank" rel="noopener noreferrer">
            github.com/npstrass
          </a>{' '}— 55+ public repos
        </p>
        <div className={styles.grid}>
          {PROJECTS.map((p, i) => (
            <a
              key={i}
              data-animate
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >
              <div className={styles.top}>
                <span className={styles.icon}>{p.icon}</span>
                <span className={styles.lang}>{p.lang}</span>
              </div>
              <div className={styles.name}>{p.name}</div>
              <p className={styles.desc}>{p.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
