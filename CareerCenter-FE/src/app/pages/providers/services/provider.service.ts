import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Category } from '../../../core/models/category';
import { Service } from '../../../core/models/service';
import { environment } from '../../../../environments/environment.development';
import { ProviderRegister } from '../../../core/models/provider-register';
import { Provider } from '../../../core/models/provider';


@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http:HttpClient) { }

  categories$ = this.http.get<Category[]>(environment.apiUrl+"Category").pipe(
    catchError(this.errorHandle)
  );

  getServicesList(): Observable<Service[]> {
    return this.http.get<Service[]>(`${environment.apiUrl}service`);
  }
  
  getProvidersList(): Observable<Provider[]> {
    return this.http.get<Provider[]>(`${environment.apiUrl}provider`).pipe(
      map(providers => providers.map(provider =>(
        {
            ...provider,
            imgUrl: 'helpers/' + provider.imgUrl?.split('\\')[provider.imgUrl?.split('\\').length - 1]
            
        } as Provider
      )))
    );
  }
  
  servicesByCategoryId$ = (id: string) => this.http.get(environment.apiUrl+`${id}/service`).pipe(
    catchError(this.errorHandle)
  );

  providersByServicId$ = this.http.get("").pipe(
    catchError(this.errorHandle)
  )

  addProvider(id : any, model:ProviderRegister)  {
    return this.http.post(`${environment.apiUrl}service/${id}/provider`,model)
  } 


  errorHandle(err: HttpErrorResponse){
    let msg : string = '';
    // Client Side Or Network
    if(err.error instanceof ErrorEvent)
        msg = `front end error side, please try agin ${err.error.message}`;
    else 
        msg = `server side error, status code = ${err.status} please try agin ${err.message}`;

    return throwError(() => msg);
  }

}
