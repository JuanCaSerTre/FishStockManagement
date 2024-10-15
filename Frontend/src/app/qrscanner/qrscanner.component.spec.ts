import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrScannerComponent } from './qrscanner.component'; // El nombre del archivo es 'qrscanner.component.ts'

describe('QrScannerComponent', () => {
  // Usa el nombre correcto del componente
  let component: QrScannerComponent; // Usa el nombre correcto de la clase
  let fixture: ComponentFixture<QrScannerComponent>; // Usa el nombre correcto de la clase

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrScannerComponent], // Usa el nombre correcto de la clase
    }).compileComponents();

    fixture = TestBed.createComponent(QrScannerComponent); // Usa el nombre correcto de la clase
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
