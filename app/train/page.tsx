"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AccommodationCard } from "@/components/accommodation-card"
import { getAccommodationsByCity } from "@/data/accommodations"
import { Train, Clock, MapPin, AlertTriangle, Thermometer, Mountain, Phone, Mail, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function TrainTravelPage() {
  const [bookingModal, setBookingModal] = useState<{ open: boolean; package?: any }>({ open: false })

  const kunmingAccommodations = getAccommodationsByCity("Kunming")
  const daliAccommodations = getAccommodationsByCity("Dali")
  const lijiangAccommodations = getAccommodationsByCity("Lijiang")
  const shangrilaAccommodations = getAccommodationsByCity("Shangri-La")
  const lhasaAccommodations = getAccommodationsByCity("Lhasa")

  const handlePackageBook = (packageType: string, price: number) => {
    const packageData = {
      type: packageType,
      price: price,
      contact: {
        phone: "+66 2-123-4567",
        email: "booking@tibettravel.com",
        line: "@tibettravel",
      },
    }
    setBookingModal({ open: true, package: packageData })
  }

  const handleAccommodationBook = (accommodation: any) => {
    alert(
      `จองที่พัก: ${accommodation.name}\nราคา: ฿${accommodation.price}/คืน\n\nติดต่อจอง:\n📞 +66 2-123-4567\n📧 booking@tibettravel.com\n💬 Line: @tibettravel`,
    )
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
            <div className="flex items-center gap-2 sm:gap-3">
              <Train className="w-6 h-6 sm:w-8 sm:h-8" />
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide">การเดินทางด้วยรถไฟ</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <section className="mb-12 sm:mb-16">
          <Card className="bg-gradient-to-r from-red-900 to-red-700 text-white border-gray-800 shadow-2xl">
            <CardHeader className="pb-6 sm:pb-8">
              <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold">Qinghai-Tibet Railway</CardTitle>
              <CardDescription className="text-red-100 text-base sm:text-lg lg:text-xl">
                รถไฟสายสูงที่สุดในโลก - ประสบการณ์ที่ไม่ควรพลาด
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center">
                <div className="bg-black/30 rounded-lg p-3 sm:p-6 backdrop-blur-sm">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold">1,142 กม.</div>
                  <div className="text-xs sm:text-sm opacity-90 mt-1 sm:mt-2">ระยะทางรวม</div>
                </div>
                <div className="bg-black/30 rounded-lg p-3 sm:p-6 backdrop-blur-sm">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold">20 ชม.</div>
                  <div className="text-xs sm:text-sm opacity-90 mt-1 sm:mt-2">เวลาเดินทาง</div>
                </div>
                <div className="bg-black/30 rounded-lg p-3 sm:p-6 backdrop-blur-sm">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold">5,072 ม.</div>
                  <div className="text-xs sm:text-sm opacity-90 mt-1 sm:mt-2">ความสูงสูงสุด</div>
                </div>
                <div className="bg-black/30 rounded-lg p-3 sm:p-6 backdrop-blur-sm">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold">2,500+ บาท</div>
                  <div className="text-xs sm:text-sm opacity-90 mt-1 sm:mt-2">ราคาเริ่มต้น</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 flex items-center gap-3">
            <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
            ตารางเวลารถไฟ
          </h2>
          <Card className="bg-gray-900 border-gray-800 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-white">เส้นทาง: คุนหมิง → ลาซา</CardTitle>
              <CardDescription className="text-gray-300 text-base sm:text-lg">
                รถไฟออกทุกวัน เวลา 20:10 น.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6">
                  <div className="bg-green-900/50 p-4 sm:p-6 rounded-lg border border-green-700 hover:bg-green-900/70 transition-colors">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                      <span className="font-semibold text-white text-sm sm:text-base">คุนหมิง</span>
                    </div>
                    <div className="text-gray-300 text-sm sm:text-base">20:10 น.</div>
                    <div className="text-xs sm:text-sm text-green-400 mt-1">จุดเริ่มต้น</div>
                  </div>

                  <div className="bg-blue-900/50 p-4 sm:p-6 rounded-lg border border-blue-700 hover:bg-blue-900/70 transition-colors">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                      <span className="font-semibold text-white text-sm sm:text-base">ต้าลี่</span>
                    </div>
                    <div className="text-gray-300 text-sm sm:text-base">21:15 น.</div>
                    <div className="text-xs sm:text-sm text-blue-400 mt-1">1 ชม. 5 นาที</div>
                  </div>

                  <div className="bg-purple-900/50 p-4 sm:p-6 rounded-lg border border-purple-700 hover:bg-purple-900/70 transition-colors">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                      <span className="font-semibold text-white text-sm sm:text-base">ลี่เจียง</span>
                    </div>
                    <div className="text-gray-300 text-sm sm:text-base">23:30 น.</div>
                    <div className="text-xs sm:text-sm text-purple-400 mt-1">3 ชม. 20 นาที</div>
                  </div>

                  <div className="bg-orange-900/50 p-4 sm:p-6 rounded-lg border border-orange-700 hover:bg-orange-900/70 transition-colors">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                      <span className="font-semibold text-white text-sm sm:text-base">ชางกรีลา</span>
                    </div>
                    <div className="text-gray-300 text-sm sm:text-base">02:45 น. +1</div>
                    <div className="text-xs sm:text-sm text-orange-400 mt-1">6 ชม. 35 นาที</div>
                  </div>

                  <div className="bg-red-900/50 p-4 sm:p-6 rounded-lg border border-red-700 hover:bg-red-900/70 transition-colors">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                      <span className="font-semibold text-white text-sm sm:text-base">ลาซา</span>
                    </div>
                    <div className="text-gray-300 text-sm sm:text-base">16:30 น. +1</div>
                    <div className="text-xs sm:text-sm text-red-400 mt-1">จุดหมาย</div>
                  </div>
                </div>

                <div className="bg-yellow-900/30 p-4 sm:p-6 rounded-lg border border-yellow-700">
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                    <span className="font-semibold text-yellow-300 text-base sm:text-lg">หมายเหตุสำคัญ</span>
                  </div>
                  <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
                    <li>• รถไฟมีระบบออกซิเจนเสริมตั้งแต่ความสูง 3,000 เมตร</li>
                    <li>• หน้าต่างป้องกัน UV สำหรับแสงแดดจ้าบนที่สูง</li>
                    <li>• ห้องน้ำพิเศษสำหรับที่ระดับความสูง</li>
                    <li>• มีแพทย์ประจำรถไฟตลอดการเดินทาง</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white">ประเภทที่นั่งและราคา</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="bg-gray-900 border-orange-600 border-2 hover:scale-105 transition-transform duration-300 shadow-2xl">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg sm:text-xl text-white">Hard Sleeper</CardTitle>
                  <Badge className="bg-orange-600 text-white text-xs sm:text-sm">ประหยัด</Badge>
                </div>
                <CardDescription className="text-gray-300 text-sm sm:text-base">
                  นอนแข็ง - เหมาะสำหรับงบจำกัด
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 sm:space-y-6">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-orange-400">2,500 บาท</div>
                    <div className="text-gray-400 mt-1 text-sm sm:text-base">ต่อคน</div>
                  </div>
                  <Separator className="bg-gray-700" />
                  <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
                    <li>• เตียงสามชั้น (บน กลาง ล่าง)</li>
                    <li>• ห้องละ 6 คน (ไม่มีประตู)</li>
                    <li>• ห้องน้ำรวม</li>
                    <li>• เหมาะสำหรับนักเดินทางหนุ่มสาว</li>
                  </ul>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-400 mb-2">รายละเอียดการจอง</h4>
                    <ul className="space-y-1 text-xs text-gray-300">
                      <li>• จองล่วงหน้า 30-60 วัน</li>
                      <li>• ต้องมี Tibet Travel Permit</li>
                      <li>• รวมอาหาร 3 มื้อ</li>
                      <li>• ประกันการเดินทาง</li>
                    </ul>
                  </div>
                  <Button
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white transition-all duration-300 text-sm sm:text-base"
                    onClick={() => handlePackageBook("Hard Sleeper", 2500)}
                  >
                    จองแพ็กเกจนี้
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-blue-600 border-2 relative hover:scale-105 transition-transform duration-300 shadow-2xl">
              <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-red-600 text-white px-3 sm:px-4 py-1 text-xs sm:text-sm">แนะนำ</Badge>
              </div>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg sm:text-xl text-white">Soft Sleeper</CardTitle>
                  <Badge className="bg-blue-600 text-white text-xs sm:text-sm">สมดุล</Badge>
                </div>
                <CardDescription className="text-gray-300 text-sm sm:text-base">
                  นอนนุ่ม - สมดุลระหว่างราคาและความสะดวก
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 sm:space-y-6">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-blue-400">4,500 บาท</div>
                    <div className="text-gray-400 mt-1 text-sm sm:text-base">ต่อคน</div>
                  </div>
                  <Separator className="bg-gray-700" />
                  <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
                    <li>• เตียงสองชั้น (บน ล่าง)</li>
                    <li>• ห้องละ 4 คน (มีประตูปิด)</li>
                    <li>• ห้องน้ำรวม</li>
                    <li>• เหมาะสำหรับครอบครัว</li>
                  </ul>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-400 mb-2">รายละเอียดการจอง</h4>
                    <ul className="space-y-1 text-xs text-gray-300">
                      <li>• จองล่วงหน้า 30-60 วัน</li>
                      <li>• รวมที่พัก 1 คืนในคุนหมิง</li>
                      <li>• รวมอาหาร 3 มื้อ + ขนม</li>
                      <li>• รถรับส่งสถานีรถไฟ</li>
                    </ul>
                  </div>
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700 text-white transition-all duration-300 text-sm sm:text-base"
                    onClick={() => handlePackageBook("Soft Sleeper", 4500)}
                  >
                    จองแพ็กเกจนี้
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-purple-600 border-2 hover:scale-105 transition-transform duration-300 shadow-2xl">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg sm:text-xl text-white">Deluxe Soft Sleeper</CardTitle>
                  <Badge className="bg-purple-600 text-white text-xs sm:text-sm">หรูหรา</Badge>
                </div>
                <CardDescription className="text-gray-300 text-sm sm:text-base">
                  ห้องส่วนตัว - สำหรับผู้ที่ต้องการความสะดวกสบาย
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 sm:space-y-6">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-purple-400">8,000 บาท</div>
                    <div className="text-gray-400 mt-1 text-sm sm:text-base">ต่อคน</div>
                  </div>
                  <Separator className="bg-gray-700" />
                  <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
                    <li>• ห้องส่วนตัว 2 คน</li>
                    <li>• ห้องน้ำในตัว</li>
                    <li>• โต๊ะทำงานและตู้เสื้อผ้า</li>
                    <li>• เหมาะสำหรับคู่รักหรือผู้บริหาร</li>
                  </ul>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-400 mb-2">รายละเอียดการจอง</h4>
                    <ul className="space-y-1 text-xs text-gray-300">
                      <li>• จองล่วงหน้า 60-90 วัน</li>
                      <li>• รวมที่พักหรู 2 คืน</li>
                      <li>• อาหารพิเศษ + มินิบาร์</li>
                      <li>• บริการคอนเซียร์จ</li>
                    </ul>
                  </div>
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 text-sm sm:text-base"
                    onClick={() => handlePackageBook("Deluxe Soft Sleeper", 8000)}
                  >
                    จองแพ็กเกจนี้
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white">ติดต่อจองตั๋วรถไฟ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
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
                      <div className="text-red-100">+66 2-123-4567</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-red-300" />
                    <div>
                      <div className="font-semibold">อีเมล</div>
                      <div className="text-red-100">booking@tibettravel.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-red-300" />
                    <div>
                      <div className="font-semibold">Line ID</div>
                      <div className="text-red-100">@tibettravel</div>
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
                      <div className="font-semibold text-white">เลือกแพ็กเกจ</div>
                      <div className="text-gray-300 text-sm">เลือกประเภทที่นั่งและวันเดินทาง</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      2
                    </div>
                    <div>
                      <div className="font-semibold text-white">ส่งเอกสาร</div>
                      <div className="text-gray-300 text-sm">ส่งสำเนาหนังสือเดินทางและรูปถ่าย</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      3
                    </div>
                    <div>
                      <div className="font-semibold text-white">ชำระเงิน</div>
                      <div className="text-gray-300 text-sm">ชำระมัดจำ 50% เพื่อยืนยันการจอง</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      4
                    </div>
                    <div>
                      <div className="font-semibold text-white">รับตั๋ว</div>
                      <div className="text-gray-300 text-sm">รับตั๋วและเอกสารการเดินทาง</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 flex items-center gap-3">
            <Thermometer className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
            สิ่งที่ควรเตรียม
          </h2>
          <Card className="bg-gray-900 border-green-600 border shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-green-400 text-lg sm:text-xl">
                <Thermometer className="w-5 h-5 sm:w-6 sm:h-6" />
                สิ่งที่ควรเตรียม
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-white">ยาแก้เมาเขา:</strong> Diamox หรือยาที่แพทย์แนะนำ เริ่มกิน 1-2 วันก่อนขึ้นรถไฟ
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-white">เสื้อผ้า:</strong> เสื้อหนาว เสื้อกันลม ถุงเท้าหนา หมวกและถุงมือ
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-white">ของใช้:</strong> ครีมกันแดด SPF 50+ แว่นตากันแดด ลิปบาล์ม
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-white">อาหาร:</strong> ขนมและน้ำดื่มส่วนตัว เพราะอาหารบนรถไฟอาจไม่ถูกปาก
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white">เคล็ดลับการเดินทางด้วยรถไฟ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Card className="bg-gray-900 border-red-600 border shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-red-400 text-lg sm:text-xl">
                  <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
                  ข้อควรระวัง
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base">
                  <li className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">อาการเมาเขา:</strong> เริ่มตั้งแต่ความสูง 3,000 เมตร อาจมีอาการปวดหัว คลื่นไส้
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">อากาศแห้ง:</strong> ดื่มน้ำเยอะๆ ใช้ลิปบาล์มและครีมบำรุงผิว
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">อุณหภูมิ:</strong> ความแตกต่างของอุณหภูมิระหว่างกลางวันและกลางคืนมาก
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">การจอง:</strong> จองล่วงหน้า 30-60 วัน โดยเฉพาะช่วงฤดูท่องเที่ยว
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-green-600 border shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-green-400 text-lg sm:text-xl">
                  <Thermometer className="w-5 h-5 sm:w-6 sm:h-6" />
                  สิ่งที่ควรเตรียม
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base">
                  <li className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">ยาแก้เมาเขา:</strong> Diamox หรือยาที่แพทย์แนะนำ เริ่มกิน 1-2 วันก่อนขึ้นรถไฟ
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">เสื้อผ้า:</strong> เสื้อหนาว เสื้อกันลม ถุงเท้าหนา หมวกและถุงมือ
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">ของใช้:</strong> ครีมกันแดด SPF 50+ แว่นตากันแดด ลิปบาล์ม
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">อาหาร:</strong> ขนมและน้ำดื่มส่วนตัว เพราะอาหารบนรถไฟอาจไม่ถูกปาก
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center gap-3 text-blue-400">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
            คุนหมิง - จุดเริ่มต้น
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {kunmingAccommodations.slice(0, 2).map((accommodation) => (
              <div key={accommodation.id} className="transform hover:scale-105 transition-transform duration-300">
                <AccommodationCard accommodation={accommodation} />
                <div className="mt-3">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm"
                    onClick={() => handleAccommodationBook(accommodation)}
                  >
                    จองที่พักนี้
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center gap-3 text-green-400">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
            ต้าลี่ - เมืองโบราณ
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {daliAccommodations.map((accommodation) => (
              <div key={accommodation.id} className="transform hover:scale-105 transition-transform duration-300">
                <AccommodationCard accommodation={accommodation} />
                <div className="mt-3">
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white text-sm"
                    onClick={() => handleAccommodationBook(accommodation)}
                  >
                    จองที่พักนี้
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center gap-3 text-purple-400">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
            ลี่เจียง - มรดกโลก
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {lijiangAccommodations.map((accommodation) => (
              <div key={accommodation.id} className="transform hover:scale-105 transition-transform duration-300">
                <AccommodationCard accommodation={accommodation} />
                <div className="mt-3">
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm"
                    onClick={() => handleAccommodationBook(accommodation)}
                  >
                    จองที่พักนี้
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center gap-3 text-orange-400">
            <Mountain className="w-5 h-5 sm:w-6 sm:h-6" />
            ชางกรีลา - เตรียมตัวเมาเขา
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {shangrilaAccommodations.map((accommodation) => (
              <div key={accommodation.id} className="transform hover:scale-105 transition-transform duration-300">
                <AccommodationCard accommodation={accommodation} />
                <div className="mt-3">
                  <Button
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white text-sm"
                    onClick={() => handleAccommodationBook(accommodation)}
                  >
                    จองที่พักนี้
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center gap-3 text-red-400">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
            ลาซา - จุดหมายหลัก
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {lhasaAccommodations.map((accommodation) => (
              <div
                key={accommodation.id}
                className="flex flex-col h-full transform hover:scale-105 transition-transform duration-300"
              >
                <div className="flex-1">
                  <AccommodationCard accommodation={accommodation} />
                </div>
                <div className="mt-3 flex-shrink-0">
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700 text-white text-sm"
                    onClick={() => handleAccommodationBook(accommodation)}
                  >
                    จองที่พักนี้
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {bookingModal.open && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">ยืนยันการจอง</h3>
            <div className="space-y-3 text-gray-300">
              <div>แพ็กเกจ: {bookingModal.package?.type}</div>
              <div>ราคา: ฿{bookingModal.package?.price.toLocaleString()}</div>
              <div className="bg-gray-800 p-3 rounded-lg">
                <h4 className="text-red-400 font-semibold mb-2">ติดต่อจอง:</h4>
                <div className="text-sm space-y-1">
                  <div>📞 {bookingModal.package?.contact.phone}</div>
                  <div>📧 {bookingModal.package?.contact.email}</div>
                  <div>💬 {bookingModal.package?.contact.line}</div>
                </div>
              </div>
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
    </div>
  )
}
