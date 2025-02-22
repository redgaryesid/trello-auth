import { Injectable } from '@angular/core';

import { getCookie, setCookie,removeCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

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
}
