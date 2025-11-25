import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  setLoginStatus(status: boolean) {
    localStorage.setItem('loggedIn', status ? 'true' : 'false'); 
  }

  getLoginStatus(): boolean {
    return localStorage.getItem('loggedIn')==='true';
  }

  logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');
  }
}

