"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface CostBreakdown {
  transportation: number
  accommodation: number
  food: number
  permits: number
  guide: number
  insurance: number
  miscellaneous: number
  total: number
}

interface TravelOptions {
  duration: number
  travelers: number
  accommodationType: "budget" | "mid-range" | "luxury"
  transportationType: "economy" | "business"
  includeOptionalTrips: boolean
}

const baseCosts = {
  // Transportation costs (per person)
  transportation: {
    economy: {
      flight_bkk_kunming: 8000,
      train_kunming_lhasa_hard: 2500,
      train_kunming_lhasa_soft: 4500,
      train_kunming_lhasa_deluxe: 8000,
      local_transport: 3000,
    },
    business: {
      flight_bkk_kunming: 15000,
      train_kunming_lhasa_soft: 4500,
      train_kunming_lhasa_deluxe: 8000,
      local_transport: 5000,
    },
  },
  // Accommodation costs (per person per night)
  accommodation: {
    budget: 800,
    "mid-range": 2000,
    luxury: 5000,
  },
  // Food costs (per person per day)
  food: {
    budget: 600,
    "mid-range": 1200,
    luxury: 2500,
  },
  // Fixed costs (per person)
  permits: {
    china_visa: 1500,
    tibet_permit: 800,
    alien_travel_permit: 500,
  },
  // Guide costs (per group per day)
  guide: {
    english_speaking: 2000,
    thai_speaking: 3000,
  },
  // Insurance (per person)
  insurance: {
    basic: 1500,
    comprehensive: 3000,
  },
  // Optional trips
  optional: {
    namtso_lake: 4000,
    everest_base_camp: 8000,
    mount_kailash: 15000,
  },
}

