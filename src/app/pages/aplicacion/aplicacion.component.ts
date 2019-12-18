import { Component, OnInit } from '@angular/core';
import { Accion } from '../../interfaces/accion';
import { AplicacionService } from '../../services/aplicacion.service';

@Component({
  selector: 'app-aplicacion',
  templateUrl: './aplicacion.component.html',
  styleUrls: ['./aplicacion.component.css']
})
export class AplicacionComponent implements OnInit {
  seleccion: Accion = { accion: ''};
  terminales;
  flag = true;
  constructor(private aplicacionService: AplicacionService) {
  }

  ngOnInit() {
    this.seleccion.seccion = 'lavado';
    this.terminales = this.aplicacionService.getTemrinales();
    this.seleccion.terminal = 'Valparaiso';
  }

  onChange() {
    this.flag = !this.flag;
    this.seleccion.accion = '';
  }

  onChangeTerminal() {
    this.flag = !this.flag;
  }



}
