import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users:User[]=[]
  displayedColumns:string[]=["position","code","name","shortname","phone","email","active","action"]
  dataSource!:MatTableDataSource<User>
  constructor(private route:Router,private userService:UserService) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    this.userService.getUser().subscribe(users=>{
      console.log(users)
      this.dataSource=new MatTableDataSource(users)
    })
  }

  getRowData(row:any){
    this.route.navigate(['/user-setup'])
    this.userService._user=row
  }

}
