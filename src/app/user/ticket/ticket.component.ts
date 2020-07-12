import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  constructor(private location: Location) { }

  user: User;


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
  }

  goBack() {
    this.location.back();
  }

}
