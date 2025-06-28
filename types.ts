export interface ProductDeal {
  productName: string;
  platform: 'Flipkart' | 'Amazon.in' | 'Tata Cliq' | 'Reliance Digital' | 'Croma' | 'Other';
  price: number;
  rating: number;
  imageUrl: string;
  productUrl: string;
}