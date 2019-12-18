import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class BuscarService {

  constructor(private http: HttpClient) { }

  buscar(prefix: string) {
      const body = {prefix};
      return this.http.post(`${url}imagen/`, body);
  }
}
