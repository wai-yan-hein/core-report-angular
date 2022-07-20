import { Component, OnInit, ViewChild, ElementRef,Output } from '@angular/core';
import { UserService } from '../user/user/user.service';
import { LayoutService } from './layout.service';
@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css']
})
export class LayoutsComponent implements OnInit {
  sideNav: boolean = false
  @ViewChild('sideNav') isSideNav!: ElementRef
  @Output() isLoading:boolean=false
  constructor(private userService: UserService,public layoutService:LayoutService) {
    this.isLoading=this.layoutService.isLoading
   }

  ngOnInit(): void {
    this.userService.userValue
  }

  isOpened() {
    this.sideNav = !this.sideNav
  }

  logoutted() {
    this.userService.LogoutUser();
  }

}
