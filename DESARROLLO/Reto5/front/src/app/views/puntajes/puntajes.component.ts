import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-puntajes',
  templateUrl: './puntajes.component.html',
  styleUrls: ['./puntajes.component.css']
})

export class PuntajesComponent {
  constructor(private router: Router) { }
  

  irAEmpleados() {
    this.router.navigate(['/empleados']);
  }

}
