import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  constructor() { }
  public isLoading:boolean=false

  public Loading(){
    if(this.isLoading){
      this.isLoading=false
    }else{
      this.isLoading=true
    }
    //this.isLoading=!this.isLoading
  }
}
