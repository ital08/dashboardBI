import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervaloEntreAceptacionHistoricoComponent } from './intervalo-entre-aceptacion-historico.component';

describe('IntervaloEntreAceptacionHistoricoComponent', () => {
  let component: IntervaloEntreAceptacionHistoricoComponent;
  let fixture: ComponentFixture<IntervaloEntreAceptacionHistoricoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntervaloEntreAceptacionHistoricoComponent]
    });
    fixture = TestBed.createComponent(IntervaloEntreAceptacionHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
