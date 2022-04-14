import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis?: Assignment;

  constructor(private assignmentsService: AssignmentsService,
              private route:ActivatedRoute,
              private router:Router,
              private authService:AuthService) {}

  ngOnInit(): void {
    // le + force la conversion "string" vers "number"
    const id:number = +this.route.snapshot.params['id'];

    console.log("Composant detail, id = " + id);

    // a partir de l'id on demande au service l'assignment qui correspond
    this.assignmentsService.getAssignment(id)
    .subscribe(assignment => {
      this.assignmentTransmis = assignment;
    })
  }

  onAssignmentRendu() {
    if (this.assignmentTransmis) {
      this.assignmentTransmis.rendu = true;

      this.assignmentsService
        .updateAssignment(this.assignmentTransmis)
        .subscribe((reponse) => {
          console.log(reponse.message);

          // pour cacher la vue de details une fois modifié
          this.assignmentTransmis = undefined;

          // on retourne à la page d'accueil
          this.router.navigate(["/assignment/list"]);
        });
    }
  }

  onDeleteAssignment() {
    if (this.assignmentTransmis) {
      this.assignmentsService
        .deleteAssignment(this.assignmentTransmis)
        .subscribe((reponse) => {
          console.log(reponse.message);

          // pour cacher la vue de details une fois supprimé
          this.assignmentTransmis = undefined;

          // on retourne à la page d'accueil
          this.router.navigate(["/assignment/list"]);
        });
    }
  }

  onClickEdit() {
    this.router.navigate(['/assignment', this.assignmentTransmis?.id, 'edit'],
    {
      queryParams : {
        nom:this.assignmentTransmis?.nom,
        debug:true,
        age:56
      },
      fragment:"edition"
    });
  }

  isAdmin():boolean {
    return this.authService.loggedIn;
  }
}
