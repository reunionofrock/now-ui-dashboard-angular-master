import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-formulario-empleado',
  templateUrl: './formulario-empleado.component.html',
  styleUrls: ['./formulario-empleado.component.scss']
})
export class FormularioEmpleadoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FormularioEmpleadoComponent>,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  employeePosition: any;
  vaccineApplicate: any;
  nameEmployee: string ="";
  dateFVaccine: string ="";
  dateSVaccine: string = "";
  sourceVacunas:any;
  sourcePuestos:any;
  // datadialog ={
  //   name: this.name,
  //   puesto: this.puestos
  // }
  
  ngOnInit(): void {
    this.api.get('obtener-vacunas').subscribe(data =>{
      this.sourceVacunas = data;
    })
    
    this.api.get('reporte-puesto').subscribe(data =>{
      this.sourcePuestos = data;
    })
    
  }
  
  validateForm(){
    if(this.nameEmployee ==="" ||this.nameEmployee === undefined){
      Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debes ingresar el nombre del empleado',
          })
          return;
    }
     if(this.employeePosition === null || this.employeePosition ==="" || this.employeePosition === undefined){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes elegir el puesto del empleado',
      })
      return;
    }
    if(this.vaccineApplicate === null || this.vaccineApplicate ==="" ||this.vaccineApplicate === undefined && this.flagVaccine === true){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes elegir la vacuna administrada',
      })
      return;
    }
     if(this.dateFVaccine ==="" && this.flag1calendar === true && this.flagVaccine === true){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes elegir la fecha de la primea dosis',
      })
      return;
    }
    else if( this.dateSVaccine ===""  && this.flag2calendar === true && this.flagVaccine === true){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes elegir la fecha de la segunda dosis',
      })
      return;
    }
      this.agregarUsuario()
    
  }
  agregarUsuario(){
    if(this.vaccineApplicate === undefined){
      this.vaccineApplicate = 7;
    }
    if(this.dateFVaccine==="" && this.dateSVaccine===""){
      
      this.dateFVaccine = new Date().toDateString();
      let estadovacuna = 0;
    }
    if(this.dateSVaccine !==""|| this.dateSVaccine===""){
      this.dateSVaccine = new Date().toDateString();
      let estadovacuna = 1;
    }

    if(this.dateSVaccine !==""|| this.dateSVaccine!==""){
      let estadovacuna = 1;
    }

   let datatoPost ={
      nombreEmpleado: this.nameEmployee,
      idPuesto: this.employeePosition,
      idVacuna: this.vaccineApplicate,
      fechaPrimerDosis: this.dateFVaccine,
      fechaSegundaDosis: this.dateSVaccine,
      estadoVacuna: 0
      }
    this.api.post('guardar-empleado', datatoPost).subscribe(datatoResponse =>{
      if(datatoResponse!=="Ha ocurrido un error en la inserción"){
        Swal.fire({
          icon: 'success',
          title: 'Felicidades',
          text: 'Datos ingresados con exito',
        })
        this.closeDialog();
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Algo salio mal',
        })
      }
      
    },(error: HttpErrorResponse) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algo salio mal',
      })
    })
    
  }

 flagVaccine: boolean = false;
  vaccine(value: any){
    if(value === 'yes'){
      this.flagVaccine = true;
      this.vaccineDossis("1");
    }
    if(value === 'no'){
      this.flagVaccine = false;
      this.vaccineDossis("2");
      this.flag1calendar = false;
      this.flag2calendar = false;
    }

  }
  flag1calendar: boolean = false;
  flag2calendar: boolean = false;
  dosisVaccine: string = "";
  vaccineDossis(dosis:string){
    this.dosisVaccine = dosis;
    if(dosis === "1"){
      this.flag1calendar = true;
      this.flag2calendar = false;
    }
    if(dosis==="2"){
      this.flag2calendar = true;
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
