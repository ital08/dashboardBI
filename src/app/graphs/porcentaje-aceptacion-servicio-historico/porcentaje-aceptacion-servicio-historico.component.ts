import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-porcentaje-aceptacion-servicio-historico',
  templateUrl: './porcentaje-aceptacion-servicio-historico.component.html',
  styleUrls: ['./porcentaje-aceptacion-servicio-historico.component.scss'],
})
export class PorcentajeAceptacionServicioHistoricoComponent implements OnInit {
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
    {
      month: 'January',
      average_interval: 16.57,
    },
    {
      month: 'February',
      average_interval: 17.79,
    },
    {
      month: 'March',
      average_interval: 15.52,
    },
    {
      month: 'April',
      average_interval: 16.93,
    },
    {
      month: 'May',
      average_interval: 18.93,
    },
    {
      month: 'June',
      average_interval: 18.86,
    },
    {
      month: 'July',
      average_interval: 18.81,
    },
    {
      month: 'August',
      average_interval: 23.13,
    },
    {
      month: 'September',
      average_interval: 15.9,
    },
    {
      month: 'October',
      average_interval: 16.45,
    },
    {
      month: 'November',
      average_interval: 13.78,
    },
    {
      month: 'December',
      average_interval: 14.69,
    },
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
            lte: 10,
            color: '#93CE07',
          },
          {
            gt: 10,
            lte: 15,
            color: '#FBDB0F',
          },
          {
            gt: 15,
            lte: 25,
            color: '#FC7D02',
          },
          {
            gt: 25,
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
          data: this.data.map((item) => item.average_interval),
          type: 'line',
          label: {
            show: true,
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
