import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemMolecule } from './cart-item.molecule';

import {
  MOCK_CART_ITEM,
  MOCK_QUANTITY_OPTIONS,
} from '../../../mocks/cart-item.mocks';

describe('CartItemMolecule', () => {
  let component: CartItemMolecule;
  let fixture: ComponentFixture<CartItemMolecule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemMolecule],
    }).compileComponents();

    fixture = TestBed.createComponent(CartItemMolecule);
    component = fixture.componentInstance;

    component.cartItem = MOCK_CART_ITEM;
    component.quantityOptions = MOCK_QUANTITY_OPTIONS;

    fixture.detectChanges();
  });

  it('Deberia crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia recibir un elemento del carrito', () => {
    expect(component.cartItem).toEqual(MOCK_CART_ITEM);
  });

  it('Deberia recibir las opciones de cantidad', () => {
    expect(component.quantityOptions).toEqual(
      MOCK_QUANTITY_OPTIONS
    );
  });

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

  it('Deberia emitir el id del producto al eliminarlo', () => {
    const spy = jest.spyOn(component.remove, 'emit');

    component.onRemove();

    expect(spy).toHaveBeenCalledWith(
      MOCK_CART_ITEM.product.id
    );
  });
});