import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Company } from '../../models/company.model';
import { environment } from 'src/environments/environment';
const reportApi=environment.Report_API
const httpHeaders=new HttpHeaders({
  'Content-Type':'application/json',
  'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Headers':'Content-Type',
  'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS'
})
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  _company:Company
  _companys:Company[]=[]
  constructor(private http:HttpClient) { }

  //get all company
  getCompany():Observable<Company[]>{
    return new Observable(observable=>{
      if(this._companys.length>1){
        observable.next(this._companys)
        console.log('service')
        return observable.complete()
      }
      let uri=`${reportApi}/api/get-company`
      let httpOption={headers:httpHeaders}
      console.log('api')
      this.http.get<Company[]>(uri,httpOption).subscribe(companys=>{
        this._companys=companys
        observable.next(companys)
        observable.complete()
      })
    });
  }

  //add or edit company
  saveCompany(company:Company):Observable<Company>{
    let uri=`${reportApi}/api/save-company`
    let httpOption={headers:httpHeaders}
    return this.http.post<Company>(uri,company,httpOption)
  }

}
