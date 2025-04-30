import { RouterModule, Routes } from '@angular/router';
import { AllEventsComponent } from './components/all-events/all-events.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { HomeComponent } from './components/home/home.component';
import { OrderComponent } from './components/order/order.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
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
import { OrganizerDashboardComponent } from './components/organizer/organizer-dashboard/organizer-dashboard.component';
import { OrganizerWalletComponent } from './components/organizer/organizer-wallet/organizer-wallet.component';
import { AddEventComponent } from './components/organizer/add-event/add-event.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SetNewPasswordComponent } from './components/auth/set-new-password/set-new-password.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { ViewEventsComponent } from './components/organizer/view-events/view-events.component';
import { IdVerificationComponent } from './components/organizer/id-verification/id-verification.component';
import { OrganizerHomeComponent } from './components/organizer/organizer-home/organizer-home.component';

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
    path: 'events/:id/order',
    title: 'Order',
    component: OrderComponent,
  },
  {
    path: 'about',
    title: 'About Us',
    component: AboutComponent,
  },
  {
    path: 'faqs',
    title: 'FAQs',
    component: FaqComponent,
  },
  {
    path: 'my-tickets',
    title: 'My Tickets',
    component: MyTicketsComponent,
  },
  {
    path: 'my-wallet',
    title: 'My Wallet',
    component: MyWalletComponent,
  },
  {
    path: 'payment',
    title: 'Payment',
    component: PaymentComponent,
  },
  {
    path: 'refund',
    title: 'Refund',
    component: RefundComponent,
  },
  {
    path: 'success',
    title: 'Payment Success',
    component: PaymentSuccessComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
    canActivate: [],
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Signup',
    canActivate: [],
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
    title: 'Verify Email',
    canActivate: [],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    title: 'Forgot Password',
    canActivate: [],
  },
  {
    path: 'reset-password',
    component: SetNewPasswordComponent,
    title: 'Reset Password',
    canActivate: [],
  },
  {
    path: 'select-role',
    component: SelectRoleComponent,
    title: 'Select Role',
    canActivate: [],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [],
    children: [
      {
        path: 'personal-information',
        component: PersonalInformationComponent,
        title: 'Personal Information',
      },
      {
        path: 'new-password',
        component: ResetPasswordComponent,
        title: 'New Password',
        canActivate: [],
      },
      {
        path: 'help-center',
        component: HelpCenterComponent,
        title: 'Help Center',
      },
    ],
  },

  // Publicly accessible
  {
    path: 'terms-condition',
    component: TermsConditionsComponent,
    title: 'Terms and Conditions',
  },
  //organizer routes
  {
    path: 'organizer',
    component: OrganizerHomeComponent,
    title: 'Organizer Home',
  },
  {
    path: 'organizer/home',
    component: OrganizerHomeComponent,
    title: 'Organizer Home',
  },
  {
    path: 'organizer/dashboard',
    component: OrganizerDashboardComponent,
    title: 'Organizer Dashboard',
  },
  {
    path: 'organizer/wallet',
    component: OrganizerWalletComponent,
    title: 'Organizer Wallet',
  },
  {
    path: 'organizer/add-event',
    component: AddEventComponent,
    title: 'Add Event',
  },
  {
    path: 'organizer/view-events',
    component: ViewEventsComponent,
    title: 'View Events',
  },
  {
    path: 'organizer/id-verification',
    component: IdVerificationComponent,
    title: 'ID Verification',
  },
  //not found route
  {
    path: '**',
    title: 'Page Not Found',
    component: NotFoundComponent,
  },
];
