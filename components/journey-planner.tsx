"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, MapPin, Clock, Plane, Train, Car } from "lucide-react"
import { format } from "date-fns"
import { th } from "date-fns/locale"

interface JourneyDay {
  day: number
  date: string
  location: string
  activities: string[]
  accommodation: string
  transportation?: string
  notes: string
  elevation: number
}

interface PlannerOptions {
  startDate: Date | undefined
  duration: number
  interests: string[]
  budget: "budget" | "mid-range" | "luxury"
  physicalLevel: "easy" | "moderate" | "challenging"
}

const interestOptions = [
  { id: "culture", label: "วัฒนธรรมและประวัติศาสตร์", icon: "🏛️" },
  { id: "nature", label: "ธรรมชาติและภูเขา", icon: "🏔️" },
  { id: "spiritual", label: "ศาสนาและจิตวิญญาณ", icon: "🙏" },
  { id: "photography", label: "การถ่ายภาพ", icon: "📸" },
  { id: "adventure", label: "การผจญภัย", icon: "🧗" },
  { id: "local-life", label: "วิถีชีวิตท้องถิ่น", icon: "🏘️" },
]

const generateItinerary = (options: PlannerOptions): JourneyDay[] => {
  const { startDate, duration, interests, budget, physicalLevel } = options

  const baseItinerary: Omit<JourneyDay, "date">[] = [
    {
      day: 1,
      location: "กรุงเทพฯ → คุนหมิง",
      activities: [
        "เดินทางจากสุวรรณภูมิไปคุนหมิง (เที่ยวบิน 2.5 ชม.)",
        "เช็คอินที่พัก",
        "เดินเล่นรอบ Green Lake Park",
        "ทานอาหารเย็นและพักผ่อน",
      ],
      accommodation:
        budget === "luxury"
          ? "Intercontinental Kunming"
          : budget === "mid-range"
            ? "Kunming Hotel"
            : "Kunming Youth Hostel",
      transportation: "เครื่องบิน Thai Airways/China Eastern",
      notes: "ปรับเวลาและพักผ่อนให้เพียงพอ",
      elevation: 1892,
    },
    {
      day: 2,
      location: "คุนหมิง",
      activities: ["เยือน Stone Forest (ป่าหิน)", "สำรวจ Kunming Old Town", "ช้อปปิ้งที่ Nanping Street", "เตรียมตัวสำหรับรถไฟ"],
      accommodation: "เดียวกับวันที่ 1",
      notes: "วันสุดท้ายในระดับความสูงปกติ",
      elevation: 1892,
    },
    {
      day: 3,
      location: "คุนหมิง → ลาซา (รถไฟ)",
      activities: ["ขึ้นรถไฟ Tibet Railway เวลา 20:00", "ชมวิวภูเขาและทุ่งหญ้า", "พักผ่อนบนรถไฟ", "เตรียมตัวสำหรับความสูง"],
      accommodation: "รถไฟ Tibet Railway",
      transportation: "รถไฟ Qinghai-Tibet Railway",
      notes: "เริ่มใช้ยาแก้เมาเขา ดื่มน้ำเยอะๆ",
      elevation: 2000,
    },
    {
      day: 4,
      location: "รถไฟ → ลาซา",
      activities: ["ผ่าน Tanggula Pass (5,072 ม.)", "ชมทิวทัศน์ทิเบต", "มาถึงลาซา เวลา 16:00", "เช็คอินและพักผ่อน"],
      accommodation:
        budget === "luxury" ? "St. Regis Lhasa Resort" : budget === "mid-range" ? "Shangri-La Lhasa" : "Yak Hotel",
      notes: "วันแรกในลาซา - พักผ่อนเป็นหลัก",
      elevation: 3650,
    },
    {
      day: 5,
      location: "ลาซา",
      activities: ["เยือน Potala Palace (เช้า)", "เดินเล่น Barkhor Street", "เยือน Jokhang Temple", "ปรับตัวกับความสูง"],
      accommodation: "เดียวกับวันที่ 4",
      notes: "วันแรกของการท่องเที่ยวจริง - ไม่ควรเร่งรีบ",
      elevation: 3650,
    },
  ]

  // Add more days based on duration and interests
  const additionalDays: Omit<JourneyDay, "date">[] = []

  if (duration >= 7) {
    additionalDays.push({
      day: 6,
      location: "ลาซา",
      activities: interests.includes("spiritual")
        ? ["เยือน Sera Monastery", "ชมการโต้วาทางพุทธศาสนา", "เยือน Drepung Monastery", "สมาธิและพักผ่อน"]
        : ["เยือน Norbulingka Palace", "Tibet Museum", "ช้อปปิ้งของที่ระลึก", "พักผ่อน"],
      accommodation: "เดียวกับวันที่ 4",
      notes: "วันที่สองในลาซา - สำรวจเพิ่มเติม",
      elevation: 3650,
    })

    additionalDays.push({
      day: 7,
      location: "ลาซา → กรุงเทพฯ",
      activities: ["เช็คเอาท์และเตรียมของ", "เดินทางไปสนามบิน", "บินกลับกรุงเทพฯ", "มาถึงสุวรรณภูมิ"],
      accommodation: "-",
      transportation: "เครื่องบิน Tibet Airlines/Air China",
      notes: "สิ้นสุดการเดินทาง",
      elevation: 2,
    })
  }

  if (duration >= 10) {
    // Add Namtso Lake trip
    additionalDays.splice(-1, 0, {
      day: 7,
      location: "ลาซา → ทะเลสาบนัมโซ",
      activities: ["เดินทางไปทะเลสาบนัมโซ (4 ชม.)", "ชมทิวทัศน์ทะเลสาบศักดิ์สิทธิ์", "ถ่ายภาพและพักผ่อน", "พักค้างคืนริมทะเลสาบ"],
      accommodation: "Namtso Lake Guesthouse",
      transportation: "รถตู้ท่องเที่ยว",
      notes: "ความสูง 4,718 ม. - ระวังอาการเมาเขา",
      elevation: 4718,
    })

    additionalDays.splice(-1, 0, {
      day: 8,
      location: "ทะเลสาบนัมโซ → ลาซา",
      activities: ["ชมพระอาทิตย์ขึ้นที่ทะเลสาบ", "เดินทางกลับลาซา", "พักผ่อนและเตรียมตัว", "ช้อปปิ้งของฝาก"],
      accommodation: "เดียวกับวันที่ 4",
      notes: "วันสุดท้ายในลาซา",
      elevation: 3650,
    })
  }

  const fullItinerary = [...baseItinerary, ...additionalDays]

  // Add dates to itinerary
  return fullItinerary.slice(0, duration).map((day, index) => {
    const date = new Date(startDate || new Date())
    date.setDate(date.getDate() + index)
    return {
      ...day,
      day: index + 1,
      date: format(date, "dd/MM/yyyy", { locale: th }),
    }
  })
}

