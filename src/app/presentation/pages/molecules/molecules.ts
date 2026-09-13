import { Component } from '@angular/core';
import {
  ButtonGroupData,
  ButtonGroupMolecule,
  CartItem,
  CartItemMolecule,
  ContainerAtom,
  NavLink,
  NavLinkMolecule,
  Product,
  ProductCardMolecule,
} from '@brejcha13320/design-system-bootstrap';

/**
 * Página de demostración y Showcase interactivo para las **Moléculas** del Design System.
 *
 * @description
 * Componente de presentación de la aplicación demo que sirve como laboratorio visual
 * para probar el comportamiento, apariencia y manejo de eventos de las moléculas desarrolladas,
 * en especial `ProductCardMolecule` y `CartItemMolecule`.
 */
@Component({
  templateUrl: './molecules.html',
  imports: [
    ContainerAtom,
    ButtonGroupMolecule,
    NavLinkMolecule,
    ProductCardMolecule,
    CartItemMolecule,
  ],
})
export class Molecules {
  buttonsGroupData: ButtonGroupData[] = [
    { idButton: 'idButtonPrimary', type: 'primary', text: 'Text Primary' },
    { idButton: 'idButtonSecondary', type: 'secondary', text: 'Text Secondary' },
    { idButton: 'idButtonSuccess', type: 'success', text: 'Text Success' },
    { idButton: 'idButtonDanger', type: 'danger', text: 'Text Danger' },
    { idButton: 'idButtonWarning', type: 'warning', text: 'Text Warning' },
    { idButton: 'idButtonInfo', type: 'info', text: 'Text Info' },
    { idButton: 'idButtonLight', type: 'light', text: 'Text Light' },
    { idButton: 'idButtonDark', type: 'dark', text: 'Text Dark' },
  ];

  navLinks: NavLink[] = [
    { text: 'Link 1', url: '/atoms' },
    { text: 'Link 2', url: '/molecules' },
    { text: 'Link 3', url: '/organisms' },
  ];

  /** Lista de productos simulados para la demostración de `ProductCardMolecule` */
  products: Product[] = [
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

  /** Item de prueba para la demostración de `CartItemMolecule` */
  cartItem: CartItem = {
    product: this.products[0],
    quantity: 2,
  };

  /** Opciones de cantidad para el selector de `CartItemMolecule` */
  quantityOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
  ];

  onClick(idButton: string): void {
    alert(`Click en el Boton de Grupo ${idButton}`);
  }

  /**
   * Manejador de evento del Showcase para la adicion de productos desde `ProductCardMolecule`.
   * Muestra una alerta interactiva con el ID del producto recibido.
   */
  onAddToCart(productId: string): void {
    alert(`Producto agregado al carrito: ${productId}`);
  }

  /**
   * Manejador de evento del Showcase para la actualización de cantidad en `CartItemMolecule`.
   * Muestra una alerta interactiva con el ID del producto y la nueva cantidad.
   */
  onQuantityChange(event: {
    productId: string;
    quantity: number;
  }): void {
    alert(
      `Producto ${event.productId} - Nueva cantidad: ${event.quantity}`
    );
  }

  /**
   * Manejador de evento del Showcase para la eliminación de items desde `CartItemMolecule`.
   * Muestra una alerta interactiva confirmando la solicitud de eliminación.
   */
  onRemove(productId: string): void {
    alert(`Producto eliminado del carrito: ${productId}`);
  }
}
