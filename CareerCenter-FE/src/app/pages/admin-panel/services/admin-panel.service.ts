import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../utilities/userVm';
import { Audit } from '../utilities/audit';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  /**
   *
   */
  constructor(private http: HttpClient) {}

  users$ = this.http.get<User[]>(`${environment.apiUrl}users`);
  audits$ = this.http.get<Audit[]>(`${environment.apiUrl}auditing`);

  getUsers(): Observable<any> {
    return this.http.get<User[]>(`${environment.apiUrl}users`);
  }
  auditing(error: HttpErrorResponse) {
    const auditObject = {
      id: '0',
      userId: `${localStorage.getItem('userId')}`,
      status: `${error.status}`,
      message: `${error.message}`,
      url: `${error.url}`,
      createdDate: `${new Date()}`,
    };
    var auditWithoutId = new Audit(auditObject);
    //const { id, ...auditWithoutId } = audit;

    // auditWithoutId.userId = `${localStorage.getItem('userId')}`;
    // auditWithoutId.CreatedDate = `${new Date()}`;
    // auditWithoutId.Status = `${error.status}`;
    // auditWithoutId.Message = `${error.message}`;
    // auditWithoutId.Url = `${error.url}`;

    return this.http.post(`${environment.apiUrl}auditing`, auditWithoutId);
  }

  getRole(id: string): Observable<string> {
    return this.http.get<string>(`${environment.apiUrl}get-role/${id}`, {
      responseType: 'text' as 'json',
    });
  }

  deleteUser(id: string) {
    return this.http.delete(`${environment.apiUrl}delete/${id}`, {
      responseType: 'text',
    });
  }
  addRole(id: string) {
    return this.http.post(
      `${environment.apiUrl}add-role`,
      {
        userID: id,
        role: 'Admin',
      },
      { responseType: 'text' }
    );
  }
  deleteRole(id: string, role: string) {
    return this.http.post(
      `${environment.apiUrl}remove-role`,
      {
        userID: id,
        role: role,
      },
      { responseType: 'text' }
    );
  }
}
