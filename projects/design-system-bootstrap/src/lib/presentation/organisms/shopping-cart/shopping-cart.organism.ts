import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { CartItemMolecule } from '../../molecules/cart-item/cart-item.molecule';
import {
  CartItem,
  SelectOption,
} from '../../../core/interfaces/core.interface';
import { ButtonAtom } from '../../atoms/button/button.atom';

/**
 * Organismo encargado de representar y gestionar
 * visualmente un carrito de compras.
 *
 * Combina la molécula CartItemMolecule y centraliza
 * las operaciones de actualización, eliminación
 * y cálculo del total del carrito.
 */
@Component({
  selector: 'dsb-shopping-cart-organism',
  standalone: true,
  imports: [CommonModule, CartItemMolecule, ButtonAtom],
  templateUrl: './shopping-cart.organism.html',
  styleUrl: './shopping-cart.organism.css',
})
export class ShoppingCartOrganism {

  /**
   * Lista de productos actualmente registrados
   * en el carrito.
   */
  @Input() cartItems: CartItem[] = [];

  /**
   * Opciones disponibles para seleccionar
   * la cantidad de cada producto.
   */
  @Input() quantityOptions: SelectOption[] = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
  ];

  /**
   * Informa al componente padre que el contenido
   * del carrito ha cambiado.
   */
  @Output() cartItemsChange =
    new EventEmitter<CartItem[]>();

  /**
   * Informa al componente padre que el usuario
   * desea finalizar la compra.
   */
  @Output() checkout =
    new EventEmitter<CartItem[]>();

  /**
   * Obtiene la cantidad total de unidades
   * presentes en el carrito.
   */
  get totalItems(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.quantity,
      0,
    );
  }

  /**
   * Obtiene el valor total de los productos
   * presentes en el carrito.
   */
  get total(): number {
    return this.cartItems.reduce(
      (total, item) =>
        total + item.product.price * item.quantity,
      0,
    );
  }

  /**
   * Actualiza la cantidad de un producto.
   */
  onQuantityChange(event: {
    productId: string;
    quantity: number;
  }): void {
    this.cartItems = this.cartItems.map((item) =>
      item.product.id === event.productId
        ? {
            ...item,
            quantity: event.quantity,
          }
        : item,
    );

    this.cartItemsChange.emit(this.cartItems);
  }

  /**
   * Elimina un producto del carrito.
   */
  onRemove(productId: string): void {
    this.cartItems = this.cartItems.filter(
      (item) => item.product.id !== productId,
    );

    this.cartItemsChange.emit(this.cartItems);
  }

  /**
   * Solicita finalizar la compra.
   */
  onCheckout(): void {
    this.checkout.emit(this.cartItems);
  }
}