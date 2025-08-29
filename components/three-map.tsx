"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface MapPoint {
  name: string
  nameEn: string
  coordinates: [number, number] // [latitude, longitude]
  position: [number, number, number] // 3D position calculated from coordinates
  color: string
  description: string
  elevation: number
  type: "start" | "transit" | "destination" | "attraction"
  googleMapsUrl: string
}

const mapPoints: MapPoint[] = [
  {
    name: "กรุงเทพฯ",
    nameEn: "Bangkok",
    coordinates: [13.7563, 100.5018],
    position: [0, 0, 0], // Will be calculated
    color: "#22c55e",
    description: "จุดเริ่มต้นการเดินทาง - เมืองหลวงของไทย",
    elevation: 2,
    type: "start",
    googleMapsUrl: "https://maps.google.com/?q=13.7563,100.5018",
  },
  {
    name: "คุนหมิง",
    nameEn: "Kunming",
    coordinates: [25.0389, 102.7183],
    position: [0, 0, 0], // Will be calculated
    color: "#3b82f6",
    description: "เมืองแห่งดอกไม้นิรันดร์ - เมืองหลวงของมณฑลยูนนาน",
    elevation: 1892,
    type: "transit",
    googleMapsUrl: "https://maps.google.com/?q=25.0389,102.7183",
  },
  {
    name: "ต้าลี่",
    nameEn: "Dali",
    coordinates: [25.7041, 100.167],
    position: [0, 0, 0], // Will be calculated
    color: "#8b5cf6",
    description: "เมืองโบราณริมทะเลสาบเอ๋อไห่ - มรดกทางวัฒนธรรม",
    elevation: 1976,
    type: "attraction",
    googleMapsUrl: "https://maps.google.com/?q=25.7041,100.1670",
  },
  {
    name: "ลี่เจียง",
    nameEn: "Lijiang",
    coordinates: [26.8721, 100.2277],
    position: [0, 0, 0], // Will be calculated
    color: "#8b5cf6",
    description: "มรดกโลกยูเนสโก - เมืองโบราณของชาวนาซี",
    elevation: 2418,
    type: "attraction",
    googleMapsUrl: "https://maps.google.com/?q=26.8721,100.2277",
  },
  {
    name: "ชางกรีลา",
    nameEn: "Shangri-La",
    coordinates: [27.8269, 99.7065],
    position: [0, 0, 0], // Will be calculated
    color: "#f59e0b",
    description: "เมืองในฝันแห่งหิมาลัย - ประตูสู่ทิเบต",
    elevation: 3200,
    type: "attraction",
    googleMapsUrl: "https://maps.google.com/?q=27.8269,99.7065",
  },
  {
    name: "ลาซา",
    nameEn: "Lhasa",
    coordinates: [29.6516, 91.1611],
    position: [0, 0, 0], // Will be calculated
    color: "#ef4444",
    description: "เมืองหลวงของทิเบต - ที่ตั้งของพระราชวังโปตาลา",
    elevation: 3650,
    type: "destination",
    googleMapsUrl: "https://maps.google.com/?q=29.6516,91.1611",
  },
]

function coordinatesToPosition(lat: number, lng: number, baseLat: number, baseLng: number): [number, number, number] {
  const scale = 0.1
  const x = (lng - baseLng) * scale
  const z = (lat - baseLat) * scale
  const y = 0

  return [x, y, z]
}

const baseCoordinates = mapPoints[0].coordinates
mapPoints.forEach((point) => {
  const [x, y, z] = coordinatesToPosition(
    point.coordinates[0],
    point.coordinates[1],
    baseCoordinates[0],
    baseCoordinates[1],
  )
  point.position = [x, (point.elevation / 1000) * 0.5, z]
})

