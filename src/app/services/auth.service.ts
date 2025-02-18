import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = environment.API_URL;

  constructor(
    private http: HttpClient
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
}
