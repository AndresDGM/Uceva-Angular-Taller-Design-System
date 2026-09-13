import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MOCK_SHOPPING_CART_ITEMS,
  MOCK_SHOPPING_CART_QUANTITY_OPTIONS,
} from '../../../mocks/shopping-cart.mocks';
import { ShoppingCartOrganism } from './shopping-cart.organism';

describe('ShoppingCartOrganism', () => {
  let component: ShoppingCartOrganism;
  let fixture: ComponentFixture<ShoppingCartOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCartOrganism],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingCartOrganism);
    component = fixture.componentInstance;

    component.cartItems = MOCK_SHOPPING_CART_ITEMS.map((item) => ({
      ...item,
      product: { ...item.product },
    }));

    component.quantityOptions = MOCK_SHOPPING_CART_QUANTITY_OPTIONS;

    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería calcular correctamente el total de unidades', () => {
    expect(component.totalItems).toBe(3);
  });

  it('debería calcular correctamente el total de la compra', () => {
    expect(component.total).toBe(85000);
  });

  it('debería renderizar los productos del carrito', () => {
    const items = fixture.debugElement.queryAll(
      By.css('.shopping-cart__item'),
    );

    expect(items.length).toBe(2);
  });

  it('debería mostrar el resumen de compra', () => {
    const summary = fixture.debugElement.query(
      By.css('.shopping-cart__summary'),
    );

    expect(summary).toBeTruthy();
  });

  it('debería actualizar la cantidad de un producto', () => {
    component.onQuantityChange({
      productId: 'product-1',
      quantity: 4,
    });

    expect(component.cartItems[0].quantity).toBe(4);
    expect(component.totalItems).toBe(5);
    expect(component.total).toBe(135000);
  });

  it('debería emitir cartItemsChange al cambiar la cantidad', () => {
    const emitSpy = jest.spyOn(component.cartItemsChange, 'emit');

    component.onQuantityChange({
      productId: 'product-1',
      quantity: 4,
    });

    expect(emitSpy).toHaveBeenCalledWith(component.cartItems);
  });

  it('debería eliminar un producto del carrito', () => {
    component.onRemove('product-1');

    expect(component.cartItems.length).toBe(1);
    expect(component.cartItems[0].product.id).toBe('product-2');
  });

  it('debería emitir cartItemsChange al eliminar un producto', () => {
    const emitSpy = jest.spyOn(component.cartItemsChange, 'emit');

    component.onRemove('product-1');

    expect(emitSpy).toHaveBeenCalledWith(component.cartItems);
  });

  it('debería emitir checkout con los productos del carrito', () => {
    const emitSpy = jest.spyOn(component.checkout, 'emit');

    component.onCheckout();

    expect(emitSpy).toHaveBeenCalledWith(component.cartItems);
  });

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
  });
});