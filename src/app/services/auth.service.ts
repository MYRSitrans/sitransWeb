import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UsuarioModel } from '../models/usuario.model';
import { Router } from '@angular/router';


const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  admin = false;
  constructor( private http: HttpClient,
               private router: Router) {
    this.leerToken();
  }

  logout() {
    localStorage.removeItem('token');
    this.token = '';
    this.router.navigateByUrl('/inicio');
  }

  login(usuario: UsuarioModel) {
    return new Promise<boolean>( resolve => {
      const data = { ...usuario };
      this.http.post(`${url}admin/login`, data).subscribe( async resp => {
        // tslint:disable-next-line: no-string-literal
        if ( resp['ok']) {
          console.log('hola');
          // tslint:disable-next-line: no-string-literal
          await this.guardarToken(resp['token']);
          this.admin = true;
          resolve( true );
        } else {
            const datos = { rut: usuario.email,
                          password: usuario.password};
            this.http.post(`${url}user/login`, datos).subscribe( async res => {
              // tslint:disable-next-line: no-string-literal
              if ( res['ok']) {
                const headers = new HttpHeaders({
                  'x-token': res['token']
                });
                this.http.get(`${url}user/`, {headers}).subscribe( async r => {
                  // tslint:disable-next-line: no-string-literal
                  if (r['ok']) {
                    if (r['usuario'].webAccess) {
                      await this.guardarToken(res['token']);
                      this.admin = false;
                      resolve( true );
                    }
                  }
                  resolve(false);
                });
                // tslint:disable-next-line: no-string-literal
              } else {
                this.token = null;
                this.logout();
                resolve(false);
              }
            });
      }
    });
    });
  }

  guardarToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  async leerToken() {
    if ( await localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }

  }

  async verificaAdminToken(): Promise<boolean> {
    await this.leerToken();
    if (! this.token) {
      return Promise.resolve(false);
    }
    return new Promise (resolve => {
      const headers = new HttpHeaders({
        'x-token': this.token
      });
      this.http.get(`${url}admin/`, {headers}).subscribe( resp => {
        // tslint:disable-next-line: no-string-literal
        if (resp['ok']) {
          this.admin = true;
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  async verificaToken(): Promise<boolean> {
    await this.leerToken();
    if (! this.token) {
      return Promise.resolve(false);
    }
    return new Promise(resolve => {
      const headers = new HttpHeaders({
        'x-token': this.token
      });
      this.http.get(`${url}admin/`, {headers}).subscribe( resp => {
        // tslint:disable-next-line: no-string-literal
        if (resp['ok']) {
          this.admin = true;
          resolve( true );
        } else {
          this.http.get(`${url}user/`, {headers}).subscribe( res => {
            // tslint:disable-next-line: no-string-literal
            if (res['ok']) {
              resolve( true );
            } else {
              resolve( false );
            }
          });
        }
      });
    });
  }




}
