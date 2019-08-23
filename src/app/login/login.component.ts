import { Component } from '@angular/core';
import { UserLogin } from './login.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginFailed: boolean = false;
  loginFormGroup: FormGroup = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
  constructor(private fb: FormBuilder,
    private loginService: LoginService, 
    private router: Router) {
   }
  login(userLogin: UserLogin){
    this.loginService.login(userLogin)
      .subscribe(result => {
        if (result.status == 200) 
          this.router.navigate(['/dashboard']);
        else
          this.loginFailed = true;
      },
      error => {
        console.log('login error: ', error);
        this.loginFailed = true;
      });
  }
}
