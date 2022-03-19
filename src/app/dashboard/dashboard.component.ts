import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { FormularioEmpleadoComponent } from '../formulario-empleado/formulario-empleado.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
  }

  constructor(public dialog: MatDialog) {}
  title = 'prueba-tecnica';

  data: any;
  dataSource: [] = [];
  displayedColumns: string[] = [
    'Nombre',
    'Puesto_Laboral',
    'Nombre_Vacuna',
    'Fecha_primera_dosis',
    'Fecha_segunda_dosis',
    'Estado_de_vacunacion',
  ];

  openEmployeeForm() {
    let dialogRef = this.dialog
      .open(FormularioEmpleadoComponent, {
        height: 'auto',
        width: '550px',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.data = result;
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: '#EAFAF1',
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: 'success',
            title: 'Empleado agregado',
          });
        }else{
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: 'error',
            title: 'El empleado no fue agregado',
            text: 'Porque no se completo la informacion necesaria'
          });
        }
      });
  }
}

