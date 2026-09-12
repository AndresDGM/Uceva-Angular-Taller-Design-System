import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemMolecule } from './cart-item.molecule';

import {
  MOCK_CART_ITEM,
  MOCK_QUANTITY_OPTIONS,
} from '../../../mocks/cart-item.mocks';

/**
 * Pruebas unitarias para la molécula `CartItemMolecule`.
 *
 * @description
 * Evalúa la correcta recepción de propiedades mediante `@Input()`, la emision estructurada
 * de cambios de cantidad (`@Output() quantityChange`) manejando tipos `string` y `string[]`,
 * y la emisión de eventos de eliminación (`@Output() remove`).
 */
describe('CartItemMolecule', () => {
  let component: CartItemMolecule;
  let fixture: ComponentFixture<CartItemMolecule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemMolecule],
    }).compileComponents();

    fixture = TestBed.createComponent(CartItemMolecule);
    component = fixture.componentInstance;

    // Asignación de datos mock iniciales de prueba
    component.cartItem = MOCK_CART_ITEM;
    component.quantityOptions = MOCK_QUANTITY_OPTIONS;

    fixture.detectChanges();
  });

  /**
   * Verifica la correcta creación e instanciación del componente.
   */
  it('Deberia crear el componente', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Verifica que la entrada `@Input() cartItem` reciba y almacene correctamente los datos del producto en carrito.
   */
  it('Deberia recibir un elemento del carrito', () => {
    expect(component.cartItem).toEqual(MOCK_CART_ITEM);
  });

  /**
   * Verifica que la entrada `@Input() quantityOptions` reciba la lista de opciones para el selector de cantidad.
   */
  it('Deberia recibir las opciones de cantidad', () => {
    expect(component.quantityOptions).toEqual(
      MOCK_QUANTITY_OPTIONS
    );
  });

  /**
   * Verifica que al seleccionar una nueva cantidad como string único ('3'),
   * se emita un objeto payload conteniendo el `productId` y la cantidad parseada a `number`.
   */
  it('Deberia emitir el cambio de cantidad', () => {
    const spy = jest.spyOn(
      component.quantityChange,
      'emit'
    );

    component.onQuantityChange('3');

    expect(spy).toHaveBeenCalledWith({
      productId: MOCK_CART_ITEM.product.id,
      quantity: 3,
    });
  });

  /**
   * Verifica que cuando el `SelectAtom` emite un arreglo de strings (e.g. `['4']`),
   * la molécula extraiga el primer elemento, lo convierta a `number` y emita el objeto en `quantityChange`.
   */
  it('Deberia manejar valores de tipo array del select', () => {
    const spy = jest.spyOn(
      component.quantityChange,
      'emit'
    );

    component.onQuantityChange(['4']);

    expect(spy).toHaveBeenCalledWith({
      productId: MOCK_CART_ITEM.product.id,
      quantity: 4,
    });
  });

  /**
   * Verifica que al invocar `onRemove()` se emita el evento `@Output() remove`
   * conteniendo la clave primaria o identificador único del producto.
   */
  it('Deberia emitir el id del producto al eliminarlo', () => {
    const spy = jest.spyOn(component.remove, 'emit');

    component.onRemove();

    expect(spy).toHaveBeenCalledWith(
      MOCK_CART_ITEM.product.id
    );
  });
});