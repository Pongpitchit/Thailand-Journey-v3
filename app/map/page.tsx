import Link from "next/link"
import { Button } from "@/components/ui/button"
import MapboxMap from "@/components/mapbox-map"
import { getMapboxToken } from "@/lib/mapbox-config"

export default async function MapPage() {
  let mapboxToken = ""
  try {
    mapboxToken = await getMapboxToken()
  } catch (error) {
    console.error("Failed to get Mapbox token:", error)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gradient-to-r from-red-900 to-red-600 py-6 sm:py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link href="/" className="text-lg sm:text-2xl font-bold hover:text-red-300 transition-colors">
              ← คู่มือเดินทางไปทิเบต
            </Link>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide">แผนที่เส้นทางไปทิเบต</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <section className="mb-8 sm:mb-12">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">
              สำรวจเส้นทางสู่หลังคาโลกด้วยแผนที่อินเตอร์แอคทีฟ
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
              ดูเส้นทางการเดินทางจากไทยไปยังทิเบตบนแผนที่ดาวเทียม Mapbox ความละเอียดสูง พร้อมมุมมอง 3D และข้อมูลสถานที่สำคัญ
            </p>
          </div>
        </section>

        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-800 h-[400px] sm:h-[500px] lg:h-[600px]">
          <MapboxMap accessToken={mapboxToken} />
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 mt-8 sm:mt-12">
          <Link href="/">
            <Button
              variant="outline"
              className="w-full sm:w-auto bg-transparent border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition-all duration-300 px-6 sm:px-8 py-3"
            >
              กลับหน้าแรก
            </Button>
          </Link>
          <Link href="/routes">
            <Button
              variant="outline"
              className="w-full sm:w-auto bg-transparent border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition-all duration-300 px-6 sm:px-8 py-3"
            >
              ดูข้อมูลเส้นทาง
            </Button>
          </Link>
          <Link href="/calculator">
            <Button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white transition-all duration-300 px-6 sm:px-8 py-3">
              คำนวณค่าใช้จ่าย
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
