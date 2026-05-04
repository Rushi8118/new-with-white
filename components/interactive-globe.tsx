"use client"

import { useRef, useState, useMemo, useCallback, Suspense, lazy } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Stars, Html, Text, Billboard } from "@react-three/drei"
import * as THREE from "three"
import { motion, AnimatePresence } from "framer-motion"

interface CountryMarker {
  id: string
  name: string
  lat: number
  lng: number
  flag: string
  slug: string
}

interface GlobeProps {
  markers?: CountryMarker[]
  onCountryClick?: (country: CountryMarker) => void
  hoveredCountry?: CountryMarker | null
  setHoveredCountry?: (c: CountryMarker | null) => void
}

// Earth radius constant
const EARTH_RADIUS = 2

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)
  return new THREE.Vector3(x, y, z)
}

// Atmosphere glow shader
function Atmosphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
          gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity * 1.5;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    })
  }, [])

  return (
    <mesh ref={meshRef} material={atmosphereMaterial} scale={[1.15, 1.15, 1.15]}>
      <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
    </mesh>
  )
}

// Earth sphere with realistic look
function Earth() {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  // Auto-rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05
    }
  })

  // Earth texture using data URL approach - create a procedural earth-like texture
  const earthTexture = useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext("2d")!
    
    // Ocean base
    ctx.fillStyle = "#1a3a5c"
    ctx.fillRect(0, 0, 1024, 512)
    
    // Add landmasses (simplified procedural)
    const landColor = "#2d5016"
    ctx.fillStyle = landColor
    
    // Rough continents approximation
    const continents = [
      { x: 150, y: 120, w: 200, h: 180 }, // Americas
      { x: 420, y: 100, w: 180, h: 140 }, // Europe
      { x: 450, y: 200, w: 120, h: 180 }, // Africa
      { x: 580, y: 80, w: 300, h: 200 },  // Asia
      { x: 750, y: 280, w: 120, h: 100 }, // Australia
    ]
    
    continents.forEach(c => {
      ctx.beginPath()
      ctx.ellipse(c.x, c.y, c.w / 2, c.h / 2, 0, 0, Math.PI * 2)
      ctx.fill()
    })
    
    // Add some noise/texture
    for (let i = 0; i < 5000; i++) {
      const x = Math.random() * 1024
      const y = Math.random() * 512
      const size = Math.random() * 3
      ctx.fillStyle = Math.random() > 0.5 ? "#1e4d2b" : "#3a6b3a"
      ctx.fillRect(x, y, size, size)
    }
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.ClampToEdgeWrapping
    return texture
  }, [])

  const bumpMap = useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 512
    canvas.height = 256
    const ctx = canvas.getContext("2d")!
    ctx.fillStyle = "#808080"
    ctx.fillRect(0, 0, 512, 256)
    
    for (let i = 0; i < 2000; i++) {
      const x = Math.random() * 512
      const y = Math.random() * 256
      const gray = Math.floor(Math.random() * 100 + 100)
      ctx.fillStyle = `rgb(${gray},${gray},${gray})`
      ctx.fillRect(x, y, Math.random() * 4 + 1, Math.random() * 4 + 1)
    }
    
    return new THREE.CanvasTexture(canvas)
  }, [])

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          bumpMap={bumpMap}
          bumpScale={0.05}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      <Atmosphere />
    </group>
  )
}

// Country marker with pulsing glow
function CountryMarkerDot({
  marker,
  onClick,
  onHover,
  isHovered,
}: {
  marker: CountryMarker
  onClick: (m: CountryMarker) => void
  onHover: (m: CountryMarker | null) => void
  isHovered: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const position = latLngToVector3(marker.lat, marker.lng, EARTH_RADIUS)
  
  // Pulse animation
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 2 + marker.lat) * 0.2
      meshRef.current.scale.setScalar(scale)
    }
  })

  return (
    <group position={position}>
      {/* Pulsing dot */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation()
          onClick(marker)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          onHover(marker)
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
          onHover(null)
          document.body.style.cursor = "default"
        }}
      >
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color={isHovered ? "#ffaa33" : "#ffdd44"} />
      </mesh>
      
      {/* Glow ring */}
      <mesh scale={[1.5, 1.5, 1.5]}>
        <ringGeometry args={[0.03, 0.05, 32]} />
        <meshBasicMaterial
          color={isHovered ? "#ffaa33" : "#ffdd44"}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Label when hovered */}
      {isHovered && (
        <Billboard>
          <Html distanceFactor={8} position={[0, 0.15, 0]} center>
            <div className="pointer-events-none whitespace-nowrap rounded-full border border-[#ffdd44]/50 bg-black/80 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
              {marker.flag} {marker.name}
            </div>
          </Html>
        </Billboard>
      )}
    </group>
  )
}

