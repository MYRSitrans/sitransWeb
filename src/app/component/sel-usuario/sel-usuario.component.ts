import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Accion } from '../../interfaces/accion';

@Component({
  selector: 'app-sel-usuario',
  templateUrl: './sel-usuario.component.html',
  styleUrls: ['./sel-usuario.component.css']
})
export class SelUsuarioComponent implements OnInit {

  @Input() accion: Accion;
  @Output() accionOut: EventEmitter<Accion>;
  a: Accion = {accion: ''};
  campos: string[] = [];
  selecCampo: string;
  flag = false;
  constructor(private dataService: DataService) {
    this.accionOut = new EventEmitter();
  }

  ngOnInit() {
  }

  enviar(s: string) {
    this.a.accion = s;
    this.a.seccion = this.accion.seccion;
    this.a.terminal = this.accion.terminal;
    this.flag = false;
    this.accionOut.emit(this.a);
  }





}
