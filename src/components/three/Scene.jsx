import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

/* ---- Particle Field ---- */
function Particles({ count = 700 }) {
  const points = useRef()

  const { positions, velocities, basePositions } = useMemo(() => {
    const pos  = new Float32Array(count * 3)
    const base = new Float32Array(count * 3)
    const vel  = []
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 14 + Math.random() * 26
      const x     = r * Math.sin(phi) * Math.cos(theta)
      const y     = r * Math.sin(phi) * Math.sin(theta)
      const z     = r * Math.cos(phi) - 6
      pos[i*3] = base[i*3] = x
      pos[i*3+1] = base[i*3+1] = y
      pos[i*3+2] = base[i*3+2] = z
      vel.push({
        x: (Math.random() - .5) * .0035,
        y: (Math.random() - .5) * .0035,
        z: (Math.random() - .5) * .003,
      })
    }
    return { positions: pos, velocities: vel, basePositions: base }
  }, [count])

  useFrame(({ clock }) => {
    if (!points.current) return
    const t   = clock.getElapsedTime()
    const arr = points.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      arr[i*3]   += velocities[i].x + (basePositions[i*3]   - arr[i*3])   * .002
      arr[i*3+1] += velocities[i].y + (basePositions[i*3+1] - arr[i*3+1]) * .002
      arr[i*3+2] += velocities[i].z + (basePositions[i*3+2] - arr[i*3+2]) * .002
    }
    points.current.geometry.attributes.position.needsUpdate = true
    points.current.rotation.y = t * .035
    points.current.rotation.x = t * .015
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#0f766e" size={0.1} transparent opacity={0.28} sizeAttenuation />
    </points>
  )
}

/* ---- Wireframe Icosahedron ---- */
function WireIco() {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.x = t * .12
    ref.current.rotation.y = t * .17
  })
  return (
    <mesh ref={ref} position={[17, 3, -8]}>
      <icosahedronGeometry args={[6, 1]} />
      <meshBasicMaterial color="#0f766e" wireframe transparent opacity={0.07} />
    </mesh>
  )
}

/* ---- Torus Knot ---- */
function WireKnot() {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.x = t * .08
    ref.current.rotation.y = t * .11
  })
  return (
    <mesh ref={ref} position={[-18, -5, -12]}>
      <torusKnotGeometry args={[3.5, 0.8, 90, 14]} />
      <meshBasicMaterial color="#2dd4bf" wireframe transparent opacity={0.06} />
    </mesh>
  )
}

/* ---- Floating Octahedron (hero accent) ---- */
function FloatingOcta() {
  return (
    <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1.0}>
      <mesh position={[0, 0, -6]}>
        <octahedronGeometry args={[1.6, 0]} />
        <meshBasicMaterial color="#0f766e" wireframe transparent opacity={0.05} />
      </mesh>
    </Float>
  )
}

/* ---- Scroll-driven camera rig ---- */
function CameraRig({ scrollProgress }) {
  const { camera } = useThree()
  useFrame(() => {
    const sp = scrollProgress.current
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, -sp * 16, 0.04)
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, Math.sin(sp * Math.PI) * 3, 0.04)
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, sp * 0.06, 0.04)
  })
  return null
}

/* ---- Subtle grid plane ---- */
function ScrollGrid({ scrollProgress }) {
  const ref = useRef()
  useFrame(() => {
    if (!ref.current) return
    const sp = scrollProgress.current
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, -22 + sp * 10, 0.05)
    ref.current.material.opacity = 0.06 + sp * 0.1
  })
  return (
    <gridHelper ref={ref} args={[120, 50, '#0f766e', '#d1ccc4']} position={[0, -22, 0]}>
      <meshBasicMaterial transparent opacity={0.06} />
    </gridHelper>
  )
}

/* ---- Main Scene ---- */
export default function Scene({ scrollProgress }) {
  return (
    <Canvas
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
      camera={{ position: [0, 0, 32], fov: 60, near: 0.1, far: 200 }}
      gl={{ antialias: true }}
      onCreated={({ gl }) => gl.setClearColor('#f2ede6', 1)}
    >
      <fog attach="fog" args={['#f2ede6', 45, 170]} />
      <ambientLight color="#e0e8f0" intensity={1.2} />
      <pointLight color="#0f766e" intensity={2} distance={80} position={[14, 10, 18]} />
      <pointLight color="#134e4a" intensity={1.5} distance={80} position={[-18, -8, 6]} />

      <Particles count={window.innerWidth < 768 ? 300 : 700} />
      <WireIco />
      <WireKnot />
      <FloatingOcta />
      <ScrollGrid scrollProgress={scrollProgress} />
      <CameraRig scrollProgress={scrollProgress} />
    </Canvas>
  )
}
