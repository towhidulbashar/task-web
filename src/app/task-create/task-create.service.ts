import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SelectItem } from 'primeng/components/common/api';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from './task-create.model';
import { isNgTemplate } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class TaskCreateService {
  constructor(private http: HttpClient) { }

  saveTask(task: Task): Observable<HttpResponse<any>> {
    const saveTaskUrl: string = 'http://localhost:51192/api/workitem/add';
    return this.http.post(saveTaskUrl, task, { observe: 'response', responseType: 'text' });
  }  
  updateTask(task: Task): Observable<HttpResponse<any>> {
    const updateTaskUrl: string = 'http://localhost:51192/api/workitem/update';
    return this.http.post(updateTaskUrl, task, { observe: 'response', responseType: 'text' });
  }

  getTasks(): Observable<Task[]> {
    const getTasksUrl: string = 'http://localhost:51192/api/workitem/get-tasks';
    return this.http.get<Task[]>(getTasksUrl)
      .pipe(map(tasks => tasks.map( task => {
        const _task = new Task();
        _task.id = task.id;
        _task.name = task.name;
        _task.description = task.description;
        _task.startDate = task.startDate ? new Date(task.startDate) : task.startDate;
        _task.endDate =  task.endDate ? new Date(task.endDate) : task.endDate;
        _task.applicationUserId = task.applicationUserId;
        _task.applicationUserName = task.applicationUserName;
        return _task;
      })));
  }

  getUsers(): Observable<SelectItem[]> {
    const getAllUserUrl: string = 'http://localhost:51192/api/account/get-all-users';
    return this.http.get<SelectItem[]>(getAllUserUrl);
  }
}
