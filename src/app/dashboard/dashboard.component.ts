import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { User } from '../login/login.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MessageService]
})
export class DashboardComponent implements OnInit {
  currentUser: User;
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);      
    }
  }
  onDecideRedirection() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registration done.' });
  }
}
