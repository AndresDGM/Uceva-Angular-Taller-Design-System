import { CartItem } from '../core/interfaces/core.interface';

export const MOCK_SHOPPING_CART_ITEMS: CartItem[] = [
  {
    product: {
      id: 'product-1',
      name: 'Velez Fly Up',
      price: 25000,
      image: '/D_NQ_NP_789850-MCO86153680164_062025-O.webp',
      available: true,
    },
    quantity: 2,
  },
  {
    product: {
      id: 'product-2',
      name: 'Nike Air Jordan',
      price: 35000,
      image: '/1054565-800-auto.webp',
      available: true,
    },
    quantity: 1,
  },
];

export const MOCK_SHOPPING_CART_QUANTITY_OPTIONS = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
];