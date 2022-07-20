import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Region } from '../../models/region.model';
const httpHeader = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
})
const reportApi = environment.Report_API
@Injectable({
  providedIn: 'root'
})
export class RegionService {
  _region: Region
  _regions: Region[] = []
  constructor(private http: HttpClient) { }

  //get all region
  getRegion(): Observable<Region[]> {
    return new Observable(observable => {
      if (this._regions.length > 1) {
        observable.next(this._regions)
        return observable.complete()
      }
      let uri = `${reportApi}/api/get-region`
      let httpOption = { headers: httpHeader }
      this.http.get<Region[]>(uri, httpOption).subscribe(regions=>{
        this._regions=regions
        observable.next(regions)
        observable.complete()
      })
    })

  }

  //add or edit Region
  saveRegion(region: Region):Observable<Region>{
    let uri = `${reportApi}/api/save-region`
    let httpOption = { headers: httpHeader }
    return this.http.post<Region>(uri, region, httpOption)
  }

}
