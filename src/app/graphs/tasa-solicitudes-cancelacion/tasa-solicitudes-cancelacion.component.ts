import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-tasa-solicitudes-cancelacion',
  templateUrl: './tasa-solicitudes-cancelacion.component.html',
  styleUrls: ['./tasa-solicitudes-cancelacion.component.scss'],
})
export class TasaSolicitudesCancelacionComponent implements OnInit {
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
    // {
    //   name: 'Finalizado',
    //   value: 17417,
    // },
    // {
    //   name: 'No se presento el chofer',
    //   value: 1145,
    // },
    {
      name: 'Cancelado por pasajero',
      value: 3976,
    },
    {
      name: 'Cancelado por conductor',
      value: 292,
    },
    // {
    //   name: 'Falla o error',
    //   value: 249,
    // },
    // {
    //   name: 'No se presento el pasajero',
    //   value: 20,
    // },
    // {
    //   name: 'Error de calculo',
    //   value: 12,
    // },
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

  private generateData(geoJson: any): Array<any> {
    return geoJson.features.map((feature: any) => {
      return {
        code: feature.properties.id,
        name: feature.properties.label,
        value: this.generateRandomBetween(800, 50000),
        selected: this.ctprvn != '0' && feature.properties.code == this.sig,
      };
    });
  }

  private generateNameMap(geoJson: any): any {
    let nameMap: any = {};
    geoJson.features.forEach((feature: any) => {
      nameMap[feature.properties?.name] = feature.properties.label;
    });

    return nameMap;
  }

  private generateRandomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  renderMap() {
    this.isLoading = true;
    const geoJsonPath = 'assets/lima_callao_distritos.geojson';

    fetch(geoJsonPath)
      .then((response) => response.json())
      .then((geoJson) => {
        this.data = this.data.sort((a, b) => a.value - b.value);
        this.setSelectItems(geoJson);
        this.mayorConcurrencia = this.data[this.data.length - 1];
        const total = ((this.cancelado * 100) / this.total).toFixed(2);
        this.mapOptions = {
          series: [
            {
              type: 'gauge',
              progress: {
                show: false,
                color: ['#008000'],
                width: 18,
              },
              axisLine: {
                lineStyle: {
                  color: [
                    [0.2, '#008000'],
                    [0.8, '#FFA500'],
                    [1, '#ff0000'],
                  ],
                  width: 30,
                },
              },
              axisTick: {
                show: false,
                color: '#008000',
                itemStyle: {
                  borderWidth: 10,
                  color: '#008000',
                },
              },
              splitLine: {
                length: 15,
                color: '#008000',
                lineStyle: {
                  width: 2,
                  color: '#008000',
                },
                show: false,
              },
              axisLabel: {
                distance: 25,
                color: '#008000',
                fontSize: 20,
                show: false,
                lineStyle: {
                  width: 2,
                  color: '#008000',
                },
                itemStyle: {
                  borderWidth: 10,
                  color: '#008000',
                },
              },
              anchor: {
                show: false,
                showAbove: true,
                size: 25,
                color: '#008000',
                itemStyle: {
                  borderWidth: 10,
                  color: '#008000',
                },
              },
              title: {
                show: false,
              },
              detail: {
                valueAnimation: true,
                fontSize: 20,
                color: '#008000',
                offsetCenter: [0, '70%'],
              },
              pointer: {
                itemStyle: {
                  color: '#008000', // Cambia el color de la flecha aquí
                },
              },
              data: [
                {
                  value: total,
                },
              ],
            },
          ],
        };

        this.barOption = {
          tooltip: {
            trigger: 'item',
          },
          legend: {
            show: false,
          },
          series: [
            {
              type: 'pie',
              // selectedMode: 'single',
              // radius: [0, '100%'],
              // label: {
              //   position: 'inner',
              //   fontSize: 14,
              //   formatter(param: any) {
              //     console.log(param);
              //     // correct the percentage
              //     return param.data.name + ' (' + param.data.value + ')';
              //   },
              // },
              // labelLine: {
              //   show: false,
              // },
              data: this.data,
            },
          ],
        };

        this.isLoading = false;
        this.chartOptions = cloneDeep(this.mapOptions);

        setInterval(() => {
          if (this.type === 'map') {
            this.chartOptions = cloneDeep(this.barOption);
            this.type = 'bar';
          } else {
            this.chartOptions = cloneDeep(this.mapOptions);
            this.type = 'map';
          }
        }, 5000);
      });
  }
  barOption: any;

  setSelectItems(geoJson: any): void {
    let items = geoJson.features.map((feature: any) => {
      return { name: feature.properties.label, value: feature.properties.code };
    });
  }
}
