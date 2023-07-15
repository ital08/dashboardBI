import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorcentajeAceptacionServicioHistoricoComponent } from './porcentaje-aceptacion-servicio-historico.component';

describe('PorcentajeAceptacionServicioHistoricoComponent', () => {
  let component: PorcentajeAceptacionServicioHistoricoComponent;
  let fixture: ComponentFixture<PorcentajeAceptacionServicioHistoricoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PorcentajeAceptacionServicioHistoricoComponent]
    });
    fixture = TestBed.createComponent(PorcentajeAceptacionServicioHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
