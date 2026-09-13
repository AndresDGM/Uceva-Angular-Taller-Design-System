import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MOCK_SHOPPING_CART_ITEMS,
  MOCK_SHOPPING_CART_QUANTITY_OPTIONS,
} from '../../../mocks/shopping-cart.mocks';
import { ShoppingCartOrganism } from './shopping-cart.organism';
import { CartItemMolecule } from '../../molecules/cart-item/cart-item.molecule';
import { ButtonAtom } from '../../atoms/button/button.atom';

/**
 * Pruebas unitarias para el organismo `ShoppingCartOrganism`.
 *
 * @description
 * Evalúa la instanciación, cálculos reactivos de totales (`totalItems`, `total`),
 * renderizado condicional (lista de productos vs estado vacío), actualización inmutable
 * de cantidades, remoción de ítems y emisión correcta de eventos `@Output()`
 * (`cartItemsChange` y `checkout`).
 */
describe('ShoppingCartOrganism', () => {
  let component: ShoppingCartOrganism;
  let fixture: ComponentFixture<ShoppingCartOrganism>;

  /**
   * Genera una copia profunda compatible con el entorno de pruebas para evitar
   * mutaciones en los mocks compartidos sin depender de `structuredClone()`.
   */
  const getInitialCartItems = () =>
    MOCK_SHOPPING_CART_ITEMS.map((item) => ({
      ...item,
      product: { ...item.product },
    }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCartOrganism],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingCartOrganism);
    component = fixture.componentInstance;

    component.cartItems = getInitialCartItems();
    component.quantityOptions = MOCK_SHOPPING_CART_QUANTITY_OPTIONS;

    fixture.detectChanges();
  });

  /**
   * Verifica la correcta creación e inicialización de la instancia del componente.
   */
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Verifica que las propiedades `@Input()` posean sus valores por defecto cuando no se suministran externamente.
   */
  it('debería inicializar los inputs con valores por defecto en una nueva instancia', () => {
    const newComponent = new ShoppingCartOrganism();

    expect(newComponent.cartItems).toEqual([]);
    expect(newComponent.quantityOptions.length).toBe(5);
    expect(newComponent.quantityOptions[0]).toEqual({ value: '1', label: '1' });
  });

  /**
   * Verifica el cálculo acumulativo del getter `totalItems`.
   */
  it('debería calcular correctamente el total de unidades', () => {
    expect(component.totalItems).toBe(3);
  });

  /**
   * Verifica el cálculo monetario acumulado del getter `total`.
   */
  it('debería calcular correctamente el total de la compra', () => {
    // product-1: 25000 * 2 = 50000; product-2: 35000 * 1 = 35000; total = 85000
    expect(component.total).toBe(85000);
  });

  /**
   * Verifica que los getters `totalItems` y `total` retornen 0 cuando no hay productos.
   */
  it('debería retornar 0 en totalItems y total cuando el carrito está vacío', () => {
    component.cartItems = [];

    expect(component.totalItems).toBe(0);
    expect(component.total).toBe(0);
  });

  /**
   * Verifica que se renderice una molécula por cada elemento registrado en `cartItems`.
   */
  it('debería renderizar los productos del carrito', () => {
    const items = fixture.debugElement.queryAll(
      By.css('.shopping-cart__item'),
    );

    expect(items.length).toBe(2);
  });

  /**
   * Verifica la correcta presentación del resumen de compra en el DOM.
   */
  it('debería mostrar el resumen de compra', () => {
    const summary = fixture.debugElement.query(
      By.css('.shopping-cart__summary'),
    );

    expect(summary).toBeTruthy();
  });

  /**
   * Verifica la visualización en plural en el encabezado cuando hay más de 1 unidad.
   */
  it('debería mostrar el texto en plural "productos" en el encabezado cuando hay más de 1 unidad', () => {
    const headerParagraph = fixture.debugElement.query(
      By.css('.shopping-cart__title p'),
    );

    expect(headerParagraph.nativeElement.textContent).toContain('3 productos');
  });

  /**
   * Verifica la visualización en singular en el encabezado cuando solo hay 1 unidad.
   */
  it('debería mostrar el texto en singular "producto" en el encabezado cuando solo hay 1 unidad', () => {
    component.cartItems = [
      {
        product: { ...MOCK_SHOPPING_CART_ITEMS[0].product },
        quantity: 1,
      },
    ];
    fixture.detectChanges();

    const headerParagraph = fixture.debugElement.query(
      By.css('.shopping-cart__title p'),
    );

    expect(headerParagraph.nativeElement.textContent).toContain('1 producto');
  });

  /**
   * Verifica que la actualización de cantidad refleje los nuevos totales en el componente.
   */
  it('debería actualizar la cantidad de un producto', () => {
    component.onQuantityChange({
      productId: 'product-1',
      quantity: 4,
    });

    expect(component.cartItems[0].quantity).toBe(4);
    expect(component.totalItems).toBe(5);
    expect(component.total).toBe(135000);
  });

  /**
   * Verifica que no se alteren los elementos si el `productId` suministrado no coincide con ninguno.
   */
  it('no debería modificar los productos si el productId no existe al cambiar la cantidad', () => {
    const originalItems = [...component.cartItems];

    component.onQuantityChange({
      productId: 'non-existing-product',
      quantity: 5,
    });

    expect(component.cartItems).toEqual(originalItems);
  });

  /**
   * Verifica que el evento `cartItemsChange` se emita con el listado actualizado al modificar cantidad.
   */
  it('debería emitir cartItemsChange al cambiar la cantidad', () => {
    const emitSpy = jest.spyOn(component.cartItemsChange, 'emit');

    component.onQuantityChange({
      productId: 'product-1',
      quantity: 4,
    });

    expect(emitSpy).toHaveBeenCalledWith(component.cartItems);
  });

  /**
   * Verifica que el método `onRemove` excluya el producto seleccionado por su identificador.
   */
  it('debería eliminar un producto del carrito', () => {
    component.onRemove('product-1');

    expect(component.cartItems.length).toBe(1);
    expect(component.cartItems[0].product.id).toBe('product-2');
  });

  /**
   * Verifica que el evento `cartItemsChange` se emita con el listado actualizado al eliminar un producto.
   */
  it('debería emitir cartItemsChange al eliminar un producto', () => {
    const emitSpy = jest.spyOn(component.cartItemsChange, 'emit');

    component.onRemove('product-1');

    expect(emitSpy).toHaveBeenCalledWith(component.cartItems);
  });

  /**
   * Verifica que el método `onCheckout` emita la lista actual de productos a través de `checkout`.
   */
  it('debería emitir checkout con los productos del carrito', () => {
    const emitSpy = jest.spyOn(component.checkout, 'emit');

    component.onCheckout();

    expect(emitSpy).toHaveBeenCalledWith(component.cartItems);
  });

  /**
   * Verifica que al pulsar el botón de compra en el DOM se emita el evento checkout.
   */
  it('debería emitir checkout al presionar el botón de compra en el resumen', () => {
    const checkoutSpy = jest.spyOn(component.checkout, 'emit');
    const buttonDebugElement = fixture.debugElement.query(
      By.css('.shopping-cart__summary dsb-button-atom'),
    );

    expect(buttonDebugElement).toBeTruthy();
    buttonDebugElement.triggerEventHandler('clicker', 'checkout');

    expect(checkoutSpy).toHaveBeenCalledWith(component.cartItems);
  });

  /**
   * Verifica que los eventos emitidos por `CartItemMolecule` en el template disparen los métodos del organismo.
   */
  it('debería procesar los eventos de cambio de cantidad y eliminación emitidos por CartItemMolecule', () => {
    const cartItemsChangeSpy = jest.spyOn(component.cartItemsChange, 'emit');

    const firstMolecule = fixture.debugElement.query(
      By.directive(CartItemMolecule),
    );
    expect(firstMolecule).toBeTruthy();

    firstMolecule.triggerEventHandler('quantityChange', {
      productId: 'product-1',
      quantity: 3,
    });
    expect(component.cartItems[0].quantity).toBe(3);
    expect(cartItemsChangeSpy).toHaveBeenCalledWith(component.cartItems);

    firstMolecule.triggerEventHandler('remove', 'product-1');
    expect(component.cartItems.find((i) => i.product.id === 'product-1')).toBeUndefined();
    expect(cartItemsChangeSpy).toHaveBeenCalledWith(component.cartItems);
  });

  /**
   * Verifica que ante un listado de ítems vacío se renderice el bloque informativo y se oculte el resumen.
   */
  it('debería mostrar el estado vacío cuando no hay productos', () => {
    component.cartItems = [];
    fixture.detectChanges();

    const emptyState = fixture.debugElement.query(
      By.css('.shopping-cart__empty'),
    );

    const summary = fixture.debugElement.query(
      By.css('.shopping-cart__summary'),
    );

    expect(emptyState).toBeTruthy();
    expect(summary).toBeNull();
    expect(emptyState.nativeElement.textContent).toContain(
      'Tu carrito está vacío',
    );
  });
});