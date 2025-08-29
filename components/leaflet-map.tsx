"use client"

import { useEffect, useRef, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet"
import { type LatLngExpression, DivIcon } from "leaflet"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import "leaflet/dist/leaflet.css"

interface MapPoint {
  name: string
  nameEn: string
  coordinates: [number, number] // [latitude, longitude]
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
    color: "#ef4444",
    description: "เมืองหลวงของทิเบต - ที่ตั้งของพระราชวังโปตาลา",
    elevation: 3650,
    type: "destination",
    googleMapsUrl: "https://maps.google.com/?q=29.6516,91.1611",
  },
]

// Create custom icons for different point types
const createCustomIcon = (point: MapPoint) => {
  const getIconSymbol = (type: string) => {
    switch (type) {
      case "start":
        return "🏙️"
      case "destination":
        return "🏔️"
      case "transit":
        return "🚉"
      case "attraction":
        return "🏛️"
      default:
        return "📍"
    }
  }

  return new DivIcon({
    html: `
      <div style="
        background-color: ${point.color};
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        position: relative;
      ">
        ${getIconSymbol(point.type)}
        <div style="
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid ${point.color};
        "></div>
      </div>
    `,
    className: "custom-marker",
    iconSize: [40, 48],
    iconAnchor: [20, 48],
    popupAnchor: [0, -48],
  })
}

// Component to handle journey animation
function JourneyController({
  isJourneyMode,
  currentStep,
  onStepChange,
}: {
  isJourneyMode: boolean
  currentStep: number
  onStepChange: (step: number) => void
}) {
  const map = useMap()

  useEffect(() => {
    if (isJourneyMode && currentStep < mapPoints.length) {
      const point = mapPoints[currentStep]
      map.flyTo(point.coordinates, 10, {
        duration: 2,
        easeLinearity: 0.25,
      })

      const timer = setTimeout(() => {
        if (currentStep < mapPoints.length - 1) {
          onStepChange(currentStep + 1)
        }
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isJourneyMode, currentStep, map, onStepChange])

  return null
}

export default function LeafletMap() {
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null)
  const [isJourneyMode, setIsJourneyMode] = useState(false)
  const [currentJourneyStep, setCurrentJourneyStep] = useState(0)
  const mapRef = useRef<any>(null)

  // Create route coordinates for the polyline
  const routeCoordinates: LatLngExpression[] = mapPoints.map((point) => point.coordinates)

  const startJourney = () => {
    setIsJourneyMode(true)
    setCurrentJourneyStep(0)
    setSelectedPoint(null)
  }

  const resetView = () => {
    setIsJourneyMode(false)
    setCurrentJourneyStep(0)
    setSelectedPoint(null)

    if (mapRef.current) {
      // Fit bounds to show all points
      const bounds = mapPoints.map((point) => point.coordinates)
      mapRef.current.fitBounds(bounds, { padding: [50, 50] })
    }
  }

  const handleStepChange = (step: number) => {
    setCurrentJourneyStep(step)
    if (step >= mapPoints.length) {
      setIsJourneyMode(false)
      setCurrentJourneyStep(0)
    }
  }

  return (
    <div className="w-full space-y-6">
      <div className="relative">
        <div className="w-full h-[600px] rounded-xl border border-border overflow-hidden">
          <MapContainer
            center={[13.7563, 100.5018]} // Center between Thailand and Tibet
            zoom={10}
            className="w-full h-full"
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Route line */}
            <Polyline positions={routeCoordinates} color="#ff6b35" weight={4} opacity={0.8} dashArray="10, 10" />

            {/* Map points */}
            {mapPoints.map((point, index) => (
              <Marker
                key={index}
                position={point.coordinates}
                icon={createCustomIcon(point)}
                eventHandlers={{
                  click: () => setSelectedPoint(point),
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold text-lg">{point.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{point.nameEn}</p>
                    <p className="text-sm mb-2">{point.description}</p>
                    <div className="text-xs text-gray-500 mb-2">ความสูง: {point.elevation.toLocaleString()} เมตร</div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(point.googleMapsUrl, "_blank")}
                      className="w-full"
                    >
                      ดูใน Google Maps
                    </Button>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Journey controller */}
            <JourneyController
              isJourneyMode={isJourneyMode}
              currentStep={currentJourneyStep}
              onStepChange={handleStepChange}
            />
          </MapContainer>
        </div>

        {/* Control buttons */}
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

        {/* Journey progress indicator */}
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

        {/* Route legend */}
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
            <p className="text-xs text-gray-500">🗺️ ลากเพื่อเลื่อน ซูมเพื่อขยาย</p>
          </div>
        </div>
      </div>

      {/* Selected point details */}
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

      {/* Statistics cards */}
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

      {/* Usage instructions */}
      <Card>
        <CardHeader>
          <CardTitle>วิธีใช้แผนที่ Leaflet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">การควบคุมแผนที่</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>
                  • <strong>ลากเมาส์:</strong> เลื่อนแผนที่ไปรอบๆ
                </li>
                <li>
                  • <strong>ล้อเมาส์:</strong> ซูมเข้า/ออก
                </li>
                <li>
                  • <strong>ดับเบิลคลิก:</strong> ซูมเข้าที่จุดนั้น
                </li>
                <li>
                  • <strong>มือถือ:</strong> หยิกเพื่อซูม, ลากเพื่อเลื่อน
                </li>
                <li>• คลิกที่จุดต่างๆ เพื่อดูข้อมูลและพิกัด Google Maps</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">ฟีเจอร์พิเศษ</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• คลิกปุ่ม "🚂 เริ่มการเดินทาง" เพื่อชมเส้นทางแบบอัตโนมัติ</li>
                <li>• คลิกปุ่ม "🔄 รีเซ็ตมุมมอง" เพื่อกลับสู่มุมมองเริ่มต้น</li>
                <li>• เส้นทางแสดงเป็นเส้นประสีส้มระหว่างจุดต่างๆ</li>
                <li>• ไอคอนแต่ละจุดแสดงประเภทของสถานที่</li>
                <li>• ประสิทธิภาพดีกว่าและใช้งานง่ายบนมือถือ</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
