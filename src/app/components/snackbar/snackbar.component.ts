import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarService, SnackbarType } from '../../services/notification/snackbar.service';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {
  message: string | null = null;
  type: SnackbarType = 'info';

  constructor(private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.snackbarService.message$.subscribe(data => {
      if (data) {
        this.message = data.message;
        this.type = data.type;
      } else {
        this.message = null;
      }
    });
  }

  getStyle() {
    switch (this.type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500 text-black';
      case 'info':
      default:
        return 'bg-blue-500';
    }
  }
}
