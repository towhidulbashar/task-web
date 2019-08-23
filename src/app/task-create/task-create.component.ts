import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SelectItem } from 'primeng/components/common/api';

@Component({
  selector: 'task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {
  taskform: FormGroup = this.fb.group({
    'taskName': ['', [Validators.required, Validators.maxLength(256), this.whiteSpaceValidator]],
    'description': ['', [Validators.maxLength(512)]],
    'startDate': [''],
    'endDate': [''],
    'assignedTo': ['']
  });
  users: SelectItem[];
  minDate = new Date();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.users = [
      { label: 'Select User', value: null },
      { label: 'Towhid', value: '1' },
      { label: 'Hasan', value: '2' }
    ];
  }
  saveTask(task) {
    console.log('task: ', task);
  }
  whiteSpaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
}
