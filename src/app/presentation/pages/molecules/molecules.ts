import { Component } from '@angular/core';
import {
  ButtonGroupData,
  ButtonGroupMolecule,
  CartItem,
  CartItemMolecule,
  ContainerAtom,
  NavLink,
  NavLinkMolecule,
  Product,
  ProductCardMolecule,
} from '@brejcha13320/design-system-bootstrap';

@Component({
  templateUrl: './molecules.html',
  imports: [
    ContainerAtom,
    ButtonGroupMolecule,
    NavLinkMolecule,
    ProductCardMolecule,
    CartItemMolecule,
  ],
})
export class Molecules {
  buttonsGroupData: ButtonGroupData[] = [
    { idButton: 'idButtonPrimary', type: 'primary', text: 'Text Primary' },
    { idButton: 'idButtonSecondary', type: 'secondary', text: 'Text Secondary' },
    { idButton: 'idButtonSuccess', type: 'success', text: 'Text Success' },
    { idButton: 'idButtonDanger', type: 'danger', text: 'Text Danger' },
    { idButton: 'idButtonWarning', type: 'warning', text: 'Text Warning' },
    { idButton: 'idButtonInfo', type: 'info', text: 'Text Info' },
    { idButton: 'idButtonLight', type: 'light', text: 'Text Light' },
    { idButton: 'idButtonDark', type: 'dark', text: 'Text Dark' },
  ];

  navLinks: NavLink[] = [
    { text: 'Link 1', url: '/atoms' },
    { text: 'Link 2', url: '/molecules' },
    { text: 'Link 3', url: '/organisms' },
  ];

  products: Product[] = [
    {
      id: 'product-1',
      name: 'Camiseta UCEVA',
      price: 50000,
      image: 'https://placehold.co/600x400',
      available: true,
    },
    {
      id: 'product-2',
      name: 'Sudadera UCEVA',
      price: 85000,
      image: 'https://placehold.co/600x400',
      available: false,
    },
  ];

  cartItem: CartItem = {
    product: this.products[0],
    quantity: 2,
  };

  quantityOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
  ];

  onClick(idButton: string): void {
    alert(`Click en el Boton de Grupo ${idButton}`);
  }

  onAddToCart(productId: string): void {
    alert(`Producto agregado al carrito: ${productId}`);
  }

  onQuantityChange(event: {
    productId: string;
    quantity: number;
  }): void {
    alert(
      `Producto ${event.productId} - Nueva cantidad: ${event.quantity}`
    );
  }

  onRemove(productId: string): void {
    alert(`Producto eliminado del carrito: ${productId}`);
  }
}
