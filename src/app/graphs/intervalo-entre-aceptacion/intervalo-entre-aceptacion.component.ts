import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-intervalo-entre-aceptacion',
  templateUrl: './intervalo-entre-aceptacion.component.html',
  styleUrls: ['./intervalo-entre-aceptacion.component.scss'],
})
export class IntervaloEntreAceptacionComponent {
  @ViewChild('chart', { static: true }) chart!: ElementRef;
  type = 'map';
  chartInstance: any;
  mapOptions?: any;
  chartOptions?: any;
  isLoading = true;
  down = false;
  mayorConcurrencia?: any;

  data: any = {
    average_interval: 23.46,
  };

  ctprvnList = [];
  sigList: any[] = [];
  showBorough = false;

  ctprvn = '0';
  sig?: any;

  constructor() {}
}
