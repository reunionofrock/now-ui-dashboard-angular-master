import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-empleado',
  templateUrl: './formulario-empleado.component.html',
  styleUrls: ['./formulario-empleado.component.scss']
})
export class FormularioEmpleadoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FormularioEmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  name: string = "";
  puestos:[]=[];

  datadialog ={
    name: this.name,
    puesto: this.puestos
  }
  
  ngOnInit(): void {
  }

  agregarUsuario(){
    if(this.name!==""){
      this.dialogRef.close(this.datadialog);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes completar la informacion de empleado',
       
      })
    }
    
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
}
