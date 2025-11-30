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

// Icon SVG
const getIconSymbol = (type: string) => {
  switch (type) {
    case "start":
      return `<img src="https://www.svgrepo.com/show/476832/airplane-take-off.svg" width="18" height="18" />`
    case "destination":
      return `<img src="https://www.svgrepo.com/show/420536/architecture-landscape.svg" width="18" height="18" />`
    case "transit":
      return `<img src="https://www.svgrepo.com/show/476803/tram.svg" width="18" height="18" />`
    case "attraction":
      return `<img src="https://www.svgrepo.com/show/476890/map-marker.svg" width="18" height="18" />`
    default:
      return `<img src="https://www.svgrepo.com/show/530630/emu.svg" width="18" height="18" />`
  }
}

export default function MapboxMap() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const [mapboxgl, setMapboxgl] = useState<any>(null)
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null)
  const [isJourneyMode, setIsJourneyMode] = useState(false)
  const [currentJourneyStep, setCurrentJourneyStep] = useState(0)

  // โหลด Mapbox
  useEffect(() => {
    const load = async () => {
      if (typeof window !== "undefined" && accessToken) {
        const mapboxgl = await import("mapbox-gl")
        await import("mapbox-gl/dist/mapbox-gl.css")
        mapboxgl.default.accessToken = accessToken
        setMapboxgl(mapboxgl.default)
      }
    }
    load()
  }, [accessToken])

  // สร้าง map
  useEffect(() => {
    if (!mapboxgl || !mapContainer.current || map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [96, 22],
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
        paint: {
          "line-color": "#ff6b35",
          "line-width": 4,
          "line-opacity": 0.8,
          "line-dasharray": [2, 2],
        },
      })

      // Markers
      mapPoints.forEach((point) => {
        const markerEl = document.createElement("div")
        markerEl.style.cssText = `
          background-color: ${point.color};
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 3px solid white;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          cursor: pointer;
        `
        markerEl.innerHTML = getIconSymbol(point.type)
        markerEl.addEventListener("click", () => setSelectedPoint(point))

        new mapboxgl.Marker(markerEl).setLngLat(point.coordinates).addTo(map.current)
      })
    })

    return () => map.current?.remove()
  }, [mapboxgl])

  const startJourney = useCallback(() => {
    setIsJourneyMode(true)
    setSelectedPoint(null)
    setCurrentJourneyStep(0)
  }, [])

  const resetView = useCallback(() => {
    if (!map.current) return
    const bounds = new mapboxgl.LngLatBounds()
    mapPoints.forEach((p) => bounds.extend(p.coordinates))
    map.current.fitBounds(bounds, { padding: 50, duration: 1000 })
  }, [mapboxgl])

  if (!accessToken) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center border rounded-xl">
        ❌ NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ไม่ถูกตั้งค่า
      </div>
    )
  }

  return (
    <div className="w-full space-y-6">
      <div className="relative">
        <div ref={mapContainer} className="w-full h-[600px] border rounded-xl" />

        <div className="absolute top-4 right-4 space-y-2">
          <Button onClick={startJourney}>🚂 เริ่มการเดินทาง</Button>
          <Button variant="secondary" onClick={resetView}>🔄 รีเซ็ต</Button>
        </div>
      </div>
    </div>
  )
}
