import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistanciaRecorridaComponent } from './distancia-recorrida.component';

describe('DistanciaRecorridaComponent', () => {
  let component: DistanciaRecorridaComponent;
  let fixture: ComponentFixture<DistanciaRecorridaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistanciaRecorridaComponent]
    });
    fixture = TestBed.createComponent(DistanciaRecorridaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
