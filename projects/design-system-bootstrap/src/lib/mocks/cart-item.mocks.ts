import { CartItem } from '../core/interfaces/core.interface';
import { MOCK_PRODUCTS } from './product.mocks';

/**
 * Objeto simulado de un item del carrito para pruebas del Design System.
 *
 * @description
 * Instancia de `CartItem` util para verificar la correcta renderizacion
 * y manipulacion de eventos de la molecula `CartItemMolecule` tanto en pruebas
 * unitarias como en la vista de demostracion Showcase.
 */
export const MOCK_CART_ITEM: CartItem = {
  product: MOCK_PRODUCTS[0],
  quantity: 2,
};

/**
 * Opciones simuladas para la seleccion de cantidad en el carrito.
 *
 * @description
 * Arreglo de `SelectOption` utilizado para alimentar el componente `SelectAtom`
 * integrado en `CartItemMolecule`. Permite al usuario seleccionar cantidades entre 1 y 5.
 */
export const MOCK_QUANTITY_OPTIONS = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
];