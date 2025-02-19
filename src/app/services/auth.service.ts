import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = environment.API_URL;

  constructor(
    private readonly http: HttpClient
  ) {

   }

   login(email: string, password: string) {
    // This is where the login logic would go
    return this.http.post(`${this.apiURL}/auth/login`, {
      email,
      password
    });
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

}
