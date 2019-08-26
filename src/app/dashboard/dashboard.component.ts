import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { User } from '../login/login.model';
import { TaskCreateComponent } from '../task-create/task-create.component';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MessageService]
})
export class DashboardComponent implements OnInit {
  currentUser: User;
  @ViewChild('createTask') createTask: TaskCreateComponent;
  constructor(private messageService: MessageService,
    private loginService: LoginService) { }

  ngOnInit() {
    this.currentUser = this.loginService.getCurrentUser();
  }
  onDecideRedirection() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registration done.' });
  }
  loadUsersDropdown() {
    this.createTask.loadUsersDropdown();
  }
}
