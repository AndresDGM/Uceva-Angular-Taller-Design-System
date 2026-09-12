import { Product } from '../core/interfaces/core.interface';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'product-1',
    name: 'Camiseta UCEVA',
    price: 50000,
    image: 'https://placehold.co/600x400',
    available: true,
  },
  {
    id: 'product-2',
    name: 'Sudadera UCEVA',
    price: 85000,
    image: 'https://placehold.co/600x400',
    available: false,
  },
];