import { Component, Input } from '@angular/core';
import { ImageType } from '../../../core/interfaces/core.interface';

/**
 * Imagen atómica del Design System.
 *
 * @description
 * Representa un `<img>` reutilizable basado en las clases de Bootstrap
 * para imágenes (`img-fluid`, `img-thumbnail`), con soporte opcional
 * de bordes redondeados y dimensiones.
 *
 * @example
 * ```html
 * <dsb-image-atom
 *   src="https://placehold.co/200x200"
 *   alt="Imagen del producto"
 *   type="thumbnail">
 * </dsb-image-atom>
 * ```
 */
@Component({
  selector: 'dsb-image-atom',
  template: `
    <img
      [src]="src"
      [alt]="alt"
      [class]="getClass()"
      [width]="width"
      [height]="height"
    />
  `,
})
export class ImageAtom {
  /**
   * Ruta o URL de la imagen.
   *
   * @required
   * @defaultValue ''
   */
  @Input({ required: true }) src: string = '';

  /**
   * Texto alternativo de la imagen para accesibilidad.
   *
   * @required
   * @defaultValue ''
   */
  @Input({ required: true }) alt: string = '';

  /**
   * Tipo visual de la imagen según Bootstrap.
   *
   * @remarks
   * - `fluid` aplica `img-fluid` (la imagen escala con su contenedor)
   * - `thumbnail` aplica `img-thumbnail` (borde redondeado de 1px)
   *
   * @defaultValue 'fluid'
   */
  @Input() type: ImageType = 'fluid';

  /**
   * Indica si la imagen debe tener bordes redondeados.
   *
   * @remarks
   * Aplica la clase utilitaria `rounded`.
   *
   * @defaultValue false
   */
  @Input() rounded: boolean = false;

  /**
   * Ancho de la imagen en píxeles.
   *
   * @defaultValue null
   */
  @Input() width: number | null = null;

  /**
   * Alto de la imagen en píxeles.
   *
   * @defaultValue null
   */
  @Input() height: number | null = null;

  /**
   * Construye las clases CSS de la imagen.
   *
   * @returns Clase Bootstrap `img-fluid` o `img-thumbnail` con el modificador `rounded`
   *
   * @example
   * ```ts
   * getClass(); // "img-fluid" | "img-thumbnail rounded"
   * ```
   */
  getClass(): string {
    const base = this.type === 'thumbnail' ? 'img-thumbnail' : 'img-fluid';
    return this.rounded ? `${base} rounded` : base;
  }
}