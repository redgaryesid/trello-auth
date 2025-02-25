import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { TokenService } from './token.service';
import { User } from '@models/user.model';

import { checkToken } from '@interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiURL = environment.API_URL;

  constructor(
    private readonly http: HttpClient,
    private readonly tokenService: TokenService
  ) { }

  getUsers() {
    return this.http.get<User[]>(`${this.apiURL}/users`,{ context:checkToken()});
  }
}
