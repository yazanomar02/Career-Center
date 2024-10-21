import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Project } from './project';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }

  getProjects(pageNumber: number,pageSize: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const params = {
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    };

    // https://localhost:7015/api/project?pageNumber=1&pageSize=5
    //return this.http.get<Project[]>(`${environment.apiUrl}project?pageNumber=${pageNum}&pageSize=${pageSize}`);
    return this.http.get<any>(`${environment.apiUrl}project`, { headers, params, observe: 'response' });
  }

  addProject(newProject : any){
    return this.http.post(`${environment.apiUrl}project`,newProject);
  }
}
