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
import Swal from 'sweetalert2';
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

  requestRefund(ticketId: string, eventDateStr: string) {
    const [day, month, year] = eventDateStr.split('/');
    const eventDate = new Date(Number(year), Number(month) - 1, Number(day));

    const today = new Date();
    const diffInMs = eventDate.getTime() - today.getTime();
    const daysDiff = diffInMs / (1000 * 60 * 60 * 24);

    if (daysDiff >= 2) {
      this.router.navigate(['/refund'], { queryParams: { ticketId } });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Refund Not Allowed',
        text: 'Refunds must be requested at least 2 days before the event date.',
      });
    }
  }


  navigateEventDetails(eventId: string) {
    this.router.navigate([`/events/${eventId}`]);

  }
}
