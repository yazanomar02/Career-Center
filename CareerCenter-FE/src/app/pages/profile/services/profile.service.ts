import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { Observable } from "rxjs";
import { Provider } from "src/app/core/models/provider";
import { EditProvider } from "../components/edit-provider/edit-model";

@Injectable({
    providedIn: 'root'
})

export class ProfileService {
    /**
     *
     */
    constructor(private http:HttpClient) {}

    getMyServices(id: string): Observable<Provider[]> {
        return this.http.get<Provider[]>(`${environment.apiUrl}provider/user/${id}`);  
    }
    updateMyService(id: string, model:EditProvider) {
        return this.http.put(`${environment.apiUrl}provider/${id}`,model)
    }
    patchMyService(id: string, value: boolean) {
       
        return this.http.patch(`${environment.apiUrl}provider/${id}`, [
            {
              "path": "IsDeleted",
              "op": "replace",
              "value": value
            }
        ]);
    }
    deleteMyService(id: string) {
        return this.http.delete(`${environment.apiUrl}provider/${id}`);
    }

    updateProject(id : any ,updateProject : any) {
        return this.http.put(`${environment.apiUrl}project/${id}`,updateProject);
    }
    deleteProject(id : string ) {
       
        return this.http.delete(`${environment.apiUrl}project/${id}`);

    }
    updateJob(id : any , updateJob : any) {
      console.log(updateJob)
        return this.http.put(`${environment.apiUrl}job/${id}`,updateJob );
    }
    deleteJob(id : string ) {
       
        return this.http.delete(`${environment.apiUrl}job/${id}`);

    }


      getProjects(): Observable<any> {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });
    
        const params = {
          pageNumber:1,
          pageSize: 10,
        };
    
        // https://localhost:7015/api/project?pageNumber=1&pageSize=5
        //return this.http.get<Project[]>(`${environment.apiUrl}project?pageNumber=${pageNum}&pageSize=${pageSize}`);
        return this.http.get<any>(`${environment.apiUrl}project`, { headers, params, observe: 'response' });
      }
      getJobs(): Observable<any> {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });
    
    
    
        // https://localhost:7015/api/project?pageNumber=1&pageSize=5
        //return this.http.get<Project[]>(`${environment.apiUrl}project?pageNumber=${pageNum}&pageSize=${pageSize}`);
        return this.http.get<any>(`${environment.apiUrl}job`, { headers, observe: 'response' });
      }
}