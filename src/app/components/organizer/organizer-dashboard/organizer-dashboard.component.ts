import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EventPerformanceChartComponent } from './components/event-performance-chart/event-performance-chart.component';
import { AttendanceChartComponent } from './components/attendance-chart/attendance-chart.component';
import { RevenueTrendsChartComponent } from './components/revenue-trends-chart/revenue-trends-chart.component';
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import { featherLogOut, featherCalendar } from '@ng-icons/feather-icons';

import {
  heroTicket,
  heroWallet,
  heroUsers,
  heroPlus,
  heroXCircle,
} from '@ng-icons/heroicons/outline';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { OrganizerService } from '../../../services/organizer/organizer.service';
import { UserService } from '../../../services/profile/user.service';

@Component({
  selector: 'app-organizer-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    EventPerformanceChartComponent,
    AttendanceChartComponent,
    RevenueTrendsChartComponent,
    NgIcon,
  ],
  templateUrl: './organizer-dashboard.component.html',
  providers: [
    provideIcons({
      heroTicket,
      heroWallet,
      featherLogOut,
      heroPlus,
      featherCalendar,
      heroUsers,
      heroXCircle,
    }),
    provideNgIconsConfig({
      size: '1.2em',
    }),
  ],
})
export class OrganizerDashboardComponent implements OnInit {
  stats: any[] = [];
  organizerName: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private organizerService: OrganizerService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUserName();
    this.loadDashboardStats();
  }

  loadUserName(): void {
    this.userService.getProfile().subscribe(
      (response: any) => {
        this.organizerName = response.data.firstName || 'Organizer';
        console.log('Organizer Name:', this.organizerName);
      },
      (error) => {
        console.error('Error fetching profile:', error);
        this.organizerName = 'Organizer';
      }
    );
  }


  loadDashboardStats() {
    this.organizerService.getOrganizerEvents().subscribe((response: any) => {
      console.log('Response from API:', response);

      const events = Array.isArray(response.data) ? response.data : [];
      console.log('Events:', events);

      const totalEvents = events.length;
      const totalTickets = events.reduce((sum: any, e: { totalTicketsSold: any; }) => sum + (e.totalTicketsSold ?? 0), 0);
      const totalRevenue = events.reduce((sum: any, e: { totalRevenue: any; }) => sum + (e.totalRevenue ?? 0), 0);
      const totalAttendees = totalTickets;

      this.stats = [
        {
          title: 'Total Events',
          value: totalEvents.toString(),
          subtitle: 'All-time events',
          icon: 'featherCalendar',
        },
        {
          title: 'Ticket Sales',
          value: totalTickets.toString(),
          subtitle: 'All-time tickets',
          icon: 'heroTicket',
        },
        {
          title: 'Total Revenue',
          value: `${totalRevenue.toLocaleString()} EGP`,
          subtitle: 'View wallet',
          icon: 'heroWallet',
        },
        {
          title: 'Total Attendees',
          value: totalAttendees.toString(),
          subtitle: 'Across all events',
          icon: 'heroUsers',
        },
      ];
    });
  }


  viewWallet() {
    this.router.navigate(['/organizer/wallet']);
  }

  viewEvents() {
    this.router.navigate(['/organizer/view-events']);
  }

  viewAddEvent() {
    this.router.navigate(['/organizer/add-event']);
  }

  logout() {
    this.authService.logout();
  }
}
function jwt_decode(token: string): any {
  throw new Error('Function not implemented.');
}