export default function ThreeMap() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const controlsRef = useRef<OrbitControls>()
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null)
  const [isJourneyMode, setIsJourneyMode] = useState(false)
  const [currentJourneyStep, setCurrentJourneyStep] = useState(0)
  const animationMixerRef = useRef<THREE.AnimationMixer>()
  const labelRendererRef = useRef<CSS2DRenderer>()

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const gradientTexture = new THREE.CanvasTexture(createGradientCanvas())
    scene.background = gradientTexture
    sceneRef.current = scene

    const cloudGroup = new THREE.Group()
    for (let i = 0; i < 15; i++) {
      const cloudGeometry = new THREE.SphereGeometry(0.3, 8, 6)
      const cloudMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.6,
      })
      const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial)

      cloud.position.set((Math.random() - 0.5) * 12, 2 + Math.random() * 2, (Math.random() - 0.5) * 10)
      cloud.scale.setScalar(0.5 + Math.random() * 0.5)
      cloudGroup.add(cloud)
    }
    scene.add(cloudGroup)

    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.set(0, 4, 3)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    rendererRef.current = renderer
    mountRef.current.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true // Smooth camera movements
    controls.dampingFactor = 0.05
    controls.screenSpacePanning = false

    // Set limits like Google Maps
    controls.minDistance = 1 // Minimum zoom in
    controls.maxDistance = 20 // Maximum zoom out
    controls.maxPolarAngle = Math.PI / 2.2 // Prevent going below ground
    controls.minPolarAngle = Math.PI / 6 // Prevent going too high

    // Enable auto rotation (optional)
    controls.autoRotate = false
    controls.autoRotateSpeed = 0.5

    // Mouse/touch sensitivity
    controls.rotateSpeed = 0.5
    controls.zoomSpeed = 1.2
    controls.panSpeed = 0.8

    controlsRef.current = controls

    const mountainGroup = new THREE.Group()
    for (let i = 0; i < 8; i++) {
      const mountainGeometry = new THREE.ConeGeometry(0.3 + Math.random() * 0.4, 0.8 + Math.random() * 1.2, 6)
      const mountainMaterial = new THREE.MeshLambertMaterial({
        color: new THREE.Color().setHSL(0.1, 0.3, 0.4 + Math.random() * 0.3),
      })
      const mountain = new THREE.Mesh(mountainGeometry, mountainMaterial)

      mountain.position.set(
        (Math.random() - 0.5) * 8,
        mountain.geometry.parameters.height / 2 - 0.5,
        (Math.random() - 0.5) * 6,
      )
      mountain.castShadow = true
      mountainGroup.add(mountain)
    }
    scene.add(mountainGroup)

    const ambientLight = new THREE.AmbientLight(0x87ceeb, 0.8)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
    directionalLight.position.set(5, 10, 5)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    const oceanGeometry = new THREE.PlaneGeometry(8, 6)
    const oceanMaterial = new THREE.MeshLambertMaterial({
      color: 0x4a90e2,
      transparent: true,
      opacity: 0.3,
    })
    const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial)
    ocean.rotation.x = -Math.PI / 2
    ocean.position.y = -0.5
    scene.add(ocean)

    const pointMeshes: THREE.Group[] = []
    const routeLines: THREE.Line[] = []

    mapPoints.forEach((point, index) => {
      const markerGroup = new THREE.Group()

      const geometry = new THREE.SphereGeometry(0.08, 16, 16)
      const material = new THREE.MeshLambertMaterial({
        color: point.color,
        emissive: point.color,
        emissiveIntensity: 0.2,
      })
      const sphere = new THREE.Mesh(geometry, material)
      sphere.castShadow = true

      if (point.type === "destination") {
        const templeGeometry = new THREE.BoxGeometry(0.15, 0.2, 0.15)
        const templeMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 })
        const temple = new THREE.Mesh(templeGeometry, templeMaterial)
        temple.position.y = 0.15
        markerGroup.add(temple)

        const roofGeometry = new THREE.ConeGeometry(0.12, 0.08, 4)
        const roofMaterial = new THREE.MeshLambertMaterial({ color: 0xffd700 })
        const roof = new THREE.Mesh(roofGeometry, roofMaterial)
        roof.position.y = 0.28
        markerGroup.add(roof)
      } else if (point.type === "start") {
        for (let i = 0; i < 3; i++) {
          const buildingGeometry = new THREE.BoxGeometry(0.04, 0.1 + Math.random() * 0.1, 0.04)
          const buildingMaterial = new THREE.MeshLambertMaterial({
            color: new THREE.Color().setHSL(0.6, 0.3, 0.5 + Math.random() * 0.3),
          })
          const building = new THREE.Mesh(buildingGeometry, buildingMaterial)
          building.position.set(
            (Math.random() - 0.5) * 0.2,
            building.geometry.parameters.height / 2,
            (Math.random() - 0.5) * 0.2,
          )
          markerGroup.add(building)
        }
      } else if (point.type === "attraction") {
        const pagodaGeometry = new THREE.CylinderGeometry(0.06, 0.08, 0.15, 8)
        const pagodaMaterial = new THREE.MeshLambertMaterial({ color: 0xdc143c })
        const pagoda = new THREE.Mesh(pagodaGeometry, pagodaMaterial)
        pagoda.position.y = 0.1
        markerGroup.add(pagoda)
      }

      const ringGeometry = new THREE.RingGeometry(0.1, 0.15, 16)
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: point.color,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
      })
      const ring = new THREE.Mesh(ringGeometry, ringMaterial)
      ring.rotation.x = -Math.PI / 2

      if (point.type === "destination" || point.type === "start") {
        const particleGeometry = new THREE.BufferGeometry()
        const particleCount = 20
        const positions = new Float32Array(particleCount * 3)

        for (let i = 0; i < particleCount * 3; i += 3) {
          positions[i] = (Math.random() - 0.5) * 0.8
          positions[i + 1] = Math.random() * 0.5
          positions[i + 2] = (Math.random() - 0.5) * 0.8
        }

        particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
        const particleMaterial = new THREE.PointsMaterial({
          color: point.color,
          size: 0.02,
          transparent: true,
          opacity: 0.6,
        })
        const particles = new THREE.Points(particleGeometry, particleMaterial)
        markerGroup.add(particles)
      }

      markerGroup.add(sphere)
      markerGroup.add(ring)
      markerGroup.position.set(...point.position)
      markerGroup.userData = { point, index, originalY: point.position[1] }
      scene.add(markerGroup)
      pointMeshes.push(markerGroup)

      if (index < mapPoints.length - 1) {
        const nextPoint = mapPoints[index + 1]
        const curve = createCurvedPath(point.position, nextPoint.position)
        const points = curve.getPoints(50)
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0xff6b35,
          linewidth: 4,
          transparent: true,
          opacity: 0.8,
        })
        const line = new THREE.Line(lineGeometry, lineMaterial)
        scene.add(line)
        routeLines.push(line)
      }

      const labelDiv = createHTMLLabel(point)
      const labelObject = new CSS2DObject(labelDiv)
      labelObject.position.set(point.position[0], point.position[1] + 0.3, point.position[2])
      scene.add(labelObject)
    })

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const handleClick = (event: MouseEvent) => {
      if (controlsRef.current && controlsRef.current.getDistance() !== controlsRef.current.minDistance) return // Check if camera moved during click

      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(pointMeshes, true)

      if (intersects.length > 0) {
        const clickedObject = intersects[0].object.parent || intersects[0].object
        const pointData = clickedObject.userData.point
        if (pointData) {
          setSelectedPoint(pointData)
        }
      }
    }

    renderer.domElement.addEventListener("click", handleClick)

    const labelRenderer = new CSS2DRenderer()
    labelRenderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    labelRenderer.domElement.style.position = "absolute"
    labelRenderer.domElement.style.top = "0px"
    labelRenderer.domElement.style.pointerEvents = "none"
    mountRef.current.appendChild(labelRenderer.domElement)
    labelRendererRef.current = labelRenderer

    let animationId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      const time = clock.getElapsedTime()

      controlsRef.current?.update()

      cloudGroup.children.forEach((cloud, index) => {
        cloud.position.x += Math.sin(time * 0.1 + index) * 0.001
        cloud.position.z += Math.cos(time * 0.1 + index) * 0.001
        cloud.rotation.y += delta * 0.1
      })

      pointMeshes.forEach((marker, index) => {
        const originalY = marker.userData.originalY
        marker.position.y = originalY + Math.sin(time * 2 + index * 0.5) * 0.1

        const ring = marker.children.find((child) => child.geometry?.type === "RingGeometry")
        if (ring) {
          ring.rotation.z += delta * 0.5
        }

        const particles = marker.children.find((child) => child.type === "Points")
        if (particles) {
          particles.rotation.y += delta * 0.3
        }
      })

      if (isJourneyMode && currentJourneyStep < mapPoints.length) {
        if (controlsRef.current) {
          controlsRef.current.enabled = false
        }
        const targetPoint = mapPoints[currentJourneyStep]
        const targetPosition = new THREE.Vector3(...targetPoint.position)
        targetPosition.y += 1
        targetPosition.z += 1

        camera.position.lerp(targetPosition, delta * 0.5)
        camera.lookAt(targetPoint.position[0], targetPoint.position[1], targetPoint.position[2])
      } else {
        if (controlsRef.current) {
          controlsRef.current.enabled = true
        }
      }

      renderer.render(scene, camera)
      labelRenderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current || !labelRendererRef.current) return

      cameraRef.current.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
      labelRendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      renderer.domElement.removeEventListener("click", handleClick)
      window.removeEventListener("resize", handleResize)
      controlsRef.current?.dispose()
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement)
      }
      if (mountRef.current && labelRendererRef.current) {
        mountRef.current.removeChild(labelRendererRef.current.domElement)
      }
      rendererRef.current?.dispose()
      cancelAnimationFrame(animationId)
    }
  }, [isJourneyMode, currentJourneyStep])

  function createGradientCanvas(): HTMLCanvasElement {
    const canvas = document.createElement("canvas")
    canvas.width = 512
    canvas.height = 512
    const context = canvas.getContext("2d")!

    const gradient = context.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, "#FFE4B5") // Light golden sky
    gradient.addColorStop(0.3, "#87ceeb") // Sky blue
    gradient.addColorStop(0.7, "#4a90e2") // Ocean blue
    gradient.addColorStop(1, "#2c5aa0") // Deep blue

    context.fillStyle = gradient
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.globalAlpha = 0.1
    for (let i = 0; i < 8; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height * 0.6
      const radius = 30 + Math.random() * 50

      const cloudGradient = context.createRadialGradient(x, y, 0, x, y, radius)
      cloudGradient.addColorStop(0, "white")
      cloudGradient.addColorStop(1, "transparent")

      context.fillStyle = cloudGradient
      context.beginPath()
      context.arc(x, y, radius, 0, Math.PI * 2)
      context.fill()
    }

    return canvas
  }

  function createCurvedPath(start: number[], end: number[]): THREE.CatmullRomCurve3 {
    const startVec = new THREE.Vector3(...start)
    const endVec = new THREE.Vector3(...end)
    const midPoint = startVec.clone().lerp(endVec, 0.5)
    midPoint.y += 0.5 // Create arc

    return new THREE.CatmullRomCurve3([startVec, midPoint, endVec])
  }

  function createHTMLLabel(point: MapPoint): HTMLDivElement {
    const div = document.createElement("div")
    div.className = "bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-white/20"
    div.innerHTML = `
      <div class="text-sm font-semibold text-gray-800">${point.name}</div>
      <div class="text-xs text-gray-600">${point.nameEn}</div>
    `
    return div
  }

  const startJourney = () => {
    setIsJourneyMode(true)
    setCurrentJourneyStep(0)

    const interval = setInterval(() => {
      setCurrentJourneyStep((prev) => {
        if (prev >= mapPoints.length - 1) {
          clearInterval(interval)
          setIsJourneyMode(false)
          return 0
        }
        return prev + 1
      })
    }, 2000)
  }

  const resetView = () => {
    if (cameraRef.current && controlsRef.current) {
      const targetPosition = new THREE.Vector3(0, 4, 3)
      const targetLookAt = new THREE.Vector3(0, 0, 0)

      const startPosition = cameraRef.current.position.clone()
      const startTime = Date.now()
      const duration = 1000 // 1 second

      const animateReset = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeProgress = 1 - Math.pow(1 - progress, 3) // Ease out cubic

        cameraRef.current.position.lerpVectors(startPosition, targetPosition, easeProgress)
        controlsRef.current.target.lerp(targetLookAt, easeProgress)
        controlsRef.current.update()

        if (progress < 1) {
          requestAnimationFrame(animateReset)
        }
      }

      animateReset()
      setIsJourneyMode(false)
      setCurrentJourneyStep(0)
      setSelectedPoint(null)
    }
  }

  return (
    <div className="w-full space-y-6">
      <div className="relative">
        <div
          ref={mountRef}
          className="w-full h-[600px] rounded-xl border border-border overflow-hidden bg-gradient-to-b from-sky-200 to-blue-400"
        />

        <div className="absolute top-4 right-4 space-y-2">
          <Button
            onClick={startJourney}
            className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg"
            disabled={isJourneyMode}
          >
            {isJourneyMode ? "กำลังเดินทาง..." : "🚂 เริ่มการเดินทาง"}
          </Button>
          <Button onClick={resetView} variant="secondary" size="sm" className="bg-white/90 hover:bg-white shadow-lg">
            🔄 รีเซ็ตมุมมอง
          </Button>
        </div>

        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg">
          <h4 className="font-semibold mb-2 text-sm text-gray-800">🎮 การควบคุม</h4>
          <div className="space-y-1 text-xs text-gray-600">
            <div>🖱️ ลากเมาส์: หมุนมุมมอง</div>
            <div>🔄 ล้อเมาส์: ซูมเข้า/ออก</div>
            <div>📱 สัมผัส: หยิก/ลากเพื่อควบคุม</div>
          </div>
        </div>

        {isJourneyMode && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">
                {mapPoints[currentJourneyStep]?.name} ({currentJourneyStep + 1}/{mapPoints.length})
              </span>
            </div>
          </div>
        )}

        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg">
          <h4 className="font-semibold mb-3 text-sm text-gray-800">🗺️ เส้นทางการเดินทาง</h4>
          <div className="space-y-2 text-xs">
            {mapPoints.map((point, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: point.color }}></div>
                <span className="text-gray-700">{point.name}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500">💡 คลิกที่จุดต่างๆ เพื่อดูรายละเอียด</p>
            <p className="text-xs text-gray-500">🎮 ลากเมาส์เพื่อหมุน ล้อเมาส์เพื่อซูม</p>
          </div>
        </div>
      </div>

      {selectedPoint && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                {selectedPoint.name} ({selectedPoint.nameEn})
              </span>
              <Badge
                variant={
                  selectedPoint.type === "start"
                    ? "default"
                    : selectedPoint.type === "destination"
                      ? "destructive"
                      : selectedPoint.type === "transit"
                        ? "secondary"
                        : "outline"
                }
              >
                {selectedPoint.type === "start"
                  ? "จุดเริ่มต้น"
                  : selectedPoint.type === "destination"
                    ? "จุดหมาย"
                    : selectedPoint.type === "transit"
                      ? "จุดเชื่อมต่อ"
                      : "สถานที่ท่องเที่ยว"}
              </Badge>
            </CardTitle>
            <CardDescription>{selectedPoint.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">ความสูง:</span>
                <p className="font-semibold">{selectedPoint.elevation.toLocaleString()} เมตร</p>
              </div>
              <div>
                <span className="text-muted-foreground">พิกัด:</span>
                <p className="font-semibold">
                  {selectedPoint.coordinates[0].toFixed(4)}, {selectedPoint.coordinates[1].toFixed(4)}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(selectedPoint.googleMapsUrl, "_blank")}
                className="w-full"
              >
                ดูใน Google Maps
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">ระยะทางรวม</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">~3,500 กม.</div>
            <p className="text-sm text-muted-foreground">จากกรุงเทพฯ ถึงลาซา</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">เวลาเดินทาง</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">7-10 วัน</div>
            <p className="text-sm text-muted-foreground">รวมการพักผ่อนระหว่างทาง</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">ความสูงสูงสุด</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">5,072 ม.</div>
            <p className="text-sm text-muted-foreground">จุดสูงสุดของรถไฟทิเบต</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>วิธีใช้แผนที่ 3D</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">การควบคุมแผนที่</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>
                  • <strong>ลากเมาส์ซ้าย:</strong> หมุนมุมมองรอบแผนที่
                </li>
                <li>
                  • <strong>ล้อเมาส์:</strong> ซูมเข้า/ออก (เหมือน Google Maps)
                </li>
                <li>
                  • <strong>ลากเมาส์ขวา:</strong> เลื่อนแผนที่ (Pan)
                </li>
                <li>
                  • <strong>มือถือ:</strong> หยิกเพื่อซูม, ลากเพื่อหมุน
                </li>
                <li>• คลิกที่จุดต่างๆ เพื่อดูข้อมูลและพิกัด Google Maps</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">ฟีเจอร์พิเศษ</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• คลิกปุ่ม "🚂 เริ่มการเดินทาง" เพื่อชมเส้นทางแบบ cinematic</li>
                <li>• คลิกปุ่ม "🔄 รีเซ็ตมุมมอง" เพื่อกลับสู่มุมมองเริ่มต้น</li>
                <li>• การเคลื่อนไหวแบบ smooth damping เหมือน Google Maps</li>
                <li>• จำกัดการซูมและหมุนเพื่อประสบการณ์ที่ดี</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
