import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import Swal from "sweetalert2";
import { FormularioEmpleadoComponent } from "../formulario-empleado/formulario-empleado.component";
import { ApiService } from "../services/api.service";
import { NgxSoapService, Client, ISoapMethodResponse } from "ngx-soap";
import { RemoveText } from "../services/remove_text.service";
import { MatTableDataSource } from "@angular/material/table";
import { SessionService } from "../services/session.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private removeText: RemoveText,
    private status: SessionService,
    private router: Router
  ) {
    let session = localStorage.getItem("session");
    if (session !== null) {
      let response = this.status.getSession(session);
      if (response === false) {
        this.router.navigate([""]);
      }
    }else{
      this.router.navigate([""]);
    }
  }

  numeroGregoriano: any;
  nummeroRomanoResponse: any;
  displayedColumns = [
    "age",
    "birthdate",
    "gender",
    "name",
    "middleName",
    "nit",
    "status",
  ];
  dataSource = new MatTableDataSource<any>();
  ngOnInit(): void {
  
    
  }

  getRomanNumber() {
    if (this.numeroGregoriano !== null || this.numeroGregoriano !== undefined) {
      if (this.numeroGregoriano > 0) {
        this.api
          .get("calculateRomanNumber/" + `${this.numeroGregoriano}`, {
            responseType: "text",
          })
          .subscribe((res: any) => {
            if (res !== "") {
              this.nummeroRomanoResponse = res;
            } else {
              Swal.fire(
                "Aviso",
                "El numero ingresado no existe en la tabla de valores",
                "warning"
              );
            }
          });
      }
    }
  }

  listNits() {
    const varToPost =
      '<S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">' +
      "<S:Body>" +
      '<ns0:listarNitValidosResponse xmlns:ns0="http://claro.com/">' +
      "<empleados>" +
      "<return>" +
      "<age>23</age>" +
      "<birthdate>22/05/1998</birthdate>" +
      "<gender>Male</gender>" +
      "<middleName>Natareno</middleName>" +
      "<name>David</name>" +
      "<nit>100598455</nit>" +
      "<res>correcto</res>" +
      "</return>" +
      "<return>" +
      "<age>57</age>" +
      "<birthdate>22/05/1964</birthdate>" +
      "<gender>N/A</gender>" +
      "<middleName>SOCIEDAD ANÓNIMA</middleName>" +
      "<name>EASY &amp; READY</name>" +
      "<nit>47182156</nit>" +
      "<res>correcto</res>" +
      "</return>" +
      "<return>" +
      "<age>30</age>" +
      "<birthdate>22/05/1991</birthdate>" +
      "<gender>N/A</gender>" +
      "<middleName>SOCIEDAD ANÓNIMA</middleName>" +
      "<name>ACEROS PREFABRICADOS</name>" +
      "<nit>11088</nit>" +
      "<res>correcto</res>" +
      "</return>" +
      "<return>" +
      "<age>64</age>" +
      "<birthdate>22/05/1857</birthdate>" +
      "<gender>N/A</gender>" +
      "<middleName>SOCIEDAD ANÓNIMA</middleName>" +
      "<name>BERTOLINI GUATEMALA</name>" +
      "<nit>60031123</nit>" +
      "<res>correcto</res>" +
      "</return>" +
      "<return>" +
      "<age>57</age>" +
      "<birthdate>22/05/1964</birthdate>" +
      "<gender>Female</gender>" +
      "<middleName>Flores</middleName>" +
      "<name>Andy</name>" +
      "<nit>38833905</nit>" +
      "<res>correcto</res>" +
      "</return>" +
      "</empleados>" +
      "</ns0:listarNitValidosResponse>" +
      "</S:Body>" +
      "</S:Envelope>";

    let data = this.convertXML(varToPost);
    this.dataSource.data = Object.values(data);
    this.dataSource.data = [...this.dataSource.data];

    //  this.api.apiSoap(varTopost).subscribe((res) =>{
    //    let data = res
    //  });
  }
  convertXML(xml: any) {
    var convert = require("xml-js");
    var options = {
      compact: true,
      trim: true,
      ignoreDeclaration: true,
      ignoreInstruction: true,
      ignoreAttributes: true,
      ignoreComment: true,
      ignoreCdata: true,
      ignoreDoctype: true,
      textFn: this.removeText.RemoveJsonTextAttribute,
    };
    // var result = convert.xml2json(xml, options);
    let start = xml.indexOf("<empleados>");
    let end = xml.indexOf("</empleados>");
    var newResutl = xml.substring(start, end);
    let jsonResponse: any = convert.xml2js(newResutl, options);
    let { empleados, ...rest } = jsonResponse.empleados.return;
    return rest;
  }

  logOut2(){
    this.router.navigate([""]);
  }
  logOut() {
    let user = localStorage.getItem("user");
    let secret = localStorage.getItem("secret");
    this.api.get("user/logout/" + user + "/" + secret).subscribe(
      (res) => {
        if (res !== null) {
          localStorage.removeItem("user");
          localStorage.removeItem("secret");
          localStorage.removeItem("session");
          this.router.navigate([""]);
        } else {
          localStorage.removeItem("user");
          localStorage.removeItem("secret");
          localStorage.removeItem("session");
          this.router.navigate([""]);
        }
      },
      (error: any) => {
        localStorage.removeItem("user");
        localStorage.removeItem("secret");
        localStorage.removeItem("session");
        this.router.navigate([""]);
      }
    );
  }
  
}
