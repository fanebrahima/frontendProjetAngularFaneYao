import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  url = 'https://app-assignment-api.herokuapp.com/api/login';

  constructor(private httpClient: HttpClient,
    private router: Router) { }

  logIn(username: string, password: string): void {
    this.httpClient.post<{ token: string }>(this.url, {username: username.toString(), password: password.toString()})
      .subscribe(res => {
        if (res.token !== undefined) {
          localStorage.setItem('token', res.token);
          this.loggedIn = true;
          this.router.navigate(['/home']);
        } else {
          this.loggedIn = false;
        }
      });
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.loggedIn = false;
  }

  isAdmin() {
    const isUserAdmin =  new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });

    return isUserAdmin;
    // return this.loggedIn;
  }
}

/*
  const admin = isAdmin(); // si on avait pas de promesse

  isAdmin().then((admin) => {
    console.log("Est un administrateur : " + admin);
  })
*/
