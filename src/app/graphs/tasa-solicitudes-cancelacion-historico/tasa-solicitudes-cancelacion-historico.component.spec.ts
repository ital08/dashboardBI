import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasaSolicitudesCancelacionHistoricoComponent } from './tasa-solicitudes-cancelacion-historico.component';

describe('TasaSolicitudesCancelacionHistoricoComponent', () => {
  let component: TasaSolicitudesCancelacionHistoricoComponent;
  let fixture: ComponentFixture<TasaSolicitudesCancelacionHistoricoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasaSolicitudesCancelacionHistoricoComponent]
    });
    fixture = TestBed.createComponent(TasaSolicitudesCancelacionHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
