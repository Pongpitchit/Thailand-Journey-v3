import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AccommodationCard } from "@/components/accommodation-card"
import { getAccommodationsByCity } from "@/data/accommodations"
import { Plane, MapPin, AlertTriangle, DollarSign, Calendar } from "lucide-react"
import Link from "next/link"

export default function FlightTravelPage() {
  const kunmingAccommodations = getAccommodationsByCity("Kunming")
  const lhasaAccommodations = getAccommodationsByCity("Lhasa")

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-50">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold hover:opacity-80">
              ← คู่มือเดินทางไปทิเบต
            </Link>
            <div className="flex items-center gap-2">
              <Plane className="w-8 h-8" />
              <h1 className="text-3xl font-bold">การเดินทางด้วยเครื่องบิน</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-sky-600 to-blue-600 text-white">
            <CardHeader>
              <CardTitle className="text-3xl">เที่ยวบินไปทิเบต</CardTitle>
              <CardDescription className="text-sky-100 text-lg">
                เดินทางรวดเร็วและสะดวกสบาย - เหมาะสำหรับผู้ที่มีเวลาจำกัด
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">2-5 ชม.</div>
                  <div className="text-sm opacity-90">เวลาเดินทาง</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">2 เส้นทาง</div>
                  <div className="text-sm opacity-90">ตัวเลือกหลัก</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">8,000+ บาท</div>
                  <div className="text-sm opacity-90">ราคาเริ่มต้น</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">ทุกวัน</div>
                  <div className="text-sm opacity-90">ความถี่เที่ยวบิน</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Flight Routes Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Plane className="w-6 h-6" />
            เส้นทางการบิน
          </h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Route 1: Via China */}
            <Card className="border-2 border-blue-200 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600">แนะนำ</Badge>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  เส้นทางที่ 1: ผ่านจีน
                </CardTitle>
                <CardDescription>กรุงเทพฯ → คุนหมิง → ลาซา</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">ขั้นตอนที่ 1: กรุงเทพฯ → คุนหมิง</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">เวลาบิน:</span>
                        <p className="font-semibold">2.5 ชั่วโมง</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">สายการบิน:</span>
                        <p className="font-semibold">Thai Airways, China Eastern</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">ราคา:</span>
                        <p className="font-semibold">8,000-15,000 บาท</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">ความถี่:</span>
                        <p className="font-semibold">ทุกวัน</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">ขั้นตอนที่ 2: คุนหมิง → ลาซา</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">เวลาบิน:</span>
                        <p className="font-semibold">2 ชั่วโมง</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">สายการบิน:</span>
                        <p className="font-semibold">China Eastern, Tibet Airlines</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">ราคา:</span>
                        <p className="font-semibold">6,000-12,000 บาท</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">ความถี่:</span>
                        <p className="font-semibold">3-4 เที่ยว/วัน</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-100 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">รวมค่าใช้จ่าย:</span>
                      <span className="text-xl font-bold text-blue-600">14,000-27,000 บาท</span>
                    </div>
                    <div className="text-sm text-blue-700 mt-1">เวลารวม: 4.5 ชั่วโมง + เวลาแวะ</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Route 2: Via Nepal */}
            <Card className="border-2 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-600" />
                  เส้นทางที่ 2: ผ่านเนปาล
                </CardTitle>
                <CardDescription>กรุงเทพฯ → กาฐมาณฑุ → ลาซา</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">ขั้นตอนที่ 1: กรุงเทพฯ → กาฐมาณฑุ</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">เวลาบิน:</span>
                        <p className="font-semibold">3 ชั่วโมง</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">สายการบิน:</span>
                        <p className="font-semibold">Thai Airways, Nepal Airlines</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">ราคา:</span>
                        <p className="font-semibold">12,000-20,000 บาท</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">ความถี่:</span>
                        <p className="font-semibold">ทุกวัน</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">ขั้นตอนที่ 2: กาฐมาณฑุ → ลาซา</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">เวลาบิน:</span>
                        <p className="font-semibold">1.5 ชั่วโมง</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">สายการบิน:</span>
                        <p className="font-semibold">Air China, Tibet Airlines</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">ราคา:</span>
                        <p className="font-semibold">8,000-15,000 บาท</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">ความถี่:</span>
                        <p className="font-semibold">2-3 เที่ยว/วัน</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-100 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">รวมค่าใช้จ่าย:</span>
                      <span className="text-xl font-bold text-orange-600">20,000-35,000 บาท</span>
                    </div>
                    <div className="text-sm text-orange-700 mt-1">เวลารวม: 4.5 ชั่วโมง + เวลาแวะ</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Airlines Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">สายการบินแนะนำ</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Thai Airways</CardTitle>
                <CardDescription>สายการบินแห่งชาติไทย</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>เส้นทาง:</span>
                    <span className="font-semibold">BKK-KMG</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ราคา:</span>
                    <span className="font-semibold">10,000-18,000 บาท</span>
                  </div>
                  <div className="flex justify-between">
                    <span>บริการ:</span>
                    <span className="font-semibold">⭐⭐⭐⭐⭐</span>
                  </div>
                  <Badge variant="secondary" className="w-full justify-center">
                    แนะนำ
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">China Eastern</CardTitle>
                <CardDescription>สายการบินจีน</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>เส้นทาง:</span>
                    <span className="font-semibold">BKK-KMG-LXA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ราคา:</span>
                    <span className="font-semibold">14,000-25,000 บาท</span>
                  </div>
                  <div className="flex justify-between">
                    <span>บริการ:</span>
                    <span className="font-semibold">⭐⭐⭐⭐</span>
                  </div>
                  <Badge variant="outline" className="w-full justify-center">
                    ราคาดี
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Tibet Airlines</CardTitle>
                <CardDescription>สายการบินทิเบต</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>เส้นทาง:</span>
                    <span className="font-semibold">KMG-LXA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ราคา:</span>
                    <span className="font-semibold">6,000-12,000 บาท</span>
                  </div>
                  <div className="flex justify-between">
                    <span>บริการ:</span>
                    <span className="font-semibold">⭐⭐⭐⭐</span>
                  </div>
                  <Badge variant="outline" className="w-full justify-center">
                    เฉพาะทาง
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Air China</CardTitle>
                <CardDescription>สายการบินแห่งชาติจีน</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>เส้นทาง:</span>
                    <span className="font-semibold">KTM-LXA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ราคา:</span>
                    <span className="font-semibold">8,000-15,000 บาท</span>
                  </div>
                  <div className="flex justify-between">
                    <span>บริการ:</span>
                    <span className="font-semibold">⭐⭐⭐⭐</span>
                  </div>
                  <Badge variant="outline" className="w-full justify-center">
                    มาตรฐาน
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Flight vs Train Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">เปรียบเทียบ: เครื่องบิน vs รถไฟ</h2>
          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">หัวข้อ</th>
                      <th className="text-center py-3 px-4 bg-sky-50">✈️ เครื่องบิน</th>
                      <th className="text-center py-3 px-4 bg-blue-50">🚂 รถไฟ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-semibold">เวลาเดินทาง</td>
                      <td className="text-center py-3 px-4 bg-sky-50">4-6 ชั่วโมง</td>
                      <td className="text-center py-3 px-4 bg-blue-50">20 ชั่วโมง</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-semibold">ราคา</td>
                      <td className="text-center py-3 px-4 bg-sky-50">14,000-35,000 บาท</td>
                      <td className="text-center py-3 px-4 bg-blue-50">2,500-8,000 บาท</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-semibold">ความสะดวกสบาย</td>
                      <td className="text-center py-3 px-4 bg-sky-50">⭐⭐⭐⭐</td>
                      <td className="text-center py-3 px-4 bg-blue-50">⭐⭐⭐</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-semibold">ประสบการณ์</td>
                      <td className="text-center py-3 px-4 bg-sky-50">⭐⭐⭐</td>
                      <td className="text-center py-3 px-4 bg-blue-50">⭐⭐⭐⭐⭐</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-semibold">ความยืดหยุ่น</td>
                      <td className="text-center py-3 px-4 bg-sky-50">⭐⭐⭐⭐</td>
                      <td className="text-center py-3 px-4 bg-blue-50">⭐⭐</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold">เหมาะสำหรับ</td>
                      <td className="text-center py-3 px-4 bg-sky-50">เวลาจำกัด, ผู้บริหาร</td>
                      <td className="text-center py-3 px-4 bg-blue-50">นักผจญภัย, งบประมาณ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Accommodations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">ที่พักแนะนำ</h2>

          {/* Kunming */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              คุนหมิง - จุดแวะพัก
            </h3>
            <p className="text-muted-foreground mb-4">หากเลือกเส้นทางผ่านจีน แนะนำให้พักคืนหนึ่งที่คุนหมิงเพื่อพักผ่อนและปรับเวลา</p>
            <div className="grid md:grid-cols-2 gap-6">
              {kunmingAccommodations.slice(0, 2).map((accommodation) => (
                <AccommodationCard key={accommodation.id} accommodation={accommodation} />
              ))}
            </div>
          </div>

          {/* Lhasa */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-600" />
              ลาซา - จุดหมายหลัก
            </h3>
            <p className="text-muted-foreground mb-4">ที่พักในลาซาควรมีระบบออกซิเจนเสริม เนื่องจากความสูง 3,650 เมตร</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {lhasaAccommodations.map((accommodation) => (
                <AccommodationCard key={accommodation.id} accommodation={accommodation} />
              ))}
            </div>
          </div>
        </section>

        {/* Flight Travel Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">เคล็ดลับการเดินทางด้วยเครื่องบิน</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <DollarSign className="w-5 h-5" />
                  ประหยัดค่าใช้จ่าย
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>จองล่วงหน้า:</strong> จอง 2-3 เดือนล่วงหน้าเพื่อราคาดีที่สุด
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>เลือกวันบิน:</strong> หลีกเลี่ยงวันหยุดและช่วงเทศกาล
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>เปรียบเทียบราคา:</strong> ใช้เว็บเปรียบเทียบราคาหลายเว็บ
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>ตั้งแจ้งเตือน:</strong> ตั้งแจ้งเตือนราคาเพื่อติดตามโปรโมชั่น
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <Calendar className="w-5 h-5" />
                  การเตรียมตัว
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>เอกสาร:</strong> ตรวจสอบวีซ่าและ Tibet Travel Permit
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>สุขภาพ:</strong> ตรวจสุขภาพและเตรียมยาแก้เมาเขา
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>กระเป๋า:</strong> เตรียมเสื้อผ้าหนาวและของใช้จำเป็น
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>ประกันการเดินทาง:</strong> ซื้อประกันที่ครอบคลุมความสูง
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                ข้อควรระวังสำคัญ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">การบินไปลาซา</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• ความสูง 3,650 เมตร - อาจมีอาการเมาเขาทันที</li>
                    <li>• แนะนำให้พักผ่อนวันแรกและไม่ออกแรงมาก</li>
                    <li>• ดื่มน้ำเยอะและหลีกเลี่ยงแอลกอฮอล์</li>
                    <li>• มีแพทย์ประจำสนามบินลาซา</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">ข้อจำกัดการบิน</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• ต้องมี Tibet Travel Permit ก่อนขึ้นเครื่อง</li>
                    <li>• ไม่สามารถเดินทางเองได้ ต้องมีไกด์</li>
                    <li>• เที่ยวบินอาจยกเลิกเนื่องจากสภาพอากาศ</li>
                    <li>• ราคาตั๋วผันผวนตามฤดูกาล</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/">
            <Button variant="outline">กลับหน้าแรก</Button>
          </Link>
          <Link href="/train">
            <Button variant="outline">เปรียบเทียบรถไฟ</Button>
          </Link>
          <Link href="/map">
            <Button>ดูแผนที่ 3D</Button>
          </Link>
          <Link href="/calculator">
            <Button variant="outline">คำนวณค่าใช้จ่าย</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
