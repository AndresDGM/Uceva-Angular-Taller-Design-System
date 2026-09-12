import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ButtonAtom } from '../../atoms/button/button.atom';
import { ImageAtom } from '../../atoms/image/image.atom';
import { SelectAtom } from '../../atoms/select/select.atom';

import {
  CartItem,
  SelectOption,
} from '../../../core/interfaces/core.interface';

/**
 * Representa un producto dentro del carrito de compras.
 *
 * @description
 * Componente tipo **Molécula** según Atomic Design.
 * Combina los átomos de imagen, select y botón para
 * representar y gestionar un producto del carrito.
 */
@Component({
  selector: 'dsb-cart-item-molecule',
  templateUrl: './cart-item.molecule.html',
  imports: [CommonModule, ImageAtom, SelectAtom, ButtonAtom],
})
export class CartItemMolecule {
  /**
   * Producto y cantidad que serán representados en el carrito.
   */
  @Input() cartItem!: CartItem;

  /**
   * Opciones disponibles para seleccionar la cantidad.
   */
  @Input() quantityOptions: SelectOption[] = [];

  /**
   * Evento emitido cuando cambia la cantidad del producto.
   */
  @Output() quantityChange: EventEmitter<{
    productId: string;
    quantity: number;
  }> = new EventEmitter<{
    productId: string;
    quantity: number;
  }>();

  /**
   * Evento emitido cuando se solicita eliminar el producto del carrito.
   */
  @Output() remove: EventEmitter<string> =
    new EventEmitter<string>();

  /**
   * Emite el identificador del producto junto con la nueva cantidad.
   */
  onQuantityChange(quantity: string | string[]): void {
    const value = Array.isArray(quantity)
      ? quantity[0]
      : quantity;

    this.quantityChange.emit({
      productId: this.cartItem.product.id,
      quantity: Number(value),
    });
  }

  /**
   * Emite el identificador del producto para eliminarlo del carrito.
   */
  onRemove(): void {
    this.remove.emit(this.cartItem.product.id);
  }
}