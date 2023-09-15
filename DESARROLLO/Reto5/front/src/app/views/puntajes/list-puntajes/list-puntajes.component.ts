import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PuntajeService } from '../../../services/api/puntaje.service';
import { Router } from '@angular/router';
import { PuntajeInterface } from 'src/app/models/puntaje.interface';
import { EmpleadoInterface } from 'src/app/models/empleado.interface';
import { PremioInterface } from 'src/app/models/premio.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription, forkJoin } from 'rxjs';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-list-puntajes',
  templateUrl: './list-puntajes.component.html',
  styleUrls: ['./list-puntajes.component.css']
})
export class ListPuntajesComponent implements OnInit, OnDestroy {

  constructor(
    private api: PuntajeService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  private subscriptions: Subscription = new Subscription();

  puntajes: PuntajeInterface[] = [];
  empleado: EmpleadoInterface[] = [];
  premio: PremioInterface[] = [];
  dataSource = new MatTableDataSource(this.puntajes);
  loading: boolean = true;
  dataToExport: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator; //para la paginacion, y los del ! pal not null
  @ViewChild(MatSort) sort!: MatSort; //para el ordenamiento
  @ViewChild('viewPuntajeDialog') viewPuntajeDialog!: TemplateRef<any>;

  ngOnInit(): void {
    this.loading = true;

    const forkJoinSub = forkJoin([
      this.api.getAllPuntajes(),
      this.api.getEmpleado(),
      this.api.getPremio()
    ]).subscribe(([puntajes, empleado, premio]) => {
      this.puntajes = puntajes;
      this.dataSource.data = this.puntajes;
      if (this.dataSource.data.length < 1) {
        Swal.fire({
          title: 'No hay puntajes registrados',
          text: 'No se encontraron puntajes en el sistema.',
          icon: 'info',
          toast: true,
          showConfirmButton: false,
          timer: 5000,
          position: 'top-end',
          timerProgressBar: true,
          showCloseButton: true,
        })
      }
      this.empleado = empleado;
      this.premio = premio;
      this.loading = false;
    },
      error => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error en el servidor',
          text: 'Ha ocurrido un error al comunicarse con el servidor. Por favor, revisa tu conexión a internet o inténtalo nuevamente.',
        });
      });
    this.subscriptions.add(forkJoinSub);
  }

  ngAfterViewInit() { //para la paginacion y el ordenamiento
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    // Desuscribirse de todas las suscripciones
    this.subscriptions.unsubscribe();
  }


  viewPuntaje(puntaje: PuntajeInterface): void {
    this.dialog.open(this.viewPuntajeDialog, {
      data: puntaje,
      width: '35%',
      height: 'auto',
    });
  }

  editPuntaje(id: any) {
    this.loading = true;
    this.router.navigate(['puntajes/edit-puntaje', id]);
  }

  newPuntaje() {
    this.loading = true;
    this.router.navigate(['puntajes/new-puntaje']);
  }

  deletePuntaje(id: any): void {
    Swal.fire({
      icon: 'question',
      title: '¿Estás seguro de que deseas eliminar este puntaje?',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      reverseButtons: true,
      denyButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isDenied) {
        this.loading = true;
        this.api.deletePuntajes(id).subscribe(
          data => {
            if (data.status == 'ok') {
              this.puntajes = this.puntajes.filter(puntaje => puntaje.idPuntaje !== id);
              this.dataSource.data = this.puntajes; // Actualizar el dataSource con los nuevos datos
              Swal.fire({
                icon: 'success',
                title: 'Puntaje eliminado',
                text: 'El puntaje ha sido eliminado exitosamente.',
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
                title: 'Error al eliminar',
                text: data.msj,
              });
            }
            this.loading = false;
          },
          error => {
            this.loading = false;
            Swal.fire({
              icon: 'error',
              title: 'Error en el servidor',
              text: 'Ha ocurrido un error al comunicarse con el servidor. Por favor, revisa tu conexión a internet o inténtalo nuevamente.',
            });
          });
      }
    });
  }

  getEmpleado(idEmpleado: any): string {
    const empleado = this.empleado.find(tipo => tipo.idEmpleado === idEmpleado);
    return empleado?.nombre || '';
  }

  getPremio(idPremio: any): string {
    const premio = this.premio.find(tipo => tipo.idPremio === idPremio);
    return premio?.nombre || '';
  }

  removeAccents(cadena: string): string {
    return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
