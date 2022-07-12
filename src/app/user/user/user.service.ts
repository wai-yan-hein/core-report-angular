import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { HandleError, HttpErrorHandler } from "src/app/http-error-handler.service";
import { User } from "./user";

const httpheader = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
})
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private handleError: HandleError;
  constructor(private http: HttpClient) { }

  //get User
  getUser() { }

  //add or edit User
  saveUser(user: User): Observable<User> {
    let uri = `http://localhost:100/api/save-user`
    let httpOption = { headers: httpheader }
    return this.http.post<User>(uri, user, httpOption);
  }
}
