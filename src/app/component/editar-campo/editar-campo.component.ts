import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Accion } from '../../interfaces/accion';
import { AplicacionService } from '../../services/aplicacion.service';
import { CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Campo } from 'src/app/interfaces/campos';

@Component({
  selector: 'app-editar-campo',
  templateUrl: './editar-campo.component.html',
  styleUrls: ['./editar-campo.component.css']
})
export class EditarCampoComponent implements OnInit {
  @Input() accion: Accion;
  @Input() seccion;
  campo: any[] = [];
  campoo: Campo;
  campoAux: Campo;
  // campoAux: any[] = [];
  idx: number;
  seleccionable = false;
  newCampo = '';
  flag = 0;
  cargando = false;
  newOpt: string[] = new Array();

  constructor(private dataSevice: DataService,
              private aplicacionService: AplicacionService ) { }

  ngOnInit() {
    this.cargando = true;
    this.dataSevice.getElemet(this.accion.seccion, this.accion.terminal).subscribe(resp => {
      // let i = 0;
      // for (const r of resp) {
      for (const r of resp['campos']) {
        // if (r[0] === this.accion.campo) {
        //   this.campo = r;
        //   this.idx = i;
        //   Object.assign(this.campoAux, r);
        // }
        // i++;
        if (r.nombre === this.accion.campo) {
          this.campoo = r;
          this.campoAux = r;
        }
        this.cargando = false;
      }
    });
  }

  agregar() {
    if (!this.newCampo) {
      return;
    }
    if (this.campoo.campos) {
      this.campoo.campos.push(this.newCampo);
      this.newCampo = '';
    } else {
      this.newOpt.push(this.newCampo);
      this.campoo.campos = this.newOpt;
      this.newCampo = '';
    }
    // if (this.campoAux[2]) {
    //   this.campo[4].push(this.newCampo);
    //   this.newCampo = '';
    // } else {
    //   this.newOpt.push(this.newCampo);
    //   this.campo[4] = this.newOpt;
    //   this.newCampo = '';
    // }
  }

  borrar( name: string) {
    // tslint:disable-next-line: prefer-const
    let campoArr: string[] = [];
    // for ( const s of this.campo[4]) {
    for ( const s of this.campoo.campos) {
      if (s !== name) {
        campoArr.push(s);
      }
    }
    this.campoo.campos = campoArr;
    // this.campo[4] = campoArr;
  }

  async enviar() {
    this.cargando = true;
    if (this.campo[2]) {
      this.seleccionable = true;
    }
    const data = { ...this.campoo };
    const resp = await this.aplicacionService.editarCampoo(data);
    // const resp = await this.aplicacionService.editarCampo(data, `${this.accion.seccion}.json`, this.idx);
    this.cargando = false;
    if ( resp ) {
      this.flag = 1;
    } else {
      this.flag = 2;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.campo[4], event.previousIndex, event.currentIndex);
  }

}