export default function CostCalculator() {
  const [options, setOptions] = useState<TravelOptions>({
    duration: 7,
    travelers: 2,
    accommodationType: "mid-range",
    transportationType: "economy",
    includeOptionalTrips: false,
  })

  const [breakdown, setBreakdown] = useState<CostBreakdown>({
    transportation: 0,
    accommodation: 0,
    food: 0,
    permits: 0,
    guide: 0,
    insurance: 0,
    miscellaneous: 0,
    total: 0,
  })

  const [selectedOptionalTrips, setSelectedOptionalTrips] = useState<string[]>([])

  useEffect(() => {
    calculateCosts()
  }, [options, selectedOptionalTrips])

  const calculateCosts = () => {
    const { duration, travelers, accommodationType, transportationType, includeOptionalTrips } = options

    // Transportation costs
    let transportationCost = 0
    if (transportationType === "economy") {
      transportationCost =
        baseCosts.transportation.economy.flight_bkk_kunming +
        baseCosts.transportation.economy.train_kunming_lhasa_soft +
        baseCosts.transportation.economy.local_transport
    } else {
      transportationCost =
        baseCosts.transportation.business.flight_bkk_kunming +
        baseCosts.transportation.business.train_kunming_lhasa_deluxe +
        baseCosts.transportation.business.local_transport
    }
    transportationCost *= travelers

    // Accommodation costs
    const accommodationCost = baseCosts.accommodation[accommodationType] * duration * travelers

    // Food costs
    const foodCost = baseCosts.food[accommodationType] * duration * travelers

    // Permits costs
    const permitsCost =
      (baseCosts.permits.china_visa + baseCosts.permits.tibet_permit + baseCosts.permits.alien_travel_permit) *
      travelers

    // Guide costs (shared among group)
    const guideCost = baseCosts.guide.english_speaking * duration

    // Insurance costs
    const insuranceCost = baseCosts.insurance.comprehensive * travelers

    // Optional trips
    let optionalCost = 0
    if (includeOptionalTrips) {
      selectedOptionalTrips.forEach((trip) => {
        optionalCost += baseCosts.optional[trip as keyof typeof baseCosts.optional] * travelers
      })
    }

    // Miscellaneous (10% of subtotal)
    const subtotal = transportationCost + accommodationCost + foodCost + permitsCost + guideCost + insuranceCost
    const miscellaneousCost = Math.round(subtotal * 0.1)

    const total = subtotal + miscellaneousCost + optionalCost

    setBreakdown({
      transportation: transportationCost,
      accommodation: accommodationCost,
      food: foodCost,
      permits: permitsCost,
      guide: guideCost,
      insurance: insuranceCost,
      miscellaneous: miscellaneousCost + optionalCost,
      total,
    })
  }

  const handleOptionalTripToggle = (trip: string) => {
    setSelectedOptionalTrips((prev) => (prev.includes(trip) ? prev.filter((t) => t !== trip) : [...prev, trip]))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Calculator Form */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>ตั้งค่าการเดินทาง</CardTitle>
            <CardDescription>กรอกข้อมูลเพื่อคำนวณค่าใช้จ่าย</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="duration">จำนวนวัน</Label>
                <Input
                  id="duration"
                  type="number"
                  min="5"
                  max="30"
                  value={options.duration}
                  onChange={(e) => setOptions({ ...options, duration: Number.parseInt(e.target.value) || 7 })}
                />
              </div>
              <div>
                <Label htmlFor="travelers">จำนวนคน</Label>
                <Input
                  id="travelers"
                  type="number"
                  min="1"
                  max="10"
                  value={options.travelers}
                  onChange={(e) => setOptions({ ...options, travelers: Number.parseInt(e.target.value) || 2 })}
                />
              </div>
            </div>

            <div>
              <Label>ระดับที่พัก</Label>
              <Select
                value={options.accommodationType}
                onValueChange={(value: "budget" | "mid-range" | "luxury") =>
                  setOptions({ ...options, accommodationType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">ประหยัด (800 บาท/คืน)</SelectItem>
                  <SelectItem value="mid-range">ปานกลาง (2,000 บาท/คืน)</SelectItem>
                  <SelectItem value="luxury">หรูหรา (5,000 บาท/คืน)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>ระดับการเดินทาง</Label>
              <Select
                value={options.transportationType}
                onValueChange={(value: "economy" | "business") => setOptions({ ...options, transportationType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">ประหยัด (รถไฟนอนนุ่ม)</SelectItem>
                  <SelectItem value="business">สะดวกสบาย (รถไฟ Deluxe)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-semibold">ทริปเสริม (เลือกได้)</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <span className="font-medium">ทะเลสาบนัมโซ</span>
                    <p className="text-sm text-muted-foreground">4,000 บาท/คน</p>
                  </div>
                  <Button
                    variant={selectedOptionalTrips.includes("namtso_lake") ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleOptionalTripToggle("namtso_lake")}
                  >
                    {selectedOptionalTrips.includes("namtso_lake") ? "เลือกแล้ว" : "เลือก"}
                  </Button>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <span className="font-medium">ฐานเขาเอเวอเรสต์</span>
                    <p className="text-sm text-muted-foreground">8,000 บาท/คน</p>
                  </div>
                  <Button
                    variant={selectedOptionalTrips.includes("everest_base_camp") ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleOptionalTripToggle("everest_base_camp")}
                  >
                    {selectedOptionalTrips.includes("everest_base_camp") ? "เลือกแล้ว" : "เลือก"}
                  </Button>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <span className="font-medium">ภูเขาไกลาส</span>
                    <p className="text-sm text-muted-foreground">15,000 บาท/คน</p>
                  </div>
                  <Button
                    variant={selectedOptionalTrips.includes("mount_kailash") ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleOptionalTripToggle("mount_kailash")}
                  >
                    {selectedOptionalTrips.includes("mount_kailash") ? "เลือกแล้ว" : "เลือก"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>สรุปค่าใช้จ่าย</span>
              <Badge variant="secondary">
                {options.travelers} คน, {options.duration} วัน
              </Badge>
            </CardTitle>
            <CardDescription>รายละเอียดค่าใช้จ่ายทั้งหมด</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>ค่าเดินทาง</span>
                <span className="font-semibold">{formatCurrency(breakdown.transportation)}</span>
              </div>
              <div className="flex justify-between">
                <span>ค่าที่พัก</span>
                <span className="font-semibold">{formatCurrency(breakdown.accommodation)}</span>
              </div>
              <div className="flex justify-between">
                <span>ค่าอาหาร</span>
                <span className="font-semibold">{formatCurrency(breakdown.food)}</span>
              </div>
              <div className="flex justify-between">
                <span>ค่าวีซ่าและใบอนุญาต</span>
                <span className="font-semibold">{formatCurrency(breakdown.permits)}</span>
              </div>
              <div className="flex justify-between">
                <span>ค่าไกด์</span>
                <span className="font-semibold">{formatCurrency(breakdown.guide)}</span>
              </div>
              <div className="flex justify-between">
                <span>ค่าประกันภัย</span>
                <span className="font-semibold">{formatCurrency(breakdown.insurance)}</span>
              </div>
              <div className="flex justify-between">
                <span>ค่าใช้จ่ายอื่นๆ</span>
                <span className="font-semibold">{formatCurrency(breakdown.miscellaneous)}</span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>รวมทั้งหมด</span>
                <span className="text-primary">{formatCurrency(breakdown.total)}</span>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>ค่าใช้จ่ายต่อคน: {formatCurrency(breakdown.total / options.travelers)}</p>
                <p>ค่าใช้จ่ายต่อวัน: {formatCurrency(breakdown.total / options.duration)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>เปรียบเทียบค่าใช้จ่าย</CardTitle>
          <CardDescription>ค่าใช้จ่ายในระดับต่างๆ สำหรับ 2 คน 7 วัน</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">แบบประหยัด</h4>
              <div className="text-2xl font-bold text-green-600 mb-2">฿45,000 - 55,000</div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• ที่พักประหยัด</li>
                <li>• รถไฟนอนแข็ง</li>
                <li>• อาหารท้องถิ่น</li>
                <li>• ไม่รวมทริปเสริม</li>
              </ul>
            </div>

            <div className="text-center p-4 border rounded-lg border-primary">
              <h4 className="font-semibold mb-2">แบบปานกลาง</h4>
              <div className="text-2xl font-bold text-blue-600 mb-2">฿70,000 - 90,000</div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• ที่พักปานกลาง</li>
                <li>• รถไฟนอนนุ่ม</li>
                <li>• อาหารหลากหลาย</li>
                <li>• รวมทริปเสริม 1-2 ที่</li>
              </ul>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">แบบหรูหรา</h4>
              <div className="text-2xl font-bold text-purple-600 mb-2">฿120,000 - 150,000</div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• ที่พักหรูหรา</li>
                <li>• รถไฟ Deluxe</li>
                <li>• อาหารพรีเมียม</li>
                <li>• รวมทริปเสริมทั้งหมด</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Money Saving Tips */}
      <Card>
        <CardHeader>
          <CardTitle>เคล็ดลับประหยัดค่าใช้จ่าย</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-green-600">วิธีประหยัด</h4>
              <ul className="space-y-2 text-sm">
                <li>• เดินทางในช่วง Low Season (พฤศจิกายน-มีนาคม)</li>
                <li>• จองล่วงหน้า 2-3 เดือน</li>
                <li>• เลือกที่พักแบบ Shared Room</li>
                <li>• กินอาหารท้องถิ่นแทนอาหารนานาชาติ</li>
                <li>• เดินทางเป็นกลุ่มใหญ่เพื่อแบ่งค่าไกด์</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-red-600">ค่าใช้จ่ายที่หลีกเลี่ยงไม่ได้</h4>
              <ul className="space-y-2 text-sm">
                <li>• ค่าวีซ่าจีนและใบอนุญาตทิเบต</li>
                <li>• ค่าไกด์ท้องถิ่น (บังคับใช้)</li>
                <li>• ค่าประกันภัยการเดินทาง</li>
                <li>• ค่าขนส่งภายในทิเบต</li>
                <li>• ค่าเข้าชมสถานที่ท่องเที่ยว</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Notes */}
      <Card>
        <CardHeader>
          <CardTitle>หมายเหตุสำคัญ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <ul className="space-y-2 text-sm">
              <li>• ราคาอาจเปลี่ยนแปลงตามฤดูกาลและอัตราแลกเปลี่ยน</li>
              <li>• ค่าใช้จ่ายนี้ไม่รวมการช้อปปิ้งและค่าใช้จ่ายส่วนตัว</li>
              <li>• ควรเตรียมเงินสำรองเพิ่มอีก 10-20% สำหรับเหตุฉุกเฉิน</li>
              <li>• ราคาอ้างอิงจากข้อมูล ณ เดือนมกราคม 2024</li>
              <li>• แนะนำให้ติดต่อตัวแทนท่องเที่ยวเพื่อราคาที่แน่นอน</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
