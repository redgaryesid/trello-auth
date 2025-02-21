import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';

import { TokenService } from '@services/token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly tokenService: TokenService,
    private readonly router: Router
  ) { }

  canActivate():boolean {
    const token = this.tokenService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
  
}
