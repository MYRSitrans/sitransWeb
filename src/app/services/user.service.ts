import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor( private http: HttpClient,
               private authService: AuthService) { }

  registar(body: any) {
    return new Promise( resolve => {
      const headers = new HttpHeaders({
        'x-token': this.authService.token
      });
      this.http.post(`${URL}user/create`, body, {headers}).subscribe(resp => {
        // tslint:disable-next-line: no-string-literal
        if (resp['ok']) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  editar(body: any) {
    return new Promise( resolve => {
      const headers = new HttpHeaders({
        'x-token': this.authService.token
      });
      this.http.post(`${URL}user/update`, body, {headers}).subscribe(resp => {
        // tslint:disable-next-line: no-string-literal
        if (resp['ok']) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  listar() {
      const headers = new HttpHeaders({
        'x-token': this.authService.token
      });
      const body = {};
      return this.http.post(`${URL}user/list`, body, {headers});
  }

  eliminar(id: string) {
    return new Promise( resolve => {
      const headers = new HttpHeaders({
        'x-token': this.authService.token
      });
      const body = {id};
      this.http.post(`${URL}user/delete`, body, {headers}).subscribe(resp => {
        // tslint:disable-next-line: no-string-literal
        if (resp['ok']) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}
