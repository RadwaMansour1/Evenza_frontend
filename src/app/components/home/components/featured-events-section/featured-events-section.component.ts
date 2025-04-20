import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventCardComponent } from './components/event-card/event-card.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronRight } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-featured-events-section',
  imports: [CommonModule, EventCardComponent, NgIcon],
  templateUrl: './featured-events-section.component.html',
  providers: [provideIcons({ heroChevronRight })],
})
export class FeaturedEventsSectionComponent {
  viewAllEvents() {
    throw new Error('Method not implemented.');
  }
  featuredEvents = [
    {
      image:
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2670&auto=format&fit=crop',
      category: 'Concert',
      title: 'Music Festival 2025',
      date: 'June 15–18, 2025',
      time: '5:00 PM',
      location: 'Central Park, New York City',
      price: 199,
    },
    {
      image:
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2670&auto=format&fit=crop',
      category: 'Concert',
      title: 'Music Festival 2025',
      date: 'June 15–18, 2025',
      time: '5:00 PM',
      location: 'Central Park, New York City',
      price: 199,
    },
    {
      image:
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2670&auto=format&fit=crop',
      category: 'Concert',
      title: 'Music Festival 2025',
      date: 'June 15–18, 2025',
      time: '5:00 PM',
      location: 'Central Park, New York City',
      price: 199,
    },
    {
      image:
        'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2670&auto=format&fit=crop',
      category: 'Conference',
      title: 'Tech Innovators Conference',
      date: 'July 10–12, 2025',
      time: '9:00 AM',
      location: 'Silicon Valley, CA',
      price: 299,
    },
    {
      image:
        'https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=2671&auto=format&fit=crop',
      category: 'Theater',
      title: 'Shakespeare in the Park',
      date: 'August 5, 2025',
      time: '7:30 PM',
      location: 'Millennium Park, Chicago',
      price: 49,
    },
  ];
}
