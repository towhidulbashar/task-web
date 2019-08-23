import { Component } from '@angular/core';
import { UserLogin } from './login.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginFormGroup: FormGroup = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
  constructor(private fb: FormBuilder,
    private loginService: LoginService) {
   }
  login(userLogin: UserLogin){
    console.log('userlogin: ', userLogin);
    this.loginService.login(userLogin)
      .subscribe(result => {
        console.log('login result: ', result);
      },
      error => {
        console.log('login error: ', error);
      });
  }
}
