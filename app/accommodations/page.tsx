"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Star,
  MapPin,
  Wifi,
  Car,
  Utensils,
  Waves,
  Dumbbell,
  Space as Spa,
  Users,
  Mountain,
  Heart,
  Eye,
  ArrowLeft,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react"
import { accommodations, getAccommodationsByCity } from "@/data/accommodations"
import type { Accommodation } from "@/data/accommodations"
import Link from "next/link"

const cities = ["Bangkok", "Kunming", "Dali", "Lijiang", "Shangri-La", "Lhasa"]
const accommodationTypes = ["hotel", "resort", "guesthouse", "hostel", "monastery"] as const

const getAmenityIcon = (amenity: string) => {
  const iconMap: { [key: string]: any } = {
    WiFi: Wifi,
    Pool: Waves,
    Gym: Dumbbell,
    Spa: Spa,
    Restaurant: Utensils,
    "Airport Transfer": Car,
    "Common Area": Users,
    "Mountain View": Mountain,
  }
  const IconComponent = iconMap[amenity] || Heart
  return <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
}

const AccommodationCard = ({
  accommodation,
  onViewDetails,
  onBookNow,
}: {
  accommodation: Accommodation
  onViewDetails: (acc: Accommodation) => void
  onBookNow: (acc: Accommodation) => void
}) => (
  <div className="group relative min-w-[280px] sm:min-w-[320px] bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer">
    <div className="relative h-40 sm:h-48 overflow-hidden">
      <img
        src={accommodation.images[0] || "/placeholder.svg"}
        alt={accommodation.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
        <Badge className="bg-red-600 text-white border-0 text-xs">{accommodation.type.toUpperCase()}</Badge>
      </div>
      <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3">
        <div className="flex items-center gap-1 text-yellow-400 mb-1">
          <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
          <span className="text-xs sm:text-sm font-medium">{accommodation.rating}</span>
        </div>
        <h3 className="text-white font-bold text-base sm:text-lg leading-tight">{accommodation.name}</h3>
        <div className="flex items-center gap-1 text-gray-300 text-xs sm:text-sm">
          <MapPin className="w-3 h-3" />
          <span>{accommodation.location}</span>
        </div>
      </div>
    </div>

    <div className="p-3 sm:p-4">
      <p className="text-gray-300 text-xs sm:text-sm mb-3 line-clamp-2">{accommodation.description}</p>

      <div className="flex flex-wrap gap-1 mb-3">
        {accommodation.amenities.slice(0, 4).map((amenity) => (
          <div key={amenity} className="flex items-center gap-1 bg-zinc-800 px-2 py-1 rounded text-xs text-gray-300">
            {getAmenityIcon(amenity)}
            <span className="hidden sm:inline">{amenity}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="text-white">
          <span className="text-base sm:text-lg font-bold">฿{accommodation.priceRange.min.toLocaleString()}</span>
          <span className="text-gray-400 text-xs sm:text-sm"> - ฿{accommodation.priceRange.max.toLocaleString()}</span>
        </div>
        <Button
          onClick={() => onViewDetails(accommodation)}
          className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 text-xs sm:text-sm"
        >
          <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          <span className="hidden sm:inline">ดูรายละเอียด</span>
          <span className="sm:hidden">ดู</span>
        </Button>
      </div>

      <Button
        onClick={() => onBookNow(accommodation)}
        className="w-full bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm"
      >
        จองที่พักนี้
      </Button>
    </div>
  </div>
)

const AccommodationCarousel = ({
  title,
  accommodations,
  onViewDetails,
  onBookNow,
}: {
  title: string
  accommodations: Accommodation[]
  onViewDetails: (acc: Accommodation) => void
  onBookNow: (acc: Accommodation) => void
}) => (
  <div className="mb-8 sm:mb-12">
    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 px-4 sm:px-0">{title}</h2>
    <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 px-4 sm:px-0 scrollbar-hide">
      {accommodations.map((accommodation) => (
        <AccommodationCard
          key={accommodation.id}
          accommodation={accommodation}
          onViewDetails={onViewDetails}
          onBookNow={onBookNow}
        />
      ))}
    </div>
  </div>
)

const AccommodationModal = ({
  accommodation,
  onClose,
  onBookNow,
}: {
  accommodation: Accommodation
  onClose: () => void
  onBookNow: (acc: Accommodation) => void
}) => (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
    <div className="bg-zinc-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div className="relative h-48 sm:h-64 md:h-80">
        <img
          src={accommodation.images[0] || "/placeholder.svg"}
          alt={accommodation.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <Button
          onClick={onClose}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-black/50 hover:bg-black/70 text-white text-sm sm:text-base"
        >
          ✕
        </Button>
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-red-600 text-white border-0 text-xs sm:text-sm">
              {accommodation.type.toUpperCase()}
            </Badge>
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
              <span className="font-medium text-sm sm:text-base">{accommodation.rating}</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{accommodation.name}</h1>
          <div className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>
              {accommodation.location}, {accommodation.city}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3">รายละเอียด</h3>
            <p className="text-gray-300 mb-4 text-sm sm:text-base">
              {accommodation.detailedDescription || accommodation.description}
            </p>

            {accommodation.highlights && (
              <div className="mb-4">
                <h4 className="text-base sm:text-lg font-semibold text-white mb-2">จุดเด่น</h4>
                <ul className="space-y-1">
                  {accommodation.highlights.map((highlight, index) => (
                    <li key={index} className="text-gray-300 flex items-center gap-2 text-sm sm:text-base">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3">สิ่งอำนวยความสะดวก</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {accommodation.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2 text-gray-300">
                  {getAmenityIcon(amenity)}
                  <span className="text-xs sm:text-sm">{amenity}</span>
                </div>
              ))}
            </div>

            {accommodation.roomTypes && (
              <div className="mb-4">
                <h4 className="text-base sm:text-lg font-semibold text-white mb-2">ประเภทห้องพัก</h4>
                <div className="space-y-1">
                  {accommodation.roomTypes.map((roomType, index) => (
                    <div key={index} className="text-gray-300 text-xs sm:text-sm bg-zinc-800 px-3 py-1 rounded">
                      {roomType}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-zinc-800 p-3 sm:p-4 rounded-lg">
              <h4 className="text-base sm:text-lg font-semibold text-white mb-2">ราคา</h4>
              <div className="text-xl sm:text-2xl font-bold text-white">
                ฿{accommodation.priceRange.min.toLocaleString()} - ฿{accommodation.priceRange.max.toLocaleString()}
              </div>
              <p className="text-gray-400 text-xs sm:text-sm">ต่อคืน</p>
              <Button
                className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white"
                onClick={() => onBookNow(accommodation)}
              >
                จองที่พักนี้
              </Button>
            </div>

            <div className="bg-zinc-800 p-3 sm:p-4 rounded-lg mt-4">
              <h4 className="text-base sm:text-lg font-semibold text-white mb-2">ติดต่อจอง</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <Phone className="w-4 h-4" />
                  <span>+66 2-789-0123</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Mail className="w-4 h-4" />
                  <span>hotels@tibettravel.com</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <MessageCircle className="w-4 h-4" />
                  <span>@tibethotels</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default function AccommodationsPage() {
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null)
  const [selectedCity, setSelectedCity] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [bookingModal, setBookingModal] = useState<{ open: boolean; accommodation?: Accommodation }>({ open: false })

  const filteredAccommodations = accommodations.filter((acc) => {
    const cityMatch = selectedCity === "all" || acc.city === selectedCity
    const typeMatch = selectedType === "all" || acc.type === selectedType
    return cityMatch && typeMatch
  })

  const luxuryAccommodations = accommodations.filter((acc) => acc.priceRange.min >= 7000)
  const budgetAccommodations = accommodations.filter((acc) => acc.priceRange.max <= 2000)
  const culturalAccommodations = accommodations.filter(
    (acc) =>
      acc.type === "monastery" ||
      acc.specialFeatures?.includes("Cultural Experience") ||
      acc.specialFeatures?.includes("Tibetan Culture") ||
      acc.specialFeatures?.includes("Traditional Architecture"),
  )

  const handleBookNow = (accommodation: Accommodation) => {
    setBookingModal({ open: true, accommodation })
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-[50vh] sm:h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src="/luxury-hotel-room-with-mountain-view-tibet-traditi.png"
          alt="Tibet Accommodations"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6">ที่พักแนะนำ</h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8">
            จากโรงแรมหรูหราสู่ที่พักในวัด ประสบการณ์พักผ่อนที่หลากหลายตามเส้นทางสู่ทิเบต
          </p>
        </div>
      </div>

      {/* Navigation Header */}
      <div className="bg-black/90 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="text-red-500 hover:text-red-400 font-medium text-sm sm:text-base flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            คู่มือเดินทางไปทิเบต
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-12">
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setSelectedCity("all")}
              className={`${selectedCity === "all" ? "bg-red-600" : "bg-zinc-800"} hover:bg-red-700 text-white text-xs sm:text-sm px-3 sm:px-4 py-2`}
            >
              ทุกเมือง
            </Button>
            {cities.map((city) => (
              <Button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`${selectedCity === city ? "bg-red-600" : "bg-zinc-800"} hover:bg-red-700 text-white text-xs sm:text-sm px-3 sm:px-4 py-2`}
              >
                {city}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setSelectedType("all")}
              className={`${selectedType === "all" ? "bg-red-600" : "bg-zinc-800"} hover:bg-red-700 text-white text-xs sm:text-sm px-3 sm:px-4 py-2`}
            >
              ทุกประเภท
            </Button>
            {accommodationTypes.map((type) => (
              <Button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`${selectedType === type ? "bg-red-600" : "bg-zinc-800"} hover:bg-red-700 text-white text-xs sm:text-sm px-3 sm:px-4 py-2`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Categories */}
        <AccommodationCarousel
          title="🏨 ที่พักหรูหรา"
          accommodations={luxuryAccommodations}
          onViewDetails={setSelectedAccommodation}
          onBookNow={handleBookNow}
        />

        <AccommodationCarousel
          title="💰 ที่พักประหยัด"
          accommodations={budgetAccommodations}
          onViewDetails={setSelectedAccommodation}
          onBookNow={handleBookNow}
        />

        <AccommodationCarousel
          title="🏛️ ที่พักวัฒนธรรม"
          accommodations={culturalAccommodations}
          onViewDetails={setSelectedAccommodation}
          onBookNow={handleBookNow}
        />

        {/* City-based Sections */}
        {cities.map((city) => {
          const cityAccommodations = getAccommodationsByCity(city)
          if (cityAccommodations.length === 0) return null

          return (
            <AccommodationCarousel
              key={city}
              title={`📍 ${city}`}
              accommodations={cityAccommodations}
              onViewDetails={setSelectedAccommodation}
              onBookNow={handleBookNow}
            />
          )
        })}

        {/* All Accommodations Grid */}
        {(selectedCity !== "all" || selectedType !== "all") && (
          <div className="mt-8 sm:mt-12">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 px-4 sm:px-0">
              ผลการค้นหา ({filteredAccommodations.length} ที่พัก)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
              {filteredAccommodations.map((accommodation) => (
                <AccommodationCard
                  key={accommodation.id}
                  accommodation={accommodation}
                  onViewDetails={setSelectedAccommodation}
                  onBookNow={handleBookNow}
                />
              ))}
            </div>
          </div>
        )}

        {/* Navigation Footer */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 px-4 sm:px-0">
          <Link href="/train">
            <Button
              variant="outline"
              className="w-full h-auto sm:h-16 text-left bg-gray-900 border-gray-700 hover:bg-gray-800 text-white p-3 sm:p-4"
            >
              <div>
                <div className="font-semibold text-sm sm:text-base">🚂 การเดินทางด้วยรถไฟ</div>
                <div className="text-xs sm:text-sm text-gray-400">ดูตัวเลือกรถไฟและที่พัก</div>
              </div>
            </Button>
          </Link>
          <Link href="/flights">
            <Button
              variant="outline"
              className="w-full h-auto sm:h-16 text-left bg-gray-900 border-gray-700 hover:bg-gray-800 text-white p-3 sm:p-4"
            >
              <div>
                <div className="font-semibold text-sm sm:text-base">✈️ การเดินทางด้วยเครื่องบิน</div>
                <div className="text-xs sm:text-sm text-gray-400">ดูเที่ยวบินและแพ็กเกจ</div>
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
        </div>
      </div>

      {/* Detail Modal */}
      {selectedAccommodation && (
        <AccommodationModal
          accommodation={selectedAccommodation}
          onClose={() => setSelectedAccommodation(null)}
          onBookNow={handleBookNow}
        />
      )}

      {bookingModal.open && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">ยืนยันการจองที่พัก</h3>
            <div className="space-y-3 text-gray-300">
              <div>ที่พัก: {bookingModal.accommodation?.name}</div>
              <div>
                ที่อยู่: {bookingModal.accommodation?.location}, {bookingModal.accommodation?.city}
              </div>
              <div>
                ราคา: ฿{bookingModal.accommodation?.priceRange.min.toLocaleString()} - ฿
                {bookingModal.accommodation?.priceRange.max.toLocaleString()}/คืน
              </div>
              <div className="bg-gray-800 p-3 rounded-lg">
                <h4 className="text-red-400 font-semibold mb-2">ติดต่อจอง:</h4>
                <div className="text-sm space-y-1">
                  <div>📞 +66 2-789-0123</div>
                  <div>📧 hotels@tibettravel.com</div>
                  <div>💬 Line: @tibethotels</div>
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
