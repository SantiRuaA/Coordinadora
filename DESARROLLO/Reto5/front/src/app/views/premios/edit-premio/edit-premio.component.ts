import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PremioInterface } from '../../../models/premio.interface';
import { PremioService } from '../../../services/api/premio.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription, forkJoin } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-premio',
  templateUrl: './edit-premio.component.html',
  styleUrls: ['./edit-premio.component.css']
})
export class EditPremioComponent implements OnInit, OnDestroy {

  @ViewChild('inputPlaces') inputPlaces!: ElementRef;


  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private api: PremioService,
  ) { }

  dataPremio: PremioInterface[] = [];
  loading: boolean = true;


  editForm = new FormGroup({
    idPremio: new FormControl(''),
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    let id = this.activatedRouter.snapshot.paramMap.get('id');
    this.loading = true;

    const forkJoinSub = forkJoin([this.api.getOnePremios(id)]).subscribe(
      ([dataPremio]) => {
        this.dataPremio = dataPremio ? [dataPremio] : [];
        this.editForm.setValue({
          'idPremio': this.dataPremio[0]?.idPremio || '',
          'nombre': this.dataPremio[0]?.nombre || '',
          'descripcion': this.dataPremio[0]?.descripcion || '',
        });
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error en el servidor',
          text: 'Ha ocurrido un error al comunicarse con el servidor. Por favor, revisa tu conexión a internet o inténtalo nuevamente',
        });
      }
    );
    this.subscriptions.add(forkJoinSub);
  }


  ngOnDestroy(): void {
    // Desuscribirse de todas las suscripciones
    this.subscriptions.unsubscribe();
  }


  postForm(id: any) {
    Swal.fire({
      icon: 'question',
      title: '¿Está seguro de que deseas modificar este premio?',
      showCancelButton: true,
      showCloseButton: true,
      allowOutsideClick: false,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        const putCltSub = this.api.putPremios(id).subscribe(
          (data) => {
            if (data.status == 'ok') {
              this.editForm.reset();
              this.router.navigate(['premios/list-premios']);
              Swal.fire({
                icon: 'success',
                title: 'Premio modificado',
                text: 'El premio ha sido modificado exitosamente.',
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
                title: 'Error al modificar',
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
        this.subscriptions.add(putCltSub);
      }
    });
  }

  goBack() {
    this.loading = true;
    this.router.navigate(['premios/list-premios']);
  }

}