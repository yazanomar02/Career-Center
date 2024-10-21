import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Job } from './job-vm';
import { environment } from 'src/environments/environment.development';
import { Category } from 'src/app/core/models/category';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  
  constructor(private http: HttpClient) { }


  categories$ = this.http.get<Category[]>(environment.apiUrl+"Category");
  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${environment.apiUrl}job`);
  }
  postJob(id : any , newJob: any) {
    return this.http.post(`${environment.apiUrl}category/${id}/job`,newJob);
  }
  
 
}
