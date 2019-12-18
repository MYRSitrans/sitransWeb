import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AplicacionService } from '../../services/aplicacion.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuario;
  flag = 0;
  terminales;
  cargando = false;

  constructor(private userService: UserService,
              private aplicacionService: AplicacionService) { }

  ngOnInit() {
    this.usuario = {nombre: '', rut: '', password: '', terminal: '', webAcces: false};
    this.terminales = this.aplicacionService.getTemrinales();
  }

  async registro( fRegistro: NgForm) {
    if ( fRegistro.invalid) {
      this.flag = 3;
      return false;
    }
    this.cargando = true;
    const regex = /(\d+)/g;
    this.usuario.rut = this.usuario.rut.match(regex).join('');
    const body = {...this.usuario};
    const registado = await this.userService.registar(body);
    this.cargando = false;
    if (registado) {
      this.flag = 1;
    } else {
      this.flag = 2;
    }
  }
}
