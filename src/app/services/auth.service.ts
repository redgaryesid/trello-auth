import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { switchMap,tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import {ResponseLogin} from '@models/auth.model';
import { User } from '@models/user.model';
import { BehaviorSubject } from 'rxjs';

import { checkToken } from '@interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = environment.API_URL;
  user$ = new BehaviorSubject<User|null>(null);

  constructor(
    private readonly http: HttpClient,
    private readonly tokenService: TokenService
  ) {

   }

   getDataUser(){
    return this.user$.getValue();
   }

   login(email: string, password: string) {
    // This is where the login logic would go
    return this.http.post<ResponseLogin>(`${this.apiURL}/auth/login`, {
      email,
      password
    }).pipe(//Esto hace que antes de que se ejecute el subscribe se ejecute el tap
      tap(response=>{
        this.tokenService.saveToken(response.access_token);
        this.tokenService.saveRefreshToken(response.refresh_token);

      })
    );
   }

   refreshToken(refreshToken: string) {
    return this.http.post<ResponseLogin>(`${this.apiURL}/auth/refresh-token`, {refreshToken})
    .pipe(
      tap(response=>{
        this.tokenService.saveToken(response.access_token);
        this.tokenService.saveRefreshToken(response.refresh_token);
      })
    );
   }

   register(name:string,email: string, password: string) {
    return this.http.post(`${this.apiURL}/auth/register`, {
      name,
      email,
      password
    });
   }

   registerAndLogin(name:string,email: string, password: string) {
    return this.register(name,email, password)
    .pipe(
      switchMap(() => this.login(email, password))
    );
   }

   isAvailable(email: string) {
    return this.http.post<{isAvailable:boolean}>(`${this.apiURL}/auth/is-available`, {
      email
    });
   }

   recovery(email: string) {
    return this.http.post(`${this.apiURL}/auth/recovery`, {
      email
    });
   }

   changePassword(token: string, newPassword: string ) {
    return this.http.post(`${this.apiURL}/auth/change-password`, {
      newPassword,
      token
    });
   }
   
   getProfile() {
    
    return this.http.get<User>(`${this.apiURL}/auth/profile`,{ context:checkToken()}).pipe(
      tap(user=>{
        this.user$.next(user);
      })
    );
   }

   logout() {
    this.tokenService.removeToken();
   }

}
