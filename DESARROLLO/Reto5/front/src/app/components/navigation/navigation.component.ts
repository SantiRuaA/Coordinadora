import { Component, Inject, ViewChild, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { MatMenuTrigger } from '@angular/material/menu';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  @ViewChild('userMenuTrigger') userMenuTrigger!: MatMenuTrigger;
  private breakpointObserver = inject(BreakpointObserver);

  isDarkThemeActive = false;

  modules: any[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
  ) {


    this.modules = [
      { name: 'Empleados', route: '/empleados' },
      { name: 'Premios', route: '/premios' },
      { name: 'Puntajes', route: '/puntajes'}

    ];
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  toggleUserPanel(): void {
    if (this.userMenuTrigger) {
      this.userMenuTrigger.openMenu();
    }
  }
}
