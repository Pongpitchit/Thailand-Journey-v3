import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function HomePage() {
  const interestingPlaces = [
    {
      name: "พระราชวังโปตาลา",
      location: "ลาซา, ทิเบต",
      description: "พระราชวังที่สูงที่สุดในโลก สัญลักษณ์ของทิเบต",
      image: "/potala-palace-tibet-majestic-red-and-white-palace-.png",
      highlights: ["ความสูง 3,700 เมตร", "1,000 ห้อง", "มรดกโลก UNESCO"],
    },
    {
      name: "ทะเลสาบนัมโซ",
      location: "ทิเบต",
      description: "ทะเลสาบศักดิ์สิทธิ์ที่สูงที่สุดในโลก",
      image: "/namtso-lake-tibet-crystal-blue-high-altitude-sacre.png",
      highlights: ["ความสูง 4,718 เมตร", "น้ำใสสีฟ้าคราม", "ทะเลสาบศักดิ์สิทธิ์"],
    },
    {
      name: "วัดโจคัง",
      location: "ลาซา, ทิเบต",
      description: "วัดที่ศักดิ์สิทธิ์ที่สุดในทิเบต",
      image: "/jokhang-temple-tibet-golden-roof-buddhist-temple-p.png",
      highlights: ["อายุ 1,300 ปี", "หัวใจของลาซา", "จุดแสวงบุญสำคัญ"],
    },
    {
      name: "ภูเขาเอเวอเรสต์",
      location: "ชายแดนทิเบต-เนปาล",
      description: "ยอดเขาที่สูงที่สุดในโลก มุมมองจากฝั่งทิเบต",
      image: "/mount-everest-tibet-side-snow-peak-highest-mountai.png",
      highlights: ["ความสูง 8,848 เมตร", "ยอดเขาสูงสุดโลก", "ค่ายฐานทิเบต"],
    },
    {
      name: "หุบเขายาร์ลุง",
      location: "ทิเบต",
      description: "หุบเขาที่ลึกที่สุดในโลก ธรรมชาติสวยงาม",
      image: "/yarlung-valley-tibet-deep-canyon-river-green-lands.png",
      highlights: ["ความลึก 6,009 เมตร", "แม่น้ำยาร์ลุง", "ธรรมชาติอันงดงาม"],
    },
    {
      name: "เมืองชิกาเซ",
      location: "ทิเบต",
      description: "เมืองใหญ่อันดับสองของทิเบต",
      image: "/shigatse-tibet-traditional-city-monastery-mountain.png",
      highlights: ["วัดตาชิลุนโป", "เมืองการค้า", "ทุ่งข้าวบาร์เลย์"],
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Netflix-style Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/tibet-landscape-potala-palace-mountains-dramatic-s.png')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-left max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            คู่มือเดินทาง
            <br />
            <span className="text-red-500">ไปทิเบต</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-200 leading-relaxed">
            ค้นพบเส้นทางสู่หลังคาโลก พร้อมข้อมูลครบครัน ตั้งแต่การวางแผน การคำนวณค่าใช้จ่าย ไปจนถึงสถานที่น่าสนใจระหว่างทาง
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link href="/planner">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold"
              >
                ▶ เริ่มวางแผนการเดินทาง
              </Button>
            </Link>
            <Link href="/map">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-black px-6 sm:px-8 py-3 text-base sm:text-lg bg-transparent"
              >
                ข้อมูลเพิ่มเติม
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-12 sm:py-16 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-red-500 mb-2">~3,500 กม.</div>
              <div className="text-base sm:text-lg text-gray-300">ระยะทางรวม</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-red-500 mb-2">7-10 วัน</div>
              <div className="text-base sm:text-lg text-gray-300">เวลาเดินทาง</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-red-500 mb-2">3,650 ม.</div>
              <div className="text-base sm:text-lg text-gray-300">ความสูงเฉลี่ย</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white">สถานที่น่าสนใจระหว่างทาง</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {interestingPlaces.map((place, index) => (
              <Card
                key={index}
                className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-all duration-300 hover:scale-105 cursor-pointer group overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={place.image || "/placeholder.svg"}
                    alt={place.name}
                    className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                    <h3 className="text-white font-bold text-base sm:text-lg mb-1">{place.name}</h3>
                    <p className="text-gray-300 text-xs sm:text-sm">{place.location}</p>
                  </div>
                </div>
                <CardContent className="p-3 sm:p-4">
                  <p className="text-gray-300 mb-3 text-xs sm:text-sm leading-relaxed">{place.description}</p>
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
                    {place.highlights.map((highlight, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-red-600/20 text-red-400 border-red-600/30 text-xs"
                      >
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                  {place.name === "พระราชวังโปตาลา" && (
                    <div className="bg-gray-800 p-3 rounded-lg mt-3 space-y-2">
                      <h4 className="text-red-400 font-semibold text-sm">รายละเอียดการติดต่อ:</h4>
                      <div className="text-xs text-gray-300 space-y-1">
                        <div>📞 โทร: +66 2-456-7890</div>
                        <div>📧 อีเมล: lhasa@tibettravel.com</div>
                        <div>💬 Line: @lhasatravel</div>
                        <div>🕒 เปิด: 09:00-18:00 น.</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white">เลือกหัวข้อที่สนใจ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { href: "/map", icon: "🗺️", title: "แผนที่เส้นทาง", desc: "ดูแผนที่ 3D และเส้นทางแบบโต้ตอบ" },
              { href: "/train", icon: "🚂", title: "การเดินทางด้วยรถไฟ", desc: "ตารางเวลา ราคา และที่พักแนะนำ" },
              { href: "/flights", icon: "✈️", title: "การเดินทางด้วยเครื่องบิน", desc: "เที่ยวบิน ราคา และสายการบิน" },
              { href: "/planner", icon: "📋", title: "วางแผนการเดินทาง", desc: "สร้างแผนส่วนตัวตามความต้องการ" },
              { href: "/routes", icon: "🏔️", title: "สถานที่น่าเที่ยว", desc: "จุดหมายและกิจกรรมระหว่างทาง" },
              { href: "/calculator", icon: "💰", title: "คำนวณค่าใช้จ่าย", desc: "ประมาณการงบประมาณแบบละเอียด" },
              { href: "/accommodations", icon: "🏨", title: "ที่พักแนะนำ", desc: "รีวิวและข้อมูลที่พักครบถ้วน" },
              { href: "/fixed-cost", icon: "📊", title: "แพ็กเกจทัวร์", desc: "แพ็กเกจราคาตายตัวสำหรับกลุ่ม" },
            ].map((item, index) => (
              <Link key={index} href={item.href}>
                <Card className="h-full bg-gray-800 border-gray-700 hover:bg-gray-700 transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h3 className="font-bold mb-2 text-white text-base sm:text-lg">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-black border-t border-gray-800 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">Tibet Travel Guide</h3>
          <p className="text-gray-400 mb-2 text-sm sm:text-base">คู่มือเดินทางไปทิเบตที่ครบครันที่สุด</p>
          <p className="text-xs sm:text-sm text-gray-500">ข้อมูลอ้างอิงจากแหล่งที่เชื่อถือได้ • อัปเดตล่าสุด: มกราคม 2024</p>
        </div>
      </footer>
    </div>
  )
}
