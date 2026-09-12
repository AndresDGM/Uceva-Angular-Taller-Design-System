import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardMolecule } from './product-card.molecule';
import { MOCK_PRODUCTS } from '../../../mocks/product.mocks';

/**
 * Pruebas unitarias para la molécula `ProductCardMolecule`.
 *
 * @description
 * Verifica el comportamiento básico de renderizado, vinculación de entradas (`@Input()`)
 * y la correcta emisión de eventos (`@Output()`) al interactuar con el botón de compra.
 */
describe('ProductCardMolecule', () => {
  let component: ProductCardMolecule;
  let fixture: ComponentFixture<ProductCardMolecule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardMolecule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardMolecule);
    component = fixture.componentInstance;

    // Asignación de un producto de prueba por defecto
    component.product = MOCK_PRODUCTS[0];

    fixture.detectChanges();
  });

  /**
   * Verifica la correcta instanciación del componente en el contexto de pruebas.
   */
  it('Deberia crear el componente', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Verifica que la propiedad `@Input() product` almacene correctamente la entidad asignada.
   */
  it('Deberia recibir un producto', () => {
    expect(component.product).toEqual(MOCK_PRODUCTS[0]);
  });

  /**
   * Verifica que al invocar `onAddToCart()` se emita el evento `@Output() addToCart`
   * conteniendo el identificador del producto activo.
   */
  it('Deberia emitir el id del producto al agregarlo al carrito', () => {
    const spy = jest.spyOn(component.addToCart, 'emit');

    component.onAddToCart();

    expect(spy).toHaveBeenCalledWith(
      MOCK_PRODUCTS[0].id
    );
  });

  /**
   * Verifica el comportamiento dinámico de emisión de ID al cambiar el objeto `product`
   * asignado en el `@Input()`.
   */
  it('Deberia emitir el id correcto para otro producto', () => {
    const spy = jest.spyOn(component.addToCart, 'emit');

    component.product = MOCK_PRODUCTS[1];

    component.onAddToCart();

    expect(spy).toHaveBeenCalledWith(
      MOCK_PRODUCTS[1].id
    );
  });
});