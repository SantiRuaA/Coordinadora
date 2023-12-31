import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpleadoInterface } from '../../../models/empleado.interface';
import { EmpleadoService } from '../../../services/api/empleado.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription, forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-empleado',
  templateUrl: './edit-empleado.component.html',
  styleUrls: ['./edit-empleado.component.css']
})
export class EditEmpleadoComponent implements OnInit, OnDestroy {

  @ViewChild('inputPlaces') inputPlaces!: ElementRef;


  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private api: EmpleadoService,
  ) { }

  dataEmpleado: EmpleadoInterface[] = [];
  loading: boolean = true;


  editForm = new FormGroup({
    idEmpleado: new FormControl(''),
    nombre: new FormControl('', Validators.required),
    telefono: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    correo: new FormControl('', [Validators.required, Validators.pattern('^[\\w.%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
    direccion: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    let id = this.activatedRouter.snapshot.paramMap.get('id');
    this.loading = true;

    const forkJoinSub = forkJoin([this.api.getOneEmpleados(id)]).subscribe(
      ([dataEmpleado]) => {
        this.dataEmpleado = dataEmpleado ? [dataEmpleado] : [];
        this.editForm.setValue({
          'idEmpleado': this.dataEmpleado[0]?.idEmpleado || '',
          'nombre': this.dataEmpleado[0]?.nombre || '',
          'telefono': this.dataEmpleado[0]?.telefono || '',
          'correo': this.dataEmpleado[0]?.correo || '',
          'direccion': this.dataEmpleado[0]?.direccion || '',
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
      title: '¿Está seguro de que deseas modificar este empleado?',
      showCancelButton: true,
      showCloseButton: true,
      allowOutsideClick: false,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        const putCltSub = this.api.putEmpleados(id).subscribe(
          (data) => {
            if (data.status == 'ok') {
              this.editForm.reset();
              this.router.navigate(['empleados/list-empleados']);
              Swal.fire({
                icon: 'success',
                title: 'Empleado modificado',
                text: 'El empleado ha sido modificado exitosamente.',
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
    this.router.navigate(['empleados/list-empleados']);
  }

}