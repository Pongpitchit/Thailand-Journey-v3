"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface MapPoint {
  name: string
  nameEn: string
  coordinates: [number, number]
  color: string
  description: string
  elevation: number
  type: "start" | "transit" | "destination" | "attraction"
  googleMapsUrl: string
}

interface MapboxMapProps {
  accessToken: string
}

const mapPoints: MapPoint[] = [
  {
    name: "กรุงเทพฯ",
    nameEn: "Bangkok",
    coordinates: [100.5018, 13.7563],
    color: "#22c55e",
    description: "จุดเริ่มต้นการเดินทาง - เมืองหลวงของไทย",
    elevation: 2,
    type: "start",
    googleMapsUrl: "https://maps.google.com/?q=13.7563,100.5018",
  },
  {
    name: "คุนหมิง",
    nameEn: "Kunming",
    coordinates: [102.7183, 25.0389],
    color: "#3b82f6",
    description: "เมืองแห่งดอกไม้นิรันดร์ - เมืองหลวงของมณฑลยูนนาน",
    elevation: 1892,
    type: "transit",
    googleMapsUrl: "https://maps.google.com/?q=25.0389,102.7183",
  },
  {
    name: "ต้าลี่",
    nameEn: "Dali",
    coordinates: [100.167, 25.7041],
    color: "#8b5cf6",
    description: "เมืองโบราณริมทะเลสาบเอ๋อไห่ - มรดกทางวัฒนธรรม",
    elevation: 1976,
    type: "attraction",
    googleMapsUrl: "https://maps.google.com/?q=25.7041,100.1670",
  },
  {
    name: "ลี่เจียง",
    nameEn: "Lijiang",
    coordinates: [100.2277, 26.8721],
    color: "#8b5cf6",
    description: "มรดกโลกยูเนสโก - เมืองโบราณของชาวนาซี",
    elevation: 2418,
    type: "attraction",
    googleMapsUrl: "https://maps.google.com/?q=26.8721,100.2277",
  },
  {
    name: "ชางกรีลา",
    nameEn: "Shangri-La",
    coordinates: [99.7065, 27.8269],
    color: "#f59e0b",
    description: "เมืองในฝันแห่งหิมาลัย - ประตูสู่ทิเบต",
    elevation: 3200,
    type: "attraction",
    googleMapsUrl: "https://maps.google.com/?q=27.8269,99.7065",
  },
  {
    name: "ลาซา",
    nameEn: "Lhasa",
    coordinates: [91.1611, 29.6516],
    color: "#ef4444",
    description: "เมืองหลวงของทิเบต - ที่ตั้งของพระราชวังโปตาลา",
    elevation: 3650,
    type: "destination",
    googleMapsUrl: "https://maps.google.com/?q=29.6516,91.1611",
  },
]

// ✅ SVG icon สำหรับ marker
const getIconSymbol = (type: string) => {
  switch (type) {
    case "start":
      return `<img src="https://www.svgrepo.com/show/476832/airplane-take-off.svg" width="18" height="18" />` // เมือง
    case "destination":
      return `<img src="https://www.svgrepo.com/show/420536/architecture-landscape.svg" width="18" height="18" />` // ภูเขา
    case "transit":
      return `<img src="https://www.svgrepo.com/show/476803/tram.svg" width="18" height="18" />` // รถไฟ
    case "attraction":
      return `<img src="https://www.svgrepo.com/show/476890/map-marker.svg" width="18" height="18" />` // landmark
    case "attraction1":
      return `<img src="https://www.svgrepo.com/show/500063/garden.svg" width="18" height="18" />` // garden
    default:
      return `<img src="https://www.svgrepo.com/show/530630/emu.svg" width="18" height="18" />` // default
  }
}

