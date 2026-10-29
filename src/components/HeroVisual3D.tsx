import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Bot, Cpu, Gauge, Mic, Sparkles } from 'lucide-react'

export type ModelMode = 'neural' | 'voice' | 'rag' | 'latency' | 'local'

interface SceneController {
  group: THREE.Group
  update: (time: number, mouse: { x: number; y: number }, scroll: number) => void
  dispose: () => void
}

const MODES: { id: ModelMode; label: string; icon: typeof Sparkles; title: string }[] = [
  { id: 'neural', label: 'Neural', icon: Sparkles, title: 'Quantum Neural Core' },
  { id: 'voice', label: 'Voice AI', icon: Mic, title: 'Streaming Voice Waveform' },
  { id: 'rag', label: 'RAG', icon: Bot, title: 'Vector Retrieval Lattice' },
  { id: 'latency', label: 'Latency', icon: Gauge, title: 'Concurrency & Latency Accelerator' },
  { id: 'local', label: 'Local CPU', icon: Cpu, title: 'Edge Tensor Package' },
]

export function HeroVisual3D() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [activeMode, setActiveMode] = useState<ModelMode>('neural')
  const [isInteracting, setIsInteracting] = useState(false)

  const switchSceneRef = useRef<((newMode: ModelMode) => void) | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // 1. Core Scene & Camera Setup
    const scene = new THREE.Scene()
    const width = container.clientWidth || 360
    const height = container.clientHeight || 360

    // Camera at z=5.5 for a well-balanced, proportional 3D model that fits comfortably
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 5.5)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.25

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x0e1b38, 3.2)
    scene.add(ambientLight)

    const cyanLight = new THREE.PointLight(0x22d3ee, 5, 20)
    cyanLight.position.set(3, 2.5, 3.5)
    scene.add(cyanLight)

    const violetLight = new THREE.PointLight(0xa855f7, 5, 20)
    violetLight.position.set(-3, -2.5, 3.0)
    scene.add(violetLight)

    const frontLight = new THREE.DirectionalLight(0xffffff, 0.95)
    frontLight.position.set(0, 1.8, 4.5)
    scene.add(frontLight)

    // Master container for 3D modes
    const modeContainer = new THREE.Group()
    scene.add(modeContainer)

    // 2. Scene Builders with Proportional, Elegant Sizing
    function createNeuralScene(): SceneController {
      const g = new THREE.Group()

      // Central Quantum Crystal Core
      const gemGeo = new THREE.IcosahedronGeometry(1.05, 0)
      const gemMat = new THREE.MeshPhysicalMaterial({
        color: 0x0c152c,
        emissive: 0x1e3a8a,
        emissiveIntensity: 0.75,
        roughness: 0.12,
        metalness: 0.92,
        clearcoat: 1.0,
        flatShading: true,
      })
      const gem = new THREE.Mesh(gemGeo, gemMat)
      g.add(gem)

      // Outer Wireframe Lattice
      const cageGeo = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.35, 1))
      const cageMat = new THREE.LineBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.6 })
      const cage = new THREE.LineSegments(cageGeo, cageMat)
      g.add(cage)

      // Gyroscopic orbital energy rings
      const ring1Geo = new THREE.TorusGeometry(1.65, 0.018, 16, 90)
      const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.8 })
      const ring1 = new THREE.Mesh(ring1Geo, ring1Mat)
      ring1.rotation.x = Math.PI / 3.2
      g.add(ring1)

      const ring2Geo = new THREE.TorusGeometry(1.85, 0.015, 16, 90)
      const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.7 })
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)
      ring2.rotation.x = -Math.PI / 3.8
      g.add(ring2)

      // Orbiting synaptic nodes
      const nodeCount = 5
      const nodes: THREE.Mesh[] = []
      const nodeGeo = new THREE.SphereGeometry(0.065, 16, 16)
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
      for (let i = 0; i < nodeCount; i++) {
        const node = new THREE.Mesh(nodeGeo, nodeMat)
        g.add(node)
        nodes.push(node)
      }

      return {
        group: g,
        update: (time, mouse, scroll) => {
          g.rotation.y = time * 0.28 + mouse.x * 0.45 + scroll * 1.2
          g.rotation.x = Math.sin(time * 0.2) * 0.15 + mouse.y * 0.35
          ring1.rotation.z = time * 0.45
          ring2.rotation.z = -time * 0.38
          gemMat.emissiveIntensity = 0.55 + Math.sin(time * 3) * 0.35

          nodes.forEach((node, i) => {
            const angle = time * 0.6 + (i * Math.PI * 2) / nodeCount
            node.position.set(Math.cos(angle) * 1.65, Math.sin(angle * 1.5) * 0.3, Math.sin(angle) * 1.65)
          })
        },
        dispose: () => {
          gemGeo.dispose()
          gemMat.dispose()
          cageGeo.dispose()
          cageMat.dispose()
          ring1Geo.dispose()
          ring1Mat.dispose()
          ring2Geo.dispose()
          ring2Mat.dispose()
          nodeGeo.dispose()
          nodeMat.dispose()
        },
      }
    }

    function createVoiceScene(): SceneController {
      const g = new THREE.Group()

      // Central Voice Resonator Sphere
      const sphereGeo = new THREE.IcosahedronGeometry(1.05, 3)
      const sphereMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.65,
        wireframe: true,
      })
      const soundSphere = new THREE.Mesh(sphereGeo, sphereMat)
      g.add(soundSphere)

      // Inner pulsating energy core
      const innerGeo = new THREE.SphereGeometry(0.65, 32, 32)
      const innerMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.45 })
      const innerSphere = new THREE.Mesh(innerGeo, innerMat)
      g.add(innerSphere)

      // Expanding soundwave ripple rings
      const waveRings: THREE.Mesh[] = []
      for (let i = 0; i < 4; i++) {
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(1.22 + i * 0.25, 1.25 + i * 0.25, 64),
          new THREE.MeshBasicMaterial({
            color: i % 2 === 0 ? 0x22d3ee : 0xa855f7,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.65 - i * 0.12,
          })
        )
        ring.rotation.x = Math.PI / 2.3
        g.add(ring)
        waveRings.push(ring)
      }

      // Radial equatorial waveform bars
      const barCount = 18
      const bars: THREE.Mesh[] = []
      const barGeo = new THREE.BoxGeometry(0.035, 0.32, 0.035)
      for (let i = 0; i < barCount; i++) {
        const barMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.85 })
        const bar = new THREE.Mesh(barGeo, barMat)
        const angle = (i / barCount) * Math.PI * 2
        bar.position.set(Math.cos(angle) * 1.22, 0, Math.sin(angle) * 1.22)
        bar.rotation.y = -angle
        g.add(bar)
        bars.push(bar)
      }

      return {
        group: g,
        update: (time, mouse) => {
          soundSphere.rotation.y = time * 0.4 + mouse.x * 0.4
          soundSphere.rotation.x = time * 0.2 + mouse.y * 0.3
          const pulse = 1 + Math.sin(time * 5) * 0.07
          soundSphere.scale.set(pulse, pulse, pulse)
          innerSphere.scale.setScalar(0.9 + Math.sin(time * 6) * 0.12)

          waveRings.forEach((r, idx) => {
            const ringScale = 1 + ((time * 0.75 + idx * 0.25) % 1) * 0.45
            r.scale.set(ringScale, ringScale, ringScale)
          })

          bars.forEach((b, idx) => {
            const h = 0.5 + Math.sin(time * 8 + idx * 0.7) * 0.4
            b.scale.set(1, Math.max(0.2, h * 1.3), 1)
          })
        },
        dispose: () => {
          sphereGeo.dispose()
          sphereMat.dispose()
          innerGeo.dispose()
          innerMat.dispose()
          waveRings.forEach((r) => r.geometry.dispose())
          barGeo.dispose()
          bars.forEach((b) => (b.material as THREE.Material).dispose())
        },
      }
    }

    function createRagScene(): SceneController {
      const g = new THREE.Group()

      // Central semantic query orb
      const queryOrbGeo = new THREE.SphereGeometry(0.42, 32, 32)
      const queryOrbMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        emissive: 0x22d3ee,
        emissiveIntensity: 1.15,
      })
      const queryOrb = new THREE.Mesh(queryOrbGeo, queryOrbMat)
      g.add(queryOrb)

      // Orbiting document vector shards
      const docGroup = new THREE.Group()
      g.add(docGroup)

      const docCount = 7
      const docs: THREE.Mesh[] = []
      const docGeo = new THREE.BoxGeometry(0.5, 0.72, 0.04)
      for (let i = 0; i < docCount; i++) {
        const docMat = new THREE.MeshStandardMaterial({
          color: 0x0f172a,
          emissive: i % 2 === 0 ? 0x38bdf8 : 0x818cf8,
          emissiveIntensity: 0.7,
          roughness: 0.2,
          metalness: 0.85,
        })
        const doc = new THREE.Mesh(docGeo, docMat)
        const angle = (i / docCount) * Math.PI * 2
        doc.position.set(Math.cos(angle) * 1.55, Math.sin(i * 1.8) * 0.4, Math.sin(angle) * 1.55)
        doc.rotation.y = -angle + Math.PI / 2
        docGroup.add(doc)
        docs.push(doc)
      }

      // Outer vector lattice ring
      const latticeRing = new THREE.Mesh(
        new THREE.TorusGeometry(1.55, 0.014, 16, 80),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.45 })
      )
      latticeRing.rotation.x = Math.PI / 2
      g.add(latticeRing)

      return {
        group: g,
        update: (time, mouse) => {
          docGroup.rotation.y = time * 0.25 + mouse.x * 0.45
          docGroup.rotation.x = Math.sin(time * 0.2) * 0.15 + mouse.y * 0.25
          queryOrb.scale.setScalar(1 + Math.sin(time * 4) * 0.09)
        },
        dispose: () => {
          queryOrbGeo.dispose()
          queryOrbMat.dispose()
          docGeo.dispose()
          docs.forEach((d) => (d.material as THREE.Material).dispose())
          latticeRing.geometry.dispose()
        },
      }
    }

    function createLatencyScene(): SceneController {
      const g = new THREE.Group()

      // High-speed dual counter-rotating torus accelerators
      const torus1Geo = new THREE.TorusGeometry(1.5, 0.07, 16, 90)
      const torus1Mat = new THREE.MeshStandardMaterial({
        color: 0x22d3ee,
        emissive: 0x22d3ee,
        emissiveIntensity: 0.95,
      })
      const torus1 = new THREE.Mesh(torus1Geo, torus1Mat)
      torus1.rotation.x = Math.PI / 2.6
      g.add(torus1)

      const torus2Geo = new THREE.TorusGeometry(1.75, 0.055, 16, 90)
      const torus2Mat = new THREE.MeshStandardMaterial({
        color: 0x34d399,
        emissive: 0x34d399,
        emissiveIntensity: 0.8,
      })
      const torus2 = new THREE.Mesh(torus2Geo, torus2Mat)
      torus2.rotation.x = -Math.PI / 3.0
      g.add(torus2)

      // Central core pipeline cylinder
      const coreGeo = new THREE.CylinderGeometry(0.32, 0.32, 2.2, 32)
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x1d4ed8,
        emissive: 0x60a5fa,
        emissiveIntensity: 0.95,
        wireframe: true,
      })
      const coreCyl = new THREE.Mesh(coreGeo, coreMat)
      g.add(coreCyl)

      return {
        group: g,
        update: (time, mouse) => {
          torus1.rotation.z = time * 2.8
          torus2.rotation.z = -time * 2.4
          coreCyl.rotation.y = time * 1.8 + mouse.x
          g.rotation.y = mouse.x * 0.45
          g.rotation.x = mouse.y * 0.3
        },
        dispose: () => {
          torus1Geo.dispose()
          torus1Mat.dispose()
          torus2Geo.dispose()
          torus2Mat.dispose()
          coreGeo.dispose()
          coreMat.dispose()
        },
      }
    }

    function createLocalScene(): SceneController {
      const g = new THREE.Group()

      // Silicon CPU Package
      const chipGeo = new THREE.BoxGeometry(1.7, 1.7, 0.22)
      const chipMat = new THREE.MeshStandardMaterial({
        color: 0x090e24,
        emissive: 0x22d3ee,
        emissiveIntensity: 0.45,
        roughness: 0.15,
        metalness: 0.95,
      })
      const chip = new THREE.Mesh(chipGeo, chipMat)
      g.add(chip)

      // Central Gold Tensor Core Die
      const dieGeo = new THREE.BoxGeometry(0.92, 0.92, 0.28)
      const dieMat = new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        emissive: 0xc084fc,
        emissiveIntensity: 0.85,
        roughness: 0.25,
        metalness: 0.9,
      })
      const die = new THREE.Mesh(dieGeo, dieMat)
      g.add(die)

      // Perimeter gold pin connectors
      const pinMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xd97706, emissiveIntensity: 0.5 })
      const pinGeo = new THREE.BoxGeometry(0.065, 0.065, 0.1)
      for (let i = -4; i <= 4; i++) {
        const topPin = new THREE.Mesh(pinGeo, pinMat)
        topPin.position.set(i * 0.18, 0.9, 0)
        g.add(topPin)

        const botPin = new THREE.Mesh(pinGeo, pinMat)
        botPin.position.set(i * 0.18, -0.9, 0)
        g.add(botPin)

        const leftPin = new THREE.Mesh(pinGeo, pinMat)
        leftPin.position.set(-0.9, i * 0.18, 0)
        g.add(leftPin)

        const rightPin = new THREE.Mesh(pinGeo, pinMat)
        rightPin.position.set(0.9, i * 0.18, 0)
        g.add(rightPin)
      }

      return {
        group: g,
        update: (time, mouse) => {
          g.rotation.y = time * 0.35 + mouse.x * 0.55
          g.rotation.x = Math.sin(time * 0.25) * 0.2 + mouse.y * 0.35 + 0.3
          dieMat.emissiveIntensity = 0.6 + Math.sin(time * 4) * 0.35
        },
        dispose: () => {
          chipGeo.dispose()
          chipMat.dispose()
          dieGeo.dispose()
          dieMat.dispose()
          pinGeo.dispose()
          pinMat.dispose()
        },
      }
    }

    // Pre-instantiate ALL 5 scene controllers upfront for instant zero-lag switching
    const scenes: Record<ModelMode, SceneController> = {
      neural: createNeuralScene(),
      voice: createVoiceScene(),
      rag: createRagScene(),
      latency: createLatencyScene(),
      local: createLocalScene(),
    }

    // Add all scene groups to modeContainer; make only 'neural' visible initially
    Object.entries(scenes).forEach(([key, controller]) => {
      modeContainer.add(controller.group)
      if (key === 'neural') {
        controller.group.visible = true
        controller.group.scale.set(1, 1, 1)
      } else {
        controller.group.visible = false
        controller.group.scale.set(0.01, 0.01, 0.01)
      }
    })

    let currentMode: ModelMode = 'neural'
    let isTransitioning = false

    // Smooth runtime scene switcher with zero stutter & zero memory thrashing
    function switchScene(newMode: ModelMode) {
      if (newMode === currentMode || isTransitioning) return
      isTransitioning = true

      const oldCtrl = scenes[currentMode]
      const nextCtrl = scenes[newMode]

      nextCtrl.group.visible = true
      nextCtrl.group.scale.set(0.2, 0.2, 0.2)

      const startTime = performance.now()
      const duration = 240

      function stepTransition(now: number) {
        const elapsed = now - startTime
        const t = Math.min(elapsed / duration, 1)
        const ease = 1 - Math.pow(1 - t, 3)

        // Fade & scale out old group
        oldCtrl.group.scale.setScalar(Math.max(0.01, 1 - ease))

        // Scale in next group
        const inScale = 0.2 + ease * 0.8
        nextCtrl.group.scale.setScalar(inScale)

        if (t < 1) {
          requestAnimationFrame(stepTransition)
        } else {
          oldCtrl.group.visible = false
          oldCtrl.group.scale.set(0.01, 0.01, 0.01)
          nextCtrl.group.scale.set(1, 1, 1)
          currentMode = newMode
          isTransitioning = false
        }
      }

      requestAnimationFrame(stepTransition)
    }

    switchSceneRef.current = switchScene

    // 3. Ambient Starfield Particle System - Arranged spherically around the model (no box clipping!)
    const particleCount = 75
    const particleGeo = new THREE.BufferGeometry()
    const posArray = new Float32Array(particleCount * 3)
    const colorArray = new Float32Array(particleCount * 3)

    const color1 = new THREE.Color(0x22d3ee)
    const color2 = new THREE.Color(0x818cf8)

    for (let i = 0; i < particleCount; i++) {
      // Confined strictly within radius 1.2 to 2.2 around center so it never hits the canvas edges
      const r = 1.2 + Math.random() * 1.0
      const theta = Math.random() * Math.PI * 2
      const phi = (Math.random() - 0.5) * Math.PI

      posArray[i * 3] = r * Math.cos(phi) * Math.cos(theta)
      posArray[i * 3 + 1] = r * Math.sin(phi)
      posArray[i * 3 + 2] = r * Math.cos(phi) * Math.sin(theta)

      const mixed = color1.clone().lerp(color2, Math.random())
      colorArray[i * 3] = mixed.r
      colorArray[i * 3 + 1] = mixed.g
      colorArray[i * 3 + 2] = mixed.b
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3))

    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    })

    const particleSystem = new THREE.Points(particleGeo, particleMat)
    scene.add(particleSystem)

    // Pre-compile all shaders so initial frame renders at 60fps with zero hesitation
    renderer.compile(scene, camera)

    // 4. Mouse / Touch Pointer Interaction
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
    let scrollY = 0

    const updatePointer = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect()
      const x = ((clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((clientY - rect.top) / rect.height) * 2 - 1)
      mouse.targetX = Math.max(-1, Math.min(1, x))
      mouse.targetY = Math.max(-1, Math.min(1, y))
      setIsInteracting(true)
    }

    const onPointerMove = (e: MouseEvent) => {
      updatePointer(e.clientX, e.clientY)
    }

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) updatePointer(e.touches[0].clientX, e.touches[0].clientY)
    }

    const onPointerLeave = () => {
      mouse.targetX = 0
      mouse.targetY = 0
      setIsInteracting(false)
    }

    const onScroll = () => {
      scrollY = window.scrollY || window.pageYOffset
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    container.addEventListener('mousemove', onPointerMove)
    container.addEventListener('mouseleave', onPointerLeave)
    container.addEventListener('touchmove', onTouchMove, { passive: true })
    container.addEventListener('touchend', onPointerLeave)

    // 5. Responsive Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width
        const h = entry.contentRect.height
        if (w > 0 && h > 0) {
          camera.aspect = w / h
          camera.updateProjectionMatrix()
          renderer.setSize(w, h)
        }
      }
    })
    resizeObserver.observe(container)

    // 6. Smooth 60fps Animation Loop with Clamped Delta
    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Smooth inertia
      mouse.x += (mouse.targetX - mouse.x) * 0.08
      mouse.y += (mouse.targetY - mouse.y) * 0.08
      const scrollProgress = Math.min(scrollY / 700, 1)

      if (!prefersReducedMotion) {
        // Update active scene
        const activeController = scenes[currentMode]
        if (activeController) {
          activeController.update(elapsedTime, mouse, scrollProgress)
        }
        particleSystem.rotation.y = elapsedTime * 0.03
        camera.position.z = 5.5 + scrollProgress * 0.7
      }

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('scroll', onScroll)
      container.removeEventListener('mousemove', onPointerMove)
      container.removeEventListener('mouseleave', onPointerLeave)
      container.removeEventListener('touchmove', onTouchMove)
      container.removeEventListener('touchend', onPointerLeave)
      resizeObserver.disconnect()
      Object.values(scenes).forEach((ctrl) => {
        modeContainer.remove(ctrl.group)
        ctrl.dispose()
      })
      particleGeo.dispose()
      particleMat.dispose()
      renderer.dispose()
    }
  }, []) // Mounts only ONCE!

  const handleModeChange = (newMode: ModelMode) => {
    if (newMode === activeMode) return
    setActiveMode(newMode)
    if (switchSceneRef.current) {
      switchSceneRef.current(newMode)
    }
  }

  return (
    <div
      ref={containerRef}
      className={`hero-visual-3d${isInteracting ? ' is-interacting' : ''}`}
      role="region"
      aria-label="Interactive 3D WebGL AI Studio"
    >
      {/* Sleek 3D Scene Selector Toolbar */}
      <nav className="webgl-mode-selector" aria-label="3D model views">
        {MODES.map((item) => {
          const Icon = item.icon
          const isActive = activeMode === item.id
          return (
            <button
              key={item.id}
              type="button"
              className={`mode-btn${isActive ? ' is-active' : ''}`}
              onClick={() => handleModeChange(item.id)}
              title={item.title}
              aria-pressed={isActive}
            >
              <Icon size={12} className="mode-btn-icon" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Seamless WebGL Canvas with Circular Feathering */}
      <canvas ref={canvasRef} className="hero-visual-3d__canvas" />

      {/* Minimalist Transparent Hint (No box, no border) */}
      <p className="hero-visual-3d__hint">
        <span>✦</span> Drag to rotate
      </p>
    </div>
  )
}
