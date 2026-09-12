import { CartItem } from '../core/interfaces/core.interface';
import { MOCK_PRODUCTS } from './product.mocks';

export const MOCK_CART_ITEM: CartItem = {
  product: MOCK_PRODUCTS[0],
  quantity: 2,
};

export const MOCK_QUANTITY_OPTIONS = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
];