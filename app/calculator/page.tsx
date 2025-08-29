import Link from "next/link"
import { Button } from "@/components/ui/button"
import CostCalculator from "@/components/cost-calculator"

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-900 to-red-600 py-6 sm:py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link href="/" className="text-lg sm:text-2xl font-bold hover:text-red-300 transition-colors">
              ← คู่มือเดินทางไปทิเบต
            </Link>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide">คำนวณค่าใช้จ่าย</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Introduction */}
        <section className="mb-8 sm:mb-12">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">คำนวณค่าใช้จ่ายการเดินทางไปทิเบต</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
              ใช้เครื่องมือคำนวณเพื่อประมาณการค่าใช้จ่ายสำหรับการเดินทางของคุณ ราคาอ้างอิงจากข้อมูลจริงและอัปเดตล่าสุด
            </p>
          </div>
        </section>

        {/* Cost Calculator Component */}
        <div className="bg-gray-900 rounded-lg p-4 sm:p-6 lg:p-8 shadow-2xl border border-gray-800">
          <CostCalculator />
        </div>

        {/* Navigation */}
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
          <Link href="/map">
            <Button
              variant="outline"
              className="w-full sm:w-auto bg-transparent border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition-all duration-300 px-6 sm:px-8 py-3"
            >
              ดูแผนที่ 3D
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
