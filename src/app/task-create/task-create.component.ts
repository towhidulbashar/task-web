import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SelectItem, MessageService } from 'primeng/components/common/api';
import { TaskCreateService } from './task-create.service';
import { Task } from './task-create.model';

enum SubmitButtonText {
  Save = "Save",
  Update = "Update"
}
@Component({
  selector: 'task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css'],
  providers: [MessageService]
})
export class TaskCreateComponent implements OnInit {
  taskform: FormGroup = this.fb.group({
    'id': [0],
    'name': ['', [Validators.required, Validators.maxLength(256), this.whiteSpaceValidator]],
    'description': ['', [Validators.maxLength(512)]],
    'startDate': [''],
    'endDate': [''],
    'applicationUserId': ['']
  });
  submitButtonText: SubmitButtonText = SubmitButtonText.Save;
  minDate = new Date();
  users: SelectItem[] = [];
  tasks: Task[] = [];

  constructor(private fb: FormBuilder,
    private taskCreateService: TaskCreateService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.loadUsersDropdown();
    this.loadTaskTable();
  }

  onSubmit(task: Task) {
    if (this.submitButtonText == SubmitButtonText.Save)
      this.saveTask(task);
    else if (this.submitButtonText == SubmitButtonText.Update)
      this.updateTask(task);
  }

  private saveTask(task: Task) {
    this.taskCreateService.saveTask(task)
      .subscribe(result => {
        if (result.status == 200) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task saved.' });
          this.taskform.reset();
          this.loadTaskTable();
        }
      },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Task save failed.' });
          console.log('saveTask error: ', error);
        });
  }

  private updateTask(task: Task) {
    this.taskCreateService.updateTask(task)
      .subscribe(result => {
        if (result.status == 200) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task updated.' });
          this.taskform.reset();
          this.loadTaskTable();
          this.submitButtonText = SubmitButtonText.Save;
        }
      },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Task update failed.' });
          console.log('updateTask error: ', error);
        });
  }

  onTaskEdit(event: Task) {
    if (event.startDate)
      event.startDate = new Date(event.startDate);
    if (event.endDate)
      event.endDate = new Date(event.endDate);
    console.log('onedit: ', event);
    this.submitButtonText = SubmitButtonText.Update;
    this.taskform.patchValue(event);
  }
  loadTaskTable() {
    this.taskCreateService.getTasks()
      .subscribe(result => {
        console.log('result: ', result);
        this.tasks = result;
      }, error => {
        console.log('getUsers error: ', error);
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
  onClear() {
    this.taskform.reset();
    this.submitButtonText = SubmitButtonText.Save;
  }
  getDateWithoutLocalTimeZone(date: Date): Date {
    if (date)
      return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return null;
  }
  whiteSpaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
}
