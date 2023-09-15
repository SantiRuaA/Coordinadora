import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPremiosComponent } from './list-premios/list-premios.component';
import { NewPremioComponent } from './new-premio/new-premio.component';
import { EditPremioComponent } from './edit-premio/edit-premio.component';

const routes: Routes = [

  { path: '', redirectTo: 'list-premios', pathMatch: 'full' },

  { path: 'list-premios', component: ListPremiosComponent },

  { path: 'new-premio',  component: NewPremioComponent },

  { path: 'edit-premio/:id',  component: EditPremioComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PremioRoutingModule { }