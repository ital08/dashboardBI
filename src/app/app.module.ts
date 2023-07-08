import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DistritoMayorConcurrenciaComponent } from './graphs/distrito-mayor-concurrencia/distrito-mayor-concurrencia.component';
import { PorcentajeAceptacionServicioComponent } from './graphs/porcentaje-aceptacion-servicio/porcentaje-aceptacion-servicio.component';
import { IntervaloEntreAceptacionComponent } from './graphs/intervalo-entre-aceptacion/intervalo-entre-aceptacion.component';
import { TasaSolicitudesCancelacionComponent } from './graphs/tasa-solicitudes-cancelacion/tasa-solicitudes-cancelacion.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DistritoMayorConcurrenciaComponent,
    PorcentajeAceptacionServicioComponent,
    IntervaloEntreAceptacionComponent,
    TasaSolicitudesCancelacionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxEchartsModule.forRoot({ echarts }),
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
