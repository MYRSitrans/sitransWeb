import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import * as moment from 'moment';
import { DialogConfirmComponent } from '../../component/dialog-confirm/dialog-confirm.component';
import { AuthService } from '../../services/auth.service';
import { AplicacionService } from 'src/app/services/aplicacion.service';

@Component({
  selector: 'app-lavado',
  templateUrl: './lavado.component.html',
  styles: ['./lavado.component.css']
})

export class LavadoComponent implements OnInit {
  lavados: any[] = [];
  campos: string[] = [];
  fechaMin: Date ;
  fechaMax: Date ;
  lavadosTemp: any[] = [];
  cargando = false;
  checkBox: boolean[] = [];
  checkAll = false;
  terminales;
  terminal = null;

  constructor( public dataService: DataService,
               public dialog: MatDialog,
               public authService: AuthService,
               private aplicacionService: AplicacionService) { }

  ngOnInit() {
    this.lavados = [];
    this.cargando = true;
    this.campos = [ 'fecha', 'hora', 'contenedor' ];
    this.dataService.getElemet('lavado', this.terminal).subscribe( resp => {
      if ( resp['ok']) {
        for (const r of resp['campos']) {
          this.campos.push(r.nombre);
        }
      }
      this.dataService.getLavados(this.terminal).subscribe(respuesta => {
        // tslint:disable-next-line: no-string-literal
        if ( respuesta['lavados']) { this.lavados = respuesta['lavados']; } else { this.lavados = []; }
        // tslint:disable-next-line: no-string-literal
        if ( respuesta['lavados']) { this.lavadosTemp = respuesta['lavados']; } else { this.lavadosTemp = []; }
        this.cargando = false;
      });
    });
    this.terminales = this.aplicacionService.getTemrinales();
  }

  filtrarFecha() {
    this.checkBox = [];
    this.checkAll = false;
    this.lavados = this.lavadosTemp;
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
      this.lavados = this.lavados.filter((item: any) => {
        return moment(item.created).format('YYYY-MM-DD') >= moment(this.fechaMin).format('YYYY-MM-DD');
      });
      return;
    }
    if (this.fechaMin === undefined) {
      this.lavados = this.lavados.filter((item: any) => {
        return moment(item.created).format('YYYY-MM-DD') <= moment(this.fechaMax).format('YYYY-MM-DD') ;
      });
      return;
    }
    this.lavados = this.lavados.filter((item: any) => {
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
        ids.push(this.lavados[i]);
      }
    }
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '275px',
      data: `Desea eliminar estos ${borrar} elementos`
    });
    dialogRef.afterClosed().subscribe( resp => {
      if (resp) {
        this.dataService.deleteLavados(ids).subscribe( res => {
          this.ngOnInit();
        });
      }
    });
  }

  cambio() {
    this.checkBox = [];
    this.lavados.forEach( () => {
      this.checkBox.push(!this.checkAll);
    });
  }
}
