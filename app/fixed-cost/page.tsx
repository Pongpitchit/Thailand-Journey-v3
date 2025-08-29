"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Check, X, Star, Users, Calendar, MapPin, Eye, Clock, Utensils, Car, Bed } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function FixedCostPlanPage() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)

  const packages = [
    {
      id: "budget",
      name: "แพ็กเกจประหยัด",
      subtitle: "เหมาะสำหรับนักเดินทางงบจำกัด",
      price: 45000,
      duration: "7 วัน 6 คืน",
      groupSize: "6-12 คน",
      transport: "รถไฟ + รถบัส",
      accommodation: "โฮสเทล/เกสต์เฮาส์",
      color: "orange",
      popular: false,
      detailedInfo: {
        meals: ["อาหารเช้า: ข้าวต้ม, ขนมปัง, ชา/กาแฟ", "อาหารกลางวัน: อาหารจีน-ทิเบตผสม", "อาหารเย็น: อาหารท้องถิ่น, ยากเนื้อยัก"],
        accommodations: ["คุนหมิง: Green Lake Youth Hostel (2 คืน)", "ลาซา: Yak Hotel (3 คืน)", "นัมโซ: Tented Camp (1 คืน)"],
        transportation: [
          "เครื่องบิน: กรุงเทพฯ-คุนหมิง (Thai Airways)",
          "รถไฟ: คุนหมิง-ลาซา (Hard Sleeper, 20 ชม.)",
          "รถบัส: ท้องถิ่นและระหว่างเมือง",
        ],
        activities: [
          "พระราชวังโปตาลา (ค่าเข้าชม 200 หยวน)",
          "วัดโจคัง (ค่าเข้าชม 85 หยวน)",
          "ตลาดบาร์คอร์ (ช้อปปิ้งอิสระ)",
          "วัดเซรา (ค่าเข้าชม 50 หยวน)",
          "ทะเลสาบนัมโซ (ค่าเข้าชม 120 หยวน)",
        ],
      },
      includes: [
        "ตั๋วเครื่องบิน กรุงเทพฯ-คุนหมิง",
        "รถไฟ คุนหมิง-ลาซา (Hard Sleeper)",
        "ที่พัก 6 คืน (โฮสเทล/เกสต์เฮาส์)",
        "อาหาร 3 มื้อ/วัน (อาหารท้องถิ่น)",
        "ไกด์ท้องถิ่นและล่าม",
        "Tibet Travel Permit",
        "รถรับส่งสนามบิน/สถานีรถไฟ",
        "ประกันการเดินทางพื้นฐาน",
      ],
      excludes: ["วีซ่าจีน (1,500 บาท)", "ค่าทิปไกด์และคนขับ", "ค่าใช้จ่ายส่วนตัว", "อาหารและเครื่องดื่มพิเศษ", "ค่าเข้าชมสถานที่บางแห่ง"],
      itinerary: [
        "วันที่ 1: เดินทางถึงคุนหมิง, พักผ่อน",
        "วันที่ 2: ขึ้นรถไฟไปลาซา (20 ชม.)",
        "วันที่ 3: ถึงลาซา, ปรับตัวกับความสูง",
        "วันที่ 4: เที่ยวพระราชวังโปตาลา, วัดโจคัง",
        "วันที่ 5: ตลาดบาร์คอร์, วัดเซรา",
        "วันที่ 6: ทะเลสาบนัมโซ (ทริปวันเดียว)",
        "วันที่ 7: เดินทางกลับ",
      ],
    },
    {
      id: "standard",
      name: "แพ็กเกจมาตรฐาน",
      subtitle: "สมดุลระหว่างราคาและความสะดวกสบาย",
      price: 85000,
      duration: "9 วัน 8 คืน",
      groupSize: "4-8 คน",
      transport: "เครื่องบิน + รถส่วนตัว",
      accommodation: "โรงแรม 3-4 ดาว",
      color: "blue",
      popular: true,
      detailedInfo: {
        meals: ["อาหารเช้า: บุฟเฟ่ต์นานาชาติ", "อาหารกลางวัน: อาหารไทย-จีน-ทิเบต", "อาหารเย็น: อาหารพิเศษ + cultural show"],
        accommodations: [
          "คุนหมิง: Intercontinental Hotel (2 คืน)",
          "ลาซา: Four Points by Sheraton (4 คืน)",
          "นัมโซ: Namtso Tented Resort (1 คืน)",
          "ชิกาเซ่: Qomolangma Hotel (1 คืน)",
        ],
        transportation: [
          "เครื่องบิน: กรุงเทพฯ-คุนหมิง-ลาซา (China Eastern)",
          "รถส่วนตัว: Toyota Land Cruiser พร้อมคนขับ",
          "รถรับส่ง: VIP transfer ทุกจุด",
        ],
        activities: [
          "พระราชวังโปตาลา (VIP entrance)",
          "วัดโจคัง + พิธีกรรมพิเศษ",
          "วัดเดรปุง (debate session)",
          "วัดเซรา (monk debate)",
          "ทะเลสาบนัมโซ (ค้างคืน)",
          "ชิกาเซ่ + วัดตาชิลุนโป",
        ],
      },
      includes: [
        "ตั๋วเครื่องบิน กรุงเทพฯ-คุนหมิง-ลาซา",
        "ที่พัก 8 คืน (โรงแรม 3-4 ดาว)",
        "อาหาร 3 มื้อ/วัน (ผสมไทย-ทิเบต)",
        "รถส่วนตัวพร้อมคนขับ",
        "ไกด์มืออาชีพและล่าม",
        "Tibet Travel Permit + วีซ่าจีน",
        "ค่าเข้าชมสถานที่ทุกแห่ง",
        "ประกันการเดินทางครอบคลุม",
        "ออกซิเจนพกพาและยาแก้เมาเขา",
      ],
      excludes: ["ค่าทิปไกด์และคนขับ", "ค่าใช้จ่ายส่วนตัว", "อาหารและเครื่องดื่มพิเศษ", "กิจกรรมเสริม (นวดแผนโบราณ)"],
      itinerary: [
        "วันที่ 1: เดินทางถึงคุนหมิง, เที่ยวเมือง",
        "วันที่ 2: บินไปลาซา, ปรับตัวกับความสูง",
        "วันที่ 3: พระราชวังโปตาลา, วัดโจคัง",
        "วันที่ 4: วัดเดรปุง, วัดเซรา",
        "วันที่ 5: ทะเลสาบนัมโซ (ค้างคืน)",
        "วันที่ 6: กลับลาซา, ตลาดบาร์คอร์",
        "วันที่ 7: เดินทางไปชิกาเซ่",
        "วันที่ 8: วัดตาชิลุนโป, กลับลาซา",
        "วันที่ 9: เดินทางกลับ",
      ],
    },
    {
      id: "luxury",
      name: "แพ็กเกจหรูหรา",
      subtitle: "ประสบการณ์ระดับพรีเมียมสุดหรู",
      price: 150000,
      duration: "12 วัน 11 คืน",
      groupSize: "2-6 คน",
      transport: "เครื่องบินชั้นธุรกิจ + รถหรู",
      accommodation: "โรงแรม 5 ดาว/รีสอร์ท",
      color: "purple",
      popular: false,
      detailedInfo: {
        meals: [
          "อาหารเช้า: À la carte premium breakfast",
          "อาหารกลางวัน: Fine dining experience",
          "อาหารเย็น: Michelin-style cuisine + wine pairing",
        ],
        accommodations: [
          "คุนหมิง: Grand Park Kunming (2 คืน)",
          "ลาซา: St. Regis Lhasa Resort (6 คืน)",
          "นัมโซ: Luxury Glamping Resort (2 คืน)",
          "ชิกาเซ่: Qomolangma Luxury Hotel (1 คืน)",
        ],
        transportation: [
          "เครื่องบิน: ชั้นธุรกิจ Thai Airways/China Eastern",
          "รถหรู: Mercedes-Benz V-Class พร้อมคนขับส่วนตัว",
          "เฮลิคอปเตอร์: scenic flight (optional)",
        ],
        activities: [
          "พระราชวังโปตาลา (private tour)",
          "วัดโจคัง + private blessing ceremony",
          "วัดเดรปุง (exclusive access)",
          "ทะเลสาบนัมโซ (luxury camping)",
          "ฐานเขาเอเวอเรสต์ (weather permitting)",
          "นวดแผนโบราณทิเบต",
          "Private shopping experience",
        ],
      },
      includes: [
        "ตั๋วเครื่องบินชั้นธุรกิจ (กรุงเทพฯ-ลาซา)",
        "ที่พัก 11 คืน (โรงแรม 5 ดาว/รีสอร์ท)",
        "อาหารระดับพรีเมียม + อาหารพิเศษ",
        "รถหรูพร้อมคนขับส่วนตัว",
        "ไกด์ผู้เชี่ยวชาญและล่ามส่วนตัว",
        "Tibet Travel Permit + วีซ่าจีน (VIP)",
        "ค่าเข้าชมสถานที่ทุกแห่ง + กิจกรรมพิเศษ",
        "ประกันการเดินทางระดับพรีเมียม",
        "ระบบออกซิเจนส่วนตัว + แพทย์ติดตาม",
        "นวดแผนโบราณทิเบต",
        "ของที่ระลึกพิเศษ",
      ],
      excludes: ["ค่าใช้จ่ายส่วนตัวพิเศษ", "กิจกรรมเสริมนอกโปรแกรม"],
      itinerary: [
        "วันที่ 1-2: เดินทางถึงคุนหมิง, พักโรงแรม 5 ดาว",
        "วันที่ 3: บินชั้นธุรกิจไปลาซา, St. Regis Resort",
        "วันที่ 4: พระราชวังโปตาลา (VIP Tour)",
        "วันที่ 5: วัดโจคัง + พิธีกรรมพิเศษ",
        "วันที่ 6-7: ทะเลสาบนัมโซ (รีสอร์ทหรู)",
        "วันที่ 8: วัดเดรปุง + นวดแผนโบราณ",
        "วันที่ 9-10: ชิกาเซ่ + ฐานเขาเอเวอเรสต์",
        "วันที่ 11: ช้อปปิ้งและพักผ่อน",
        "วันที่ 12: เดินทางกลับ",
      ],
    },
  ]

  const getColorClasses = (color: string, type: "bg" | "text" | "border") => {
    const colors = {
      orange: {
        bg: "bg-orange-600",
        text: "text-orange-400",
        border: "border-orange-600",
      },
      blue: {
        bg: "bg-blue-600",
        text: "text-blue-400",
        border: "border-blue-600",
      },
      purple: {
        bg: "bg-purple-600",
        text: "text-purple-400",
        border: "border-purple-600",
      },
    }
    return colors[color as keyof typeof colors][type]
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-900 to-red-600 py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold hover:text-red-300 transition-colors">
              ← คู่มือเดินทางไปทิเบต
            </Link>
            <div className="flex items-center gap-3">
              <Star className="w-8 h-8" />
              <h1 className="text-4xl font-bold tracking-wide">แผนค่าใช้จ่ายคงที่</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">แพ็กเกจทัวร์ทิเบตราคาตายตัว</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            เลือกแพ็กเกจที่เหมาะกับงบประมาณและความต้องการของคุณ ราคารวมทุกอย่างไม่มีค่าใช้จ่ายแอบแฝง พร้อมการันตีคุณภาพ
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Badge className="bg-red-600 text-white px-6 py-3 text-base">
              <Users className="w-5 h-5 mr-2" />
              รับจำนวนจำกัด
            </Badge>
            <Badge className="bg-red-600 text-white px-6 py-3 text-base">
              <Calendar className="w-5 h-5 mr-2" />
              จองล่วงหน้า 60 วัน
            </Badge>
            <Badge className="bg-red-600 text-white px-6 py-3 text-base">
              <MapPin className="w-5 h-5 mr-2" />
              รวม Tibet Permit
            </Badge>
          </div>
        </section>

        {/* Package Comparison */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <Card
                key={pkg.id}
                className={`relative bg-gray-900 ${getColorClasses(pkg.color, "border")} border-2 hover:scale-105 transition-transform duration-300 shadow-2xl`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-red-600 text-white px-4 py-1">
                      <Star className="w-4 h-4 mr-1" />
                      แนะนำ
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl text-white">{pkg.name}</CardTitle>
                  <CardDescription className="text-gray-300 text-base">{pkg.subtitle}</CardDescription>
                  <div className="mt-6">
                    <div className={`text-4xl font-bold ${getColorClasses(pkg.color, "text")}`}>
                      {pkg.price.toLocaleString()} บาท
                    </div>
                    <div className="text-gray-400 mt-1">ต่อคน</div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Package Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">ระยะเวลา:</span>
                      <p className="font-semibold text-white">{pkg.duration}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">กลุ่ม:</span>
                      <p className="font-semibold text-white">{pkg.groupSize}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">การเดินทาง:</span>
                      <p className="font-semibold text-white">{pkg.transport}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">ที่พัก:</span>
                      <p className="font-semibold text-white">{pkg.accommodation}</p>
                    </div>
                  </div>

                  <Separator className="bg-gray-700" />

                  {/* Includes */}
                  <div>
                    <h4 className="font-semibold mb-3 text-green-400">✓ รวมในราคา</h4>
                    <ul className="space-y-2 text-sm">
                      {pkg.includes.slice(0, 4).map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                      {pkg.includes.length > 4 && (
                        <li className="text-gray-400 text-sm">... และอีก {pkg.includes.length - 4} รายการ</li>
                      )}
                    </ul>
                  </div>

                  <Separator className="bg-gray-700" />

                  {/* Itinerary Preview */}
                  <div>
                    <h4 className="font-semibold mb-3 text-white">📋 กำหนดการเดินทาง</h4>
                    <ul className="space-y-1 text-sm">
                      {pkg.itinerary.slice(0, 3).map((day, index) => (
                        <li key={index} className="text-gray-300">
                          {day}
                        </li>
                      ))}
                      {pkg.itinerary.length > 3 && (
                        <li className="text-gray-400">... และอีก {pkg.itinerary.length - 3} วัน</li>
                      )}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full bg-transparent border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition-all duration-300 px-8 py-3"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          ดูรายละเอียดเพิ่มเติม
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gray-900 text-white border-gray-700">
                        <DialogHeader>
                          <DialogTitle className="text-2xl text-white">{pkg.name}</DialogTitle>
                          <DialogDescription className="text-gray-300">{pkg.subtitle}</DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6">
                          {/* Detailed Meals */}
                          <div>
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white">
                              <Utensils className="w-5 h-5" />
                              อาหารและเครื่องดื่ม
                            </h3>
                            <ul className="space-y-2">
                              {pkg.detailedInfo.meals.map((meal, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-300">{meal}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <Separator className="bg-gray-700" />

                          {/* Detailed Accommodations */}
                          <div>
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white">
                              <Bed className="w-5 h-5" />
                              ที่พักรายละเอียด
                            </h3>
                            <ul className="space-y-2">
                              {pkg.detailedInfo.accommodations.map((acc, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-300">{acc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <Separator className="bg-gray-700" />

                          {/* Detailed Transportation */}
                          <div>
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white">
                              <Car className="w-5 h-5" />
                              การเดินทางรายละเอียด
                            </h3>
                            <ul className="space-y-2">
                              {pkg.detailedInfo.transportation.map((transport, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-300">{transport}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <Separator className="bg-gray-700" />

                          {/* Detailed Activities */}
                          <div>
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white">
                              <MapPin className="w-5 h-5" />
                              กิจกรรมและสถานที่ท่องเที่ยว
                            </h3>
                            <ul className="space-y-2">
                              {pkg.detailedInfo.activities.map((activity, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-300">{activity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <Separator className="bg-gray-700" />

                          {/* Complete Itinerary */}
                          <div>
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white">
                              <Clock className="w-5 h-5" />
                              กำหนดการเดินทางทั้งหมด
                            </h3>
                            <ul className="space-y-2">
                              {pkg.itinerary.map((day, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <Badge
                                    variant="outline"
                                    className="mt-0.5 flex-shrink-0 border-gray-600 text-gray-300"
                                  >
                                    {index + 1}
                                  </Badge>
                                  <span className="text-gray-300">{day}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <Separator className="bg-gray-700" />

                          {/* Complete Includes/Excludes */}
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h3 className="text-lg font-semibold mb-3 text-green-400">✓ รวมในราคาทั้งหมด</h3>
                              <ul className="space-y-2 text-sm">
                                {pkg.includes.map((item, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-300">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold mb-3 text-red-400">✗ ไม่รวมในราคา</h3>
                              <ul className="space-y-2 text-sm">
                                {pkg.excludes.map((item, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-300">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button
                      className={`w-full ${getColorClasses(pkg.color, "bg")} hover:opacity-90 transition-all duration-300 px-8 py-3`}
                    >
                      เลือกแพ็กเกจนี้
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Additional Information */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gray-900 border-gray-700 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white">เงื่อนไขการจอง</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-white">การชำระเงิน</h4>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• มัดจำ 30% เมื่อจอง</li>
                    <li>• ชำระส่วนที่เหลือ 30 วันก่อนเดินทาง</li>
                    <li>• รับชำระผ่านโอนธนาคาร หรือบัตรเครดิต</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-white">การยกเลิก</h4>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• ยกเลิก 60+ วัน: คืนเงิน 90%</li>
                    <li>• ยกเลิก 30-59 วัน: คืนเงิน 70%</li>
                    <li>• ยกเลิก 15-29 วัน: คืนเงิน 50%</li>
                    <li>• ยกเลิกน้อยกว่า 15 วัน: ไม่คืนเงิน</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white">ข้อมูลสำคัญ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-white">เอกสารที่ต้องเตรียม</h4>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• หนังสือเดินทางอายุเหลือ 6 เดือน</li>
                    <li>• รูปถ่าย 2x2 นิ้ว จำนวน 4 รูป</li>
                    <li>• หนังสือรับรองแพทย์ (สำหรับผู้สูงอายุ)</li>
                    <li>• ใบรับรองการทำงาน/เงินเดือน</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-white">ข้อควรทราบ</h4>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• อายุ 18-70 ปี (เด็กและผู้สูงอายุปรึกษาเพิ่มเติม)</li>
                    <li>• ไม่เหมาะสำหรับผู้มีโรคหัวใจ/ความดันโลหิตสูง</li>
                    <li>• ควรซื้อประกันการเดินทางเพิ่มเติม</li>
                    <li>• กำหนดการอาจเปลี่ยนแปลงตามสภาพอากาศ</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-red-900 to-red-700 text-white border-gray-800 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">พร้อมจองแล้วใช่ไหม?</CardTitle>
              <CardDescription className="text-red-100 text-lg">ติดต่อเราเพื่อปรึกษาและจองแพ็กเกจที่เหมาะกับคุณ</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-black/30 rounded-lg p-6 backdrop-blur-sm">
                  <h4 className="font-semibold mb-3 text-lg">โทรศัพท์</h4>
                  <p>02-123-4567</p>
                  <p>089-123-4567</p>
                </div>
                <div className="bg-black/30 rounded-lg p-6 backdrop-blur-sm">
                  <h4 className="font-semibold mb-3 text-lg">อีเมล</h4>
                  <p>info@tibettravel.com</p>
                  <p>booking@tibettravel.com</p>
                </div>
                <div className="bg-black/30 rounded-lg p-6 backdrop-blur-sm">
                  <h4 className="font-semibold mb-3 text-lg">Line ID</h4>
                  <p>@tibettravel</p>
                  <p>@tibetbooking</p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-6 mt-8">
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3">
                  ปรึกษาฟรี
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-red-600 bg-transparent px-8 py-3"
                >
                  ดาวน์โหลดโบรชัวร์
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-6">
          <Link href="/">
            <Button
              className="bg-transparent border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition-all duration-300 px-8 py-3"
              variant="outline"
            >
              กลับหน้าแรก
            </Button>
          </Link>
          <Link href="/calculator">
            <Button
              className="bg-transparent border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition-all duration-300 px-8 py-3"
              variant="outline"
            >
              คำนวณค่าใช้จ่ายเอง
            </Button>
          </Link>
          <Link href="/train">
            <Button
              className="bg-transparent border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition-all duration-300 px-8 py-3"
              variant="outline"
            >
              ดูข้อมูลรถไฟ
            </Button>
          </Link>
          <Link href="/flights">
            <Button
              className="bg-transparent border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition-all duration-300 px-8 py-3"
              variant="outline"
            >
              ดูข้อมูลเครื่องบิน
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
