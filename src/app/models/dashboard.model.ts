// src/app/core/models/dashboard.model.ts
export interface DashboardData {
    stats: {
      totalSales: number;
      totalRevenue: number;
      totalEvents: number;
      totalUsers: number;
      pendingApprovals: number;
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