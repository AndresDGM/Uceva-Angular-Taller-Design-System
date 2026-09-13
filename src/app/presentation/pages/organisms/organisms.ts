import { Component } from '@angular/core';
import {
  CartItem,
  ContainerAtom,
  NavbarConfig,
  NavbarOrganism,
  ShoppingCartOrganism,
} from '@brejcha13320/design-system-bootstrap';

@Component({
  selector: 'app-organisms',
  templateUrl: './organisms.html',
  imports: [NavbarOrganism, ContainerAtom, ShoppingCartOrganism],
})
export class Organisms {

  purchaseMessage = '';

  navbarConfig: NavbarConfig = {
    title: 'Taller Sistema de Diseño',
    iconConfig: {
      icon: 'bootstrap',
      size: 2
    },
    navLinks: [
      { text: 'Átomos', url: '/atoms' },
      { text: 'Moléculas', url: '/molecules' },
      { text: 'Organismos', url: '/organisms' },
    ]
  };

  cartItems: CartItem[] = [
    {
      product: {
        id: '1',
        name: 'Velez Fly Up',
        price: 25000,
        image: '/D_NQ_NP_789850-MCO86153680164_062025-O.webp',
        available: true,
      },
      quantity: 2,
    },
    {
      product: {
        id: '2',
        name: 'Nike Air Jordan',
        price: 35000,
        image: '/1054565-800-auto.webp',
        available: true,
      },
      quantity: 1,
    },
  ];

  onCartItemsChange(items: CartItem[]): void {
    this.cartItems = items;
  }

  onCheckout(items: CartItem[]): void {
    console.log('Compra realizada:', items);

    const totalItems = items.reduce(
      (total, item) => total + item.quantity,
      0
    );

    this.purchaseMessage =
      `Compra realizada correctamente. ${totalItems} unidades procesadas.`;
  }
}