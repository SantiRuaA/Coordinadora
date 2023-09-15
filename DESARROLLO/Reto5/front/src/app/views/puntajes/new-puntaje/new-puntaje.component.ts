import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PuntajeService } from '../../../services/api/puntaje.service';
import { PuntajeInterface } from '../../../models/puntaje.interface';
import { EmpleadoInterface } from 'src/app/models/empleado.interface';
import { PremioInterface } from 'src/app/models/premio.interface';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-puntaje',
  templateUrl: './new-puntaje.component.html',
  styleUrls: ['./new-puntaje.component.css']
})
export class NewPuntajeComponent implements OnInit, OnDestroy {

  @ViewChild('inputPlaces') inputPlaces!: ElementRef;


  constructor(
    private router: Router,
    private api: PuntajeService,
  ) { }

  private subscriptions: Subscription = new Subscription();

  empleado: EmpleadoInterface[] = []
  premio: PremioInterface[] = []
  loading: boolean = true;


  newForm = new FormGroup({
    idPuntaje: new FormControl(''),
    idEmpleado: new FormControl('', Validators.required),
    idPremio: new FormControl('', Validators.required),
    puntaje: new FormControl('', Validators.required),
  })


  ngOnInit(): void {
    const getEmpleado = this.api.getEmpleado().subscribe(data => {
      this.empleado = data;
      this.loading = false;
    });
    const getPremio = this.api.getPremio().subscribe(data => {
      this.premio = data;
      this.loading = false;
    });
    this.subscriptions.add(getEmpleado);
    this.subscriptions.add(getPremio);
  }


  ngOnDestroy(): void {
    // Desuscribirse de todas las suscripciones
    this.subscriptions.unsubscribe();
  }

  postForm(form: PuntajeInterface) {
    Swal.fire({
      icon: 'question',
      title: '¿Estás seguro de que deseas crear este puntaje?',
      showCancelButton: true,
      showCloseButton: true,
      allowOutsideClick: false,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        const postCltSub = this.api.postPuntajes(form).subscribe(data => {
          if (data.status == 'ok') {
            this.newForm.reset();
            this.router.navigate(['puntajes/list-puntajes']);
            Swal.fire({
              icon: 'success',
              title: 'Puntaje creado',
              text: 'El puntaje ha sido creado exitosamente.',
              toast: true,
              showConfirmButton: false,
              timer: 5000,
              position: 'top-end',
              timerProgressBar: true,
              showCloseButton: true,
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error al crear',
              text: data.msj,
            });
          }
          this.loading = false;
        },
          (error) => {
            this.loading = false;
            Swal.fire({
              icon: 'error',
              title: 'Error en el servidor',
              text: 'Ha ocurrido un error al comunicarse con el servidor. Por favor, revisa tu conexión a internet o inténtalo nuevamente',
            });
          });

        this.subscriptions.add(postCltSub);
      }
    });
  }

  goBack() {
    this.loading = true;
    this.router.navigate(['puntajes/list-puntajes']);
  }
}

