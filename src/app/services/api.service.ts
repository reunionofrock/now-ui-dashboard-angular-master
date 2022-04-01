import { HttpClient, HttpHeaders } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get(url: string, options?: any) {
    if (options) return this.http.get(`${environment.apiUrl}/${url}`, options);
    return this.http.get(`${environment.apiUrl}/${url}`);
  }
  put(url: string, payload?: any, options?: any) {
    if (options)
      return this.http.put(`${environment.apiUrl}/${url}`, payload, options);
    return this.http.put(`${environment.apiUrl}/${url}`, payload);
  }
  post(url: string, payload?: any, options?: any) {
    if (options)
      return this.http.post(`${environment.apiUrl}/${url}`, payload, options);
    return this.http.post(`${environment.apiUrl}/${url}`, payload);
  }
  delete(url: string, payload?: any) {
    return this.http.delete(`${environment.apiUrl}/${url}`, payload);
  }
  getFile(url: string, options: any = { responseType: 'blob' }) {
    return this.http.get(`${environment.apiUrl}/${url}`, options);
  }

  
  getReport(url: string, options: any = { responseType: 'blob' }) {
    return this.http.get(`${environment.reportUrl}/${url}`, options);
  }

  postReport(
    url: string,
    payload?: any,
    options: any = { responseType: 'blob' }
  ) {
    return this.http.post(`${environment.reportUrl}/${url}`, payload, options);
  }

  apiSoap(data: any){
    var headers = new HttpHeaders().set('Content-Type','text/xml');
    return this.http.post(`${environment.apiSoap}`, data,
    {headers,responseType:'text'})
    .pipe(map((res:any)=>res));
  }
}
