import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Accion } from '../../interfaces/accion';

@Component({
  selector: 'app-sel-campo',
  templateUrl: './sel-campo.component.html',
  styleUrls: ['./sel-campo.component.css']
})
export class SelCampoComponent implements OnInit {
  @Input() accion: Accion;
  @Output() accionOut: EventEmitter<Accion>;
  a: Accion = {accion: '', flag: false};
  campos: string[] = [];
  selecCampo: string;
  flag = false;
  cargando = false;
  constructor(private dataService: DataService) {
    this.accionOut = new EventEmitter();
  }

  async ngOnInit() {
    this.cargando = true;
    await this.dataService.getElemet(this.accion.seccion, this.accion.terminal).subscribe(resp => {
      // tslint:disable-next-line: no-string-literal
      if (resp['ok']) {
        // tslint:disable-next-line: no-string-literal
        this.campos = resp['campos'];
      }
      this.cargando = false;
    });
  }

  enviar(s: string) {
    this.a.accion = s;
    this.a.seccion = this.accion.seccion;
    this.a.terminal = this.accion.terminal;
    this.flag = false;
    this.accionOut.emit(this.a);
  }

  enviarSelect() {
    this.a.flag = !this.a.flag;
    this.a.accion = 'edit';
    this.a.campo = this.selecCampo;
    this.a.seccion = this.accion.seccion;
    this.a.terminal = this.accion.terminal;
    this.accionOut.emit(this.a);
  }

}
