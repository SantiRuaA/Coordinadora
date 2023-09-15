import { Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpleadoInterface } from '../../../models/empleado.interface';
import { PremioInterface } from 'src/app/models/premio.interface';
import { PuntajeInterface } from '../../../models/puntaje.interface';
import { PuntajeService } from '../../../services/api/puntaje.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription, forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-puntaje',
  templateUrl: './edit-puntaje.component.html',
  styleUrls: ['./edit-puntaje.component.css']
})
export class EditPuntajeComponent implements OnInit, OnDestroy {

  @ViewChild('inputPlaces') inputPlaces!: ElementRef;


  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private api: PuntajeService,
    private renderer: Renderer2,
    private dialog: MatDialog,
  ) { }

  dataPuntaje: PuntajeInterface[] = [];
  empleado: EmpleadoInterface[] = [];
  premio: PremioInterface[] = [];
  loading: boolean = true;

  @ViewChild('viewMap') viewMap!: TemplateRef<any>;


  editForm = new FormGroup({
    idPuntaje: new FormControl(''),
    idEmpleado: new FormControl('', Validators.required),
    idPremio: new FormControl('', Validators.required),
    puntaje: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    let idPuntaje = this.activatedRouter.snapshot.paramMap.get('id');
    this.loading = true;

    const forkJoinSub = forkJoin([this.api.getOnePuntajes(idPuntaje), this.api.getEmpleado(), this.api.getPremio()]).subscribe(
      ([dataPuntaje, empleado, premio]) => {
        this.dataPuntaje = dataPuntaje ? [dataPuntaje] : [];
        this.editForm.setValue({
          'idPuntaje': this.dataPuntaje[0]?.idPuntaje || '',
          'idEmpleado': this.dataPuntaje[0]?.idEmpleado || '',
          'idPremio': this.dataPuntaje[0]?.idPremio || '',
          'puntaje': this.dataPuntaje[0]?.puntaje || '',
        });
        this.empleado = empleado;
        this.premio = premio;
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
      title: '¿Está seguro de que deseas modificar este puntaje?',
      showCancelButton: true,
      showCloseButton: true,
      allowOutsideClick: false,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        const putCltSub = this.api.putPuntajes(id).subscribe(
          (data) => {
            if (data.status == 'ok') {
              this.editForm.reset();
              this.router.navigate(['puntajes/list-puntajes']);
              Swal.fire({
                icon: 'success',
                title: 'Puntaje modificado',
                text: 'El puntaje ha sido modificado exitosamente.',
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
    this.router.navigate(['puntajes/list-puntajes']);
  }
}