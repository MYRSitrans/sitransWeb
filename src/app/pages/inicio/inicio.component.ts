import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  showAlert;
  cargando;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.cargando = false;
    this.showAlert = false;
  }

  async login( form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.cargando = true;
    const valido = await this.auth.login(this.usuario);
    if (valido) {
      this.showAlert = false;
      this.router.navigateByUrl('/');
    } else {
      this.cargando = false;
      this.showAlert = true;
    }
  }

}
