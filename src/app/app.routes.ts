import { Routes } from '@angular/router';
import { AllEventsComponent } from './components/all-events/all-events.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomeComponent,
    children: [{ path: 'home', redirectTo: '', pathMatch: 'full' }],
  },
  {
    path: 'events',
    title: 'All Events',
    component: AllEventsComponent,
  },
  {
    path: 'events/:id',
    title: 'Event Details',
    component: EventDetailsComponent,
  },
  {
    path: '**',
    title: 'Page Not Found',
    // component: NotFoundComponent,
  }
];
