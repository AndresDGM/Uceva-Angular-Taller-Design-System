import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartOrganism } from './shopping-cart.organism';

describe('ShoppingCartOrganism', () => {
  let component: ShoppingCartOrganism;
  let fixture: ComponentFixture<ShoppingCartOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCartOrganism]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingCartOrganism);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
