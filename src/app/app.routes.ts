import { Routes } from '@angular/router';
import { AllEventsComponent } from './components/all-events/all-events.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';

export const routes: Routes = [
  {
    path: 'events',
    title: 'All Events',
    component: AllEventsComponent,
    // children: [
    //   {
    //     path: ':id',
    //     title: 'Event Details',
    //     component: EventDetailsComponent,
    //   },
    // ],
  },
  {
    path: 'events/:id',
    title: 'Event Details',
    component: EventDetailsComponent,
  },
];
