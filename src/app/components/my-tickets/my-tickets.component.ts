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


  isRefundBlocked(eventDate: string | Date): boolean {
    const event = this.parseDate(eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const timeDiff = event.getTime() - today.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    return daysDiff < 2;
  }

  private parseDate(dateInput: string | Date): Date {
    if (dateInput instanceof Date) return dateInput;

    if (dateInput.includes('/')) {
      const parts = dateInput.split('/');
      return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
    }

    return new Date(dateInput);
  }

  onRefundClick(ticketId: string, eventDate: string | Date) {
    if (this.isRefundBlocked(eventDate)) {
      Swal.fire({
        icon: 'warning',
        title: 'Refund Not Allowed',
        text: 'Refunds must be requested at least 2 days before the event date.',
        confirmButtonColor: '#3b82f6'
      });
      return;
    }
    this.router.navigate(['/refund'], { queryParams: { ticketId } });
  }

  navigateEventDetails(eventId: string) {
    this.router.navigate([`/events/${eventId}`]);

  }
}
