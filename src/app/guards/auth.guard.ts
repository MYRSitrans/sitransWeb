import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) {}

  async canActivate(): Promise<boolean>  {
    const elError = await this.auth.verificaToken();
    if (elError){
      return Promise.resolve(true);
    } else {
      this.router.navigateByUrl('/inicio');
      return Promise.resolve(false);
    }
  }

}
