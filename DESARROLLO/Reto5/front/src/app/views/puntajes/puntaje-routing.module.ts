import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPuntajesComponent } from './list-puntajes/list-puntajes.component';
import { NewPuntajeComponent } from './new-puntaje/new-puntaje.component';
import { EditPuntajeComponent } from './edit-puntaje/edit-puntaje.component';

const routes: Routes = [

  { path: '', redirectTo: 'list-puntajes', pathMatch: 'full' },

  { path: 'list-puntajes', component: ListPuntajesComponent },

  { path: 'new-puntaje',  component: NewPuntajeComponent },

  { path: 'edit-puntaje/:id',  component: EditPuntajeComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PuntajeRoutingModule { }