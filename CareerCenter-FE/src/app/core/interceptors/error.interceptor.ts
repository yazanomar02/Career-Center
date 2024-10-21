import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { EMPTY, Observable, catchError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/pages/admin-panel/services/admin-panel.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private adminService: AdminService,
              private router:Router,
              private toastr: ToastrService,) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse) => {
        this.toastr.error(error.message)
        if(error.message.includes("jwt expired") || error.message.includes("must provided")) {
          this.router.navigate(['/welcome'])
        }
        throw error;
      })
    )
  }
}
