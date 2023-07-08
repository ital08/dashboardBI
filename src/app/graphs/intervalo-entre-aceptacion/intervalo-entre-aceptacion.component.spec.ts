import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervaloEntreAceptacionComponent } from './intervalo-entre-aceptacion.component';

describe('IntervaloEntreAceptacionComponent', () => {
  let component: IntervaloEntreAceptacionComponent;
  let fixture: ComponentFixture<IntervaloEntreAceptacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntervaloEntreAceptacionComponent]
    });
    fixture = TestBed.createComponent(IntervaloEntreAceptacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
