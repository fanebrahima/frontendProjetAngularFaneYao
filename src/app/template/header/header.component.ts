import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../../shared/assignments.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username!: string;
  password!: string;

  constructor(private assignmentsService: AssignmentsService,
              private authService:AuthService,
              private router:Router) { }

  ngOnInit(): void {
  }

  peuplerBD() {
    this.assignmentsService.peuplerBDAvecForkJoin()
    .subscribe(() => {
      console.log("TOUS LES AJOUTS ONT ETE REALISES");
      // on peut alors afficher la liste
      this.router.navigate(["/home"]);
    })
  }

  login(event: MouseEvent): void {
    event.preventDefault();
    if (!this.authService.loggedIn) {
      this.authService.logIn(this.username!, this.password!);
    } else {
      this.authService.logOut();
      this.router.navigate(['/login']);
    }
  }

}
