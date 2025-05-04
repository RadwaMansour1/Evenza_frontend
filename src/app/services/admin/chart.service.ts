// chart.service.ts
import { Injectable } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  createRevenueChart(elementId: string, data: any[]): Chart {
    const ctx = document.getElementById(elementId) as HTMLCanvasElement;
    
    const labels = data.map(item => item.date);
    const values = data.map(item => item.amount);
    
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Revenue',
          data: values,
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          borderColor: 'rgba(37, 99, 235, 1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Revenue Over Time'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createBookingStatusChart(elementId: string, data: any[]): Chart {
    const ctx = document.getElementById(elementId) as HTMLCanvasElement;
    
    const labels = data.map(item => item.status);
    const values = data.map(item => item.count);
    
    return new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: [
            'rgba(37, 99, 235, 0.7)',
            'rgba(220, 38, 38, 0.7)',
            'rgba(245, 158, 11, 0.7)',
            'rgba(16, 185, 129, 0.7)'
          ],
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Booking Status Distribution'
          }
        }
      }
    });
  }
}