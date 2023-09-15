import { NgModule } from '@angular/core';

import { EmpleadoRoutingModule } from './empleado-routing.module';
import { ListEmpleadosComponent } from './list-empleados/list-empleados.component';
import { NewEmpleadoComponent } from './new-empleado/new-empleado.component';
import { EditEmpleadoComponent } from './edit-empleado/edit-empleado.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ListEmpleadosComponent,
    NewEmpleadoComponent,
    EditEmpleadoComponent
  ],
  imports: [
    SharedModule,
    EmpleadoRoutingModule,
  ]
})
export class EmpleadoModule { }