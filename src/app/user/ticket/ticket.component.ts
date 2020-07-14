import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { Location } from '@angular/common';
import { UserService } from 'src/app/user.service';
import { Ticket } from 'src/app/ticket';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
  providers: [UserService]
})
export class TicketComponent implements OnInit {

  constructor(private location: Location,
    private userService: UserService
  ) { }

  user: User;
  tickets: Ticket[] = [];


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("currentUser"));

    this.userService.getPurchasesSubscription(this.user.userName)
      .subscribe(
        (data: Ticket[]) => this.tickets = data,
        (error) => alert('Some error occured while fetching tickets.')
      );
  }

  goBack() {
    this.location.back();
  }

}
