export interface ContentItem {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  category: "places" | "food" | "traditions";
  province?: string;
  district: string;
  municipality: string;
  ward?: string;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  tips: string[];
  bestTime?: string;
  price?: string;
  difficulty?: string;
  
}

export interface Comment {
  id: string;
  contentId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  bookmarks: string[];
}

import dalBhatImage from "@/assets/dal-bhat.jpg";
import templeImage from "@/assets/temple.jpg";
import festivalImage from "@/assets/festival.jpg";
import nepalHeroImage from "@/assets/nepal-hero.jpg";

export const mockContent: ContentItem[] = [
  {
    id: "1",
    title: "Kathmandu Durbar Square",
    description: "Ancient royal palace complex with stunning traditional architecture and rich history spanning centuries.",
    fullDescription: "Kathmandu Durbar Square is a historic plaza located in the heart of Kathmandu, Nepal. This UNESCO World Heritage Site is surrounded by spectacular architecture and vividly showcases the skills of the Newar artists and craftsmen over several centuries. The Royal Palace was originally at Dattaraya square and was later moved to the current Durbar square location. The Kathmandu Durbar Square held the palaces of the Malla and Shah kings who ruled over the city.",
    category: "places",
    district: "Kathmandu",
    municipality: "Kathmandu Metropolitan",
    image: templeImage,
    images: [templeImage, nepalHeroImage, festivalImage],
    rating: 4.8,
    reviewCount: 245,
    location: {
      lat: 27.7040592,
      lng: 85.3077329,
      address: "Kathmandu Durbar Square, Kathmandu 44600, Nepal"
    },
    tips: [
      "Best visited early morning to avoid crowds",
      "Hire a local guide for detailed historical information",
      "Entry fee required for foreigners",
      "Photography allowed with additional fee"
    ],
    bestTime: "October to March",
    price: "NPR 1000 for foreigners"
  },
  {
    id: "2",
    title: "Traditional Dal Bhat",
    description: "Nepal's national dish featuring lentil soup, rice, vegetables, and pickles served on a traditional plate.",
    fullDescription: "Dal Bhat is the staple food of Nepal, consisting of steamed rice (bhat) and lentil soup (dal). It's typically served with various side dishes including vegetables, pickles, and sometimes meat or fish curry. This nutritious meal provides balanced nutrition and is eaten twice daily by most Nepalis. The beauty of Dal Bhat lies in its simplicity and the way it brings families together around the dining table.",
    category: "food",
    district: "Kathmandu",
    municipality: "Kathmandu Metropolitan",
    image: dalBhatImage,
    images: [dalBhatImage, templeImage],
    rating: 4.6,
    reviewCount: 189,
    tips: [
      "Eat with your right hand traditionally",
      "Free refills are common in local restaurants",
      "Try different regional variations",
      "Usually served on a metal plate (thali)"
    ],
    price: "NPR 200-500"
  },
  {
    id: "3",
    title: "Dashain Festival",
    description: "Nepal's biggest festival celebrating the victory of good over evil with family gatherings and traditions.",
    fullDescription: "Dashain is the longest and the most auspicious festival in the Nepalese annual calendar, celebrated by Nepalese people of all caste and creed throughout the globe. It is not only the longest festival of Nepal but is also the one which is most anticipated. The festival falls around September/October, starting from the bright lunar fortnight and ending on the day of full moon. Among the 15 days of celebration, the 10th day is the most important and is called 'Dashami'.",
    category: "traditions",
    district: "Kathmandu",
    municipality: "Kathmandu Metropolitan",
    image: festivalImage,
    images: [festivalImage, nepalHeroImage, templeImage],
    rating: 4.9,
    reviewCount: 156,
    bestTime: "September/October",
    tips: [
      "Family reunions are central to the celebration",
      "Flying kites is a popular activity",
      "Traditional feast with goat meat",
      "Receiving tika and jamara from elders"
    ]
  },
  {
    id: "4",
    title: "Sarangkot Sunrise Point",
    description: "Breathtaking sunrise views over the Annapurna mountain range from this famous viewpoint.",
    fullDescription: "Sarangkot is a village and former Village Development Committee located in Kaski District of Nepal. It is situated at an altitude of 1600m and is one of the most popular tourist destinations in Pokhara. The village is famous for its spectacular sunrise and sunset views of the Himalayas, particularly the Annapurna and Dhaulagiri mountain ranges. It's also known as a starting point for paragliding adventures.",
    category: "places",
    district: "Pokhara",
    municipality: "Pokhara Metropolitan",
    image: nepalHeroImage,
    images: [nepalHeroImage, templeImage, festivalImage],
    rating: 4.7,
    reviewCount: 312,
    location: {
      lat: 28.2427,
      lng: 83.9540,
      address: "Sarangkot, Pokhara 33700, Nepal"
    },
    tips: [
      "Start early (5 AM) to catch the sunrise",
      "Bring warm clothes as it gets cold",
      "Clear days offer best mountain views",
      "Paragliding available from here"
    ],
    bestTime: "October to March",
    difficulty: "Easy hike"
  },
  {
    id: "5",
    title: "Authentic Momo",
    description: "Traditional Nepalese dumplings filled with vegetables or meat, served with spicy dipping sauce.",
    fullDescription: "Momo is a type of steamed filled dumpling in Tibetan and Nepali cuisine that is also popular in neighbouring Bhutan and India. It is similar to Chinese baozi, Mongolian buuz, and Korean mandu. Momos are usually served with a sauce known as achar influenced by the spices and herbs used within many South Asian cuisines. It can be made with different fillings including vegetables, chicken, pork, buffalo, or yak meat.",
    category: "food",
    district: "Lalitpur",
    municipality: "Lalitpur Metropolitan",
    image: dalBhatImage,
    images: [dalBhatImage, templeImage],
    rating: 4.5,
    reviewCount: 278,
    tips: [
      "Best eaten hot and fresh",
      "Try both steamed and fried versions",
      "Dip in spicy achar sauce",
      "Popular street food snack"
    ],
    price: "NPR 150-400"
  },
  {
    id: "6",
    title: "Tihar Festival of Lights",
    description: "Beautiful festival honoring different animals and celebrating the bond between brothers and sisters.",
    fullDescription: "Tihar, also known as Deepawali or Yamapanchak, is the second most important festival of Nepal after Dashain. It is the festival of lights, as it is celebrated by lighting oil lamps (diyo), candles and electric bulbs. The five-day festival honors various animals like crow, dog, cow, and ox. The fourth day is dedicated to different aspects depending on the person's cultural background, and the fifth day is Bhai Tika, celebrating the bond between brothers and sisters.",
    category: "traditions",
    district: "Bhaktapur",
    municipality: "Bhaktapur Municipality",
    image: festivalImage,
    images: [festivalImage, nepalHeroImage, dalBhatImage],
    rating: 4.8,
    reviewCount: 203,
    bestTime: "October/November",
    tips: [
      "Houses decorated with lights and rangoli",
      "Deusi-Bhailo cultural songs performed",
      "Traditional sweets and treats",
      "Beautiful night illuminations"
    ]
  },
  {
    id: "7",
    title: "Boudhanath Stupa",
    description: "One of the largest stupas in the world and a center of Tibetan Buddhism in Nepal.",
    fullDescription: "Boudhanath is a stupa in Kathmandu, Nepal. Located about 11 km from the center and northeastern outskirts of Kathmandu, its massive mandala makes it one of the largest spherical stupas in Nepal and the world. It is the center of Tibetan culture in Kathmandu and rich in Buddhist symbolism.",
    category: "places",
    district: "Kathmandu",
    municipality: "Kathmandu Metropolitan",
    image: templeImage,
    images: [templeImage, nepalHeroImage],
    rating: 4.7,
    reviewCount: 389,
    location: {
      lat: 27.7206,
      lng: 85.3613,
      address: "Boudhanath, Kathmandu 44600, Nepal"
    },
    tips: [
      "Walk clockwise around the stupa",
      "Visit during prayer times for authentic experience",
      "Many restaurants with rooftop stupa views",
      "Evening prayers are particularly spiritual"
    ],
    bestTime: "All year round"
  },
  {
    id: "8",
    title: "Newari Khaja Set",
    description: "Traditional Newari platter featuring variety of local delicacies and snacks.",
    fullDescription: "Newari Khaja Set is a traditional meal from the Newar community of Nepal, particularly popular in the Kathmandu valley. This elaborate platter includes various traditional items like beaten rice (chiura), black soybeans (bhatmas), spiced meat, fish, pickles, and other local delicacies. Each item has its own unique preparation method passed down through generations.",
    category: "food",
    district: "Bhaktapur",
    municipality: "Bhaktapur Municipality",
    image: dalBhatImage,
    images: [dalBhatImage, templeImage],
    rating: 4.4,
    reviewCount: 156,
    tips: [
      "Best experienced in traditional Newari restaurants",
      "Try during cultural festivals",
      "Each item has unique flavors",
      "Often served during celebrations"
    ],
    price: "NPR 500-800"
  }
];

