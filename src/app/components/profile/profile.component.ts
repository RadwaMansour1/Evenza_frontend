import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule,  Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUser, heroCalendar, heroTicket ,heroHeart } from '@ng-icons/heroicons/outline';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIcon],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  viewProviders: [
    provideIcons({ heroUser, heroCalendar, heroTicket }),
  ]
})
export class ProfileComponent {
  navLinks = [
    { label: 'Account Information', path: '/profile/personal-information', icon: 'heroUser' },
    { label: 'Profile Settings', path: '/profile/new-password', icon: 'heroCalendar' },
    { label: 'Log Out', path: '/tickets', icon: 'heroTicket' },
  ];

  constructor(private router: Router, private authService:AuthService) {}
  signOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
