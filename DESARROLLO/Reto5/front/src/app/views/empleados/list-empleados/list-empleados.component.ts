import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EmpleadoService } from 'src/app/services/api/empleado.service';
import { Router } from '@angular/router';
import { EmpleadoInterface } from 'src/app/models/empleado.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription, forkJoin } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit, OnDestroy {

  constructor(
    private api: EmpleadoService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  private subscriptions: Subscription = new Subscription();

  empleados: EmpleadoInterface[] = [];
  dataSource = new MatTableDataSource(this.empleados);
  loading: boolean = true;
  dataToExport: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator; //para la paginacion, y los del ! pal not null
  @ViewChild(MatSort) sort!: MatSort; //para el ordenamiento
  @ViewChild('viewEmpleadoDialog') viewEmpleadoDialog!: TemplateRef<any>;

  ngOnInit(): void {
    this.loading = true;

    const forkJoinSub = forkJoin([
      this.api.getAllEmpleados(),
    ]).subscribe(([empleados]) => {
      this.empleados = empleados;
      this.dataSource.data = this.empleados;
      if (this.dataSource.data.length < 1) {
        Swal.fire({
          title: 'No hay empleados registrados',
          text: 'No se encontraron empleados en el sistema.',
          icon: 'info',
          toast: true,
          showConfirmButton: false,
          timer: 5000,
          position: 'top-end',
          timerProgressBar: true,
          showCloseButton: true,
        })
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


  viewEmpleado(empleado: EmpleadoInterface): void {
    this.dialog.open(this.viewEmpleadoDialog, {
      data: empleado,
      width: '35%',
      height: 'auto',
    });
  }

  editEmpleado(id: any) {
    this.loading = true;
    this.router.navigate(['empleado/edit-empleado', id]);
  }

  newEmpleado() {
    this.loading = true;
    this.router.navigate(['empleado/new-empleado']);
  }

  deleteEmpleado(id: any): void {
    Swal.fire({
      icon: 'question',
      title: '¿Estás seguro de que deseas eliminar este empleado?',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      reverseButtons: true,
      denyButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isDenied) {
        this.loading = true;
        this.api.deleteEmpleados(id).subscribe(
          data => {
            if (data.status == 'ok') {
              this.empleados = this.empleados.filter(empleado => empleado.id !== id);
              this.dataSource.data = this.empleados; // Actualizar el dataSource con los nuevos datos
              Swal.fire({
                icon: 'success',
                title: 'Empleado eliminado',
                text: 'El empleado ha sido eliminado exitosamente.',
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
  removeAccents(cadena: string): string {
    return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
