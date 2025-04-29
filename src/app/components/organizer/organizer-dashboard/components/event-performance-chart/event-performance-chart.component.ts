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
  selector: 'app-event-performance-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './event-performance-chart.component.html',
})
export class EventPerformanceChartComponent {
  public eventPerformanceChartType: ChartType = 'bar';
  public eventPerformanceChartData: ChartConfiguration['data'] = {
    labels: ['Concert A', 'Concert B', 'Tech Talk', 'Workshop', 'Conference'],
    datasets: [
      {
        data: [410, 310, 200, 150, 250],
        label: 'Tickets Sold',
        backgroundColor: 'rgba(168, 85, 247, 0.8)', // purple with opacity
        borderColor: 'rgb(168, 85, 247)',
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: 'rgb(147, 51, 234)', // slightly deeper purple on hover
      },
    ],
  };
  public eventPerformanceChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, max: 450, ticks: { stepSize: 100 } },
    },
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false },
    },
  };

  chartClicked(event: { event?: ChartEvent; active?: {}[] }): void {
    console.log(event);
  }

  chartHovered(event: { event?: ChartEvent; active?: {}[] }): void {
    console.log(event);
  }
}
