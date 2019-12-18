import { Component, OnInit } from '@angular/core';
import { BuscarService } from 'src/app/services/buscar.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  data: any[] = [];
  buscado;
  dataTemp;
  navegation: string[] = [''];
  nombres: string[] = ['Terminal'];
  cargando = false;

  constructor( private buscarService: BuscarService) { }

  ngOnInit() {
    this.nav();
  }

  buscar( ) {
    const valor = this.buscado;

    this.data = this.dataTemp;
    if ( valor.length === 0 ) {
      return;
    }
    this.data = this.data.filter(currentGoal => {
      if (currentGoal && valor) {
        return (currentGoal.toLowerCase().indexOf(valor.toLowerCase()) > -1);
      }
    });
  }

  click(prefix) {
    if ( this.navegation.length === 0 ) {
      this.navegation.push(`${prefix}/`);
    } else {
      this.navegation.push(`${this.navegation[this.navegation.length - 1]}${prefix}/`);
    }
    this.nombres.push(prefix);
    this.nav();

  }

  navegar(idx: number) {
    this.navegation.splice(idx + 1);
    this.nombres.splice(idx + 1);
    this.nav();
  }

  nav() {
    this.cargando = true;
    this.buscarService.buscar(this.navegation[this.navegation.length - 1]).subscribe( resp => {
      this.data = resp['fileNames'];
      this.dataTemp = resp['fileNames'];
      this.cargando = false;
    });
  }

}
