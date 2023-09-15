import { NgModule } from '@angular/core';

import { PuntajeRoutingModule } from './puntaje-routing.module';
import { ListPuntajesComponent } from './list-puntajes/list-puntajes.component';
import { NewPuntajeComponent } from './new-puntaje/new-puntaje.component';
import { EditPuntajeComponent } from './edit-puntaje/edit-puntaje.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ListPuntajesComponent,
    NewPuntajeComponent,
    EditPuntajeComponent
  ],
  imports: [
    SharedModule,
    PuntajeRoutingModule,
  ]
})
export class PuntajeModule { }