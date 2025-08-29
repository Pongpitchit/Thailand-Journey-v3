"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Wifi, Car, Utensils, Waves, ChevronDown, ChevronUp, Bed } from "lucide-react"
import type { Accommodation } from "@/data/accommodations"

interface AccommodationCardProps {
  accommodation: Accommodation
}

const getTypeColor = (type: Accommodation["type"]) => {
  switch (type) {
    case "hotel":
      return "bg-blue-100 text-blue-800"
    case "resort":
      return "bg-purple-100 text-purple-800"
    case "guesthouse":
      return "bg-green-100 text-green-800"
    case "hostel":
      return "bg-orange-100 text-orange-800"
    case "monastery":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getAmenityIcon = (amenity: string) => {
  switch (amenity.toLowerCase()) {
    case "wifi":
      return <Wifi className="w-4 h-4" />
    case "pool":
      return <Waves className="w-4 h-4" />
    case "restaurant":
      return <Utensils className="w-4 h-4" />
    case "airport transfer":
      return <Car className="w-4 h-4" />
    default:
      return null
  }
}

export function AccommodationCard({ accommodation }: AccommodationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const {
    name,
    type,
    location,
    priceRange,
    rating,
    amenities,
    description,
    detailedDescription,
    images,
    specialFeatures,
    highlights,
    roomTypes,
  } = accommodation

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={images[0] || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <Badge className={`absolute top-2 left-2 ${getTypeColor(type)}`}>
          {type === "hotel"
            ? "โรงแรม"
            : type === "resort"
              ? "รีสอร์ท"
              : type === "guesthouse"
                ? "เกสต์เฮาส์"
                : type === "hostel"
                  ? "โฮสเทล"
                  : type === "monastery"
                    ? "ที่พักในวัด"
                    : type}
        </Badge>
        <Badge className="absolute top-2 right-2 bg-white/90 text-gray-800">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
          {rating}
        </Badge>
      </div>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold leading-tight">{name}</CardTitle>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          {location}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>

        {highlights && highlights.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-primary">จุดเด่น</h4>
            <div className="grid grid-cols-2 gap-1">
              {highlights.slice(0, 4).map((highlight, index) => (
                <div key={index} className="flex items-center gap-1 text-xs">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {amenities.slice(0, 4).map((amenity, index) => (
            <div key={index} className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-full">
              {getAmenityIcon(amenity)}
              <span>{amenity}</span>
            </div>
          ))}
          {amenities.length > 4 && <span className="text-xs text-muted-foreground">+{amenities.length - 4} อื่นๆ</span>}
        </div>

        {specialFeatures && specialFeatures.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {specialFeatures.map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        )}

        {detailedDescription && (
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full justify-between p-2 h-auto text-sm"
            >
              <span>รายละเอียดเพิ่มเติม</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>

            {isExpanded && (
              <div className="space-y-3 p-3 bg-gray-50 rounded-lg animate-in slide-in-from-top-2 duration-200">
                <p className="text-sm leading-relaxed">{detailedDescription}</p>

                {roomTypes && roomTypes.length > 0 && (
                  <div>
                    <h5 className="text-sm font-semibold mb-2 flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      ประเภทห้องพัก
                    </h5>
                    <div className="grid grid-cols-1 gap-1">
                      {roomTypes.map((room, index) => (
                        <div key={index} className="text-xs bg-white px-2 py-1 rounded border">
                          {room}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between items-end">
          <div className="text-right">
            <div className="text-lg font-bold text-primary">
              ฿{priceRange.min.toLocaleString()}-{priceRange.max.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">ต่อคืน</div>
          </div>
          <Button size="sm" className="ml-4 bg-primary hover:bg-primary/90">
            รายละเอียดการติดต่อ
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
