import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import { heroTicket } from '@ng-icons/heroicons/outline';
import {
  featherCalendar,
  featherClock,
  featherMapPin,
} from '@ng-icons/feather-icons';
import { Router } from '@angular/router';
import { TicketsService } from '../../services/tickets/tickets.service';
import { TicketModel } from '../../models/ticket.model';
import { UserService } from '../../services/profile/user.service';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-my-tickets',
  imports: [CommonModule, NgIcon , TranslateModule],
  templateUrl: './my-tickets.component.html',
  providers: [
    provideIcons({ heroTicket, featherCalendar, featherClock, featherMapPin }),
    provideNgIconsConfig({ size: '1.05rem' }),
  ],
})
export class MyTicketsComponent implements OnInit{
  tickets:TicketModel[] = [];

  constructor(private router: Router,private readonly ticketsService:TicketsService,
    private readonly userService:UserService
  ) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next:(res)=>{
        console.log("user : ",res)
        this.ticketsService.getTicketByUserId(res.data._id).subscribe({
          next:(res:any)=>{
            console.log("tickets : ",res)
            this.tickets = res.data;
          },
          error:(err)=>{
            console.log(err);
          }
        })
      },
      error:(err)=>{
        console.log(err);
        this.router.navigate(['/login']);
      }
    })
  }
  navigateEvents() {
    this.router.navigate(['/events']);
  }
  requestRefund(ticketId: string) {
    this.router.navigate(["/refund"],{queryParams:{ticketId}});
  }
  navigateEventDetails(eventId: string) {
    this.router.navigate([`/events/${eventId}`]);

  }
}
