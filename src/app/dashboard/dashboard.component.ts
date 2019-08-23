import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MessageService]
})
export class DashboardComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }
  onDecideRedirection() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registration done.' });
  }
}
