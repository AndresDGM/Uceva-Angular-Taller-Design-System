import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  BadgeAtom,
  BadgeType,
  BadgeTypeText,
  ButtonAtom,
  ButtonType,
  ContainerAtom,
  IconAtom,
  ImageAtom,
  ImageType,
  SelectAtom,
  SelectOption,
} from '@brejcha13320/design-system-bootstrap';

@Component({
  templateUrl: './atoms.html',
  imports: [
    BadgeAtom,
    ButtonAtom,
    IconAtom,
    ImageAtom,
    SelectAtom,
    ContainerAtom,
    CommonModule,
  ],
})
export class Atoms {
  badges: { type: BadgeType, typeText: BadgeTypeText}[] = [
    { type: 'primary', typeText: 'text-white' },
    { type: 'secondary', typeText: 'text-white' },
    { type: 'success', typeText: 'text-white' },
    { type: 'danger', typeText: 'text-white' },
    { type: 'warning', typeText: 'text-dark' },
    { type: 'info', typeText: 'text-dark' },
    { type: 'light', typeText: 'text-dark' },
    { type: 'dark', typeText: 'text-white' },
  ];

  buttons: { type: ButtonType, idButton: string}[] = [
    { type: 'primary', idButton: 'idButttonPrimary' },
    { type: 'secondary', idButton: 'idButttonSecondary' },
    { type: 'success', idButton: 'idButttonSuccess' },
    { type: 'danger', idButton: 'idButttonDanger' },
    { type: 'warning', idButton: 'idButttonWarning' },
    { type: 'info', idButton: 'idButttonInfo' },
    { type: 'light', idButton: 'idButttonLight' },
    { type: 'dark', idButton: 'idButttonDark' },
  ];

  icons: { name: string, size: number }[] = [
    { name: 'bootstrap', size: 1 },
    { name: 'apple', size: 2 },
    { name: 'bell', size: 3 },
    { name: 'android', size: 4 },
    { name: 'ban', size: 5 },
  ]

  images: { src: string, alt: string, type: ImageType, rounded: boolean, width: number }[] = [
    { src: 'https://placehold.co/200x200?text=Camiseta', alt: 'Producto tipo thumbnail', type: 'thumbnail', rounded: false, width: 150 },
    { src: 'https://placehold.co/200x200?text=Jeans', alt: 'Producto tipo thumbnail redondeado', type: 'thumbnail', rounded: true, width: 150 },
    { src: 'https://placehold.co/200x200?text=Zapatos', alt: 'Producto tipo fluido', type: 'fluid', rounded: false, width: 150 },
  ]

  selectOptions: SelectOption[] = [
    { value: '1', label: '1 unidad' },
    { value: '2', label: '2 unidades' },
    { value: '3', label: '3 unidades' },
    { value: '4', label: '4 unidades' },
    { value: '5', label: '5 unidades' },
  ];

  onClick(idButton: string){
    alert(`Click en el Boton ${idButton}`);
  }

  onSelect(value: string | string[]){
    alert(`Seleccionado: ${value}`);
  }

}