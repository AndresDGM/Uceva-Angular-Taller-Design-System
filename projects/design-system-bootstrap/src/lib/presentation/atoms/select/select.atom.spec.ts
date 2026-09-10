import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  MOCK_SELECT_OPTIONS,
  MOCK_SELECT_PLACEHOLDER,
  MOCK_SELECT_PLACEHOLDER_CUSTOM,
  MOCK_SELECT_SIZES,
} from '../../../mocks/select.mocks';
import { SelectAtom } from './select.atom';

describe('SelectAtom', () => {
  let component: SelectAtom;
  let fixture: ComponentFixture<SelectAtom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectAtom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectAtom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar options como un arreglo vacío por defecto', () => {
    expect(component.options).toEqual([]);
  });

  it('debería inicializar placeholder con el valor por defecto', () => {
    expect(component.placeholder).toBe(MOCK_SELECT_PLACEHOLDER);
  });

  it('debería renderizar un elemento <select> con la clase form-select', () => {
    const select = fixture.debugElement.query(By.css('select'));
    expect(select).toBeTruthy();
    expect(select.nativeElement.classList).toContain('form-select');
  });

  it('debería renderizar la opción predeterminada', () => {
    fixture.detectChanges();
    const placeholder = fixture.debugElement.query(By.css('option:disabled'));
    expect(placeholder).toBeTruthy();
    expect(placeholder.nativeElement.textContent).toBe(MOCK_SELECT_PLACEHOLDER);
  });

  it('debería renderizar la cantidad correcta de opciones', () => {
    component.options = MOCK_SELECT_OPTIONS;
    fixture.detectChanges();
    const options = fixture.debugElement.queryAll(By.css('option:not(:disabled)'));
    expect(options.length).toBe(MOCK_SELECT_OPTIONS.length);
  });

  it('debería mostrar el texto correcto en cada opción', () => {
    component.options = MOCK_SELECT_OPTIONS;
    fixture.detectChanges();
    const options = fixture.debugElement.queryAll(By.css('option:not(:disabled)'));
    MOCK_SELECT_OPTIONS.forEach((option, index) => {
      expect(options[index].nativeElement.textContent).toContain(option.label);
      expect(options[index].nativeElement.value).toBe(option.value);
    });
  });

  it('debería aplicar el placeholder personalizado', () => {
    component.placeholder = MOCK_SELECT_PLACEHOLDER_CUSTOM;
    fixture.detectChanges();
    const placeholder = fixture.debugElement.query(By.css('option:disabled'));
    expect(placeholder.nativeElement.textContent).toBe(MOCK_SELECT_PLACEHOLDER_CUSTOM);
  });

  it('debería aplicar el atributo disabled cuando disabled es true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const select = fixture.debugElement.query(By.css('select'));
    expect(select.nativeElement.disabled).toBe(true);
  });

  it('no debería aplicar el atributo disabled cuando disabled es false', () => {
    fixture.detectChanges();
    const select = fixture.debugElement.query(By.css('select'));
    expect(select.nativeElement.disabled).toBe(false);
  });

  it('debería aplicar el atributo multiple cuando multiple es true', () => {
    component.multiple = true;
    fixture.detectChanges();
    const select = fixture.debugElement.query(By.css('select'));
    expect(select.nativeElement.multiple).toBe(true);
  });

  it('debería aplicar el atributo size para la lista de opciones', () => {
    component.multiple = true;
    component.listBoxSize = 3;
    fixture.detectChanges();
    const select = fixture.debugElement.query(By.css('select'));
    expect(select.nativeElement.getAttribute('size')).toBe('3');
  });

  it('debería aplicar el aria-label', () => {
    component.ariaLabel = 'Cantidad';
    fixture.detectChanges();
    const select = fixture.debugElement.query(By.css('select'));
    expect(select.nativeElement.getAttribute('aria-label')).toBe('Cantidad');
  });

  it('debería aplicar el id del select', () => {
    component.id = 'select-cantidad';
    fixture.detectChanges();
    const select = fixture.debugElement.query(By.css('select'));
    expect(select.nativeElement.getAttribute('id')).toBe('select-cantidad');
  });

  it('debería aplicar las clases de tamaño según Bootstrap', () => {
    MOCK_SELECT_SIZES.forEach(size => {
      component.size = size;
      fixture.detectChanges();
      const select = fixture.debugElement.query(By.css('select'));
      expect(select.nativeElement.classList).toContain(`form-select-${size}`);
    });
  });

  it('getClass debería retornar la clase form-select por defecto', () => {
    expect(component.getClass()).toBe('form-select');
  });

  it('getClass debería retornar la variante de tamaño', () => {
    MOCK_SELECT_SIZES.forEach(size => {
      component.size = size;
      expect(component.getClass()).toBe(`form-select form-select-${size}`);
    });
  });

  it('debería emitir el valor seleccionado al cambiar', () => {
    component.options = MOCK_SELECT_OPTIONS;
    const spy = jest.spyOn(component.selected, 'emit');
    fixture.detectChanges();

    const select = fixture.debugElement.query(By.css('select'));
    select.nativeElement.value = '3';
    select.nativeElement.dispatchEvent(new Event('change'));
    expect(spy).toHaveBeenCalledWith('3');
  });

  it('debería emitir un arreglo de valores en modo multiple', () => {
    component.options = MOCK_SELECT_OPTIONS;
    component.multiple = true;
    const spy = jest.spyOn(component.selected, 'emit');
    fixture.detectChanges();

    const select = fixture.debugElement.query(By.css('select')).nativeElement;
    select.value = '2';
    select.multiple = true;
    const options = select.querySelectorAll('option:not(:disabled)');
    options[0].selected = true;
    options[1].selected = true;
    select.dispatchEvent(new Event('change'));
    expect(spy).toHaveBeenCalledWith(['1', '2']);
  });

});