import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginData } from 'src/app/model/user-login.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  successAlert = false;
  failureAlert = false;
  isValidEmail = false;
  isEmailExact = false;
  isValidPwd = false;

  formValue!: FormGroup
  userObj: UserLoginData = new UserLoginData;
  constructor(private formBuilder: FormBuilder, private api: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      username: ['',[Validators.email]],
      password: ['',[Validators.minLength(6)]]
    })
  }

  validEmail(mail:any) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
    }
    //alert("Invalid email address!")
    return false;
  }


  userLogin() {
    if (this.formValue.value.username.trim() == '' || this.formValue.value.username == null) {
      this.isEmailExact = false;
      this.isValidPwd = false;
      this.isValidEmail = true;
      // alert('Username is required');
      return;
    }

    if (this.formValue.value.password.trim() == '' || this.formValue.value.password == null) {
      this.isValidEmail = false;
      this.isEmailExact = false;
      this.isValidPwd = true;
      //alert('Password is required');
      return;
    }

    if(this.validEmail(this.formValue.value.username) == false ) {
      this.isValidEmail = false;
      this.isValidPwd = false;
      this.isEmailExact = true;
      return;
    }

    this.userObj.username = this.formValue.value.username;
    this.userObj.password = this.formValue.value.password;

    this.api.generateToken(this.userObj).subscribe(
      (data: any) => {
       // this.successAlert = true;
       //  console.log('success');
        console.log(data);

        this.api.loginUser(data.token);

        this.api.getCurrentUser().subscribe(
          (user: any) => {
            this.api.setUser(user);
            console.log(user);
            this.router.navigate(['products']);
          }
        );
      }, (err) => {
        console.log('Error');
        console.log(err);
        this.isValidEmail = false;
        this.isValidPwd = false;
        this.failureAlert = true;
         this.isEmailExact = false;
        //alert('Invalid Details')
      }
    );


    // this.api.postUser(this.userObj).subscribe(res=>{
    //   console.log(res);
    //   alert("User added successfully!");
    //   this.formValue.reset();
    // }, 
    // err=>{
    //   alert("Failed in adding!");
    // }) 
  }


  closeSuccessAlert() {
    this.successAlert = false;
  }

  closeFailureAlert() {
    this.failureAlert = false;
    this.isValidPwd = false;
    this.isValidEmail = false;
    this.isEmailExact = false;
  }


}
