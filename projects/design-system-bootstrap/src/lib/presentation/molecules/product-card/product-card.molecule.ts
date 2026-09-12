import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { BadgeAtom } from '../../atoms/badge/badge.atom';
import { ButtonAtom } from '../../atoms/button/button.atom';
import { ImageAtom } from '../../atoms/image/image.atom';
import { Product } from '../../../core/interfaces/core.interface';

/**
 * Tarjeta de producto del Design System.
 *
 * @description
 * Componente tipo **Molécula** según Atomic Design.
 * Combina los átomos de imagen, badge y botón para
 * representar un producto disponible en la tienda.
 */
@Component({
  selector: 'dsb-product-card-molecule',
  templateUrl: './product-card.molecule.html',
  imports: [CommonModule, ImageAtom, BadgeAtom, ButtonAtom],
})
export class ProductCardMolecule {
  /**
   * Producto que será representado en la tarjeta.
   */
  @Input() product!: Product;

  /**
   * Evento emitido al solicitar agregar el producto al carrito.
   *
   * @emits string Identificador del producto.
   */
  @Output() addToCart: EventEmitter<string> =
    new EventEmitter<string>();

  /**
   * Emite el identificador del producto para agregarlo al carrito.
   *
   * @returns {void}
   */
  onAddToCart(): void {
    this.addToCart.emit(this.product.id);
  }
}