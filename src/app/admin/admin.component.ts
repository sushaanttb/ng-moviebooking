import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  adminUser: User;

  ngOnInit(): void {
    this.adminUser = JSON.parse(localStorage.getItem("currentUser"));
  }

}
