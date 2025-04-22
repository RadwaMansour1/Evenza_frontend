import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroCheckCircle,
  heroXCircle,
  heroExclamationCircle,
  heroInformationCircle,
  heroBell,
  heroXMark
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-custom-alert',
  imports: [NgIcon,CommonModule],
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.css'],
  providers: [
    provideIcons({
      heroCheckCircle,
      heroXCircle,
      heroExclamationCircle,
      heroInformationCircle,
      heroBell,
      heroXMark
    }),
  ],
})
export class CustomAlertComponent {
  @Input() message = '';
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'success';

  isVisible = true;

  get alertClasses() {
    return {
      'bg-green-500 text-white': this.type === 'success',
      'bg-red-500 text-white': this.type === 'error',
      'bg-yellow-500 text-white': this.type === 'warning',
      'bg-blue-500 text-white': this.type === 'info',
    };
  }

  get iconName(): string {
    switch (this.type) {
      case 'success':
        return 'heroCheckCircle';
      case 'error':
        return 'heroXCircle';
      case 'warning':
        return 'heroExclamationCircle';
      case 'info':
        return 'heroInformationCircle';
      default:
        return 'heroBell';
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.closeAlert();
    }, 5000);
  }

  closeAlert() {
    this.isVisible = false;
  }
}
