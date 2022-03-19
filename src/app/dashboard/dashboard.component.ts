import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import Swal from "sweetalert2";
import { FormularioEmpleadoComponent } from "../formulario-empleado/formulario-empleado.component";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  constructor(public dialog: MatDialog, private api: ApiService) {}

  dataSource: any;

  ngOnInit(): void {
    this.updateTable();
  }
  updateTable() {
    this.api.get("reporte-vacunados").subscribe((data) => {
      if (Array.isArray(data)) {
        this.dataSource = data;
      } else {
        this.dataSource.push(data);
      }
    });
  }
  title = "prueba-tecnica";

  data: any;

  displayedColumns: string[] = [
    "Nombre",
    "Puesto_Laboral",
    "Nombre_Vacuna",
    "Fecha_primera_dosis",
    "Fecha_segunda_dosis",
    "Estado_de_vacunacion",
  ];

  openEmployeeForm() {
    let dialogRef = this.dialog
      .open(FormularioEmpleadoComponent, {
        height: "auto",
        width: "550px",
      })
      .afterClosed()
      .subscribe(() => {
        this.updateTable();
      });
  }
}
