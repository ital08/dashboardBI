import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-tasa-solicitudes-cancelacion-historico',
  templateUrl: './tasa-solicitudes-cancelacion-historico.component.html',
  styleUrls: ['./tasa-solicitudes-cancelacion-historico.component.scss'],
})
export class TasaSolicitudesCancelacionHistoricoComponent implements OnInit {
  @ViewChild('chart', { static: true }) chart!: ElementRef;
  type = 'map';
  chartInstance: any;
  mapOptions?: any;
  chartOptions?: any;
  isLoading = true;
  down = false;
  mayorConcurrencia?: any;
  total = 23110;
  cancelado = 4268;
  data = [
    { month: '01', cancellation_rate: 18.43, total_trips: 575 },
    { month: '02', cancellation_rate: 18.31, total_trips: 770 },
    { month: '03', cancellation_rate: 19.68, total_trips: 986 },
    { month: '04', cancellation_rate: 21.75, total_trips: 1448 },
    { month: '05', cancellation_rate: 23.66, total_trips: 1585 },
    { month: '06', cancellation_rate: 21.66, total_trips: 1939 },
    { month: '07', cancellation_rate: 16.89, total_trips: 1516 },
    { month: '08', cancellation_rate: 18.68, total_trips: 2120 },
    { month: '09', cancellation_rate: 18.78, total_trips: 2598 },
    { month: '10', cancellation_rate: 16.91, total_trips: 3240 },
    { month: '11', cancellation_rate: 15.76, total_trips: 3021 },
    { month: '12', cancellation_rate: 16.69, total_trips: 3313 },
  ];

  ctprvnList = [];
  sigList: any[] = [];
  showBorough = false;

  ctprvn = '0';
  sig?: any;

  constructor() {}

  ngOnInit() {
    this.renderMap();
  }

  renderMap() {
    this.isLoading = true;

    this.mapOptions = {
      xAxis: {
        type: 'category',
        data: [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre',
        ],
      },
      visualMap: {
        top: 50,
        right: 10,
        pieces: [
          {
            gt: 0,
            lte: 12,
            color: '#93CE07',
          },
          {
            gt: 12,
            lte: 26,
            color: '#FBDB0F',
          },
          {
            gt: 26,
            lte: 37,
            color: '#FC7D02',
          },
          {
            gt: 37,
            lte: 100,
            color: '#FD0100',
          },
        ],
        outOfRange: {
          color: '#999',
        },
      },
      yAxis: {
        max: 100,
        min: 0,
        type: 'value',
      },
      series: [
        {
          data: this.data.map((item) => item.cancellation_rate),
          type: 'line',
          label: {
            show: true,
            formatter: '{c}%', // Formato del valor del data label
            position: 'top', // Posición del data label (puedes ajustarla según tus preferencias)
          },
        },
      ],
    };

    this.isLoading = false;
    this.chartOptions = cloneDeep(this.mapOptions);
  }

  barOption: any;

  getMonthName(month: string): string {
    const monthNumber = Number(month);
    const monthNames = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    return monthNames[monthNumber - 1];
  }
}
