import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PremioService } from 'src/app/services/api/premio.service';
import { Router } from '@angular/router';
import { PremioInterface } from 'src/app/models/premio.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription, forkJoin } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-premios',
  templateUrl: './list-premios.component.html',
  styleUrls: ['./list-premios.component.css']
})
export class ListPremiosComponent implements OnInit, OnDestroy {

  constructor(
    private api: PremioService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  private subscriptions: Subscription = new Subscription();

  premios: PremioInterface[] = [];
  dataSource = new MatTableDataSource(this.premios);
  loading: boolean = true;
  dataToExport: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator; //para la paginacion, y los del ! pal not null
  @ViewChild(MatSort) sort!: MatSort; //para el ordenamiento
  @ViewChild('viewPremioDialog') viewPremioDialog!: TemplateRef<any>;

  ngOnInit(): void {
    this.loading = true;

    const forkJoinSub = forkJoin([
      this.api.getAllPremios(),
    ]).subscribe(([premios]) => {
      this.premios = premios;
      this.dataSource.data = this.premios;
      if (this.dataSource.data.length < 1) {
        Swal.fire({
          title: 'No hay premios registrados',
          text: 'No se encontraron premios en el sistema.',
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


  viewPremio(premio: PremioInterface): void {
    this.dialog.open(this.viewPremioDialog, {
      data: premio,
      width: '35%',
      height: 'auto',
    });
  }

  editPremio(id: any) {
    this.loading = true;
    this.router.navigate(['premios/edit-premio', id]);
  }

  newPremio() {
    this.loading = true;
    this.router.navigate(['premios/new-premio']);
  }

  deletePremio(id: any): void {
    Swal.fire({
      icon: 'question',
      title: '¿Estás seguro de que deseas eliminar este premio?',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      reverseButtons: true,
      denyButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isDenied) {
        this.loading = true;
        this.api.deletePremios(id).subscribe(
          data => {
            if (data.status == 'ok') {
              this.premios = this.premios.filter(premio => premio.idPremio !== id);
              this.dataSource.data = this.premios; // Actualizar el dataSource con los nuevos datos
              Swal.fire({
                icon: 'success',
                title: 'Premio eliminado',
                text: 'El premio ha sido eliminado exitosamente.',
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
