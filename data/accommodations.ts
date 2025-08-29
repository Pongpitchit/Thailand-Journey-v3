export interface Accommodation {
  id: string
  name: string
  type: "hotel" | "guesthouse" | "hostel" | "resort" | "monastery"
  location: string
  city: string
  priceRange: {
    min: number
    max: number
    currency: "THB" | "CNY" | "USD"
  }
  rating: number
  amenities: string[]
  description: string
  detailedDescription?: string // Added detailed description for expandable content
  images: string[]
  coordinates: {
    lat: number
    lng: number
  }
  bookingUrl?: string
  specialFeatures?: string[]
  highlights?: string[] // Added highlights for better presentation
  roomTypes?: string[] // Added room types information
}

export const accommodations: Accommodation[] = [
  // Bangkok (Starting Point)
  {
    id: "bkk-001",
    name: "Mandarin Oriental Bangkok",
    type: "hotel",
    location: "Riverside, Bangkok",
    city: "Bangkok",
    priceRange: { min: 8000, max: 15000, currency: "THB" },
    rating: 4.8,
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Airport Transfer"],
    description: "หรูหราริมแม่น้ำเจ้าพระยา เหมาะสำหรับเริ่มต้นการเดินทาง",
    detailedDescription:
      "โรงแรมระดับ 5 ดาวที่มีประวัติศาสตร์ยาวนานกว่า 140 ปี ตั้งอยู่ริมแม่น้ำเจ้าพระยาในทำเลที่สวยงาม ห้องพักทุกห้องมีวิวแม่น้ำหรือสวน พร้อมการตแต่งที่ผสมผสานระหว่างสไตล์ไทยและสากล สปาระดับโลกและร้านอาหารมิชลินสตาร์",
    images: ["/luxury-hotel-bangkok-riverside.png"],
    coordinates: { lat: 13.724, lng: 100.5156 },
    specialFeatures: ["River View", "Historic Hotel", "Thai Cooking Class"],
    highlights: ["วิวแม่น้ำเจ้าพระยา", "สปาระดับโลก", "ร้านอาหารมิชลินสตาร์", "บริการเรือส่วนตัว"],
    roomTypes: ["Superior Room", "Deluxe River View", "Suite", "Royal Suite"],
  },
  {
    id: "bkk-002",
    name: "Lub d Bangkok Silom",
    type: "hostel",
    location: "Silom, Bangkok",
    city: "Bangkok",
    priceRange: { min: 800, max: 2000, currency: "THB" },
    rating: 4.2,
    amenities: ["WiFi", "Shared Kitchen", "Laundry", "Common Area"],
    description: "โฮสเทลสะอาดใจกลางเมือง เหมาะสำหรับนักเดินทางประหยัด",
    detailedDescription:
      "โฮสเทลสไตล์โมเดิร์นใจกลางย่านธุรกิจสีลม ออกแบบด้วยแนวคิด 'Sleep Box' ที่เป็นเอกลักษณ์ มีพื้นที่ส่วนกลางสำหรับพบปะนักเดินทางจากทั่วโลก ใกล้รถไฟฟ้า BTS และสถานที่ท่องเที่ยวสำคัญ",
    images: ["/modern-hostel-bangkok.png"],
    coordinates: { lat: 13.7307, lng: 100.5418 },
    highlights: ["ใกล้ BTS สีลม", "ดีไซน์โมเดิร์น", "พื้นที่ส่วนกลางกว้างขวาง", "ราคาประหยัด"],
    roomTypes: ["Dorm Bed", "Private Room", "Female Dorm"],
  },

  // Kunming (First Stop in China) - Converting CNY to THB (1 CNY ≈ 5 THB)
  {
    id: "km-001",
    name: "InterContinental Kunming",
    type: "hotel",
    location: "City Center, Kunming",
    city: "Kunming",
    priceRange: { min: 6000, max: 12500, currency: "THB" },
    rating: 4.6,
    amenities: ["WiFi", "Pool", "Gym", "Restaurant", "Business Center"],
    description: "โรงแรมระดับสากลใจกลางคุนหมิง เหมาะสำหรับพักผ่อนก่อนขึ้นรถไฟ",
    detailedDescription:
      "โรงแรม 5 ดาวในเครือ InterContinental ใจกลางเมืองคุนหมิง ห้องพักกว้างขวางพร้อมสิ่งอำนวยความสะดวกครบครัน ร้านอาหารจีนและนานาชาติ สระว่ายน้ำกลางแจ้งและฟิตเนส ใกล้สถานีรถไฟคุนหมิงเพียง 15 นาที",
    images: ["/intercontinental-hotel-kunming.png"],
    coordinates: { lat: 25.0389, lng: 102.7183 },
    specialFeatures: ["City View", "Near Train Station", "Chinese Restaurant"],
    highlights: ["ใกล้สถานีรถไฟ", "ห้องพักกว้างขวาง", "ร้านอาหารจีนแท้", "บริการรถรับส่ง"],
    roomTypes: ["Superior Room", "Deluxe City View", "Club Room", "Suite"],
  },
  {
    id: "km-002",
    name: "Kunming Youth Hostel",
    type: "hostel",
    location: "Green Lake Area, Kunming",
    city: "Kunming",
    priceRange: { min: 400, max: 1000, currency: "THB" },
    rating: 4.0,
    amenities: ["WiFi", "Shared Kitchen", "Bike Rental", "Tour Desk"],
    description: "โฮสเทลใกล้ทะเลสาบเขียว บรรยากาศดี ราคาประหยัด",
    detailedDescription:
      "โฮสเทลสไตล์จีนโบราณใกล้ทะเลสาบเขียว (Green Lake) สถานที่พักผ่อนยอดนิยมของคนท้องถิน มีบริการเช่าจักรยานสำหรับปั่นรอบทะเลสาบ พนักงานพูดภาษาอังกฤษได้และให้คำแนะนำการท่องเที่ยว",
    images: ["/youth-hostel-kunming-green-lake.png"],
    coordinates: { lat: 25.0504, lng: 102.7026 },
    highlights: ["ใกล้ทะเลสาบเขียว", "บริการเช่าจักรยาน", "พนักงานพูดอังกฤษ", "บรรยากาศท้องถิ่น"],
    roomTypes: ["Dorm Bed", "Private Room", "Traditional Chinese Room"],
  },

  // Dali (Scenic Stop) - Converting CNY to THB
  {
    id: "dl-001",
    name: "The Linden Centre",
    type: "resort",
    location: "Xizhou Village, Dali",
    city: "Dali",
    priceRange: { min: 4000, max: 7500, currency: "THB" },
    rating: 4.7,
    amenities: ["WiFi", "Garden", "Cultural Tours", "Restaurant", "Library"],
    description: "รีสอร์ทสไตล์จีนโบราณ ท่ามกลางธรรมชาติและวัฒนธรรมท้องถิน",
    detailedDescription:
      "รีสอร์ทบูติกที่ได้รับการปรับปรุงจากบ้านโบราณของชาวไป่ (Bai) อายุกว่า 100 ปี ตั้งอยู่ในหมู่บ้านซีโจว ท่ามกลางทุ่งนาและภูเขา มีกิจกรรมทางวัฒนธรรมและการเรียนรู้วิถีชีวิตท้องถิ่น ห้องสมุดและสวนสวยงาม",
    images: ["/traditional-chinese-resort-dali.png"],
    coordinates: { lat: 25.7041, lng: 100.167 },
    specialFeatures: ["Traditional Architecture", "Cultural Experience", "Mountain View"],
    highlights: ["บ้านโบราณชาวไป่", "กิจกรรมวัฒนธรรม", "วิวภูเขาและทุ่งนา", "ห้องสมุดโบราณ"],
    roomTypes: ["Courtyard Room", "Garden Suite", "Traditional Bai House"],
  },
  {
    id: "dl-002",
    name: "Dali Old Town Guesthouse",
    type: "guesthouse",
    location: "Old Town, Dali",
    city: "Dali",
    priceRange: { min: 750, max: 2000, currency: "THB" },
    rating: 4.3,
    amenities: ["WiFi", "Rooftop Terrace", "Bike Rental", "Local Tours"],
    description: "เกสต์เฮาส์ในเมืองเก่าต้าลี่ บรรยากาศโรแมนติก",
    detailedDescription:
      "เกสต์เฮาส์สไตล์จีนโบราณใจกลางเมืองเก่าต้าลี่ มีดาดฟ้าชมวิวภูเขา Cangshan และทะเลสาบ Erhai ห้องพักตกแต่งด้วยเฟอร์นิเจอร์ไม้โบราณ บริการทัวร์ท้องถิ่นและเช่าจักรยาน เดินไปตลาดและร้านอาหารได้",
    images: ["/guesthouse-dali-old-town.png"],
    coordinates: { lat: 25.6929, lng: 100.167 },
    highlights: ["ใจกลางเมืองเก่า", "ดาดฟ้าชมวิว", "เฟอร์นิเจอร์โบราณ", "เดินไปตลาดได้"],
    roomTypes: ["Standard Room", "Deluxe Room", "Rooftop Room"],
  },

  // Lijiang (UNESCO World Heritage) - Converting CNY to THB
  {
    id: "lj-001",
    name: "Banyan Tree Lijiang",
    type: "resort",
    location: "Shuhe Ancient Town, Lijiang",
    city: "Lijiang",
    priceRange: { min: 10000, max: 20000, currency: "THB" },
    rating: 4.8,
    amenities: ["WiFi", "Spa", "Pool", "Restaurant", "Cultural Activities"],
    description: "รีสอร์ทหรูหราสไตล์นาซี ท่ามกลางเมืองโบราณ",
    detailedDescription:
      "รีสอร์ทหรูหราระดับโลกที่ผสมผสานสถาปัตยกรรมนาซีโบราณเข้ากับความสะดวกสบายสมัยใหม่ ตั้งอยู่ในเมืองโบราณซูเหอ มรดกโลกยูเนสโก สปาที่ได้รับรางวัลและกิจกรรมทางวัฒนธรรมนาซี วิวภูเขาหิมะมังกรหยก",
    images: ["/banyan-tree-resort-lijiang.png"],
    coordinates: { lat: 26.8721, lng: 100.2277 },
    specialFeatures: ["Naxi Culture", "Ancient Town", "Jade Dragon Snow Mountain View"],
    highlights: ["สถาปัตยกรรมนาซี", "สปาระดับโลก", "วิวภูเขาหิมะ", "กิจกรรมวัฒนธรรม"],
    roomTypes: ["Pool Villa", "Mountain Villa", "Naxi Suite", "Presidential Villa"],
  },
  {
    id: "lj-002",
    name: "Lijiang Backpackers Hostel",
    type: "hostel",
    location: "Old Town, Lijiang",
    city: "Lijiang",
    priceRange: { min: 300, max: 750, currency: "THB" },
    rating: 4.1,
    amenities: ["WiFi", "Common Area", "Laundry", "Tour Information"],
    description: "โฮสเทลใจกลางเมืองเก่าลี่เจียง เดินทางสะดวก",
    detailedDescription:
      "โฮสเทลสไตล์นาซีใจกลางเมืองเก่าลี่เจียง มรดกโลกยูเนสโก ห้องพักสะอาดและพื้นที่ส่วนกลางกว้างขวาง เจ้าของพูดภาษาอังกฤษได้และให้ข้อมูลการท่องเที่ยวครบถ้วน เดินไปสถานที่สำคัญได้ทั้งหมด",
    images: ["/backpacker-hostel-lijiang-old-town.png"],
    coordinates: { lat: 26.8721, lng: 100.2277 },
    highlights: ["ใจกลางมรดกโลก", "เจ้าของพูดอังกฤษ", "เดินไปไหนได้หมด", "บรรยากาศนาซี"],
    roomTypes: ["Dorm Bed", "Private Room", "Naxi Style Room"],
  },

  // Shangri-La (Tibetan Culture) - Converting CNY to THB
  {
    id: "sl-001",
    name: "Songtsam Shangri-La",
    type: "hotel",
    location: "Dukezong Ancient Town, Shangri-La",
    city: "Shangri-La",
    priceRange: { min: 7500, max: 15000, currency: "THB" },
    rating: 4.6,
    amenities: ["WiFi", "Tibetan Restaurant", "Cultural Tours", "Oxygen Supply"],
    description: "โรงแรมสไตล์ทิเบต ประสบการณ์วัฒนธรรมแท้จริง",
    detailedDescription:
      "โรงแรมบูติกสไตล์ทิเบตแท้ในเมืองโบราณดูเค่ซง ความสูง 3,200 เมตร ห้องพักตกแต่งด้วยงานศิลปะทิเบตและเฟอร์นิเจอร์ไม้โบราณ ร้านอาหารทิเบตแท้และระบบออกซิเจนในห้อง มีกิจกรรมทางวัฒนธรรมและการเยี่ยมชมวัด",
    images: ["/tibetan-style-hotel-shangri-la.png"],
    coordinates: { lat: 27.8269, lng: 99.7065 },
    specialFeatures: ["Tibetan Architecture", "High Altitude", "Cultural Immersion"],
    highlights: ["สถาปัตยกรรมทิเบต", "ระบบออกซิเจน", "อาหารทิเบตแท้", "กิจกรรมวัฒนธรรม"],
    roomTypes: ["Tibetan Room", "Deluxe Tibetan", "Tibetan Suite"],
  },
  {
    id: "sl-002",
    name: "Shangri-La Youth Hostel",
    type: "hostel",
    location: "Near Ganden Sumtseling Monastery",
    city: "Shangri-La",
    priceRange: { min: 400, max: 1000, currency: "THB" },
    rating: 4.0,
    amenities: ["WiFi", "Heating", "Shared Kitchen", "Monastery Tours"],
    description: "โฮสเทลใกล้วัดสำคัญ เหมาะสำหรับสัมผัสวัฒนธรรมทิเบต",
    detailedDescription:
      "โฮสเทลสไตล์ทิเบตใกล้วัดกันเดน สุมเซลิง วัดทิเบตที่ใหญ่ที่สุดในยูนนาน ห้องพักมีระบบทำความร้อนสำหรับอากาศหนาว บริการทัวร์วัดและกิจกรรมทางวัฒนธรรม เจ้าของเป็นชาวทิเบตท้องถิ่นให้ความรู้เรื่องวัฒนธรรม",
    images: ["/youth-hostel-shangri-la-monastery.png"],
    coordinates: { lat: 27.8269, lng: 99.7065 },
    highlights: ["ใกล้วัดใหญ่", "เจ้าของชาวทิเบต", "ระบบทำความร้อน", "ทัวร์วัฒนธรรม"],
    roomTypes: ["Dorm Bed", "Private Room", "Tibetan Traditional Room"],
  },

  // Lhasa (Final Destination) - Converting CNY to THB
  {
    id: "ls-001",
    name: "St. Regis Lhasa Resort",
    type: "resort",
    location: "Lhasa City Center",
    city: "Lhasa",
    priceRange: { min: 12500, max: 25000, currency: "THB" },
    rating: 4.9,
    amenities: ["WiFi", "Oxygen Supply", "Spa", "Tibetan Restaurant", "Butler Service"],
    description: "รีสอร์ทหรูหราระดับโลก พร้อมระบบออกซิเจนสำหรับความสูง",
    detailedDescription:
      "รีสอร์ทหรูหราระดับ 5 ดาวในใจกลางลาซา ความสูง 3,650 เมตร ห้องพักทุกห้องมีระบบออกซิเจนและวิวพระราชวังโปตาลา สปาทิเบตแท้และร้านอาหารทิเบตระดับมิชลิน บริการบัตเลอร์ส่วนตัวและรถรับส่งสนามบิน",
    images: ["/st-regis-lhasa-resort-tibet.png"],
    coordinates: { lat: 29.6516, lng: 91.1611 },
    specialFeatures: ["Oxygen Supply", "Potala Palace View", "Luxury Service"],
    highlights: ["วิวพระราชวังโปตาลา", "ระบบออกซิเจนครบทุกห้อง", "สปาทิเบตแท้", "บัตเลอร์ส่วนตัว"],
    roomTypes: ["Deluxe Room", "Palace View Room", "Tibetan Suite", "Presidential Suite"],
  },
  {
    id: "ls-002",
    name: "Tashi Choeta Hotel",
    type: "hotel",
    location: "Barkhor Street, Lhasa",
    city: "Lhasa",
    priceRange: { min: 4000, max: 7500, currency: "THB" },
    rating: 4.4,
    amenities: ["WiFi", "Oxygen Supply", "Tibetan Breakfast", "Pilgrimage Tours"],
    description: "โรงแรมสไตล์ทิเบตใจกลางลาซา ใกล้วัดโจคัง",
    detailedDescription:
      "โรงแรมสไตล์ทิเบตแท้บนถนนบาร์คอร์ ใจกลางเขตเก่าของลาซา เดินไปวัดโจคังได้เพียง 2 นาที ห้องพักตกแต่งด้วยงานศิลปะทิเบตและพรมทอมือ อาหารเช้าทิเบตแท้และบริการทัวร์แสวงบุญ มีระบบออกซิเจนและไกด์ท้องถิ่น",
    images: ["/tibetan-hotel-lhasa-barkhor.png"],
    coordinates: { lat: 29.6516, lng: 91.1611 },
    specialFeatures: ["Traditional Tibetan Style", "Near Jokhang Temple", "Pilgrimage Center"],
    highlights: ["เดินไปวัดโจคังได้", "อาหารเช้าทิเบต", "ไกด์ท้องถิ่น", "ศิลปะทิเบตแท้"],
    roomTypes: ["Standard Tibetan", "Deluxe Tibetan", "Pilgrimage Suite"],
  },
  {
    id: "ls-003",
    name: "Kyichu Hotel",
    type: "hotel",
    location: "Near Potala Palace, Lhasa",
    city: "Lhasa",
    priceRange: { min: 3000, max: 6000, currency: "THB" },
    rating: 4.2,
    amenities: ["WiFi", "Oxygen Supply", "Restaurant", "Tour Desk"],
    description: "โรงแรมใกล้พระราชวังโปตาลา วิวสวยงาม",
    detailedDescription:
      "โรงแรมระดับกลางที่มีทำเลดีที่สุดในลาซา ห้องพักหันหน้าไปทางพระราชวังโปตาลา เดินไปชมพระราชวังได้เพียง 10 นาที ร้านอาหารจีน-ทิเบตและโต๊ะทัวร์ที่ให้บริการครบครัน มีระบบออกซิเจนและพนักงานพูดอังกฤษ",
    images: ["/hotel-lhasa-potala-palace-view.png"],
    coordinates: { lat: 29.6516, lng: 91.1611 },
    highlights: ["วิวพระราชวังโปตาลา", "เดินไปพระราชวังได้", "พนักงานพูดอังกฤษ", "ทำเลดีที่สุด"],
    roomTypes: ["Standard Room", "Palace View Room", "Superior Room"],
  },
  {
    id: "ls-004",
    name: "Lhasa Monastery Guesthouse",
    type: "monastery",
    location: "Sera Monastery Area, Lhasa",
    city: "Lhasa",
    priceRange: { min: 1000, max: 2500, currency: "THB" },
    rating: 4.0,
    amenities: ["Basic WiFi", "Shared Bathroom", "Meditation Sessions", "Vegetarian Meals"],
    description: "ที่พักในวัด ประสบการณ์ชีวิตพระภิกษุทิเบต",
    detailedDescription:
      "ที่พักแบบเรียบง่ายในบริเวณวัดเสรา วัดทิเบตที่มีชื่อเสียงด้านการโต้วาทีธรรม ได้สัมผัสวิถีชีวิตพระภิกษุทิเบตอย่างใกล้ชิด มีกิจกรรมนั่งสมาธิและอาหารมังสวิรัติ เหมาะสำหรับผู้ที่ต้องการประสบการณ์ทางจิตวิญญาณ",
    images: ["/monastery-guesthouse-tibet-sera.png"],
    coordinates: { lat: 29.6516, lng: 91.1611 },
    specialFeatures: ["Monastery Experience", "Meditation", "Spiritual Journey"],
    highlights: ["ชีวิตในวัด", "นั่งสมาธิ", "อาหารมังสวิรัติ", "ประสบการณ์จิตวิญญาณ"],
    roomTypes: ["Simple Room", "Shared Dormitory", "Meditation Room"],
  },
]

export const getAccommodationsByCity = (city: string): Accommodation[] => {
  return accommodations.filter((acc) => acc.city === city)
}

export const getAccommodationsByType = (type: Accommodation["type"]): Accommodation[] => {
  return accommodations.filter((acc) => acc.type === type)
}

export const getAccommodationsByPriceRange = (
  minPrice: number,
  maxPrice: number,
  currency = "THB", // Changed default currency from CNY to THB
): Accommodation[] => {
  return accommodations.filter(
    (acc) => acc.priceRange.currency === currency && acc.priceRange.min >= minPrice && acc.priceRange.max <= maxPrice,
  )
}
