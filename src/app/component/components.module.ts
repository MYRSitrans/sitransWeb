import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { EditarCampoComponent } from './editar-campo/editar-campo.component';
import { SelCampoComponent } from './sel-campo/sel-campo.component';
import { FormsModule } from '@angular/forms';
import { AgregarCampoComponent } from './agregar-campo/agregar-campo.component';
import { RegistroComponent } from './registro/registro.component';
import { SelUsuarioComponent } from './sel-usuario/sel-usuario.component';
import { EliminarCampoComponent } from './eliminar-campo/eliminar-campo.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from './eliminar-usuario/eliminar-usuario.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    EditarCampoComponent,
    SelCampoComponent,
    AgregarCampoComponent,
    RegistroComponent,
    SelUsuarioComponent,
    EliminarCampoComponent,
    EditarUsuarioComponent,
    EliminarUsuarioComponent,
  ],
  exports: [
    HeaderComponent,
    EditarCampoComponent,
    SelCampoComponent,
    AgregarCampoComponent,
    RegistroComponent,
    SelUsuarioComponent,
    EliminarCampoComponent,
    EditarUsuarioComponent,
    EliminarUsuarioComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    RouterModule,
  ],
})
export class ComponentsModule { }
