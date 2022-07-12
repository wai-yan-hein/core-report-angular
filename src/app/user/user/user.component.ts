
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from './user';
import { UserService } from './user.service';
import { DialogComponent } from 'src/app/dialog/dialog.component';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User = null;
  hide = true;
  loading = false;
  
  email = new FormControl('', [Validators.required, Validators.email]);
  userName = new FormControl('', [Validators.required, Validators.required]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  constructor(private userService: UserService, public dialog: MatDialog) { }

  openDialog(message: string) {
    this.dialog.open(DialogComponent, {
      width: "200px",
      height: "200px",
      data: {
        dataKey: message
      }
    });
  }

  ngOnInit(): void {
    this.newUser();
  }


  //add or edit User

  save() {
    console.log("before save :" + JSON.stringify(this.user))
    this.userService.saveUser(this.user).subscribe({
      next: (v) => console.log(v),
      error: (e) => this.openDialog(e.error.text),
      complete: () => this.newUser()
    })
  }
  newUser() {
    this.user = {
      userCode: null,
      userName: null,
      shortName: null,
      password: null,
      phone: null,
      email: null,
      active: true
    }
  }

}