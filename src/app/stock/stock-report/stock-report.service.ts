import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { HandleError, HttpErrorHandler } from "src/app/http-error-handler.service";
import { Stock } from "./stock";

const httpheader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
})

@Injectable()
export class StockReportService {
    url = 'http://localhost:8078/setup/get-stock';
    private handleError: HandleError;
    constructor(
        private http: HttpClient,
        httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('StockReportService');
    }
    //get
    //search
    searchStock(compCode: string, active: boolean): Observable<Stock[]> {
        const options =
        {
            headers: httpheader,
            params: new HttpParams()
                .set('compCode', compCode)
                .set('active', true),
        };
        return this.http.get<Stock[]>(this.url, options).pipe(
            catchError(this.handleError<Stock[]>('searchStock', []))
        );
    }
}