export const mockComments: Comment[] = [
  {
    id: "1",
    contentId: "1",
    author: "Raj Sharma",
    rating: 5,
    comment: "Absolutely stunning architecture! The intricate woodwork and ancient craftsmanship is mind-blowing. A must-visit for anyone interested in Nepal's rich history.",
    date: "2024-01-15"
  },
  {
    id: "2",
    contentId: "1",
    author: "Sarah Johnson",
    rating: 4,
    comment: "Beautiful place with so much history. The guide was very knowledgeable. Only downside was the crowds, but still worth visiting.",
    date: "2024-01-10"
  },
  {
    id: "3",
    contentId: "2",
    author: "Priya Thapa",
    rating: 5,
    comment: "Nothing beats authentic dal bhat! The taste reminds me of home. This place serves it just like my grandmother used to make.",
    date: "2024-01-12"
  },
  {
    id: "4",
    contentId: "4",
    author: "Michael Brown",
    rating: 5,
    comment: "The sunrise view was absolutely breathtaking! Worth the early morning hike. The Annapurna range looked spectacular.",
    date: "2024-01-08"
  }
];

// Helper functions
export const getContentById = (id: string): ContentItem | undefined => {
  return mockContent.find(item => item.id === id);
};

export const getContentByCategory = (category: string): ContentItem[] => {
  if (category === 'all' || !category) return mockContent;
  return mockContent.filter(item => item.category === category);
};

