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
 * Componente tipo **Molécula** según los principios de **Atomic Design**.
 * Combina y reutiliza los átomos `ImageAtom`, `BadgeAtom` y `ButtonAtom` para
 * visualizar la información comercial de un producto de la tienda y facilitar la interacción del usuario.
 *
 * **Responsabilidad:**
 * - Presentar la imagen del producto mediante `ImageAtom`.
 * - Mostrar el nombre y el precio unitario del producto.
 * - Reflejar visualmente el estado de disponibilidad ("Disponible" / "Agotado") mediante `BadgeAtom`.
 * - Renderizar el botón "Agregar al carrito" mediante `ButtonAtom` unicamente cuando el producto esta disponible.
 * - Emitir el identificador unico del producto (`productId`) hacia el componente superior cuando se solicita su adicion.
 *
 * **Delimitación de Responsabilidades:**
 * La molécula **NO** administra el estado global del carrito ni almacena datos en memoria;
 * únicamente comunica la intención de compra del usuario mediante un evento decorado con `@Output()`.
 */
@Component({
  selector: 'dsb-product-card-molecule',
  templateUrl: './product-card.molecule.html',
  styleUrl: './product-card.molecule.css',
  imports: [CommonModule, ImageAtom, BadgeAtom, ButtonAtom],
})
export class ProductCardMolecule {
  /**
   * Información general y estado de disponibilidad del producto a renderizar.
   *
   * @description
   * Recibe un objeto de tipo `Product` desde el componente padre.
   * Contiene propiedades esenciales como `id`, `name`, `price`, `image` y `available`.
   */
  @Input() product!: Product;

  /**
   * Evento emitido al solicitar la adición del producto al carrito.
   *
   * @description
   * Transmite el identificador único (`string`) del producto (`product.id`) al componente contenedor.
   * Esto permite al componente superior identificar exactamente qué producto fue seleccionado.
   */
  @Output() addToCart: EventEmitter<string> =
    new EventEmitter<string>();

  /**
   * Solicita agregar el producto actual al carrito de compras.
   *
   * @description
   * Método de manejo de eventos invocado al hacer clic en el botón "Agregar al carrito".
   * Emite el identificador único (`this.product.id`) mediante el evento `@Output() addToCart`.
   * La molécula no altera el carrito por sí misma; delega la mutación de datos al componente padre u organismo.
   */
  onAddToCart(): void {
    this.addToCart.emit(this.product.id);
  }
}