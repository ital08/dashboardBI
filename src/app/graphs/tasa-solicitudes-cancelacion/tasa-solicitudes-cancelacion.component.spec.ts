import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasaSolicitudesCancelacionComponent } from './tasa-solicitudes-cancelacion.component';

describe('TasaSolicitudesCancelacionComponent', () => {
  let component: TasaSolicitudesCancelacionComponent;
  let fixture: ComponentFixture<TasaSolicitudesCancelacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasaSolicitudesCancelacionComponent]
    });
    fixture = TestBed.createComponent(TasaSolicitudesCancelacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
