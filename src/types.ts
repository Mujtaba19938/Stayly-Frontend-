export interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: string;
  type: 'Villa' | 'Hotel' | 'Apartment' | 'Guesthouse';
  image: string;
  badgeStyle: string;
}

export interface PromoOffer {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}
