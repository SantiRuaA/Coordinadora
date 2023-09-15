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
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
