import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadoService } from '../../../services/api/empleado.service';
import { EmpleadoInterface } from '../../../models/empleado.interface';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-empleado',
  templateUrl: './new-empleado.component.html',
  styleUrls: ['./new-empleado.component.css']
})
export class NewEmpleadoComponent implements OnInit, OnDestroy {

  @ViewChild('inputPlaces') inputPlaces!: ElementRef;


  constructor(
    private router: Router,
    private api: EmpleadoService,
  ) { }

  private subscriptions: Subscription = new Subscription();
  loading: boolean = true;



  newForm = new FormGroup({
    idEmpleado: new FormControl(''),
    nombre: new FormControl('', Validators.required),
    telefono: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]), // Agregamos la validación de patrón usando Validators.pattern
    correo: new FormControl('', [Validators.required, Validators.pattern('^[\\w.%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
    direccion: new FormControl('', Validators.required),
  })


  ngOnInit(): void {
    this.loading = false;
  }


  ngOnDestroy(): void {
    // Desuscribirse de todas las suscripciones
    this.subscriptions.unsubscribe();
  }

  postForm(form: EmpleadoInterface) {
    Swal.fire({
      icon: 'question',
      title: '¿Estás seguro de que deseas crear este empleado?',
      showCancelButton: true,
      showCloseButton: true,
      allowOutsideClick: false,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        const postCltSub = this.api.postEmpleados(form).subscribe(data => {
          if (data.status == 'ok') {
            this.newForm.reset();
            this.router.navigate(['empleados/list-empleados']);
            Swal.fire({
              icon: 'success',
              title: 'empleado creado',
              text: 'El empleado ha sido creado exitosamente.',
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
    this.router.navigate(['empleados/list-empleados']);
  }
}
