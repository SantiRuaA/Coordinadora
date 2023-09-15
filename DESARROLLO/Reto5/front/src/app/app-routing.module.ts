import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './views/landing-page/landing-page.component';


const routes: Routes = [
  { path: '', redirectTo: 'landing-page', pathMatch: 'full' },

  { path: 'landing-page', component: LandingPageComponent },

  {
    path: 'empleados',
    loadChildren: () => import('./views/empleados/empleado.module').then(m => m.EmpleadoModule)
  },
  {
    path: 'premios',
    loadChildren: () => import('./views/premios/premio.module').then(m => m.PremioModule)
  },
  {
    path: 'puntajes',
    loadChildren: () => import('./views/puntajes/puntaje.module').then(m => m.PuntajeModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
