import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import * as moment from 'moment';
import { DialogConfirmComponent } from '../../component/dialog-confirm/dialog-confirm.component';
import { AuthService } from '../../services/auth.service';
import { AplicacionService } from 'src/app/services/aplicacion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reparacion',
  templateUrl: './reparacion.component.html',
  styleUrls: ['./reparacion.component.css']
})
export class ReparacionComponent implements OnInit {
  reparaciones: any[] = [];
  campos: string[] = [];
  fechaMin: Date ;
  fechaMax: Date ;
  reparacionTemp: any[] = [];
  cargando = false;
  checkBox: boolean[] = [];
  checkAll = false;
  terminales;
  terminal = null;
  categoria;


  constructor( public dataService: DataService,
               public dialog: MatDialog,
               public authService: AuthService,
               private activatedRoute: ActivatedRoute,
               private aplicacionService: AplicacionService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      this.categoria = params.categoria;
      this.reparaciones = [];
      this.cargando = true;
      this.campos = [ 'fecha', 'hora', 'contenedor' ];
      this.dataService.getElemet('reparacion', this.terminal).subscribe( resp => {
        if ( resp['ok']) {
          for (const r of resp['campos']) {
            this.campos.push(r.nombre);
          }
        }
        this.dataService.getReparacion(this.categoria, this.terminal).subscribe(respuesta => {
          // tslint:disable-next-line: no-string-literal
          if ( respuesta['reparacion']) { this.reparaciones = respuesta['reparacion']; } else { this.reparaciones = []; }
          // tslint:disable-next-line: no-string-literal
          if ( respuesta['reparacion']) { this.reparacionTemp = respuesta['reparacion']; } else { this.reparacionTemp = []; }
          this.cargando = false;
        });
      });
      this.terminales = this.aplicacionService.getTemrinales();
    });
  }

  filtrarFecha() {
    this.checkBox = [];
    this.checkAll = false;
    this.reparaciones = this.reparacionTemp;
    if (this.fechaMin + '' === '') {
      this.fechaMin = undefined;
    }
    if (this.fechaMax + '' === '') {
      this.fechaMax = undefined;
    }
    if (this.fechaMin === undefined && this.fechaMax === undefined) {
      return;
    }
    if (this.fechaMax === undefined) {
      this.reparaciones = this.reparaciones.filter((item: any) => {
        return moment(item.created).format('YYYY-MM-DD') >= moment(this.fechaMin).format('YYYY-MM-DD');
      });
      return;
    }
    if (this.fechaMin === undefined) {
      this.reparaciones = this.reparaciones.filter((item: any) => {
        return moment(item.created).format('YYYY-MM-DD') <= moment(this.fechaMax).format('YYYY-MM-DD') ;
      });
      return;
    }
    this.reparaciones = this.reparaciones.filter((item: any) => {
      return moment(item.created).format('YYYY-MM-DD') >= moment(this.fechaMin).format('YYYY-MM-DD') &&
             moment(item.created).format('YYYY-MM-DD') <= moment(this.fechaMax).format('YYYY-MM-DD') ;
    });
  }

  copiar() {
    const table = document.querySelector('#tabla1');
    const range  =  document.createRange();
    range.selectNodeContents(table);
    const select =  window.getSelection();
    select.removeAllRanges();
    select.addRange(range);
    document.execCommand('copy');
  }

  borrar() {
    let borrar = 0;
    const ids = [];
    for ( let i = 0; i < this.checkBox.length; i++) {
      if ( this.checkBox[i] ) {
        borrar++;
        ids.push(this.reparaciones[i]);
      }
    }
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '275px',
      data: `Desea eliminar estos ${borrar} elementos`
    });
    dialogRef.afterClosed().subscribe( resp => {
      if (resp) {
        this.dataService.deleteReparacion(ids).subscribe( res => {
          this.ngOnInit();
        });
      }
    });
  }

  cambio() {
    this.checkBox = [];
    this.reparaciones.forEach( () => {
      this.checkBox.push(!this.checkAll);
    });
  }
}
