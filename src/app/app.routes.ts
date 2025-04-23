import { Routes } from '@angular/router';
import { AllEventsComponent } from './components/all-events/all-events.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { HomeComponent } from './components/home/home.component';
import { OrderComponent } from './components/order/order.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

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
    path:'events/:id/order',
    title:'Order',
    component:OrderComponent
  },
  {
    path:'about',
    title:'About Us',
    component:AboutComponent,
  },
  {
    path: '**',
    title: 'Page Not Found',
    component: NotFoundComponent,
  },
];
