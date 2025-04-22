import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroCreditCard,
  heroCurrencyDollar,
  heroTicket,
  heroCalendar,
  heroInformationCircle,
  heroClock,
  heroMapPin,
  heroCheckCircle,
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-refund',
  imports: [FormsModule, NgIcon],
  templateUrl: './refund.component.html',
  viewProviders: [
    provideIcons({
      heroCreditCard,
      heroCurrencyDollar,
      heroTicket,
      heroCalendar,
      heroInformationCircle,
      heroClock,
      heroMapPin,
      heroCheckCircle,
    }),
  ],
})
export class RefundComponent {
  refundReason: string = '';
  date: string = new Date().toDateString();
  startTime: string = '09:00 PM';
  endTime: string = '11:00 PM';
  place: string = 'Cairo Satdium';
  ticketId: string = 'T12345';
  purchaseDate: string = new Date().toDateString();
  status: string = 'Active';
  price: number = 105;
}
