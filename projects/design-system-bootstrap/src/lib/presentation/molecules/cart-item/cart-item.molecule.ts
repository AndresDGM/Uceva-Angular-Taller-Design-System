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
 * Elemento individual del carrito de compras del Design System.
 *
 * @description
 * Componente tipo **Molécula** basado en **Atomic Design**.
 * Reutiliza y combina los átomos `ImageAtom`, `SelectAtom` y `ButtonAtom` para
 * representar visualmente un producto ingresado al carrito de compras y permitir la modificación
 * de su cantidad o su eliminación.
 *
 * **Responsabilidad:**
 * - Renderizar la imagen miniatura del producto mediante `ImageAtom`.
 * - Mostrar el nombre y el precio unitario del producto del carrito.
 * - Ofrecer una lista desplegable mediante `SelectAtom` para actualizar la cantidad deseada.
 * - Proveer el botón "Eliminar" mediante `ButtonAtom` para solicitar la extracción del producto.
 * - Emitir los eventos correspondientes (`quantityChange` y `remove`) ante cualquier modificación.
 *
 * **Delimitación de Responsabilidades e Integración:**
 * La molécula **NO** administra directamente el estado global del carrito ni elimina o modifica elementos por sí misma.
 * Funciona de forma totalmente reactiva y pura; comunica las intenciones del usuario hacia componentes de nivel superior.
 * En la arquitectura final del proyecto, esta molécula se integrará como un componente hijo repetible dentro del
 * futuro organismo `ShoppingCartOrganism`, el cual agregará la lista de ítems y calculará los totales de compra.
 */
@Component({
  selector: 'dsb-cart-item-molecule',
  templateUrl: './cart-item.molecule.html',
  styleUrl: './cart-item.molecule.css',
  imports: [CommonModule, ImageAtom, SelectAtom, ButtonAtom],
})
export class CartItemMolecule {
  /**
   * Elemento del carrito que contiene la información del producto y la cantidad seleccionada.
   *
   * @description
   * Recibe un objeto `CartItem` que agrupa la entidad `Product` y la propiedad numérica `quantity`.
   */
  @Input() cartItem!: CartItem;

  /**
   * Lista de opciones seleccionables de cantidad para el menú desplegable.
   *
   * @description
   * Recibe un arreglo de `SelectOption` (con par `value` y `label`) que se provee al átomo `SelectAtom`
   * para permitir cambiar las unidades a comprar.
   */
  @Input() quantityOptions: SelectOption[] = [];

  /**
   * Evento emitido cuando el usuario selecciona una nueva cantidad para el producto.
   *
   * @description
   * Notifica al componente padre sobre la actualización de cantidad enviando un objeto estructurado con:
   * - `productId`: Identificador único del producto (`string`).
   * - `quantity`: Nueva cantidad elegida convertida a tipo numérico (`number`).
   */
  @Output() quantityChange: EventEmitter<{
    productId: string;
    quantity: number;
  }> = new EventEmitter<{
    productId: string;
    quantity: number;
  }>();

  /**
   * Evento emitido al solicitar la eliminación del producto del carrito.
   *
   * @description
   * Transmite el identificador único (`string`) del producto (`cartItem.product.id`) para que el componente contenedor
   * proceda con la remoción del item.
   */
  @Output() remove: EventEmitter<string> =
    new EventEmitter<string>();

  /**
   * Procesa el cambio de cantidad seleccionado en el selector y emite el evento correspondiente.
   *
   * @description
   * Método disparado por el evento `(selected)` de `SelectAtom`.
   *
   * **Manejo de tipos `string | string[]`:**
   * Dado que el átomo `SelectAtom` soporta tanto selección única (que retorna un `string`) como selección múltiple
   * (que retorna un `string[]`), este método contempla ambos tipos de retorno. Si recibe un arreglo, extrae el primer
   * elemento (`quantity[0]`), garantizando robustez ante cualquier valor devuelto por el evento.
   *
   * **Conversión numérica:**
   * Convierte la cadena obtenida a valor numérico mediante `Number(value)` antes de emitir el payload estructurado
   * en `quantityChange`.
   *
   * @param quantity Valor o lista de valores recibidos del selector.
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
   * Solicita la eliminación de este ítem del carrito de compras.
   *
   * @description
   * Método ejecutado al presionar el botón "Eliminar".
   * Emite el identificador del producto (`this.cartItem.product.id`) mediante el evento `@Output() remove`.
   * La molécula no altera el estado del carrito por sí misma; delega la remoción al contenedor padre u organismo.
   */
  onRemove(): void {
    this.remove.emit(this.cartItem.product.id);
  }
}