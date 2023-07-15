import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-distancia-recorrida-historico',
  templateUrl: './distancia-recorrida-historico.component.html',
  styleUrls: ['./distancia-recorrida-historico.component.scss'],
})
export class DistanciaRecorridaHistoricoComponent implements OnInit {
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
      mes: 'January',
      promedio_distancia: 25448.558035714285,
    },
    {
      mes: 'February',
      promedio_distancia: 33096.25257731959,
    },
    {
      mes: 'March',
      promedio_distancia: 23112.536813922356,
    },
    {
      mes: 'April',
      promedio_distancia: 24972.521140609637,
    },
    {
      mes: 'May',
      promedio_distancia: 28559.572953736655,
    },
    {
      mes: 'June',
      promedio_distancia: 25225.748064743138,
    },
    {
      mes: 'July',
      promedio_distancia: 22956.214405360133,
    },
    {
      mes: 'August',
      promedio_distancia: 28847.939124920735,
    },
    {
      mes: 'September',
      promedio_distancia: 24017.631168831169,
    },
    {
      mes: 'October',
      promedio_distancia: 28058.388566694283,
    },
    {
      mes: 'November',
      promedio_distancia: 33341.176397515526,
    },
    {
      mes: 'December',
      promedio_distancia: 28521.39247943596,
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
        type: 'value',
      },
      series: [
        {
          data: this.data.map((item) => item.promedio_distancia),
          type: 'line',
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
