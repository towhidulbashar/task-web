import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SelectItem } from 'primeng/components/common/api';
import { Observable } from 'rxjs';
import { Task } from './task-create.model';

@Injectable({
  providedIn: 'root'
})
export class TaskCreateService {
  saveTask(task: Task): Observable<HttpResponse<any>> {
    const saveTaskUrl: string = 'http://localhost:51192/api/workitem/add';
    return this.http.post(saveTaskUrl, task, { observe: 'response', responseType: 'text' });
  }
  constructor(private http: HttpClient) { }
  getUsers(): Observable<SelectItem[]> {
    const getAllUserUrl: string = 'http://localhost:51192/api/account/GetAllUser';
    return this.http.get<SelectItem[]>(getAllUserUrl);
  }


}
