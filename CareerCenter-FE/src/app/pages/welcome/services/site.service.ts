import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";
import { UserComment } from "../utilities/user-comment";

@Injectable({
    providedIn: 'root'
})

export class SiteService {
    /**
     *
     */
    constructor(private http: HttpClient) {}

    getComments(): Observable<UserComment[]>{
        return this.http.get<UserComment[]>(`${environment.apiUrl}comment`);
    }

    addComment(model: UserComment) {
        return this.http.post(`${environment.apiUrl}comment`,model)
    }
}