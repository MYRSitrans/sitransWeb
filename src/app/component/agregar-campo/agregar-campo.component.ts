import { Component, OnInit, Input } from '@angular/core';
import { AplicacionService } from '../../services/aplicacion.service';
import { FormControl, Validators } from '@angular/forms';
import { Accion } from '../../interfaces/accion';
import { Campo } from 'src/app/interfaces/campos';

@Component({
  selector: 'app-agregar-campo',
  templateUrl: './agregar-campo.component.html',
  styleUrls: ['./agregar-campo.component.css']
})
export class AgregarCampoComponent implements OnInit {
  @Input() seccion: Accion;
  campo: any[] = [];
  campoo: Campo;
  newCampo = '';
  flag = 0;
  cargando = false;
  seleccionable: boolean;

  constructor( private aplicacionService: AplicacionService) { }

  ngOnInit() {
    this.seleccionable = false;
    this.campoo = { nombre: '', categoria: this.seccion.seccion, terminal: this.seccion.terminal };
    this.campoo.campos = new Array();
    // this.campo[0] = '';
    // this.campo[1] = false;
    // this.campo[2] = false;
    // this.campo[3] = false;
    // this.campo[4] = new Array();
  }

  agregar() {
    // this.seleccionable = false;
    // if (this.campo[2]) {
    //   this.campo[4].push(this.newCampo);
    //   this.newCampo = '';
    // }
    this.seleccionable = false;
    if (this.campoo.seleccionable) {
      this.campoo.campos.push(this.newCampo);
      this.newCampo = '';
    }
  }

  borrar( name: string) {
    const campoArr: string[] = [];
    for ( const s of this.campoo.campos) {
      if (s !== name) {
        campoArr.push(s);
      }
    }
    this.campoo.campos = campoArr;
    // const campoArr: string[] = [];
    // for ( const s of this.campo[4]) {
    //   if (s !== name) {
    //     campoArr.push(s);
    //   }
    // }
    // this.campo[4] = campoArr;
  }

  async enviar( f ) {
    if (f.invalid) {
      return;
    }
    if ( this.campoo.seleccionable && !(this.campoo.campos.length > 0)) {
      return this.seleccionable = true;
    }
    this.cargando = true;
    const data = { ...this.campoo };
    const resp = await this.aplicacionService.agregarCampoo(data);
    this.cargando = false;
    if (resp) {
      this.flag = 1;
      this.ngOnInit();
    } else {
      this.flag = 2;
    }
    // this.cargando = true;
    // if ( this.campo[2] && this.campo[4][0] === undefined) {
    //   this.seleccionable = true;
    // }
    // const data = { data: this.campo, terminal: this.seccion.terminal };
    // const resp = await this.aplicacionService.agregarCampo(data, `${this.seccion.seccion}.json`, this.seccion.terminal);
    // this.cargando = false;
    // if (resp) {
    //   this.flag = 1;
    //   this.ngOnInit();
    // } else {
    //   this.flag = 2;
    // }
  }

}
