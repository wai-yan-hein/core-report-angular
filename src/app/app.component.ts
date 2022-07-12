import { Component,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sideNav:boolean=false
  @ViewChild('sidenav') isSideNav!:ElementRef
  title = 'cv-report-angular';


  isOpened(){
   this.sideNav=!this.sideNav
   //console.log(this.sideNav)
  }
}


