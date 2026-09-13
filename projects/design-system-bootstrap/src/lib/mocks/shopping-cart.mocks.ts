import { CartItem } from '../core/interfaces/core.interface';

/**
 * Lista simulada de productos en el carrito para pruebas y demostraciones del Design System.
 *
 * @description
 * Colección de objetos `CartItem` preconfigurados con entidades de producto (`Product`)
 * y cantidades iniciales, utilizada para validar la visualización y operaciones reactivas
 * dentro de `ShoppingCartOrganism`.
 */
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

/**
 * Opciones simuladas para la selección de cantidad en el carrito de compras.
 *
 * @description
 * Arreglo de opciones `SelectOption` utilizado para alimentar el selector de unidades
 * en las moléculas de ítem de carrito (`CartItemMolecule`) dentro de `ShoppingCartOrganism`.
 */
export const MOCK_SHOPPING_CART_QUANTITY_OPTIONS = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
];