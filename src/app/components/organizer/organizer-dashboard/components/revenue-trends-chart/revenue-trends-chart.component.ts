import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import {
  ChartConfiguration,
  ChartType,
  Chart,
  registerables,
  ChartEvent,
} from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-revenue-trends-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './revenue-trends-chart.component.html',
})
export class RevenueTrendsChartComponent {
  public revenueChartType: ChartType = 'line';
  public revenueChartData: ChartConfiguration['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [3500, 4200, 3800, 5500, 5000, 6200],
        label: 'Revenue',
        fill: 'origin',
        borderColor: 'rgb(168, 85, 247)', // purple
        backgroundColor: 'rgba(168, 85, 247, 0.3)',
        tension: 0.4,
        pointBackgroundColor: 'rgb(168, 85, 247)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(168, 85, 247)',
      },
    ],
  };
  public revenueChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, max: 8000, ticks: { stepSize: 2000 } },
    },
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false },
    },
    elements: {
      line: { borderWidth: 2 },
      point: { radius: 4, hoverRadius: 6 },
    },
  };

  chartClicked(event: { event?: ChartEvent; active?: {}[] }): void {
    console.log(event);
  }

  chartHovered(event: { event?: ChartEvent; active?: {}[] }): void {
    console.log(event);
  }
}
