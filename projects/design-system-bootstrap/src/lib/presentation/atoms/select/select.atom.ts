import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectOption, SelectSize } from '../../../core/interfaces/core.interface';

/**
 * Select atómico del Design System.
 *
 * @description
 * Representa un `<select>` reutilizable basado en Bootstrap (`form-select`),
 * con soporte de tamaños (`sm`, `lg`), estado disabled y selección múltiple.
 * Emite un evento al cambiar el valor seleccionado.
 *
 * @example
 * ```html
 * <dsb-select-atom
 *   [options]="options"
 *   size="lg"
 *   [ariaLabel]="'Seleccione una opción'">
 * </dsb-select-atom>
 * ```
 */
@Component({
  selector: 'dsb-select-atom',
  template: `
    <select
      [id]="id"
      [class]="getClass()"
      [disabled]="disabled"
      [multiple]="multiple"
      [attr.size]="listBoxSize"
      [aria-label]="ariaLabel"
      (change)="onChange($event)">
      @if(placeholder){
        <option value="" selected disabled>{{ placeholder }}</option>
      }
      @for(option of options; track option.value){
        <option [value]="option.value">{{ option.label }}</option>
      }
    </select>
  `,
})
export class SelectAtom {
  /**
   * Lista de opciones disponibles del select.
   *
   * @type {SelectOption[]}
   * @default []
   */
  @Input() options: SelectOption[] = [];

  /**
   * Texto de la opción predeterminada.
   *
   * @description
   * Opción inicial no seleccionable que orienta al usuario.
   *
   * @defaultValue 'Open this select menu'
   */
  @Input() placeholder: string = 'Open this select menu';

  /**
   * Tamaño del select según Bootstrap.
   *
   * @remarks
   * - `sm` agrega la clase `form-select-sm`
   * - `lg` agrega la clase `form-select-lg`
   * - vacío deja el tamaño estándar
   *
   * @defaultValue ''
   */
  @Input() size: SelectSize | '' = '';

  /**
   * Indica si el select está deshabilitado.
   *
   * @defaultValue false
   */
  @Input() disabled: boolean = false;

  /**
   * Permite la selección múltiple de opciones.
   *
   * @defaultValue false
   */
  @Input() multiple: boolean = false;

  /**
   * Número de filas visibles del select.
   *
   * @remarks
   * Aplica al atributo nativo `size` y solo tiene efecto
   * cuando `multiple` es `true`.
   *
   * @defaultValue null
   */
  @Input() listBoxSize: number | null = null;

  /**
   * Etiqueta accesible para tecnologías de asistencia.
   *
   * @defaultValue ''
   */
  @Input() ariaLabel: string = '';

  /**
   * Identificador HTML del select.
   *
   * @defaultValue ''
   */
  @Input() id: string = '';

  /**
   * Evento emitido al cambiar la selección.
   *
   * @emits string | string[] Valor seleccionado, o arreglo de valores en modo múltiple
   */
  @Output() selected: EventEmitter<string | string[]> = new EventEmitter<string | string[]>();

  /**
   * Construye las clases CSS del select.
   *
   * @returns Clase Bootstrap `form-select` con su variante de tamaño
   *
   * @example
   * ```ts
   * getClass(); // "form-select" | "form-select-sm" | "form-select-lg"
   * ```
   */
  getClass(): string {
    return `form-select${this.size ? ` form-select-${this.size}` : ''}`;
  }

  /**
   * Emite el valor seleccionado del select.
   *
   * @param {Event} event Evento de cambio del elemento nativo
   * @returns {void}
   */
  onChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    if (this.multiple) {
      const values = Array.from(select.selectedOptions).map((option) => option.value);
      this.selected.emit(values);
    } else {
      this.selected.emit(select.value);
    }
  }
}