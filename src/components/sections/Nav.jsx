import styles from './Nav.module.css'

export default function Nav({ currentIdx, goTo, sections }) {
  return (
    <header className={styles.nav}>
      <button className={styles.logo} onClick={() => goTo(0)}>
        NS<span>.</span>
      </button>
      <button
        className={styles.contact}
        onClick={() => goTo(sections.length - 1)}
      >
        Contact
      </button>
    </header>
  )
}