export const searchContent = (filters: {
  keyword?: string;
  district?: string;
  municipality?: string;
  category?: string;
  location?: {
    lat: number;
    lng: number;
    address: string;
  } | null;
  radius?: number;
}): ContentItem[] => {
  let results = [...mockContent];
  
  if (filters.keyword) {
    const keyword = filters.keyword.toLowerCase();
    results = results.filter(item =>
      item.title.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword) ||
      item.fullDescription.toLowerCase().includes(keyword)
    );
  }
  
  if (filters.district && filters.district !== 'all') {
    results = results.filter(item => 
      item.district.toLowerCase() === filters.district?.toLowerCase()
    );
  }
  
  if (filters.municipality && filters.municipality !== 'all') {
    results = results.filter(item => 
      item.municipality.toLowerCase() === filters.municipality?.toLowerCase()
    );
  }
  
  if (filters.category && filters.category !== 'all') {
    results = results.filter(item => item.category === filters.category);
  }
  
  // Location-based filtering
  if (filters.location && filters.radius && filters.radius > 0) {
    results = results.filter(item => {
      if (!item.location) return false;
      
      // Calculate distance using Haversine formula
      const distance = calculateDistance(
        filters.location.lat,
        filters.location.lng,
        item.location.lat,
        item.location.lng
      );
      
      return distance <= filters.radius;
    });
  }
  
  return results;
};

export const getCommentsByContentId = (contentId: string): Comment[] => {
  return mockComments.filter(comment => comment.contentId === contentId);
};

// Helper function to calculate distance between two coordinates
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 100) / 100; // Round to 2 decimal places
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}