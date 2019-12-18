import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AplicacionService } from '../../services/aplicacion.service';
import { Accion } from '../../interfaces/accion';
import { Campo } from '../../interfaces/campos';

@Component({
  selector: 'app-eliminar-campo',
  templateUrl: './eliminar-campo.component.html',
  styleUrls: ['./eliminar-campo.component.css']
})
export class EliminarCampoComponent implements OnInit {
  @Input() seccion: Accion;
  idx: number;
  campos: Campo[];
  cargando;
  flag = 0;
  constructor(private dataService: DataService,
              private aplicacionService: AplicacionService) { }

  async ngOnInit() {
    this.cargando = true;
    await this.dataService.getElemet(this.seccion.seccion, this.seccion.terminal).subscribe( resp => {
      this.campos = resp['campos'];
    });
    this.cargando = false;
  }

  async eliminar(campo: Campo ) {
    // const resp = await this.aplicacionService.eliminarCampo(idx, `${this.seccion.seccion}.json`, this.seccion.terminal);
    const resp = await this.aplicacionService.eliminarCampoo(campo);
    if ( resp ) {
      this.flag = 1;
      this.campos = [];
      this.ngOnInit();
    } else {
      this.cargando = false;
      this.flag = 2;
    }
  }

}
