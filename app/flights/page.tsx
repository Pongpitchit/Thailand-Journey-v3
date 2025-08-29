"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { AccommodationCard } from "@/components/accommodation-card"
import { getAccommodationsByCity } from "@/data/accommodations"
import { Phone, Mail, MessageCircle, Plane, Clock } from "lucide-react"

// Netflix-style components for horizontal scrolling carousels
const NetflixCarousel = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="space-y-4">
    <h3 className="text-lg sm:text-xl font-bold text-white px-4">{title}</h3>
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex gap-3 sm:gap-4 px-4 pb-4">{children}</div>
    </div>
  </div>
)

const NetflixCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div
    className={`min-w-[280px] sm:min-w-[300px] bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-2xl ${className}`}
  >
    {children}
  </div>
)

// Mock flight data
const flightRoutes = [
  {
    id: "bkk-km-001",
    route: "กรุงเทพฯ → คุนหมิง",
    airline: "Thai Airways",
    flightNumber: "TG 636",
    duration: "2 ชั่วโมง 30 นาที",
    frequency: "ทุกวัน",
    price: { economy: 8500, business: 18500 },
    aircraft: "Airbus A320",
    departure: "06:30",
    arrival: "10:00",
    features: ["อาหารฟรี", "กระเป๋า 30kg", "WiFi บนเครื่อง"],
    bookingUrl: "https://thaiairways.com",
  },
  {
    id: "bkk-km-002",
    route: "กรุงเทพฯ → คุนหมิง",
    airline: "China Eastern",
    flightNumber: "MU 2036",
    duration: "2 ชั่วโมง 45 นาที",
    frequency: "ทุกวัน",
    price: { economy: 6800, business: 15200 },
    aircraft: "Boeing 737-800",
    departure: "13:45",
    arrival: "17:30",
    features: ["อาหารฟรี", "กระเป๋า 23kg", "ระบบบันเทิง"],
    bookingUrl: "https://ceair.com",
  },
  {
    id: "km-ls-001",
    route: "คุนหมิง → ลาซา",
    airline: "Tibet Airlines",
    flightNumber: "TV 9833",
    duration: "2 ชั่วโมง 15 นาที",
    frequency: "ทุกวัน",
    price: { economy: 4200, business: 9800 },
    aircraft: "Airbus A319",
    departure: "07:25",
    arrival: "10:40",
    features: ["ออกซิเจนพิเศษ", "วิวภูเขาหิมาลัย", "กระเป๋า 20kg"],
    bookingUrl: "https://tibetairlines.com.cn",
  },
  {
    id: "km-ls-002",
    route: "คุนหมิง → ลาซา",
    airline: "Air China",
    flightNumber: "CA 4401",
    duration: "2 ชั่วโมง 20 นาที",
    frequency: "ทุกวัน",
    price: { economy: 4800, business: 11200 },
    aircraft: "Boeing 737-800",
    departure: "14:30",
    arrival: "17:50",
    features: ["ออกซิเจนพิเศษ", "อาหารฟรี", "กระเป๋า 23kg"],
    bookingUrl: "https://airchina.com",
  },
]

