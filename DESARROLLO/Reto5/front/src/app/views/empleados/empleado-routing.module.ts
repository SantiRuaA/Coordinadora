import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmpleadosComponent } from './list-empleados/list-empleados.component';
import { NewEmpleadoComponent } from './new-empleado/new-empleado.component';
import { EditEmpleadoComponent } from './edit-empleado/edit-empleado.component';

const routes: Routes = [

  { path: '', redirectTo: 'list-empleados', pathMatch: 'full' },

  { path: 'list-empleados', component: ListEmpleadosComponent },

  { path: 'new-empleado',  component: NewEmpleadoComponent },

  { path: 'edit-empleado/:id',  component: EditEmpleadoComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadoRoutingModule { }