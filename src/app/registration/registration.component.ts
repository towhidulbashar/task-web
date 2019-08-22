import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ApplicationUser } from './registration.model';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [MessageService, RegistrationService]
})
export class RegistrationComponent implements OnInit {
  userform: FormGroup;
  constructor(private fb: FormBuilder, 
    private messageService: MessageService,
    private registrationService: RegistrationService) { }

  ngOnInit() {
    this.buildForm();
  }
  private buildForm() {
    this.userform = this.fb.group({
      'firstName': ['', [Validators.required, Validators.maxLength(256), this.whiteSpaceValidator]],
      'lastName': ['', [Validators.required, Validators.maxLength(256), this.whiteSpaceValidator]],
      'email': ['', [Validators.required,
      Validators.maxLength(256),
      Validators.email,
      Validators.pattern(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/),
      this.whiteSpaceValidator]
      ],
      'password': ['', [Validators.required, Validators.minLength(4)]],
      'retypePassword': ['', [Validators.required]],
      'phoneNumber': ['', [Validators.required, this.whiteSpaceValidator]],
      'address': ['', [Validators.required, this.whiteSpaceValidator]]
    }, {
        validator: this.registrationService.mustMatch('password', 'retypePassword')
      });
  }

  saveUser(applicationUser: ApplicationUser) {
    console.log('user: ', applicationUser);
    applicationUser.userName = applicationUser.email;
    applicationUser.passwordHash = applicationUser.password;
    this.registrationService.registerUser(applicationUser)
      .subscribe(result => {
        this.userform.reset();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registration done.' });
        console.log('result: ', result);
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Registration failed.' });
        console.log('SaveUser error: ', error);
      });
  }
  get diagnostic() { return JSON.stringify(this.userform.value); }
  whiteSpaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  
}
