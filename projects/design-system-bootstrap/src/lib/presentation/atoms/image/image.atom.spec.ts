import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  MOCK_IMAGE_ALT,
  MOCK_IMAGE_ALT_UPDATE,
  MOCK_IMAGE_HEIGHT,
  MOCK_IMAGE_SRC,
  MOCK_IMAGE_TYPES,
  MOCK_IMAGE_WIDTH,
} from '../../../mocks/image.mocks';
import { ImageAtom } from './image.atom';

describe('ImageAtom', () => {
  let component: ImageAtom;
  let fixture: ComponentFixture<ImageAtom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageAtom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageAtom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar un elemento <img>', () => {
    component.src = MOCK_IMAGE_SRC;
    component.alt = MOCK_IMAGE_ALT;
    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('img'));
    expect(img).toBeTruthy();
  });

  it('debería asignar el src y el alt de la imagen', () => {
    component.src = MOCK_IMAGE_SRC;
    component.alt = MOCK_IMAGE_ALT;
    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('img'));
    expect(img.nativeElement.src).toContain(MOCK_IMAGE_SRC);
    expect(img.nativeElement.alt).toBe(MOCK_IMAGE_ALT);
  });

  it('debería actualizar el alt cuando cambia el input', () => {
    component.src = MOCK_IMAGE_SRC;
    component.alt = MOCK_IMAGE_ALT;
    fixture.detectChanges();
    component.alt = MOCK_IMAGE_ALT_UPDATE;
    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('img'));
    expect(img.nativeElement.alt).toBe(MOCK_IMAGE_ALT_UPDATE);
  });

  it('debería aplicar la clase img-fluid por defecto', () => {
    component.src = MOCK_IMAGE_SRC;
    component.alt = MOCK_IMAGE_ALT;
    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('img'));
    expect(img.nativeElement.classList).toContain('img-fluid');
  });

  it('debería aplicar las clases correctas para cada tipo de imagen', () => {
    MOCK_IMAGE_TYPES.forEach(type => {
      component.type = type;
      fixture.detectChanges();
      const img = fixture.debugElement.query(By.css('img'));
      const expected = type === 'thumbnail' ? 'img-thumbnail' : 'img-fluid';
      expect(img.nativeElement.classList).toContain(expected);
    });
  });

  it('debería aplicar la clase rounded cuando rounded es true', () => {
    component.src = MOCK_IMAGE_SRC;
    component.alt = MOCK_IMAGE_ALT;
    component.rounded = true;
    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('img'));
    expect(img.nativeElement.classList).toContain('rounded');
  });

  it('no debería aplicar la clase rounded cuando rounded es false', () => {
    component.src = MOCK_IMAGE_SRC;
    component.alt = MOCK_IMAGE_ALT;
    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('img'));
    expect(img.nativeElement.classList).not.toContain('rounded');
  });

  it('debería aplicar el ancho y alto personalizados', () => {
    component.src = MOCK_IMAGE_SRC;
    component.alt = MOCK_IMAGE_ALT;
    component.width = MOCK_IMAGE_WIDTH;
    component.height = MOCK_IMAGE_HEIGHT;
    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('img'));
    expect(img.nativeElement.getAttribute('width')).toBe(String(MOCK_IMAGE_WIDTH));
    expect(img.nativeElement.getAttribute('height')).toBe(String(MOCK_IMAGE_HEIGHT));
  });

  it('getClass debería retornar las clases correctas', () => {
    MOCK_IMAGE_TYPES.forEach(type => {
      component.type = type;
      const expected = type === 'thumbnail' ? 'img-thumbnail' : 'img-fluid';
      expect(component.getClass()).toBe(expected);
    });
  });

  it('getClass debería incluir rounded cuando rounded es true', () => {
    component.type = 'thumbnail';
    component.rounded = true;
    expect(component.getClass()).toBe('img-thumbnail rounded');
  });

});