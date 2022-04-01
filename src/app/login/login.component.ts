import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: string = "";
  userPassword = "";
  error = '';
  flagRegisterForm:boolean = false;
  nameRegister: string = "";
  nickNameRegister: string = "";
  emailRegister: string = "";
  passwordRegister: string = "";
  constructor(
    private router: Router,
    private authService: AuthService,
    private _cdr: ChangeDetectorRef,
    private api: ApiService,
    private status: SessionService
  ) { }

  ngOnInit(): void {
  
  }

  iniciarSesion(){
   
    this.api
        .get('user/login/'+this.user+'/'+this.userPassword)
        .subscribe(
          (res) => {
            if (res === 0) {  
             // const token = this.authService.currentUserValue.token;
              //if (token) {
               let response = '1';
              
                
                localStorage.setItem('user', this.user);
                localStorage.setItem('secret', this.userPassword);
                localStorage.setItem('session', response);
                this.status.getSession(response);
                this.router.navigate(['/dashboard']);
                
            } else if(res === 1) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ya existe otra session abierta',
              })
              this._cdr.detectChanges();
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Usuario no registrado',
              })
            }
          },
          (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Problemas con el servidor, intente de nuevo',
              })
              this._cdr.detectChanges();
          }
        );
  }

  showRegisterForm(){
    if(this.flagRegisterForm === false){
      this.flagRegisterForm = true;
    }else 
    if(this.flagRegisterForm === true){
      this.flagRegisterForm = false;
    }
    
  }

  registroUsuario(){

    let registerUser = {
      nombreUser: this.nameRegister,
      nickNameUser: this.nickNameRegister,
      emailUser: this.emailRegister,
      passwordUser: this.passwordRegister
    };
    this.api.post('user/register', registerUser).subscribe((res)=>{
      if(res === 0){
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'Usuario registrado con exito, inicie sesion',
        })
        this.flagRegisterForm = false;
        let respones = res;
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: 'Parece que el usuario ya existe',
        })
        this.flagRegisterForm = false;
      }
      
    },
    (error: any) =>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Problemas con el servidor, intente de nuevo',
      })
      this._cdr.detectChanges();
      this.flagRegisterForm = false;
    }
    )

  }



}
