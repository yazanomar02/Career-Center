import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('login') || request.url.includes('register')) {
      return next.handle(request);
    }
    const localToken = localStorage.getItem('token');
    //
    const newRequest = request.clone({
      headers:request.headers.append('Authorization','Bearer'+localToken)
    })
    //
    
    // request = request.clone({
    //  headers:request.headers.set('Authorization','bearer'+localToken)})
    return next.handle(newRequest);
  }
}
