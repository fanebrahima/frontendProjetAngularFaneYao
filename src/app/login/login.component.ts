import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;

  constructor(private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
  }

  login(event: MouseEvent): void {
    event.preventDefault();
    if (!this.authService.loggedIn) {
      this.authService.logIn(this.username!, this.password!);
    } else {
      // this.authService.logOut();
      this.router.navigate(['/home']);
    }
  }

}
