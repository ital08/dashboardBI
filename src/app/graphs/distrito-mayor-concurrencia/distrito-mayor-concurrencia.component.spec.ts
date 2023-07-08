import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistritoMayorConcurrenciaComponent } from './distrito-mayor-concurrencia.component';

describe('DistritoMayorConcurrenciaComponent', () => {
  let component: DistritoMayorConcurrenciaComponent;
  let fixture: ComponentFixture<DistritoMayorConcurrenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistritoMayorConcurrenciaComponent]
    });
    fixture = TestBed.createComponent(DistritoMayorConcurrenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
