
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
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
  user!: User

  userCode: string = ''
  status: string = ''
  hide = true;
  loading = false;
  @ViewChild('reactiveForm', { static: true }) reactiveForm: NgForm
  constructor(private route: Router, private userService: UserService, public dialog: MatDialog) {
    this.user = {} as User;
  }

  //user Form
  userForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.required]),
    shortName: new FormControl(''),
    password: new FormControl('', Validators.required),
    phone: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    active: new FormControl(true),
  })

  ngOnInit(): void {
    this.status = "NEW"
    if (this.userService._user != undefined) {
      this.user = this.userService._user
      this.userCode = this.user.userCode
      this.status = "EDIT"
      this.initializeUserForm(this.user);
    }
  }

  //initialize form with data on edit
  initializeUserForm(user: User) {
    this.userForm.setValue({
      userName: user.userName,
      shortName: user.shortName,
      password: user.password,
      phone: user.phone,
      email: user.email,
      active: user.active,
    });
  }

  //dialog for error
  openDialog(message: string) {
    this.dialog.open(DialogComponent, {
      width: "200px",
      height: "200px",
      data: {
        dataKey: message
      }
    });
  }

  //add or edit User
  save(data: any) {
    data.userCode = this.userCode
    data.status = this.status
    console.log(this.user)
    this.userService.saveUser(data).subscribe({
      next: (v) => {
        if (v.userCode != undefined) {
          this.userService._users.push(v)
        }
      },
      error: (e) => this.openDialog(e.error.text),
      complete: () => {
        this.userCode = ''
        this.onClear()
        this.userService._user = undefined
      }
    })
  }

  //clear data
  onClear() {
    //this.userForm.reset();
    this.clearUser(this.userCode)
    this.reactiveForm.resetForm();
  }

  //clear user form
  clearUser(id: string) {
    this.userForm.reset();
    this.user = {} as User
    this.userCode = id
    this.userService._user = undefined
  }

  //back to list
  backToList() {
    this.userCode = ''
    this.onClear()
    this.userService._user = undefined
    this.route.navigate(['/user'])
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

  getErrorMessage() {
    // if (this.email.hasError('required')) {
    //   return 'You must enter a value';
    // }

    // return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}