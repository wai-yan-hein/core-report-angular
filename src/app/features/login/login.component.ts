import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { User } from 'src/app/user/user/user';
import { UserService } from 'src/app/user/user/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user!:User
  constructor(private route:Router,private userService:UserService) { 
    this.user={} as User
  }
  loginForm=new FormGroup({
    shortname:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  })

  ngOnInit(): void {

  }

  onLoginSubmit(){
    const UserData={
      shortName:this.user.shortName,
      password:this.user.password
    }
    console.log(this.user)
    this.userService.loginUser(this.user).subscribe(userData=>{
      console.log("Login Success"+JSON.stringify(userData));
    });
    this.route.navigate(['/']);
  }

}
