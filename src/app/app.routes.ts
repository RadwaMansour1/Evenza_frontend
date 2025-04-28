import { Routes } from '@angular/router';
import { AllEventsComponent } from './components/all-events/all-events.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { HomeComponent } from './components/home/home.component';
import { OrderComponent } from './components/order/order.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { redirectIfLoggedInGuard } from './guards/redirectIfLoggedIn.guard';
import { SignupComponent } from './components/signup/signup.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import { HelpCenterComponent } from './components/help-center/help-center.component';
import { authGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { SelectRoleComponent } from './components/select-role/select-role.component';
import { MyWalletComponent } from './components/my-wallet/my-wallet.component';
import { FaqComponent } from './components/faq/faq.component';
import { MyTicketsComponent } from './components/my-tickets/my-tickets.component';
import { LoginComponent } from './components/login/login.component';
import { SetNewPasswordComponent } from './components/set-new-password/set-new-password.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';

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
    component: MyWalletComponent ,
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
  {
    path: '**',
    title: 'Page Not Found',
    component: NotFoundComponent,
  },
];
