import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApplicationUser } from './registration.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private http: HttpClient) {
  }
  registerUser(applicationUser: ApplicationUser): Observable<HttpResponse<any>> {
    const applicationUserUrl: string = 'http://localhost:51192/api/account/register';
    return this.http.post(applicationUserUrl, applicationUser, { observe: 'response', responseType: 'text' });
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