const airlines = [
  {
    name: "Thai Airways",
    logo: "/thai-airways-logo.png",
    rating: 4.2,
    features: ["สายการบินแห่งชาติไทย", "บริการระดับสากล", "เครือข่ายทั่วโลก"],
    pros: ["บริการดีเยี่ยม", "อาหารอร่อย", "ตรงต่อเวลา"],
    cons: ["ราคาค่อนข้างสูง", "เครื่องบินเก่า"],
  },
  {
    name: "China Eastern",
    logo: "/china-eastern-logo.png",
    rating: 3.8,
    features: ["สายการบินใหญ่ของจีน", "เส้นทางครอบคลุม", "ราคาแข่งขันได้"],
    pros: ["ราคาดี", "เที่ยวบินเยอะ", "สะดวกสบาย"],
    cons: ["บริการธรรมดา", "อาหารไม่โดดเด่น"],
  },
  {
    name: "Tibet Airlines",
    logo: "/tibet-airlines-logo.png",
    rating: 4.0,
    features: ["ผู้เชี่ยวชาญเส้นทางทิเบต", "ระบบออกซิเจนพิเศษ", "ลูกเรือมีประสบการณ์"],
    pros: ["เชี่ยวชาญทิเบต", "ระบบออกซิเจน", "วิวสวยงาม"],
    cons: ["เส้นทางจำกัด", "เครื่องบินเล็ก"],
  },
  {
    name: "Air China",
    logo: "/air-china-logo.png",
    rating: 3.9,
    features: ["สายการบินแห่งชาติจีน", "เครือข่ายในประเทศ", "มาตรฐานสากล"],
    pros: ["เครือข่ายกว้าง", "ราคาเหมาะสม", "ความปลอดภัยสูง"],
    cons: ["บริการไม่โดดเด่น", "ภาษาอังกฤษจำกัด"],
  },
]

const flightTips = [
  {
    icon: "🎫",
    title: "การจองตั๋ว",
    tips: ["จองล่วงหน้า 2-3 เดือนเพื่อราคาดี", "เลือกวันจันทร์-พฤหัสบดีราคาถูกกว่า", "ตรวจสอบวีซ่าจีนก่อนจอง", "เปรียบเทียบราคาหลายเว็บไซต์"],
  },
  {
    icon: "🧳",
    title: "เตรียมเดินทาง",
    tips: ["เช็คอินออนไลน์ 24 ชั่วโมงก่อน", "เตรียมเอกสารครบถ้วน", "ยาประจำตัวใส่กระเป๋าถือ", "เสื้อผ้าหนาวสำหรับลาซา"],
  },
  {
    icon: "⛰️",
    title: "ความสูง",
    tips: ["ดื่มน้ำเยอะก่อนขึ้นเครื่อง", "หลีกเลี่ยงแอลกอฮอล์", "พักผ่อนให้เพียงพอ", "เตรียมยาแก้เมาเครื่องบิน"],
  },
  {
    icon: "💰",
    title: "ประหยัดค่าใช้จ่าย",
    tips: ["เลือกที่นั่งธรรมดาแทนบิสซิเนส", "หาโปรโมชั่นช่วงต่ำ", "ใช้ไมล์สะสมถ้ามี", "จองแพ็กเกจรวมที่พัก"],
  },
]

const flightPackages = [
  {
    id: "economy-basic",
    name: "แพ็กเกจประหยัด",
    price: 15000,
    duration: "5 วัน 4 คืน",
    includes: ["ตั๋วเครื่องบิน", "ที่พัก 3 ดาว", "อาหารเช้า", "รถรับส่งสนามบิน"],
    flights: ["กรุงเทพฯ → คุนหมิง → ลาซา", "ลาซา → คุนหมิง → กรุงเทพฯ"],
    badge: "ประหยัด",
    color: "green",
  },
  {
    id: "standard-comfort",
    name: "แพ็กเกจมาตรฐาน",
    price: 25000,
    duration: "7 วัน 6 คืน",
    includes: ["ตั๋วเครื่องบิน", "ที่พัก 4 ดาว", "อาหาร 3 มื้อ", "ไกด์ท้องถิ่น", "รถรับส่ง"],
    flights: ["กรุงเทพฯ → คุนหมิง → ลาซา", "ลาซา → คุนหมิง → กรุงเทพฯ"],
    badge: "แนะนำ",
    color: "blue",
  },
  {
    id: "luxury-premium",
    name: "แพ็กเกจหรูหรา",
    price: 45000,
    duration: "10 วัน 9 คืน",
    includes: ["ตั๋วเครื่องบิน Business", "ที่พัก 5 ดาว", "อาหารพิเศษ", "ไกด์ส่วนตัว", "รถ VIP"],
    flights: ["กรุงเทพฯ → คุนหมิง → ลาซา", "ลาซา → คุนหมิง → กรุงเทพฯ"],
    badge: "หรูหรา",
    color: "purple",
  },
]

