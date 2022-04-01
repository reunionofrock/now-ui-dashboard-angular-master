import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Local } from 'protractor/built/driverProviders';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
   private api: ApiService,
   private router: Router,
  ) { }

  getSession(session: any){
   if(session === 1){
    return false;
   }else{
     return true;
   }

  }
}
