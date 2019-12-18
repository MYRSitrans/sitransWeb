import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LavadoComponent } from './pages/lavado/lavado.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { AplicacionComponent } from './pages/aplicacion/aplicacion.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { AdminGuard } from './guards/admin.guard';
import { ReparacionComponent } from './pages/reparacion/reparacion.component';


const routes: Routes =
[{ path: 'inicio', component: InicioComponent},
{ path: 'lavado', component: LavadoComponent, canActivate: [ AuthGuard ]},
{ path: 'buscar', component: BuscarComponent, canActivate: [ AuthGuard ]},
{ path: 'aplicacion', component: AplicacionComponent, canActivate: [ AdminGuard ]},
{ path: 'reparacion/:categoria', component: ReparacionComponent, canActivate: [ AdminGuard ]},
{ path: '**', component: HomeComponent, canActivate: [ AuthGuard ]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