export default function FlightsPage() {
  const [selectedSeats, setSelectedSeats] = useState<{ [key: string]: "economy" | "business" }>({})
  const [bookingModal, setBookingModal] = useState<{ open: boolean; flight?: any; seatType?: string }>({ open: false })

  const kunmingAccommodations = getAccommodationsByCity("Kunming")
  const lhasaAccommodations = getAccommodationsByCity("Lhasa")

  const handleSeatSelect = (flightId: string, seatType: "economy" | "business") => {
    setSelectedSeats((prev) => ({ ...prev, [flightId]: seatType }))
  }

  const handleBookFlight = (flight: any) => {
    const seatType = selectedSeats[flight.id] || "economy"
    setBookingModal({ open: true, flight, seatType })
  }

  const handlePackageSelect = (pkg: any) => {
    alert(
      `เลือกแพ็กเกจ: ${pkg.name}\nราคา: ฿${pkg.price.toLocaleString()}\n\nกรุณาติดต่อ:\n📞 +66 2-456-7890\n📧 flights@tibettravel.com\n💬 Line: @tibetflights`,
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="bg-black/90 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-red-500 hover:text-red-400 font-medium text-sm sm:text-base">
            ← คู่มือเดินทางไปทิเบต
          </Link>
        </div>
      </div>

      <div className="relative h-[50vh] sm:h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('/airplane-flying-over-himalayan-mountains-tibet.png')",
          }}
        ></div>
        <div className="relative text-center z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            ✈️ การเดินทางด้วยเครื่องบิน
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            ข้อมูลครบครันเกี่ยวกับเที่ยวบิน สายการบิน และที่พักแนะนำ สำหรับการเดินทางไปทิเบตด้วยเครื่องบิน
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Tabs defaultValue="flights" className="space-y-6 sm:space-y-8">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 bg-gray-900 border-gray-800 h-auto">
            <TabsTrigger
              value="flights"
              className="data-[state=active]:bg-red-600 text-white data-[state=active]:text-red text-xs sm:text-sm py-2 sm:py-3"
            >
              เที่ยวบิน
            </TabsTrigger>
            <TabsTrigger
              value="packages"
              className="data-[state=active]:bg-red-600 text-white data-[state=active]:text-red text-xs sm:text-sm py-2 sm:py-3"
            >
              แพ็กเกจ
            </TabsTrigger>
            <TabsTrigger
              value="airlines"
              className="data-[state=active]:bg-red-600 text-white data-[state=active]:text-red text-xs sm:text-sm py-2 sm:py-3"
            >
              สายการบิน
            </TabsTrigger>
            <TabsTrigger
              value="accommodations"
              className="data-[state=active]:bg-red-600 text-white data-[state=active]:text-red text-xs sm:text-sm py-2 sm:py-3"
            >
              ที่พัก
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="data-[state=active]:bg-red-600  text-white data-[state=active]:text-red text-xs sm:text-sm py-2 sm:py-3"
            >
              ติดต่อ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="flights" className="space-y-6 sm:space-y-8">
            {/* Bangkok to Kunming Carousel */}
            <NetflixCarousel title="🇹🇭 กรุงเทพฯ → คุนหมิง 🇨🇳">
              {flightRoutes
                .filter((f) => f.route.includes("กรุงเทพฯ → คุนหมิง"))
                .map((flight) => (
                  <NetflixCard key={flight.id}>
                    <div className="p-4 sm:p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg sm:text-xl font-bold text-white">{flight.airline}</h4>
                          <p className="text-gray-400 text-sm">
                            {flight.flightNumber} • {flight.aircraft}
                          </p>
                        </div>
                        <Badge className="bg-red-600 text-white text-xs">{flight.frequency}</Badge>
                      </div>

                      <div className="flex justify-between items-center py-3 sm:py-4">
                        <div className="text-center">
                          <div className="font-bold text-xl sm:text-2xl text-white">{flight.departure}</div>
                          <div className="text-xs sm:text-sm text-gray-400">กรุงเทพฯ</div>
                        </div>
                        <div className="text-center flex-1 px-2">
                          <div className="text-xs sm:text-sm text-gray-400">{flight.duration}</div>
                          <div className="border-t border-gray-700 my-2"></div>
                          <div className="text-xs text-gray-500">บินตรง</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-xl sm:text-2xl text-white">{flight.arrival}</div>
                          <div className="text-xs sm:text-sm text-gray-400">คุนหมิง</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">ชั้นประหยัด:</span>
                          <span className="font-bold text-green-400 text-sm">
                            ฿{flight.price.economy.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">ชั้นธุรกิจ:</span>
                          <span className="font-bold text-blue-400 text-sm">
                            ฿{flight.price.business.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {flight.features.map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-gray-600 text-gray-300">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs text-gray-400">เลือกประเภทที่นั่ง:</div>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            className={`w-full text-xs transition-all ${
                              selectedSeats[flight.id] === "economy"
                                ? "bg-green-700 hover:bg-green-800"
                                : "bg-green-600 hover:bg-green-700"
                            } text-white`}
                            onClick={() => handleSeatSelect(flight.id, "economy")}
                          >
                            ประหยัด ฿{flight.price.economy.toLocaleString()}
                          </Button>
                          <Button
                            className={`w-full text-xs transition-all ${
                              selectedSeats[flight.id] === "business"
                                ? "bg-blue-700 hover:bg-blue-800"
                                : "bg-blue-600 hover:bg-blue-700"
                            } text-white`}
                            onClick={() => handleSeatSelect(flight.id, "business")}
                          >
                            ธุรกิจ ฿{flight.price.business.toLocaleString()}
                          </Button>
                        </div>
                      </div>
                      <Button
                        className="w-full bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base"
                        onClick={() => handleBookFlight(flight)}
                      >
                        จองตั๋วเลย
                      </Button>
                    </div>
                  </NetflixCard>
                ))}
            </NetflixCarousel>

            {/* Kunming to Lhasa Carousel */}
            <NetflixCarousel title="🏔️ คุนหมิง → ลาซา 🏔️">
              {flightRoutes
                .filter((f) => f.route.includes("คุนหมิง → ลาซา"))
                .map((flight) => (
                  <NetflixCard key={flight.id}>
                    <div className="p-4 sm:p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg sm:text-xl font-bold text-white">{flight.airline}</h4>
                          <p className="text-gray-400 text-sm">
                            {flight.flightNumber} • {flight.aircraft}
                          </p>
                        </div>
                        <Badge className="bg-red-600 text-white text-xs">{flight.frequency}</Badge>
                      </div>

                      <div className="flex justify-between items-center py-3 sm:py-4">
                        <div className="text-center">
                          <div className="font-bold text-xl sm:text-2xl text-white">{flight.departure}</div>
                          <div className="text-xs sm:text-sm text-gray-400">คุนหมิง</div>
                        </div>
                        <div className="text-center flex-1 px-2">
                          <div className="text-xs sm:text-sm text-gray-400">{flight.duration}</div>
                          <div className="border-t border-gray-700 my-2"></div>
                          <div className="text-xs text-gray-500">บินตรง</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-xl sm:text-2xl text-white">{flight.arrival}</div>
                          <div className="text-xs sm:text-sm text-gray-400">ลาซา</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">ชั้นประหยัด:</span>
                          <span className="font-bold text-green-400 text-sm">
                            ฿{flight.price.economy.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">ชั้นธุรกิจ:</span>
                          <span className="font-bold text-blue-400 text-sm">
                            ฿{flight.price.business.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {flight.features.map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-gray-600 text-gray-300">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs text-gray-400">เลือกประเภทที่นั่ง:</div>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            className={`w-full text-xs transition-all ${
                              selectedSeats[flight.id] === "economy"
                                ? "bg-green-700 hover:bg-green-800"
                                : "bg-green-600 hover:bg-green-700"
                            } text-white`}
                            onClick={() => handleSeatSelect(flight.id, "economy")}
                          >
                            ประหยัด ฿{flight.price.economy.toLocaleString()}
                          </Button>
                          <Button
                            className={`w-full text-xs transition-all ${
                              selectedSeats[flight.id] === "business"
                                ? "bg-blue-700 hover:bg-blue-800"
                                : "bg-blue-600 hover:bg-blue-700"
                            } text-white`}
                            onClick={() => handleSeatSelect(flight.id, "business")}
                          >
                            ธุรกิจ ฿{flight.price.business.toLocaleString()}
                          </Button>
                        </div>
                      </div>
                      <Button
                        className="w-full bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base"
                        onClick={() => handleBookFlight(flight)}
                      >
                        จองตั๋วเลย
                      </Button>
                    </div>
                  </NetflixCard>
                ))}
            </NetflixCarousel>

            <Card className="bg-gradient-to-r from-red-900 to-red-700 text-white border-none mx-4">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">💰 สรุปค่าใช้จ่ายเที่ยวบิน</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-base sm:text-lg">ชั้นประหยัด (Economy)</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>กรุงเทพฯ → คุนหมิง:</span>
                        <span className="font-bold">฿6,800 - ฿8,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span>คุนหมิง → ลาซา:</span>
                        <span className="font-bold">฿4,200 - ฿4,800</span>
                      </div>
                      <div className="border-t border-white/30 pt-2 flex justify-between font-bold text-base sm:text-lg">
                        <span>รวม:</span>
                        <span>฿11,000 - ฿13,300</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-base sm:text-lg">ชั้นธุรกิจ (Business)</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>กรุงเทพฯ → คุนหมิง:</span>
                        <span className="font-bold">฿15,200 - ฿18,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span>คุนหมิง → ลาซา:</span>
                        <span className="font-bold">฿9,800 - ฿11,200</span>
                      </div>
                      <div className="border-t border-white/30 pt-2 flex justify-between font-bold text-base sm:text-lg">
                        <span>รวม:</span>
                        <span>฿25,000 - ฿29,700</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="packages" className="space-y-6 sm:space-y-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white px-4">แพ็กเกจเที่ยวบินแนะนำ</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 px-4">
              {flightPackages.map((pkg) => (
                <Card
                  key={pkg.id}
                  className={`bg-gray-900 border-${pkg.color}-600 border-2 hover:scale-105 transition-transform duration-300 shadow-2xl`}
                >
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg sm:text-xl text-white">{pkg.name}</CardTitle>
                      <Badge className={`bg-${pkg.color}-600 text-white text-xs sm:text-sm`}>{pkg.badge}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{pkg.duration}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className={`text-3xl sm:text-4xl font-bold text-${pkg.color}-400`}>
                          ฿{pkg.price.toLocaleString()}
                        </div>
                        <div className="text-gray-400 mt-1 text-sm">ต่อคน</div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-white">รวมในแพ็กเกจ:</h4>
                        <ul className="space-y-1">
                          {pkg.includes.map((item, idx) => (
                            <li key={idx} className="text-gray-300 text-sm flex items-center gap-2">
                              <span className={`text-${pkg.color}-400`}>✓</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-white">เที่ยวบิน:</h4>
                        <ul className="space-y-1">
                          {pkg.flights.map((flight, idx) => (
                            <li key={idx} className="text-gray-300 text-xs flex items-center gap-2">
                              <Plane className="w-3 h-3" />
                              {flight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button
                        className={`w-full bg-${pkg.color}-600 hover:bg-${pkg.color}-700 text-white transition-all duration-300`}
                        onClick={() => handlePackageSelect(pkg)}
                      >
                        เลือกแพ็กเกจนี้
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="airlines" className="space-y-6">
            <NetflixCarousel title="สายการบินแนะนำ">
              {airlines.map((airline, index) => (
                <NetflixCard key={index}>
                  <div className="p-4 sm:p-6 space-y-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                        <span className="text-2xl sm:text-3xl">✈️</span>
                      </div>
                      <div>
                        <h4 className="text-lg sm:text-xl font-bold text-white">{airline.name}</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex text-yellow-400 text-sm">
                            {"★".repeat(Math.floor(airline.rating))}
                            {"☆".repeat(5 - Math.floor(airline.rating))}
                          </div>
                          <span className="text-xs sm:text-sm text-gray-400">{airline.rating}/5</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {airline.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
                          <span className="text-xs sm:text-sm text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <h5 className="font-semibold text-green-400 mb-2 text-sm">ข้อดี</h5>
                        <ul className="space-y-1">
                          {airline.pros.map((pro, idx) => (
                            <li key={idx} className="text-xs sm:text-sm flex items-center gap-2 text-gray-300">
                              <span className="text-green-400">✓</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-orange-400 mb-2 text-sm">ข้อควรระวัง</h5>
                        <ul className="space-y-1">
                          {airline.cons.map((con, idx) => (
                            <li key={idx} className="text-xs sm:text-sm flex items-center gap-2 text-gray-300">
                              <span className="text-orange-400">!</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </NetflixCard>
              ))}
            </NetflixCarousel>
          </TabsContent>

          <TabsContent value="accommodations" className="space-y-6 sm:space-y-8">
            <NetflixCarousel title="🏨 ที่พักในคุนหมิง (พักค้างคืน)">
              {kunmingAccommodations.slice(0, 4).map((accommodation) => (
                <div key={accommodation.id} className="min-w-[280px] sm:min-w-[300px]">
                  <AccommodationCard accommodation={accommodation} />
                </div>
              ))}
            </NetflixCarousel>

            <NetflixCarousel title="🏔️ ที่พักในลาซา (จุดหมายปลายทาง)">
              {lhasaAccommodations.slice(0, 4).map((accommodation) => (
                <div key={accommodation.id} className="min-w-[280px] sm:min-w-[300px]">
                  <AccommodationCard accommodation={accommodation} />
                </div>
              ))}
            </NetflixCarousel>

            <div className="text-center pt-6 sm:pt-8">
              <Link href="/routes">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto">
                  ดูที่พักทั้งหมดตามเส้นทาง
                </Button>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="tips" className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white px-4">เคล็ดลับการเดินทางด้วยเครื่องบิน</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 px-4">
              {flightTips.map((tip, index) => (
                <Card key={index} className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white text-base sm:text-lg">
                      <span className="text-2xl sm:text-3xl">{tip.icon}</span>
                      {tip.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 sm:space-y-3">
                      {tip.tips.map((tipItem, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-xs sm:text-sm leading-relaxed text-gray-300">{tipItem}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border-red-800 mx-4">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2 text-base sm:text-lg">
                  ⚠️ ข้อควรระวังสำคัญ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-red-400 mb-2 text-sm sm:text-base">เอกสารและวีซ่า</h4>
                    <ul className="space-y-1 text-xs sm:text-sm text-gray-300">
                      <li>• วีซ่าจีนจำเป็น (ยกเว้นทรานซิต &lt; 24 ชม.)</li>
                      <li>• Tibet Travel Permit จำเป็น</li>
                      <li>• หนังสือเดินทางอายุ &gt; 6 เดือน</li>
                      <li>• ประกันการเดินทาง</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-400 mb-2 text-sm sm:text-base">สุขภาพและความปลอดภัย</h4>
                    <ul className="space-y-1 text-xs sm:text-sm text-gray-300">
                      <li>• เตรียมตัวสำหรับความสูง</li>
                      <li>• ยาประจำตัวเพียงพอ</li>
                      <li>• ประกันสุขภาพครอบคลุม</li>
                      <li>• ตรวจสุขภาพก่อนเดินทาง</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6 sm:space-y-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white px-4">ติดต่อจองตั๋วเครื่องบิน</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 px-4">
              <Card className="bg-gradient-to-r from-red-900 to-red-700 text-white border-none shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl flex items-center gap-3">
                    <Phone className="w-6 h-6" />
                    ติดต่อโดยตรง
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-red-300" />
                      <div>
                        <div className="font-semibold">โทรศัพท์</div>
                        <div className="text-red-100">+66 2-456-7890</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-red-300" />
                      <div>
                        <div className="font-semibold">อีเมล</div>
                        <div className="text-red-100">flights@tibettravel.com</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-5 h-5 text-red-300" />
                      <div>
                        <div className="font-semibold">Line ID</div>
                        <div className="text-red-100">@tibetflights</div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-white text-red-600 hover:bg-red-50 font-semibold">ติดต่อเลย</Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-700 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl text-white">ขั้นตอนการจอง</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        1
                      </div>
                      <div>
                        <div className="font-semibold text-white">เลือกเที่ยวบิน</div>
                        <div className="text-gray-300 text-sm">เลือกวันเดินทางและประเภทที่นั่ง</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        2
                      </div>
                      <div>
                        <div className="font-semibold text-white">กรอกข้อมูล</div>
                        <div className="text-gray-300 text-sm">กรอกข้อมูลผู้โดยสารและติดต่อ</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        3
                      </div>
                      <div>
                        <div className="font-semibold text-white">ชำระเงิน</div>
                        <div className="text-gray-300 text-sm">ชำระผ่านบัตรเครดิตหรือโอนเงิน</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        4
                      </div>
                      <div>
                        <div className="font-semibold text-white">รับตั๋ว</div>
                        <div className="text-gray-300 text-sm">รับ E-ticket ทางอีเมล</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 px-4">
          <Link href="/train">
            <Button
              variant="outline"
              className="w-full h-auto sm:h-16 text-left bg-gray-900 border-gray-700 hover:bg-gray-800 text-white p-3 sm:p-4"
            >
              <div>
                <div className="font-semibold text-sm sm:text-base">🚂 เปรียบเทียบรถไฟ</div>
                <div className="text-xs sm:text-sm text-gray-400">ดูตัวเลือกการเดินทางด้วยรถไฟ</div>
              </div>
            </Button>
          </Link>
          <Link href="/calculator">
            <Button
              variant="outline"
              className="w-full h-auto sm:h-16 text-left bg-gray-900 border-gray-700 hover:bg-gray-800 text-white p-3 sm:p-4"
            >
              <div>
                <div className="font-semibold text-sm sm:text-base">💰 คำนวณค่าใช้จ่าย</div>
                <div className="text-xs sm:text-sm text-gray-400">ประมาณการงบประมาณทั้งหมด</div>
              </div>
            </Button>
          </Link>
          <Link href="/planner">
            <Button
              variant="outline"
              className="w-full h-auto sm:h-16 text-left bg-gray-900 border-gray-700 hover:bg-gray-800 text-white p-3 sm:p-4"
            >
              <div>
                <div className="font-semibold text-sm sm:text-base">📋 วางแผนการเดินทาง</div>
                <div className="text-xs sm:text-sm text-gray-400">สร้างแผนส่วนตัว</div>
              </div>
            </Button>
          </Link>
        </div>
      </div>

      {bookingModal.open && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">ยืนยันการจอง</h3>
            <div className="space-y-3 text-gray-300">
              <div>
                เที่ยวบิน: {bookingModal.flight?.airline} {bookingModal.flight?.flightNumber}
              </div>
              <div>เส้นทาง: {bookingModal.flight?.route}</div>
              <div>ประเภทที่นั่ง: {bookingModal.seatType === "economy" ? "ชั้นประหยัด" : "ชั้นธุรกิจ"}</div>
              <div>ราคา: ฿{bookingModal.flight?.price[bookingModal.seatType || "economy"].toLocaleString()}</div>
            </div>
            <div className="mt-6 space-y-3">
              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                onClick={() => {
                  alert("การจองสำเร็จ! เราจะติดต่อกลับภายใน 24 ชั่วโมง")
                  setBookingModal({ open: false })
                }}
              >
                ยืนยันการจอง
              </Button>
              <Button
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                onClick={() => setBookingModal({ open: false })}
              >
                ยกเลิก
              </Button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
