import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { ArrowLeft, Train, MapPin, Clock, AlertTriangle, CheckCircle } from "lucide-react"

export default function RoutesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-t from-black via-black/50 to-transparent">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/tibet-landscape-potala-palace-mountains-dramatic-s.png')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />

        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>กลับหน้าแรก</span>
          </Link>

          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">เส้นทางสู่ทิเบต</h1>
            <p className="text-xl text-gray-300 mb-6">
              ค้นพบเส้นทางที่สวยงามที่สุดในการเดินทางสู่หลังคาโลก พร้อมข้อมูลครบถ้วนสำหรับนักเดินทางชาวไทย
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                <Train className="w-5 h-5 mr-2" />
                ดูข้อมูลรถไฟ
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black bg-transparent"
              >
                <MapPin className="w-5 h-5 mr-2" />
                ดูแผนที่
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Main Routes Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">เส้นทางหลัก</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-600">แนะนำ</Badge>
                  <CardTitle className="text-white">เส้นทางที่ 1: ผ่านจีน</CardTitle>
                </div>
                <CardDescription className="text-gray-400">เส้นทางที่นิยมและสะดวกที่สุด</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                    <Badge variant="outline" className="bg-blue-600 text-white border-blue-600">
                      1
                    </Badge>
                    <div>
                      <p className="text-white font-medium">กรุงเทพฯ → คุนหมิง</p>
                      <p className="text-gray-400 text-sm">เครื่องบิน 2.5 ชั่วโมง</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                    <Badge variant="outline" className="bg-blue-600 text-white border-blue-600">
                      2
                    </Badge>
                    <div>
                      <p className="text-white font-medium">คุนหมิง → ลาซา</p>
                      <p className="text-gray-400 text-sm">รถไฟ 20 ชั่วโมง</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                    <Badge variant="outline" className="bg-blue-600 text-white border-blue-600">
                      3
                    </Badge>
                    <div>
                      <p className="text-white font-medium">ลาซา → จุดหมายในทิเบต</p>
                      <p className="text-gray-400 text-sm">รถยนต์หรือทัวร์</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors">
              <CardHeader>
                <CardTitle className="text-white">เส้นทางที่ 2: ผ่านเนปาล</CardTitle>
                <CardDescription className="text-gray-400">เส้นทางทางเลือกสำหรับผู้ที่ต้องการประสบการณ์แตกต่าง</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                    <Badge variant="outline" className="bg-orange-600 text-white border-orange-600">
                      1
                    </Badge>
                    <div>
                      <p className="text-white font-medium">กรุงเทพฯ → กาฐมาณฑุ</p>
                      <p className="text-gray-400 text-sm">เครื่องบิน 3 ชั่วโมง</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                    <Badge variant="outline" className="bg-orange-600 text-white border-orange-600">
                      2
                    </Badge>
                    <div>
                      <p className="text-white font-medium">กาฐมาณฑุ → ลาซา</p>
                      <p className="text-gray-400 text-sm">รถบัส/เครื่องบิน</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 p-6 bg-blue-900/30 border border-blue-800 rounded-lg">
            <h4 className="font-semibold text-blue-300 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              ข้อมูลสำคัญ
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-200">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 text-blue-400" />
                <span>ต้องมีวีซ่าจีนและใบอนุญาตเข้าทิเบต</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 text-blue-400" />
                <span>ระยะทางรวม: ประมาณ 3,500 กิโลเมตร</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 text-blue-400" />
                <span>เวลาเดินทางรวม: 7-10 วัน</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 text-blue-400" />
                <span>ความสูงเฉลี่ย: 3,650 เมตร</span>
              </div>
            </div>
          </div>
        </section>

        {/* Railway Information */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">ข้อมูลรถไฟสำคัญ</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Train className="w-6 h-6 text-blue-400" />
                  Qinghai-Tibet Railway
                </CardTitle>
                <CardDescription className="text-gray-400">รถไฟสายสูงที่สุดในโลก</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-4 text-white">เส้นทาง: คุนหมิง → ลาซา</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-gray-800 rounded-lg">
                        <span className="text-gray-400 text-sm">ระยะทาง</span>
                        <p className="font-semibold text-white">1,142 กม.</p>
                      </div>
                      <div className="p-3 bg-gray-800 rounded-lg">
                        <span className="text-gray-400 text-sm">เวลาเดินทาง</span>
                        <p className="font-semibold text-white">20 ชั่วโมง</p>
                      </div>
                      <div className="p-3 bg-gray-800 rounded-lg">
                        <span className="text-gray-400 text-sm">ความสูงสูงสุด</span>
                        <p className="font-semibold text-white">5,072 ม.</p>
                      </div>
                      <div className="p-3 bg-gray-800 rounded-lg">
                        <span className="text-gray-400 text-sm">ราคา</span>
                        <p className="font-semibold text-white">2,500-8,000 ฿</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-gray-700" />

                  <div>
                    <h4 className="font-semibold mb-4 text-white">สถานีสำคัญ</h4>
                    <div className="space-y-3">
                      {[
                        { name: "Kunming South (คุนหมิงใต้)", badge: "จุดเริ่มต้น", color: "bg-green-600" },
                        { name: "Dali (ต้าลี่)", badge: "1 ชม.", color: "bg-gray-600" },
                        { name: "Lijiang (ลี่เจียง)", badge: "3 ชม.", color: "bg-gray-600" },
                        { name: "Shangri-La (ชางกรีลา)", badge: "6 ชม.", color: "bg-gray-600" },
                        { name: "Lhasa (ลาซา)", badge: "จุดหมาย", color: "bg-red-600" },
                      ].map((station, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-800 rounded">
                          <span className="text-white">{station.name}</span>
                          <Badge className={`${station.color} text-white`}>{station.badge}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">ตัวเลือกที่นั่ง</CardTitle>
                <CardDescription className="text-gray-400">ประเภทที่นั่งและราคา (THB)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border border-gray-700 rounded-lg p-4 bg-gray-800">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-white">Hard Sleeper (นอนแข็ง)</h4>
                      <Badge className="bg-green-600 text-white">2,500 ฿</Badge>
                    </div>
                    <p className="text-sm text-gray-400">เตียงสามชั้น ห้องละ 6 คน เหมาะสำหรับงบประมาณจำกัด</p>
                  </div>

                  <div className="border border-gray-700 rounded-lg p-4 bg-gray-800">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-white">Soft Sleeper (นอนนุ่ม)</h4>
                      <Badge className="bg-blue-600 text-white">4,500 ฿</Badge>
                    </div>
                    <p className="text-sm text-gray-400">เตียงสองชั้น ห้องละ 4 คน สะดวกสบายกว่า</p>
                  </div>

                  <div className="border border-gray-700 rounded-lg p-4 bg-gray-800">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-white">Deluxe Soft Sleeper</h4>
                      <Badge className="bg-purple-600 text-white">8,000 ฿</Badge>
                    </div>
                    <p className="text-sm text-gray-400">ห้องส่วนตัว 2 คน พร้อมห้องน้ำในตัว</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-orange-900/30 border border-orange-800 rounded-lg">
                  <p className="text-sm text-orange-200">
                    <strong>คำแนะนำ:</strong> จองล่วงหน้า 30-60 วัน โดยเฉพาะช่วงฤดูท่องเที่ยว (เมษายน-ตุลาคม)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Points of Interest */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">สถานที่น่าสนใจระหว่างทาง</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "คุนหมิง (Kunming)",
                subtitle: "เมืองแห่งดอกไม้นิรันดร์",
                attractions: "Stone Forest, Green Lake Park",
                food: "Cross Bridge Rice Noodles",
                stay: "1-2 คืน",
                badge: "จุดเชื่อมต่อสำคัญ",
                badgeColor: "bg-blue-600",
              },
              {
                title: "ต้าลี่ (Dali)",
                subtitle: "เมืองโบราณริมทะเลสาบ",
                attractions: "Dali Ancient Town, Erhai Lake",
                culture: "ชาวไป (Bai People)",
                stay: "1 คืน",
                badge: "ระหว่างทาง",
                badgeColor: "bg-gray-600",
              },
              {
                title: "ลี่เจียง (Lijiang)",
                subtitle: "มรดกโลกยูเนสโก",
                attractions: "Old Town, Jade Dragon Snow Mountain",
                culture: "ชาวนาซี (Naxi People)",
                stay: "2 คืน",
                badge: "ระหว่างทาง",
                badgeColor: "bg-gray-600",
              },
              {
                title: "ชางกรีลา (Shangri-La)",
                subtitle: "เมืองในฝันแห่งหิมาลัย",
                attractions: "Songzanlin Monastery, Tiger Leaping Gorge",
                altitude: "3,200 เมตร",
                stay: "2 คืน",
                badge: "เตรียมตัวเมาเขา",
                badgeColor: "bg-yellow-600",
              },
              {
                title: "ลาซา (Lhasa)",
                subtitle: "เมืองหลวงของทิเบต",
                attractions: "Potala Palace, Jokhang Temple",
                altitude: "3,650 เมตร",
                stay: "3-5 คืน",
                badge: "จุดหมายหลัก",
                badgeColor: "bg-red-600",
              },
              {
                title: "ทะเลสาบนัมโซ",
                subtitle: "ทะเลสาบศักดิ์สิทธิ์",
                distance: "250 กม. จากลาซา",
                altitude: "4,718 เมตร",
                stay: "1 คืน",
                badge: "ทริปเสริม",
                badgeColor: "bg-purple-600",
              },
            ].map((place, index) => (
              <Card
                key={index}
                className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-all duration-300 hover:scale-105"
              >
                <CardHeader>
                  <CardTitle className="text-lg text-white">{place.title}</CardTitle>
                  <CardDescription className="text-gray-400">{place.subtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    {place.attractions && (
                      <div>
                        <span className="text-gray-400">ที่เที่ยว:</span>
                        <p className="text-white">{place.attractions}</p>
                      </div>
                    )}
                    {place.food && (
                      <div>
                        <span className="text-gray-400">อาหาร:</span>
                        <p className="text-white">{place.food}</p>
                      </div>
                    )}
                    {place.culture && (
                      <div>
                        <span className="text-gray-400">วัฒนธรรม:</span>
                        <p className="text-white">{place.culture}</p>
                      </div>
                    )}
                    {place.altitude && (
                      <div>
                        <span className="text-gray-400">ความสูง:</span>
                        <p className="text-white">{place.altitude}</p>
                      </div>
                    )}
                    {place.distance && (
                      <div>
                        <span className="text-gray-400">ระยะทาง:</span>
                        <p className="text-white">{place.distance}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-400">แนะนำพัก:</span>
                      <p className="text-white">{place.stay}</p>
                    </div>
                    <Badge className={`${place.badgeColor} text-white`}>{place.badge}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Travel Tips */}
        <section className="mb-16">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">เคล็ดลับสำคัญ</CardTitle>
              <CardDescription className="text-gray-400">ข้อควรรู้ก่อนเดินทาง</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4 text-red-400 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    ข้อควรระวัง
                  </h4>
                  <ul className="space-y-3 text-sm">
                    {[
                      "อาการเมาเขา - ควรพักผ่อนให้เพียงพอ",
                      "อากาศแห้งและหนาว - เตรียมเสื้อผ้าให้เพียงพอ",
                      "ระดับออกซิเจนต่ำ - หลีกเลี่ยงการออกแรงมาก",
                      "ต้องมีไกด์ท้องถิ่น - ไม่สามารถเที่ยวเองได้",
                    ].map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300">
                        <AlertTriangle className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4 text-green-400 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    สิ่งที่ควรเตรียม
                  </h4>
                  <ul className="space-y-3 text-sm">
                    {["ยาแก้เมาเขา (Diamox)", "เสื้อผ้าหนาวและกันลม", "ครีมกันแดดและแว่นตากันแดด", "เอกสารเดินทางครบถ้วน"].map(
                      (item, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-300">
                          <CheckCircle className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Navigation */}
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              กลับหน้าแรก
            </Button>
          </Link>
          <Link href="/map">
            <Button className="bg-red-600 hover:bg-red-700">
              <MapPin className="w-4 h-4 mr-2" />
              ดูแผนที่ 3D
            </Button>
          </Link>
          <Link href="/calculator">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent">
              <Clock className="w-4 h-4 mr-2" />
              คำนวณค่าใช้จ่าย
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
