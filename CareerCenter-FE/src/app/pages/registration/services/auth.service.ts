import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignIn } from '../../../core/models/signin';
import { environment } from '../../../../environments/environment.development';
import { EMPTY, EmptyError, Observable, catchError } from 'rxjs';
import { SignUp } from '../../../core/models/signup';
import { Role } from 'src/app/core/models/role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private http:HttpClient) {
   }

   signUp(model:SignUp): Observable<any> {
      return this.http.post(environment.apiUrl+'auth/register',model);
   }

   signIn(model:SignIn): Observable<any> {
      return this.http.post(environment.apiUrl+'auth/login',model);
   }
   addRole(model:Role): Observable<any> {
      return this.http.post(environment.apiUrl+'auth/addrole',model);
   }
}
