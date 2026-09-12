/**
 * Temas visuales disponibles.
 */
export type Themes = 
    | 'primary'
    | 'secondary' 
    | 'success' 
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';

/** Tipo de tema para badges */
export type BadgeType = Themes;

/** Clases de texto disponibles para badges */
export type BadgeTypeText = 'text-white' | 'text-dark';

/** Tipo de tema para botones */
export type ButtonType = Themes;

/**
 * Configuración de un botón dentro de un grupo de botones.
 */
export interface ButtonGroupData {
  /** Identificador único del botón */
  idButton: string;

  /** Tipo visual del botón */
  type: ButtonType;

  /** Texto visible del botón */
  text: string;
}

/**
 * Representa un enlace de navegación.
 */
export interface NavLink {
    /** Texto visible del enlace */
    text: string;
    /** Url asociada al enlace */
    url: string;
}

/**
 * Configuración de la barra de navegación.
 */
export interface NavbarConfig {
  /** Título principal del Navbar */
  title: string;

  /** Configuración del icono del Navbar */
  iconConfig: NavbarIconConfig;

  /** Lista de enlaces de navegación */
  navLinks: NavLink[];
}

/**
 * Configuración del icono de la barra de navegación.
 */
export interface NavbarIconConfig {
    /** Nombre del icono (sin el prefijo `bi-`) */
    icon: string;

    /** Tamaño del icono en unidades `rem` */
    size: number;
}

/**
 * Tipos visuales disponibles para las imágenes según Bootstrap.
 *
 * @remarks
 * - `fluid` aplica la clase `img-fluid` (responsive)
 * - `thumbnail` aplica la clase `img-thumbnail` (borde redondeado)
 */
export type ImageType = 'fluid' | 'thumbnail';

/**
 * Opción para representar un elemento dentro de un `<select>`.
 */
export interface SelectOption {
    /** Valor asociado a la opción */
    value: string;

    /** Texto visible de la opción */
    label: string;
}

/**
 * Tamaños disponibles para el select según Bootstrap.
 */
export type SelectSize = 'sm' | 'lg';

/**
 * Representa un producto disponible en el catalogo de la tienda.
 *
 * @description
 * Interface que define el modelo de datos de un producto dentro del dominio
 * del comercio electronico. Es utilizada por componentes como `ProductCardMolecule`
 * para renderizar la informacion de presentacion y disponibilidad.
 */
export interface Product {
  /** Identificador unico del producto utilizado para rastreo en el carrito y eventos de adicion/eliminacion */
  id: string;

  /** Nombre comercial visible del producto para mostrar en la interfaz de usuario */
  name: string;

  /** Precio unitario del producto expresado en la moneda local */
  price: number;

  /** URL o ruta relativa de la imagen representativa del producto */
  image: string;

  /** Indica la disponibilidad en inventario del producto (`true` disponible para compra, `false` agotado) */
  available: boolean;
}

/**
 * Representa un elemento o producto seleccionado dentro del carrito de compras.
 *
 * @description
 * Interface que agrupa la entidad de un `Product` junto con la cantidad seleccionada
 * por el usuario. Es utilizada por `CartItemMolecule` para gestionar visualmente
 * los items presentes en el carrito.
 */
export interface CartItem {
  /** Modelo del producto asociado a la entrada del carrito */
  product: Product;

  /** Cantidad de unidades seleccionadas de este producto en el carrito */
  quantity: number;
}