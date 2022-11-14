import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserRegistrationData } from 'src/app/model/user-registration.model';
import { ConfirmedValidator } from 'src/app/services/confirmed-validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  successAlert = false;
  failureAlert = false;
  isValidEmail = false;
  isValidFirstname = false;
  isValidLastname = false;
  isValidPwd1 = false;
  isValidPwd2 = false;

  pwd2 = new FormControl();
  formValue!: FormGroup
  userRegistrationModelObj: UserRegistrationData = new UserRegistrationData;
  constructor(private formBuilder: FormBuilder, private api: UserService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z.]+$')]],
      password: ['',[Validators.required, Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{5,}'
          ), Validators.minLength(5)]],
      password2: ['', [Validators.required]]
    },
    {
      validators: ConfirmedValidator('password', 'password2'),
    })
}

get f() {
  return this.formValue.controls;
}

userRegister() {
  if (this.formValue.value.email.trim() == '' || this.formValue.value.email == null) {
    this.isValidEmail = true;
    setTimeout(() => {
      this.isValidEmail = false;
    }, 3000);
    //alert('email is required');
    return;
  }
  if (this.formValue.value.firstname.trim() == '' || this.formValue.value.firstname == null) {
    this.isValidFirstname = true;
    setTimeout(() => {
      this.isValidFirstname = false;
    }, 3000);
    //alert('firstname is required');
    return;
  }
  if (this.formValue.value.lastname.trim() == '' || this.formValue.value.lastname == null) {
    this.isValidLastname = true;
    setTimeout(() => {
      this.isValidLastname = false;
    }, 3000);
    //alert('lastname is required');
    return;
  }
  if (this.formValue.value.password.trim() == '' || this.formValue.value.password == null) {
    this.isValidPwd1 = true;
    setTimeout(() => {
      this.isValidPwd1 = false;
    }, 3000);
    //alert('Password is required');
    return;
  }
  if (this.formValue.value.password2.trim() == '' || this.formValue.value.password2 == null) {
    this.isValidPwd2 = true;
    setTimeout(() => {
      this.isValidPwd2 = false;
    }, 3000);
    //alert('Password is required');
    return;
  }

  this.userRegistrationModelObj.email = this.formValue.value.email;
  this.userRegistrationModelObj.firstname = this.formValue.value.firstname;
  this.userRegistrationModelObj.lastname = this.formValue.value.lastname;
  this.userRegistrationModelObj.password = this.formValue.value.password;

  this.api.postUser(this.userRegistrationModelObj).subscribe(res => {
    console.log(res);
    this.successAlert = true;
    setTimeout(() => {
      this.successAlert = false;
    }, 2000);
    //alert("User added successfully!");
    this.formValue.reset();
  },
    err => {
      this.failureAlert = true;
      setTimeout(() => {
        this.failureAlert = false;
      }, 2000);
      //alert("Failed in adding!");
    })
  }

  closeSuccessAlert() {
    this.successAlert = false;
  }

  closeFailureAlert() {
    this.failureAlert = false;
  }
}
