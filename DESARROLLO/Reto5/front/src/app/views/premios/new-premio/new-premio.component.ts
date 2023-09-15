import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PremioService } from '../../../services/api/premio.service';
import { PremioInterface } from '../../../models/premio.interface';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-premio',
  templateUrl: './new-premio.component.html',
  styleUrls: ['./new-premio.component.css']
})
export class NewPremioComponent implements OnInit, OnDestroy {

  @ViewChild('inputPlaces') inputPlaces!: ElementRef;


  constructor(
    private router: Router,
    private api: PremioService,
  ) { }

  private subscriptions: Subscription = new Subscription();
  loading: boolean = true;



  newForm = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
  })


  ngOnInit(): void {
    this.loading = false;
  }


  ngOnDestroy(): void {
    // Desuscribirse de todas las suscripciones
    this.subscriptions.unsubscribe();
  }

  postForm(form: PremioInterface) {
    Swal.fire({
      icon: 'question',
      title: '¿Estás seguro de que deseas crear este premio?',
      showCancelButton: true,
      showCloseButton: true,
      allowOutsideClick: false,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        const postCltSub = this.api.postPremios(form).subscribe(data => {
          if (data.status == 'ok') {
            this.newForm.reset();
            this.router.navigate(['premios/list-premios']);
            Swal.fire({
              icon: 'success',
              title: 'Premio creado',
              text: 'El premio ha sido creado exitosamente.',
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
    this.router.navigate(['premios/list-premios']);
  }
}
