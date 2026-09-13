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
 * Organismo encargado de gestionar la representación y las acciones
 * principales del carrito de compras dentro del Design System.
 *
 * @description
 * Componente tipo **Organismo** basado en **Atomic Design**.
 * Orquesta y compone múltiples instancias de la molécula `CartItemMolecule`
 * junto con el átomo `ButtonAtom` para consolidar la experiencia completa
 * del carrito de compras.
 *
 * **Responsabilidades:**
 * - Renderizar la lista dinámica de productos agregados mediante `CartItemMolecule`.
 * - Presentar el resumen de compra (cantidad de unidades y monto acumulado).
 * - Calcular reactivamente los totales (`totalItems` y `total`).
 * - Gestionar la actualización de cantidades y la eliminación de productos de forma inmutable.
 * - Proveer el llamado a la acción de compra mediante `ButtonAtom`.
 * - Mostrar un estado visual alternativo cuando el carrito no contiene productos.
 * - Notificar al componente contenedor sobre modificaciones (`cartItemsChange`) y la intención de compra (`checkout`).
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
   * Lista de productos actualmente registrados en el carrito.
   *
   * @description
   * Recibe una colección de objetos `CartItem`, donde cada elemento encapsula
   * la información del producto (`Product`) y la cantidad de unidades seleccionadas (`quantity`).
   *
   * @type {CartItem[]}
   * @default []
   */
  @Input() cartItems: CartItem[] = [];

  /**
   * Opciones seleccionables de cantidad provistas a cada ítem del carrito.
   *
   * @description
   * Colección de opciones (`SelectOption`) que alimentan el selector desplegable
   * de cada `CartItemMolecule`, permitiendo al usuario ajustar la cantidad de unidades deseadas.
   *
   * @type {SelectOption[]}
   * @default Opciones numéricas del 1 al 5
   */
  @Input() quantityOptions: SelectOption[] = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
  ];

  /**
   * Evento emitido cuando el listado de productos del carrito es modificado.
   *
   * @description
   * Se dispara tras cualquier cambio de cantidad (`onQuantityChange`) o eliminación
   * de producto (`onRemove`), emitiendo una nueva referencia del arreglo de ítems
   * (`CartItem[]`) para mantener la sincronización y la reactividad con el componente padre.
   *
   * @type {EventEmitter<CartItem[]>}
   */
  @Output() cartItemsChange =
    new EventEmitter<CartItem[]>();

  /**
   * Evento emitido cuando el usuario confirma su intención de finalizar la compra.
   *
   * @description
   * Se dispara al presionar el botón de compra ("Comprar"), transmitiendo la lista
   * completa de productos actuales (`CartItem[]`) al componente consumidor para
   * iniciar el flujo de pago o checkout.
   *
   * @type {EventEmitter<CartItem[]>}
   */
  @Output() checkout =
    new EventEmitter<CartItem[]>();

  /**
   * Obtiene la cantidad total de unidades presentes en el carrito.
   *
   * @description
   * Getter que calcula de forma acumulada la sumatoria de las unidades (`quantity`)
   * de todos los ítems registrados en el carrito.
   *
   * @returns {number} Sumatoria total de unidades de productos.
   */
  get totalItems(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.quantity,
      0,
    );
  }

  /**
   * Obtiene el valor monetario total de los productos presentes en el carrito.
   *
   * @description
   * Getter que calcula el monto acumulado multiplicando el precio unitario
   * (`item.product.price`) por la cantidad (`item.quantity`) de cada elemento.
   *
   * @returns {number} Valor total acumulado de la compra en la moneda configurada.
   */
  get total(): number {
    return this.cartItems.reduce(
      (total, item) =>
        total + item.product.price * item.quantity,
      0,
    );
  }

  /**
   * Actualiza la cantidad de unidades para un producto específico y notifica el cambio.
   *
   * @description
   * Genera un nuevo arreglo de ítems actualizando de forma inmutable la propiedad `quantity`
   * del producto cuyo identificador coincida con `event.productId`. Posteriormente, emite
   * el nuevo estado mediante `cartItemsChange`.
   *
   * @param event Objeto que contiene:
   * - `productId`: Identificador único del producto a actualizar (`string`).
   * - `quantity`: Nueva cantidad seleccionada (`number`).
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
   * Elimina un producto del carrito según su identificador único y notifica el cambio.
   *
   * @description
   * Filtra de forma inmutable el arreglo `cartItems`, excluyendo el elemento coincidente
   * con `productId`. Tras la exclusión, emite el arreglo actualizado mediante `cartItemsChange`.
   *
   * @param productId Identificador único del producto a remover del carrito (`string`).
   */
  onRemove(productId: string): void {
    this.cartItems = this.cartItems.filter(
      (item) => item.product.id !== productId,
    );

    this.cartItemsChange.emit(this.cartItems);
  }

  /**
   * Notifica el inicio del proceso de checkout o finalización de compra.
   *
   * @description
   * Método disparado por la acción de clic del botón de compra (`ButtonAtom`).
   * Emite el listado actual de `cartItems` a través del evento `@Output() checkout`.
   */
  onCheckout(): void {
    this.checkout.emit(this.cartItems);
  }
}