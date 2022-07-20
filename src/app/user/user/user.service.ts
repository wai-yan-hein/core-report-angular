import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, map, observable } from "rxjs";
import { HandleError, HttpErrorHandler } from "src/app/http-error-handler.service";
import { environment } from "src/environments/environment";
import { User } from "./user";
const reportApi = environment.Report_API;
const httpHeader = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
})
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject!: BehaviorSubject<User>;
  public user!: Observable<User>
  _user!:User
  _users:User[]=[]
  constructor(private route:Router,private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')))
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  //login User
  loginUser(user: User):Observable<User> {
    let uri = `${reportApi}/api/login`
    console.log(uri)
    let httpOption = { headers: httpHeader }
    return new Observable(observable=>{
      this.http.post<User>(uri, user, httpOption).subscribe((_user: User) => {
        localStorage.setItem('user', JSON.stringify(_user));
        this.userSubject.next(_user);
        observable.next(_user)
        observable.complete()
      })
    })
    
    // return this.http.post<User>(uri,user,httpOption).pipe(map(user=>{
    //   // let userData=
    //   // {
    //   //   userCode: '',
    //   //   userName: '',
    //   //   shortName: '',
    //   //   password: '',
    //   //   phone: '',
    //   //   email: '',
    //   //   active: false,
    //   // }
    //   localStorage.setItem('user',JSON.stringify(user));
    //   this.userSubject.next(user);
    // }))
  }

  //logout user
  LogoutUser() {
    localStorage.removeItem('user')
    this.userSubject.next(null)
    this.route.navigate(['/login'])
  }

  //get User
  getUser():Observable<User[]>{
    return new Observable(observable=>{
      if(this._users.length>1){
        observable.next(this._users)
        return observable.complete()
      }
      let uri=`${reportApi}/api/get-user`
      let httpOption={headers:httpHeader}
      this.http.get<User[]>(uri,httpOption).subscribe(users=>{
        this._users=users
        observable.next(users)
        observable.complete()
      })
    })
   }

  //add or edit User
  saveUser(user: User): Observable<User> {
    let uri = `${reportApi}/api/save-user`
    let httpOption = { headers: httpHeader }
    return this.http.post<User>(uri, user, httpOption);
  }
}
