import { Component } from '@angular/core';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;

  user$ = this.authService.user$;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly tokenService: TokenService
  ) {}

  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  isValidateToken() {
    console.log("isValidToken",this.tokenService.isValidToken());
  }
}
