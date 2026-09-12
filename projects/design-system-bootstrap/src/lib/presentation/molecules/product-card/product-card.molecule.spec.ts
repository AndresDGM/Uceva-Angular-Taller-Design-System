import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardMolecule } from './product-card.molecule';
import { MOCK_PRODUCTS } from '../../../mocks/product.mocks';

describe('ProductCardMolecule', () => {
  let component: ProductCardMolecule;
  let fixture: ComponentFixture<ProductCardMolecule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardMolecule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardMolecule);
    component = fixture.componentInstance;

    component.product = MOCK_PRODUCTS[0];

    fixture.detectChanges();
  });

  it('Deberia crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia recibir un producto', () => {
    expect(component.product).toEqual(MOCK_PRODUCTS[0]);
  });

  it('Deberia emitir el id del producto al agregarlo al carrito', () => {
    const spy = jest.spyOn(component.addToCart, 'emit');

    component.onAddToCart();

    expect(spy).toHaveBeenCalledWith(
      MOCK_PRODUCTS[0].id
    );
  });

  it('Deberia emitir el id correcto para otro producto', () => {
    const spy = jest.spyOn(component.addToCart, 'emit');

    component.product = MOCK_PRODUCTS[1];

    component.onAddToCart();

    expect(spy).toHaveBeenCalledWith(
      MOCK_PRODUCTS[1].id
    );
  });
});