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
} from '@ng-icons/heroicons/outline';
import { Router } from '@angular/router';
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
    }),
    provideNgIconsConfig({
      size: '1.2em',
    }),
  ],
})
export class OrganizerDashboardComponent implements OnInit {
  // --- Stats Data ---
  stats = [
    {
      title: 'Total Events',
      value: '12',
      subtitle: 'All-time events',
      icon: 'featherCalendar',
    },
    {
      title: 'Ticket Sales',
      value: '824',
      subtitle: 'All-time tickets',
      icon: 'heroTicket',
    },
    {
      title: 'Total Revenue',
      value: '16,240 EGP',
      subtitle: 'View wallet',
      icon: 'heroWallet',
    },
    {
      title: 'Total Attendees',
      value: '1,568',
      subtitle: 'Across all events',
      icon: 'heroUsers',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // You might fetch real data here in a real application
    // this.cdr.detectChanges(); // Detect changes to update the chart
  }

  viewWallet() {
    this.router.navigate(['/organizer/wallet']);
  }
  viewEvents() {
    console.log('Viewing events...');
  }
  logout() {
    console.log('Logging out...');
  }
}
