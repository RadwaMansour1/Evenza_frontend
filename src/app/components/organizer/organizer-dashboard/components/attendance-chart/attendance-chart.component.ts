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
  selector: 'app-attendance-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './attendance-chart.component.html',
})
export class AttendanceChartComponent {
  public attendanceChartType: ChartType = 'line';
  public attendanceChartData: ChartConfiguration['data'] = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        data: [450, 900, 1000, 1100],
        label: 'Attendees',
        borderColor: 'rgb(168, 85, 247)', // purple
        backgroundColor: 'rgba(168, 85, 247, 0.1)', // light purple background
        tension: 0.4,
        pointBackgroundColor: 'rgb(168, 85, 247)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(168, 85, 247)',
      },
    ],
  };
  public attendanceChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, min: 300, max: 1200, ticks: { stepSize: 300 } },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        align: 'center',
        labels: { usePointStyle: true, boxWidth: 8 },
      },
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
