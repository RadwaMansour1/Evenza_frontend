import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { AnalyticsService, AnalyticsData, TopEvent } from '../../../services/admin/analytics.service';
import { ChartData, ChartOptions, Chart, RadarController, LineElement, PointElement, LinearScale, RadialLinearScale } from 'chart.js';

Chart.register(
  RadarController,
  LineElement,
  PointElement,
  LinearScale,
  RadialLinearScale
);

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './analytics.component.html',
})
export class AnalyticsComponent implements OnInit {
  analyticsData: AnalyticsData | null = null;
  topEvents: TopEvent[] = [];
  isLoading = true;
  error: string | null = null;

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  radarChartData: ChartData<'radar'> = {
    labels: ['Total Events', 'Total Orders', 'Total Revenue', 'Avg Satisfaction'],
    datasets: [
      {
        label: 'Platform Performance',
        data: [0, 0, 0, 0], // Placeholder
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  radarChartOptions: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          display: false,
        }
      }
    }
  };

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.loadAnalytics();
  }

  private loadAnalytics(): void {
    this.isLoading = true;
    this.error = null;

    this.analyticsService.getAnalytics().subscribe({
      next: (response) => {
        console.log('Received analytics data:', response);
        if (!response || !response.data) {
          this.error = 'No data received from the server';
          this.isLoading = false;
          return;
        }
        
        this.analyticsData = response.data;
        this.topEvents = response.data.topEvents || [];
        this.updateChartData(response.data);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading analytics:', err);
        this.error = 'Failed to load analytics data. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  private updateChartData(data: AnalyticsData): void {
    const maxRevenue = 3000;
    const maxEvents = 20;
    const maxOrders = 20;
    
    const normalizedData = [
      (data.totalEvents / maxEvents) * 100,
      (data.totalOrders / maxOrders) * 100,
      (data.totalRevenue / maxRevenue) * 100,
      (data.avgSatisfaction / 5) * 100
    ];

    this.radarChartData.datasets[0].data = normalizedData;
    this.chart?.update();
  }

  refreshData(): void {
    this.loadAnalytics();
  }
}