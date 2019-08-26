import { Injectable } from '@angular/core';
import { UserLogin, User } from './login.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  login(userLogin: UserLogin): Observable<User> {
    const loginUrl: string = 'http://localhost:51192/api/account/authenticate';
    return this.http.post<User>(loginUrl, userLogin);
  }
  logout() {
    const logoutUrl: string = 'http://localhost:51192/api/account/logout';
    if (localStorage.getItem('currentUser'))
      this.http.post(logoutUrl, {}).subscribe();
    localStorage.removeItem('currentUser');
  }
}
