import { PlatformLocation } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import { HttpClient } from '@angular/common/http';
import * as echarts from 'echarts';

import { clone, cloneDeep } from 'lodash';
@Component({
  selector: 'app-distrito-mayor-concurrencia',
  templateUrl: './distrito-mayor-concurrencia.component.html',
  styleUrls: ['./distrito-mayor-concurrencia.component.scss'],
})
export class DistritoMayorConcurrenciaComponent implements OnInit {
  @ViewChild('chart', { static: true }) chart!: ElementRef;
  type = 'map';
  chartInstance: any;
  mapOptions?: any;
  chartOptions?: any;
  isLoading = true;
  down = false;
  mayorConcurrencia?: any;
  data = [
    {
      name: 'BARRANCO',
      value: 674,
    },
    {
      name: 'SANTIAGO DE SURCO',
      value: 5304,
    },
    {
      name: 'MIRAFLORES',
      value: 5095,
    },
    {
      name: 'LA MOLINA',
      value: 1031,
    },
    {
      name: 'CALLAO',
      value: 949,
    },
    {
      name: 'SAN BORJA',
      value: 1323,
    },
    {
      name: 'SAN ISIDRO',
      value: 5793,
    },
    {
      name: 'LA VICTORIA',
      value: 366,
    },
    {
      name: 'JESUS MARIA',
      value: 433,
    },
    {
      name: 'LIMA',
      value: 578,
    },
    {
      name: 'SAN JUAN DE LURIGANCHO',
      value: 123,
    },
    {
      name: 'SAN MIGUEL',
      value: 260,
    },
    {
      name: 'ATE',
      value: 236,
    },
    {
      name: 'CHORRILLOS',
      value: 293,
    },
    {
      name: 'BELLAVISTA',
      value: 118,
    },
    {
      name: 'BREÑA',
      value: 141,
    },
    {
      name: 'NINGUNO',
      value: 143,
    },
    {
      name: 'SURQUILLO',
      value: 1151,
    },
    {
      name: 'MAGDALENA DEL MAR',
      value: 225,
    },
    {
      name: 'LOS OLIVOS',
      value: 112,
    },
    {
      name: 'LINCE',
      value: 268,
    },
    {
      name: 'LURIGANCHO',
      value: 94,
    },
    {
      name: 'SAN LUIS',
      value: 87,
    },
    {
      name: 'PUEBLO LIBRE',
      value: 168,
    },
    {
      name: 'PUNTA NEGRA',
      value: 73,
    },
    {
      name: 'PUCUSANA',
      value: 24,
    },
    {
      name: 'CARABAYLLO',
      value: 54,
    },
    {
      name: 'CIENEGUILLA',
      value: 153,
    },
    {
      name: 'ANCON',
      value: 57,
    },
    {
      name: 'SANTA ROSA',
      value: 53,
    },
    {
      name: 'SAN JUAN DE MIRAFLORES',
      value: 157,
    },
    {
      name: 'PUNTA HERMOSA',
      value: 86,
    },
    {
      name: 'RIMAC',
      value: 109,
    },
    {
      name: 'SANTA ANITA',
      value: 129,
    },
    {
      name: 'PUENTE PIEDRA',
      value: 51,
    },
    {
      name: 'LA PUNTA',
      value: 88,
    },
    {
      name: 'SAN MARTIN DE PORRES',
      value: 176,
    },
    {
      name: 'LURIN',
      value: 68,
    },
    {
      name: 'VENTANILLA',
      value: 81,
    },
    {
      name: 'CARMEN DE LA LEGUA REYNOSO',
      value: 97,
    },
    {
      name: 'PACHACAMAC',
      value: 111,
    },
    {
      name: 'VILLA MARIA DEL TRIUNFO',
      value: 139,
    },
    {
      name: 'INDEPENDENCIA',
      value: 111,
    },
    {
      name: 'LA PERLA',
      value: 121,
    },
    {
      name: 'VILLA EL SALVADOR',
      value: 127,
    },
    {
      name: 'CHACLACAYO',
      value: 106,
    },
    {
      name: 'COMAS',
      value: 109,
    },
    {
      name: 'SAN BARTOLO',
      value: 77,
    },
    {
      name: 'EL AGUSTINO',
      value: 98,
    },
    {
      name: 'SANTA MARIA DEL MAR',
      value: 95,
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
        echarts.registerMap('LIMA', geoJson);

        this.chartInstance = echarts.init(this.chart.nativeElement);
        this.mayorConcurrencia = this.data[this.data.length - 1];
        this.mapOptions = {
          tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>{c}',
          },
          visualMap: {
            realtime: false,
            calculable: true,
            inRange: {
              color: ['#FFFF00', '#FF0000'],
            },
          },
          series: [
            {
              type: 'map',
              mapType: 'LIMA',
              roam: true,
              selectedMode: 'single',
              scaleLimit: {
                min: 0,
                max: 100,
              },
              itemStyle: {
                normal: {
                  borderColor: 'rgba(0, 0, 0, 0.2)',
                },
                emphasis: {
                  areaColor: 'yellow',
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  shadowBlur: 20,
                  borderWidth: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
              data: this.data,
              nameMap: this.generateNameMap(geoJson),
              animation: true,
              animationDurationUpdate: 1000,
              animationEasingUpdate: 'linear',
            },
          ],
        };
        this.barOption = {
          xAxis: {
            type: 'value',
          },
          yAxis: {
            type: 'category',
            axisLabel: {
              rotate: 10,
              margin: 1, // Ajusta el margen izquierdo y derecho de las etiquetas
            },
            data: this.data.map(function (item: any) {
              return item.name;
            }),
          },
          animationDurationUpdate: 1000,
          series: {
            type: 'bar',
            id: 'population',
            data: this.data.map(function (item: any) {
              return item.value;
            }),
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#FF0000' }, // Color inicial
                { offset: 1, color: '#FFFF00' }, // Color final
              ]),
            },
            universalTransition: true,
          },
          legend: {
            textStyle: {
              fontSize: 10, // Ajusta el tamaño de la fuente de las etiquetas de la leyenda
            },
          },
        };

        this.isLoading = false;
        this.chartOptions = cloneDeep(this.mapOptions);
        this.chartInstance.setOption(this.chartOptions);

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
  barOption = {};

  setSelectItems(geoJson: any): void {
    let items = geoJson.features.map((feature: any) => {
      return { name: feature.properties.label, value: feature.properties.code };
    });
  }
}
