import { useCursor } from '../hooks/useCursor'
import styles from './Cursor.module.css'

export default function Cursor() {
  const { cursorRef, ringRef } = useCursor()
  return (
    <>
      <div ref={cursorRef}  className={styles.cursor} />
      <div ref={ringRef}    className={styles.ring}   />
    </>
  )
}
