export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface ContentFormData {
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  province: string;
  district: string;
  municipality: string;
  ward: string;
  image: string;
  rating: number;
  reviewCount: number;
  tips: string[];
  location: Location | null;
  bestTime: string;
  price: string;
  difficulty: string;
}
