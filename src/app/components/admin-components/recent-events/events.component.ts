import { Component } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import { 
  heroMagnifyingGlass,
  heroPencilSquare,
  heroCheckCircle
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-events',
  imports: [NgIconsModule],
  templateUrl: './events.component.html'
})
export class EventsComponent {
  events = [
    {
      name: 'Summer Music Festival',
      organizer: 'John Organizer',
      category: 'Concerts',
      date: '7/15/2023 - 7/17/2023',
      status: 'Approved',
      price: '$250',
      capacity: '65%'
    },
    {
      name: 'Tech Conference 2023',
      organizer: 'Charlie Puth',
      category: 'Conferences',
      date: '8/10/2023 - 8/12/2023',
      status: 'Approved',
      price: '$800',
      capacity: '90%'
    },
    {
      name: 'Championship Basketball Match',
      organizer: 'John Organizer',
      category: 'Sports',
      date: '9/5/2023 - 9/7/2023',
      status: 'Approved',
      price: '$14500',
      capacity: '97%'
    }
  ];

  statusColors: { [key: string]: string } = {
    'Approved': 'bg-green-100 text-green-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Rejected': 'bg-red-100 text-red-800'
  };
}