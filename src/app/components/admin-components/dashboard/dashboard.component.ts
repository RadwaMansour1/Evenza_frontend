// src/app/modules/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';
import { finalize } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';

interface DashboardData {
  stats: {
    totalSales: number;
    totalRevenue: number;
    totalEvents: number;
    totalUsers: number;
    pendingApprovals?: number;
  };
  revenue: {
    labels: string[];
    amounts: number[];
  };
  popularEvents: {
    id: string;
    title: string;
    ticketsSold: number;
    category: string;
  }[];
}

@Component({
  selector: 'app-dashboard',
  imports: [NgIconsModule,RouterModule,CommonModule], // Add necessary imports if needed
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  dashboardData: DashboardData | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.isLoading = true;
    this.error = null;

    forkJoin({
      stats: this.adminService.getDashboardData(),
      revenue: this.adminService.getRevenueReport(),
      events: this.adminService.getPopularEvents()
    })
    .pipe(
      finalize(() => this.isLoading = false)
    )
    .subscribe({
      next: ({ stats, revenue, events }) => {
        console.log('Raw API Response - Stats:', stats);
        console.log('Raw API Response - Revenue:', revenue);
        console.log('Raw API Response - Events:', events);

        // Transform the data to match what the template expects
        this.dashboardData = {
          stats: {
            totalSales: stats.data.totalOrders, // Access through data property
            totalRevenue: stats.data.totalSales, // Access through data property
            totalEvents: stats.data.totalEvents, // Access through data property
            totalUsers: stats.data.totalUsers,   // Access through data property
            pendingApprovals: 3
          },
          revenue: {
            labels: Array.isArray(revenue) ? revenue.map((r: { _id: string; totalRevenue: number }) => 
              new Date(r._id).toLocaleDateString('en-US', { month: 'short' })) : [],
            amounts: Array.isArray(revenue) ? revenue.map((r: { _id: string; totalRevenue: number }) => 
              r.totalRevenue) : []
          },
          popularEvents: Array.isArray(events) ? events.map((e: { _id: string; event: { title: string; category: string }; bookingCount: number }) => ({
            id: e._id,
            title: e.event.title,
            ticketsSold: e.bookingCount,
            category: e.event.category
          })) : []
        };
        
        // Add this debug log to verify transformed data
        console.log('Transformed Dashboard Data:', this.dashboardData);
      },
      error: (err) => {
        this.error = 'Failed to load dashboard data';
        console.error('API Error:', err);
      }
    });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  }

  // For better *ngFor performance
  trackByEventId(index: number, event: any): string {
    return event.id;
  }
}