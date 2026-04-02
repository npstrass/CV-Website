import { useEffect, useRef } from 'react'

export function useCursor() {
  const cursorRef = useRef(null)
  const ringRef   = useRef(null)
  const pos = useRef({ mx: 0, my: 0, rx: 0, ry: 0 })

  useEffect(() => {
    const cursor = cursorRef.current
    const ring   = ringRef.current
    if (!cursor || !ring) return

    const onMove = e => {
      pos.current.mx = e.clientX
      pos.current.my = e.clientY
      cursor.style.left = e.clientX + 'px'
      cursor.style.top  = e.clientY + 'px'
    }
    document.addEventListener('mousemove', onMove)

    let rafId
    const tick = () => {
      pos.current.rx += (pos.current.mx - pos.current.rx) * 0.11
      pos.current.ry += (pos.current.my - pos.current.ry) * 0.11
      ring.style.left = pos.current.rx + 'px'
      ring.style.top  = pos.current.ry + 'px'
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    const expand = () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2.2)'
      ring.style.width  = '50px'
      ring.style.height = '50px'
    }
    const reset = () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)'
      ring.style.width  = '34px'
      ring.style.height = '34px'
    }

    const targets = document.querySelectorAll('a, button, [data-cursor]')
    targets.forEach(el => {
      el.addEventListener('mouseenter', expand)
      el.addEventListener('mouseleave', reset)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      targets.forEach(el => {
        el.removeEventListener('mouseenter', expand)
        el.removeEventListener('mouseleave', reset)
      })
    }
  }, [])

  return { cursorRef, ringRef }
}
