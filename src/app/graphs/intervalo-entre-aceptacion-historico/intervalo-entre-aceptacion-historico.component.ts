import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { cloneDeep } from 'lodash';
@Component({
  selector: 'app-intervalo-entre-aceptacion-historico',
  templateUrl: './intervalo-entre-aceptacion-historico.component.html',
  styleUrls: ['./intervalo-entre-aceptacion-historico.component.scss'],
})
export class IntervaloEntreAceptacionHistoricoComponent implements OnInit {
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
    { mes: '01', valor: 27.62 },
    { mes: '02', valor: 22.44 },
    { mes: '03', valor: 25.25 },
    { mes: '04', valor: 29.85 },
    { mes: '05', valor: 28.17 },
    { mes: '06', valor: 22.25 },
    { mes: '07', valor: 29.49 },
    { mes: '08', valor: 21.05 },
    { mes: '09', valor: 16.63 },
    { mes: '10', valor: 13.78 },
    { mes: '11', valor: 24.3 },
    { mes: '12', valor: 23.46 },
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
            lte: 5,
            color: '#93CE07',
          },
          {
            gt: 5,
            lte: 15,
            color: '#FBDB0F',
          },
          {
            gt: 15,
            lte: 32,
            color: '#FC7D02',
          },
          {
            gt: 35,
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
          data: this.data.map((item) => item.valor),
          type: 'line',
          label: {
            show: true,
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
