import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './component/components.module';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LavadoComponent } from './pages/lavado/lavado.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { AplicacionComponent } from './pages/aplicacion/aplicacion.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DialogConfirmComponent } from './component/dialog-confirm/dialog-confirm.component';
import { HomeComponent } from './pages/home/home.component';
import { ReparacionComponent } from './pages/reparacion/reparacion.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LavadoComponent,
    BuscarComponent,
    AplicacionComponent,
    DialogConfirmComponent,
    HomeComponent,
    ReparacionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ComponentsModule,
    RouterModule,
    MatFormFieldModule,
    MatSliderModule,
    MatDialogModule,
    MatDatepickerModule,
  ],
  exports: [],
  entryComponents : [ DialogConfirmComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