export default function MapboxMap({ accessToken }: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null)
  const [isJourneyMode, setIsJourneyMode] = useState(false)
  const [currentJourneyStep, setCurrentJourneyStep] = useState(0)
  const [mapboxgl, setMapboxgl] = useState<any>(null)

  // โหลด Mapbox
  useEffect(() => {
    const loadMapbox = async () => {
      if (typeof window !== "undefined" && accessToken) {
        const mapboxgl = await import("mapbox-gl")
        await import("mapbox-gl/dist/mapbox-gl.css")

        mapboxgl.default.accessToken = accessToken

        setMapboxgl(mapboxgl.default)
      }
    }
    loadMapbox()
  }, [accessToken])

  // สร้างแผนที่
  useEffect(() => {
    if (!mapboxgl || !mapContainer.current || map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [96.0, 22.0],
      zoom: 5,
      projection: "globe",
    })

    map.current.on("load", () => {
      const routeCoordinates = mapPoints.map((p) => p.coordinates)

      map.current.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: { type: "LineString", coordinates: routeCoordinates },
        },
      })

      map.current.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-color": "#ff6b35", "line-width": 4, "line-opacity": 0.8, "line-dasharray": [2, 2] },
      })

      // ✅ Marker + Icon SVG
      mapPoints.forEach((point) => {
        const markerElement = document.createElement("div")
        markerElement.className = "custom-marker"
        markerElement.style.cssText = `
          background-color: ${point.color};
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        `
        markerElement.innerHTML = getIconSymbol(point.type)

        markerElement.addEventListener("click", () => setSelectedPoint(point))

        new mapboxgl.Marker(markerElement).setLngLat(point.coordinates).addTo(map.current)
      })

      // เอฟเฟกต์ 3D
      map.current.setFog({
        color: "rgb(186, 210, 235)",
        "high-color": "rgb(36, 92, 223)",
        "horizon-blend": 0.02,
        "space-color": "rgb(11, 11, 25)",
        "star-intensity": 0.6,
      })
    })

    return () => map.current?.remove()
  }, [mapboxgl])

  // Journey animation
  useEffect(() => {
    if (!map.current || !isJourneyMode) return
    if (currentJourneyStep < mapPoints.length) {
      const point = mapPoints[currentJourneyStep]
      map.current.flyTo({ center: point.coordinates, zoom: 12, duration: 2000, essential: true })
      const timer = setTimeout(() => {
        if (currentJourneyStep < mapPoints.length - 1) {
          setCurrentJourneyStep((s) => s + 1)
        } else {
          setIsJourneyMode(false)
          setCurrentJourneyStep(0)
        }
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isJourneyMode, currentJourneyStep])

  const startJourney = useCallback(() => {
    setIsJourneyMode(true)
    setCurrentJourneyStep(0)
    setSelectedPoint(null)
  }, [])

  const resetView = useCallback(() => {
    if (!map.current) return
    setIsJourneyMode(false)
    setCurrentJourneyStep(0)
    setSelectedPoint(null)
    const bounds = new mapboxgl.LngLatBounds()
    mapPoints.forEach((p) => bounds.extend(p.coordinates))
    map.current.fitBounds(bounds, { padding: 50, duration: 1000 })
  }, [mapboxgl])

  if (!accessToken) {
    return (
      <div className="w-full h-[600px] rounded-xl border flex items-center justify-center bg-muted">
        <div className="text-center">
          <p className="text-muted-foreground">ไม่พบ Mapbox Access Token</p>
          <p className="text-sm text-muted-foreground mt-2">
            กรุณาตั้งค่า NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ใน Project Settings
          </p>
        </div>
      </div>
    )
  }

  if (!mapboxgl) {
    return (
      <div className="w-full h-[600px] rounded-xl border flex items-center justify-center bg-muted">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">กำลังโหลดแผนที่ Mapbox...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-6">
      <div className="relative">
        <div ref={mapContainer} className="w-full h-[600px] rounded-xl border overflow-hidden" />

        {/* ปุ่มควบคุม */}
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

        {/* Progress เดินทาง */}
        {isJourneyMode && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 rounded-full px-6 py-3 shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">
                {mapPoints[currentJourneyStep]?.name} ({currentJourneyStep + 1}/{mapPoints.length})
              </span>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-gray-200/80 p-4 rounded-xl shadow-lg backdrop-blur-sm text-black-200">
          <h4 className="font-semibold mb-3 text-sm">🗺️ เส้นทางการเดินทาง</h4>
          <div className="space-y-2 text-xs">
            {mapPoints.map((point, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full text-black-200 " style={{ backgroundColor: point.color }}></div>
                <span>{point.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ข้อมูลจุดที่เลือก */}
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
                  {selectedPoint.coordinates[1].toFixed(4)}, {selectedPoint.coordinates[0].toFixed(4)}
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
    </div>
  )
}
