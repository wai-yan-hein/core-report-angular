import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { HandleError, HttpErrorHandler } from "src/app/http-error-handler.service";
import { Stock } from "src/app/core/models/stock.model";
import { environment } from "src/environments/environment";
const reportApi = environment.Report_API
const httpheader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
})

@Injectable()
export class StockReportService {
    private handleError: HandleError;
    _stocks:Stock[]=[]
    constructor(
        private http: HttpClient,
        httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('StockReportService');
    }
    searchStock(compCode: string): Observable<Stock[]> {
        return new Observable(observable=>{
            if(this._stocks.length>1){
                console.log('service')
                observable.next(this._stocks)
                return observable.complete()
            }
            let uri = `${reportApi}/api/get-stock-balance`
            let httpParams = new HttpParams().set('compCode', compCode)
            let httpOption = { headers: httpheader, params: httpParams }
            console.log('api')
            this.http.get<Stock[]>(uri, httpOption).subscribe(stocks=>{
                this._stocks=stocks
                observable.next(stocks)
                observable.complete()
            })
        })
       
    }

    pinStock(data:any):Observable<Stock>{
        let uri=`${reportApi}/api/save-stock-pin`
        let httpOption={headers:httpheader}
        return this.http.post<Stock>(uri,data,httpOption)
    }


}
