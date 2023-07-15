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
import { DistanciaRecorridaComponent } from './graphs/distancia-recorrida/distancia-recorrida.component';
import { DistanciaRecorridaHistoricoComponent } from './graphs/distancia-recorrida-historico/distancia-recorrida-historico.component';
import { IntervaloEntreAceptacionHistoricoComponent } from './graphs/intervalo-entre-aceptacion-historico/intervalo-entre-aceptacion-historico.component';
import { PorcentajeAceptacionServicioHistoricoComponent } from './graphs/porcentaje-aceptacion-servicio-historico/porcentaje-aceptacion-servicio-historico.component';
import { TasaSolicitudesCancelacionHistoricoComponent } from './graphs/tasa-solicitudes-cancelacion-historico/tasa-solicitudes-cancelacion-historico.component';

@NgModule({
  declarations: [
    AppComponent,
    DistritoMayorConcurrenciaComponent,
    PorcentajeAceptacionServicioComponent,
    IntervaloEntreAceptacionComponent,
    TasaSolicitudesCancelacionComponent,
    DistanciaRecorridaComponent,
    DistanciaRecorridaHistoricoComponent,
    IntervaloEntreAceptacionHistoricoComponent,
    PorcentajeAceptacionServicioHistoricoComponent,
    TasaSolicitudesCancelacionHistoricoComponent,
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
