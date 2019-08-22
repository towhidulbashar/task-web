import { Component, OnInit } from '@angular/core';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {MessageService, SelectItem} from 'primeng/api';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [MessageService]
})
export class RegistrationComponent implements OnInit {
  userform: FormGroup;
  submitted: boolean;
  genders: SelectItem[];
  description: string;

  constructor(private fb: FormBuilder, private messageService: MessageService) {}

  ngOnInit() {
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
      'mobile': ['', [Validators.required, this.whiteSpaceValidator]],
      'address': ['', [Validators.required, this.whiteSpaceValidator]]
    }, {
      validator: this.mustMatch('password', 'retypePassword')
    });
    this.genders = [];
    this.genders.push({label:'Select Gender', value:''});
    this.genders.push({label:'Male', value:'Male'});
    this.genders.push({label:'Female', value:'Female'});
  }
  onSubmit(value: string) {
    console.log('value: ', value);
    this.submitted = true;
    this.messageService.add({severity:'info', summary:'Success', detail:'Form Submitted'});
  }
  get diagnostic() { return JSON.stringify(this.userform.value); }
  whiteSpaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }
        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        }
        else {
            matchingControl.setErrors(null);
        }
    }
}
}
