import { RouterModule, Routes } from '@angular/router';
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
import { redirectIfLoggedInGuard } from './guards/redirectIfLoggedIn.guard';
import { SignupComponent } from './components/auth/signup/signup.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import { HelpCenterComponent } from './components/help-center/help-center.component';
import { authGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { SelectRoleComponent } from './components/select-role/select-role.component';
import { MyWalletComponent } from './components/my-wallet/my-wallet.component';
import { FaqComponent } from './components/faq/faq.component';
import { MyTicketsComponent } from './components/my-tickets/my-tickets.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { PaymentComponent } from './components/payment/payment.component';
import { NgModule } from '@angular/core';
import { RefundComponent } from './components/refund/refund.component';
import { OrganizerWalletComponent } from './components/organizer/organizer-wallet/organizer-wallet.component';
import {OrganizersWalletComponent } from './components/admin-components/organizer-wallet/organizer-wallet.component';
import { AddEventComponent } from './components/organizer/add-event/add-event.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SetNewPasswordComponent } from './components/auth/set-new-password/set-new-password.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { ViewEventsComponent } from './components/organizer/view-events/view-events.component';
import { OrganizerHomeComponent } from './components/organizer/organizer-home/organizer-home.component';
import { AdminRefundRequestsComponent } from './components/admin-components/refunds/admin-refund-requests.component';
import { ActivityLogComponent } from './components/activity-log/activity-log.component';
import { AdminLoginComponent } from './components/admin-components/admin-login/admin-login.component';
import { AdminLayoutComponent } from './components/admin-components/layout/layout.component';
import { SimpleLayoutComponent } from './components/admin-components/layout/login-layout.component';

export const routes: Routes = [
  // Public Routes
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'events',
    component: AllEventsComponent,
  },
  {
    path: 'events/:id',
    component: EventDetailsComponent,
  },
  {
    path: 'events/:id/order',
    component: OrderComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },

  // Admin Routes
  {
    path: 'admin/events',
    component: AdminEventsComponent,
  },
  {
    path: 'admin/events/edit/:id',
    component: EventEditPageComponent,
  },
  {
    path: 'admin/users',
    component: UsersComponent,
  },
  {
    path: 'admin/categories',
    component: CategoriesComponent,
  },
  {
    path: 'admin/orders',
    component: BookingsComponent,
  },
  {
    path: 'admin/reviews',
    component: ReviewComponent,
  },
  {
    path: 'admin/analytics',
    component: AnalyticsComponent,
  },
  {
    path: 'admin/upload-documents',
    component: UploadDocumentsComponent,
  },
  {
    path: 'admin/organizer/wallet',
    component: OrganizersWalletComponent,
  },
  {
    path: 'admin/refund-requests',
    component: AdminRefundRequestsComponent,
  },
  {
    path: 'admin/login',
    title: 'Admin Login',
    component: AdminLoginComponent,
    
  },

  // Wildcard Route (Page Not Found)
  {
    path: 'faqs',
    component: FaqComponent,
  },
  {
    path: 'my-tickets',
    component: MyTicketsComponent,
  },
  {
    path: 'my-wallet',
    component: MyWalletComponent,
  },
  {
    path: 'payment',
    component: PaymentComponent,
  },
  {
    path: 'refund',
    component: RefundComponent,
  },
  {
    path: 'success',
    component: PaymentSuccessComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [],
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
    canActivate: [],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [],
  },
  {
    path: 'reset-password',
    component: SetNewPasswordComponent,
    canActivate: [],
  },
  {
    path: 'select-role',
    component: SelectRoleComponent,
    canActivate: [],
  },
  {
    path:'activity-logs',
    component: ActivityLogComponent,
    canActivate:[]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [],
    children: [
      {
        path: 'personal-information',
        component: PersonalInformationComponent,
      },
      {
        path: 'new-password',
        component: ResetPasswordComponent,
        canActivate: [],
      },
      {
        path: 'help-center',
        component: HelpCenterComponent,
      },
    ],
  },

  // Publicly accessible
  {
    path: 'terms-condition',
    component: TermsConditionsComponent,
  },
  //organizer routes
  {
    path: 'organizer',
    component: OrganizerHomeComponent,
  },
  {
    path: 'organizer/home',
    component: OrganizerHomeComponent,
  },
  {
    path: 'organizer/wallet',
    component: OrganizerWalletComponent,
  },
  {
    path: 'organizer/add-event',
    component: AddEventComponent,
  },
  {
    path: 'organizer/view-events',
    component: ViewEventsComponent,
  },
  //not found route
  {
    path: '**',
    component: NotFoundComponent,
  },
];
