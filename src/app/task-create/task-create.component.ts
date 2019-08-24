import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SelectItem, MessageService } from 'primeng/components/common/api';
import { TaskCreateService } from './task-create.service';
import { Task } from './task-create.model';

@Component({
  selector: 'task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css'],
  providers: [MessageService]
})
export class TaskCreateComponent implements OnInit {
  taskform: FormGroup = this.fb.group({
    'name': ['', [Validators.required, Validators.maxLength(256), this.whiteSpaceValidator]],
    'description': ['', [Validators.maxLength(512)]],
    'startDate': [''],
    'endDate': [''],
    'applicationUserId': ['']
  });
  users: SelectItem[];
  minDate = new Date();

  constructor(private fb: FormBuilder,
    private taskCreateService: TaskCreateService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.loadUsersDropdown();
  }

  saveTask(task: Task) {
    task.endDate = this.getDateWithoutLocalTimeZone(task.endDate);
    task.startDate = this.getDateWithoutLocalTimeZone(task.startDate);
    console.log('task: ', task);
    this.taskCreateService.saveTask(task)
      .subscribe(result => {
        if(result.status == 200)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task saved.' });
        this.taskform.reset();
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Task save failed.' });
        console.log('saveTask error: ', error);
      });
  }
  private loadUsersDropdown() {
    this.taskCreateService.getUsers()
      .subscribe(result => {
        this.users = [{ label: 'Select User', value: null }, ...result];
      }, error => {
        console.log('getUsers error: ', error);
      });
  }
  getDateWithoutLocalTimeZone(date: Date): Date {
    if(date)
      return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return null;
  }
  whiteSpaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
}
