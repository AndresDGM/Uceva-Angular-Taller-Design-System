import { Product } from '../core/interfaces/core.interface';

/**
 * Datos simulados de productos de prueba para el Design System.
 *
 * @description
 * Coleccion de objetos `Product` util para pruebas unitarias de `ProductCardMolecule`
 * y para renderizado de demostracion en la pagina de Showcase. Incluye ejemplos de
 * productos disponibles y no disponibles para validar la renderizacion condicional
 * de componentes de estado (BadgeAtom y ButtonAtom).
 */
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