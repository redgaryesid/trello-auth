import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
  HttpContext
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

import { TokenService } from '@services/token.service';
import { AuthService } from '@services/auth.service';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

export function checkToken(){
  return new HttpContext().set(CHECK_TOKEN, true);
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private readonly tokenService: TokenService,
    private readonly authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //Validamos que la peticion requiera token
    if(request.context.get(CHECK_TOKEN)){
      //Validamos si el token es valido y no ha expirado
      const isValidToken = this.tokenService.isValidToken();
      //Si el token es valido lo agregamos a la peticion
      if(isValidToken){
        return this.addToken(request, next);
      }else{
        //Si el token no es valido lo actualizamos
        return this.updateAccessTokenAndRefreshToken(request, next);
      }
    }
    //Si la peticion no requiere token la enviamos tal cual
    return next.handle(request);
    
  }

  //Funcion para agregar el token a la peticion
  private addToken(request: HttpRequest<unknown>, next: HttpHandler) {
    //Obtenemos el token
    const accessToken = this.tokenService.getToken();
    //Validamos que el token exista
    if(accessToken){
      // add token to request
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
      });
      return next.handle(authRequest);
    }
    return next.handle(request);
  }
  //Funcion para actualizar el token y el refresh token
  private updateAccessTokenAndRefreshToken(request: HttpRequest<unknown>, next: HttpHandler) {
    //Obtenemos el refresh token
    const refreshToken = this.tokenService.getRefreshToken();
    //Validamos que el refresh token exista y sea valido
    const isValidRefreshToken = this.tokenService.isValidRefreshToken();
    //Si el refresh token es valido lo actualizamos
    if (refreshToken && isValidRefreshToken) {
      //Actualizamos el token
      return this.authService.refreshToken(refreshToken)
      .pipe(
        switchMap(() => this.addToken(request, next)),
      )
    }
    return next.handle(request);
  }
}