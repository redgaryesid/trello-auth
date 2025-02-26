import { Injectable } from '@angular/core';

import { getCookie, setCookie,removeCookie } from 'typescript-cookie';

import { jwtDecode, JwtPayload } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  //Token
  saveToken(token: string) {
    //De esta manera se crea la cookie, guardando el token en el navegador por 365 días, esta configuración se hace diciendole 
    //al setcookie por medio del expires que dure 365 días, el path se configura como '/', para que la cookie sea accesible en el dominio completo
    setCookie('token-clone-trello', token, { expires: 365, path: '/' });
  }

  getToken() {
    const token= getCookie('token-clone-trello');
    return token;
  }

  removeToken() {
    removeCookie('token-clone-trello');
  }

  //Refresh Token
  saveRefreshToken(token: string) {
    //De esta manera se crea la cookie, guardando el token en el navegador por 365 días, esta configuración se hace diciendole 
    //al setcookie por medio del expires que dure 365 días, el path se configura como '/', para que la cookie sea accesible en el dominio completo
    setCookie('refresh-token-clone-trello', token, { expires: 365, path: '/' });
  }

  getRefreshToken() {
    const token= getCookie('refresh-token-clone-trello');
    return token;
  }

  removeRefreshToken() {
    removeCookie('refresh-token-clone-trello');
  }

  isValidToken() {
    //Obtenemos el token
    const token = this.getToken();
    //Validamos si el token existe
   if(!token){
    //Si no existe retornamos false
     return false;
   }
   //Si existe el token, lo decodificamos
   const decodeToken = jwtDecode<JwtPayload>(token);
   //Validamos el dedocificado del token
   if(decodeToken && decodeToken?.exp){
    
    //Declaramos una variable con la fecha de hoy
    const tokenDate = new Date(0);
    //Le asignamos la fecha de expiración del token
    tokenDate.setUTCSeconds(decodeToken.exp);

    //Declaramos una variable con la fecha de hoy
    const today = new Date();
    //Validamos si la fecha de expiración del token es mayor a la fecha de hoy
    return tokenDate.getTime() > today.getTime();

   }
   //Si el decode token no es valido, retornamos false
   return false;
  }

  isValidRefreshToken() {
    //Obtenemos el token
    const token = this.getRefreshToken();
    //Validamos si el token existe
   if(!token){
    //Si no existe retornamos false
     return false;
   }
   //Si existe el token, lo decodificamos
   const decodeToken = jwtDecode<JwtPayload>(token);
   //Validamos el dedocificado del token
   if(decodeToken && decodeToken?.exp){
    
    //Declaramos una variable con la fecha de hoy
    const tokenDate = new Date(0);
    //Le asignamos la fecha de expiración del token
    tokenDate.setUTCSeconds(decodeToken.exp);

    //Declaramos una variable con la fecha de hoy
    const today = new Date();
    //Validamos si la fecha de expiración del token es mayor a la fecha de hoy
    return tokenDate.getTime() > today.getTime();

   }
   //Si el decode token no es valido, retornamos false
   return false;
  }
}
