import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../user/user/user.service';
@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css']
})
export class LayoutsComponent implements OnInit {
  sideNav: boolean = false
  @ViewChild('sideNav') isSideNav!: ElementRef
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.userValue
  }

  isOpened() {
    this.sideNav = !this.sideNav
    console.log(this.sideNav)
  }

  logoutted() {
    this.userService.LogoutUser();
  }

}