export default function JourneyPlanner() {
  const [options, setOptions] = useState<PlannerOptions>({
    startDate: undefined,
    duration: 7,
    interests: ["culture", "spiritual"],
    budget: "mid-range",
    physicalLevel: "moderate",
  })

  const [itinerary, setItinerary] = useState<JourneyDay[]>([])
  const [showItinerary, setShowItinerary] = useState(false)

  useEffect(() => {
    if (options.startDate) {
      const newItinerary = generateItinerary(options)
      setItinerary(newItinerary)
    }
  }, [options])

  const handleInterestChange = (interestId: string, checked: boolean) => {
    setOptions((prev) => ({
      ...prev,
      interests: checked ? [...prev.interests, interestId] : prev.interests.filter((id) => id !== interestId),
    }))
  }

  const generatePlan = () => {
    if (!options.startDate) {
      alert("กรุณาเลือกวันที่เดินทาง")
      return
    }
    setShowItinerary(true)
  }

  return (
    <div className="space-y-6">
      {/* Planning Form */}
      <Card>
        <CardHeader>
          <CardTitle>วางแผนการเดินทางของคุณ</CardTitle>
          <CardDescription>กรอกข้อมูลเพื่อสร้างแผนการเดินทางที่เหมาะกับคุณ</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>วันที่เดินทาง</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {options.startDate ? format(options.startDate, "dd/MM/yyyy", { locale: th }) : "เลือกวันที่"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={options.startDate}
                      onSelect={(date) => setOptions({ ...options, startDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="duration">จำนวนวัน</Label>
                <Select
                  value={options.duration.toString()}
                  onValueChange={(value) => setOptions({ ...options, duration: Number.parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 วัน (พื้นฐาน)</SelectItem>
                    <SelectItem value="7">7 วัน (แนะนำ)</SelectItem>
                    <SelectItem value="10">10 วัน (สมบูรณ์)</SelectItem>
                    <SelectItem value="14">14 วัน (ครบครัน)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>งบประมาณ</Label>
                <Select
                  value={options.budget}
                  onValueChange={(value: "budget" | "mid-range" | "luxury") =>
                    setOptions({ ...options, budget: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">ประหยัด (45,000-55,000 บาท)</SelectItem>
                    <SelectItem value="mid-range">ปานกลาง (70,000-90,000 บาท)</SelectItem>
                    <SelectItem value="luxury">หรูหรา (120,000-150,000 บาท)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>ระดับความท้าทาย</Label>
                <Select
                  value={options.physicalLevel}
                  onValueChange={(value: "easy" | "moderate" | "challenging") =>
                    setOptions({ ...options, physicalLevel: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">ง่าย (เหมาะกับทุกคน)</SelectItem>
                    <SelectItem value="moderate">ปานกลาง (ต้องมีสุขภาพดี)</SelectItem>
                    <SelectItem value="challenging">ท้าทาย (สำหรับผู้มีประสบการณ์)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-base font-semibold">สิ่งที่สนใจ (เลือกได้หลายอย่าง)</Label>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {interestOptions.map((interest) => (
                  <div key={interest.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={interest.id}
                      checked={options.interests.includes(interest.id)}
                      onCheckedChange={(checked) => handleInterestChange(interest.id, checked as boolean)}
                    />
                    <Label htmlFor={interest.id} className="text-sm cursor-pointer">
                      {interest.icon} {interest.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button onClick={generatePlan} size="lg" className="px-8">
              สร้างแผนการเดินทาง
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generated Itinerary */}
      {showItinerary && itinerary.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>แผนการเดินทางของคุณ</span>
              <Badge variant="secondary">
                {options.duration} วัน |{" "}
                {options.budget === "budget" ? "ประหยัด" : options.budget === "mid-range" ? "ปานกลาง" : "หรูหรา"}
              </Badge>
            </CardTitle>
            <CardDescription>แผนการเดินทางที่ปรับแต่งตามความสนใจและงบประมาณของคุณ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {itinerary.map((day, index) => (
                <div key={day.day} className="relative">
                  {index < itinerary.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-full bg-border"></div>
                  )}

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                        {day.day}
                      </div>
                    </div>

                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {day.location}
                        </h3>
                        <p className="text-sm text-muted-foreground">{day.date}</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">กิจกรรม</h4>
                          <ul className="space-y-1 text-sm">
                            {day.activities.map((activity, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <Clock className="h-3 w-3 mt-1 flex-shrink-0" />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium mb-1">ที่พัก</h4>
                            <p className="text-sm text-muted-foreground">{day.accommodation}</p>
                          </div>

                          {day.transportation && (
                            <div>
                              <h4 className="font-medium mb-1">การเดินทาง</h4>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                {day.transportation.includes("เครื่องบิน") ? (
                                  <Plane className="h-3 w-3" />
                                ) : day.transportation.includes("รถไฟ") ? (
                                  <Train className="h-3 w-3" />
                                ) : (
                                  <Car className="h-3 w-3" />
                                )}
                                {day.transportation}
                              </p>
                            </div>
                          )}

                          <div>
                            <h4 className="font-medium mb-1">ความสูง</h4>
                            <p className="text-sm text-muted-foreground">{day.elevation.toLocaleString()} เมตร</p>
                          </div>
                        </div>
                      </div>

                      {day.notes && (
                        <div className="bg-yellow-50 p-3 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            <strong>หมายเหตุ:</strong> {day.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Travel Tips */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>เคล็ดลับการวางแผน</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• เลือกเดินทางในช่วง เมษายน-ตุลาคม สำหรับอากาศดี</li>
              <li>• จองล่วงหน้า 2-3 เดือน โดยเฉพาะช่วงฤดูท่องเที่ยว</li>
              <li>• เตรียมยาแก้เมาเขาและดื่มน้ำเยอะๆ</li>
              <li>• นำเสื้อผ้าหนาวและกันลมไปด้วย</li>
              <li>• ตรวจสอบวีซ่าและใบอนุญาตให้ครบถ้วน</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ข้อควรระวัง</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• อาการเมาเขาอาจเกิดขึ้นได้ตั้งแต่ความสูง 2,500 ม.</li>
              <li>• หลีกเลี่ยงการดื่มแอลกอฮอล์ในวันแรก</li>
              <li>• ไม่ควรออกแรงมากในวันแรกที่ลาซา</li>
              <li>• เตรียมครีมกันแดดและแว่นตากันแดด</li>
              <li>• มีประกันการเดินทางที่ครอบคลุมความสูง</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Packing Checklist */}
      <Card>
        <CardHeader>
          <CardTitle>รายการสิ่งของที่ควรเตรียม</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-3">เสื้อผ้า</h4>
              <ul className="space-y-1 text-sm">
                <li>• เสื้อแจ็คเก็ตกันลม</li>
                <li>• เสื้อกันหนาว</li>
                <li>• เสื้อผ้าแบบชั้นๆ</li>
                <li>• กางเกงขายาว</li>
                <li>• รองเท้าเดินป่า</li>
                <li>• ถุงมือและหมวก</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">ยาและสุขภาพ</h4>
              <ul className="space-y-1 text-sm">
                <li>• ยาแก้เมาเขา (Diamox)</li>
                <li>• ยาแก้ปวดหัว</li>
                <li>• ยาธาตุเหล็ก</li>
                <li>• วิตามินซี</li>
                <li>• ครีมทาผิวแห้ง</li>
                <li>• ยาส่วนตัว</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">อุปกรณ์อื่นๆ</h4>
              <ul className="space-y-1 text-sm">
                <li>• ครีมกันแดด SPF 50+</li>
                <li>• แว่นตากันแดด</li>
                <li>• กล้องถ่ายรูป</li>
                <li>• แบตเตอรี่สำรอง</li>
                <li>• ถุงนอนบาง (สำรอง)</li>
                <li>• เอกสารสำคัญ</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
