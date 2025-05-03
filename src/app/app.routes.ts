import { Routes } from '@angular/router';
import { AllEventsComponent } from './components/all-events/all-events.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { HomeComponent } from './components/home/home.component';
import { OrderComponent } from './components/order/order.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminEventsComponent } from './components/admin-components/events-page/events.component';
import { UsersComponent } from './components/admin-components/users/users.component';
import { CategoriesComponent } from './components/admin-components/categories/categories.component';
import { BookingsComponent } from './components/admin-components/orders/bookings.component';
import { ReviewComponent } from './components/admin-components/reviews/review.component';
import { AnalyticsComponent } from './components/admin-components/analytics/analytics.component';
import { EventEditPageComponent } from './components/admin-components/event-edit/event-edit-page.component';
import { UploadDocumentsComponent } from './components/admin-components/documents/upload-documents.component';
import { OrganizersWalletComponent,} from './components/admin-components/organizer-wallet/organizer-wallet.component';

export const routes: Routes = [
  // Public Routes
  {
    path: '',
    title: 'Home',
    component: HomeComponent,
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
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
    path: 'events/:id/order',
    title: 'Order',
    component: OrderComponent,
  },
  {
    path: 'about',
    title: 'About Us',
    component: AboutComponent,
  },

  // Admin Routes
  {
    path: 'admin/events',
    title: 'All Events',
    component: AdminEventsComponent,
  },
  {
    path: 'admin/events/edit/:id',
    title: 'Edit Event',
    component: EventEditPageComponent,
  },
  {
    path: 'admin/users',
    title: 'All Users',
    component: UsersComponent,
  },
  {
    path: 'admin/categories',
    title: 'All Categories',
    component: CategoriesComponent,
  },
  {
    path: 'admin/orders',
    title: 'All Orders',
    component: BookingsComponent,
  },
  {
    path: 'admin/reviews',
    title: 'All Reviews',
    component: ReviewComponent,
  },
  {
    path: 'admin/analytics',
    title: 'Analytics',
    component: AnalyticsComponent,
  },
  {
    path: 'admin/upload-documents',
    title: 'Documents',
    component: UploadDocumentsComponent,
  },
  {
    path: 'admin/organizer/wallet',
    title: 'Organizer Wallet',
    component: OrganizersWalletComponent,
  },

  // Wildcard Route (Page Not Found)
  {
    path: '**',
    title: 'Page Not Found',
    component: NotFoundComponent,
  },
];
