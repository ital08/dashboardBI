import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorcentajeAceptacionServicioComponent } from './porcentaje-aceptacion-servicio.component';

describe('PorcentajeAceptacionServicioComponent', () => {
  let component: PorcentajeAceptacionServicioComponent;
  let fixture: ComponentFixture<PorcentajeAceptacionServicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PorcentajeAceptacionServicioComponent]
    });
    fixture = TestBed.createComponent(PorcentajeAceptacionServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
