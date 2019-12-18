import { Component, OnInit } from '@angular/core'
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { AplicacionService } from '../../services/aplicacion.service';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  flag = 0;
  mensaje;
  cargando = true;
  usuarios: Usuario[] = [];
  usuario: Usuario = {};
  terminales;
  constructor(private userService: UserService,
              private aplicacionService:AplicacionService) { }

  async ngOnInit() {
    this.cargando = true;
    this.terminales = this.aplicacionService.getTemrinales();
    this.userService.listar().subscribe( resp => {
      this.usuarios = resp['usuarios'];
      this.cargando = false;
    });
  }

  async editarUsuario(fEditar: NgForm) {
    if ( fEditar.invalid) {
      this.flag = 3;
      return false;
    }
    const regex = /(\d+)/g;
    this.usuario.rut = this.usuario.rut.match(regex).join('');
    this.cargando = true;
    const body = {...this.usuario};
    const editado = await this.userService.editar(body);
    if (editado) {
      this.flag = 1;
      this.ngOnInit();
    } else {
      this.cargando = false;
      this.flag = 2;
    }
  }

  cambiar() {
    this.usuarios.forEach( usuario => {
      if (usuario.rut === this.usuario.rut) {
        this.usuario = usuario;
        this.usuario.password = undefined;
        return this.ngOnInit();
      }
    });
  }

}
