import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AplicacionService {

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  editarCampo(data, campo: string, idx: number, terminal?: string) {
    return new Promise( resolve => {
      let headers;
      if (terminal) {
        headers = new HttpHeaders({
          'x-token': this.authService.token,
          terminal
        });
      } else {
          headers = new HttpHeaders({
            'x-token': this.authService.token
          });
      }
      const myUrl = `${url}campos/editar/${campo}/${idx}`;
      this.http.post(myUrl, data, {headers}).subscribe( res => {
        console.log(res);
        // tslint:disable-next-line: no-string-literal
        if (res['ok']) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });

  }

  editarCampoo(data) {
    return new Promise( resolve => {
      const headers = new HttpHeaders({
        'x-token': this.authService.token
      });
      const myUrl = `${url}campos/editar`;
      this.http.post(myUrl, data, {headers}).subscribe( res => {
        console.log(res);
        // tslint:disable-next-line: no-string-literal
        if (res['ok']) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });

  }

  agregarCampo(data: any, fileName: string, terminal?: string) {
    return new Promise( resolve => {
      let headers;
      if (terminal) {
        headers = new HttpHeaders({
          'x-token': this.authService.token,
          terminal
        });
      } else {
          headers = new HttpHeaders({
            'x-token': this.authService.token
          });
      }
      const myUrl = `${url}campos/agregar/${fileName}`;
      this.http.post(myUrl, data, {headers}).subscribe( resp => {
        console.log(resp);
        // tslint:disable-next-line: no-string-literal
        if (resp['ok']) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
  agregarCampoo(data: any) {
    console.log(data);
    return new Promise( resolve => {
      const headers = new HttpHeaders({
        'x-token': this.authService.token
      });
      const myUrl = `${url}campos/agregar`;
      this.http.post(myUrl, data, {headers}).subscribe( resp => {
        console.log(resp);
        // tslint:disable-next-line: no-string-literal
        if (resp['ok']) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }


  eliminarCampo( idx: any, filename: string, terminal?: string) {
    return new Promise( resolve => {
      let headers;
      if (terminal) {
        headers = new HttpHeaders({
          'x-token': this.authService.token,
          terminal
        });
      } else {
          headers = new HttpHeaders({
            'x-token': this.authService.token
          });
      }
      const myUrl = `${url}campos/eliminar/${idx}`;
      const body = { fileName: filename};
      this.http.post( myUrl, body, {headers}).subscribe( resp => {
        console.log(resp);
        // tslint:disable-next-line: no-string-literal
        if (resp['ok']) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  eliminarCampoo( data: any) {
    return new Promise( resolve => {
      const headers = new HttpHeaders({
        'x-token': this.authService.token
      });
      const myUrl = `${url}campos/eliminar`;
      this.http.post( myUrl, data, {headers}).subscribe( resp => {
        console.log(resp);
        // tslint:disable-next-line: no-string-literal
        if (resp['ok']) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  getTemrinales() {
    return ['Arica',
            'Iquique',
            'Antofagasta',
            'Copiapo',
            'Valparaiso',
            'San Antonio',
            'Santiago',
            'Talcahuano',
            'Puerto Montt',
            'Asistencia Ruta',
            'TPS',
            'Terminal 1',
            'Terminal 2',
            'Terminal 3'];
  }
}
