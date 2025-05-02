import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule,  Router, NavigationEnd } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUser, heroCalendar, heroTicket ,heroHeart, heroCog } from '@ng-icons/heroicons/outline';
import { AuthService } from '../../services/auth/auth.service';
import { filter } from 'rxjs';
import { PersonalInformationComponent } from "../personal-information/personal-information.component";
import { SetNewPasswordComponent } from "../auth/set-new-password/set-new-password.component";
import { ResetPasswordComponent } from "../auth/reset-password/reset-password.component";
import { LogoutComponent } from "../auth/logout/logout.component";
import { featherMoreVertical, featherUser } from '@ng-icons/feather-icons';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIcon, PersonalInformationComponent, ResetPasswordComponent, LogoutComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  viewProviders: [
    provideIcons({ heroUser, heroCalendar, heroTicket , heroCog ,featherUser ,featherMoreVertical }),
  ]
})
export class ProfileComponent {
  navLinks = [
    { label: 'Account Information', path: '/profile/personal-information', icon: 'heroUser' },
    { label: 'Profile Settings', path: '/profile/new-password', icon: 'heroCog' },
    { label: 'Log Out', path: '/login', icon: 'heroTicket' },
  ];
  showName = true;
  mobileMenuOpen = false;
  activeTab: 'account' | 'security' | 'logout' = 'account';

  user = {
    name: 'John Doe',
    email: 'john@example.com'
  };

  constructor(private router: Router, private authService:AuthService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const currentUrl = event.urlAfterRedirects;
        // أظهر "Hassan" فقط في الصفحة الرئيسية (عدّل حسب ما تحتاج)
        this.showName = currentUrl === '/' || currentUrl === '/profile';
      });
  }
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
  selectTab(tab: 'account' | 'security' | 'logout') {
    this.activeTab = tab;
    this.mobileMenuOpen = false; // close menu after selection
  }
  setActiveTab(tab: 'account' | 'security' | 'logout') {
    this.activeTab = tab;
  }

  signOut() {
    this.authService.logout();
    // this.router.navigate(['/login']);
  }
}
