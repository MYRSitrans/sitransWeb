import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  getElemet(s: string, terminal?: string) {
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
    return this.http.get<any[]>(`${url}campos/${s}`, {headers});
  }

  getLavados(terminal?: string) {
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
    return this.http.get<any[][]>(`${url}lavados`, {headers});
  }

  getReparacion(categoria: string, terminal?: string) {
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
    return this.http.get<any[][]>(`${url}reparacion/categoria/${categoria}`, {headers});
  }


  deleteLavados(ids: string[], terminal?: string) {
    const body = {ids};
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
    return this.http.post(`${url}lavados/delete`, body, {headers});
  }

  deleteReparacion(ids: string[], terminal?: string) {
    const body = {ids};
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
    return this.http.post(`${url}reparaion/delete`, body, {headers});
  }

}
