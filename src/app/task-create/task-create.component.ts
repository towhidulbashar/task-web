import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SelectItem, MessageService } from 'primeng/components/common/api';
import { ConfirmationService } from 'primeng/api';
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
  providers: [MessageService, ConfirmationService]
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
  currentUserTasks: Task[] = [];

  constructor(private fb: FormBuilder,
    private taskService: TaskCreateService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.loadUsersDropdown();
    this.loadTaskTable();
    this.loadCurrentUserTasks();
  }

  onSubmit(task: Task) {
    if (this.submitButtonText == SubmitButtonText.Save)
      this.saveTask(task);
    else if (this.submitButtonText == SubmitButtonText.Update)
      this.updateTask(task);
  }

  private saveTask(task: Task) {
    this.taskService.saveTask(task)
      .subscribe(result => {
        if (result.status == 200) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task saved.' });
          this.resetUi();
          this.loadTaskTable();
          this.loadCurrentUserTasks();
        }
      },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Task save failed.' });
          console.log('saveTask error: ', error);
        });
  }

  private updateTask(task: Task) {
    this.taskService.updateTask(task)
      .subscribe(result => {
        if (result.status == 200) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task updated.' });
          this.resetUi();
          this.loadTaskTable();
          this.loadCurrentUserTasks();
        }
      },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Task update failed.' });
          console.log('updateTask error: ', error);
        });
  }

  onTaskDelete(task: Task) {
    this.confirmationService.confirm({
      message: `Delete task ${task.name}?`,
      accept: () => {
        this.taskService.deleteTask(task.id)
          .subscribe(() => {
            this.tasks = this.tasks.filter(item => item.id !== task.id);
            this.resetUi();
            this.loadCurrentUserTasks();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task deleted.' });
          },
            error => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Task delete failed.' });
              console.log('DeleteTask error: ', error);
            });
      }
    });
  }
  onTaskEdit(event: Task) {
    if (event.startDate)
      event.startDate = new Date(event.startDate);
    if (event.endDate)
      event.endDate = new Date(event.endDate);
    this.submitButtonText = SubmitButtonText.Update;
    this.taskform.patchValue(event);
  }
  
  loadCurrentUserTasks() {
    this.taskService.getCurrentUserTasks()
      .subscribe(result => {
        this.currentUserTasks = result;
      }, error => {
        console.log('getCurrentUserTasks error: ', error);
      });
  }
  loadTaskTable() {
    this.taskService.getTasks()
      .subscribe(result => {
        this.tasks = result;
      }, error => {
        console.log('getUsers error: ', error);
      });
  }
  loadUsersDropdown() {
    this.taskService.getUsers()
      .subscribe(result => {
        this.users = [{ label: 'Select User', value: null }, ...result];
      }, error => {
        console.log('getUsers error: ', error);
      });
  }
  onClear() {
    this.resetUi();
  }
  private resetUi() {
    this.taskform.reset({ id: 0 });
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
