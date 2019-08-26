import { Component, OnInit, ViewChild } from '@angular/core';
import { UserLogin } from './login.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
  loginFailed: boolean = false;
  loading: boolean = false;
  
  constructor(private fb: FormBuilder,
    private loginService: LoginService, 
    private router: Router) {
   }
   ngOnInit() {
    this.loginService.logout();
   }
  login(userLogin: UserLogin){
    this.loading = true;
    this.loginService.login(userLogin)
      .subscribe(user => {
        if (user && user.token){
          localStorage.setItem('currentUser', JSON.stringify(user)); 
          this.router.navigate(['/dashboard']);
        }
        else
          this.loginFailed = true;
          this.loading = false;
      },
      error => {
        console.log('login error: ', error);
        this.loginFailed = true;
        this.loading = false;
      });
  }
}