// Connection arcs between countries
function ConnectionArcs({ markers }: { markers: CountryMarker[] }) {
  const connections = useMemo(() => {
    const arcs: Array<[CountryMarker, CountryMarker]> = []
    // Connect India (approx center) to other countries
    const india = markers.find(m => m.slug === "india")
    if (india) {
      markers.forEach(m => {
        if (m.slug !== "india") arcs.push([india, m])
      })
    }
    return arcs
  }, [markers])

  return (
    <>
      {connections.map(([start, end], i) => {
        const startPos = latLngToVector3(start.lat, start.lng, EARTH_RADIUS + 0.02)
        const endPos = latLngToVector3(end.lat, end.lng, EARTH_RADIUS + 0.02)
        const mid = startPos.clone().add(endPos).multiplyScalar(0.5)
        mid.normalize().multiplyScalar(EARTH_RADIUS * 1.3)
        
        const curve = new THREE.QuadraticBezierCurve3(startPos, mid, endPos)
        const points = curve.getPoints(50)
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        
        return (
          <line key={`${start.id}-${end.id}`} geometry={geometry}>
            <lineBasicMaterial
              color="#ffdd44"
              transparent
              opacity={0.15}
              linewidth={1}
            />
          </line>
        )
      })}
    </>
  )
}

// Main scene
function Scene({
  markers,
  onCountryClick,
  hoveredCountry,
  setHoveredCountry,
}: GlobeProps) {
  const { camera } = useThree()
  
  // Initial camera position
  useMemo(() => {
    camera.position.set(0, 0, 6)
  }, [camera])

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-5, -3, -5]} intensity={0.3} color="#4455aa" />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#ffddaa" />
      
      {/* Stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0.5} fade speed={1} />
      
      {/* Earth */}
      <Earth />
      
      {/* Connection arcs */}
      <ConnectionArcs markers={markers || []} />
      
      {/* Country markers */}
      {markers?.map((marker) => (
        <CountryMarkerDot
          key={marker.id}
          marker={marker}
          onClick={onCountryClick || (() => {})}
          onHover={setHoveredCountry || (() => {})}
          isHovered={hoveredCountry?.id === marker.id}
        />
      ))}
      
      {/* Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3.5}
        maxDistance={10}
        rotateSpeed={0.5}
        zoomSpeed={0.8}
        autoRotate={false}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  )
}

// Loading fallback
function GlobeLoader() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#ffdd44]/30 border-t-[#ffdd44]" />
    </div>
  )
}

// Main export component
interface InteractiveGlobeProps {
  className?: string
  onCountryClick?: (country: CountryMarker) => void
}

const DEFAULT_MARKERS: CountryMarker[] = [
  { id: "1", name: "Japan", lat: 36.2048, lng: 138.2529, flag: "🇯🇵", slug: "japan" },
  { id: "2", name: "Australia", lat: -25.2744, lng: 133.7751, flag: "🇦🇺", slug: "australia" },
  { id: "3", name: "Canada", lat: 56.1304, lng: -106.3468, flag: "🇨🇦", slug: "canada" },
  { id: "4", name: "United Kingdom", lat: 55.3781, lng: -3.4360, flag: "🇬🇧", slug: "united-kingdom" },
  { id: "5", name: "Germany", lat: 51.1657, lng: 10.4515, flag: "🇩🇪", slug: "germany" },
  { id: "6", name: "New Zealand", lat: -40.9006, lng: 174.8860, flag: "🇳🇿", slug: "new-zealand" },
  { id: "7", name: "Russia", lat: 61.5240, lng: 105.3188, flag: "🇷🇺", slug: "russia" },
  { id: "8", name: "United States", lat: 37.0902, lng: -95.7129, flag: "🇺🇸", slug: "united-states" },
  { id: "9", name: "India", lat: 20.5937, lng: 78.9629, flag: "🇮🇳", slug: "india" },
  { id: "10", name: "UAE", lat: 23.4241, lng: 53.8478, flag: "🇦🇪", slug: "united-arab-emirates" },
]

export function InteractiveGlobe({ className = "", onCountryClick }: InteractiveGlobeProps) {
  const [hoveredCountry, setHoveredCountry] = useState<CountryMarker | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<CountryMarker | null>(null)

  const handleCountryClick = useCallback(
    (country: CountryMarker) => {
      setSelectedCountry(country)
      onCountryClick?.(country)
    },
    [onCountryClick]
  )

  return (
    <div className={`relative ${className}`}>
      <Suspense fallback={<GlobeLoader />}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          style={{ background: "transparent" }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene
            markers={DEFAULT_MARKERS}
            onCountryClick={handleCountryClick}
            hoveredCountry={hoveredCountry}
            setHoveredCountry={setHoveredCountry}
          />
        </Canvas>
      </Suspense>

      {/* Info Panel Overlay */}
      <AnimatePresence>
        {selectedCountry && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 rounded-2xl border border-[#ffdd44]/30 bg-black/80 p-5 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedCountry.flag}</span>
                <h3 className="text-lg font-semibold text-white">{selectedCountry.name}</h3>
              </div>
              <button
                onClick={() => setSelectedCountry(null)}
                className="rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white transition"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-white/70 mb-4">
              Explore visa programs and opportunities in {selectedCountry.name}.
            </p>
            <div className="flex gap-2">
              <a
                href={`/countries/${selectedCountry.slug}`}
                className="flex-1 rounded-full bg-[#ffdd44] px-4 py-2 text-center text-sm font-semibold text-black transition hover:bg-[#ffcc33]"
              >
                View Details
              </a>
              <a
                href={`/contact?country=${selectedCountry.slug}`}
                className="flex-1 rounded-full border border-white/30 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-white/10"
              >
                Book Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/60 px-3 py-1.5 text-[10px] text-white/60 backdrop-blur-md">
        🖱️ Drag to rotate · Scroll to zoom · Click markers
      </div>
    </div>
  )
}

export default InteractiveGlobe
