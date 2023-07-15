import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistanciaRecorridaHistoricoComponent } from './distancia-recorrida-historico.component';

describe('DistanciaRecorridaHistoricoComponent', () => {
  let component: DistanciaRecorridaHistoricoComponent;
  let fixture: ComponentFixture<DistanciaRecorridaHistoricoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistanciaRecorridaHistoricoComponent]
    });
    fixture = TestBed.createComponent(DistanciaRecorridaHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
