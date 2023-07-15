import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-distancia-recorrida',
  templateUrl: './distancia-recorrida.component.html',
  styleUrls: ['./distancia-recorrida.component.scss'],
})
export class DistanciaRecorridaComponent {
  @ViewChild('chart', { static: true }) chart!: ElementRef;
  type = 'map';
  chartInstance: any;
  mapOptions?: any;
  chartOptions?: any;
  isLoading = true;
  down = false;
  mayorConcurrencia?: any;

  data: any = {
    average_interval: 18.521,
  };

  ctprvnList = [];
  sigList: any[] = [];
  showBorough = false;

  ctprvn = '0';
  sig?: any;

  constructor() {}
}
