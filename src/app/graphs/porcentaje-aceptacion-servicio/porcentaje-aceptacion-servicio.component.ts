import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-porcentaje-aceptacion-servicio',
  templateUrl: './porcentaje-aceptacion-servicio.component.html',
  styleUrls: ['./porcentaje-aceptacion-servicio.component.scss'],
})
export class PorcentajeAceptacionServicioComponent {
  @ViewChild('chart', { static: true }) chart!: ElementRef;
  type = 'map';
  chartInstance: any;
  mapOptions?: any;
  chartOptions?: any;
  isLoading = true;
  down = false;
  mayorConcurrencia?: any;

  data: any = {
    overall_average_interval: 14.69,
  };

  ctprvnList = [];
  sigList: any[] = [];
  showBorough = false;

  ctprvn = '0';
  sig?: any;

  constructor() {}
}
