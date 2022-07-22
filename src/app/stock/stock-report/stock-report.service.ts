import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { HandleError, HttpErrorHandler } from "src/app/http-error-handler.service";
import { Stock } from "src/app/core/models/stock.model";
import { environment } from "src/environments/environment";
const reportApi=environment.Report_API
const httpheader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
})

@Injectable()
export class StockReportService {
    private handleError: HandleError;
    constructor(
        private http: HttpClient,
        httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('StockReportService');
    }
    searchStock(compCode: string): Observable<Stock[]> {
        let uri=`${reportApi}/api/get-stock-balance`
        let httpParams=new HttpParams().set('compCode',compCode)
        let httpOption={headers:httpheader,params:httpParams}
        return this.http.get<Stock[]>(uri, httpOption)
    }
}
