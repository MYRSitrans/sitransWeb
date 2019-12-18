import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { DialogConfirmComponent } from '../../component/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css']
})
export class EliminarUsuarioComponent implements OnInit {
  rut: string;
  nombre: string;
  password: string;
  terminal: string;
  id: string;
  flag = 0;
  mensaje;
  cargando;
  usuarios: any[] = [];
  constructor(private userService: UserService,
              public dialog: MatDialog) { }

  async ngOnInit() {
    this.cargando = true;
    await this.userService.listar().subscribe( resp => {
      this.usuarios = resp['usuarios'];
      this.cargando = false;
    });
  }

  async eliminarUsuario(fEditar: NgForm) {
    if ( !this.id) {
      return;
    }
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '275px',
      data: `Desea eliminar usuario`
    });
    dialogRef.afterClosed().subscribe( async resp => {
      this.cargando = true;
      if (resp) {
        const editado = await this.userService.eliminar(this.id);
        if (editado) {
          this.rut = undefined;
          this.id = undefined;
          this.ngOnInit();
          this.flag = 1;
        } else {
          if (!this.id) {
            this.flag = 2;
          }
          this.cargando = false;
        }
      }
      });
  }

  cambiar() {
    this.usuarios.forEach( usuario => {
      if (usuario.rut === this.rut) {
        this.id = usuario._id;
        this.nombre = usuario.nombre;
        this.terminal = usuario.terminal;
      }
    });
  }
}
