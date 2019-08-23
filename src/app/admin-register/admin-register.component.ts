import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {

  constructor(private router: Router) {

  }
  ngOnInit() {
  }
  onDecideRedirection(redirect: boolean) {
    this.router.navigate(['/login']);
  }
}
