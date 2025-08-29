import Link from "next/link"
import { Button } from "@/components/ui/button"
import JourneyPlanner from "@/components/journey-planner"

export default function PlannerPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gradient-to-r from-red-900 to-red-600 py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold hover:text-red-300 transition-colors">
              ← คู่มือเดินทางไปทิเบต
            </Link>
            <h1 className="text-4xl font-bold tracking-wide">วางแผนการเดินทาง</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-6 text-white">สร้างแผนการเดินทางส่วนตัว</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              ใช้เครื่องมือวางแผนเพื่อสร้างกำหนดการเดินทางที่เหมาะกับความสนใจ งบประมาณ และเวลาของคุณ
            </p>
          </div>
        </section>

        <div className="bg-gray-900 rounded-lg p-8 shadow-2xl border border-gray-800 mb-12">
          <JourneyPlanner />
        </div>

        <div className="flex justify-center gap-6">
          <Link href="/">
            <Button
              className="bg-transparent border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition-all duration-300 px-8 py-3"
              variant="outline"
            >
              กลับหน้าแรก
            </Button>
          </Link>
          <Link href="/routes">
            <Button
              className="bg-transparent border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition-all duration-300 px-8 py-3"
              variant="outline"
            >
              ดูข้อมูลเส้นทาง
            </Button>
          </Link>
          <Link href="/calculator">
            <Button
              className="bg-transparent border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition-all duration-300 px-8 py-3"
              variant="outline"
            >
              คำนวณค่าใช้จ่าย
            </Button>
          </Link>
          <Link href="/map">
            <Button className="bg-red-600 hover:bg-red-700 text-white transition-all duration-300 px-8 py-3">
              ดูแผนที่ 3D
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
