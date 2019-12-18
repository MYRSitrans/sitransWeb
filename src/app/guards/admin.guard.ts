import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) {}

  async canActivate(): Promise<boolean>  {
    const elError = await this.auth.verificaAdminToken();
    if (elError) {
      return Promise.resolve(true);
    } else {
      this.router.navigateByUrl('/');
      return Promise.resolve(false);
    }
  }

}
