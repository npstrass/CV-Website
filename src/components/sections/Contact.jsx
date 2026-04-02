import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './Contact.module.css'

const LINKS = [
  { label: 'Email',    value: 'npstrass@outlook.com', href: 'mailto:npstrass@outlook.com' },
  { label: 'GitHub',   value: 'github.com/npstrass',  href: 'https://github.com/npstrass' },
  { label: 'LinkedIn', value: 'in/npstrass',           href: 'https://www.linkedin.com/in/npstrass/' },
  { label: 'Phone',    value: '(262) 539-5174',        href: 'tel:2625395174' },
]

export default function Contact({ isActive }) {
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
    <section id="contact" ref={sectionRef} className={styles.section}>
      <div className="container">
        <div className={styles.inner}>
          <div data-animate className="section-label" style={{ justifyContent: 'center' }}>Contact</div>
          <h2 data-animate className={styles.headline}>Let's connect</h2>
          <p data-animate className={styles.sub}>
            Whether it's a business challenge, a side project, or just a great
            conversation — always open to connecting with interesting people.
          </p>

          <div data-animate className={styles.links}>
            {LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={styles.link}
              >
                <span className={styles.linkLabel}>{l.label}</span>
                <span className={styles.linkValue}>{l.value}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <span>© 2025 Noah Strasser · Waterford, WI</span>
        <span>Built with React + Three.js</span>
      </div>
    </section>
  )
}
